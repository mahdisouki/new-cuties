import { createBrowserRouter } from "react-router";
import { AdminIndex, AdminLoginPage, AdminOrdersPage, AdminProductPage, AdminProductsPage, AdminRoot } from "./admin/pages";
import { Layout } from "./components";
import {
  CartPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  PoliciesPage,
  PrivacyPage,
  ProductPage,
  ShopPage,
  TermsPage,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/admin",
    Component: AdminRoot,
    children: [
      { index: true, Component: AdminIndex },
      { path: "login", Component: AdminLoginPage },
      { path: "products", Component: AdminProductsPage },
      { path: "products/new", Component: AdminProductPage },
      { path: "products/:slug", Component: AdminProductPage },
      { path: "orders", Component: AdminOrdersPage },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "shop", Component: ShopPage },
      { path: "product/:productId", Component: ProductPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "policies", Component: PoliciesPage },
      { path: "terms", Component: TermsPage },
      { path: "not-found", Component: NotFoundPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
