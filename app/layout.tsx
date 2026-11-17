
import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Providers } from "@/components/providers";
import { Header, Footer, Whatsapp } from "@/components/shell";
import { brand, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Married Nepal | Nepali Matrimonial & Marriage Partner Search",
    template: "%s | Married Nepal",
  },

  description:
    "Married Nepal Pvt. Ltd. is a privacy-conscious matrimonial platform for Nepali adults looking for meaningful, marriage-oriented connections. Register and discover compatible profiles.",

  keywords: [
    "Married Nepal",
    "Married Nepal Pvt Ltd",
    "Nepali matrimonial",
    "Nepal marriage bureau",
    "life partner Nepal",
    "विवाहका लागि जीवनसाथी",
    "नेपाली म्यारिज ब्यूरो",
  ],

  applicationName: "Married Nepal",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "Married Nepal Private Limited",
    title: "Married Nepal — Meaningful Matrimonial Connections",
    description:
      "Discover your next chapter with a thoughtful Nepali matrimonial platform.",
    url: siteUrl,
    images: [
      {
        url: "/images/boudhanath-sunrise.webp",
        width: 1752,
        height: 897,
        alt: "Boudhanath Stupa at sunrise in Kathmandu, Nepal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Married Nepal — Meaningful Matrimonial Connections",
    description:
      "Discover your next chapter with a thoughtful Nepali matrimonial platform.",
    images: ["/images/boudhanath-sunrise.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/icon-64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
    apple: "/icon-256.png",
  },

  // Google Search Console HTML tag verification
  verification: {
    google: "o3hE2PeOGlLOlmIr7Nfk2uDw1i04MjvxNa690SP55S8",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#701e34",
};

// Organization structured data
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: brand.en,
  alternateName: brand.np,
  url: siteUrl,

  description:
    "Nepali matrimonial profile registration and partner discovery platform",

  logo: `${siteUrl}/icon-256.png`,

  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: brand.phone,
    availableLanguage: ["Nepali", "English"],
  },

  address: {
    "@type": "PostalAddress",
    streetAddress: "Bhotang, Ward No. 3",
    addressLocality: "Panchpokhari Thangpal Rural Municipality",
    addressRegion: "Sindhupalchok",
    addressCountry: "NP",
  },

  areaServed: {
    "@type": "Country",
    name: "Nepal",
  },

  sameAs: [
    brand.facebook,
    brand.tiktok,
    brand.youtube,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />

          <main id="main-content">
            {children}
          </main>

          <Footer />
          <Whatsapp />
        </Providers>

        {/* Organization JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      </body>
    </html>
  );
}
