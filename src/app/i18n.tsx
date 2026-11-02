import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { products, type Product } from "./data";

export type LegalDocument = {
  title: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

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
    columns: { title: string; links: { label: string; to: string }[] }[];
    copyright: string;
    secure: string;
  };
  legal: {
    privacy: LegalDocument;
    policies: LegalDocument;
    terms: LegalDocument;
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
    color: string;
    added: string;
    add: string;
    outOfStock: string;
    orderTitle: string;
    orderBody: string;
    name: string;
    address: string;
    phone: string;
    buy: string;
    placing: string;
    thanks: string;
    confirmed: string;
    close: string;
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
      { title: "Client care", links: [
        { label: "Contact", to: "/" },
        { label: "Shipping & returns", to: "/policies" },
        { label: "Care guide", to: "/policies" },
      ] },
      { title: "About", links: [
        { label: "Our story", to: "/" },
        { label: "Materials", to: "/" },
        { label: "Journal", to: "/" },
      ] },
      { title: "Follow", links: [
        { label: "Instagram", to: "/" },
        { label: "Pinterest", to: "/" },
        { label: "TikTok", to: "/" },
      ] },
    ],
    copyright: "© 2025 Cuties Fine Jewelry & Watches",
    secure: "Cash on delivery · Delivery 7 DT",
  },
  legal: {
    privacy: {
      title: "Privacy",
      updated: "Updated 1 November 2026",
      sections: [
        {
          heading: "What this covers",
          paragraphs: [
            "This page explains what Cuties keeps when you visit the shop or place an order. There is no customer account.",
          ],
        },
        {
          heading: "What you give us",
          paragraphs: [
            "An order from a product page includes your name, address, phone number, the piece, its color, and the quantity.",
            "Checkout includes your email, first name, last name, address, city, and postal code, with the pieces in your bag.",
          ],
        },
        {
          heading: "What stays in your browser",
          paragraphs: [
            "Your bag and your language choice are saved on this device so they are still there when you come back. We do not use that information to advertise to you.",
          ],
        },
        {
          heading: "Why we use it",
          paragraphs: [
            "We use the order details to prepare the piece, call you, and deliver it. We do not sell this information.",
          ],
        },
        {
          heading: "Payment",
          paragraphs: [
            "You pay cash when the order arrives. We do not ask for a card number.",
          ],
        },
        {
          heading: "How long we keep an order",
          paragraphs: [
            "We keep the order while we need it to deliver the piece and to handle a return or the two-year care warranty.",
          ],
        },
        {
          heading: "Who is on the site",
          paragraphs: [
            "While a shop page is open, we record that this browser is here and the approximate city of the connection. This is not tied to your name. It is removed about a minute after you leave.",
          ],
        },
      ],
    },
    policies: {
      title: "Policies",
      updated: "Updated 1 November 2026",
      sections: [
        {
          heading: "Delivery",
          paragraphs: [
            "Delivery is 7 DT on every order. That amount is added to the total before you place the order.",
          ],
        },
        {
          heading: "Payment",
          paragraphs: [
            "You pay cash when the order arrives. We call the phone number on the order to confirm delivery.",
          ],
        },
        {
          heading: "Returns",
          paragraphs: [
            "You can return or exchange a piece within 30 days of delivery if it is unworn and still in its Cuties packaging. Tell us when we call, or when the order is delivered.",
          ],
        },
        {
          heading: "Care warranty",
          paragraphs: [
            "A piece has a two-year care warranty for a fault in how it was made. The warranty does not cover loss, everyday wear, or damage after delivery.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms and conditions",
      updated: "Updated 1 November 2026",
      sections: [
        {
          heading: "Orders",
          paragraphs: [
            "Cuties sells jewelry and watches on this website. When you submit an order, you ask us to sell you the pieces shown, at the price on the page, plus 7 DT for delivery.",
            "We accept the order when we confirm it with you and can deliver it. We will not fulfill an order if the piece is no longer in stock or if the name, address, or phone number cannot be used for delivery.",
          ],
        },
        {
          heading: "Prices",
          paragraphs: [
            "Prices are in Tunisian dinars. The price that applies is the price shown when you submit the order.",
          ],
        },
        {
          heading: "Your details",
          paragraphs: [
            "You must give a name, an address, and a phone number that we can use to reach you and deliver the order.",
          ],
        },
        {
          heading: "Delivery and payment",
          paragraphs: [
            "Delivery and cash payment follow the Policies page. You pay the order total, including the 7 DT delivery fee, in cash when it arrives.",
          ],
        },
        {
          heading: "Returns and care",
          paragraphs: [
            "Returns and the care warranty follow the Policies page.",
          ],
        },
        {
          heading: "This website",
          paragraphs: [
            "The photographs and text on this website belong to Cuties. You may not copy them for your own shop.",
          ],
        },
      ],
    },
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
    color: "Color",
    added: "Added",
    add: "Add to bag",
    outOfStock: "Out of stock",
    orderTitle: "Order this piece",
    orderBody: "Leave your name, address, and phone number. Pay cash when it arrives.",
    name: "Name",
    address: "Address",
    phone: "Phone number",
    buy: "Buy",
    placing: "Placing order",
    thanks: "Order received",
    confirmed: "We will call you to confirm delivery.",
    close: "Close",
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
      { title: "Service client", links: [
        { label: "Contact", to: "/" },
        { label: "Livraison et retours", to: "/policies" },
        { label: "Guide d'entretien", to: "/policies" },
      ] },
      { title: "À propos", links: [
        { label: "Notre histoire", to: "/" },
        { label: "Matières", to: "/" },
        { label: "Journal", to: "/" },
      ] },
      { title: "Suivre", links: [
        { label: "Instagram", to: "/" },
        { label: "Pinterest", to: "/" },
        { label: "TikTok", to: "/" },
      ] },
    ],
    copyright: "© 2025 Cuties Joaillerie & Montres",
    secure: "Paiement à la livraison · Livraison 7 DT",
  },
  legal: {
    privacy: {
      title: "Confidentialité",
      updated: "Mis à jour le 1 novembre 2026",
      sections: [
        {
          heading: "Ce que cela couvre",
          paragraphs: [
            "Cette page explique ce que Cuties conserve quand vous visitez la boutique ou passez une commande. Il n'y a pas de compte client.",
          ],
        },
        {
          heading: "Ce que vous nous donnez",
          paragraphs: [
            "Une commande depuis une fiche produit comprend votre nom, votre adresse, votre numéro de téléphone, la pièce, sa couleur et la quantité.",
            "Le paiement comprend votre e-mail, votre prénom, votre nom, votre adresse, votre ville et votre code postal, avec les pièces de votre sac.",
          ],
        },
        {
          heading: "Ce qui reste dans votre navigateur",
          paragraphs: [
            "Votre sac et votre langue sont enregistrés sur cet appareil pour être encore là à votre retour. Nous n'utilisons pas ces informations pour vous afficher de la publicité.",
          ],
        },
        {
          heading: "Pourquoi nous les utilisons",
          paragraphs: [
            "Nous utilisons les détails de la commande pour préparer la pièce, vous appeler et la livrer. Nous ne vendons pas ces informations.",
          ],
        },
        {
          heading: "Paiement",
          paragraphs: [
            "Vous payez en espèces à l'arrivée de la commande. Nous ne demandons pas de numéro de carte.",
          ],
        },
        {
          heading: "Combien de temps nous gardons une commande",
          paragraphs: [
            "Nous gardons la commande tant que nous en avons besoin pour livrer la pièce et pour un retour ou la garantie d'entretien de deux ans.",
          ],
        },
        {
          heading: "Qui est sur le site",
          paragraphs: [
            "Tant qu'une page de la boutique est ouverte, nous notons que ce navigateur est là et la ville approximative de la connexion. Ce n'est pas relié à votre nom. C'est retiré environ une minute après votre départ.",
          ],
        },
      ],
    },
    policies: {
      title: "Politiques",
      updated: "Mis à jour le 1 novembre 2026",
      sections: [
        {
          heading: "Livraison",
          paragraphs: [
            "La livraison est de 7 DT pour chaque commande. Ce montant est ajouté au total avant que vous passiez la commande.",
          ],
        },
        {
          heading: "Paiement",
          paragraphs: [
            "Vous payez en espèces à l'arrivée de la commande. Nous appelons le numéro indiqué sur la commande pour confirmer la livraison.",
          ],
        },
        {
          heading: "Retours",
          paragraphs: [
            "Vous pouvez retourner ou échanger une pièce dans les 30 jours après la livraison si elle n'a pas été portée et qu'elle est encore dans son écrin Cuties. Dites-le-nous lors de l'appel, ou à la livraison.",
          ],
        },
        {
          heading: "Garantie d'entretien",
          paragraphs: [
            "Une pièce a une garantie d'entretien de deux ans pour un défaut de fabrication. La garantie ne couvre pas la perte, l'usure du quotidien, ni un dommage après la livraison.",
          ],
        },
      ],
    },
    terms: {
      title: "Conditions générales",
      updated: "Mis à jour le 1 novembre 2026",
      sections: [
        {
          heading: "Commandes",
          paragraphs: [
            "Cuties vend des bijoux et des montres sur ce site. Quand vous envoyez une commande, vous nous demandez de vous vendre les pièces affichées, au prix de la page, plus 7 DT de livraison.",
            "Nous acceptons la commande quand nous la confirmons avec vous et que nous pouvons la livrer. Nous ne livrons pas une commande si la pièce n'est plus en stock, ou si le nom, l'adresse ou le numéro de téléphone ne permettent pas la livraison.",
          ],
        },
        {
          heading: "Prix",
          paragraphs: [
            "Les prix sont en dinars tunisiens. Le prix qui s'applique est celui affiché au moment où vous envoyez la commande.",
          ],
        },
        {
          heading: "Vos coordonnées",
          paragraphs: [
            "Vous devez donner un nom, une adresse et un numéro de téléphone que nous pouvons utiliser pour vous joindre et livrer la commande.",
          ],
        },
        {
          heading: "Livraison et paiement",
          paragraphs: [
            "La livraison et le paiement en espèces suivent la page Politiques. Vous payez le total de la commande, frais de livraison de 7 DT compris, en espèces à l'arrivée.",
          ],
        },
        {
          heading: "Retours et entretien",
          paragraphs: [
            "Les retours et la garantie d'entretien suivent la page Politiques.",
          ],
        },
        {
          heading: "Ce site",
          paragraphs: [
            "Les photographies et les textes de ce site appartiennent à Cuties. Vous ne pouvez pas les copier pour votre propre boutique.",
          ],
        },
      ],
    },
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
    color: "Couleur",
    added: "Ajouté",
    add: "Ajouter au sac",
    outOfStock: "Rupture de stock",
    orderTitle: "Commander cette pièce",
    orderBody: "Laissez votre nom, votre adresse et votre numéro de téléphone. Payez en espèces à la livraison.",
    name: "Nom",
    address: "Adresse",
    phone: "Numéro de téléphone",
    buy: "Acheter",
    placing: "Commande en cours",
    thanks: "Commande reçue",
    confirmed: "Nous vous appellerons pour confirmer la livraison.",
    close: "Fermer",
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
      { title: "خدمة العملاء", links: [
        { label: "تواصل", to: "/" },
        { label: "الشحن والإرجاع", to: "/policies" },
        { label: "دليل العناية", to: "/policies" },
      ] },
      { title: "عن العلامة", links: [
        { label: "قصتنا", to: "/" },
        { label: "المواد", to: "/" },
        { label: "المجلة", to: "/" },
      ] },
      { title: "تابعنا", links: [
        { label: "Instagram", to: "/" },
        { label: "Pinterest", to: "/" },
        { label: "TikTok", to: "/" },
      ] },
    ],
    copyright: "© 2025 كيوتيز للمجوهرات والساعات",
    secure: "الدفع عند الاستلام · التوصيل 7 د.ت",
  },
  legal: {
    privacy: {
      title: "الخصوصية",
      updated: "آخر تحديث في 1 نوفمبر 2026",
      sections: [
        {
          heading: "ماذا تشمل هذه الصفحة",
          paragraphs: [
            "توضح هذه الصفحة ما تحتفظ به كيوتيز عندما تزور المتجر أو ترسل طلباً. لا يوجد حساب للعميل.",
          ],
        },
        {
          heading: "ما تقدمه لنا",
          paragraphs: [
            "الطلب من صفحة القطعة يشمل اسمك وعنوانك ورقم هاتفك والقطعة ولونها والكمية.",
            "إتمام الشراء يشمل بريدك الإلكتروني واسمك الأول واسم العائلة والعنوان والمدينة والرمز البريدي، مع القطع الموجودة في الحقيبة.",
          ],
        },
        {
          heading: "ما يبقى في متصفحك",
          paragraphs: [
            "تُحفظ حقيبتك واختيار اللغة على هذا الجهاز ليبقيا عند عودتك. لا نستخدم هذه المعلومات لعرض إعلانات عليك.",
          ],
        },
        {
          heading: "لماذا نستخدمها",
          paragraphs: [
            "نستخدم تفاصيل الطلب لتجهيز القطعة والاتصال بك وتوصيلها. لا نبيع هذه المعلومات.",
          ],
        },
        {
          heading: "الدفع",
          paragraphs: [
            "تدفع نقداً عند وصول الطلب. لا نطلب رقم بطاقة.",
          ],
        },
        {
          heading: "كم نحتفظ بالطلب",
          paragraphs: [
            "نحتفظ بالطلب ما دمنا نحتاجه لتوصيل القطعة ولمعالجة الإرجاع أو ضمان العناية لمدة عامين.",
          ],
        },
        {
          heading: "من هو في الموقع",
          paragraphs: [
            "ما دامت صفحة من المتجر مفتوحة، نسجل أن هذا المتصفح موجود والمدينة التقريبية للاتصال. هذا غير مرتبط باسمك. يُحذف بعد نحو دقيقة من مغادرتك.",
          ],
        },
      ],
    },
    policies: {
      title: "السياسات",
      updated: "آخر تحديث في 1 نوفمبر 2026",
      sections: [
        {
          heading: "التوصيل",
          paragraphs: [
            "التوصيل 7 د.ت لكل طلب. يُضاف هذا المبلغ إلى المجموع قبل إرسال الطلب.",
          ],
        },
        {
          heading: "الدفع",
          paragraphs: [
            "تدفع نقداً عند وصول الطلب. نتصل برقم الهاتف المكتوب في الطلب لتأكيد التوصيل.",
          ],
        },
        {
          heading: "الإرجاع",
          paragraphs: [
            "يمكنك إرجاع القطعة أو استبدالها خلال 30 يوماً من التوصيل إذا لم تُلبس وما زالت في تغليف كيوتيز. أخبرنا عند الاتصال، أو عند تسليم الطلب.",
          ],
        },
        {
          heading: "ضمان العناية",
          paragraphs: [
            "لكل قطعة ضمان عناية لمدة عامين إذا كان الخلل في الصنع. لا يشمل الضمان الفقدان أو الاستعمال اليومي أو التلف بعد التوصيل.",
          ],
        },
      ],
    },
    terms: {
      title: "الشروط والأحكام",
      updated: "آخر تحديث في 1 نوفمبر 2026",
      sections: [
        {
          heading: "الطلبات",
          paragraphs: [
            "تبيع كيوتيز المجوهرات والساعات على هذا الموقع. عندما ترسل طلباً، فأنت تطلب شراء القطع المعروضة بالسعر الظاهر في الصفحة، مع 7 د.ت للتوصيل.",
            "نقبل الطلب عندما نؤكده معك ونقدر على توصيله. لا ننفذ الطلب إذا لم تعد القطعة متوفرة، أو إذا تعذر استخدام الاسم أو العنوان أو رقم الهاتف للتوصيل.",
          ],
        },
        {
          heading: "الأسعار",
          paragraphs: [
            "الأسعار بالدينار التونسي. السعر المعتمد هو السعر الظاهر عند إرسال الطلب.",
          ],
        },
        {
          heading: "بياناتك",
          paragraphs: [
            "يجب أن تكتب اسماً وعنواناً ورقم هاتف يمكننا استخدامهما للوصول إليك وتوصيل الطلب.",
          ],
        },
        {
          heading: "التوصيل والدفع",
          paragraphs: [
            "يتبع التوصيل والدفع نقداً صفحة السياسات. تدفع مجموع الطلب، شاملاً 7 د.ت للتوصيل، نقداً عند الوصول.",
          ],
        },
        {
          heading: "الإرجاع والعناية",
          paragraphs: [
            "يتبع الإرجاع وضمان العناية صفحة السياسات.",
          ],
        },
        {
          heading: "هذا الموقع",
          paragraphs: [
            "الصور والنصوص في هذا الموقع ملك لكيوتيز. لا يجوز نسخها لمتجرك.",
          ],
        },
      ],
    },
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
    color: "اللون",
    added: "تمت الإضافة",
    add: "أضف إلى الحقيبة",
    outOfStock: "غير متوفر",
    orderTitle: "اطلب هذه القطعة",
    orderBody: "اكتب اسمك وعنوانك ورقم هاتفك. الدفع نقداً عند التوصيل.",
    name: "الاسم",
    address: "العنوان",
    phone: "رقم الهاتف",
    buy: "شراء",
    placing: "جارٍ إرسال الطلب",
    thanks: "تم استلام الطلب",
    confirmed: "سنتصل بك لتأكيد التوصيل.",
    close: "إغلاق",
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
  if (saved === null) return "ar";
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
