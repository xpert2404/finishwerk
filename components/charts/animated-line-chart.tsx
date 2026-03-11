"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedLineChartProps = {
  values: readonly number[];
  labels?: readonly string[];
};

function createPath(values: readonly number[], width: number, height: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function AnimatedLineChart({
  values,
  labels,
}: AnimatedLineChartProps) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const path = createPath(values, 320, 140);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return (
    <div className="space-y-4" aria-hidden="true">
      <svg
        viewBox="0 0 320 150"
        className="h-auto w-full overflow-visible"
        fill="none"
      >
        <defs>
          <linearGradient id="finishwerk-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-strong)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <path
          d={path}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <motion.path
          d={path}
          stroke="url(#finishwerk-line)"
          strokeWidth="4"
          strokeLinecap="round"
          {...(hydrated && !reduceMotion
            ? {
                initial: { pathLength: 0 },
                whileInView: { pathLength: 1 },
                viewport: { once: true, amount: 0.3 },
                transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              }
            : { style: { pathLength: reduceMotion ? 1 : 0 } as React.CSSProperties })}
        />
        {values.map((value, index) => {
          const x = (index / Math.max(values.length - 1, 1)) * 320;
          const y = 140 - ((value - min) / range) * 140;

          return (
            <motion.circle
              key={`${value}-${index}`}
              cx={x}
              cy={y}
              r="5"
              fill="var(--accent)"
              {...(hydrated && !reduceMotion
                ? {
                    initial: { scale: 0 },
                    whileInView: { scale: 1 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { delay: 0.2 + index * 0.08, duration: 0.35 },
                  }
                : { style: { transform: reduceMotion ? undefined : "scale(0)" } })}
            />
          );
        })}
      </svg>

      {labels ? (
        <div className="grid grid-cols-7 gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
