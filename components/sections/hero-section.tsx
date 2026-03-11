"use client";

import { type ReactNode, useEffect, useState } from "react";
import { ArrowRight, ChartNoAxesCombined, ShieldCheck, Workflow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BookingCta } from "@/components/booking/booking-cta";
import { AnimatedLineChart } from "@/components/charts/animated-line-chart";
import { ComparisonChart } from "@/components/charts/comparison-chart";
import { SectionShell } from "@/components/layout/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricChip } from "@/components/ui/metric-chip";
import { motionEasing, stagger } from "@/lib/motion";

/* ── Hydration-safe animation wrapper ──────────────────────
   SSR + first client render: plain <div>/<span> (identical on both sides).
   After useEffect: switches to motion.* with full animation.
   useReducedMotion is only read AFTER mount → no SSR mismatch. */
function Anim({
  children,
  className,
  as = "div",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
  delay?: number;
  y?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => { setMounted(true); }, []);

  // SSR + hydration: deterministic output, no branch on any hook
  if (!mounted) {
    const Tag = as;
    return <Tag className={className} style={{ opacity: 0 }}>{children}</Tag>;
  }

  // After hydration: reduced motion → show immediately
  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Animate (use `animate` not `whileInView` — hero is always in viewport)
  const Component = as === "span" ? motion.span : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: motionEasing.reveal }}
    >
      {children}
    </Component>
  );
}

type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  trustChips: readonly string[];
  visualCards: readonly {
    label: string;
    value: string;
    detail: string;
  }[];
};

function HeroVisual({ cards }: { cards: HeroContent["visualCards"] }) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] blur-3xl" />
      <div className="surface-panel noise relative overflow-hidden rounded-[2.5rem] p-5 sm:p-7">
        <div className="absolute inset-0 opacity-60">
          <div
            className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={mounted && !reduceMotion ? { animation: "spin-cw 28s linear infinite" } : undefined}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
            style={mounted && !reduceMotion ? { animation: "spin-ccw 22s linear infinite" } : undefined}
          />
        </div>

        <div className="relative z-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel-soft rounded-[2rem] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                System-Dashboard
              </p>
              <ChartNoAxesCombined className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <ComparisonChart before={32} after={61} />
          </div>

          <div className="space-y-5">
            <div className="surface-panel-soft rounded-[2rem] p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Sichtbarkeitsaufbau
              </p>
              <AnimatedLineChart
                values={[22, 28, 31, 37, 46, 58, 66]}
                labels={["M1", "M2", "M3", "M4", "M5", "M6", "M7"]}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {cards.map((card, index) => (
                <Anim
                  key={card.label}
                  className="surface-panel-soft rounded-[1.6rem] p-4"
                  delay={0.18 + index * 0.1}
                  y={18}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    {card.label}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    {card.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                    {card.detail}
                  </p>
                </Anim>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <SectionShell id="top" className="pb-12 pt-16 sm:pt-20 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.96fr] lg:gap-10">
        <div className="space-y-8">
          {/* ── Eyebrow ── */}
          <Anim delay={0} y={16}>
            <Badge>{content.eyebrow}</Badge>
          </Anim>

          {/* ── Headline (staggered lines) ── */}
          <div className="space-y-5">
            <h1 className="text-balance font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.4rem] lg:leading-[0.98]">
              {content.title.split(". ").map((line, i) => (
                <Anim
                  key={i}
                  as="span"
                  className="heading-gradient inline-block"
                  delay={stagger(i, 0.1, 0.08)}
                  y={20}
                >
                  {line}
                  {i < content.title.split(". ").length - 1 ? ". " : ""}
                </Anim>
              ))}
            </h1>
            <Anim delay={0.22} y={16}>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)] sm:text-xl">
                {content.subtitle}
              </p>
            </Anim>
          </div>

          {/* ── CTAs ── */}
          <Anim delay={0.3} y={16}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookingCta
                label={content.primaryCta}
                variant="primary"
                className="sm:min-w-[15rem]"
              />
              <Button href="/ergebnisse" variant="secondary" className="sm:min-w-[13rem]">
                {content.secondaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Anim>

          {/* ── Trust Chips ── */}
          <div className="grid gap-3 sm:grid-cols-3">
            {content.trustChips.map((chip, index) => (
              <Anim key={chip} delay={stagger(index, 0.06, 0.38)} y={12}>
                <MetricChip
                  label={index === 0 ? "Trust" : index === 1 ? "Erfahrung" : "Ansatz"}
                  value={chip}
                />
              </Anim>
            ))}
          </div>

          {/* ── Feature Cards ── */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Privacy-first",
                body: "Der Buchungsdienst wird erst nach ausdrücklicher Einwilligung geladen.",
              },
              {
                icon: Workflow,
                title: "Systemlogik",
                body: "Präsenz, Conversion, Sichtbarkeit und Prozesse greifen ineinander.",
              },
              {
                icon: ChartNoAxesCombined,
                title: "Messbarkeit",
                body: "Resultate werden über KPIs, Graphen und klare Hebel sichtbar gemacht.",
              },
            ].map((item, index) => (
              <Anim
                key={item.title}
                className="surface-panel-soft rounded-[1.5rem] p-4"
                delay={stagger(index, 0.08, 0.46)}
                y={18}
              >
                <item.icon className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                  {item.body}
                </p>
              </Anim>
            ))}
          </div>
        </div>

        <HeroVisual cards={content.visualCards} />
      </div>
    </SectionShell>
  );
}
