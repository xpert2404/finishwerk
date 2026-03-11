import type { ReactNode } from "react";
import { GlowPanel } from "@/components/ui/glow-panel";

type StatCardProps = {
  value: ReactNode;
  label: string;
  context?: string;
};

export function StatCard({ value, label, context }: StatCardProps) {
  return (
    <GlowPanel className="h-full">
      <div className="space-y-3">
        <div className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {value}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            {label}
          </p>
          {context ? (
            <p className="text-sm leading-6 text-[var(--muted-strong)]">{context}</p>
          ) : null}
        </div>
      </div>
    </GlowPanel>
  );
}
