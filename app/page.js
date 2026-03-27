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
  const API_URL = "https://fakestoreapi.com/products";
  
  try {
    // Add an 8-second timeout to prevent server-side hangs
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(API_URL, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`API responded with status: ${res.status}`);
      throw new Error("API error");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch products failed, using backup data:", error.message);
    // Graceful fallback - constant data defined here ensures site functionality
    return [
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        "rating": { "rate": 3.9, "count": 120 }
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        "rating": { "rate": 4.1, "count": 259 }
      },
      {
        "id": 15,
        "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket",
        "price": 56.99,
        "description": "Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
        "rating": { "rate": 2.6, "count": 235 }
      },
      {
        "id": 17,
        "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
        "price": 39.99,
        "description": "Lightweight perfet for trip or casual wear...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
        "rating": { "rate": 3.8, "count": 679 }
      }
    ];
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
          <h2 className={styles.heroDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet est
            placerat rhoncus scelerisque nibh amet mi ut elementum dolor.
          </h2>
        </div>

        {/* Product listing with filter & sort */}
        <ProductSection initialProducts={products} />
      </main>

      <SiteFooter />
    </>
  );
}
