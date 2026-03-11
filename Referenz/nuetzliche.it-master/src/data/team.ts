import type {Locale, TeamMember} from "@/data/types";

const teamDe: TeamMember[] = [
  {
    name: "Philipp Draese",
    role: "Senior Software Dev & Database Engineer",
    focusAreas: ["Software-Architektur", "Datenbankdesign"],
    order: 1
  },
  {
    name: "Tobias Gut",
    role: "Senior Fullstack Dev & Database Engineer",
    focusAreas: ["UI/UX-Fokus", "Infrastruktur"],
    order: 2
  },
  {
    name: "Sebastian Gieseler",
    role: "Senior Fullstack Dev (.NET) & Database Engineer",
    focusAreas: ["Komplexe .NET-Anwendungen", "Systemintegration"],
    order: 3
  },
  {
    name: "Tyron Carlomagno",
    role: "Mid Fullstack Dev (Python/AI Engineering & Automatisierungen)",
    focusAreas: ["AI Engineering", "Workflow-Automatisierung"],
    order: 4
  }
];

const teamEn: TeamMember[] = [
  {
    ...teamDe[0],
    focusAreas: ["Software architecture", "Database design"]
  },
  {
    ...teamDe[1],
    focusAreas: ["UI/UX focus", "Infrastructure"]
  },
  {
    ...teamDe[2],
    focusAreas: ["Complex .NET applications", "System integration"]
  },
  {
    ...teamDe[3],
    focusAreas: ["AI engineering", "Workflow automation"]
  }
];

export const companyExpertise = {
  de: [".NET/C#", "MSSQL", "Angular", "Vue", "Python", "TypeScript/JavaScript", "APIs & Integrationen", "RAG/IDP", "Workflow-Automatisierung"],
  en: [".NET/C#", "MSSQL", "Angular", "Vue", "Python", "TypeScript/JavaScript", "APIs & Integrations", "RAG/IDP", "Workflow automation"]
};

export function getTeam(locale: Locale): TeamMember[] {
  return (locale === "de" ? teamDe : teamEn).sort((a, b) => a.order - b.order);
}
