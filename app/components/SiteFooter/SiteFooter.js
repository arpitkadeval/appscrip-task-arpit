"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./SiteFooter.module.css";

/* --- Static data ------------------------------------------ */
const BRAND_LINKS = [
  "About Us", "Stories", "Artisans",
  "Boutiques", "Contact Us", "EU Compliances Docs",
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
  { name: "GPay", color: "#fff" },
  { name: "Mastercard", color: "#eb001b" },
  { name: "PayPal", color: "#003087" },
  { name: "AMEX", color: "#007bc1" },
  { name: "Apple Pay", color: "#000" },
  { name: "Shopify Pay", color: "#5a31f4" },
];

/* --- Icons (since lucide-react 1.7.0 lacks brand icons) ---- */
const InstagramIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

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
  }

  return (
    <footer className={styles.footer}>
      {/* === Upper Row: Newsletter + Contact ================== */}
      <div className={styles.upperRow}>
        <div className={styles.newsletterCol}>
          <h2 className={styles.colHeading}>BE THE FIRST TO KNOW</h2>
          <p className={styles.colBody}>Sign up for updates from mettä muse.</p>
          <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              className={styles.emailInput}
              placeholder="Enter your e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.subscribeBtn}>SUBSCRIBE</button>
          </form>
        </div>

        <div className={styles.contactCol}>
          <div className={styles.contactInfo}>
            <h3 className={styles.colHeading}>CONTACT US</h3>
            <p className={styles.contactLine}>+44 221 133 5360</p>
            <p className={styles.contactLine}>customercare@mettamuse.com</p>
          </div>

          <div className={styles.currencySection}>
            <h3 className={styles.colHeading}>CURRENCY</h3>
            <div className={styles.currencyRow}>
              <div className={styles.flagIcon} aria-hidden="true">
                <div className={styles.flagBlue}></div>
                <div className={styles.flagRed}></div>
              </div>
              <span className={styles.currencyPoint}>◆</span>
              <span className={styles.currencyCode}>USD</span>
            </div>
            <p className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference is available on hover.
            </p>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* === Lower Row: Desktop Layout ======================== */}
      <div className={styles.lowerRow}>
        <div className={styles.lowerCol}>
          <h3 className={styles.brandTitle}>mettā muse</h3>
          <LinkList links={BRAND_LINKS} />
        </div>

        <div className={styles.lowerCol}>
          <h3 className={styles.colTitle}>QUICK LINKS</h3>
          <LinkList links={QUICK_LINKS} />
        </div>

        <div className={styles.lowerCol}>
          <div className={styles.socialSection}>
            <h3 className={styles.colTitle}>FOLLOW US</h3>
            <div className={styles.socialRow}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <div className={styles.iconCircle}><InstagramIcon /></div>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <div className={styles.iconCircle}><LinkedinIcon /></div>
              </a>
            </div>
          </div>

          <div className={styles.paymentSection}>
            <h3 className={styles.colTitle}>mettā muse ACCEPTS</h3>
            <div className={styles.paymentRow}>
              {PAYMENT_METHODS.map((m) => (
                <div 
                  key={m.name} 
                  className={styles.paymentCard} 
                  style={{ "--accent": m.color }}
                >
                  <span className={styles.cardBrand}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Mobile Accordions ================================ */}
      <div className={styles.mobileAccordions}>
        <Accordion title="mettā muse"><LinkList links={BRAND_LINKS} /></Accordion>
        <Accordion title="QUICK LINKS"><LinkList links={QUICK_LINKS} /></Accordion>
        <Accordion title="FOLLOW US">
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialLink}><InstagramIcon size={20} /></a>
            <a href="#" className={styles.socialLink}><LinkedinIcon size={20} /></a>
          </div>
        </Accordion>
        <Accordion title="mettā muse ACCEPTS">
          <div className={styles.paymentRow}>
            {PAYMENT_METHODS.map((m) => (
              <div key={m.name} className={styles.paymentCard}>{m.name}</div>
            ))}
          </div>
        </Accordion>
      </div>

      <div className={styles.copyright}>
        <p>Copyright © 2023 mettamuse. All rights reserved.</p>
      </div>
    </footer>
  );
}
