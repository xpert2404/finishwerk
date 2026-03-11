export const siteConfig = {
  name: "FinishWerk",
  tagline: "Digitale Systeme für mehr Umsatz, Sichtbarkeit und Kontrolle.",
  description:
    "FinishWerk entwickelt Websites, Shops, Sichtbarkeits- und Prozesssysteme, die messbar mehr Direktumsatz, Kontrolle und Conversion schaffen.",
  locale: "de-DE",
  url: "https://finishwerk.de",
  ctaLabel: "Kostenloses Erstgespräch",
  secondaryCtaLabel: "Ergebnisse ansehen",
  navItems: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Ergebnisse", href: "/ergebnisse" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  contact: {
    email: "kontakt@finishwerk.de",
    phone: "",
    region: "Deutschland",
  },
  legal: {
    privacyHref: "/datenschutz",
    imprintHref: "/impressum",
  },
  booking: {
    calUrl: "https://cal.com/finishwerk/erstgespraech",
    consentTitle: "Externe Terminbuchung laden",
    consentText:
      "Für die Terminbuchung wird Cal.com als externer Dienst geladen. Dabei können personenbezogene Daten an den Anbieter übertragen werden. FinishWerk lädt den Buchungsdienst erst nach Ihrer ausdrücklichen Einwilligung.",
  },
  trustNumbers: [
    { value: 3, suffix: "+", label: "Jahre FinishWerk" },
    { value: 8, suffix: "+", label: "Jahre Expertise" },
    { value: 100, suffix: "+", label: "Betreute Projekte" },
    { value: 4, suffix: "", label: "Systembausteine" },
  ],
} as const;

export type NavItem = (typeof siteConfig.navItems)[number];
