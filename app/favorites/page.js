"use client";

import { useFavorites } from "@/app/context/FavoriteContext";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import SiteHeader from "@/app/components/SiteHeader/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter/SiteFooter";
import styles from "./Favorites.module.css";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.container}>
        <SiteHeader />
        <main className={styles.main}>
          <div className={styles.breadcrumb}>
             <Link href="/">HOME</Link>
             <ChevronRight size={14} />
             <span>FAVORITES</span>
          </div>
          <h1 className={styles.title}>MY FAVORITES</h1>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SiteHeader />
      
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/">HOME</Link>
          <ChevronRight size={14} />
          <span>FAVORITES</span>
        </div>

        <h1 className={styles.title}>MY FAVORITES</h1>
        
        {favorites.length > 0 ? (
          <div className={styles.grid}>
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>You haven't favorited any items yet.</p>
            <Link href="/" className={styles.shopBtn}>START SHOPPING</Link>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
