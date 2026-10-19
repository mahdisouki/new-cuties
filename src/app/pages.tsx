import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router";
import { request } from "./api";
import { useCatalog } from "./catalog";
import { Icon, ProductCard } from "./components";
import { deliveryFee, type Product } from "./data";
import { formatPrice, useLocale } from "./i18n";
import { useShop } from "./store";

export function HomePage() {
  const { copy } = useLocale();
  const { products, loading, error } = useCatalog();
  const featured = products?.slice(0, 6) ?? [];
  const categories: { id: Product["category"]; image: string | null }[] = [
    { id: "Rings", image: products?.find((product) => product.category === "Rings")?.image ?? null },
    { id: "Necklaces", image: products?.find((product) => product.category === "Necklaces")?.image ?? null },
    { id: "Watches", image: products?.find((product) => product.category === "Watches")?.image ?? null },
  ];

  return (
    <main>
      <section className="relative min-h-[690px] overflow-hidden bg-[#918675] md:min-h-[780px]">
        <img
          alt={copy.home.heroAlt}
          className="absolute inset-0 h-full w-full object-cover object-[52%_32%]"
          fetchPriority="high"
          src="https://images.unsplash.com/photo-1670928591025-7d7304e77e0f?auto=format&fit=crop&w=2000&q=88"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative mx-auto flex min-h-[690px] max-w-[1440px] items-end px-5 pb-20 text-white md:min-h-[780px] md:items-center md:px-10 md:pb-0">
          <div className="max-w-xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em]">{copy.home.heroEyebrow}</p>
            <h1 className="font-serif text-6xl leading-[0.92] font-light tracking-[-0.03em] md:text-[92px]">{copy.home.heroTitle1}<br />{copy.home.heroTitle2}</h1>
            <p className="mt-7 max-w-sm text-sm leading-6 text-white/85">{copy.home.heroBody}</p>
            <Link className="mt-9 inline-flex items-center gap-4 border-b border-white pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all hover:gap-6" to="/shop">
              {copy.home.heroCta} <Icon className="rtl:-scale-x-100" name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#857a62]">{copy.home.featuredEyebrow}</p>
              <h2 className="font-serif text-5xl font-light tracking-[-0.02em] md:text-7xl">{copy.home.featuredTitle}</h2>
            </div>
            <Link className="hidden items-center gap-3 border-b border-[#191915] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] md:flex" to="/shop">
              {copy.home.shopAll} <Icon className="rtl:-scale-x-100" name="arrow" size={16} />
            </Link>
          </div>
          {loading && <p className="text-sm text-[#6d6960]">Loading the collection</p>}
          {error && <p className="text-sm text-[#8a3d32]">{error}</p>}
          {products && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-5">
              {featured.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#1d241b] text-[#f3f0e8]" id="story">
        <div className="grid min-h-[680px] md:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden">
            <img alt={copy.home.storyAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1633701394188-c11a1e6a4e26?auto=format&fit=crop&w=1200&q=85" />
          </div>
          <div className="flex items-center px-6 py-20 md:px-[12%]">
            <div className="max-w-lg">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b7a985]">{copy.home.storyEyebrow}</p>
              <h2 className="font-serif text-5xl leading-[0.98] font-light md:text-7xl">{copy.home.storyTitle1}<br />{copy.home.storyTitle2}</h2>
              <p className="mt-8 max-w-md text-sm leading-7 text-[#d0cec5]">{copy.home.storyBody}</p>
              <Link className="mt-10 inline-flex items-center gap-4 border-b border-[#f3f0e8] pb-1 text-[10px] font-semibold uppercase tracking-[0.22em]" to="/shop">{copy.home.storyCta} <Icon className="rtl:-scale-x-100" name="arrow" size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#857a62]">{copy.home.categoryEyebrow}</p>
            <h2 className="font-serif text-5xl font-light md:text-7xl">{copy.home.categoryTitle}</h2>
          </div>
          {loading && <p className="text-center text-sm text-[#6d6960]">Loading the collection</p>}
          {error && <p className="text-center text-sm text-[#8a3d32]">{error}</p>}
          {products && (
            <div className="grid gap-4 md:grid-cols-3">
              {categories.map((category) => (
                <Link className="group relative aspect-[4/5] overflow-hidden bg-[#d8d2c6]" key={category.id} to={`/shop?category=${category.id}`}>
                  {category.image
                    ? <img alt={copy.home.categoryAlt(copy.categories[category.id])} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" src={category.image} />
                    : <p className="grid h-full place-items-center px-6 text-center text-sm">No {category.id} product</p>}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-white">
                    <h3 className="font-serif text-3xl">{copy.categories[category.id]}</h3>
                    <span className="grid size-10 place-items-center rounded-full border border-white/70 transition-colors group-hover:bg-white group-hover:text-[#191915]"><Icon className="rtl:-scale-x-100" name="arrow" size={18} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const { copy } = useLocale();
  const { products, loading, error } = useCatalog();
  const active = params.get("category") || "All";
  const categories = ["All", "Jewelry", "Rings", "Necklaces", "Bracelets", "Watches"] as const;
  const visibleProducts = useMemo(
    () =>
      (products ?? []).filter((product) => {
        const categoryMatch =
          active === "All" ||
          (active === "Jewelry" && product.category !== "Watches") ||
          product.category === active;
        return categoryMatch && product.name.toLowerCase().includes(search.toLowerCase());
      }),
    [products, active, search],
  );

  return (
    <main className="min-h-[70vh] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 border-b border-[#d8d3c8] pb-10 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#857a62]">{copy.shop.eyebrow}</p>
            <h1 className="font-serif text-6xl font-light md:text-8xl">{copy.shop.title}</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#6e6a61]">{copy.shop.body}</p>
          </div>
          <label className="flex w-full items-center gap-3 border-b border-[#8b867b] py-3 md:max-w-xs">
            <Icon name="search" size={18} />
            <span className="sr-only">{copy.a11y.searchField}</span>
            <input className="w-full bg-transparent text-sm outline-none placeholder:text-[#98938a]" onChange={(event) => setSearch(event.target.value)} placeholder={copy.shop.searchPlaceholder} value={search} />
          </label>
        </div>

        <div className="flex gap-6 overflow-x-auto py-8 text-[10px] font-semibold uppercase tracking-[0.18em]">
          {categories.map((category) => (
            <button className={`whitespace-nowrap border-b pb-1 ${active === category ? "border-[#191915]" : "border-transparent text-[#8a857c]"}`} key={category} onClick={() => setParams(category === "All" ? {} : { category })}>
              {copy.categories[category]}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#7d786f]">
          <p>{copy.shop.pieces(visibleProducts.length)}</p>
          <p>{copy.shop.crafted}</p>
        </div>

        {loading && <p className="py-16 text-sm text-[#6d6960]">Loading the collection</p>}
        {error && <p className="py-16 text-sm text-[#8a3d32]">{error}</p>}
        {!loading && !error && visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : !loading && !error ? (
          <div className="py-32 text-center">
            <h2 className="font-serif text-4xl">{copy.shop.empty}</h2>
            <button className="mt-5 border-b border-[#191915] pb-1 text-[10px] uppercase tracking-[0.2em]" onClick={() => { setSearch(""); setParams({}); }}>{copy.shop.clear}</button>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useShop();
  const { copy, locale } = useLocale();
  const { products, loading, error } = useCatalog();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  if (loading) return <main className="px-5 py-24 text-sm text-[#6d6960]">Loading the collection</main>;
  if (error) return <main className="px-5 py-24 text-sm text-[#8a3d32]">{error}</main>;
  const product = products?.find((item) => item.id === productId);
  if (!product || !products) return <Navigate replace to="/not-found" />;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  const add = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main>
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        <div className="aspect-[4/5] bg-[#ebe7de] md:min-h-[740px]">
          <img alt={product.name} className="h-full w-full object-cover" src={product.image} />
        </div>
        <div className="flex items-center px-5 py-14 md:px-[12%] md:py-20">
          <div className="w-full max-w-lg">
            <Link className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7e796f]" to={`/shop?category=${product.category}`}>{copy.categories[product.category]}</Link>
            <h1 className="mt-5 font-serif text-5xl leading-none md:text-7xl">{product.name}</h1>
            <p className="mt-5 text-base">{formatPrice(product.price, locale)}</p>
            <p className="mt-8 text-sm leading-7 text-[#666259]">{product.description}</p>
            <div className="mt-8 border-y border-[#d8d3c8] py-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#817c72]">{copy.product.materials}</p>
              <p className="mt-2 text-sm">{product.material}</p>
            </div>
            {product.category === "Rings" && (
              <label className="mt-7 block">
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">{copy.product.size}</span>
                <select className="mt-3 w-full border border-[#cbc5b9] bg-transparent px-4 py-4 text-sm outline-none">
                  <option>US 5</option><option>US 6</option><option>US 7</option><option>US 8</option>
                </select>
              </label>
            )}
            <div className="mt-7 flex gap-3">
              <div className="flex items-center border border-[#cbc5b9]">
                <button aria-label={copy.a11y.decrease} className="grid size-12 place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Icon name="minus" size={15} /></button>
                <span className="w-7 text-center text-xs">{quantity}</span>
                <button aria-label={copy.a11y.increase} className="grid size-12 place-items-center" onClick={() => setQuantity(quantity + 1)}><Icon name="plus" size={15} /></button>
              </div>
              <button className="flex flex-1 items-center justify-center gap-3 bg-[#1d241b] px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#30392d]" onClick={add}>
                {added ? <><Icon name="check" size={16} /> {copy.product.added}</> : copy.product.add}
              </button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-[9px] uppercase leading-5 tracking-[0.14em] text-[#6e6a61]">
              {copy.product.assurances.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="mb-12 font-serif text-5xl">{copy.product.related}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}

export function CartPage() {
  const { cart, unresolvedIds, subtotal, removeFromCart, updateQuantity } = useShop();
  const { copy, locale } = useLocale();
  const { loading, error } = useCatalog();

  if (loading) return <main className="px-5 py-24 text-sm text-[#6d6960]">Loading the collection</main>;
  if (error) return <main className="px-5 py-24 text-sm text-[#8a3d32]">{error}</main>;

  if (cart.length === 0 && unresolvedIds.length === 0) {
    return (
      <main className="grid min-h-[65vh] place-items-center px-5 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-[#c9c3b7]"><Icon name="bag" size={25} /></span>
          <h1 className="mt-7 font-serif text-5xl">{copy.cart.emptyTitle}</h1>
          <p className="mt-3 text-sm text-[#706c63]">{copy.cart.emptyBody}</p>
          <Link className="mt-8 inline-block bg-[#1d241b] px-9 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white" to="/shop">{copy.cart.emptyCta}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="font-serif text-6xl md:text-8xl">{copy.cart.title}</h1>
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.7fr_1fr]">
          <div className="border-t border-[#d8d3c8]">
            {unresolvedIds.map((id) => (
              <p className="border-b border-[#d8d3c8] py-6 text-sm text-[#8a3d32]" key={id}>
                Unknown product {id}. <button className="underline" onClick={() => removeFromCart(id)} type="button">{copy.cart.remove}</button>
              </p>
            ))}
            {cart.map(({ product, quantity }) => (
                <article className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#d8d3c8] py-6 sm:grid-cols-[150px_1fr_auto]" key={product.id}>
                  <Link className="aspect-[4/5] bg-[#e9e5dc]" to={`/product/${product.id}`}><img alt={product.name} className="h-full w-full object-cover" src={product.image} /></Link>
                  <div className="py-1">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#837e74]">{copy.categories[product.category]}</p>
                    <Link className="mt-2 block font-serif text-2xl" to={`/product/${product.id}`}>{product.name}</Link>
                    <p className="mt-2 text-xs text-[#706c63]">{product.material}</p>
                    <div className="mt-5 flex w-fit items-center border border-[#cbc5b9]">
                      <button aria-label={copy.a11y.decrease} className="grid size-9 place-items-center" onClick={() => updateQuantity(product.id, quantity - 1)}><Icon name="minus" size={13} /></button>
                      <span className="w-7 text-center text-xs">{quantity}</span>
                      <button aria-label={copy.a11y.increase} className="grid size-9 place-items-center" onClick={() => updateQuantity(product.id, quantity + 1)}><Icon name="plus" size={13} /></button>
                    </div>
                    <button className="mt-4 text-[9px] uppercase tracking-[0.16em] text-[#817c73] underline underline-offset-4" onClick={() => removeFromCart(product.id)}>{copy.cart.remove}</button>
                  </div>
                  <p className="col-start-2 row-start-2 text-sm sm:col-start-3 sm:row-start-1 sm:pt-1">{formatPrice(product.price * quantity, locale)}</p>
                </article>
            ))}
          </div>
          <aside className="h-fit bg-[#ede9e0] p-6 md:p-8">
            <h2 className="font-serif text-3xl">{copy.cart.summary}</h2>
            <div className="mt-7 space-y-4 border-b border-[#cec8bc] pb-6 text-xs">
              <div className="flex justify-between"><span>{copy.cart.subtotal}</span><span>{formatPrice(subtotal, locale)}</span></div>
              <div className="flex justify-between"><span>{copy.cart.shipping}</span><span>{formatPrice(deliveryFee, locale)}</span></div>
            </div>
            <div className="flex justify-between py-6 text-sm font-semibold"><span>{copy.cart.total}</span><span>{formatPrice(subtotal + deliveryFee, locale)}</span></div>
            {unresolvedIds.length === 0
              ? <Link className="block bg-[#1d241b] py-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white" to="/checkout">{copy.cart.checkout}</Link>
              : <p className="text-sm text-[#8a3d32]">Remove the unknown pieces before checkout.</p>}
            <p className="mt-5 text-center text-[9px] uppercase leading-5 tracking-[0.14em] text-[#716d64]">{copy.cart.noteTax}<br />{copy.cart.noteReturns}</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export function CheckoutPage() {
  const { cart, unresolvedIds, subtotal, clearCart } = useShop();
  const { copy, locale } = useLocale();
  const { loading, error: catalogError } = useCatalog();
  const [complete, setComplete] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await request("/api/orders", {
        method: "POST",
        body: {
          ...form,
          items: cart.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        },
      });
      clearCart();
      setComplete(true);
      window.scrollTo(0, 0);
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
      setError(caught.message);
      setPending(false);
    }
  };

  if (loading) return <main className="px-5 py-24 text-sm text-[#6d6960]">Loading the collection</main>;
  if (catalogError) return <main className="px-5 py-24 text-sm text-[#8a3d32]">{catalogError}</main>;
  if (unresolvedIds.length > 0 || (!cart.length && !complete)) return <Navigate replace to="/cart" />;

  if (complete) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-5 text-center">
        <div className="max-w-lg">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#1d241b] text-white"><Icon name="check" size={25} /></span>
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#857a62]">{copy.checkout.confirmedEyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">{copy.checkout.thanks}</h1>
          <p className="mt-5 text-sm leading-6 text-[#6f6a61]">{copy.checkout.confirmedBody}</p>
          <Link className="mt-8 inline-block border-b border-[#191915] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em]" to="/">{copy.checkout.home}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#857a62]">{copy.checkout.eyebrow}</p>
        <h1 className="mt-4 font-serif text-6xl">{copy.checkout.title}</h1>
        <form className="mt-12 grid gap-14 lg:grid-cols-[1.4fr_1fr]" onSubmit={(event) => void submit(event)}>
          <div className="space-y-10">
            <CheckoutSection title={copy.checkout.contact}>
              <Field label={copy.checkout.email} type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
            </CheckoutSection>
            <CheckoutSection title={copy.checkout.delivery}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.checkout.firstName} value={form.firstName} onChange={(firstName) => setForm({ ...form, firstName })} />
                <Field label={copy.checkout.lastName} value={form.lastName} onChange={(lastName) => setForm({ ...form, lastName })} />
                <div className="sm:col-span-2"><Field label={copy.checkout.address} value={form.address} onChange={(address) => setForm({ ...form, address })} /></div>
                <Field label={copy.checkout.city} value={form.city} onChange={(city) => setForm({ ...form, city })} />
                <Field label={copy.checkout.postal} value={form.postalCode} onChange={(postalCode) => setForm({ ...form, postalCode })} />
              </div>
            </CheckoutSection>
          </div>
          <aside className="h-fit bg-[#ede9e0] p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="font-serif text-3xl">{copy.checkout.pieces}</h2>
            <div className="mt-6 space-y-5">
              {cart.map(({ product, quantity }) => (
                  <div className="flex gap-4" key={product.id}>
                    <div className="relative size-20 shrink-0 bg-[#ddd8ce]"><img alt="" className="h-full w-full object-cover" src={product.image} /><span className="absolute -end-2 -top-2 grid size-5 place-items-center rounded-full bg-[#1d241b] text-[9px] text-white">{quantity}</span></div>
                    <div className="flex flex-1 justify-between gap-3 pt-1"><div><p className="font-serif text-lg leading-tight">{product.name}</p><p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#777269]">{copy.categories[product.category]}</p></div><p className="text-xs">{formatPrice(product.price * quantity, locale)}</p></div>
                  </div>
              ))}
            </div>
            <div className="mt-7 space-y-3 border-t border-[#cbc5b9] pt-5 text-sm">
              <div className="flex justify-between"><span>{copy.cart.subtotal}</span><span>{formatPrice(subtotal, locale)}</span></div>
              <div className="flex justify-between"><span>{copy.cart.shipping}</span><span>{formatPrice(deliveryFee, locale)}</span></div>
              <div className="flex justify-between font-semibold"><span>{copy.checkout.total}</span><span>{formatPrice(subtotal + deliveryFee, locale)}</span></div>
            </div>
            {error && <p className="mt-5 text-sm text-[#8a3d32]">{error}</p>}
            <button className="mt-7 w-full bg-[#1d241b] py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60" disabled={pending} type="submit">{pending ? "Placing order" : copy.checkout.place}</button>
            <p className="mt-4 text-center text-[9px] uppercase tracking-[0.14em] text-[#716d64]">{copy.checkout.secure}</p>
          </aside>
        </form>
      </div>
    </main>
  );
}

function CheckoutSection({ children, title }: { children: ReactNode; title: string }) {
  return <section><h2 className="mb-5 font-serif text-3xl">{title}</h2>{children}</section>;
}

function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value?: string; onChange?: (value: string) => void }) {
  return <label className="block"><span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#746f66]">{label}</span><input className="w-full border border-[#cbc5b9] bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#555148]" onChange={onChange ? (event) => onChange(event.target.value) : undefined} required type={type} value={onChange ? value : undefined} /></label>;
}

export function NotFoundPage() {
  const { copy } = useLocale();
  return (
    <main className="grid min-h-[65vh] place-items-center px-5 text-center">
      <div><p className="text-[10px] uppercase tracking-[0.24em] text-[#857a62]">404</p><h1 className="mt-4 font-serif text-6xl">{copy.notFound.title}</h1><Link className="mt-8 inline-block border-b border-[#191915] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em]" to="/">{copy.notFound.home}</Link></div>
    </main>
  );
}
