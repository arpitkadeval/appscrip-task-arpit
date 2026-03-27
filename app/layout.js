import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Metta Muse - Discover Unique Handcrafted Products",
  description:
    "Browse our curated collection of handcrafted bags, accessories and lifestyle products. Discover unique items made with care at Metta Muse.",
  keywords: [
    "handcrafted bags",
    "unique accessories",
    "sustainable products",
    "metta muse",
    "artisan goods",
  ],
  authors: [{ name: "Metta Muse" }],
  creator: "Metta Muse",
  publisher: "Metta Muse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Metta Muse - Discover Unique Handcrafted Products",
    description:
      "Browse our curated collection of handcrafted bags, accessories and lifestyle products.",
    siteName: "Metta Muse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metta Muse - Discover Unique Handcrafted Products",
    description:
      "Browse our curated collection of handcrafted bags, accessories and lifestyle products.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import { FavoriteProvider } from "./context/FavoriteContext";

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Metta Muse",
    description:
      "Curated collection of handcrafted bags, accessories and lifestyle products.",
    url: "https://appscrip-task-arpit.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://appscrip-task-arpit.netlify.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <FavoriteProvider>
          {children}
        </FavoriteProvider>
      </body>
    </html>
  );
}
