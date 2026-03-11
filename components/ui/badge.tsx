import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
