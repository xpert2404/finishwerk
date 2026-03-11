import type { CaseStudy, Locale } from "@/data/types";

const caseStudiesDe: CaseStudy[] = [
  {
    id: "posteingang",
    title: "Posteingangsdigitalisierung mit KI-gestützter Priorisierung",
    problem:
      "Ein Fachbereich musste täglich große Mengen eingehender Dokumente manuell vorsortieren. Prioritäten und relevante Inhalte waren schwer schnell zu erkennen.",
    solution:
      "Wir haben eine Pipeline aufgebaut, die Dokumente klassifiziert, zentrale Felder extrahiert (z.\u00A0B. Forderungshöhe), Dringlichkeit markiert und präzise Tags vergibt.",
    result:
      "Teams finden relevante Vorgänge schneller, priorisieren konsistenter und reduzieren Suchaufwand deutlich — ohne starre Template-Workflows.",
    tags: ["IDP", "Klassifizierung", "Extraktion", ".NET"],
    status: "published"
  },
  {
    id: "wissensassistent",
    title: "Lokaler RAG-Assistent für interne Richtlinien und Fachdokumentation",
    problem:
      "Mitarbeiter verbrachten täglich erhebliche Zeit mit der Suche nach internen Richtlinien, Prozessbeschreibungen und Fachinformationen in verteilten Systemen.",
    solution:
      "Ein selbst gehosteter RAG-Assistent wurde aufgebaut, der interne Dokumente indexiert und Fachanfragen mit Quellenangabe beantwortet — ohne Daten an externe Dienste zu senden.",
    result:
      "Antwortzeiten auf Fachfragen deutlich verkürzt. Neue Mitarbeiter finden sich schneller zurecht. Keine Abhängigkeit von Cloud-KI-Anbietern.",
    tags: ["RAG", "Wissensmanagement", "Self-hosted", ".NET"],
    status: "published"
  },
  {
    id: "schuldnerberatung",
    title: "PWA für Schuldnerberatung mit strukturierter Fallführung",
    problem:
      "Eine Beratungseinrichtung verwaltete Fälle in Tabellenkalkulationen und E-Mail-Ordnern. Nachverfolgung, Fristen und Dokumentation waren fehleranfällig und zeitintensiv.",
    solution:
      "Wir haben eine Progressive Web App in .NET mit strukturierter Fallführung gebaut: Mandantenverwaltung, Fristenüberwachung, Dokumenten-Upload und rollenbasierte Workflows.",
    result:
      "Berater arbeiten schneller und konsistenter. Fristversäumnisse sind stark reduziert. Die Einrichtung kann mehr Fälle mit gleichem Team betreuen.",
    tags: ["PWA", ".NET", "Fachanwendung", "Workflow"],
    status: "published"
  },
  {
    id: "shopping-portal",
    title: "Lokales Shopping-Portal für eine Stadtgemeinschaft",
    problem:
      "Einzelhändler einer Stadt wollten gemeinsam online sichtbar sein, hatten aber weder Budget für individuelle Shops noch technische Ressourcen für eine zentrale Plattform.",
    solution:
      "Wir haben ein zentrales Shopping-Portal als .NET-Webanwendung entwickelt: Händlerprofile, Produktkatalog, Suchfunktion und ein CMS für eigenständige Pflege.",
    result:
      "Über 40 lokale Händler sind online auffindbar. Die Stadt nutzt das Portal aktiv für lokale Kampagnen. Die Pflege erfolgt durch die Händler selbst.",
    tags: [".NET", "Web-App", "E-Commerce", "CMS"],
    status: "published"
  },
  {
    id: "fachanwendung",
    title: "Maßgeschneiderte .NET-Fachanwendung für Genehmigungsprozesse",
    problem:
      "Ein mittelständisches Unternehmen verwaltete Freigabe- und Genehmigungsprozesse über E-Mail-Ketten und geteilte Laufwerke. Nachvollziehbarkeit und Audit-Sicherheit fehlten.",
    solution:
      "Wir haben eine .NET-Fachanwendung mit rollenbasierten Workflows, revisionssicherer Protokollierung und Anbindung an das bestehende Active Directory gebaut.",
    result:
      "Genehmigungsprozesse laufen nachvollziehbar und auditierbar. Durchlaufzeiten um rund 60\u00A0% verkürzt. Compliance-Anforderungen sind ohne Mehraufwand erfüllt.",
    tags: [".NET", "Workflow", "Compliance", "Active Directory"],
    status: "published"
  },
  {
    id: "legacy-migration",
    title: "Legacy-Migration: Von VB6/Access zu .NET-Webanwendung",
    problem:
      "Ein Unternehmen arbeitete seit über 15 Jahren mit einer VB6/Access-Anwendung. Wartung war kaum noch möglich, Sicherheitslücken wuchsen, und neue Anforderungen konnten nicht umgesetzt werden.",
    solution:
      "Wir haben die Geschäftslogik analysiert, in eine moderne .NET-Architektur überführt und die Datenbank auf MSSQL migriert — schrittweise und ohne Betriebsunterbrechung.",
    result:
      "Die neue Anwendung ist wartbar, sicher und erweiterbar. Das Team kann erstmals eigene Auswertungen fahren. Die Migration erfolgte ohne Datenverlust.",
    tags: [".NET", "Migration", "MSSQL", "Modernisierung"],
    status: "published"
  }
];

const caseStudiesEn: CaseStudy[] = [
  {
    ...caseStudiesDe[0],
    title: "Inbound document digitization with AI-driven prioritization",
    problem:
      "A business unit had to manually triage large volumes of incoming documents every day. Priority and relevance were difficult to identify quickly.",
    solution:
      "We built a pipeline that classifies documents, extracts key fields (e.g. claim amount), marks urgency and assigns precise tags.",
    result:
      "Teams find relevant cases faster, prioritize more consistently and significantly reduce search effort — without rigid template workflows.",
    tags: ["IDP", "Classification", "Extraction", ".NET"]
  },
  {
    ...caseStudiesDe[1],
    title: "Local RAG assistant for internal guidelines and documentation",
    problem:
      "Employees spent significant time each day searching for internal policies, process documentation and specialist information across fragmented systems.",
    solution:
      "A self-hosted RAG assistant was built that indexes internal documents and answers domain questions with source references — without sending data to external services.",
    result:
      "Response times on domain questions reduced significantly. New employees onboard faster. No dependency on cloud AI providers.",
    tags: ["RAG", "Knowledge management", "Self-hosted", ".NET"]
  },
  {
    ...caseStudiesDe[2],
    title: "PWA for debt counseling with structured case management",
    problem:
      "A counseling organization managed cases in spreadsheets and email folders. Tracking, deadlines and documentation were error-prone and time-consuming.",
    solution:
      "We built a Progressive Web App in .NET with structured case management: client records, deadline monitoring, document uploads and role-based workflows.",
    result:
      "Counselors work faster and more consistently. Missed deadlines are significantly reduced. The organization handles more cases with the same team.",
    tags: ["PWA", ".NET", "Business app", "Workflow"]
  },
  {
    ...caseStudiesDe[3],
    title: "Local shopping portal for a city community",
    problem:
      "Retailers in a city wanted a joint online presence but lacked budget for individual shops and technical resources for a central platform.",
    solution:
      "We developed a central shopping portal as a .NET web application: retailer profiles, product catalog, search functionality and a CMS for independent maintenance.",
    result:
      "Over 40 local retailers are findable online. The city actively uses the portal for local campaigns. Content is maintained by the retailers themselves.",
    tags: [".NET", "Web app", "E-commerce", "CMS"]
  },
  {
    ...caseStudiesDe[4],
    title: "Custom .NET business application for approval processes",
    problem:
      "A mid-sized company managed approval and authorization processes via email chains and shared drives. Traceability and audit compliance were missing.",
    solution:
      "We built a .NET business application with role-based workflows, audit-proof logging and integration with the existing Active Directory.",
    result:
      "Approval processes run traceably and auditably. Throughput times reduced by roughly 60%. Compliance requirements are met without additional overhead.",
    tags: [".NET", "Workflow", "Compliance", "Active Directory"]
  },
  {
    ...caseStudiesDe[5],
    title: "Legacy migration: From VB6/Access to .NET web application",
    problem:
      "A company had been running a VB6/Access application for over 15 years. Maintenance was nearly impossible, security gaps were growing and new requirements could not be implemented.",
    solution:
      "We analyzed the business logic, migrated it to a modern .NET architecture and moved the database to MSSQL — incrementally, without disrupting operations.",
    result:
      "The new application is maintainable, secure and extensible. The team can run custom reporting for the first time. Migration completed without data loss.",
    tags: [".NET", "Migration", "MSSQL", "Modernization"]
  }
];

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return locale === "de" ? caseStudiesDe : caseStudiesEn;
}
