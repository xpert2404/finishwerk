import { Rocket, CalendarCheck, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type SolutionCluster = {
  title: string;
  lead: string;
  points: readonly string[];
};

const icons = [Rocket, CalendarCheck, TrendingUp];
const phaseNumbers = ["01", "02", "03"];

export function SolutionSystemSection({
  content,
}: {
  content: readonly SolutionCluster[];
}) {
  return (
    <SectionShell id="loesungen">
      <SectionIntro
        eyebrow="Unser Ansatz"
        title="3 Phasen. Ein System. Messbare Ergebnisse."
        body="Wir reparieren nicht einzelne Baustellen — wir bauen ein System, das Schritt für Schritt mehr Kunden, mehr Planbarkeit und mehr Gewinn schafft."
      />

      <div className="relative mt-10 sm:mt-14">
        {/* Vertical timeline line */}
        <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-[var(--accent)] via-white/10 to-transparent sm:block sm:left-8 lg:left-1/2 lg:-translate-x-px" />

        <div className="space-y-6 sm:space-y-8">
          {content.map((cluster, index) => {
            const Icon = icons[index] ?? Rocket;

            return (
              <Reveal
                key={cluster.title}
                delay={index * 0.1}
                preset={index % 2 === 0 ? "fade-up" : "fade-left"}
              >
                <div
                  className={`relative grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 ${index % 2 !== 0 ? "lg:direction-rtl" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-5 top-6 z-10 hidden h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--canvas)] sm:left-8 sm:block lg:left-1/2 lg:-translate-x-1.5" />

                  {/* Content card — alternates sides on desktop */}
                  <div className={`${index % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                    <GlowPanel className="relative h-full">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="inline-flex rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] p-3">
                          <Icon className="h-6 w-6 text-[var(--accent)]" />
                        </div>
                        <span className="font-display text-4xl font-bold text-white/10 sm:text-5xl">
                          {phaseNumbers[index]}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                        {cluster.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)] sm:text-base sm:leading-8">
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
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
