"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Tag,
} from "lucide-react";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = ["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"];

const ANNOUNCEMENT_ITEMS = [
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor - free shipping over $50",
  "Lorem ipsum dolor sit amet consectetur",
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.siteHeader}>

      {/* --- Announcement bar --------------------------------- */}
      <div className={styles.announcementBar} role="marquee" aria-live="polite">
        {ANNOUNCEMENT_ITEMS.map((text, i) => (
          <div key={i} className={styles.announcementItem}>
            <Tag size={12} aria-hidden="true" />
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* --- Main header -------------------------------------- */}
      <div className={styles.mainHeader}>

        {/* Left: Hamburger (mobile) */}
        <div className={styles.headerLeft}>
          <button
            className={styles.hamburger}
            aria-label={mobileOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Centre: Logo */}
        <div className={styles.logoWrap}>
          <a href="/" className={styles.logo} aria-label="Metta Muse home">
            LOGO
          </a>
        </div>

        {/* Right: Icon group */}
        <div className={styles.iconGroup}>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={19} strokeWidth={1.8} />
          </button>
          <button className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={19} strokeWidth={1.8} />
          </button>
          <button className={styles.iconBtn} aria-label="Account">
            <User size={19} strokeWidth={1.8} />
          </button>
          <button className={styles.langBtn} aria-label="Language: English">
            ENG <ChevronDown size={12} />
          </button>
          <button className={styles.iconBtn} aria-label="Shopping bag">
            <ShoppingBag size={19} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* --- Desktop navigation row --------------------------- */}
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <ul className={styles.navList}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href="#" className={styles.navLink}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Mobile drawer ------------------------------------ */}
      {mobileOpen && (
        <nav
          className={styles.mobileDrawer}
          aria-label="Mobile navigation"
          id="mobile-nav"
        >
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link} className={styles.mobileNavItem}>
                <a
                  href="#"
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
