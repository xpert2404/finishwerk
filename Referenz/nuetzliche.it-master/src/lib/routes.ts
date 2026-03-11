import type {NextRequest} from "next/server";
import type {LocalizedAliasTarget, Locale, PathAlias} from "@/data/types";

export type RouteKey =
  | "home"
  | "services"
  | "solutions-rag-knowledge-search"
  | "solutions-idp-documents"
  | "solutions-api-integration"
  | "industries-law-firms"
  | "industries-medical-practices"
  | "industries-it-service"
  | "ai-data-control"
  | "projects"
  | "about"
  | "contact"
  | "thank-you"
  | "legal-notice"
  | "privacy-policy"
  | "faq";

const pathMap: Record<RouteKey, Record<Locale, string>> = {
  home: {de: "/de", en: "/en"},
  services: {de: "/de/leistungen", en: "/en/services"},
  "solutions-rag-knowledge-search": {de: "/de/loesungen/rag-wissenssuche", en: "/en/solutions/rag-knowledge-search"},
  "solutions-idp-documents": {de: "/de/loesungen/idp-dokumente", en: "/en/solutions/idp-documents"},
  "solutions-api-integration": {de: "/de/loesungen/api-integration", en: "/en/solutions/api-integration"},
  "industries-law-firms": {de: "/de/branchen/kanzleien", en: "/en/industries/law-firms"},
  "industries-medical-practices": {de: "/de/branchen/arztpraxen", en: "/en/industries/medical-practices"},
  "industries-it-service": {de: "/de/branchen/it-service", en: "/en/industries/it-service"},
  "ai-data-control": {de: "/de/ki-datenkontrolle", en: "/en/ai-data-control"},
  projects: {de: "/de/projekte", en: "/en/projects"},
  about: {de: "/de/ueber-uns", en: "/en/about-us"},
  contact: {de: "/de/kontakt", en: "/en/contact"},
  "thank-you": {de: "/de/danke", en: "/en/thank-you"},
  "legal-notice": {de: "/de/impressum", en: "/en/legal-notice"},
  "privacy-policy": {de: "/de/datenschutz", en: "/en/privacy-policy"},
  faq: {de: "/de/faq", en: "/en/faq"}
};

export const unprefixedAliases: PathAlias[] = [
  {path: "/", target: pathMap.home},
  {path: "/services", target: pathMap.services},
  {path: "/leistungen", target: pathMap.services},
  {path: "/loesungen/rag-wissenssuche", target: pathMap["solutions-rag-knowledge-search"]},
  {path: "/solutions/rag-knowledge-search", target: pathMap["solutions-rag-knowledge-search"]},
  {path: "/loesungen/idp-dokumente", target: pathMap["solutions-idp-documents"]},
  {path: "/solutions/idp-documents", target: pathMap["solutions-idp-documents"]},
  {path: "/loesungen/api-integration", target: pathMap["solutions-api-integration"]},
  {path: "/solutions/api-integration", target: pathMap["solutions-api-integration"]},
  {path: "/branchen/kanzleien", target: pathMap["industries-law-firms"]},
  {path: "/industries/law-firms", target: pathMap["industries-law-firms"]},
  {path: "/branchen/arztpraxen", target: pathMap["industries-medical-practices"]},
  {path: "/industries/medical-practices", target: pathMap["industries-medical-practices"]},
  {path: "/branchen/it-service", target: pathMap["industries-it-service"]},
  {path: "/industries/it-service", target: pathMap["industries-it-service"]},
  {path: "/ai-data-control", target: pathMap["ai-data-control"]},
  {path: "/ki-datenkontrolle", target: pathMap["ai-data-control"]},
  {path: "/projects", target: pathMap.projects},
  {path: "/projekte", target: pathMap.projects},
  {path: "/about", target: pathMap.about},
  {path: "/about-us", target: pathMap.about},
  {path: "/über-uns", target: pathMap.about},
  {path: "/%C3%BCber-uns", target: pathMap.about},
  {path: "/ueber-uns", target: pathMap.about},
  {path: "/contact", target: pathMap.contact},
  {path: "/kontakt", target: pathMap.contact},
  {path: "/thank-you", target: pathMap["thank-you"]},
  {path: "/danke", target: pathMap["thank-you"]},
  {path: "/legal-notice", target: pathMap["legal-notice"]},
  {path: "/impressum", target: pathMap["legal-notice"]},
  {path: "/privacy-policy", target: pathMap["privacy-policy"]},
  {path: "/datenschutz", target: pathMap["privacy-policy"]},
  {path: "/faq", target: pathMap.faq}
];

const aliasMap = new Map<string, LocalizedAliasTarget>(unprefixedAliases.map((item) => [item.path, item.target]));

const prefixedAliasRedirects = new Map<string, string>([
  ["/de/services", "/de/leistungen"],
  ["/de/ai-data-control", "/de/ki-datenkontrolle"],
  ["/de/projects", "/de/projekte"],
  ["/de/about", "/de/ueber-uns"],
  ["/de/about-us", "/de/ueber-uns"],
  ["/de/über-uns", "/de/ueber-uns"],
  ["/de/%C3%BCber-uns", "/de/ueber-uns"],
  ["/de/contact", "/de/kontakt"],
  ["/de/thank-you", "/de/danke"],
  ["/de/legal-notice", "/de/impressum"],
  ["/de/privacy-policy", "/de/datenschutz"],
  ["/en/leistungen", "/en/services"],
  ["/en/ki-datenkontrolle", "/en/ai-data-control"],
  ["/en/projekte", "/en/projects"],
  ["/en/ueber-uns", "/en/about-us"],
  ["/en/über-uns", "/en/about-us"],
  ["/en/%C3%BCber-uns", "/en/about-us"],
  ["/en/kontakt", "/en/contact"],
  ["/en/danke", "/en/thank-you"],
  ["/en/impressum", "/en/legal-notice"],
  ["/en/datenschutz", "/en/privacy-policy"],
  ["/en/about", "/en/about-us"]
]);

export function getLocalizedPath(route: RouteKey, locale: Locale): string {
  return pathMap[route][locale];
}

export function getAliasTarget(pathname: string): LocalizedAliasTarget | undefined {
  return aliasMap.get(normalizePathname(pathname));
}

export function getPrefixedAliasRedirect(pathname: string): string | undefined {
  return prefixedAliasRedirects.get(normalizePathname(pathname));
}

export function normalizePathname(pathname: string): string {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function isLocale(value: string | undefined): value is Locale {
  return value === "de" || value === "en";
}

function parseLocaleFromAcceptLanguage(headerValue: string | null): Locale | undefined {
  if (!headerValue) {
    return undefined;
  }

  const weightedLanguages = headerValue
    .split(",")
    .map((part) => {
      const [localePart, ...params] = part.trim().split(";");
      const quality = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="));

      return {
        locale: localePart.toLowerCase(),
        quality: quality ? Number.parseFloat(quality.slice(2)) : 1
      };
    })
    .filter((item) => Number.isFinite(item.quality))
    .sort((a, b) => b.quality - a.quality);

  for (const item of weightedLanguages) {
    if (item.locale.startsWith("de")) {
      return "de";
    }

    if (item.locale.startsWith("en")) {
      return "en";
    }
  }

  return undefined;
}

export function resolveLocaleForUnprefixedPath(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const browserLocale = parseLocaleFromAcceptLanguage(request.headers.get("accept-language"));
  if (browserLocale) {
    return browserLocale;
  }

  return "de";
}

export const allRouteKeys: RouteKey[] = Object.keys(pathMap) as RouteKey[];
