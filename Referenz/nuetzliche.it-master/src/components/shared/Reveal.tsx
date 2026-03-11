"use client";

import {motion, useReducedMotion} from "framer-motion";
import type {MotionPreset} from "@/data/types";
import {cn} from "@/lib/utils";
import {fadeUp, motionEasing, motionTiming, scaleIn, softParallax} from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  preset?: MotionPreset;
  amount?: number;
}

function getRevealVariants(preset: MotionPreset, distance: number) {
  if (preset === "scale-in") {
    return scaleIn();
  }

  if (preset === "soft-parallax") {
    return softParallax(Math.max(10, distance));
  }

  return fadeUp(distance);
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  preset = "fade-up",
  amount = 0.2
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const variants = getRevealVariants(preset, distance);
  const duration = preset === "soft-parallax" ? motionTiming.section : motionTiming.normal;

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial={false}
      whileInView="visible"
      viewport={{once: true, amount}}
      transition={{duration, delay, ease: motionEasing}}
    >
      {children}
    </motion.div>
  );
}
