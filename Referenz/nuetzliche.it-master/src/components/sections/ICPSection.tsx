import {ArrowRight, Building2, HeartPulse, Landmark, Scale} from "lucide-react";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";

interface ICPSectionProps {
  locale: Locale;
}

const icpContent = {
  de: {
    kicker: "Für wen wir arbeiten",
    title: "Branchen, in denen wir seit Jahren zuverlässig liefern.",
    cards: [
      {
        icon: Scale,
        title: "Kanzleien",
        motive: "Vertraulichkeit, Dokumentenlast, Freigabeprozesse",
        text: ".NET-Software und KI sortieren Posteingänge, finden Wissen schneller und bleiben unter Ihrer Kontrolle.",
        href: "/industries/law-firms" as const
      },
      {
        icon: HeartPulse,
        title: "Arztpraxen",
        motive: "Terminvergabe, Dokumentation, DSGVO",
        text: "Strukturierte Terminvergabe, dokumentierte Abläufe und DSGVO-konforme Digitalisierung, die Ihr Team entlastet.",
        href: "/industries/medical-practices" as const
      },
      {
        icon: Landmark,
        title: "Finanznahe Dienste",
        motive: "Dokumentation, Nachvollziehbarkeit, Rollen",
        text: "Audit-sichere .NET-Fachanwendungen und Workflows für Freigaben, Rollen und regulierte Abläufe.",
        href: "/services" as const
      },
      {
        icon: Building2,
        title: "Industrie & IP-Schutz",
        motive: "Internes Wissen, sensible Daten, Integration",
        text: "Integrationen und kontrollierte KI, die interne Daten dort lassen, wo sie hingehören.",
        href: "/services" as const
      }
    ]
  },
  en: {
    kicker: "Who we work with",
    title: "Industries where we have been delivering reliably for years.",
    cards: [
      {
        icon: Scale,
        title: "Law firms",
        motive: "Confidentiality, document volume, approval flows",
        text: ".NET software and AI sort inbound documents, find knowledge faster and stay under your control.",
        href: "/industries/law-firms" as const
      },
      {
        icon: HeartPulse,
        title: "Medical practices",
        motive: "Scheduling, documentation, GDPR",
        text: "Structured appointment management, documented workflows and GDPR-compliant digitalization that relieves your team.",
        href: "/industries/medical-practices" as const
      },
      {
        icon: Landmark,
        title: "Financial services",
        motive: "Documentation, traceability, roles",
        text: "Audit-proof .NET applications and workflows for approvals, roles and regulated processes.",
        href: "/services" as const
      },
      {
        icon: Building2,
        title: "Industry & IP protection",
        motive: "Internal knowledge, sensitive data, integration",
        text: "Integrations and controlled AI that keep internal data where it belongs.",
        href: "/services" as const
      }
    ]
  }
} as const;

export function ICPSection({locale}: ICPSectionProps) {
  const content = icpContent[locale];

  return (
    <section className="bg-[var(--surface-alt)] py-16 sm:py-20" id="industries">
      <Container className="space-y-10">
        <SectionHeading kicker={content.kicker} title={content.title} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.05} preset="fade-up" distance={16}>
                <Link href={card.href} className="group block h-full">
                  <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)]">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--accent-current)]/10 text-[var(--accent-current)]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="pt-4 text-lg font-semibold text-[var(--ink-primary)]">{card.title}</h3>
                    <p className="pt-1 text-xs font-medium text-[var(--accent-current)]">{card.motive}</p>
                    <p className="grow pt-3 text-sm leading-relaxed text-slate-600">{card.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-current)]">
                      {locale === "de" ? "Branche ansehen" : "View industry"}
                      <ArrowRight className="size-3.5" />
                    </span>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
