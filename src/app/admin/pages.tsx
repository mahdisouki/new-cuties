import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router";
import { formatPrice } from "../i18n";
import {
  adminApi,
  AdminApiError,
  type AdminOrder,
  type AdminProduct,
  type AdminTranslation,
  type Category,
  type OrderStatus,
} from "./api";
import { AdminAuthProvider, useAdminAuth } from "./auth";

const categories: Category[] = ["Rings", "Necklaces", "Bracelets", "Watches"];
const statuses: OrderStatus[] = ["new", "confirmed", "fulfilled", "cancelled"];
const locales = ["en", "fr", "ar"] as const;

function message(error: unknown) {
  if (error instanceof Error) return error.message;
  throw error;
}

export function AdminLayout() {
  const { token } = useAdminAuth();
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";

  if (!token && !isLogin) return <Navigate replace to="/admin/login" />;
  if (token && isLogin) return <Navigate replace to="/admin/products" />;

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#191915]">
      {token && <AdminBar />}
      <Outlet />
    </div>
  );
}

function AdminBar() {
  const { logout } = useAdminAuth();
  const link = "text-[10px] font-semibold uppercase tracking-[0.18em]";

  return (
    <header className="border-b border-[#ddd8ce] bg-[#f7f5f0]">
      <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between gap-6 px-5">
        <div className="flex items-center gap-8">
          <Link className="font-serif text-2xl" to="/admin/products">Cuties</Link>
          <nav className="flex items-center gap-5">
            <NavLink className={link} to="/admin/products">Products</NavLink>
            <NavLink className={link} to="/admin/orders">Orders</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link className="text-[10px] uppercase tracking-[0.16em] text-[#6d6960]" to="/">View shop</Link>
          <button className={link} onClick={logout} type="button">Log out</button>
        </div>
      </div>
    </header>
  );
}

export function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await adminApi<{ token: string }>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      login(result.token);
      navigate("/admin/products", { replace: true });
    } catch (caught) {
      setError(message(caught));
      setPending(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form className="w-full max-w-md" onSubmit={submit}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#857a62]">Staff</p>
        <h1 className="mt-3 font-serif text-5xl font-light">Back office</h1>
        <div className="mt-10 space-y-5">
          <Field label="Email" type="email" value={email} onChange={setEmail} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
        </div>
        {error && <p className="mt-5 text-sm text-[#8a3d32]">{error}</p>}
        <button className="mt-8 w-full bg-[#1d241b] py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60" disabled={pending} type="submit">
          {pending ? "Signing in" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

export function AdminProductsPage() {
  const { token, logout } = useAdminAuth();
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setProducts(await adminApi<AdminProduct[]>("/api/products", { token }));
      setError(null);
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) logout();
      setError(message(caught));
    }
  };

  useEffect(() => {
    void load();
  }, [token]);

  const remove = async (product: AdminProduct) => {
    if (!window.confirm(`Delete ${product.translations.en.name}?`)) return;
    try {
      await adminApi(`/api/products/${product.id}`, { method: "DELETE", token });
      await load();
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) logout();
      setError(message(caught));
    }
  };

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#857a62]">Catalog</p>
          <h1 className="mt-3 font-serif text-5xl font-light">Products</h1>
        </div>
        <Link className="bg-[#1d241b] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white" to="/admin/products/new">New product</Link>
      </div>
      {error && <p className="mt-8 text-sm text-[#8a3d32]">{error}</p>}
      {products === null && !error && <p className="mt-10 text-sm text-[#6d6960]">Loading products</p>}
      {products?.length === 0 && <p className="mt-10 text-sm text-[#6d6960]">No products yet.</p>}
      {products && products.length > 0 && (
        <div className="mt-10 divide-y divide-[#ddd8ce] border-y border-[#ddd8ce]">
          {products.map((product) => (
            <article className="grid grid-cols-[72px_1fr_auto] items-center gap-5 py-4" key={product.id}>
              <img alt="" className="size-[72px] object-cover" src={product.image} />
              <div>
                <p className="font-serif text-2xl">{product.translations.en.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#7d786f]">{product.category} · {formatPrice(product.price, "en")}</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.16em]">
                <Link to={`/admin/products/${product.id}`}>Edit</Link>
                <button className="text-[#8a3d32]" onClick={() => void remove(product)} type="button">Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

type TranslationFields = { name: string; material: string; description: string; label: string };

type ProductForm = {
  slug: string;
  category: Category;
  price: string;
  image: string;
  position: string;
  translations: Record<(typeof locales)[number], TranslationFields>;
};

const emptyTranslation = (): TranslationFields => ({ name: "", material: "", description: "", label: "" });

const emptyForm = (): ProductForm => ({
  slug: "",
  category: "Rings",
  price: "",
  image: "",
  position: "0",
  translations: { en: emptyTranslation(), fr: emptyTranslation(), ar: emptyTranslation() },
});

function fromProduct(product: AdminProduct): ProductForm {
  const text = (value: AdminTranslation): TranslationFields => ({
    name: value.name,
    material: value.material,
    description: value.description,
    label: value.label ?? "",
  });
  return {
    slug: product.id,
    category: product.category,
    price: String(product.price),
    image: product.image,
    position: String(product.position),
    translations: {
      en: text(product.translations.en),
      fr: text(product.translations.fr),
      ar: text(product.translations.ar),
    },
  };
}

export function AdminProductPage() {
  const { slug } = useParams();
  const isNew = !slug;
  const { token, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    adminApi<AdminProduct>(`/api/products/${slug}`, { token })
      .then((product) => {
        if (active) setForm(fromProduct(product));
      })
      .catch((caught: unknown) => {
        if (caught instanceof AdminApiError && caught.status === 401) logout();
        if (active) setError(message(caught));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug, token, logout]);

  const setTranslation = (locale: (typeof locales)[number], key: keyof TranslationFields, value: string) => {
    setForm((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: { ...current.translations[locale], [key]: value },
      },
    }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const price = Number(form.price);
    const position = Number(form.position);
    if (form.price.trim() === "" || !Number.isInteger(price) || price < 0) {
      setError("Price must be a whole number");
      return;
    }
    if (form.position.trim() === "" || !Number.isInteger(position) || position < 0) {
      setError("Position must be a whole number");
      return;
    }

    const translation = (fields: TranslationFields) => ({
      name: fields.name.trim(),
      material: fields.material.trim(),
      description: fields.description.trim(),
      ...(fields.label.trim() ? { label: fields.label.trim() } : {}),
    });

    setPending(true);
    setError(null);
    try {
      const body = {
        slug: form.slug.trim(),
        category: form.category,
        price,
        image: form.image.trim(),
        position,
        translations: {
          en: translation(form.translations.en),
          fr: translation(form.translations.fr),
          ar: translation(form.translations.ar),
        },
      };
      if (isNew) {
        await adminApi("/api/products", { method: "POST", body, token });
      } else {
        await adminApi(`/api/products/${slug}`, { method: "PUT", body, token });
      }
      navigate("/admin/products");
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) logout();
      setError(message(caught));
      setPending(false);
    }
  };

  if (loading) {
    return <main className="mx-auto max-w-[1100px] px-5 py-12 text-sm text-[#6d6960]">Loading product</main>;
  }

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#857a62]">{isNew ? "New piece" : "Edit piece"}</p>
      <h1 className="mt-3 font-serif text-5xl font-light">{isNew ? "Add a product" : form.translations.en.name || form.slug}</h1>
      <form className="mt-10 space-y-8" onSubmit={submit}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field disabled={!isNew} label="Slug" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
          <label className="block">
            <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#746f66]">Category</span>
            <select className="w-full border border-[#cbc5b9] bg-transparent px-4 py-3.5 text-sm outline-none" onChange={(event) => setForm({ ...form, category: event.target.value as Category })} value={form.category}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <Field label="Price" type="number" value={form.price} onChange={(price) => setForm({ ...form, price })} />
          <Field label="Position" type="number" value={form.position} onChange={(position) => setForm({ ...form, position })} />
          <div className="md:col-span-2">
            <Field label="Image URL" value={form.image} onChange={(image) => setForm({ ...form, image })} />
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {locales.map((locale) => (
            <section className="space-y-4" key={locale}>
              <h2 className="font-serif text-3xl uppercase">{locale}</h2>
              <Field label="Name" value={form.translations[locale].name} onChange={(name) => setTranslation(locale, "name", name)} />
              <Field label="Material" value={form.translations[locale].material} onChange={(material) => setTranslation(locale, "material", material)} />
              <Field label="Label" value={form.translations[locale].label} onChange={(label) => setTranslation(locale, "label", label)} />
              <label className="block">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#746f66]">Description</span>
                <textarea className="min-h-32 w-full border border-[#cbc5b9] bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#555148]" onChange={(event) => setTranslation(locale, "description", event.target.value)} required value={form.translations[locale].description} />
              </label>
            </section>
          ))}
        </div>
        {error && <p className="text-sm text-[#8a3d32]">{error}</p>}
        <div className="flex items-center gap-6">
          <button className="bg-[#1d241b] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60" disabled={pending} type="submit">
            {pending ? "Saving" : "Save product"}
          </button>
          <Link className="text-[10px] uppercase tracking-[0.16em]" to="/admin/products">Cancel</Link>
        </div>
      </form>
    </main>
  );
}

export function AdminOrdersPage() {
  const { token, logout } = useAdminAuth();
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    adminApi<AdminOrder[]>("/api/orders", { token })
      .then((next) => {
        if (active) setOrders(next);
      })
      .catch((caught: unknown) => {
        if (caught instanceof AdminApiError && caught.status === 401) logout();
        if (active) setError(message(caught));
      });
    return () => {
      active = false;
    };
  }, [token, logout]);

  const updateStatus = async (order: AdminOrder, status: OrderStatus) => {
    try {
      const updated = await adminApi<AdminOrder>(`/api/orders/${order.id}`, {
        method: "PATCH",
        body: { status },
        token,
      });
      setOrders((current) => current?.map((item) => (item.id === order.id ? updated : item)) ?? null);
      setError(null);
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) logout();
      setError(message(caught));
    }
  };

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#857a62]">Sales</p>
      <h1 className="mt-3 font-serif text-5xl font-light">Orders</h1>
      {error && <p className="mt-8 text-sm text-[#8a3d32]">{error}</p>}
      {orders === null && !error && <p className="mt-10 text-sm text-[#6d6960]">Loading orders</p>}
      {orders?.length === 0 && <p className="mt-10 text-sm text-[#6d6960]">No orders yet.</p>}
      {orders && orders.length > 0 && (
        <div className="mt-10 space-y-4">
          {orders.map((order) => (
            <article className="border border-[#ddd8ce] p-5" key={order.id}>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="font-serif text-2xl">{order.firstName} {order.lastName}</p>
                  <p className="mt-1 text-sm text-[#6d6960]">{order.email}</p>
                  <p className="mt-1 text-sm text-[#6d6960]">{order.address}, {order.city} {order.postalCode}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#7d786f]">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm">{formatPrice(order.total, "en")}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#7d786f]">Cash on delivery · delivery {formatPrice(order.deliveryFee, "en")}</p>
                  <select className="mt-3 border border-[#cbc5b9] bg-transparent px-3 py-2 text-[10px] uppercase tracking-[0.14em] outline-none" onChange={(event) => void updateStatus(order, event.target.value as OrderStatus)} value={order.status}>
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
              </div>
              <ul className="mt-5 space-y-1 text-sm">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.productId}`}>{item.quantity} × {item.name}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function Field({ label, value, onChange, type = "text", disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#746f66]">{label}</span>
      <input className="w-full border border-[#cbc5b9] bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#555148] disabled:text-[#8a857c]" disabled={disabled} onChange={(event) => onChange(event.target.value)} required={label !== "Label"} type={type} value={value} />
    </label>
  );
}

export function AdminIndex() {
  return <Navigate replace to="/admin/products" />;
}

export function AdminRoot() {
  return (
    <AdminAuthProvider>
      <AdminLayout />
    </AdminAuthProvider>
  );
}
