"use client";

import {useEffect} from "react";
import {trackPageSection} from "@/lib/analytics";

interface SectionTrackerProps {
  sectionId: string;
  once?: boolean;
  threshold?: number;
}

export function SectionTracker({sectionId, once = true, threshold = 0.45}: SectionTrackerProps) {
  useEffect(() => {
    const element = document.getElementById(sectionId);

    if (!element || typeof window === "undefined") {
      return;
    }

    let seen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (seen && once) {
            continue;
          }

          seen = true;
          trackPageSection({sectionId});

          if (once) {
            observer.disconnect();
            return;
          }
        }
      },
      {threshold}
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, sectionId, threshold]);

  return null;
}