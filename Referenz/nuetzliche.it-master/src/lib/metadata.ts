import type { Metadata } from "next";
import {getSiteConfig} from "@/data/config";
import type { Locale } from "@/data/types";
import {getLocalizedPath, type RouteKey} from "@/lib/routes";

interface LocalizedMetaInput {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
}

export function buildMetadata({locale, route, title, description}: LocalizedMetaInput): Metadata {
  const site = getSiteConfig();
  const canonicalPath = getLocalizedPath(route, locale);
  const dePath = getLocalizedPath(route, "de");
  const enPath = getLocalizedPath(route, "en");

  return {
    metadataBase: new URL(site.siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        de: dePath,
        en: enPath
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: site.siteName,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/brand/logo-square-512.png",
          width: 512,
          height: 512,
          alt: `${site.siteName} logo`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/logo-square-512.png"]
    }
  };
}
