import type { Metadata } from "next";

import { appConfig } from "@/lib/site-config";

export const appMetadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: `${appConfig.name} – ${appConfig.tagline}`,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.seo.defaultDescription,
  keywords: [...appConfig.seo.keywords],
  authors: [{ name: appConfig.seo.author }],
  creator: appConfig.seo.author,
  publisher: appConfig.seo.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appConfig.url,
    title: appConfig.seo.defaultTitle,
    description: appConfig.seo.defaultDescription,
    siteName: appConfig.name,
    images: [
      {
        url: appConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${appConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.seo.defaultTitle,
    description: appConfig.seo.defaultDescription,
    ...(appConfig.seo.twitterHandle
      ? { creator: appConfig.seo.twitterHandle }
      : {}),
    images: [appConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(appConfig.seo.googleVerification
    ? { verification: { google: appConfig.seo.googleVerification } }
    : {}),
  alternates: {
    canonical: appConfig.url,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    other: [{ rel: "manifest", url: "/manifest.webmanifest" }],
  },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const ogImageUrl = new URL(appConfig.seo.ogImage, appConfig.url).toString();
const sameAs = appConfig.githubUrl;

export const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: appConfig.name,
  alternateName: appConfig.shortName,
  url: appConfig.url,
  image: ogImageUrl,
  description: appConfig.seo.defaultDescription,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "WebGPU Demo",
  operatingSystem: "Web",
  inLanguage: "en-US",
  ...(sameAs.length > 0 ? { sameAs } : {}),
  featureList: [
    "WebGPU-powered rendering",
    "Real-time raymarched SDF",
    "Physics-based jelly animation",
    "TAA (Temporal Anti-Aliasing)",
    "TypeGPU / WGSL shaders",
    "Interactive slider demo",
  ],
  keywords: appConfig.seo.keywords.join(", "),
  publisher: {
    "@type": "Organization",
    name: appConfig.name,
    url: appConfig.url,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to use Jelly Slider demo.",
    availability: "https://schema.org/InStock",
  },
};

export const jsonLdWebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: appConfig.name,
  url: appConfig.url,
  description: appConfig.seo.defaultDescription,
  inLanguage: "en",
  potentialAction: {
    "@type": "ViewAction",
    target: appConfig.url,
  },
};

export const jsonLdWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${appConfig.name} – ${appConfig.tagline}`,
  url: appConfig.url,
  description: appConfig.seo.defaultDescription,
  isPartOf: {
    "@type": "WebSite",
    name: appConfig.name,
    url: appConfig.url,
  },
  about: {
    "@type": "SoftwareSourceCode",
    name: appConfig.name,
    description: appConfig.description,
    programmingLanguage: "TypeScript",
    runtimePlatform: "WebGPU",
  },
};
