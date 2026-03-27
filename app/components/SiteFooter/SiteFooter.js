"use client";

import { useState } from "react";
import { ChevronDown, Camera, Link2 } from "lucide-react";
import styles from "./SiteFooter.module.css";

/* --- Static data ------------------------------------------ */
const BRAND_LINKS = [
  "About Us", "Stories", "Artisans",
  "Boutiques", "Contact Us", "EU Compliance Docs",
];

const QUICK_LINKS = [
  "Orders & Shipping",
  "Join/Login as a Seller",
  "Payment & Pricing",
  "Return & Refunds",
  "FAQs",
  "Privacy Policy",
  "Terms & Conditions",
];

const PAYMENT_METHODS = [
  "GPay", "Mastercard", "PayPal", "Amex", "Apple Pay", "Shopify",
];

/* --- Accordion (mobile only) ----------------------------- */
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionBtn}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          size={14}
          className={open ? styles.accChevronOpen : styles.accChevronClosed}
          aria-hidden="true"
        />
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
}

function LinkList({ links }) {
  return (
    <ul className={styles.linkList}>
      {links.map((link) => (
        <li key={link}>
          <a href="#" className={styles.footerLink}>{link}</a>
        </li>
      ))}
    </ul>
  );
}

/* --- SiteFooter component -------------------------------- */
export default function SiteFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e) {
    e.preventDefault();
    setEmail("");
    // In production, send email to API
  }

  return (
    <footer className={styles.footer}>

      {/* === Upper: Newsletter + Contact ================== */}
      <div className={styles.upperRow}>

        {/* Newsletter */}
        <div className={styles.newsletterCol}>
          <h2 className={styles.colHeading}>BE THE FIRST TO KNOW</h2>
          <p className={styles.colBody}>
            Sign up for updates from metta muse.
          </p>
          <form
            className={styles.subscribeForm}
            onSubmit={handleSubscribe}
            aria-label="Newsletter subscription"
          >
            <label htmlFor="footer-email" className={styles.srOnly}>
              Enter your e-mail address
            </label>
            <input
              id="footer-email"
              type="email"
              className={styles.emailInput}
              placeholder="Enter your e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.subscribeBtn}>
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Contact + Currency */}
        <div className={styles.contactCol}>
          <h3 className={styles.colHeading}>CONTACT US</h3>
          <p className={styles.contactLine}>+44 221 133 5360</p>
          <p className={styles.contactLine}>customercare@mettamuse.com</p>

          <h3 className={styles.colHeading} style={{ marginTop: "22px" }}>
            CURRENCY
          </h3>
          <div className={styles.currencyRow}>
            <span aria-hidden="true">USA</span>
            <span className={styles.currencyCode}>* USD</span>
          </div>
          <p className={styles.currencyNote}>
            Transactions will be completed in Euros and a currency reference
            is available on hover.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* === Lower desktop: 3 columns ===================== */}
      <div className={styles.lowerRow}>

        {/* Brand */}
        <div className={styles.lowerCol}>
          <h3 className={styles.brandTitle}>metta muse</h3>
          <LinkList links={BRAND_LINKS} />
        </div>

        {/* Quick links */}
        <div className={styles.lowerCol}>
          <h3 className={styles.colTitle}>QUICK LINKS</h3>
          <LinkList links={QUICK_LINKS} />
        </div>

        {/* Social + Payments */}
        <div className={styles.lowerCol}>
          <h3 className={styles.colTitle}>FOLLOW US</h3>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <Camera size={20} strokeWidth={1.6} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <Link2 size={20} strokeWidth={1.6} />
            </a>
          </div>

          <h3 className={styles.colTitle} style={{ marginTop: "24px" }}>
            metta muse ACCEPTS
          </h3>
          <div className={styles.paymentRow}>
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className={styles.paymentChip} aria-label={m}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* === Mobile: accordion sections =================== */}
      <div className={styles.mobileAccordions}>

        <Accordion title="metta muse">
          <LinkList links={BRAND_LINKS} />
        </Accordion>

        <Accordion title="QUICK LINKS">
          <LinkList links={QUICK_LINKS} />
        </Accordion>

        <Accordion title="FOLLOW US">
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <Camera size={20} strokeWidth={1.6} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <Link2 size={20} strokeWidth={1.6} />
            </a>
          </div>
        </Accordion>

        <Accordion title="metta muse ACCEPTS">
          <div className={styles.paymentRow}>
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className={styles.paymentChip} aria-label={m}>
                {m}
              </span>
            ))}
          </div>
        </Accordion>
      </div>

      {/* === Copyright ==================================== */}
      <div className={styles.copyright}>
        <p>Copyright (c) 2023 mettamuse. All rights reserved.</p>
      </div>
    </footer>
  );
}
