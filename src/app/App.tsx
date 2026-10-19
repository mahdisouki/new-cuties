import { RouterProvider } from "react-router";
import { CatalogProvider } from "./catalog";
import { LanguageProvider } from "./i18n";
import { router } from "./routes";
import { ShopProvider } from "./store";

export default function App() {
  return (
    <LanguageProvider>
      <CatalogProvider>
        <ShopProvider>
          <RouterProvider router={router} />
        </ShopProvider>
      </CatalogProvider>
    </LanguageProvider>
  );
}
