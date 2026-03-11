import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  className,
  innerClassName,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28 lg:py-32", className)}>
      <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
