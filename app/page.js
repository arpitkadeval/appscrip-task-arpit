import SiteHeader from "./components/SiteHeader/SiteHeader";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import ProductSection from "./components/ProductSection/ProductSection";
import styles from "./HomePage.module.css";

/**
 * Fetch all products from the FakeStore API.
 * This function runs on the SERVER (SSR) - Next.js App Router
 * Server Components are async by default.
 */
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      // No cache - always fresh data from the server on each request (SSR)
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`FakeStore API responded with status ${res.status}`);
    }

    return await res.json();
  } catch {
    // Graceful fallback - the page still renders without products
    return [];
  }
}

export const metadata = {
  title: "Discover Our Products | Metta Muse",
  description:
    "Shop our handpicked collection of premium handcrafted bags, accessories and lifestyle products. From recycled backpacks to artisan jewellery - find your next favourite at Metta Muse.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  // SSR: products are fetched and rendered on the server before HTML is sent
  const products = await fetchProducts();

  /* JSON-LD structured data for the product listing page */
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discover Our Products - Metta Muse",
    description:
      "Browse handcrafted bags, accessories and lifestyle products at Metta Muse.",
    url: "https://appscrip-task-arpit.netlify.app/",
    hasPart: products.slice(0, 6).map((p) => ({
      "@type": "Product",
      name: p.title,
      description: p.description,
      image: p.image,
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: p.rating
        ? {
          "@type": "AggregateRating",
          ratingValue: p.rating.rate,
          reviewCount: p.rating.count,
        }
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <SiteHeader />

      <main className={styles.mainContent}>
        {/* Hero / page intro */}
        <div className={styles.heroSection}>

          <h1 className={styles.heroTitle}>DISCOVER OUR PRODUCTS</h1>
          <p className={styles.heroDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet est
            placerat rhoncus scelerisque nibh amet mi ut elementum dolor.
          </p>
        </div>

        {/* Product listing with filter & sort */}
        <ProductSection initialProducts={products} />
      </main>

      <SiteFooter />
    </>
  );
}
