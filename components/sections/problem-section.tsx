import {
  CircleDollarSign,
  SearchX,
  MousePointerClick,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type ProblemItem = {
  title: string;
  body: string;
};

const icons = [CircleDollarSign, SearchX, MousePointerClick, Workflow];

export function ProblemSection({
  content,
}: {
  content: readonly ProblemItem[];
}) {
  return (
    <SectionShell id="probleme">
      <SectionIntro
        eyebrow="Geschäftliche Reibung"
        title="Wenn die digitale Infrastruktur nicht führt, verliert das Geschäft an Marge, Sichtbarkeit und Kontrolle."
        body="Die meisten Probleme liegen nicht in fehlenden Tools, sondern in fehlender Systemlogik. Sichtbarkeit, Conversion und operative Abläufe greifen nicht ineinander."
      />

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {content.map((item, index) => {
          const Icon = icons[index] ?? Workflow;

          return (
            <Reveal key={item.title} delay={index * 0.08}>
              <GlowPanel className="h-full">
                <Icon className="h-6 w-6 text-[var(--accent)]" />
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {item.body}
                </p>
              </GlowPanel>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
