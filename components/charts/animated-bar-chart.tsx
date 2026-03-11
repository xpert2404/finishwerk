"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedBarChartProps = {
  values: readonly number[];
  compact?: boolean;
};

export function AnimatedBarChart({
  values,
  compact = false,
}: AnimatedBarChartProps) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const max = Math.max(...values);

  return (
    <div
      className={`flex items-end gap-2 ${compact ? "h-20" : "h-36"} w-full`}
      aria-hidden="true"
    >
      {values.map((value, index) => {
        const height = `${(value / max) * 100}%`;

        return (
          <div
            key={`${value}-${index}`}
            className="flex h-full flex-1 items-end rounded-full bg-white/[0.03] p-1"
          >
            <motion.div
              className="w-full rounded-full bg-[linear-gradient(180deg,var(--accent),rgba(255,255,255,0.15))]"
              {...(hydrated && !reduceMotion
                ? {
                    initial: { height: "0%" },
                    whileInView: { height },
                    viewport: { once: true, amount: 0.3 },
                    transition: { delay: index * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  }
                : { style: { height: reduceMotion ? height : "0%" } })}
            />
          </div>
        );
      })}
    </div>
  );
}
