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
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/icon-256.png",
  },

  verification: {
    google: "o3hE2PeOGlLOlmIr7Nfk2uDw1i04MjvxNa690SP55S8",
  },
};
