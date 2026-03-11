import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/services": {
      de: "/leistungen",
      en: "/services"
    },
    "/solutions/rag-knowledge-search": {
      de: "/loesungen/rag-wissenssuche",
      en: "/solutions/rag-knowledge-search"
    },
    "/solutions/idp-documents": {
      de: "/loesungen/idp-dokumente",
      en: "/solutions/idp-documents"
    },
    "/solutions/api-integration": {
      de: "/loesungen/api-integration",
      en: "/solutions/api-integration"
    },
    "/industries/law-firms": {
      de: "/branchen/kanzleien",
      en: "/industries/law-firms"
    },
    "/industries/medical-practices": {
      de: "/branchen/arztpraxen",
      en: "/industries/medical-practices"
    },
    "/industries/it-service": {
      de: "/branchen/it-service",
      en: "/industries/it-service"
    },
    "/ai-data-control": {
      de: "/ki-datenkontrolle",
      en: "/ai-data-control"
    },
    "/projects": {
      de: "/projekte",
      en: "/projects"
    },
    "/about": {
      de: "/ueber-uns",
      en: "/about-us"
    },
    "/contact": {
      de: "/kontakt",
      en: "/contact"
    },
    "/thank-you": {
      de: "/danke",
      en: "/thank-you"
    },
    "/legal-notice": {
      de: "/impressum",
      en: "/legal-notice"
    },
    "/privacy-policy": {
      de: "/datenschutz",
      en: "/privacy-policy"
    },
    "/faq": {
      de: "/faq",
      en: "/faq"
    }
  }
});

export type AppLocale = (typeof routing.locales)[number];
