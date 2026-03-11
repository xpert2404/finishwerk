"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({
  content,
}: {
  content: readonly FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SectionShell id="faq">
      <SectionIntro
        eyebrow="FAQ"
        title="Einwände früh klären, bevor Projekte unnötig komplex werden."
        body="Die wichtigsten Fragen zu Branchenfokus, Ergebnissystem, Projektrahmen und Datenschutz werden direkt beantwortet."
      />

      <div className="mt-12 space-y-4">
        {content.map((item, index) => {
          const open = openIndex === index;

          return (
            <div
              key={item.question}
              className="surface-panel overflow-hidden rounded-[1.75rem]"
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
              >
                <span className="font-display text-xl font-semibold text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[var(--accent)] transition-transform duration-300",
                    open && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6 sm:px-7">
                      <p className="max-w-4xl text-base leading-8 text-[var(--muted-strong)]">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
