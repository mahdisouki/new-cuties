import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const storageKey = "cuties-admin-token";

type AdminAuthValue = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => window.localStorage.getItem(storageKey));

  const login = useCallback((next: string) => {
    window.localStorage.setItem(storageKey, next);
    setToken(next);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(storageKey);
    setToken(null);
  }, []);

  const value = useMemo(() => ({ token, login, logout }), [token, login, logout]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return value;
}
