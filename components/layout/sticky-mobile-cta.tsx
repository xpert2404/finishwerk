"use client";

import { useEffect, useState } from "react";
import { BookingButton } from "@/components/booking/booking-button";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~600px)
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[var(--canvas)]/95 px-4 py-3 backdrop-blur-lg sm:hidden">
      <BookingButton
        label="Erstgespräch buchen"
        variant="primary"
        className="w-full"
      />
      <p className="mt-1 text-center text-[10px] text-[var(--muted)]">
        15 Min · kostenlos · keine Vorbereitung nötig
      </p>
    </div>
  );
}
