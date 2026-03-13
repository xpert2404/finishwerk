"use client";

import { type ReactNode, useEffect, useState } from "react";
import {
  ArrowRight,
  ChartNoAxesCombined,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BookingButton } from "@/components/booking/booking-button";
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
  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + hydration: deterministic output, no branch on any hook
  if (!mounted) {
    const Tag = as;
    return (
      <Tag className={className} style={{ opacity: 0 }}>
        {children}
      </Tag>
    );
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
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] blur-3xl sm:rounded-[2.5rem]" />
      <div className="surface-panel noise relative overflow-hidden rounded-[1.5rem] p-3 sm:rounded-[2.5rem] sm:p-7">
        <div className="absolute inset-0 opacity-60">
          <div
            className="absolute left-1/2 top-1/2 h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[22rem] sm:w-[22rem]"
            style={
              mounted && !reduceMotion
                ? { animation: "spin-cw 28s linear infinite" }
                : undefined
            }
          />
          <div
            className="absolute left-1/2 top-1/2 h-[8rem] w-[8rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 sm:h-[16rem] sm:w-[16rem]"
            style={
              mounted && !reduceMotion
                ? { animation: "spin-ccw 22s linear infinite" }
                : undefined
            }
          />
        </div>

        <div className="relative z-10 grid gap-4 sm:gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel-soft self-start rounded-[1.5rem] p-3.5 sm:rounded-[2rem] sm:p-5">
            <div className="mb-2.5 flex items-center justify-between sm:mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-xs">
                System-Dashboard
              </p>
              <ChartNoAxesCombined className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <ComparisonChart before={32} after={61} />
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 sm:mt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-[var(--muted-strong)] sm:text-xs">+29 % Steigerung nach Optimierung</span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="surface-panel-soft rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:mb-4 sm:text-xs">
                Sichtbarkeitsaufbau
              </p>
              <AnimatedLineChart
                values={[22, 28, 31, 37, 46, 58, 66]}
                labels={["M1", "M2", "M3", "M4", "M5", "M6", "M7"]}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {cards.map((card, index) => (
                <Anim
                  key={card.label}
                  className="surface-panel-soft rounded-[1.25rem] p-3.5 sm:rounded-[1.6rem] sm:p-4"
                  delay={0.18 + index * 0.1}
                  y={18}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-xs">
                    {card.label}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-white sm:mt-3 sm:text-2xl">
                    {card.value}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-5 text-[var(--muted-strong)] sm:mt-2 sm:text-sm sm:leading-6">
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
    <SectionShell id="top" className="pb-10 pt-10 sm:pb-12 sm:pt-20 lg:pt-24">
      <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1fr_0.96fr] lg:gap-10">
        <div className="space-y-6 sm:space-y-8">
          {/* ── Eyebrow ── */}
          <Anim delay={0} y={16}>
            <Badge>{content.eyebrow}</Badge>
          </Anim>

          {/* ── Headline (staggered lines) ── */}
          <div className="space-y-4 sm:space-y-5">
            <h1 className="text-balance font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5.4rem] lg:leading-[0.98]">
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
              <p className="max-w-2xl text-base leading-7 text-[var(--muted-strong)] sm:text-lg sm:leading-8">
                {content.subtitle}
              </p>
            </Anim>
          </div>

          {/* ── CTAs ── */}
          <Anim delay={0.3} y={16}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookingButton
                label={content.primaryCta}
                variant="primary"
                className="w-full sm:w-auto sm:min-w-[15rem]"
              />
              <Button
                href="/ergebnisse"
                variant="secondary"
                className="w-full sm:w-auto sm:min-w-[13rem]"
              >
                {content.secondaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Anim>

          {/* ── Trust Chips ── */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {content.trustChips.map((chip, index) => (
              <Anim key={chip} delay={stagger(index, 0.06, 0.38)} y={12}>
                <MetricChip
                  label={
                    index === 0 ? "Trust" : index === 1 ? "Erfahrung" : "Ansatz"
                  }
                  value={chip}
                />
              </Anim>
            ))}
          </div>

          {/* ── Feature Cards ── */}
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
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
