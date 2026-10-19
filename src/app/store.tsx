import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCatalog } from "./catalog";
import { type Product } from "./data";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartLine = {
  id: string;
  quantity: number;
};

type ShopContextValue = {
  cart: CartItem[];
  unresolvedIds: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function readLines(): CartLine[] {
  const stored = window.localStorage.getItem("cuties-cart");
  if (!stored) return [];
  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed)) throw new Error("Cart data is invalid");
  return parsed.map((item) => {
    if (typeof item !== "object" || item === null || !("id" in item) || !("quantity" in item)) {
      throw new Error("Cart data is invalid");
    }
    const record = item as { id: unknown; quantity: unknown };
    if (typeof record.id !== "string" || typeof record.quantity !== "number" || record.quantity < 1) {
      throw new Error("Cart data is invalid");
    }
    return { id: record.id, quantity: record.quantity };
  });
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const { products } = useCatalog();
  const [lines, setLines] = useState<CartLine[]>(readLines);

  useEffect(() => {
    window.localStorage.setItem("cuties-cart", JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<ShopContextValue>(() => {
    const unresolvedIds = products
      ? lines.filter((line) => !products.some((product) => product.id === line.id)).map((line) => line.id)
      : [];
    const cart = products
      ? lines.flatMap((line) => {
          const product = products.find((item) => item.id === line.id);
          return product ? [{ product, quantity: line.quantity }] : [];
        })
      : [];

    const updateQuantity = (id: string, quantity: number) => {
      if (quantity < 1) {
        setLines((items) => items.filter((item) => item.id !== id));
        return;
      }
      setLines((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
    };

    return {
      cart,
      unresolvedIds,
      cartCount: lines.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      addToCart: (id, quantity = 1) => {
        if (!products?.some((product) => product.id === id)) throw new Error(`Unknown product ${id}`);
        setLines((items) => {
          const current = items.find((item) => item.id === id);
          return current
            ? items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item))
            : [...items, { id, quantity }];
        });
      },
      removeFromCart: (id) => setLines((items) => items.filter((item) => item.id !== id)),
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
