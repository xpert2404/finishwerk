"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type ComparisonChartProps = {
  before: number;
  after: number;
  beforeLabel?: string;
  afterLabel?: string;
};

export function ComparisonChart({
  before,
  after,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
}: ComparisonChartProps) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  return (
    <div className="grid grid-cols-2 gap-5" aria-hidden="true">
      {[
        { label: beforeLabel, value: before, muted: true },
        { label: afterLabel, value: after, muted: false },
      ].map((item, index) => (
        <div key={item.label} className="space-y-3">
          <div className="flex h-40 items-end rounded-[1.4rem] bg-white/[0.03] p-3">
            <motion.div
              className={`w-full rounded-[1rem] ${
                item.muted
                  ? "bg-white/10"
                  : "bg-[linear-gradient(180deg,var(--accent),rgba(255,255,255,0.12))]"
              }`}
              {...(hydrated && !reduceMotion
                ? {
                    initial: { height: "0%" },
                    whileInView: { height: `${item.value}%` },
                    viewport: { once: true, amount: 0.3 },
                    transition: { delay: index * 0.14, duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                  }
                : { style: { height: reduceMotion ? `${item.value}%` : "0%" } })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted-strong)]">{item.label}</span>
            <span className="font-display text-lg font-semibold text-white">
              {item.value} %
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
