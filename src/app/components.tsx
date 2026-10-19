import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { type Product } from "./data";
import { formatPrice, useLocale, type Locale } from "./i18n";
import { useShop } from "./store";

export type IconName =
  | "arrow"
  | "bag"
  | "check"
  | "close"
  | "heart"
  | "menu"
  | "minus"
  | "plus"
  | "search"
  | "user";

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
    minus: <path d="M5 12h14" />,
    plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };

  return (
    <svg aria-hidden="true" className={className} fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      {paths[name]}
    </svg>
  );
}

function LanguageSwitch() {
  const { locale, setLocale, copy } = useLocale();
  const options: [Locale, string][] = [
    ["en", "EN"],
    ["fr", "FR"],
    ["ar", "ع"],
  ];

  return (
    <div className="flex items-center gap-1.5 text-[10px] font-semibold">
      {options.map(([code, label]) => (
        <button
          aria-label={copy.languageNames[code]}
          aria-pressed={locale === code}
          className={`${locale === code ? "underline decoration-1 underline-offset-2" : "opacity-45"} ${code === "ar" ? "font-ar" : ""}`}
          key={code}
          onClick={() => setLocale(code)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const { cartCount } = useShop();
  const { copy } = useLocale();
  const location = useLocation();
  const onHero = atTop && location.pathname === "/";
  const navigation = [
    [copy.nav.shop, "/shop"],
    [copy.nav.jewelry, "/shop?category=Jewelry"],
    [copy.nav.watches, "/shop?category=Watches"],
    [copy.nav.story, "/#story"],
  ];

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() =>
        document.querySelector(location.hash)?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const update = () => setAtTop(window.scrollY <= 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#191915]">
      <div className="sticky top-0 z-30">
        <div className="relative bg-[#1d241b] px-5 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#f7f5f0]">
          <p className="px-16">{copy.banner}</p>
          <div className="absolute inset-y-0 end-5 flex items-center">
            <LanguageSwitch />
          </div>
        </div>
        <header className={`border-b backdrop-blur-lg transition-[background-color,border-color,color] duration-300 ${atTop ? "border-transparent bg-white/10" : "border-[#ddd8ce] bg-[#f7f5f0]/95"} ${onHero ? "text-white" : "text-[#191915]"}`}>
          <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-3 items-center px-5 md:px-10">
            <button aria-label={copy.a11y.openMenu} className="w-fit cursor-pointer md:hidden" onClick={() => setMenuOpen(true)}>
              <Icon name="menu" size={23} />
            </button>
            <nav className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[0.18em] md:flex">
              {navigation.map(([label, to]) => (
                <NavLink className="nav-link" key={label} to={to}>{label}</NavLink>
              ))}
            </nav>
            <Link aria-label={copy.a11y.home} className="justify-self-center" to="/">
              <img alt="Cuties" className={`h-16 w-28 object-contain md:w-32 ${onHero ? "brightness-0 invert" : ""}`} src="/cuties-logo.png" />
            </Link>
            <div className="flex items-center justify-end gap-3 sm:gap-5">
              <Link aria-label={copy.a11y.search} to="/shop"><Icon name="search" /></Link>
              <Link aria-label={copy.a11y.bag(cartCount)} className="relative" to="/cart">
                <Icon name="bag" />
                {cartCount > 0 && <span className="absolute -end-2 -top-2 grid size-4 place-items-center rounded-full bg-[#1d241b] text-[9px] font-semibold text-white">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </header>
      </div>

      <div className={location.pathname === "/" ? "-mt-20" : undefined}>
        <Outlet />
      </div>

      <footer className="bg-[#ede9e0] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <img alt="Cuties" className="h-24 w-44 object-contain object-left rtl:object-right" src="/cuties-logo.png" />
              <p className="mt-3 max-w-xs text-xs leading-6 text-[#6d6960]">{copy.footer.blurb}</p>
            </div>
            {copy.footer.columns.map(({ title, links }) => (
              <div key={title}>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em]">{title}</p>
                <div className="flex flex-col gap-3">
                  {links.map((link) => <Link className="w-fit text-xs text-[#6d6960] hover:text-[#191915]" key={link} to="/">{link}</Link>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col gap-3 border-t border-[#d5d0c5] pt-6 text-[9px] uppercase tracking-[0.15em] text-[#7b766d] md:flex-row md:justify-between">
            <p>{copy.footer.copyright}</p>
            <p>{copy.footer.secure}</p>
          </div>
        </div>
      </footer>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#f7f5f0] p-5 md:hidden">
          <div className="flex items-center justify-between">
            <img alt="Cuties" className="h-16 w-28 object-contain" src="/cuties-logo.png" />
            <button aria-label={copy.a11y.closeMenu} onClick={() => setMenuOpen(false)}><Icon name="close" size={24} /></button>
          </div>
          <nav className="mt-20 flex flex-col gap-7 font-serif text-5xl">
            {navigation.map(([label, to]) => (
              <Link key={label} onClick={() => setMenuOpen(false)} to={to}>{label}</Link>
            ))}
          </nav>
          <div className="mt-12 text-[#191915]">
            <LanguageSwitch />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useShop();
  const { copy, locale } = useLocale();

  const add = () => {
    addToCart(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe7de]">
        <Link to={`/product/${product.id}`}>
          <img alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" src={product.image} />
        </Link>
        {product.label && <span className="absolute start-3 top-3 bg-[#f7f5f0]/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em]">{product.label}</span>}
        <button aria-label={copy.a11y.favorite(product.name)} className={`absolute end-3 top-3 grid size-9 place-items-center rounded-full bg-[#f7f5f0]/90 ${favorite ? "text-[#a77048]" : ""}`} onClick={() => setFavorite(!favorite)}>
          <svg aria-hidden="true" fill={favorite ? "currentColor" : "none"} height="17" viewBox="0 0 24 24" width="17" stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>
        </button>
        <button className="absolute inset-x-3 bottom-3 translate-y-3 bg-[#f7f5f0] py-3 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100" onClick={add}>
          {added ? copy.card.added : copy.card.quickAdd}
        </button>
      </div>
      <Link className="mt-4 flex items-start justify-between gap-3" to={`/product/${product.id}`}>
        <h3 className="font-serif text-xl leading-tight">{product.name}</h3>
        <p className="pt-1 text-xs text-[#615e55]">{formatPrice(product.price, locale)}</p>
      </Link>
      <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#8c887e]">{product.material}</p>
    </article>
  );
}
