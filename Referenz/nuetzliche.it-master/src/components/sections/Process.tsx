import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import type {Locale} from "@/data/types";

interface ProcessSectionProps {
  locale: Locale;
}

const processContent = {
  de: {
    kicker: "Zusammenarbeit",
    title: "In vier Schritten von der Idee zum Betrieb.",
    steps: [
      {
        number: "01",
        title: "Zielbild & Analyse",
        text: "Wir klären, was konkret besser werden soll — nicht was technisch möglich ist.",
        proof: "Kostenlose 15-Min-Ersteinschätzung"
      },
      {
        number: "02",
        title: "Fachliches & technisches Konzept",
        text: "Aufwandsspanne, Architektur und erste Meilensteine stehen fest, bevor Code entsteht.",
        proof: "Schriftliches Konzept vor Umsetzungsstart"
      },
      {
        number: "03",
        title: "Iterative Umsetzung mit Review",
        text: "Regelmäßige Abnahmen, kurze Zyklen und sichtbarer Fortschritt in jedem Sprint.",
        proof: "Wöchentliche Demos und Dokumentation"
      },
      {
        number: "04",
        title: "Rollout, Übergabe, Ausbau",
        text: "Saubere Übergabe, Betriebshandbuch und flexibler Ausbau nach Bedarf.",
        proof: "Stundenbasiert, kein Retainer-Lock-in"
      }
    ]
  },
  en: {
    kicker: "Collaboration",
    title: "From idea to operations in four steps.",
    steps: [
      {
        number: "01",
        title: "Goals & analysis",
        text: "We clarify what specifically needs to improve — not what is technically possible.",
        proof: "Free 15-minute initial assessment"
      },
      {
        number: "02",
        title: "Domain & technical concept",
        text: "Effort range, architecture and first milestones are fixed before any code is written.",
        proof: "Written concept before implementation starts"
      },
      {
        number: "03",
        title: "Iterative delivery with review",
        text: "Regular sign-offs, short cycles and visible progress in every sprint.",
        proof: "Weekly demos and documentation"
      },
      {
        number: "04",
        title: "Rollout, handover, expansion",
        text: "Clean handover, operations manual and flexible expansion as needed.",
        proof: "Hourly billing, no retainer lock-in"
      }
    ]
  }
} as const;

export function ProcessSection({locale}: ProcessSectionProps) {
  const content = processContent[locale];

  return (
    <section className="bg-[var(--surface-alt)] py-16 sm:py-20" id="process">
      <Container className="space-y-10">
        <SectionHeading kicker={content.kicker} title={content.title} />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} preset="fade-up" distance={16}>
              <div className="relative h-full rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-card)]">
                <p className="text-3xl font-semibold text-[var(--accent-current)]/20">{step.number}</p>
                <h3 className="pt-3 text-lg font-semibold text-[var(--ink-primary)]">{step.title}</h3>
                <p className="pt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                <p className="mt-4 border-t border-slate-200/80 pt-3 text-xs font-medium text-[var(--accent-current)]">
                  {step.proof}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
