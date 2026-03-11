import {ArrowRight, Check} from "lucide-react";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";

interface DataControlSectionProps {
  locale: Locale;
}

const dataControlContent = {
  de: {
    title: "Kontrollierter Betrieb — von der Architektur bis zum Audit.",
    signals: [
      "DSGVO-konforme .NET-Architektur in jeder Lösung",
      "DE/EU-Hosting und -Betrieb — kein Datenabfluss an Dritte",
      "Rollen, Freigaben und Audit-Trails eingebaut",
      "Klare Verantwortlichkeiten zwischen UI, API und Datenhaltung",
      "KI nur lokal und kontrolliert — kein externer KI-Dienst"
    ],
    cta: "KI & Datenkontrolle vertiefen"
  },
  en: {
    title: "Controlled operations — from architecture to audit.",
    signals: [
      "GDPR-compliant .NET architecture in every solution",
      "DE/EU hosting and operations — no data leaking to third parties",
      "Roles, approvals and audit trails built in",
      "Clear boundaries between UI, API and data layer",
      "AI only local and controlled — no external AI service"
    ],
    cta: "Learn more about AI & data control"
  }
} as const;

export function DataControlSection({locale}: DataControlSectionProps) {
  const content = dataControlContent[locale];

  return (
    <section className="bg-[var(--surface-dark)] py-16 sm:py-20" id="data-control">
      <Container>
        <Reveal preset="fade-up" distance={18}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {content.title}
            </h2>

            <ul className="mt-8 space-y-3 text-left sm:mx-auto sm:max-w-xl">
              {content.signals.map((signal) => (
                <li key={signal} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--accent-a)]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/ai-data-control"
                className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[var(--accent-a)]"
              >
                {content.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
