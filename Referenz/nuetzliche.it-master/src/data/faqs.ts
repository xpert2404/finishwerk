import type { FAQItem, Locale } from "@/data/types";

const faqsDe: FAQItem[] = [
  {
    id: "faq-1",
    category: "prozess",
    question: "Wie läuft Zusammenarbeit nach Bedarf ab?",
    answer:
      "Wir starten mit Intake und einer groben Aufwandsschätzung. Danach arbeiten wir iterativ mit klaren Reviews und Abnahmen pro Schritt."
  },
  {
    id: "faq-2",
    category: "prozess",
    question: "Wie schnell ist ein MVP oder Prototyp?",
    answer:
      "Das hängt vom Scope ab. Ein fokussierter Prototyp ist oft in wenigen Wochen möglich, wenn Datenzugänge und Entscheider verfügbar sind."
  },
  {
    id: "faq-3",
    category: "prozess",
    question: "Wie kalkuliert ihr Aufwand und Kosten?",
    answer:
      "Wir schätzen transparent nach Arbeitspaketen und Unsicherheiten. Abgerechnet wird stundenbasiert nach tatsächlichem Bedarf."
  },
  {
    id: "faq-4",
    category: "prozess",
    question: "Was bedeutet maßgeschneidert konkret?",
    answer:
      "Keine Template-Logik: Wir modellieren Daten, Prozesse und Oberflächen so, dass sie Ihren tatsächlichen Ablauf unterstützen."
  },
  {
    id: "faq-5",
    category: "ki",
    question: "Was bedeutet lokale KI und wo liegen die Daten?",
    answer:
      "Standardmäßig läuft die Lösung in kontrollierter Infrastruktur in DE/EU. Andere Betriebsmodelle nur nach expliziter Abstimmung."
  },
  {
    id: "faq-6",
    category: "ki",
    question: "Wie funktioniert interne Wissenssuche (RAG) einfach erklärt?",
    answer:
      "Relevante interne Quellen werden indexiert. Die KI beantwortet Fragen mit Bezug auf Ihre Inhalte statt mit unkontrollierten Allgemeinplätzen."
  },
  {
    id: "faq-7",
    category: "ki",
    question: "Dokumentenanalyse: Was kann klassifiziert oder extrahiert werden?",
    answer:
      "Zum Beispiel Dokumententyp, Fristen, Beträge, Ansprechpartner oder Vorgangsnummern. Der konkrete Umfang wird pro Use Case definiert."
  },
  {
    id: "faq-8",
    category: "ki",
    question: "Warum .NET und nicht eine andere Technologie?",
    answer:
      ".NET bietet Stabilit\u00e4t, Performance und langfristige Wartbarkeit f\u00fcr gesch\u00e4ftskritische Anwendungen. Zusammen mit MSSQL, Angular und sauberen APIs entsteht eine Architektur, die Ihr Team langfristig weiterentwickeln kann."
  },
  {
    id: "faq-9",
    category: "technik",
    question: "Integrationen und APIs: Wie bindet ihr bestehende Systeme an?",
    answer:
      "Über stabile Schnittstellen mit klaren Datenverträgen, Authentifizierung, Monitoring und sauberem Fehlerhandling."
  },
  {
    id: "faq-10",
    category: "technik",
    question: "Qualität: Reviews, Tests, Monitoring - euer Standard?",
    answer:
      "Wir arbeiten mit Code Reviews, automatisierten Tests und nachvollziehbarem Logging. Qualität ist ein fester Teil des Prozesses."
  },
  {
    id: "faq-11",
    category: "prozess",
    question: "Wie läuft Betrieb und Weiterentwicklung nach Go-Live?",
    answer:
      "Wir priorisieren gemeinsam im Backlog, setzen iterativ um und dokumentieren laufend. So bleibt die Lösung langfristig beherrschbar."
  },
  {
    id: "faq-12",
    category: "compliance",
    question: "Datenschutz und Compliance: Wie ist euer pragmatischer Ansatz?",
    answer:
      "Wir machen Datenflüsse, Zugriffe und Löschkonzepte transparent. Rechtliche Bewertung bleibt bei Ihrer Rechtsberatung."
  }
];

const faqsEn: FAQItem[] = [
  {
    ...faqsDe[0],
    question: "How does on-demand collaboration work?",
    answer:
      "We start with intake and a high-level estimate, then deliver iteratively with clear reviews and acceptance checkpoints."
  },
  {
    ...faqsDe[1],
    question: "How fast can an MVP or prototype be delivered?",
    answer:
      "It depends on scope. A focused prototype is often possible within a few weeks when data access and decision-makers are available."
  },
  {
    ...faqsDe[2],
    question: "How do you estimate effort and cost?",
    answer:
      "We estimate transparently by work packages and uncertainty. Billing is hourly based on actual demand."
  },
  {
    ...faqsDe[3],
    question: "What does tailored really mean?",
    answer:
      "No template logic: We model data, workflows and UI around your real operating process."
  },
  {
    ...faqsDe[4],
    question: "What does local AI mean and where is data stored?",
    answer:
      "By default, solutions run in controlled infrastructure in Germany/EU. Alternative models require explicit alignment."
  },
  {
    ...faqsDe[5],
    question: "How does internal knowledge search (RAG) work in simple terms?",
    answer:
      "Relevant internal sources are indexed. The AI answers based on your content rather than generic, uncontrolled output."
  },
  {
    ...faqsDe[6],
    question: "Document analysis: what can be classified or extracted?",
    answer:
      "Examples include document type, deadlines, amounts, contacts or case numbers. Scope is defined per use case."
  },
  {
    ...faqsDe[7],
    question: "Why .NET and not another technology?",
    answer:
      ".NET offers stability, performance and long-term maintainability for business-critical applications. Together with MSSQL, Angular and clean APIs, it creates an architecture your team can evolve over time."
  },
  {
    ...faqsDe[8],
    question: "Integrations and APIs: how do you connect existing systems?",
    answer:
      "Through stable interfaces with clear contracts, authentication, monitoring and proper error handling."
  },
  {
    ...faqsDe[9],
    question: "Quality: reviews, tests, monitoring - what is your standard?",
    answer:
      "We use code reviews, automated testing and traceable logging. Quality is part of delivery, not an afterthought."
  },
  {
    ...faqsDe[10],
    question: "How do operations and ongoing support work after go-live?",
    answer:
      "We prioritize jointly in a backlog, iterate transparently and keep documentation current for long-term maintainability."
  },
  {
    ...faqsDe[11],
    question: "Data protection and compliance: what is your pragmatic approach?",
    answer:
      "We make data flows, access and deletion policies transparent. Legal assessment remains with your legal counsel."
  }
];

export function getFaqs(locale: Locale): FAQItem[] {
  return locale === "de" ? faqsDe : faqsEn;
}
