import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { CounterMetric } from "@/components/motion/counter";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "FinishWerk verbindet 8+ Jahre Expertise mit klarer Vertriebs- und Wachstumslogik. Ergebnisse statt Design-Fassade.",
  alternates: { canonical: "/ueber-uns" },
};

const timeline = [
  {
    year: "2016",
    title: "Erste Schritte in der Softwareentwicklung",
    body: "Beginn der technischen Laufbahn mit Webentwicklung, Systemarchitektur und digitalen Projekten.",
  },
  {
    year: "2019",
    title: "Expertise in vollem Umfang",
    body: "Umfangreiche Projekterfahrung in E-Commerce, CMS-Systemen, SEO und digitaler Prozessoptimierung.",
  },
  {
    year: "2022",
    title: "Gründung von FinishWerk",
    body: "Technische Stärke und geschäftliches Denken zusammengebracht — als Partner für digitale Systeme, die messbar besser funktionieren.",
  },
  {
    year: "Heute",
    title: "100+ Projekte, ein System",
    body: "Websites, Shops, SEO, Bestellsysteme und Infrastruktur werden als zusammenhängendes System für mehr Umsatz, Sichtbarkeit und Kontrolle gebaut.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={homeContent.about.title}
        body={homeContent.about.body}
      />

      {/* Trust Counters */}
      <SectionShell className="py-12 sm:py-16 lg:py-20">
        <Reveal preset="fade-up">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {siteConfig.trustNumbers.map((item, index) => (
              <div key={item.label} className="text-center">
                <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  <CounterMetric
                    value={item.value}
                    suffix={item.suffix}
                    duration={1200 + index * 200}
                  />
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* Timeline */}
      <SectionShell>
        <div className="mx-auto max-w-3xl">
          <Reveal preset="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Unser Weg
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Von der Softwareentwicklung zum Geschäftssystem.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-0">
            {timeline.map((step, index) => (
              <Reveal key={step.year} delay={index * 0.08}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)]">
                      <span className="text-xs font-semibold text-[var(--accent)]">
                        {step.year.slice(-2)}
                      </span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-white/10" />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                      {step.year}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* Principles */}
      <SectionShell>
        <Reveal preset="fade-up">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            Prinzipien
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Wie wir arbeiten.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {homeContent.about.principles.map((principle, index) => (
            <Reveal key={principle} delay={index * 0.08}>
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

      <CtaSection content={homeContent.cta} />
    </>
  );
}
