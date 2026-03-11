import {ArrowRight, Clock3, Sparkles} from "lucide-react";
import type {BeforeAfterStep} from "@/data/types";
import {cn} from "@/lib/utils";

interface BeforeAfterRailProps {
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  stepLabel?: string;
  steps: BeforeAfterStep[];
  note?: string;
  className?: string;
  surface?: "card" | "flat";
}

export function BeforeAfterRail({
  title,
  description,
  beforeLabel,
  afterLabel,
  stepLabel = "Step",
  steps,
  note,
  className,
  surface = "card"
}: BeforeAfterRailProps) {
  return (
    <section
      className={cn(
        surface === "card" && "rounded-[30px] border border-[var(--border-subtle)] bg-white p-6 sm:p-7",
        surface === "flat" && "space-y-5",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{title}</p>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--ink-muted)]">{description}</p>
      </header>

      <div
        className={cn(
          "hidden items-center gap-4 pb-3 text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase md:grid md:grid-cols-[1.1fr_1fr_auto_1fr]",
          surface === "card" ? "mt-6 border-b border-[var(--border-subtle)]" : "border-b border-[var(--border-subtle)]"
        )}
      >
        <span className="flex items-center gap-2">
          <Clock3 className="size-3.5 text-[var(--ink-muted)]" />
          {stepLabel}
        </span>
        <span className="flex items-center gap-2">
          <Clock3 className="size-3.5 text-[var(--ink-muted)]" />
          {beforeLabel}
        </span>
        <span />
        <span className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-[var(--accent-current)]" />
          {afterLabel}
        </span>
      </div>

      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.id}
            data-before-after-step
            className="rounded-3xl border border-[var(--border-subtle)] bg-white/90 px-4 py-4 shadow-sm shadow-[var(--border-subtle)]/50 md:grid md:grid-cols-[1.1fr_1fr_auto_1fr] md:items-start md:gap-4 md:px-5"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-alt)] text-xs font-semibold text-[var(--accent-current)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{step.title}</h3>
                  {step.impact ? (
                    <span className="inline-flex rounded-full bg-[var(--accent-current)]/8 px-2.5 py-1 text-[11px] font-medium text-[var(--accent-current)]">
                      {step.impact}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)]/70 px-3 py-3 md:mt-0">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase md:hidden">{beforeLabel}</p>
              <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{step.before}</p>
            </div>

            <div className="hidden md:flex md:pt-5">
              <ArrowRight className="size-4 text-[var(--ink-muted)]" />
            </div>

            <div className="mt-3 rounded-2xl border border-[var(--accent-current)]/20 bg-[var(--accent-current)]/6 px-3 py-3 md:mt-0">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent-current)] uppercase md:hidden">{afterLabel}</p>
              <p className="text-sm leading-relaxed text-[var(--ink-primary)]">{step.after}</p>
            </div>
          </li>
        ))}
      </ol>

      {note ? <p className="mt-4 border-t border-[var(--border-subtle)] pt-4 text-xs leading-relaxed text-[var(--ink-muted)]">{note}</p> : null}
    </section>
  );
}
