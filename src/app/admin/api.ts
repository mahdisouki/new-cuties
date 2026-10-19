export { ApiError as AdminApiError, request as adminApi } from "../api";

export type Category = "Rings" | "Necklaces" | "Bracelets" | "Watches";
export type OrderStatus = "new" | "confirmed" | "fulfilled" | "cancelled";

export type AdminTranslation = {
  name: string;
  material: string;
  description: string;
  label?: string | null;
};

export type AdminProduct = {
  id: string;
  category: Category;
  price: number;
  image: string;
  position: number;
  translations: {
    en: AdminTranslation;
    fr: AdminTranslation;
    ar: AdminTranslation;
  };
};

export type AdminOrder = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  items: { productId: string; quantity: number; name: string; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "cash";
  status: OrderStatus;
  createdAt: string;
};

