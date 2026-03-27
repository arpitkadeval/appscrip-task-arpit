"use client";

import { useState, useMemo } from "react";
import ProductCard from "../ProductCard/ProductCard";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import styles from "./ProductSection.module.css";

const SORT_OPTIONS = [
  { value: "recommended", label: "RECOMMENDED" },
  { value: "newest",      label: "NEWEST FIRST" },
  { value: "popular",     label: "POPULAR" },
  { value: "price-high",  label: "PRICE: HIGH TO LOW" },
  { value: "price-low",   label: "PRICE: LOW TO HIGH" },
];

export default function ProductSection({ initialProducts }) {
  const [sortBy,      setSortBy]      = useState("recommended");
  const [sortOpen,    setSortOpen]    = useState(false);
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [filters,     setFilters]     = useState({});

  /* Sorting logic */
  const sortedProducts = useMemo(() => {
    let list = [...initialProducts];

    /* Apply filters (mock logic for now since data is flat) */
    // In a real app, we would match list items with category/ideal-for etc.
    if (filters["IDEAL FOR"]?.length > 0) {
      if (!filters["IDEAL FOR"].includes("All")) {
        // Mock filtering based on some simple mapping or just placeholder
        // list = list.filter(p => filters["IDEAL FOR"].includes(someAttr))
      }
    }

    /* Sort results */
    switch (sortBy) {
      case "price-high": return list.sort((a, b) => b.price - a.price);
      case "price-low":  return list.sort((a, b) => a.price - b.price);
      case "popular":    return list.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
      case "newest":     return list.reverse();
      default:           return list;
    }
  }, [initialProducts, sortBy, filters]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "RECOMMENDED";

  return (
    <section className={styles.productSection}>
      
      {/* --- Toolbar --------------------------------------- */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.itemCount}>{sortedProducts.length} ITEMS</span>
          
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setFilterOpen((v) => !v)}
            aria-expanded={filterOpen}
            aria-label={filterOpen ? "Hide filter sidebar" : "Show filter sidebar"}
          >
            {/* Simple arrow SVG */}
            <svg 
              width="10" height="10" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            {filterOpen ? "HIDE FILTER" : "SHOW FILTER"}
          </button>
        </div>

        <div className={styles.toolbarRight}>
          {/* Sort dropdown */}
          <div className={styles.sortWrapper}>
            <button
              className={styles.sortBtn}
              onClick={() => setSortOpen((v) => !v)}
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
              aria-label={`Sort by: ${currentSortLabel}`}
            >
              {currentSortLabel}
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                aria-hidden="true"
                style={{ marginLeft: "4px", transform: sortOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
              >
                <path d="M6 8L1 3h10L6 8z" />
              </svg>
            </button>

            {sortOpen && (
              <ul className={styles.sortDropdown} role="listbox">
                {SORT_OPTIONS.map((opt) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    className={
                      sortBy === opt.value
                        ? styles.sortOptionActive
                        : styles.sortOption
                    }
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                  >
                    {sortBy === opt.value && (
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        style={{ marginRight: "4px" }}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* --- Main Contents: Sidebar + Grid ------------------ */}
      <div className={styles.mainLayout}>
        
        {/* Filter sidebar */}
        <aside
          className={filterOpen ? styles.sidebarVisible : styles.sidebarHidden}
          aria-hidden={!filterOpen}
        >
          <FilterSidebar onFilterChange={setFilters} />
        </aside>

        {/* Product grid */}
        <div className={styles.gridWrapper}>
          <div className={styles.productGrid}>
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
