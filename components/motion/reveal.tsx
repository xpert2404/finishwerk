"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  type MotionPreset,
  getPresetDuration,
  getPresetVariants,
  motionEasing,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Translation distance in px (default 20) */
  distance?: number;
  /** @deprecated Use `distance` instead */
  y?: number;
  preset?: MotionPreset;
  /** Viewport intersection threshold 0-1 */
  amount?: number;
  as?: "div" | "section" | "li" | "span";
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance,
  y,
  preset = "fade-up",
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const dist = distance ?? y ?? 20;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const variants = getPresetVariants(preset, dist);
  const duration = getPresetDuration(preset);
  const Component = motion.create(as);

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: motionEasing.reveal }}
    >
      {children}
    </Component>
  );
}
