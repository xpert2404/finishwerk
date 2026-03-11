import { faqItems } from "@/content/faq";

export const homeContent = {
  hero: {
    eyebrow: "Digitale Systeme statt Einzelleistungen",
    title: "Mehr Umsatz. Mehr Sichtbarkeit. Mehr Kontrolle.",
    subtitle:
      "Wenn jemand \u201eD\u00f6ner bestellen\u201c oder \u201eHandwerker in der N\u00e4he\u201c googelt, tauchen Sie aktuell nicht auf \u2014 Ihre Konkurrenz schon. FinishWerk baut das System, das Sie sichtbar macht, Anfragen bringt und Plattformgeb\u00fchren spart.",
    primaryCta: "Kostenloses Erstgespräch",
    secondaryCta: "Ergebnisse ansehen",
    trustChips: [
      "8+ Jahre Expertise",
      "100+ betreute Projekte",
      "Top-3 bei lokaler Google-Suche",
    ],
    visualCards: [
      {
        label: "Direktumsatz",
        value: "+24 %",
        detail: "Kundenbeispiel: Eigene Bestellseite statt Lieferando-Provision",
      },
      {
        label: "Marge zurückgeholt",
        value: "+44 %",
        detail: "Weniger Plattformgebühren, mehr vom eigenen Umsatz behalten",
      },
      {
        label: "Google-Sichtbarkeit",
        value: "Seite 1",
        detail: "Von unsichtbar auf Seite 1 bei relevanten lokalen Suchbegriffen",
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
      title: "Plattformen fressen Ihre Marge",
      body:
        "Lieferando nimmt bis zu 30 % Provision, Check24 und Booking.com ähnlich. Jede Bestellung über eine Plattform schmälert den Gewinn — und macht Sie abhängig von deren Regeln.",
    },
    {
      title: "Kunden finden Sie nicht bei Google",
      body:
        "Wenn jemand \u201eDöner bestellen [Stadt]\u201c oder \u201eElektriker in der Nähe\u201c sucht, erscheint Ihre Konkurrenz — nicht Sie. Ohne SEO-System bleibt Sichtbarkeit Zufall.",
    },
    {
      title: "Ihre Website bringt keine Anfragen",
      body:
        "Die Seite sieht vielleicht gut aus, aber es fehlt die Struktur: kein klarer Handlungsaufruf, kein Funnel, keine Führung. Besucher kommen — und gehen wieder.",
    },
    {
      title: "Digitale Insellösungen statt System",
      body:
        "Website hier, Social Media dort, Bestellungen per Telefon. Ohne ein verbundenes System gehen Anfragen verloren und Prozesse kosten unnötig Zeit.",
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
        "Statt 30 % an Lieferando abgeben: eigene Bestellseite, Google Maps Platz 1, QR-Code auf jedem Flyer. Kunden bestellen direkt bei Ihnen — mehr Marge, volle Kontrolle.",
    },
    {
      title: "Handwerker & Dienstleister",
      body:
        "Wenn jemand \u201eElektriker in der Nähe\u201c oder \u201eMaler [Stadt]\u201c googelt, finden sie SIE — nicht den Kollegen ohne Website. Strukturierte Anfragepfade statt verlorener Anrufe.",
    },
    {
      title: "Lokale Unternehmen",
      body:
        "Google-Maps-Profil, Bewertungen, lokale Suchbegriffe — alles in einem System. Ihr Geschäft wird dort sichtbar, wo Kunden in Ihrer Nähe aktiv suchen.",
    },
    {
      title: "E-Commerce & Shops",
      body:
        "Conversion-orientierte Shops mit klarer Produktführung. SEO bringt Besucher, das System macht sie zu Käufern — weniger Werbekosten, mehr organischer Umsatz.",
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
    heading: "SEO bedeutet: Kunden finden SIE, nicht Ihre Konkurrenz.",
    body:
      "Was ist SEO? Ganz einfach: Wenn jemand \u201ebester Döner [Stadt]\u201c oder \u201eHandwerker in der Nähe\u201c bei Google eingibt, zeigt Google IHRE Seite auf Platz 1 — nicht die Ihrer Konkurrenz. FinishWerk baut dieses System: technisches SEO-Fundament, lokale Sichtbarkeit, starkes Google-Maps-Profil und Content, der Nachfrage auffängt.",
    modules: [
      {
        title: "SEO-Fundament",
        body: "Technische Struktur, lokale Suchbegriffe und Seiten, die Google versteht und auf Seite 1 rankt. Aus \u201eunsichtbar\u201c wird \u201egefunden\u201c.",
      },
      {
        title: "Lokale Präsenz",
        body: "Google Maps, Bewertungen, Brancheneinträge — wenn Kunden in Ihrer Stadt suchen, erscheinen Sie als erste Anlaufstelle.",
      },
      {
        title: "Nachfrage auffangen",
        body: "Vom Google-Ergebnis zur Anfrage: Besucher landen auf Ihrer Seite und werden durch klare Handlungsaufforderungen zu Kunden.",
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
    title: "Finden Sie heraus, was passiert, wenn Kunden Sie bei Google finden.",
    body:
      "Im kostenlosen Erstgespräch analysieren wir gemeinsam: Wo stehen Sie bei Google? Wie viel Marge geht an Plattformen? Und welcher digitale Hebel bringt Ihnen am schnellsten mehr Umsatz.",
    primaryCta: "Erstgespräch buchen",
    secondaryCta: "Per E-Mail anfragen",
  },
} as const;
