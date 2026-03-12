import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type AboutContent = {
  title: string;
  body: string;
  stats: readonly { label: string; value: string }[];
  principles: readonly string[];
};

export function AboutSection({ content }: { content: AboutContent }) {
  return (
    <SectionShell id="ueber-uns">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionIntro
          eyebrow="Über uns"
          title={content.title}
          body={content.body}
        />
        <Reveal>
          <GlowPanel className="h-full">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="surface-panel-soft rounded-[1.5rem] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </GlowPanel>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {content.principles.map((principle, index) => (
          <Reveal key={principle} delay={index * 0.08} preset="soft-parallax">
            <GlowPanel soft className="h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Prinzip {index + 1}
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--muted-strong)]">
                {principle}
              </p>
            </GlowPanel>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
