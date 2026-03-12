import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/brand/finishwerk-wordmark.png",
        width: 1024,
        height: 1024,
        alt: `${siteConfig.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/brand/finishwerk-wordmark.png"],
  },
  icons: {
    icon: [
      { url: "/brand/finishwerk-icon.png", sizes: "any" },
      { url: "/brand/finishwerk-icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/brand/finishwerk-icon.png",
    apple: { url: "/brand/finishwerk-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.json",
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: "Deutschland",
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    email: siteConfig.contact.email,
    serviceType: [
      "Webentwicklung",
      "E-Commerce",
      "SEO",
      "Social Media",
      "Digitale Prozesssysteme",
    ],
  };
}
