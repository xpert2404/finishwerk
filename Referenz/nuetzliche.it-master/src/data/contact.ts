import type { Locale } from "@/data/types";

export function getProcessSteps(locale: Locale) {
  if (locale === "de") {
    return [
      {
        title: "Intake",
        text: "Wir klären Ziele, Risiken und Rahmenbedingungen in einem kompakten Erstgespräch."
      },
      {
        title: "Aufwandsschätzung",
        text: "Sie erhalten eine grobe, nachvollziehbare Schätzung mit transparenten Annahmen."
      },
      {
        title: "Iterationen & Review",
        text: "Umsetzung in kurzen Zyklen mit fachlichem Feedback und klaren Entscheidungen."
      },
      {
        title: "Abnahme & Doku",
        text: "Abnahme nach definierten Kriterien, inklusive technischer Dokumentation und nächster Ausbaustufen."
      }
    ];
  }

  return [
    {
      title: "Intake",
      text: "We clarify goals, risks and boundaries in a compact initial session."
    },
    {
      title: "Effort estimate",
      text: "You get a transparent high-level estimate with explicit assumptions."
    },
    {
      title: "Iterations & review",
      text: "Implementation in short cycles with business feedback and clear decisions."
    },
    {
      title: "Acceptance & docs",
      text: "Delivery against explicit criteria, including technical documentation and next-step options."
    }
  ];
}

export function getWorkflowExamples(locale: Locale) {
  if (locale === "de") {
    return ["Posteingang", "Routing", "Freigaben", "Dokumente", "Synchronisation", "Ticketvorbereitung"];
  }
  return ["Inbound mail", "Routing", "Approvals", "Documents", "Sync", "Ticket pre-processing"];
}
