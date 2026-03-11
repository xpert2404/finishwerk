import { Boxes, ChartSpline, Search, Waypoints } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type SolutionCluster = {
  title: string;
  lead: string;
  points: readonly string[];
};

const icons = [Boxes, ChartSpline, Search, Waypoints];

export function SolutionSystemSection({
  content,
}: {
  content: readonly SolutionCluster[];
}) {
  return (
    <SectionShell id="loesungen">
      <SectionIntro
        eyebrow="Lösungs-System"
        title="FinishWerk baut keine Service-Liste. Es baut ein System, das geschäftlich sauberer funktioniert."
        body="Jede Säule erfüllt einen Zweck. Zusammen erzeugen sie Sichtbarkeit, bessere Conversion, stärkere Kontrolle über den Direktkanal und weniger digitale Reibung."
      />

      <div className="relative mt-12">
        <div className="accent-line absolute left-1/2 top-10 hidden h-px w-[78%] -translate-x-1/2 lg:block" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.map((cluster, index) => {
            const Icon = icons[index] ?? Boxes;

            return (
              <Reveal key={cluster.title} delay={index * 0.08}>
                <GlowPanel className="relative h-full">
                  <div className="mb-6 inline-flex rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] p-3">
                    <Icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {cluster.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    {cluster.lead}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cluster.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-strong)]"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </GlowPanel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
