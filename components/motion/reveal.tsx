"use client";

import { useEffect, useState } from "react";
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
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const dist = distance ?? y ?? 20;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  // Before hydration: render plain tag with matching hidden state (no Framer Motion inline styles)
  if (!hydrated) {
    const Tag = as;
    return <Tag className={cn(className)} style={{ opacity: 0 }}>{children}</Tag>;
  }

  const variants = getPresetVariants(preset, dist);
  const duration = getPresetDuration(preset);
  const Component = motion.create(as);

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: motionEasing.reveal }}
    >
      {children}
    </Component>
  );
}
