const pages = [
  "/",
  "/shop",
  "/shop?category=Jewelry",
  "/shop?category=Rings",
  "/shop?category=Necklaces",
  "/shop?category=Bracelets",
  "/shop?category=Watches",
];

function siteOrigin(url: string | undefined) {
  if (!url) throw new Error("Missing VITE_SITE_URL");
  const parsed = new URL(url);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("VITE_SITE_URL must be an http or https URL");
  }
  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("VITE_SITE_URL must be an origin with no path");
  }
  return parsed.origin;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function seoFiles(env: { VITE_API_URL: string | undefined; VITE_SITE_URL: string | undefined }) {
  const origin = siteOrigin(env.VITE_SITE_URL);
  const api = env.VITE_API_URL;
  if (!api) throw new Error("Missing VITE_API_URL");

  const response = await fetch(`${api}/api/products`);
  if (!response.ok) throw new Error(`Product list failed: ${response.status}`);
  const products: unknown = await response.json();
  if (!Array.isArray(products)) throw new Error("Product list was not an array");

  const paths = [...pages];
  for (const product of products) {
    if (!product || typeof product !== "object" || !("id" in product) || typeof product.id !== "string" || product.id.length === 0) {
      throw new Error("Product is missing an id");
    }
    paths.push(`/product/${product.id}`);
  }

  const robots = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /cart",
    "Disallow: /checkout",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  const urls = paths
    .map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`)
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return { robots, sitemap };
}
