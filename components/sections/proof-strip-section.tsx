import { AnimatedBarChart } from "@/components/charts/animated-bar-chart";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";

type ProofLane = {
  title: string;
  metric: string;
  descriptor: string;
  story: string;
  values: readonly number[];
  footer: string;
};

export function ProofStripSection({
  content,
}: {
  content: readonly ProofLane[];
}) {
  return (
    <SectionShell className="py-10">
      <div className="grid gap-5 lg:grid-cols-3">
        {content.map((lane, index) => (
          <Reveal key={lane.title} delay={index * 0.08}>
            <GlowPanel className="h-full">
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    Proof Lane {index + 1}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {lane.title}
                  </h2>
                  <p className="text-sm leading-6 text-[var(--muted-strong)]">
                    {lane.story}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="font-display text-4xl font-semibold text-white">
                      {lane.metric}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted-strong)]">
                      {lane.descriptor}
                    </p>
                  </div>
                  <div className="w-[48%]">
                    <AnimatedBarChart values={lane.values} compact />
                  </div>
                </div>
                <p className="text-xs leading-6 text-[var(--muted)]">{lane.footer}</p>
              </div>
            </GlowPanel>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
