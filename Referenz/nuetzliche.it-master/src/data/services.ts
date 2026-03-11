import type { Locale, ServiceItem } from "@/data/types";

const servicesDe: ServiceItem[] = [
  {
    id: "webapps",
    pillar: "software",
    title: "Maßgeschneiderte .NET WebApps",
    summary: "Geschäftskritische Webanwendungen mit klarer Architektur, stabilen Releases und sauberer Dokumentation.",
    benefits: [
      "Prozesse passen sich nicht an Software an, sondern Software an Ihre Prozesse.",
      "Hohe Wartbarkeit für interne Teams und langfristige Weiterentwicklung.",
      "Klare Verantwortlichkeiten zwischen UI, API und Datenhaltung."
    ],
    deliverables: [
      "Architektur- und Umsetzungsplan",
      "Implementierung in .NET + MSSQL",
      "Modernes Frontend mit Angular (primär), optional Vue",
      "Tests, technische Doku und Übergabe"
    ],
    process: [
      "Anforderungen und Prioritäten klären",
      "Technisches Konzept mit Aufwandsschätzung erstellen",
      "Iterativ umsetzen und im Review abnehmen",
      "Dokumentieren und strukturiert weiterentwickeln"
    ],
    integrations: ["ERP", "CRM", "DMS", "Identity Provider", "Reporting-Systeme"],
    qualityStandard: "Code Reviews, automatisierte Tests, Performance-Budgets, nachvollziehbare Entscheidungen.",
    icon: "code"
  },
  {
    id: "apis",
    pillar: "software",
    title: "APIs & Integrationen",
    summary: "Schnittstellen, die Systeme zuverlässig verbinden und Datenflüsse transparent machen.",
    benefits: [
      "Weniger Medienbrüche zwischen Fachanwendungen.",
      "Klare Datenverträge reduzieren Fehler und Supportaufwand.",
      "Skalierbare Integrationen statt fragiler Einzellösungen."
    ],
    deliverables: [
      "API-Design inkl. Versionierung",
      "Integrationsadapter zu bestehenden Systemen",
      "Authentifizierung und Rechtekonzepte",
      "Monitoring und Fehlerbehandlung"
    ],
    process: [
      "Systemlandschaft aufnehmen",
      "Datenflüsse und Schnittstellen definieren",
      "Integration implementieren und testen",
      "Betrieb und Monitoring einführen"
    ],
    integrations: ["REST", "SOAP", "SFTP", "Message Queues", "Webhooks"],
    qualityStandard: "Vertragstests, idempotente Prozesse, strukturierte Logs und robuste Retry-Strategien.",
    icon: "database"
  },
  {
    id: "modernisierung",
    pillar: "software",
    title: "Modernisierung bestehender Anwendungen",
    summary: "Bestehende Software modernisieren, ohne den Betrieb unnötig zu riskieren.",
    benefits: [
      "Technische Schulden werden planbar reduziert.",
      "Bessere Performance und geringere Fehlerquote.",
      "Neue Anforderungen schneller umsetzbar."
    ],
    deliverables: [
      "Ist-Analyse und Modernisierungs-Roadmap",
      "Schrittweise Migration statt Big Bang",
      "Refactoring kritischer Module",
      "Aktualisierte Dokumentation"
    ],
    process: [
      "Risiko- und Abhängigkeitsanalyse",
      "Migrationsschnitte definieren",
      "Inkrementell modernisieren",
      "Abnahme pro Meilenstein"
    ],
    integrations: ["Legacy-Datenbanken", "Altsysteme", "On-Prem Services", "Cloud-Dienste"],
    qualityStandard: "Rückfallstrategien, klare Migrationsgrenzen und belastbare Abnahmekriterien.",
    icon: "refresh"
  },
  {
    id: "betrieb",
    pillar: "software",
    title: "Betrieb & Weiterentwicklung nach Bedarf",
    summary: "Stundenbasiertes Arbeiten mit klarer Priorisierung und planbaren Iterationen.",
    benefits: [
      "Kein starres Retainer-Modell, trotzdem verlässlicher Ablauf.",
      "Fokus auf Aufgaben mit messbarer Wirkung.",
      "Nachvollziehbare Übergaben und Entscheidungen."
    ],
    deliverables: [
      "Backlog-Pflege und Priorisierung",
      "Regelmäßige Review-Termine",
      "Wartung, Bugfixing und Feature-Ausbau",
      "Technische Dokumentation"
    ],
    process: [
      "Intake und Zielbild klären",
      "Grobe Aufwandsschätzung",
      "Iteration mit Review und Abnahme",
      "Nächste Prioritäten festlegen"
    ],
    integrations: ["Ticketing", "Monitoring", "CI/CD", "Deployment-Pipelines"],
    qualityStandard: "Kurze Feedbackzyklen, transparente Stundenaufwände und wartbare Ergebnisse.",
    icon: "shield"
  },
  {
    id: "ki",
    pillar: "ai",
    title: "Lokale KI-Lösungen (RAG, IDP)",
    summary: "KI-Funktionen für reale Geschäftsprozesse, betrieben in kontrollierter Infrastruktur.",
    benefits: [
      "Wissen schneller verfügbar und belastbar auffindbar.",
      "Dokumentenprozesse werden präziser und schneller.",
      "KI wird als Werkzeug mit klaren Grenzen eingeführt."
    ],
    deliverables: [
      "Use-Case-Definition und Datenflussdesign",
      "RAG-Lösung für interne Wissenssuche",
      "IDP-Pipeline für Klassifizierung und Extraktion",
      "Workflow-Schritte mit kontrollierter KI-Unterst\u00fctzung"
    ],
    process: [
      "Datenquellen und Schutzbedarf klären",
      "Pilotlösung mit messbaren Qualitätskriterien bauen",
      "Feedback aus dem Fachbereich einarbeiten",
      "Governance und Betrieb etablieren"
    ],
    integrations: ["DMS", "Mail-Systeme", "CRM", "Ticketing", "Workflow-Plattformen"],
    qualityStandard: "Nachvollziehbare Antworten, Qualitätsprüfungen, klare menschliche Eingriffspunkte.",
    icon: "cpu"
  },
  {
    id: "automation",
    pillar: "ai",
    title: "Workflow-Automatisierung ohne Baukasten-Logik",
    summary: "Automatisierungen werden individuell programmiert und präzise auf Ihren Ablauf abgestimmt.",
    benefits: [
      "Weniger manuelle Schleifen im Tagesgeschäft.",
      "Konstante Qualität bei wiederkehrenden Entscheidungen.",
      "Skalierbare Prozesse statt Klick-Routinen."
    ],
    deliverables: [
      "Prozessaufnahme und Soll-Design",
      "Automationslogik inkl. Ausnahmen und Fallbacks",
      "Monitoring der Durchläufe",
      "Dokumentation und Betriebshandbuch"
    ],
    process: [
      "Engpass identifizieren",
      "Automationskonzept mit Kontrollpunkten definieren",
      "Inkrementell integrieren",
      "Mit Fachbereich feinjustieren"
    ],
    integrations: ["E-Mail", "Dateiablagen", "ERP", "Freigabesysteme", "Datenbanken"],
    qualityStandard: "Transparente Regelwerke, nachvollziehbare Logs und klare Rollback-Optionen.",
    icon: "workflow"
  }
];

const servicesEn: ServiceItem[] = [
  {
    ...servicesDe[0],
    title: "Custom .NET Web Applications",
    summary: "Business-critical web applications with clean architecture, stable releases and thorough documentation.",
    benefits: [
      "Your software adapts to your process, not the other way around.",
      "High maintainability for internal teams and future growth.",
      "Clear boundaries between UI, API and data layer."
    ],
    deliverables: [
      "Architecture and delivery plan",
      "Implementation in .NET + MSSQL",
      "Modern frontend with Angular (primary), optionally Vue",
      "Testing, technical documentation and handover"
    ],
    process: [
      "Clarify requirements and priorities",
      "Create technical concept with effort estimate",
      "Deliver iteratively and review continuously",
      "Document and evolve in a structured way"
    ],
    integrations: ["ERP", "CRM", "DMS", "Identity Provider", "Reporting Systems"],
    qualityStandard: "Code reviews, automated tests, performance budgets and traceable technical decisions."
  },
  {
    ...servicesDe[1],
    title: "APIs and Integrations",
    summary: "Interfaces that connect systems reliably and make data flows transparent.",
    benefits: [
      "Fewer process breaks between business systems.",
      "Clear data contracts reduce errors and support effort.",
      "Scalable integrations instead of fragile one-offs."
    ],
    deliverables: [
      "API design with versioning",
      "Integration adapters for existing systems",
      "Authentication and access concepts",
      "Monitoring and fault handling"
    ],
    process: [
      "Map the current landscape",
      "Define data flows and interfaces",
      "Implement and test integrations",
      "Introduce operations and monitoring"
    ],
    integrations: ["REST", "SOAP", "SFTP", "Message Queues", "Webhooks"],
    qualityStandard: "Contract tests, idempotent processing, structured logs and resilient retry strategies."
  },
  {
    ...servicesDe[2],
    title: "Application Modernization",
    summary: "Modernize existing software without putting operations at unnecessary risk.",
    benefits: [
      "Technical debt becomes manageable.",
      "Higher performance and lower error rates.",
      "New requirements can be implemented faster."
    ],
    deliverables: [
      "Current-state analysis and modernization roadmap",
      "Stepwise migration instead of big-bang replacement",
      "Refactoring of critical modules",
      "Updated technical documentation"
    ],
    process: [
      "Assess risks and dependencies",
      "Define migration slices",
      "Modernize incrementally",
      "Accept milestone by milestone"
    ],
    integrations: ["Legacy Databases", "Legacy Systems", "On-Prem Services", "Cloud Services"],
    qualityStandard: "Fallback strategies, explicit migration boundaries and solid acceptance criteria."
  },
  {
    ...servicesDe[3],
    title: "Operations and Ongoing Development",
    summary: "Hourly collaboration with clear prioritization and predictable iterations.",
    benefits: [
      "No fixed retainer, yet still a professional process.",
      "Focus on tasks with tangible business impact.",
      "Transparent decisions and handovers."
    ],
    deliverables: [
      "Backlog maintenance and prioritization",
      "Regular review cycles",
      "Maintenance, bug fixing and feature evolution",
      "Technical documentation"
    ],
    process: [
      "Intake and target picture",
      "High-level effort estimate",
      "Iteration with review and acceptance",
      "Prioritize the next wave"
    ],
    integrations: ["Ticketing", "Monitoring", "CI/CD", "Deployment Pipelines"],
    qualityStandard: "Fast feedback loops, transparent effort tracking and maintainable outcomes."
  },
  {
    ...servicesDe[4],
    title: "Local AI Solutions (RAG, IDP)",
    summary: "AI capabilities for real business workflows, operated in controlled infrastructure.",
    benefits: [
      "Knowledge becomes available faster and more reliably.",
      "Document handling becomes faster and more accurate.",
      "AI is introduced as a tool with clear boundaries."
    ],
    deliverables: [
      "Use-case definition and data flow design",
      "RAG setup for internal knowledge search",
      "IDP pipeline for classification and extraction",
      "Workflow steps with controlled AI support"
    ],
    process: [
      "Assess data sources and protection needs",
      "Build pilot with measurable quality criteria",
      "Incorporate business feedback",
      "Establish governance and operations"
    ],
    integrations: ["DMS", "Mail Systems", "CRM", "Ticketing", "Workflow Platforms"],
    qualityStandard: "Traceable outputs, quality checks and clear human intervention points."
  },
  {
    ...servicesDe[5],
    title: "Workflow Automation Without Template Logic",
    summary: "Automations are individually engineered and tuned to your exact workflow.",
    benefits: [
      "Fewer manual loops in day-to-day operations.",
      "Consistent quality for recurring decisions.",
      "Scalable execution instead of click-heavy routines."
    ],
    deliverables: [
      "Process analysis and target design",
      "Automation logic including exceptions and fallbacks",
      "Execution monitoring",
      "Documentation and operational handbook"
    ],
    process: [
      "Identify the bottleneck",
      "Define automation concept with control points",
      "Integrate incrementally",
      "Fine-tune with business users"
    ],
    integrations: ["Email", "File Storage", "ERP", "Approval Systems", "Databases"],
    qualityStandard: "Transparent rules, traceable logs and explicit rollback options."
  }
];

export function getServices(locale: Locale): ServiceItem[] {
  return locale === "de" ? servicesDe : servicesEn;
}

export function getPillars(locale: Locale) {
  if (locale === "de") {
    return [
      {
        id: "software",
        title: "Maßgeschneiderte Softwarelösungen",
        description:
          "WebApps auf .NET/MSSQL-Basis mit modernen Frontends, stabilen APIs und klarer Wartbarkeit."
      },
      {
        id: "ai",
        title: "Lokale KI + Workflow-Automatisierung",
        description:
          "RAG, Dokumentenverarbeitung und Prozessautomatisierung in kontrollierter Infrastruktur mit nachvollziehbaren Datenflüssen."
      }
    ];
  }

  return [
    {
      id: "software",
      title: "Tailored Software Solutions",
      description:
        "Web applications on .NET/MSSQL with modern frontends, robust APIs and long-term maintainability."
    },
    {
      id: "ai",
      title: "Local AI + Workflow Automation",
      description:
        "RAG, intelligent document processing and workflow automation in controlled infrastructure with transparent data flows."
    }
  ];
}

