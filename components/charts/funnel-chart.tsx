"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type FunnelStep = {
  label: string;
  value: number;
};

type FunnelChartProps = {
  steps: readonly FunnelStep[];
};

export function FunnelChart({ steps }: FunnelChartProps) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  return (
    <div className="space-y-3" aria-hidden="true">
      {steps.map((step, index) => (
        <div key={step.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted-strong)]">{step.label}</span>
            <span className="font-semibold text-white">{step.value}</span>
          </div>
          <div className="h-3 rounded-full bg-white/[0.04]">
            {!hydrated ? (
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]"
                style={{ width: 0 }}
              />
            ) : reduceMotion ? (
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]"
                style={{ width: `${step.value}%` }}
              />
            ) : (
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]"
                initial={{ width: 0 }}
                whileInView={{ width: `${step.value}%` }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
