"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, priority = false }) {
  const { title, image, category } = product;
  const [wishlisted, setWishlisted] = useState(false);

  /* Mock out of stock for demonstration (e.g. index % 3 == 0) */
  // Actually, I'll check if the title contains a specific word or just static for now as a demo item
  const isOutOfStock = title.toLowerCase().includes("jacket"); // example criteria

  return (
    <article className={styles.card}>

      {/* --- Image ------------------------------------------- */}
      <div className={styles.imageBox}>
        <Image
          src={image}
          alt={`${title} - ${category}`}
          fill
          sizes="(max-width: 540px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={styles.img}
          style={{ objectFit: "contain" }}
          priority={priority}
        />

        {/* OUT OF STOCK overlay (if applicable) */}
        {isOutOfStock && (
          <div className={styles.outOfStockOverlay} aria-label="Out of stock">
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* --- Info -------------------------------------------- */}
      <div className={styles.info}>
        {/* Product Title - clamped to 1 line in some displays, 2 in others */}
        <h2 className={styles.name}>{title}</h2>

        {/* Action / Pricing logic as per screenshot */}
        <p className={styles.pricingAction}>
          <span>Sign in</span> or Create an account to see pricing
        </p>

        {/* Wishlist toggle at the bottom inline with price area if needed */}
        <div className={styles.bottomRow}>
          <button
            className={styles.wishlistBtn}
            onClick={(e) => {
              e.preventDefault();
              setWishlisted((v) => !v);
            }}
            aria-label={
              wishlisted
                ? `Remove ${title} from wishlist`
                : `Add ${title} to wishlist`
            }
            aria-pressed={wishlisted}
          >
            <Heart
              size={20}
              strokeWidth={1.8}
              fill={wishlisted ? "var(--clr-accent-pink)" : "none"}
              stroke={wishlisted ? "var(--clr-accent-pink)" : "var(--clr-text-400)"}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
