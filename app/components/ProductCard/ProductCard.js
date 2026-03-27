"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/app/context/FavoriteContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, priority = false }) {
  const { id, title, image, category } = product;
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imgLoaded, setImgLoaded] = useState(false);
  const wishlisted = isFavorite(id);

  /* Mock out of stock for demonstration (e.g. index % 3 == 0) */
  const isOutOfStock = title.toLowerCase().includes("jacket") && id % 2 === 0;

  return (
    <article className={styles.card}>
      <Link href={`/product/${id}`} className={styles.cardLink} aria-label={`View details for ${title}`}>
        {/* --- Image ------------------------------------------- */}
        <div className={`${styles.imageBox} ${!imgLoaded ? styles.skeleton : ""}`}>
          <Image
            src={image}
            alt={`${title} - Handcrafted ${category} | Metta Muse`}
            fill
            sizes="(max-width: 540px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`${styles.img} ${imgLoaded ? styles.imgVisible : ""}`}
            style={{ objectFit: "contain" }}
            priority={priority}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Hover Overlay */}
          <div className={styles.hoverOverlay} />

          {/* OUT OF STOCK overlay (if applicable) */}
          {isOutOfStock && (
            <div className={styles.outOfStockOverlay} aria-label="Out of stock">
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* --- Info -------------------------------------------- */}
        <div className={styles.info}>
          <h3 className={styles.name}>{title}</h3>
          
         <div className={styles.pricingContainer}>
           <p className={styles.pricingAction}>
            <span className={styles.signInLink}>Sign in</span> or Create an account to see pricing
          </p>

          <div className={styles.bottomRow}>
            <button
              className={styles.wishlistBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(product);
              }}
              aria-label={
                wishlisted
                  ? `Remove ${title} from favorites`
                  : `Add ${title} to favorites`
              }
              aria-pressed={wishlisted}
            >
              <Heart
                size={22}
                strokeWidth={wishlisted ? 0 : 1.5}
                fill={wishlisted ? "#eb5757" : "none"}
                stroke={wishlisted ? "#eb5757" : "#222"}
                className={wishlisted ? styles.heartActive : ""}
              />
            </button>
          </div>
         </div>
        </div>
      </Link>
    </article>
  );
}
