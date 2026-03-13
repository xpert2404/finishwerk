import { faqItems } from "@/content/faq";

export const homeContent = {
  hero: {
    eyebrow: "Für Restaurants, Handwerker & lokale Unternehmen",
    title: "Ihre Konkurrenz ist bei Google sichtbar. Sie nicht.",
    subtitle:
      "30 % Ihres Umsatzes gehen an Lieferando. Ihre Website bringt keine einzige Anfrage. Und wenn jemand Ihren Service googelt, finden sie jemand anderen. FinishWerk ändert das — mit einem System, das Kunden direkt zu Ihnen bringt.",
    primaryCta: "Kostenloses Erstgespräch",
    secondaryCta: "Ergebnisse ansehen",
    trustChips: [
      "8+ Jahre Expertise",
      "100+ betreute Projekte",
      "Top-3 bei lokaler Google-Suche",
    ],
    visualCards: [
      {
        label: "Direktbestellungen",
        value: "+24 %",
        detail: "Mehr Bestellungen über die eigene Website statt über Lieferando & Co.",
      },
      {
        label: "Plattformkosten gespart",
        value: "–44 %",
        detail: "Weniger Provisionen an Drittplattformen — mehr bleibt bei Ihnen",
      },
      {
        label: "Google-Ranking",
        value: "Seite 1",
        detail: "Ihr Geschäft auf Seite 1 bei lokalen Suchanfragen wie \u201ePizza bestellen [Stadt]\u201c",
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
      title: "Sie zahlen Tausende an Lieferando — und haben trotzdem keine Stammkunden",
      body:
        "Jeden Monat gehen 20–30 % Ihres Umsatzes an Plattformen wie Lieferando, Wolt oder Uber Eats. Die Kunden gehören nicht Ihnen — sie gehören der Plattform. Und wenn die Gebühren steigen, können Sie nichts tun.",
    },
    {
      title: "Wenn jemand Ihren Service googelt, findet er jemand anderen",
      body:
        "Ein Kunde sucht \u201ePizza bestellen\u201c oder \u201eElektriker in der Nähe\u201c — und findet Ihre Konkurrenz. Sie tauchen nicht auf, obwohl Sie besser sind. Ohne System ist Sichtbarkeit reiner Zufall.",
    },
    {
      title: "Ihre Website existiert — bringt aber nichts",
      body:
        "Die Seite sieht okay aus, aber es kommt keine einzige Anfrage darüber rein. Kein Anruf, keine Bestellung, kein Kontakt. Besucher kommen, schauen kurz — und sind wieder weg.",
    },
    {
      title: "Manche Tage sind überfüllt, andere komplett tot",
      body:
        "Montags kommt keiner, Freitags explodiert alles. Kein System, keine Planbarkeit. Kunden kommen spontan statt über Reservierungen — und Sie können weder planen noch steuern.",
    },
  ],
  solutionClusters: [
    {
      title: "Phase 1: Laden füllen",
      lead: "Wir bauen Ihre digitale Präsenz auf — Website, Angebote, Google-Sichtbarkeit. Ziel: Mehr Kunden kommen rein, direkt und ohne Umweg über teure Plattformen.",
      points: ["Website & E-Shop", "Google Seite 1", "Social Media", "Angebotslogik"],
    },
    {
      title: "Phase 2: Planbarkeit schaffen",
      lead: "Statt Chaos und Spontanbesuchen: Reservierungen, Direktbestellungen und echte Kundenbindung über Ihre eigene Website. Sie steuern, wann wie viel los ist.",
      points: ["Bestellsystem", "Reservierungen", "Kundenkommunikation", "Stammkunden-Aufbau"],
    },
    {
      title: "Phase 3: Gewinn optimieren",
      lead: "Wenn der Laden läuft und planbar ist, drehen wir an den Stellschrauben: Preise anpassen, zeitlich begrenzte Angebote testen, den Sweetspot zwischen Auslastung und Gewinn finden.",
      points: ["Preisoptimierung", "Zeitlich begrenzte Aktionen", "Datenbasierte Anpassung", "Wachstumsstrategie"],
    },
  ],
  resultMetrics: [
    {
      label: "Mehr Umsatz",
      value: 24,
      suffix: "%",
      context: "Durch Direktbestellungen statt Plattformumweg",
      isCaseSpecific: true,
    },
    {
      label: "Plattformkosten gespart",
      value: 44,
      suffix: "%",
      context: "Weniger Lieferando, Wolt & Co. — mehr bleibt bei Ihnen",
      isCaseSpecific: true,
    },
    {
      label: "Mehr Neukunden",
      value: 22,
      suffix: "%",
      context: "Über Google-Sichtbarkeit und eigene Kanäle",
      isCaseSpecific: true,
    },
    {
      label: "Phasen bis zum Ergebnis",
      value: 3,
      suffix: "",
      context: "Laden füllen → Planbarkeit → Gewinn optimieren",
      isCaseSpecific: false,
    },
  ],
  chartSeries: {
    revenueComparison: {
      label: "Direktbestellungen vs. Plattform",
      before: 68,
      after: 68,
      caption:
        "Anteil der Bestellungen: vorher 68 % über Plattformen — nachher 68 % direkt über die eigene Website.",
    },
    visibilityTrend: {
      label: "Google-Sichtbarkeit",
      values: [12, 18, 26, 35, 48, 61, 74],
      labels: ["Monat 1", "Monat 2", "Monat 3", "Monat 4", "Monat 5", "Monat 6", "Monat 7"],
      caption:
        "Typischer Verlauf: Ihre Sichtbarkeit bei Google wächst Monat für Monat.",
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
        "Sie zahlen jeden Monat Tausende an Lieferando, Wolt oder Uber Eats — und die Kunden gehören nicht Ihnen. Wir bauen Ihre eigene Bestellseite, bringen Sie auf Google Seite 1 und machen den Direktweg attraktiver als jede Plattform.",
    },
    {
      title: "Handwerker & Dienstleister",
      body:
        "Ihr Telefon klingelt nicht, weil niemand Sie findet. Wenn jemand \u201eElektriker in der Nähe\u201c googelt, erscheint Ihre Konkurrenz. Wir ändern das — mit einer Website, die Anfragen bringt, nicht nur gut aussieht.",
    },
    {
      title: "Lokale Geschäfte & Praxen",
      body:
        "Kunden suchen in Ihrer Stadt — aber finden Ihre Konkurrenz. Google Maps, Bewertungen und lokale Suchbegriffe: Wir machen Ihr Geschäft dort sichtbar, wo aktiv nach Ihnen gesucht wird.",
    },
    {
      title: "E-Commerce & Online-Shops",
      body:
        "Sie haben Produkte, aber zu wenig Besucher — oder Besucher, die nicht kaufen. Wir bringen organischen Traffic über SEO und bauen einen Shop, der Besucher in Käufer verwandelt.",
    },
  ],
  caseStudy: {
    eyebrow: "So funktioniert es in der Praxis",
    title: "Von Lieferando-abhängig zu 68 % Direktbestellungen",
    summary:
      "Ein Restaurant zahlte monatlich Tausende an Plattformgebühren. Wir haben eine eigene Bestellseite gebaut, das Google-Ranking auf Seite 1 gebracht und den Direktkanal attraktiver gemacht als jede Plattform.",
    steps: [
      {
        title: "1. Problem sichtbar machen",
        body:
          "Wie viel Geld geht jeden Monat an Lieferando & Co.? Wir rechnen gemeinsam durch, was die Plattformabhängigkeit wirklich kostet.",
      },
      {
        title: "2. Eigene Bestellseite aufbauen",
        body:
          "Kunden sollen direkt bei Ihnen bestellen — deshalb muss Ihre eigene Seite besser sein: schneller, mit Gutscheinen, Angeboten und klarerem Ablauf.",
      },
      {
        title: "3. Google-Sichtbarkeit aufbauen",
        body:
          "Wer \u201ePizza bestellen [Stadt]\u201c googelt, findet jetzt SIE. Google Maps, Bewertungen und SEO sorgen dafür, dass Kunden direkt auf Ihrer Seite landen.",
      },
    ],
    stats: [
      { label: "mehr Umsatz", value: "24 %" },
      { label: "Plattformkosten gespart", value: "44 %" },
      { label: "mehr Kunden gewonnen", value: "22 %" },
      { label: "Zeitraum", value: "6 Monate" },
    ],
  },
  visibility: {
    heading: "Wenn jemand \u201ePizza bestellen [Stadt]\u201c googelt — finden sie dann SIE?",
    body:
      "So funktioniert es: Jemand sucht bei Google nach Ihrem Service in Ihrer Stadt. Wenn Ihr Geschäft nicht auf Seite 1 erscheint, existieren Sie für diese Person nicht. FinishWerk sorgt dafür, dass SIE das erste Ergebnis sind — nicht Ihre Konkurrenz.",
    modules: [
      {
        title: "Google Seite 1",
        body: "Wir optimieren Ihre Website so, dass Google sie versteht und auf Seite 1 rankt. Bei genau den Suchbegriffen, die Ihre Kunden eingeben.",
      },
      {
        title: "Google Maps & Bewertungen",
        body: "Ihr Geschäft taucht auf der Karte auf, mit Bewertungen und allen Infos. Wenn Kunden in Ihrer Nähe suchen, sind Sie die erste Anlaufstelle.",
      },
      {
        title: "Aus Klicks werden Kunden",
        body: "Jemand findet Sie bei Google, landet auf Ihrer Seite — und wird durch klare Handlungsaufforderungen zum Kunden. Kein Rätselraten, kein Suchen.",
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
    title: "In 15 Minuten zeigen wir Ihnen, wo Sie Geld verlieren — und wie Sie es zurückholen.",
    body:
      "Im kostenlosen Erstgespräch analysieren wir: Wo stehen Sie bei Google? Wie viel zahlen Sie an Plattformen? Und welcher Hebel bringt Ihnen am schnellsten spürbar mehr Umsatz.",
    primaryCta: "Erstgespräch buchen",
    primaryCtaMicro: "15 Min · kostenlos · keine Vorbereitung nötig",
    secondaryCta: "Per E-Mail anfragen",
  },
} as const;
