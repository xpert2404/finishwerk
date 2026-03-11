import { faqItems } from "@/content/faq";

export const homeContent = {
  hero: {
    eyebrow: "Digitale Systeme statt Einzelleistungen",
    title: "Mehr Umsatz. Mehr Sichtbarkeit. Mehr Kontrolle.",
    subtitle:
      "FinishWerk entwickelt Websites, Shops, SEO-, Social- und Prozesssysteme, die Geschäftswachstum messbar unterstützen statt nur gut auszusehen.",
    primaryCta: "Kostenloses Erstgespräch",
    secondaryCta: "Ergebnisse ansehen",
    trustChips: [
      "8+ Jahre Expertise",
      "100+ betreute Projekte",
      "Seit 2022 als FinishWerk",
    ],
    visualCards: [
      {
        label: "Direktumsatz",
        value: "+24 %",
        detail: "Kundenbeispiel aus einer Direct-Order-Optimierung",
      },
      {
        label: "Kontrolle über Marge",
        value: "+44 %",
        detail: "Mehr vom Umsatz behalten statt Plattformgebühren abgeben",
      },
      {
        label: "Digitale Sichtbarkeit",
        value: "7/7",
        detail: "Präsenz auf Website, Suche, Content und Anfragepfaden",
      },
    ],
  },
  proofLanes: [
    {
      title: "Direktumsatz statt Provisionsverlust",
      metric: "44 %",
      descriptor: "mehr vom Umsatz behalten",
      story:
        "Anonymisierte Gastronomie-Story: Plattformabhängigkeit reduziert, Direktbestellungen sichtbar attraktiver gemacht.",
      values: [28, 34, 42, 52, 58, 64],
      footer: "Kundenbeispiel, nicht generische Leistungszusage.",
    },
    {
      title: "Sichtbarkeit, die lokal spürbar wird",
      metric: "+22 %",
      descriptor: "mehr gewonnene Kunden",
      story:
        "Anonymisierter Local-Brand-Case: konsistente Präsenz über Website, Content und lokale Nachfragekanäle.",
      values: [18, 20, 25, 31, 36, 42],
      footer: "Kundenbeispiel, ergänzt um illustrative Verlaufskurve.",
    },
    {
      title: "Präsenz, die besser konvertiert",
      metric: "1 System",
      descriptor: "statt verteilter Einzellösungen",
      story:
        "Anonymisierter Business-Case: klarer Funnel, sauberer Seitenaufbau und reduzierte Reibung entlang der Anfrage.",
      values: [24, 27, 29, 37, 41, 49],
      footer: "Illustrative Darstellung einer Conversion-Verbesserung.",
    },
  ],
  problems: [
    {
      title: "Plattformgebühren fressen Marge",
      body:
        "Wenn Direktkundengeschäft über Plattformen läuft, wächst der Umsatz nicht automatisch gesund. Die Marge bleibt fremdbestimmt.",
    },
    {
      title: "Sichtbarkeit ist inkonsistent",
      body:
        "Ohne saubere Website, Suchsichtbarkeit und Content-System entsteht Nachfrage zufällig statt planbar.",
    },
    {
      title: "Webseiten verkaufen nicht",
      body:
        "Viele Seiten informieren, aber führen nicht. Fehlende Struktur, keine klare CTA-Logik und schwache Funnels kosten Anfragen und Bestellungen.",
    },
    {
      title: "Digitale Prozesse brechen an Übergängen",
      body:
        "Anfragen, Bestellungen, Inhalte und interne Abläufe laufen nebeneinander statt in einem kontrollierten System.",
    },
  ],
  solutionClusters: [
    {
      title: "Präsenz",
      lead: "Ein Auftritt, der die Marke sauber trägt und sofort verständlich verkauft.",
      points: ["Websites", "E-Shops", "CMS-Lösungen", "Markenauftritt"],
    },
    {
      title: "Conversion",
      lead: "Klare Anfrage-, Bestell- und Angebotslogik statt digitaler Reibung.",
      points: [
        "Bestellsysteme",
        "Anfragepfade",
        "WooCommerce",
        "Landingpage-Logiken",
      ],
    },
    {
      title: "Sichtbarkeit",
      lead: "Reichweite, die über Suche, Content und lokale Nachfragekanäle aufgebaut wird.",
      points: ["SEO", "Social Media", "organischer Content", "lokale Präsenz"],
    },
    {
      title: "Prozesse",
      lead: "Digitale Infrastruktur, die intern sauber läuft und außen professioneller wirkt.",
      points: [
        "interne IT-Infrastruktur",
        "Content-Workflows",
        "CMS-Prozesse",
        "digitale Systempflege",
      ],
    },
  ],
  resultMetrics: [
    {
      label: "Mehr Umsatz",
      value: 24,
      suffix: "%",
      context: "Kundenbeispiel aus einer Direct-Order-Optimierung",
      isCaseSpecific: true,
    },
    {
      label: "Mehr vom Umsatz behalten",
      value: 44,
      suffix: "%",
      context: "Kundenbeispiel mit reduzierter Plattformabhängigkeit",
      isCaseSpecific: true,
    },
    {
      label: "Mehr gewonnene Kunden",
      value: 22,
      suffix: "%",
      context: "Kundenbeispiel mit verbesserter digitaler Präsenz",
      isCaseSpecific: true,
    },
    {
      label: "Systembausteine",
      value: 4,
      suffix: "",
      context: "Präsenz, Conversion, Sichtbarkeit und Prozesse greifen zusammen",
      isCaseSpecific: false,
    },
  ],
  chartSeries: {
    revenueComparison: {
      label: "Direktumsatz-Verteilung",
      before: 32,
      after: 61,
      caption:
        "Illustrative Vergleichsvisualisierung basierend auf dem beschriebenen Restaurant-Mechanismus.",
    },
    visibilityTrend: {
      label: "Sichtbarkeitsaufbau",
      values: [22, 28, 31, 37, 46, 58, 66],
      labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"],
      caption:
        "Illustrative Verlaufskurve für organische Sichtbarkeit und Nachfragewirkung.",
    },
    funnel: {
      label: "Vom Klick zur Anfrage",
      steps: [
        { label: "Aufmerksamkeit", value: 100 },
        { label: "Relevante Besuche", value: 68 },
        { label: "Interaktionen", value: 41 },
        { label: "Anfragen / Bestellungen", value: 24 },
      ],
      caption:
        "Demo-Funnel zur Darstellung von besser geführten Conversion-Pfaden.",
    },
  },
  industries: [
    {
      title: "Restaurants & Lieferdienste",
      body:
        "Direktbestellung, bessere Marge, klarere Angebotslogik und weniger Abhängigkeit von Plattformen.",
    },
    {
      title: "Lokale Unternehmen",
      body:
        "Stärkere Sichtbarkeit, professioneller digitaler Auftritt und bessere Anfragen aus dem direkten Umfeld.",
    },
    {
      title: "E-Commerce",
      body:
        "Conversion-orientierte Shops, klare Produktwege und ein System, das Marketing und Verkauf besser verzahnt.",
    },
    {
      title: "Dienstleister",
      body:
        "Strukturierte Lead-Pfade, bessere Vertrauenskommunikation und weniger Reibung vom Erstkontakt bis zur Anfrage.",
    },
  ],
  caseStudy: {
    eyebrow: "Case Mechanics",
    title: "Direktbestellung statt Plattformlogik",
    summary:
      "Der stärkste Restaurant-Use-Case ist nicht die Website selbst, sondern der Systemwechsel: eigene Bestellstrecke, kontrollierte Angebote, besseres Tracking und weniger Umsatz, der an Plattformen hängen bleibt.",
    steps: [
      {
        title: "1. Plattformabhängigkeit sichtbar machen",
        body:
          "Die Ausgangslage wird betriebswirtschaftlich gelesen: Welche Gebühren, welche Abhängigkeit, welche verlorene Marge?",
      },
      {
        title: "2. Direktkanal attraktiver machen",
        body:
          "Eigene Bestelllogik, Gutscheine oder Angebotsvorteile machen den Direktweg für Kunden erkennbar sinnvoll.",
      },
      {
        title: "3. Kontrolle zurückholen",
        body:
          "Website, Bestellsystem, Inhalte und Kommunikation greifen ineinander statt nebeneinander zu laufen.",
      },
    ],
    stats: [
      { label: "mehr Umsatz", value: "24 %" },
      { label: "mehr vom Umsatz behalten", value: "44 %" },
      { label: "mehr Kunden gewonnen", value: "22 %" },
      { label: "Kostenmodell", value: "Einmalpreis statt laufender Plattformkosten" },
    ],
  },
  visibility: {
    heading: "Sichtbarkeit ist kein Zusatz. Sie ist Nachfrage-Infrastruktur.",
    body:
      "FinishWerk baut nicht nur Seiten. Sichtbarkeit wird als System gedacht: organischer Content, lokale Relevanz, SEO-Fundament, wiedererkennbare Marke und sauber geführte digitale Einstiegspunkte.",
    modules: [
      {
        title: "SEO-Fundament",
        body: "Technische Struktur, lokale Suchrelevanz und Seiten, die nicht nur existieren, sondern gefunden werden.",
      },
      {
        title: "Social Presence",
        body: "Content, der Präsenz erzeugt und die Marke dort ernsthaft sichtbar macht, wo Zielgruppen Aufmerksamkeit haben.",
      },
      {
        title: "Demand Capture",
        body: "Vom Interesse zur konkreten Handlung: Suchanfrage, Profilaufruf, Klick, Anfrage oder Direktbestellung.",
      },
    ],
    reachValues: [14, 19, 23, 34, 41, 56, 73],
  },
  capabilities: [
    "Moderne Websites",
    "E-Commerce & WooCommerce",
    "SEO-Optimierungen",
    "CMS-Lösungen",
    "Bestellsysteme",
    "Social Media & organischer Content",
    "Interne IT-Infrastruktur",
    "Conversion-orientierte digitale Prozesse",
  ],
  about: {
    title: "Technisch stark. Geschäftlich relevant.",
    body:
      "FinishWerk verbindet technische Umsetzung mit klarer Vertriebs- und Wachstumslogik. Nicht als laute Agentur, sondern als Partner für digitale Systeme, die messbar sinnvoller funktionieren.",
    stats: [
      { label: "FinishWerk seit", value: "2022" },
      { label: "Jahre Expertise", value: "8+" },
      { label: "Betreute Projekte", value: "100+" },
    ],
    principles: [
      "Probleme zuerst definieren, dann Technologie auswählen",
      "Bausteine als System denken statt isoliert liefern",
      "Design, das Vertrauen und Handlung unterstützt",
    ],
  },
  faqItems,
  cta: {
    title: "Lassen Sie uns den Umsatzhebel finden, der wirklich zählt.",
    body:
      "Im Erstgespräch geht es nicht um leere Agentur-Pitches, sondern um Marge, Sichtbarkeit, Conversion und Prozesslogik. Erst wenn der Hebel klar ist, wird über Umsetzung gesprochen.",
    primaryCta: "Erstgespräch buchen",
    secondaryCta: "Per E-Mail anfragen",
  },
} as const;
