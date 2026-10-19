export const deliveryFee = 7;

export type Product = {
  id: string;
  name: string;
  category: "Rings" | "Necklaces" | "Bracelets" | "Watches";
  price: number;
  image: string;
  material: string;
  label?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "solis-necklace",
    name: "The Solis Necklace",
    category: "Necklaces",
    price: 580,
    image:
      "https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?auto=format&fit=crop&w=1200&q=85",
    material: "18k recycled gold",
    label: "New",
    description:
      "A fluid, light-catching chain inspired by the first warmth of morning. Designed to sit effortlessly at the collarbone.",
  },
  {
    id: "elan-diamond-ring",
    name: "Élan Diamond Ring",
    category: "Rings",
    price: 1240,
    image:
      "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?auto=format&fit=crop&w=1200&q=85",
    material: "18k gold · lab-grown diamond",
    label: "Bestseller",
    description:
      "A slender gold band set with a brilliant-cut lab-grown diamond. Understated alone and striking when stacked.",
  },
  {
    id: "dune-signet",
    name: "Dune Signet",
    category: "Rings",
    price: 690,
    image:
      "https://images.unsplash.com/photo-1689367436629-1d288f1e23b6?auto=format&fit=crop&w=1200&q=85",
    material: "18k recycled gold",
    description:
      "A softly sculpted signet with an organic profile, hand-polished until every curve catches the light.",
  },
  {
    id: "aria-pendant",
    name: "Aria Pendant",
    category: "Necklaces",
    price: 460,
    image:
      "https://images.unsplash.com/photo-1673131158657-4404fd1f041a?auto=format&fit=crop&w=1200&q=85",
    material: "18k recycled gold",
    label: "Limited",
    description:
      "A timeless pendant formed by hand and suspended from our finest trace chain. Made in a limited atelier edition.",
  },
  {
    id: "luna-gold-watch",
    name: "Luna Gold Watch",
    category: "Watches",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1760532466984-39c3eb7f1254?auto=format&fit=crop&w=1200&q=85",
    material: "Swiss movement · sapphire crystal",
    label: "New",
    description:
      "A refined gold timepiece with a quiet dial and precise Swiss movement. Designed for an elegant everyday rhythm.",
  },
  {
    id: "etoile-watch",
    name: "Étoile Watch",
    category: "Watches",
    price: 1490,
    image:
      "https://images.unsplash.com/photo-1517870536153-52969f5ee838?auto=format&fit=crop&w=1200&q=85",
    material: "Gold vermeil · sapphire crystal",
    label: "Exclusive",
    description:
      "A petite round case paired with a soft ivory strap, balancing vintage proportion with contemporary restraint.",
  },
  {
    id: "celeste-bracelet",
    name: "Céleste Bracelet",
    category: "Bracelets",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=85",
    material: "18k gold · garnet",
    description:
      "Warm gold beads punctuated by deep garnet, strung by hand for subtle movement and a comfortable fit.",
  },
  {
    id: "mira-watch",
    name: "Mira Mesh Watch",
    category: "Watches",
    price: 1320,
    image:
      "https://images.unsplash.com/photo-1760532467646-b9e466403862?auto=format&fit=crop&w=1200&q=85",
    material: "Stainless steel · Swiss movement",
    description:
      "A clean silver dial and supple mesh bracelet create a modern classic that moves easily from day to evening.",
  },
];
