"use client";

import {motion, useReducedMotion} from "framer-motion";
import {hoverLift, motionEasing, motionTiming} from "@/lib/motion";

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverLift({children, className}: HoverLiftProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const states = hoverLift(-6, 1.01);

  return (
    <motion.div
      className={className}
      initial={states.rest}
      whileHover={states.hover}
      whileTap={states.rest}
      transition={{duration: motionTiming.fast, ease: motionEasing}}
    >
      {children}
    </motion.div>
  );
}
