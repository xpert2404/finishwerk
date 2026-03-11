import {FileText, ListFilter, SearchCheck, ShieldCheck, UserCheck} from "lucide-react";
import type {ScenarioStep} from "@/data/types";

interface ScenarioFlowProps {
  title: string;
  steps: ScenarioStep[];
}

const icons = [FileText, SearchCheck, ListFilter, UserCheck, ShieldCheck];

export function ScenarioFlow({title, steps}: ScenarioFlowProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-[var(--accent-current)]">{title}</h3>
      <ol className="relative space-y-4 border-l border-slate-200 pl-5">
        {steps.map((step, index) => {
          const Icon = icons[index] || ShieldCheck;
          return (
            <li key={step.id} className="relative pb-4 last:pb-0">
              <span className="absolute -left-[2.05rem] top-0.5 inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[var(--accent-current)] shadow-sm">
                <Icon className="size-4" />
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">{index + 1}</span>
                  <h4 className="text-sm font-semibold text-[var(--ink-primary)]">{step.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
