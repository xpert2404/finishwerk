import {ArrowRight, Cog, FileCode2, MonitorSmartphone} from "lucide-react";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";

interface ServicesSectionProps {
  locale: Locale;
}

interface ServiceBlock {
  icon: typeof Cog;
  problem: string;
  title: string;
  solution: string;
  useCase: string;
  cta: string;
  href: "/services" | "/ai-data-control";
  dark?: boolean;
}

const servicesContent = {
  de: {
    kicker: "Was wir bauen",
    title: "Maßgeschneiderte Software, automatisierte Workflows, kontrollierte KI.",
    blocks: [
      {
        icon: MonitorSmartphone,
        problem: "Standardsoftware passt nicht, Excel-Listen wachsen, Medienbrüche kosten Zeit.",
        title: "Maßgeschneiderte .NET-Software",
        solution: ".NET-Webapps, PWAs und Angular-Anwendungen, die sich an Ihren Prozess anpassen — nicht umgekehrt. Sauber dokumentiert und langfristig wartbar.",
        useCase: "Fachanwendungen, Kundenportale, interne Tools, Schuldnerberatungs-PWAs",
        cta: "Leistungen ansehen",
        href: "/services",
        dark: true
      },
      {
        icon: Cog,
        problem: "Systeme leben nebeneinander, Freigaben sind unklar, Übergaben kosten Zeit.",
        title: "Workflow-Automatisierung & Integrationen",
        solution: "Bestehende Systeme werden zu belastbaren End-to-End-Prozessen verbunden — mit klaren Kontrollpunkten, Rollen und Freigaben.",
        useCase: "ERP-Anbindung, Freigabe-Workflows, Schnittstellenmanagement, Prozess-Orchestrierung",
        cta: "Automatisierung ansehen",
        href: "/services"
      },
      {
        icon: FileCode2,
        problem: "Dokumente sortieren und Wissen finden kostet Stunden — manuell und fehleranfällig.",
        title: "Kontrollierte KI-Bausteine",
        solution: "Self-hosted RAG und Dokumentenverarbeitung, eingebettet in Ihre Prozesse — DSGVO-konform und unter Ihrer Kontrolle.",
        useCase: "Posteingang automatisieren, Wissensdatenbank aufbauen, Klassifizierung und Extraktion",
        cta: "KI & Datenkontrolle ansehen",
        href: "/ai-data-control"
      }
    ] as ServiceBlock[]
  },
  en: {
    kicker: "What we build",
    title: "Custom software, automated workflows, controlled AI.",
    blocks: [
      {
        icon: MonitorSmartphone,
        problem: "Standard software doesn't fit, spreadsheets grow, media breaks cost time.",
        title: "Custom .NET software",
        solution: ".NET web apps, PWAs and Angular applications that adapt to your process — not the other way around. Cleanly documented and maintainable long-term.",
        useCase: "Domain applications, client portals, internal tools, case-management PWAs",
        cta: "View services",
        href: "/services",
        dark: true
      },
      {
        icon: Cog,
        problem: "Systems live side by side, approvals are unclear, handovers waste time.",
        title: "Workflow automation & integrations",
        solution: "Existing systems are connected into reliable end-to-end processes — with clear control points, roles and approvals.",
        useCase: "ERP integration, approval workflows, interface management, process orchestration",
        cta: "View automation",
        href: "/services"
      },
      {
        icon: FileCode2,
        problem: "Sorting documents and finding knowledge costs hours — manual and error-prone.",
        title: "Controlled AI components",
        solution: "Self-hosted RAG and document processing, embedded into your workflows — GDPR-compliant and under your control.",
        useCase: "Automate inbound documents, build knowledge bases, classify and extract",
        cta: "View AI & data control",
        href: "/ai-data-control"
      }
    ] as ServiceBlock[]
  }
} as const;

export function ServicesSection({locale}: ServicesSectionProps) {
  const content = servicesContent[locale];

  return (
    <section className="py-16 sm:py-20" id="services">
      <Container className="space-y-10">
        <SectionHeading kicker={content.kicker} title={content.title} />

        <div className="space-y-6">
          {content.blocks.map((block, index) => {
            const Icon = block.icon;
            const isDark = block.dark;

            return (
              <Reveal key={block.title} delay={index * 0.06} preset="fade-up" distance={18}>
                <article
                  className={`grid gap-6 rounded-[var(--radius-card-lg)] border p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center ${
                    isDark
                      ? "border-white/10 bg-[var(--surface-dark)] text-white shadow-[var(--shadow-dark)]"
                      : "border-slate-200/80 bg-white shadow-[var(--shadow-card)]"
                  }`}
                >
                  <div className="space-y-4">
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-full ${
                        isDark ? "bg-white/10 text-[var(--accent-a)]" : "bg-[var(--accent-current)]/10 text-[var(--accent-current)]"
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <p className={`text-sm ${isDark ? "text-white/70" : "text-slate-500"}`}>{block.problem}</p>
                    <h3 className={`text-xl font-semibold tracking-tight ${isDark ? "text-white" : "text-[var(--ink-primary)]"}`}>
                      {block.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className={`text-sm leading-relaxed ${isDark ? "text-white/85" : "text-slate-600"}`}>{block.solution}</p>
                    <p className={`text-xs font-medium ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                      {block.useCase}
                    </p>
                    <Link
                      href={block.href}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        isDark ? "text-white hover:text-[var(--accent-a)]" : "text-[var(--ink-primary)] hover:text-[var(--accent-current)]"
                      }`}
                    >
                      {block.cta}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
