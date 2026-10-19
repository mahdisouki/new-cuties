import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { products, type Product } from "./data";

export type Locale = "en" | "fr" | "ar";

type CategoryId = "All" | "Jewelry" | Product["category"];
type ProductId = (typeof products)[number]["id"];

type ProductText = {
  name: string;
  material: string;
  description: string;
  label?: string;
};

type Copy = {
  meta: { title: string };
  banner: string;
  nav: { shop: string; jewelry: string; watches: string; story: string };
  languageNames: Record<Locale, string>;
  a11y: {
    openMenu: string;
    closeMenu: string;
    home: string;
    search: string;
    bag: (count: number) => string;
    decrease: string;
    increase: string;
    favorite: (name: string) => string;
    searchField: string;
  };
  footer: {
    blurb: string;
    columns: { title: string; links: string[] }[];
    copyright: string;
    secure: string;
  };
  card: { quickAdd: string; added: string };
  home: {
    heroEyebrow: string;
    heroTitle1: string;
    heroTitle2: string;
    heroBody: string;
    heroCta: string;
    heroAlt: string;
    featuredEyebrow: string;
    featuredTitle: string;
    shopAll: string;
    storyEyebrow: string;
    storyTitle1: string;
    storyTitle2: string;
    storyBody: string;
    storyCta: string;
    storyAlt: string;
    categoryEyebrow: string;
    categoryTitle: string;
    categoryAlt: (name: string) => string;
  };
  shop: {
    eyebrow: string;
    title: string;
    body: string;
    searchPlaceholder: string;
    pieces: (count: number) => string;
    crafted: string;
    empty: string;
    clear: string;
  };
  product: {
    materials: string;
    size: string;
    added: string;
    add: string;
    assurances: string[];
    related: string;
  };
  cart: {
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    title: string;
    remove: string;
    summary: string;
    subtotal: string;
    shipping: string;
    complimentary: string;
    total: string;
    checkout: string;
    noteTax: string;
    noteReturns: string;
  };
  checkout: {
    eyebrow: string;
    title: string;
    contact: string;
    email: string;
    delivery: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postal: string;
    payment: string;
    card: string;
    expiry: string;
    security: string;
    pieces: string;
    total: string;
    place: string;
    secure: string;
    confirmedEyebrow: string;
    thanks: string;
    confirmedBody: string;
    home: string;
  };
  notFound: { title: string; home: string };
  categories: Record<CategoryId, string>;
};

const en: Copy = {
  meta: { title: "Cuties Fine Jewelry & Watches" },
  banner: "Delivery 7 DT · Cash on delivery",
  nav: { shop: "Shop", jewelry: "Jewelry", watches: "Watches", story: "Our story" },
  languageNames: { en: "English", fr: "Français", ar: "العربية" },
  a11y: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Cuties home",
    search: "Search products",
    bag: (count) => `Shopping bag with ${count} items`,
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    favorite: (name) => `Favorite ${name}`,
    searchField: "Search products",
  },
  footer: {
    blurb: "Fine jewelry and watches with a modern soul, crafted consciously to last for generations.",
    columns: [
      { title: "Client care", links: ["Contact", "Shipping & returns", "Care guide"] },
      { title: "About", links: ["Our story", "Materials", "Journal"] },
      { title: "Follow", links: ["Instagram", "Pinterest", "TikTok"] },
    ],
    copyright: "© 2025 Cuties Fine Jewelry & Watches",
    secure: "Cash on delivery · Delivery 7 DT",
  },
  card: { quickAdd: "Quick add", added: "Added to bag" },
  home: {
    heroEyebrow: "The Heirloom Collection",
    heroTitle1: "Made to be",
    heroTitle2: "remembered.",
    heroBody: "Sculptural jewelry and precise timepieces, thoughtfully made for every chapter.",
    heroCta: "Shop the collection",
    heroAlt: "Woman wearing fine jewelry in soft afternoon light",
    featuredEyebrow: "Curated for you",
    featuredTitle: "Jewelry & timepieces",
    shopAll: "Shop all",
    storyEyebrow: "Our philosophy",
    storyTitle1: "Quiet luxury,",
    storyTitle2: "made personal.",
    storyBody: "Each piece begins as a hand-drawn study and is finished by artisans in our small atelier, with materials chosen to endure.",
    storyCta: "Discover the collection",
    storyAlt: "Model wearing sculptural gold jewelry",
    categoryEyebrow: "Find your piece",
    categoryTitle: "Shop by category",
    categoryAlt: (name) => `${name} collection`,
  },
  shop: {
    eyebrow: "The collection",
    title: "Shop all",
    body: "Enduring jewelry and watches, designed with intention and made for your everyday rituals.",
    searchPlaceholder: "Search the collection",
    pieces: (count) => `${count} ${count === 1 ? "piece" : "pieces"}`,
    crafted: "Responsibly crafted",
    empty: "No pieces found",
    clear: "Clear filters",
  },
  product: {
    materials: "Materials",
    size: "Select size",
    added: "Added",
    add: "Add to bag",
    assurances: [
      "Delivery 7 DT, cash on delivery",
      "30-day returns & exchanges",
      "Two-year care warranty",
      "Signature Cuties packaging",
    ],
    related: "You may also like",
  },
  cart: {
    emptyTitle: "Your bag is empty",
    emptyBody: "Discover something made to be kept.",
    emptyCta: "Explore the collection",
    title: "Your bag",
    remove: "Remove",
    summary: "Order summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    complimentary: "Complimentary",
    total: "Total",
    checkout: "Checkout",
    noteTax: "Pay cash on delivery",
    noteReturns: "30-day complimentary returns",
  },
  checkout: {
    eyebrow: "Cash on delivery",
    title: "Complete your order",
    contact: "Contact",
    email: "Email address",
    delivery: "Delivery",
    firstName: "First name",
    lastName: "Last name",
    address: "Address",
    city: "City",
    postal: "Postal code",
    payment: "Payment",
    card: "Card number",
    expiry: "Expiry date",
    security: "Security code",
    pieces: "Your pieces",
    total: "Total",
    place: "Place order",
    secure: "Pay the courier in cash",
    confirmedEyebrow: "Order confirmed",
    thanks: "Thank you.",
    confirmedBody: "Your order is confirmed. Pay the total in cash when it is delivered.",
    home: "Return home",
  },
  notFound: { title: "This page is out of sight.", home: "Return home" },
  categories: {
    All: "All",
    Jewelry: "Jewelry",
    Rings: "Rings",
    Necklaces: "Necklaces",
    Bracelets: "Bracelets",
    Watches: "Watches",
  },
};

const fr: Copy = {
  meta: { title: "Cuties Joaillerie & Montres" },
  banner: "Livraison 7 DT · Paiement à la livraison",
  nav: { shop: "Boutique", jewelry: "Bijoux", watches: "Montres", story: "Histoire" },
  languageNames: { en: "English", fr: "Français", ar: "العربية" },
  a11y: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "Accueil Cuties",
    search: "Rechercher des pièces",
    bag: (count) => `Sac contenant ${count} ${count === 1 ? "article" : "articles"}`,
    decrease: "Diminuer la quantité",
    increase: "Augmenter la quantité",
    favorite: (name) => `Ajouter ${name} aux favoris`,
    searchField: "Rechercher des pièces",
  },
  footer: {
    blurb: "Joaillerie et montres d'exception, pensées pour durer de génération en génération.",
    columns: [
      { title: "Service client", links: ["Contact", "Livraison et retours", "Guide d'entretien"] },
      { title: "À propos", links: ["Notre histoire", "Matières", "Journal"] },
      { title: "Suivre", links: ["Instagram", "Pinterest", "TikTok"] },
    ],
    copyright: "© 2025 Cuties Joaillerie & Montres",
    secure: "Paiement à la livraison · Livraison 7 DT",
  },
  card: { quickAdd: "Ajout rapide", added: "Ajouté au sac" },
  home: {
    heroEyebrow: "La collection Héritage",
    heroTitle1: "Faite pour",
    heroTitle2: "la mémoire.",
    heroBody: "Des bijoux sculpturaux et des montres précises, pensés pour chaque chapitre.",
    heroCta: "Découvrir la collection",
    heroAlt: "Femme portant des bijoux précieux dans une lumière douce",
    featuredEyebrow: "Sélection pour vous",
    featuredTitle: "Bijoux et montres",
    shopAll: "Tout voir",
    storyEyebrow: "Notre philosophie",
    storyTitle1: "Un luxe discret,",
    storyTitle2: "rendu personnel.",
    storyBody: "Chaque pièce commence par un dessin à la main et s'achève dans notre petit atelier, avec des matières choisies pour durer.",
    storyCta: "Découvrir la collection",
    storyAlt: "Mannequin portant des bijoux en or sculptural",
    categoryEyebrow: "Trouvez votre pièce",
    categoryTitle: "Acheter par catégorie",
    categoryAlt: (name) => `Collection ${name}`,
  },
  shop: {
    eyebrow: "La collection",
    title: "Boutique",
    body: "Des bijoux et des montres durables, conçus avec intention pour vos rituels du quotidien.",
    searchPlaceholder: "Rechercher dans la collection",
    pieces: (count) => `${count} ${count === 1 ? "pièce" : "pièces"}`,
    crafted: "Fabrication responsable",
    empty: "Aucune pièce trouvée",
    clear: "Effacer les filtres",
  },
  product: {
    materials: "Matières",
    size: "Choisir la taille",
    added: "Ajouté",
    add: "Ajouter au sac",
    assurances: [
      "Livraison 7 DT, paiement à la livraison",
      "Retours et échanges sous 30 jours",
      "Garantie d'entretien de deux ans",
      "Écrin signature Cuties",
    ],
    related: "Vous aimerez aussi",
  },
  cart: {
    emptyTitle: "Votre sac est vide",
    emptyBody: "Découvrez une pièce faite pour être gardée.",
    emptyCta: "Explorer la collection",
    title: "Votre sac",
    remove: "Retirer",
    summary: "Récapitulatif",
    subtotal: "Sous-total",
    shipping: "Livraison",
    complimentary: "Offerte",
    total: "Total",
    checkout: "Commander",
    noteTax: "Paiement en espèces à la livraison",
    noteReturns: "Retours offerts sous 30 jours",
  },
  checkout: {
    eyebrow: "Paiement à la livraison",
    title: "Finalisez votre commande",
    contact: "Contact",
    email: "Adresse e-mail",
    delivery: "Livraison",
    firstName: "Prénom",
    lastName: "Nom",
    address: "Adresse",
    city: "Ville",
    postal: "Code postal",
    payment: "Paiement",
    card: "Numéro de carte",
    expiry: "Date d'expiration",
    security: "Cryptogramme",
    pieces: "Vos pièces",
    total: "Total",
    place: "Passer la commande",
    secure: "Réglez le livreur en espèces",
    confirmedEyebrow: "Commande confirmée",
    thanks: "Merci.",
    confirmedBody: "Votre commande est confirmée. Réglez le total en espèces à la livraison.",
    home: "Retour à l'accueil",
  },
  notFound: { title: "Cette page est introuvable.", home: "Retour à l'accueil" },
  categories: {
    All: "Tout",
    Jewelry: "Bijoux",
    Rings: "Bagues",
    Necklaces: "Colliers",
    Bracelets: "Bracelets",
    Watches: "Montres",
  },
};

const ar: Copy = {
  meta: { title: "كيوتيز للمجوهرات والساعات" },
  banner: "التوصيل 7 د.ت · الدفع عند الاستلام",
  nav: { shop: "المتجر", jewelry: "مجوهرات", watches: "ساعات", story: "قصتنا" },
  languageNames: { en: "English", fr: "Français", ar: "العربية" },
  a11y: {
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    home: "الصفحة الرئيسية لكيوتيز",
    search: "البحث عن القطع",
    bag: (count) => `حقيبة التسوق، ${arabicCount(count)}`,
    decrease: "إنقاص الكمية",
    increase: "زيادة الكمية",
    favorite: (name) => `إضافة ${name} إلى المفضلة`,
    searchField: "البحث عن القطع",
  },
  footer: {
    blurb: "مجوهرات وساعات فاخرة بروح معاصرة، تُصنع بعناية لتدوم عبر الأجيال.",
    columns: [
      { title: "خدمة العملاء", links: ["تواصل", "الشحن والإرجاع", "دليل العناية"] },
      { title: "عن العلامة", links: ["قصتنا", "المواد", "المجلة"] },
      { title: "تابعنا", links: ["Instagram", "Pinterest", "TikTok"] },
    ],
    copyright: "© 2025 كيوتيز للمجوهرات والساعات",
    secure: "الدفع عند الاستلام · التوصيل 7 د.ت",
  },
  card: { quickAdd: "إضافة سريعة", added: "أُضيفت إلى الحقيبة" },
  home: {
    heroEyebrow: "مجموعة الإرث",
    heroTitle1: "صُنعت",
    heroTitle2: "لتُذكر.",
    heroBody: "مجوهرات منحوتة وساعات دقيقة، تُصنع بعناية لكل فصل من حياتك.",
    heroCta: "تسوق المجموعة",
    heroAlt: "امرأة ترتدي مجوهرات فاخرة في ضوء عصر هادئ",
    featuredEyebrow: "مختارة لك",
    featuredTitle: "مجوهرات وساعات",
    shopAll: "عرض الكل",
    storyEyebrow: "فلسفتنا",
    storyTitle1: "فخامة هادئة،",
    storyTitle2: "بطابع شخصي.",
    storyBody: "تبدأ كل قطعة برسمة يدوية وتُنجز في مشغلنا الصغير، بمواد اختيرت لتدوم.",
    storyCta: "اكتشف المجموعة",
    storyAlt: "عارضة ترتدي مجوهرات ذهبية منحوتة",
    categoryEyebrow: "اعثر على قطعتك",
    categoryTitle: "تسوق حسب الفئة",
    categoryAlt: (name) => `مجموعة ${name}`,
  },
  shop: {
    eyebrow: "المجموعة",
    title: "المتجر",
    body: "مجوهرات وساعات متينة، صُممت بعناية لطقوسك اليومية.",
    searchPlaceholder: "ابحث في المجموعة",
    pieces: arabicCount,
    crafted: "صناعة مسؤولة",
    empty: "لم يُعثر على قطع",
    clear: "مسح التصفية",
  },
  product: {
    materials: "المواد",
    size: "اختر المقاس",
    added: "تمت الإضافة",
    add: "أضف إلى الحقيبة",
    assurances: [
      "التوصيل 7 د.ت، والدفع عند الاستلام",
      "إرجاع واستبدال خلال 30 يوماً",
      "ضمان عناية لمدة عامين",
      "تغليف كيوتيز المميز",
    ],
    related: "قد يعجبك أيضاً",
  },
  cart: {
    emptyTitle: "حقيبتك فارغة",
    emptyBody: "اكتشف قطعة صُنعت لتُقتنى.",
    emptyCta: "استكشف المجموعة",
    title: "حقيبتك",
    remove: "إزالة",
    summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    complimentary: "مجاني",
    total: "الإجمالي",
    checkout: "إتمام الطلب",
    noteTax: "الدفع نقداً عند الاستلام",
    noteReturns: "إرجاع مجاني خلال 30 يوماً",
  },
  checkout: {
    eyebrow: "الدفع عند الاستلام",
    title: "أتمم طلبك",
    contact: "التواصل",
    email: "البريد الإلكتروني",
    delivery: "التوصيل",
    firstName: "الاسم",
    lastName: "اسم العائلة",
    address: "العنوان",
    city: "المدينة",
    postal: "الرمز البريدي",
    payment: "الدفع",
    card: "رقم البطاقة",
    expiry: "تاريخ الانتهاء",
    security: "رمز الأمان",
    pieces: "قطعك",
    total: "الإجمالي",
    place: "تأكيد الطلب",
    secure: "ادفع للمندوب نقداً",
    confirmedEyebrow: "تم تأكيد الطلب",
    thanks: "شكراً لك.",
    confirmedBody: "تم تأكيد طلبك. ادفع المبلغ نقداً عند التسليم.",
    home: "العودة إلى الرئيسية",
  },
  notFound: { title: "هذه الصفحة غير متاحة.", home: "العودة إلى الرئيسية" },
  categories: {
    All: "الكل",
    Jewelry: "المجوهرات",
    Rings: "خواتم",
    Necklaces: "عقود",
    Bracelets: "أساور",
    Watches: "ساعات",
  },
};

const dictionaries: Record<Locale, Copy> = { en, fr, ar };

const frProducts: Record<ProductId, ProductText> = {
  "solis-necklace": {
    name: "Collier Solis",
    material: "Or recyclé 18 carats",
    label: "Nouveau",
    description: "Une chaîne fluide qui capte la lumière, inspirée de la première chaleur du matin. Elle se pose naturellement au creux de la clavicule.",
  },
  "elan-diamond-ring": {
    name: "Bague Élan diamant",
    material: "Or 18 carats · diamant de laboratoire",
    label: "Best-seller",
    description: "Un jonc fin serti d'un diamant de laboratoire taille brillant. Discret seul, saisissant lorsqu'il se superpose.",
  },
  "dune-signet": {
    name: "Chevalière Dune",
    material: "Or recyclé 18 carats",
    description: "Une chevalière aux formes douces et organiques, polie à la main jusqu'à ce que chaque courbe capte la lumière.",
  },
  "aria-pendant": {
    name: "Pendentif Aria",
    material: "Or recyclé 18 carats",
    label: "Édition limitée",
    description: "Un pendentif intemporel façonné à la main et suspendu à notre plus fine chaîne. Réalisé en édition limitée d'atelier.",
  },
  "luna-gold-watch": {
    name: "Montre Luna or",
    material: "Mouvement suisse · verre saphir",
    label: "Nouveau",
    description: "Une montre en or raffinée, au cadran discret et au mouvement suisse précis. Pensée pour un rythme élégant au quotidien.",
  },
  "etoile-watch": {
    name: "Montre Étoile",
    material: "Vermeil · verre saphir",
    label: "Exclusive",
    description: "Un boîtier rond et menu associé à un bracelet ivoire, entre proportion vintage et retenue contemporaine.",
  },
  "celeste-bracelet": {
    name: "Bracelet Céleste",
    material: "Or 18 carats · grenat",
    description: "Des perles d'or chaud ponctuées de grenat profond, enfilées à la main pour un mouvement souple et un porté confortable.",
  },
  "mira-watch": {
    name: "Montre Mira maille",
    material: "Acier inoxydable · mouvement suisse",
    description: "Un cadran argent épuré et un bracelet maille souple composent un classique moderne, du jour au soir.",
  },
};

const arProducts: Record<ProductId, ProductText> = {
  "solis-necklace": {
    name: "عقد سوليس",
    material: "ذهب معاد تدويره عيار 18",
    label: "جديد",
    description: "سلسلة انسيابية تلتقط الضوء، مستوحاة من دفء الصباح الأول. صُممت لتستقر برقة عند عظمة الترقوة.",
  },
  "elan-diamond-ring": {
    name: "خاتم إيلان بالماس",
    material: "ذهب عيار 18 · ألماس مزروع",
    label: "الأكثر مبيعاً",
    description: "حلقة ذهبية رفيعة مرصّعة بألماس مزروع بقطع لامع. هادئة وحدها، لافتة حين تُرتدى مع غيرها.",
  },
  "dune-signet": {
    name: "خاتم دون",
    material: "ذهب معاد تدويره عيار 18",
    description: "خاتم ختم منحوت بنعومة وخطوط عضوية، مصقول يدوياً حتى تلتقط كل انحناءة الضوء.",
  },
  "aria-pendant": {
    name: "قلادة آريا",
    material: "ذهب معاد تدويره عيار 18",
    label: "إصدار محدود",
    description: "قلادة خالدة شُكّلت يدوياً وعُلّقت بسلسلتنا الأنعم. تُصنع بإصدار محدود من المشغل.",
  },
  "luna-gold-watch": {
    name: "ساعة لونا الذهبية",
    material: "حركة سويسرية · كريستال ياقوت",
    label: "جديد",
    description: "ساعة ذهبية راقية بقرص هادئ وحركة سويسرية دقيقة. صُممت لإيقاع أنيق كل يوم.",
  },
  "etoile-watch": {
    name: "ساعة إتوال",
    material: "ذهب مطلي · كريستال ياقوت",
    label: "حصرية",
    description: "علبة دائرية صغيرة مع سوار عاجي ناعم، توازن بين تناسب كلاسيكي ورزانة معاصرة.",
  },
  "celeste-bracelet": {
    name: "سوار سيليست",
    material: "ذهب عيار 18 · عقيق أحمر",
    description: "خرز من الذهب الدافئ تتخلله حبات عقيق عميقة، تُنظم يدوياً لحركة خفيفة ومقاس مريح.",
  },
  "mira-watch": {
    name: "ساعة ميرا الشبكية",
    material: "فولاذ مقاوم للصدأ · حركة سويسرية",
    description: "قرص فضي صافٍ وسوار شبكي مرن يصنعان كلاسيكية عصرية تنتقل بسهولة من النهار إلى المساء.",
  },
};

const catalogs: Record<Exclude<Locale, "en">, Record<ProductId, ProductText>> = {
  fr: frProducts,
  ar: arProducts,
};

function arabicCount(count: number) {
  if (count === 0) return "لا قطع";
  if (count === 1) return "قطعة واحدة";
  if (count === 2) return "قطعتان";
  if (count >= 3 && count <= 10) return `${count} قطع`;
  return `${count} قطعة`;
}

export function formatPrice(price: number, locale: Locale) {
  const intlLocale = locale === "fr" ? "fr-FR" : locale === "ar" ? "ar" : "en-US";
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 0,
    numberingSystem: "latn",
  }).format(price);
}

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "en") return product;
  const text = catalogs[locale][product.id as ProductId];
  if (!text) throw new Error(`Missing ${locale} translation for ${product.id}`);
  return {
    ...product,
    name: text.name,
    material: text.material,
    description: text.description,
    label: text.label,
  };
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: Copy;
  localize: (product: Product) => Product;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLocale(): Locale {
  const saved = window.localStorage.getItem("cuties-locale");
  if (saved === null) return "en";
  if (saved === "en" || saved === "fr" || saved === "ar") return saved;
  throw new Error(`Unsupported locale "${saved}"`);
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  document.title = dictionaries[locale].meta.title;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = readLocale();
    applyLocale(initial);
    return initial;
  });

  const setLocale = (next: Locale) => {
    applyLocale(next);
    window.localStorage.setItem("cuties-locale", next);
    setLocaleState(next);
  };

  const value: LanguageContextValue = {
    locale,
    setLocale,
    copy: dictionaries[locale],
    localize: (product) => localizeProduct(product, locale),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLocale must be used within LanguageProvider");
  return context;
}
