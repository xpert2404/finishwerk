import type {Locale} from "@/data/types";

interface LandingFaq {
  question: string;
  answer: string;
}

interface LandingStep {
  title: string;
  text: string;
}

interface LandingProof {
  label: string;
  text: string;
}

interface LandingPageContent {
  kicker: string;
  title: string;
  description: string;
  audience: string;
  introBullets: string[];
  proofTitle: string;
  proofItems: LandingProof[];
  stepsTitle: string;
  steps: LandingStep[];
  stackTitle: string;
  stackItems: string[];
  securityTitle: string;
  securityItems: string[];
  faqTitle: string;
  faqs: LandingFaq[];
  ctaTitle: string;
  ctaText: string;
  secondaryLabel: string;
  metadataTitle: string;
  metadataDescription: string;
}

type LandingPageDictionary = Record<string, LandingPageContent>;

const solutionPages: Record<Locale, LandingPageDictionary> = {
  de: {
    "rag-knowledge-search": {
      kicker: "Lösung: RAG-Wissenssuche",
      title: "Interne Wissenssuche mit lokaler KI, die Antworten belegbar macht.",
      description: "Für Teams, die Richtlinien, Fachwissen und Fallkontext schneller finden wollen, ohne eine Black Box über vertrauliche Inhalte zu legen.",
      audience: "Geeignet für Kanzleien, Arztpraxen, Compliance-nahe Teams und serviceintensive Fachbereiche.",
      introBullets: ["Lokaler oder kontrollierter DE/EU-Betrieb", "Quellengebundene Antworten statt Halluzinations-Risiko", "Einbindung in bestehende Wissens- und Dokumentenquellen"],
      proofTitle: "Was diese Lösung im Alltag verbessert",
      proofItems: [
        {label: "Weniger Suchaufwand", text: "Wiederkehrende Rückfragen werden schneller beantwortet, weil Richtlinien und interne Quellen gezielt erschlossen werden."},
        {label: "Bessere Belegbarkeit", text: "Antworten werden mit Quelle und Kontext zurückgegeben, statt nur plausibel zu wirken."},
        {label: "Kontrollierte Einführung", text: "Rechte, Sichtbarkeiten und sensible Dokumente bleiben in einem klaren Governance-Rahmen."}
      ],
      stepsTitle: "So läuft ein typisches Projekt ab",
      steps: [
        {title: "Quellen klären", text: "Wir definieren, welche Dokumente, Wikis oder Datenbestände wirklich relevant sind."},
        {title: "Zugriff begrenzen", text: "Rollen, Freigaben und sensible Segmente werden vor dem Pilot sauber getrennt."},
        {title: "Antwortqualität messen", text: "Pilotfragen, Trefferqualität und Quellennachweise werden gemeinsam geprüft."},
        {title: "Produktiv einsetzen", text: "Die Suche wird in den Tagesablauf integriert und mit klaren Betriebsregeln stabilisiert."}
      ],
      stackTitle: "Typische Integrationen und Technik",
      stackItems: ["DMS, SharePoint, Dateispeicher, interne Wikis", "RAG-Pipelines mit kontrolliertem Index", ".NET- oder Web-Frontend für Suche und Freigabe"],
      securityTitle: "Security & DSGVO",
      securityItems: ["Betrieb in kontrollierter Infrastruktur", "Rollen- und Rechtekonzept vor Produktivsetzung", "Protokollierung von Zugriffen und Qualitätsprüfungen"],
      faqTitle: "Häufige Fragen",
      faqs: [
        {question: "Müssen alle Daten in die Cloud?", answer: "Nein. Die Lösung ist genau für kontrollierte lokale oder DE/EU-nahe Betriebsmodelle ausgelegt."},
        {question: "Wie verhindern wir unzuverlässige Antworten?", answer: "Mit Quellennachweisen, eingeschränkten Wissensräumen, Review-Schleifen und Pilotmessungen."}
      ],
      ctaTitle: "Wenn Wissen schneller verfügbar sein muss, definieren wir den passenden Pilot.",
      ctaText: "Im Erstgespräch klären wir Quellen, Schutzbedarf und die sinnvollste Einstiegslösung für eine lokale Wissenssuche.",
      secondaryLabel: "Passende Branchen ansehen",
      metadataTitle: "RAG-Wissenssuche | nützliche.IT",
      metadataDescription: "Lokale RAG-Wissenssuche mit belegbaren Antworten, kontrolliertem Betrieb und klarer Datenführung."
    },
    "idp-documents": {
      kicker: "Lösung: IDP-Dokumente",
      title: "Dokumente klassifizieren, Inhalte extrahieren, Übergaben sauber vorbereiten.",
      description: "Für Teams, die eingehende Dokumente schneller bearbeiten wollen, ohne Qualität oder Nachvollziehbarkeit zu verlieren.",
      audience: "Typisch für Kanzleien, Finanz-nahe Dienste, Verwaltung und dokumentenintensive Fachprozesse.",
      introBullets: ["Klassifizierung und Extraktion in kontrollierter Umgebung", "Dringlichkeit, Typ und Pflichtfelder früh sichtbar", "Übergabe an Fachprozess oder Fachsystem mit Kontext"],
      proofTitle: "Was diese Lösung im Alltag verbessert",
      proofItems: [
        {label: "Schnellerer Eingang", text: "Wiederkehrende Dokumentarten werden vorsortiert, bevor Teams manuell Zeit verlieren."},
        {label: "Konstantere Qualität", text: "Relevante Felder werden strukturiert vorbereitet und nicht erst spät im Ablauf erkannt."},
        {label: "Saubere Nachweise", text: "Extraktion, Plausibilisierung und Weitergabe werden entlang des Prozesses dokumentierbar."}
      ],
      stepsTitle: "So läuft ein typisches Projekt ab",
      steps: [
        {title: "Dokumentmuster aufnehmen", text: "Wir klären Dokumentarten, Volumen, Pflichtfelder und Qualitätsanforderungen."},
        {title: "Pilot mit echten Fällen", text: "Eine begrenzte Teststrecke zeigt, welche Trefferquote und welche Kontrollpunkte nötig sind."},
        {title: "Übergaben integrieren", text: "Ergebnisse fließen strukturiert in Fachsystem, Queue oder nachgelagerten Ablauf."},
        {title: "Betrieb absichern", text: "Ausnahmen, Fehlerbilder und Review-Schritte werden produktiv sauber geregelt."}
      ],
      stackTitle: "Typische Integrationen und Technik",
      stackItems: ["DMS, E-Mail, Dateiablagen, ERP/CRM", "IDP-Pipeline für Klassifizierung, Extraktion und Routing", "UI für Prüfung, Freigabe und Nachbearbeitung"],
      securityTitle: "Security & DSGVO",
      securityItems: ["Verarbeitung in kontrollierter Infrastruktur", "Freigabepunkte für sensible Dokumenttypen", "Nachvollziehbare Regeln für Löschung und Aufbewahrung"],
      faqTitle: "Häufige Fragen",
      faqs: [
        {question: "Brauchen wir perfekt standardisierte Dokumente?", answer: "Nein. Wichtig ist ein realistischer Scope und ein sauber definierter Qualitätsrahmen für den Pilot."},
        {question: "Kann das Team Fälle noch prüfen?", answer: "Ja. Die Lösung ist auf kontrollierte Vorarbeit und Freigabe ausgelegt, nicht auf unkontrollierte Vollautomatik."}
      ],
      ctaTitle: "Wenn Dokumentvolumen und manuelle Sichtung bremsen, strukturieren wir den passenden IDP-Startpunkt.",
      ctaText: "Wir klären mit Ihnen, welche Dokumente, Felder und Übergaben zuerst den größten Hebel haben.",
      secondaryLabel: "Case ansehen",
      metadataTitle: "IDP-Dokumente | nützliche.IT",
      metadataDescription: "Lokale IDP-Lösungen für Klassifizierung, Extraktion und dokumentenbasierte Prozessentlastung."
    },
    "api-integration": {
      kicker: "Lösung: API-Integration",
      title: "Integrationen, die Datenflüsse entlasten statt neue Fehlerquellen zu schaffen.",
      description: "Für Unternehmen, die Fachsysteme, Portale und bestehende Software sauber verbinden wollen, ohne fragile Einzellösungen zu stapeln.",
      audience: "Relevant für IT-Service, mittelständische Fachabteilungen und Teams mit vielen Systemgrenzen im Alltag.",
      introBullets: ["Saubere Datenverträge und nachvollziehbare Schnittstellen", "Weniger manuelle Übertragungen", "Bessere Basis für Automatisierung und Auswertung"],
      proofTitle: "Was diese Lösung im Alltag verbessert",
      proofItems: [
        {label: "Weniger Medienbrüche", text: "Daten laufen zwischen Systemen kontrollierter, statt mehrfach manuell kopiert zu werden."},
        {label: "Weniger Supportaufwand", text: "Klare Schnittstellen und Fehlerrückmeldungen reduzieren Such- und Korrekturzeiten."},
        {label: "Bessere Skalierbarkeit", text: "Neue Prozesse können auf vorhandenen Integrationsbausteinen aufsetzen."}
      ],
      stepsTitle: "So läuft ein typisches Projekt ab",
      steps: [
        {title: "Systemlandschaft klären", text: "Wir dokumentieren Quellen, Ziele, Verantwortlichkeiten und harte Randbedingungen."},
        {title: "Schnittstellen designen", text: "Datenverträge, Fehlerpfade und Authentifizierung werden sauber festgelegt."},
        {title: "Integration implementieren", text: "Adapter, APIs und Monitoring entstehen iterativ mit klarer Testlogik."},
        {title: "Betrieb stabilisieren", text: "Retry, Logging, Monitoring und Ownership werden produktiv geregelt."}
      ],
      stackTitle: "Typische Integrationen und Technik",
      stackItems: ["REST, Webhooks, SFTP, Queue-basierte Flows", ".NET-Services, APIs und Adapter", "Monitoring, Logging und Retry-Mechanismen"],
      securityTitle: "Security & DSGVO",
      securityItems: ["Authentifizierung und Rechtekonzept pro Verbindung", "Nachvollziehbare Logs und Fehlerpfade", "Datenfluss nur entlang definierter Übergabepunkte"],
      faqTitle: "Häufige Fragen",
      faqs: [
        {question: "Lässt sich das mit Legacy-Systemen umsetzen?", answer: "Ja, sofern Schnittstellen oder technisch belastbare Austauschpunkte vorhanden sind oder aufgebaut werden können."},
        {question: "Wie vermeiden wir fragile Integrationen?", answer: "Mit klaren Verträgen, Fehlerstrategien, Tests und Monitoring statt nur einem schnellen Connector."}
      ],
      ctaTitle: "Wenn Daten zwischen Systemen hängen bleiben, definieren wir die sauberste Integrationslinie.",
      ctaText: "Wir klären im Erstgespräch, wo der größte Integrationshebel liegt und wie sich Risiken kontrolliert reduzieren lassen.",
      secondaryLabel: "Branche ansehen",
      metadataTitle: "API-Integration | nützliche.IT",
      metadataDescription: "API-Integrationen und Systemanbindungen für stabile Datenflüsse, weniger Medienbrüche und saubere Betriebsmodelle."
    }
  },
  en: {
    "rag-knowledge-search": {
      kicker: "Solution: RAG knowledge search",
      title: "Internal knowledge search with local AI that keeps answers verifiable.",
      description: "For teams that need policies, know-how and case context faster without putting sensitive knowledge into a black box.",
      audience: "Relevant for law firms, medical practices, compliance-heavy teams and service-intensive operations.",
      introBullets: ["Local or controlled DE/EU deployment", "Source-grounded responses instead of hallucination risk", "Connected to your existing knowledge and document sources"],
      proofTitle: "What this improves in daily work",
      proofItems: [
        {label: "Less search effort", text: "Recurring questions are answered faster because policies and internal sources are indexed deliberately."},
        {label: "Better evidence", text: "Responses come back with source and context instead of only sounding plausible."},
        {label: "Controlled rollout", text: "Roles, access boundaries and sensitive document sets stay inside a clear governance model."}
      ],
      stepsTitle: "How a typical project runs",
      steps: [
        {title: "Clarify sources", text: "We define which documents, wikis or data sets actually matter."},
        {title: "Constrain access", text: "Roles, approvals and sensitive segments are separated before the pilot."},
        {title: "Measure answer quality", text: "Pilot questions, hit quality and source evidence are reviewed together."},
        {title: "Deploy into operations", text: "Search is integrated into daily work with explicit operating rules."}
      ],
      stackTitle: "Typical integrations and stack",
      stackItems: ["DMS, SharePoint, file storage, internal wikis", "Controlled RAG indexing pipeline", ".NET or web interface for search and approvals"],
      securityTitle: "Security & GDPR",
      securityItems: ["Controlled infrastructure", "Role and access design before production", "Logged access and quality review paths"],
      faqTitle: "Common questions",
      faqs: [
        {question: "Do all data sources need to go into the cloud?", answer: "No. The solution is designed for controlled local or DE/EU-centered operating models."},
        {question: "How do we keep answers reliable?", answer: "Through source grounding, constrained knowledge scopes, review loops and pilot measurement."}
      ],
      ctaTitle: "If internal knowledge needs to surface faster, we can define the right pilot together.",
      ctaText: "In the intro call we clarify sources, protection needs and the best starting setup for local knowledge search.",
      secondaryLabel: "View matching industries",
      metadataTitle: "RAG Knowledge Search | nützliche.IT",
      metadataDescription: "Local RAG knowledge search with verifiable answers, controlled deployment and clear data governance."
    },
    "idp-documents": {
      kicker: "Solution: IDP documents",
      title: "Classify documents, extract relevant fields and prepare clean handovers.",
      description: "For teams that need to process incoming documents faster without losing quality or traceability.",
      audience: "Typical for law firms, financial services, administration and document-heavy business processes.",
      introBullets: ["Classification and extraction in a controlled environment", "Urgency, type and required fields become visible early", "Structured handover into the business flow or target system"],
      proofTitle: "What this improves in daily work",
      proofItems: [
        {label: "Faster intake", text: "Recurring document types are sorted before teams lose manual review time."},
        {label: "More consistent quality", text: "Relevant fields are prepared structurally instead of being discovered late in the process."},
        {label: "Cleaner evidence", text: "Extraction, plausibility checks and handovers remain documentable across the workflow."}
      ],
      stepsTitle: "How a typical project runs",
      steps: [
        {title: "Capture document patterns", text: "We clarify document types, volume, required fields and quality thresholds."},
        {title: "Pilot with real cases", text: "A controlled test path shows which hit rate and review points are needed."},
        {title: "Integrate handovers", text: "Results move structurally into the target system, queue or downstream process."},
        {title: "Stabilize operations", text: "Exceptions, error patterns and review logic are handled explicitly before scaling."}
      ],
      stackTitle: "Typical integrations and stack",
      stackItems: ["DMS, email, file repositories, ERP/CRM", "IDP pipeline for classification, extraction and routing", "UI for review, approval and rework"],
      securityTitle: "Security & GDPR",
      securityItems: ["Processing inside controlled infrastructure", "Approval points for sensitive document types", "Traceable retention and deletion rules"],
      faqTitle: "Common questions",
      faqs: [
        {question: "Do we need perfectly standardized documents?", answer: "No. What matters is a realistic pilot scope and a clearly defined quality frame."},
        {question: "Can the team still review cases?", answer: "Yes. The solution is designed for controlled preparation and approval, not blind full automation."}
      ],
      ctaTitle: "If document volume and manual review are slowing the team down, we can define the right IDP entry point.",
      ctaText: "We clarify together which documents, fields and handovers create the highest initial leverage.",
      secondaryLabel: "View case",
      metadataTitle: "IDP Documents | nützliche.IT",
      metadataDescription: "Local IDP solutions for classification, extraction and document-driven process acceleration."
    },
    "api-integration": {
      kicker: "Solution: API integration",
      title: "Integrations that reduce friction instead of creating new failure points.",
      description: "For companies that need to connect business systems, portals and existing software cleanly instead of stacking fragile one-off integrations.",
      audience: "Relevant for IT service teams, mid-market operations and departments with too many system boundaries in daily work.",
      introBullets: ["Clean data contracts and traceable interfaces", "Less manual transfer", "Better foundation for automation and reporting"],
      proofTitle: "What this improves in daily work",
      proofItems: [
        {label: "Fewer process breaks", text: "Data moves between systems more cleanly instead of being copied manually multiple times."},
        {label: "Lower support effort", text: "Clear interfaces and fault feedback reduce debugging and correction time."},
        {label: "Better scalability", text: "New workflows can build on reusable integration building blocks."}
      ],
      stepsTitle: "How a typical project runs",
      steps: [
        {title: "Clarify the system landscape", text: "We document sources, targets, responsibilities and hard constraints."},
        {title: "Design interfaces", text: "Data contracts, error paths and authentication are defined deliberately."},
        {title: "Implement integration", text: "Adapters, APIs and monitoring are built iteratively with explicit test logic."},
        {title: "Stabilize operations", text: "Retry behavior, logging, monitoring and ownership are defined for production."}
      ],
      stackTitle: "Typical integrations and stack",
      stackItems: ["REST, webhooks, SFTP, queue-based flows", ".NET services, APIs and adapters", "Monitoring, logging and retry handling"],
      securityTitle: "Security & GDPR",
      securityItems: ["Authentication and access concept per connection", "Traceable logs and error paths", "Data moves only through defined handoff points"],
      faqTitle: "Common questions",
      faqs: [
        {question: "Can this work with legacy systems?", answer: "Yes, if interfaces or technically stable exchange points exist or can be established."},
        {question: "How do we avoid fragile integrations?", answer: "Through clean contracts, failure strategies, tests and monitoring instead of a quick connector only."}
      ],
      ctaTitle: "If data is getting stuck between systems, we can define the cleanest integration path.",
      ctaText: "We clarify in the intro call where the biggest integration leverage sits and how risks can be reduced in a controlled way.",
      secondaryLabel: "View industry",
      metadataTitle: "API Integration | nützliche.IT",
      metadataDescription: "API integration and system connectivity for stable data flows, fewer process breaks and clean operating models."
    }
  }
};

const industryPages: Record<Locale, LandingPageDictionary> = {
  de: {
    "law-firms": {
      kicker: "Branche: Kanzleien",
      title: "Lokale KI und Software für Kanzleien mit hohem Anspruch an Kontrolle und Verlässlichkeit.",
      description: "Wenn Eingang, Recherche, Dokumente und Übergaben Zeit kosten, braucht es keine Show-KI, sondern belastbare Entlastung mit klaren Grenzen.",
      audience: "Relevant für kleinere und mittlere Kanzleien, spezialisierte Boutiquen und rechtsnahe Fachbereiche.",
      introBullets: ["Vertrauliche Informationen unter kontrollierten Betriebsmodellen", "Schnellerer Zugriff auf Richtlinien, Fälle und Dokumente", "Bessere Vorqualifizierung und strukturierte Übergaben"],
      proofTitle: "Typische Hebel in Kanzlei-Prozessen",
      proofItems: [
        {label: "Posteingang", text: "Dokumente und Eingänge werden schneller vorsortiert, priorisiert und in den richtigen Kontext gesetzt."},
        {label: "Wissenszugriff", text: "Interne Richtlinien, Schriftsätze oder Fallwissen werden schneller auffindbar."},
        {label: "Mandantenkontakt", text: "Erstanliegen lassen sich strukturierter aufnehmen und sauber an die richtige Rolle übergeben."}
      ],
      stepsTitle: "So läuft ein typischer Einstieg ab",
      steps: [
        {title: "Engpass aufnehmen", text: "Wir klären, ob Recherche, Dokumente, Intake oder Übergaben aktuell am meisten bremsen."},
        {title: "Schutzbedarf definieren", text: "Datenräume, Rollen und sensible Quellen werden bewusst abgegrenzt."},
        {title: "Pilot umranden", text: "Ein begrenzter Anwendungsfall zeigt Wirkung, Qualität und sinnvolle Kontrollpunkte."},
        {title: "Sauber ausrollen", text: "Die Lösung wird in bestehende Abläufe integriert, ohne die Kanzlei in ein starres Tool zu drücken."}
      ],
      stackTitle: "Typische Bausteine",
      stackItems: ["RAG für internes Wissen", "IDP für Dokumenteingänge", "Fachliche .NET-Weboberflächen und Integrationen"],
      securityTitle: "Security & DSGVO",
      securityItems: ["Kontrollierte Datenräume statt pauschaler Cloud-Zwang", "Klare Rollen- und Freigabepunkte", "Nachvollziehbare Protokollierung und Löschkonzepte"],
      faqTitle: "Häufige Fragen",
      faqs: [
        {question: "Muss die Kanzlei ihre Daten in eine Fremd-Cloud geben?", answer: "Nein. Gerade für diesen Anwendungsfall planen wir kontrollierte Betriebsmodelle bewusst mit ein."},
        {question: "Wo bringt KI realistisch zuerst Nutzen?", answer: "Typisch bei Dokumenten, Recherche, Vorqualifizierung und strukturierten Übergaben - nicht bei unkontrollierter Vollautomatik."}
      ],
      ctaTitle: "Wenn Kanzlei-Prozesse entlastet werden sollen, definieren wir den sinnvollsten ersten Hebel.",
      ctaText: "Im Erstgespräch klären wir, wo lokale KI oder maßgeschneiderte Software den größten konkreten Nutzen bringt.",
      secondaryLabel: "Passende Lösung ansehen",
      metadataTitle: "Kanzleien | nützliche.IT",
      metadataDescription: "Lokale KI und Business-Software für Kanzleien mit Fokus auf Datenkontrolle, Dokumentenprozesse und Wissenszugriff."
    },
    "medical-practices": {
      kicker: "Branche: Arztpraxen",
      title: "Digitale Entlastung für Praxen, die sensible Informationen und knappe Zeit unter Kontrolle halten müssen.",
      description: "Wenn Telefonaufkommen, Dokumente, Rückrufe und Team-Übergaben Zeit kosten, braucht es eine sauber eingeführte Lösung statt zusätzlicher Tool-Komplexität.",
      audience: "Geeignet für Praxen, MVZ-nahe Strukturen und medizinische Teams mit hohem Kommunikationsaufwand.",
      introBullets: ["Kontrollierte Verarbeitung sensibler Daten", "Telefonische Erstaufnahme und Rückrufvorbereitung", "Strukturierte Dokument- und Wissensprozesse"],
      proofTitle: "Typische Hebel in Praxisabläufen",
      proofItems: [
        {label: "Telefonaufkommen", text: "Routinethemen werden besser vorqualifiziert, damit Teams sich auf wirklich relevante Fälle konzentrieren können."},
        {label: "Dokumente", text: "Eingänge werden strukturierter vorbereitet, bevor Zeit in manuelle Sichtung fließt."},
        {label: "Wissenszugriff", text: "Interne Hinweise und wiederkehrende Antworten werden schneller verfügbar."}
      ],
      stepsTitle: "So läuft ein typischer Einstieg ab",
      steps: [
        {title: "Engpass bestimmen", text: "Wir klären, ob Telefonie, Dokumente oder interne Übergaben zuerst entlastet werden sollen."},
        {title: "Grenzen definieren", text: "Datenschutz, Rollen und sensible Prozessgrenzen werden früh sauber gesetzt."},
        {title: "Pilot aufbauen", text: "Eine klar abgegrenzte Strecke zeigt Nutzen und Qualität ohne Betriebschaos."},
        {title: "Im Alltag verankern", text: "Die Lösung wird so eingebettet, dass sie das Team entlastet statt zusätzlich zu fordern."}
      ],
      stackTitle: "Typische Bausteine",
      stackItems: ["Workflow-Automatisierung und Intake-Logik", "Dokumentenrouting und strukturierte Vorarbeit", "Weboberflächen und Integrationen für Teamübergaben"],
      securityTitle: "Security & DSGVO",
      securityItems: ["Kontrollierte Betriebsmodelle statt unnötiger Datenstreuung", "Rollenbasierte Zugriffe und definierte Freigaben", "Nachvollziehbare Verarbeitungsschritte"],
      faqTitle: "Häufige Fragen",
      faqs: [
        {question: "Kann KI medizinische Entscheidungen übernehmen?", answer: "Nein. Sinnvoll ist eine strukturierte Vorqualifizierung und geordnete Weitergabe an das Praxisteam."},
        {question: "Kann das in bestehende Abläufe integriert werden?", answer: "Ja, genau dafür werden die Lösungen auf den realen Praxisprozess und die vorhandenen Systeme abgestimmt."}
      ],
      ctaTitle: "Wenn Telefonie, Dokumente oder Übergaben die Praxis ausbremsen, definieren wir den besten Startpunkt.",
      ctaText: "Wir klären gemeinsam, welche Entlastung schnell spürbar ist und welche Grenzen bewusst eingehalten werden müssen.",
      secondaryLabel: "KI-Lösungen ansehen",
      metadataTitle: "Arztpraxen | nützliche.IT",
      metadataDescription: "Lokale KI und digitale Prozessentlastung für Arztpraxen mit Fokus auf Telefonie, Dokumente und Datenkontrolle."
    },
    "it-service": {
      kicker: "Branche: IT-Service",
      title: "Software, Integrationen und lokale KI für IT-Service-Teams mit vielen Systemgrenzen.",
      description: "Wenn Tickets, Dokumente, Schnittstellen und Wissenszugriff zwischen Tools hängen bleiben, braucht es sauber orchestrierte Integrationen.",
      audience: "Geeignet für interne IT-Teams, MSP-nahe Strukturen und serviceorientierte Technologieeinheiten.",
      introBullets: ["APIs und Datenflüsse sauber verbinden", "Wissenszugriff und Ticketvorbereitung beschleunigen", "Lokale KI in kontrollierbaren Betriebsmodellen einsetzen"],
      proofTitle: "Typische Hebel im IT-Service",
      proofItems: [
        {label: "Ticketkontext", text: "Relevante Informationen stehen früher bereit, bevor Rückfragen Zeit kosten."},
        {label: "Integrationen", text: "Datenflüsse zwischen Service-Tools, DMS und Fachsystemen werden stabilisiert."},
        {label: "Wissensarbeit", text: "Richtlinien, How-tos und Fallkontext lassen sich schneller wiederverwenden."}
      ],
      stepsTitle: "So läuft ein typischer Einstieg ab",
      steps: [
        {title: "Systemgrenzen sichtbar machen", text: "Wir identifizieren, wo Daten, Kontext oder Verantwortung im Alltag abbrechen."},
        {title: "Lösungslinie definieren", text: "Integration, Workflow-Automatisierung oder Wissenszugriff werden bewusst priorisiert."},
        {title: "Pilot in echter Umgebung", text: "Die Lösung wird dort getestet, wo operative Reibung tatsächlich entsteht."},
        {title: "Stabil in Betrieb bringen", text: "Monitoring, Ownership und Qualitätskriterien sichern die produktive Nutzung."}
      ],
      stackTitle: "Typische Bausteine",
      stackItems: ["APIs, Webhooks und Queue-basierte Flows", "Ticketing-, CRM- und Wissensintegrationen", ".NET-Webapps und lokale KI-Module"],
      securityTitle: "Security & DSGVO",
      securityItems: ["Kontrollierte Betriebsmodelle und klare Rollen", "Nachvollziehbare Protokollierung und Fehlerpfade", "Definierte Übergaben zwischen Mensch und Automatisierung"],
      faqTitle: "Häufige Fragen",
      faqs: [
        {question: "Ist das nur für große IT-Organisationen sinnvoll?", answer: "Nein. Gerade kleinere und mittlere Service-Teams profitieren von sauberer Automatisierung und besserem Wissenszugriff."},
        {question: "Brauchen wir dafür eine komplette Systemerneuerung?", answer: "Nein. Meist ist ein gezielter Einstieg über Integrationen, Ticketvorbereitung oder Wissenszugriff sinnvoller."}
      ],
      ctaTitle: "Wenn Systemgrenzen im IT-Service Zeit kosten, definieren wir die stärkste Integrations- oder Automatisierungslinie.",
      ctaText: "Im Erstgespräch klären wir, wo Kontext, Daten oder Übergaben heute am meisten Reibung erzeugen.",
      secondaryLabel: "API-Integration ansehen",
      metadataTitle: "IT-Service | nützliche.IT",
      metadataDescription: "Lokale KI, Integrationen und Business-Software für IT-Service-Teams mit Fokus auf stabile Datenflüsse und Wissenszugriff."
    }
  },
  en: {
    "law-firms": {
      kicker: "Industry: law firms",
      title: "Local AI and software for law firms that need control, reliability and usable process relief.",
      description: "When intake, research, documents and handovers consume time, the answer is not demo AI but reliable support with explicit boundaries.",
      audience: "Relevant for small and mid-sized firms, specialist boutiques and legal-adjacent professional teams.",
      introBullets: ["Confidential information inside controlled deployment models", "Faster access to policies, cases and documents", "Better intake and more structured handovers"],
      proofTitle: "Typical leverage in legal workflows",
      proofItems: [
        {label: "Inbound handling", text: "Documents and incoming cases are sorted, prioritized and contextualized faster."},
        {label: "Knowledge access", text: "Internal policies, briefs and case knowledge become easier to retrieve."},
        {label: "Client communication", text: "Initial requests can be captured more structurally and routed to the right role."}
      ],
      stepsTitle: "How a typical entry project runs",
      steps: [
        {title: "Capture the bottleneck", text: "We clarify whether research, documents, intake or handovers create the biggest friction right now."},
        {title: "Define the protection model", text: "Data areas, roles and sensitive sources are deliberately constrained."},
        {title: "Shape the pilot", text: "A limited use case shows impact, quality and the right control points."},
        {title: "Roll out cleanly", text: "The solution is integrated into existing legal workflows without forcing the firm into a rigid product model."}
      ],
      stackTitle: "Typical building blocks",
      stackItems: ["RAG for internal knowledge", "IDP for inbound documents", "Business-specific .NET web interfaces and integrations"],
      securityTitle: "Security & GDPR",
      securityItems: ["Controlled data spaces instead of default cloud sprawl", "Explicit roles and approvals", "Traceable logging and deletion policies"],
      faqTitle: "Common questions",
      faqs: [
        {question: "Do firms need to move confidential data into an external cloud?", answer: "No. Controlled operating models are a core part of the solution design for this use case."},
        {question: "Where does AI create realistic first value?", answer: "Typically in documents, research, intake and structured handovers, not in uncontrolled end-to-end automation."}
      ],
      ctaTitle: "If legal workflows need clearer relief, we can define the strongest first lever.",
      ctaText: "In the intro call we clarify where local AI or tailored software creates the most concrete benefit.",
      secondaryLabel: "View matching solution",
      metadataTitle: "Law Firms | nützliche.IT",
      metadataDescription: "Local AI and business software for law firms with a focus on document workflows, knowledge access and data control."
    },
    "medical-practices": {
      kicker: "Industry: medical practices",
      title: "Digital relief for practices that need to manage sensitive information and limited time carefully.",
      description: "When calls, documents, callbacks and team handovers consume too much time, the answer is a disciplined rollout instead of more tool chaos.",
      audience: "Suitable for practices, outpatient centers and medically focused teams with heavy communication load.",
      introBullets: ["Controlled handling of sensitive data", "Phone intake and callback preparation", "Structured document and knowledge workflows"],
      proofTitle: "Typical leverage in practice operations",
      proofItems: [
        {label: "Phone volume", text: "Routine requests are pre-qualified more cleanly so the team can focus on relevant cases."},
        {label: "Documents", text: "Inbound documents are prepared structurally before manual review time is spent."},
        {label: "Knowledge access", text: "Internal guidance and recurring answers become faster to retrieve."}
      ],
      stepsTitle: "How a typical entry project runs",
      steps: [
        {title: "Identify the bottleneck", text: "We clarify whether telephony, documents or internal handovers should be relieved first."},
        {title: "Define boundaries", text: "Data protection, roles and sensitive process boundaries are set early."},
        {title: "Build the pilot", text: "A tightly scoped pilot shows value and quality without disrupting operations."},
        {title: "Embed into daily work", text: "The solution is integrated so the team feels relief instead of extra operational burden."}
      ],
      stackTitle: "Typical building blocks",
      stackItems: ["Workflow automation and intake logic", "Document routing and structured preparation", "Web interfaces and integrations for team handovers"],
      securityTitle: "Security & GDPR",
      securityItems: ["Controlled operating models", "Role-based access and explicit approvals", "Traceable processing paths"],
      faqTitle: "Common questions",
      faqs: [
        {question: "Can AI make medical decisions?", answer: "No. The right pattern is structured pre-qualification and clean escalation to the practice team."},
        {question: "Can this fit into existing practice workflows?", answer: "Yes. The solution is adapted to the real process and current systems rather than replacing them blindly."}
      ],
      ctaTitle: "If calls, documents or handovers are slowing the practice down, we can define the best first step.",
      ctaText: "Together we clarify where relief becomes visible quickly and which boundaries must stay explicit by design.",
      secondaryLabel: "View AI solutions",
      metadataTitle: "Medical Practices | nützliche.IT",
      metadataDescription: "Local AI and digital process relief for medical practices focused on calls, documents and data control."
    },
    "it-service": {
      kicker: "Industry: IT service",
      title: "Software, integrations and local AI for IT service teams dealing with too many system boundaries.",
      description: "When tickets, documents, interfaces and knowledge access get stuck between tools, the answer is deliberately orchestrated integrations.",
      audience: "Suitable for internal IT teams, MSP-like structures and service-oriented technology organizations.",
      introBullets: ["Connect APIs and data flows cleanly", "Accelerate knowledge access and ticket preparation", "Use local AI in controlled operating models"],
      proofTitle: "Typical leverage in IT service operations",
      proofItems: [
        {label: "Ticket context", text: "Relevant information becomes available earlier before follow-up questions consume time."},
        {label: "Integrations", text: "Data flows between service tools, DMS and business systems are stabilized."},
        {label: "Knowledge work", text: "Policies, how-tos and case context can be reused faster."}
      ],
      stepsTitle: "How a typical entry project runs",
      steps: [
        {title: "Make system boundaries visible", text: "We identify where data, context or ownership breaks in daily operations."},
        {title: "Define the solution line", text: "Integration, workflow automation or knowledge access are prioritized deliberately."},
        {title: "Pilot in the real environment", text: "The solution is tested where operational friction actually exists."},
        {title: "Stabilize operations", text: "Monitoring, ownership and quality criteria support the productive rollout."}
      ],
      stackTitle: "Typical building blocks",
      stackItems: ["APIs, webhooks and queue-based flows", "Ticketing, CRM and knowledge integrations", ".NET web apps and local AI modules"],
      securityTitle: "Security & GDPR",
      securityItems: ["Controlled operating models and clear roles", "Traceable logging and error paths", "Defined handoffs between human work and automation"],
      faqTitle: "Common questions",
      faqs: [
        {question: "Is this only useful for large IT organizations?", answer: "No. Smaller and mid-sized service teams often benefit the most from clean automation and better knowledge access."},
        {question: "Do we need a full platform rebuild first?", answer: "No. A targeted entry via integrations, ticket preparation or knowledge access is usually more effective."}
      ],
      ctaTitle: "If system boundaries are costing time in IT service, we can define the strongest integration or automation line.",
      ctaText: "In the intro call we clarify where context, data or handovers create the most friction today.",
      secondaryLabel: "View API integration",
      metadataTitle: "IT Service | nützliche.IT",
      metadataDescription: "Local AI, integrations and business software for IT service teams focused on stable data flows and better knowledge access."
    }
  }
};

export function getSolutionLandingPage(locale: Locale, slug: string) {
  return solutionPages[locale][slug];
}

export function getIndustryLandingPage(locale: Locale, slug: string) {
  return industryPages[locale][slug];
}