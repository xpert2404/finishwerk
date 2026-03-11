"use client";

import { useEffect, useState } from "react";
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

function HeroVisual({ cards, hydrated }: { cards: HeroContent["visualCards"]; hydrated: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)] blur-3xl" />
      <div className="surface-panel noise relative overflow-hidden rounded-[2.5rem] p-5 sm:p-7">
        <div className="absolute inset-0 opacity-60">
          <div
            className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={reduceMotion ? undefined : { animation: "spin-cw 28s linear infinite" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
            style={reduceMotion ? undefined : { animation: "spin-ccw 22s linear infinite" }}
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
                <motion.div
                  key={card.label}
                  className="surface-panel-soft rounded-[1.6rem] p-4"
                  {...(hydrated && !reduceMotion
                    ? {
                        initial: { opacity: 0, y: 18 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.4 },
                        transition: { delay: 0.18 + index * 0.1, duration: 0.65 },
                      }
                    : !reduceMotion
                      ? { style: { opacity: 0 } }
                      : {})}
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ content }: { content: HeroContent }) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const anim = (delay: number, y = 24) => {
    if (reduceMotion) return {};
    if (!hydrated) return { style: { opacity: 0 } };
    return {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.7, delay, ease: motionEasing.reveal },
    };
  };

  return (
    <SectionShell id="top" className="pb-12 pt-16 sm:pt-20 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.96fr] lg:gap-10">
        <div className="space-y-8">
          {/* ── Eyebrow ── */}
          <motion.div {...anim(0, 16)}>
            <Badge>{content.eyebrow}</Badge>
          </motion.div>

          {/* ── Headline (staggered lines) ── */}
          <div className="space-y-5">
            <h1 className="text-balance font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.4rem] lg:leading-[0.98]">
              {content.title.split(". ").map((line, i) => (
                <motion.span
                  key={i}
                  className="heading-gradient inline-block"
                  {...anim(stagger(i, 0.1, 0.08), 20)}
                >
                  {line}
                  {i < content.title.split(". ").length - 1 ? ". " : ""}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)] sm:text-xl"
              {...anim(0.22, 16)}
            >
              {content.subtitle}
            </motion.p>
          </div>

          {/* ── CTAs ── */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            {...anim(0.3, 16)}
          >
            <BookingCta
              label={content.primaryCta}
              variant="primary"
              className="sm:min-w-[15rem]"
            />
            <Button href="/ergebnisse" variant="secondary" className="sm:min-w-[13rem]">
              {content.secondaryCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* ── Trust Chips ── */}
          <div className="grid gap-3 sm:grid-cols-3">
            {content.trustChips.map((chip, index) => (
              <motion.div key={chip} {...anim(stagger(index, 0.06, 0.38), 12)}>
                <MetricChip
                  label={index === 0 ? "Trust" : index === 1 ? "Erfahrung" : "Ansatz"}
                  value={chip}
                />
              </motion.div>
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
              <motion.div
                key={item.title}
                className="surface-panel-soft rounded-[1.5rem] p-4"
                {...anim(stagger(index, 0.08, 0.46), 18)}
              >
                <item.icon className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <HeroVisual cards={content.visualCards} hydrated={hydrated} />
      </div>
    </SectionShell>
  );
}
