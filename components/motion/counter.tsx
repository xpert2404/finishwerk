"use client";

import { useEffect, useRef, useState } from "react";

type CounterMetricProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function CounterMetric({
  value,
  suffix = "",
  duration = 1400,
}: CounterMetricProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        setHasAnimated(true);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, hasAnimated, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
