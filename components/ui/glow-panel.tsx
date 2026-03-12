import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowPanelProps = {
  children: ReactNode;
  className?: string;
  soft?: boolean;
};

export function GlowPanel({
  children,
  className,
  soft = false,
}: GlowPanelProps) {
  return (
    <div
      className={cn(
        soft ? "surface-panel-soft" : "surface-panel",
        "rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[0_0_40px_rgba(59,130,246,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
