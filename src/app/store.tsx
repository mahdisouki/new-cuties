import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCatalog } from "./catalog";
import { type Product, type ProductVariant } from "./data";

export type CartItem = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
};

type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

type ShopContextValue = {
  cart: CartItem[];
  unresolvedIds: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, variantId: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const CART_KEY = "cuties-cart-v2";

function readLines(): CartLine[] {
  const stored = window.localStorage.getItem(CART_KEY);
  if (!stored) return [];
  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed)) throw new Error("Cart data is invalid");
  return parsed.map((item) => {
    if (
      typeof item !== "object" ||
      item === null ||
      !("productId" in item) ||
      !("variantId" in item) ||
      !("quantity" in item)
    ) {
      throw new Error("Cart data is invalid");
    }
    const record = item as { productId: unknown; variantId: unknown; quantity: unknown };
    if (
      typeof record.productId !== "string" ||
      typeof record.variantId !== "string" ||
      typeof record.quantity !== "number" ||
      record.quantity < 1
    ) {
      throw new Error("Cart data is invalid");
    }
    return { productId: record.productId, variantId: record.variantId, quantity: record.quantity };
  });
}

function clampToStock(requested: number, stock: number) {
  if (stock < 1) return 0;
  return Math.min(requested, stock);
}

function lineKey(productId: string, variantId: string) {
  return `${productId}::${variantId}`;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const { products } = useCatalog();
  const [lines, setLines] = useState<CartLine[]>(readLines);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (!products) return;
    setLines((items) =>
      items.flatMap((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        if (!product) return [item];
        const variant = product.variants.find((entry) => entry.id === item.variantId);
        if (!variant) return [];
        const quantity = clampToStock(item.quantity, variant.quantity);
        if (quantity < 1) return [];
        if (quantity === item.quantity) return [item];
        return [{ ...item, quantity }];
      }),
    );
  }, [products]);

  const value = useMemo<ShopContextValue>(() => {
    const unresolvedIds = products
      ? lines
          .filter((line) => {
            const product = products.find((entry) => entry.id === line.productId);
            if (!product) return true;
            return !product.variants.some((variant) => variant.id === line.variantId);
          })
          .map((line) => lineKey(line.productId, line.variantId))
      : [];

    const cart = products
      ? lines.flatMap((line) => {
          const product = products.find((item) => item.id === line.productId);
          const variant = product?.variants.find((item) => item.id === line.variantId);
          return product && variant ? [{ product, variant, quantity: line.quantity }] : [];
        })
      : [];

    const updateQuantity = (productId: string, variantId: string, quantity: number) => {
      if (quantity < 1) {
        setLines((items) => items.filter((item) => !(item.productId === productId && item.variantId === variantId)));
        return;
      }
      const product = products?.find((entry) => entry.id === productId);
      const variant = product?.variants.find((entry) => entry.id === variantId);
      if (!product || !variant) throw new Error(`Unknown product ${productId}/${variantId}`);
      const next = clampToStock(quantity, variant.quantity);
      if (next < 1) {
        setLines((items) => items.filter((item) => !(item.productId === productId && item.variantId === variantId)));
        return;
      }
      setLines((items) =>
        items.map((item) =>
          item.productId === productId && item.variantId === variantId ? { ...item, quantity: next } : item,
        ),
      );
    };

    return {
      cart,
      unresolvedIds,
      cartCount: lines.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      addToCart: (productId, variantId, quantity = 1) => {
        const product = products?.find((entry) => entry.id === productId);
        const variant = product?.variants.find((entry) => entry.id === variantId);
        if (!product || !variant) throw new Error(`Unknown product ${productId}/${variantId}`);
        if (variant.quantity < 1) throw new Error(`Out of stock: ${productId}/${variantId}`);
        setLines((items) => {
          const current = items.find((item) => item.productId === productId && item.variantId === variantId);
          if (current) {
            const next = clampToStock(current.quantity + quantity, variant.quantity);
            return items.map((item) =>
              item.productId === productId && item.variantId === variantId ? { ...item, quantity: next } : item,
            );
          }
          const next = clampToStock(quantity, variant.quantity);
          if (next < 1) return items;
          return [...items, { productId, variantId, quantity: next }];
        });
      },
      removeFromCart: (productId, variantId) =>
        setLines((items) => items.filter((item) => !(item.productId === productId && item.variantId === variantId))),
      updateQuantity,
      clearCart: () => setLines([]),
    };
  }, [lines, products]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
