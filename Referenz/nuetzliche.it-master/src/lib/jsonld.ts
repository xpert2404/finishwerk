import {CONTACT_FACTS, getSiteConfig, LEGAL_FACTS} from "@/data/config";
import type {Locale, ServiceItem} from "@/data/types";

export function getWebsiteJsonLd(locale: Locale) {
  const site = getSiteConfig();
  const localePath = locale === "de" ? "/de" : "/en";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.siteName,
    url: `${site.siteUrl}${localePath}`,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: site.siteName,
      url: site.siteUrl
    }
  };
}

export function getOrganizationJsonLd(locale: Locale) {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.siteName,
    url: site.siteUrl,
    email: CONTACT_FACTS.email,
    telephone: CONTACT_FACTS.phone,
    logo: `${site.siteUrl}/brand/logo-square-512.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_FACTS.addressLine,
      postalCode: "79541",
      addressLocality: "Lörrach",
      addressCountry: "DE"
    },
    areaServed: locale === "de" ? "Deutschland" : "Germany"
  };
}

export function getLocalBusinessJsonLd(locale: Locale) {
  const site = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.siteName,
    image: `${site.siteUrl}/brand/logo-square-512.png`,
    url: site.siteUrl,
    telephone: CONTACT_FACTS.phone,
    email: CONTACT_FACTS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_FACTS.addressLine,
      addressLocality: "Lörrach",
      postalCode: "79541",
      addressCountry: "DE"
    },
    founder: LEGAL_FACTS.representative,
    slogan:
      locale === "de"
        ? "Maßgeschneiderte Software und lokale KI-Lösungen"
        : "Tailored software and local AI solutions"
  };
}

export function getServiceJsonLd(locale: Locale, services: ServiceItem[]) {
  const site = getSiteConfig();
  return services.slice(0, 3).map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: site.siteName,
      url: site.siteUrl
    },
    areaServed: locale === "de" ? "Deutschland" : "Europe"
  }));
}
