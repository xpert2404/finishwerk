"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionShell } from "@/components/layout/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type CaseStep = {
  title: string;
  body: string;
};

type CaseStat = {
  label: string;
  value: string;
};

type CaseContent = {
  eyebrow: string;
  title: string;
  summary: string;
  steps: readonly CaseStep[];
  stats: readonly CaseStat[];
};

export function CaseMechanicsSection({ content }: { content: CaseContent }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top+=96",
            end: "+=720",
            scrub: 1,
            pin: ".case-story-panel",
          },
        });

        timeline
          .fromTo(
            ".case-step",
            { opacity: 0.38, y: 42 },
            { opacity: 1, y: 0, stagger: 0.22, duration: 0.9 },
          )
          .fromTo(
            ".case-platform-bar",
            { height: "72%" },
            { height: "28%", duration: 1.1 },
            0.1,
          )
          .fromTo(
            ".case-direct-bar",
            { height: "32%" },
            { height: "68%", duration: 1.1 },
            0.1,
          );
      });
    }, rootRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <SectionShell id="case">
      <div ref={rootRef} className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div className="case-story-panel lg:self-start">
          <SectionIntro
            eyebrow={content.eyebrow}
            title={content.title}
            body={content.summary}
          />

          <GlowPanel className="mt-8 overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  Marge & Kanal
                </p>
                <h3 className="font-display text-3xl font-semibold text-white">
                  Vorher vs. direkter Kanal
                </h3>
                <p className="text-sm leading-7 text-[var(--muted-strong)]">
                  Der Hebel liegt nicht nur in schöner Darstellung, sondern in
                  der Verschiebung vom provisionslastigen Fremdkanal zur eigenen
                  Bestell- und Angebotslogik.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] bg-white/[0.03] p-4">
                  <div className="flex h-48 items-end rounded-[1.2rem] bg-white/[0.03] p-3">
                    <div className="case-platform-bar h-[72%] w-full rounded-[1rem] bg-white/10" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-[var(--muted-strong)]">
                      Plattform
                    </span>
                    <span className="font-display text-lg text-white">72 %</span>
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-white/[0.03] p-4">
                  <div className="flex h-48 items-end rounded-[1.2rem] bg-white/[0.03] p-3">
                    <div className="case-direct-bar h-[32%] w-full rounded-[1rem] bg-[linear-gradient(180deg,var(--accent),rgba(255,255,255,0.12))]" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-[var(--muted-strong)]">Direkt</span>
                    <span className="font-display text-lg text-white">32 %</span>
                  </div>
                </div>
              </div>
            </div>
          </GlowPanel>
        </div>

        <div className="space-y-5">
          {content.steps.map((step, index) => (
            <div key={step.title} className="case-step">
              <GlowPanel className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  Schritt {index + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {step.body}
                </p>
              </GlowPanel>
            </div>
          ))}

          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.stats.map((stat) => (
                <GlowPanel key={stat.label} soft>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    {stat.label}
                  </p>
                  <p className="mt-4 font-display text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                </GlowPanel>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
