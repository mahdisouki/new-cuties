import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { request } from "./api";
import { type Product } from "./data";
import { useLocale } from "./i18n";

type CatalogValue = {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
};

const CatalogContext = createContext<CatalogValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setProducts(null);
    setError(null);
    request<Product[]>(`/api/products?locale=${locale}`)
      .then((next) => {
        if (active) setProducts(next);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        if (!(caught instanceof Error)) throw caught;
        setError(caught.message);
      });
    return () => {
      active = false;
    };
  }, [locale]);

  const value = useMemo<CatalogValue>(
    () => ({ products, error, loading: products === null && error === null }),
    [products, error],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog must be used within CatalogProvider");
  return value;
}
