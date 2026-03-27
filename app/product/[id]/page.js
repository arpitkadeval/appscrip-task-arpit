import Script from "next/script";
import SiteHeader from "@/app/components/SiteHeader/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter/SiteFooter";
import styles from "./ProductDetail.module.css";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Metta Muse",
    },
    offers: {
      "@type": "Offer",
      url: `https://appscrip-task-arpit.netlify.app/product/${id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className={styles.container}>
      <SiteHeader />

      <main className={styles.main}>
        {/* --- SEO Metadata and Schema ------------------------- */}
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className={styles.breadcrumb}>
          <Link href="/">HOME</Link>
          <ChevronRight size={14} />
          <Link href="/">{product.category.toUpperCase()}</Link>
          <ChevronRight size={14} />
          <span>{product.title}</span>
        </div>

        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> BACK TO PRODUCTS
        </Link>

        <section className={styles.productSection}>
          <div className={styles.imageCol}>
            <div className={styles.imageBox}>
              <Image
                src={product.image}
                alt={`${product.title} - Handcrafted Premium Quality | Metta Muse`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.img}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className={styles.infoCol}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.category}>{product.category}</p>
            
            <div className={styles.priceRow}>
              {/* Product page shows actual price since they've clicked through */}
              <span className={styles.price}>${product.price}</span>
              <span className={styles.taxNote}>INCL. ALL TAXES</span>
            </div>

            <div className={styles.description}>
              <h2 className={styles.sectionTitle}>DESCRIPTION</h2>
              <p>{product.description}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.buyBtn}>ADD TO BAG</button>
              <p className={styles.pricingActionNote}>
                Shipping standard 2-5 business days. Free returns and exchanges.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Generate dynamic metadata for the product page
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProduct(id);
    return {
      title: `${product.title} | Metta Muse`,
      description: product.description.slice(0, 160),
      openGraph: {
        images: [product.image],
      },
    };
  } catch (e) {
    return { title: "Product Not Found | Metta Muse" };
  }
}
