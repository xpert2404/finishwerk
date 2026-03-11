import {
  Boxes,
  Cable,
  CheckCircle2,
  ClipboardList,
  FileInput,
  FolderGit2,
  Reply,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
  Workflow
} from "lucide-react";
import type {StoryboardNote, StoryboardStep, StoryboardVariant} from "@/data/types";
import {cn} from "@/lib/utils";

interface ProcessExplainerVisualProps {
  variant: StoryboardVariant;
  title: string;
  caption: string;
  steps: StoryboardStep[];
  notes?: StoryboardNote[];
  footerLabel?: string;
  className?: string;
}

const iconMap = {
  architecture: [ClipboardList, Boxes, Cable, ShieldCheck],
  "ai-control": [FileInput, ScanSearch, FolderGit2, UserRoundCheck, CheckCircle2],
  workflow: [FileInput, Workflow, FolderGit2, Reply]
} as const;

function ProcessLane({
  variant,
  steps
}: {
  variant: StoryboardVariant;
  steps: StoryboardStep[];
}) {
  const icons = iconMap[variant];
  const hasFiveSteps = steps.length > 4;

  return (
    <div className="relative rounded-2xl border border-slate-200/90 bg-white px-4 py-5 sm:px-5 sm:py-6">
      <div
        className="pointer-events-none absolute left-10 right-10 top-9 hidden h-px bg-gradient-to-r from-[var(--accent-current)]/40 via-slate-200 to-slate-200 lg:block"
        aria-hidden="true"
      />

      <ol className={cn("relative grid gap-5", hasFiveSteps ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-4")}>
        {steps.map((step, index) => {
          const Icon = icons[index] || CheckCircle2;
          return (
            <li key={step.id} className="space-y-2.5">
              <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[var(--accent-current)] shadow-sm">
                <Icon className="size-4" />
              </span>
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Notes({notes}: {notes: StoryboardNote[]}) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div key={note.id} className="border-t border-slate-200 pt-3">
          <p className="text-[11px] font-semibold tracking-[0.15em] text-slate-500 uppercase">{note.label}</p>
          {note.text ? <p className="pt-2 text-sm leading-relaxed text-slate-600">{note.text}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function ProcessExplainerVisual({
  variant,
  title,
  caption,
  steps,
  notes = [],
  footerLabel,
  className
}: ProcessExplainerVisualProps) {
  return (
    <section
      className={cn(
        "space-y-5 rounded-3xl border border-slate-200 bg-slate-50/65 px-5 py-6 sm:px-6 sm:py-7",
        className
      )}
    >
      <header className="space-y-2">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{title}</p>
        <p className="text-sm leading-relaxed text-slate-600">{caption}</p>
      </header>

      <ProcessLane variant={variant} steps={steps} />
      <Notes notes={notes} />

      {footerLabel ? (
        <p className="border-t border-slate-200 pt-3 text-sm leading-relaxed text-slate-600">{footerLabel}</p>
      ) : null}
    </section>
  );
}
