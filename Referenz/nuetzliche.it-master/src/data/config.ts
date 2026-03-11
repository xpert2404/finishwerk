import type {AccentStrategy, HeroVariant, HomeDensityMode, SiteConfig} from "@/data/types";

export const EXPERIENCE_YEARS = 15;

export const HERO_HEADLINES: Record<HeroVariant, {de: string; en: string}> = {
  A: {
    de: "Individuelle .NET WebApps & lokale KI-Automatisierung.",
    en: "Custom .NET web apps and local AI automation."
  },
  B: {
    de: "Software, die passt. KI, die unter Ihrer Kontrolle bleibt.",
    en: "Software that fits. AI that stays under your control."
  }
};

export const ACTIVE_HERO_VARIANT: HeroVariant = "B";
export const HEADER_HOME_WIDE_ONLY = true;
export const HOME_DENSITY_MODE: HomeDensityMode = "medium-focused";
export const ACCENT_STRATEGY: AccentStrategy = "logo-orange-micro";

const DEFAULT_SITE_URL = "https://www.nuetzliche.it";
const DEFAULT_CALCOM_URL = "https://cal.eu/nuetzliche-it/erstgespraech";
const DEFAULT_CAL_EMBED_THEME = "light";
const DEFAULT_ANYDESK_URL = "https://get.anydesk.com";
const DEFAULT_GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps?q=Ringstra%C3%9Fe+1,+79541+L%C3%B6rrach&output=embed";
const DEFAULT_GOOGLE_MAPS_LINK_URL = "https://www.google.com/maps/search/?api=1&query=Ringstra%C3%9Fe+1,+79541+L%C3%B6rrach";
const DEFAULT_GOOGLE_MAPS_LABEL = "Ringstra\u00dfe 1, 79541 L\u00f6rrach";

function readEnv(name: string): string {
  return (process.env[name] ?? "").trim();
}

function isCalUrl(value: string): boolean {
  return /^https?:\/\/(?:[^/]+\.)?cal\.(eu|com)(?:\/|$)/i.test(value);
}

function normalizeCalEmbedTheme(value: string): "light" | "dark" {
  return value.toLowerCase() === "dark" ? "dark" : "light";
}

function normalizeCalEmbedUrl(urlValue: string, theme: "light" | "dark"): string {
  const sanitized = urlValue.trim();

  if (!sanitized || !isCalUrl(sanitized)) {
    return "";
  }

  try {
    const url = new URL(sanitized);
    url.searchParams.set("embed", "true");

    if (!url.searchParams.has("theme")) {
      url.searchParams.set("theme", theme);
    }

    return url.toString();
  } catch {
    return "";
  }
}

export const COMPANY_CLAIM = {
  de: ".NET-Software, Workflow-Automatisierung und kontrollierte KI f\u00fcr Unternehmen mit hohem Anspruch an Prozesssicherheit und Datenkontrolle.",
  en: ".NET software, workflow automation and controlled AI for organizations that demand process reliability and data control."
};

export const BRAND = {
  primaryInk: "#384048",
  accentThemeA: "#C8692E",
  accentThemeB: "#0F3D5E"
};

export function getSiteConfig(): SiteConfig {
  const legacyCalendlyUrl = readEnv("NEXT_PUBLIC_CALENDLY_URL");
  const calcomPublicCandidate = readEnv("NEXT_PUBLIC_CALCOM_URL") || legacyCalendlyUrl || DEFAULT_CALCOM_URL;
  const calcomPublicUrl = isCalUrl(calcomPublicCandidate) ? calcomPublicCandidate : DEFAULT_CALCOM_URL;
  const calEmbedTheme = normalizeCalEmbedTheme(readEnv("NEXT_PUBLIC_CAL_EMBED_THEME") || DEFAULT_CAL_EMBED_THEME);

  const calcomEmbedFallback = normalizeCalEmbedUrl(calcomPublicUrl, calEmbedTheme);
  const calcomEmbedCandidate = readEnv("NEXT_PUBLIC_CALCOM_EMBED_URL") || calcomEmbedFallback;
  const calcomEmbedUrl = normalizeCalEmbedUrl(calcomEmbedCandidate, calEmbedTheme) || calcomEmbedFallback;

  return {
    siteName: "n\u00fctzliche.IT",
    siteUrl: readEnv("NEXT_PUBLIC_SITE_URL") || DEFAULT_SITE_URL,
    primaryInk: BRAND.primaryInk,
    defaultTheme: ACCENT_STRATEGY === "logo-orange-micro" ? "theme-a" : "theme-b",
    homeDensityMode: HOME_DENSITY_MODE,
    accentStrategy: ACCENT_STRATEGY,
    booking: {
      provider: "calcom",
      publicUrl: calcomPublicUrl,
      embedUrl: calcomEmbedUrl,
      requiresConsent: true,
      ui: {
        modalDesktopMaxWidth: "min(98vw, 1480px)",
        modalDesktopHeight: "min(94dvh, 1100px)",
        modalMobileFullscreen: true,
        iframeMinHeightDesktop: 760,
        iframeMinHeightMobile: 700,
        consentModalMaxWidth: "min(92vw, 460px)",
        consentModalPadding: "1.25rem",
        transitionDurationMs: 220
      }
    },
    embedConsent: {
      maps: true,
      booking: true,
      storageMode: "session"
    },
    anydeskUrl: readEnv("NEXT_PUBLIC_ANYDESK_URL") || DEFAULT_ANYDESK_URL,
    experienceYears: EXPERIENCE_YEARS,
    heroVariant: ACTIVE_HERO_VARIANT,
    localeDetectionMode: "cookie-browser-fallback",
    supportedLocales: ["de", "en"],
    defaultLocale: "de",
    locationMap: {
      embedUrl: readEnv("NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL") || DEFAULT_GOOGLE_MAPS_EMBED_URL,
      mapsLinkUrl: readEnv("NEXT_PUBLIC_GOOGLE_MAPS_LINK_URL") || DEFAULT_GOOGLE_MAPS_LINK_URL,
      label: readEnv("NEXT_PUBLIC_GOOGLE_MAPS_LABEL") || DEFAULT_GOOGLE_MAPS_LABEL,
      addressLine: `${CONTACT_FACTS.addressLine}, ${CONTACT_FACTS.postalLine}`,
      requiresConsent: true
    },
    impactCalculator: {
      minVolumePerWeek: 20,
      maxVolumePerWeek: 3000,
      categories: [
        {
          id: "document-processing",
          defaultSubcategoryId: "field-extraction",
          subcategories: [
            {
              id: "field-extraction",
              assumptions: {
                defaultVolumePerWeek: 240,
                minutesBefore: 11,
                minutesAfter: 4
              }
            },
            {
              id: "inbox-routing",
              assumptions: {
                defaultVolumePerWeek: 320,
                minutesBefore: 7,
                minutesAfter: 2
              }
            }
          ]
        },
        {
          id: "inbox-routing",
          defaultSubcategoryId: "role-assignment",
          subcategories: [
            {
              id: "role-assignment",
              assumptions: {
                defaultVolumePerWeek: 180,
                minutesBefore: 9,
                minutesAfter: 3
              }
            },
            {
              id: "priority-routing",
              assumptions: {
                defaultVolumePerWeek: 210,
                minutesBefore: 8,
                minutesAfter: 3
              }
            }
          ]
        },
        {
          id: "approvals-handover",
          defaultSubcategoryId: "approval-precheck",
          subcategories: [
            {
              id: "approval-precheck",
              assumptions: {
                defaultVolumePerWeek: 120,
                minutesBefore: 13,
                minutesAfter: 5
              }
            },
            {
              id: "handover-checkpoints",
              assumptions: {
                defaultVolumePerWeek: 95,
                minutesBefore: 15,
                minutesAfter: 6
              }
            }
          ]
        },
        {
          id: "knowledge-access",
          defaultSubcategoryId: "internal-guidelines",
          subcategories: [
            {
              id: "internal-guidelines",
              assumptions: {
                defaultVolumePerWeek: 90,
                minutesBefore: 16,
                minutesAfter: 6
              }
            },
            {
              id: "case-context-search",
              assumptions: {
                defaultVolumePerWeek: 70,
                minutesBefore: 22,
                minutesAfter: 8
              }
            }
          ]
        },
        {
          id: "approval-workflows",
          defaultSubcategoryId: "approval-precheck",
          subcategories: [
            {
              id: "approval-precheck",
              assumptions: {
                defaultVolumePerWeek: 140,
                minutesBefore: 10,
                minutesAfter: 3
              }
            },
            {
              id: "handover-preparation",
              assumptions: {
                defaultVolumePerWeek: 100,
                minutesBefore: 12,
                minutesAfter: 4
              }
            }
          ]
        },
        {
          id: "software-modernization",
          defaultSubcategoryId: "legacy-migration",
          subcategories: [
            {
              id: "legacy-migration",
              assumptions: {
                defaultVolumePerWeek: 20,
                minutesBefore: 45,
                minutesAfter: 15
              }
            },
            {
              id: "bug-resolution",
              assumptions: {
                defaultVolumePerWeek: 15,
                minutesBefore: 30,
                minutesAfter: 10
              }
            }
          ]
        },
        {
          id: "api-integration",
          defaultSubcategoryId: "data-sync",
          subcategories: [
            {
              id: "data-sync",
              assumptions: {
                defaultVolumePerWeek: 50,
                minutesBefore: 20,
                minutesAfter: 2
              }
            },
            {
              id: "manual-data-entry",
              assumptions: {
                defaultVolumePerWeek: 80,
                minutesBefore: 15,
                minutesAfter: 1
              }
            }
          ]
        }
      ]
    }
  };
}

export const CONTACT_FACTS = {
  addressLine: "Ringstra\u00dfe 1",
  postalLine: "79541 L\u00f6rrach",
  email: "ihre@nuetzliche.it",
  phone: "07621 / 916 174 20",
  fax: "+49 7621 / 916 174 29"
};

export const LEGAL_FACTS = {
  representative: "Philipp Draese",
  vatId: "DE201391015"
};
