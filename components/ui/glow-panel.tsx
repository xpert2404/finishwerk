import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowPanelProps = {
  children: ReactNode;
  className?: string;
  soft?: boolean;
};

export function GlowPanel({ children, className, soft = false }: GlowPanelProps) {
  return (
    <div
      className={cn(
        soft ? "surface-panel-soft" : "surface-panel",
        "rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
