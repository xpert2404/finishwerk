import { Camera, Search, SignalHigh } from "lucide-react";
import { AnimatedLineChart } from "@/components/charts/animated-line-chart";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type VisibilityModule = {
  title: string;
  body: string;
};

type VisibilityContent = {
  heading: string;
  body: string;
  modules: readonly VisibilityModule[];
  reachValues: readonly number[];
};

const icons = [Search, Camera, SignalHigh];

export function VisibilitySection({ content }: { content: VisibilityContent }) {
  return (
    <SectionShell id="sichtbarkeit">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionIntro
          eyebrow="Google & Sichtbarkeit"
          title={content.heading}
          body={content.body}
        />
        <Reveal>
          <GlowPanel className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Ihre Google-Sichtbarkeit
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              So wächst Ihre Reichweite — Monat für Monat.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
              Typischer Verlauf: Je länger Ihr System steht, desto mehr Menschen
              finden Sie über Google.
            </p>
            <div className="mt-8">
              <AnimatedLineChart
                values={content.reachValues}
                labels={[
                  "Mo 1",
                  "Mo 2",
                  "Mo 3",
                  "Mo 4",
                  "Mo 5",
                  "Mo 6",
                  "Mo 7",
                ]}
              />
            </div>
          </GlowPanel>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {content.modules.map((module, index) => {
          const Icon = icons[index] ?? SignalHigh;

          return (
            <Reveal key={module.title} delay={index * 0.08}>
              <GlowPanel className="h-full">
                <Icon className="h-6 w-6 text-[var(--accent)]" />
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {module.body}
                </p>
              </GlowPanel>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
