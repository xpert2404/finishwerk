import { AnimatedLineChart } from "@/components/charts/animated-line-chart";
import { ComparisonChart } from "@/components/charts/comparison-chart";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { SectionShell } from "@/components/layout/section-shell";
import { CounterMetric } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type ResultMetric = {
  label: string;
  value: number;
  suffix: string;
  context: string;
  isCaseSpecific: boolean;
};

type ChartSeries = {
  revenueComparison: {
    label: string;
    before: number;
    after: number;
    caption: string;
  };
  visibilityTrend: {
    label: string;
    values: readonly number[];
    labels: readonly string[];
    caption: string;
  };
  funnel: {
    label: string;
    steps: readonly { label: string; value: number }[];
    caption: string;
  };
};

export function ResultsSection({
  metrics,
  chartSeries,
}: {
  metrics: readonly ResultMetric[];
  chartSeries: ChartSeries;
}) {
  return (
    <SectionShell id="ergebnisse">
      <SectionIntro
        eyebrow="Ergebnisse"
        title="Messbare Wirkung statt vager Leistungsversprechen."
        body="KPI-Elemente und Diagramme zeigen die Logik hinter dem Ergebnis: bessere Marge, stärkere Sichtbarkeit, geführte Conversion und mehr Kontrolle über den Direktkanal."
      />

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.07}>
            <GlowPanel className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {metric.label}
              </p>
              <p className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                <CounterMetric value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                {metric.context}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {metric.isCaseSpecific ? "Kundenbeispiel" : "Systemlogik"}
              </p>
            </GlowPanel>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal>
          <GlowPanel className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {chartSeries.revenueComparison.label}
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              Plattformanteil runter, Direktkanal rauf
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
              {chartSeries.revenueComparison.caption}
            </p>
            <div className="mt-8">
              <ComparisonChart
                before={chartSeries.revenueComparison.before}
                after={chartSeries.revenueComparison.after}
                beforeLabel="Plattform-getrieben"
                afterLabel="Direkt-getrieben"
              />
            </div>
          </GlowPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <GlowPanel className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {chartSeries.visibilityTrend.label}
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              Sichtbarkeit baut sich auf und wirkt kumulativ
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-strong)]">
              {chartSeries.visibilityTrend.caption}
            </p>
            <div className="mt-8">
              <AnimatedLineChart
                values={chartSeries.visibilityTrend.values}
                labels={chartSeries.visibilityTrend.labels}
              />
            </div>
          </GlowPanel>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <GlowPanel className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {chartSeries.funnel.label}
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              Mehr Kontrolle entlang des Conversion-Pfads
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
              {chartSeries.funnel.caption}
            </p>
            <div className="mt-8">
              <FunnelChart steps={chartSeries.funnel.steps} />
            </div>
          </GlowPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <GlowPanel className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Ergebnislogik
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              Gute Systeme machen den nächsten Schritt eindeutig.
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Klare CTA-Pfade statt unverbundener Seiten",
                "Direktbestellungen statt Provisionsverlust",
                "SEO und Social als Nachfrage-System",
                "Weniger Reibung zwischen Marke, Inhalt und Prozess",
              ].map((item) => (
                <div
                  key={item}
                  className="surface-panel-soft rounded-[1.4rem] p-4 text-sm leading-7 text-[var(--muted-strong)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </GlowPanel>
        </Reveal>
      </div>
    </SectionShell>
  );
}
