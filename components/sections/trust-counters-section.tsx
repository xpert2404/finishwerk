"use client";

import { CounterMetric } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { siteConfig } from "@/content/site";

export function TrustCountersSection() {
  return (
    <SectionShell className="py-12 sm:py-16 lg:py-20">
      <Reveal preset="fade-up">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {siteConfig.trustNumbers.map((item, index) => (
            <div
              key={item.label}
              className={`text-center ${
                index < siteConfig.trustNumbers.length - 1
                  ? "lg:border-r lg:border-white/[0.06]"
                  : ""
              }`}
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <CounterMetric
                  value={item.value}
                  suffix={item.suffix}
                  duration={1200 + index * 200}
                />
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted-strong)] sm:mt-3">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
