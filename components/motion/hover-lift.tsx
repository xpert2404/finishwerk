"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { hoverLift, motionEasing, motionTiming } from "@/lib/motion";

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
};

export function HoverLift({
  children,
  className,
  y = -6,
  scale = 1.01,
}: HoverLiftProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const states = hoverLift(y, scale);

  return (
    <motion.div
      className={className}
      initial={states.rest}
      whileHover={states.hover}
      whileTap={states.rest}
      transition={{ duration: motionTiming.fast, ease: motionEasing.hover }}
    >
      {children}
    </motion.div>
  );
}
