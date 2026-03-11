import {cn} from "@/lib/utils";

interface DotPatternProps {
  className?: string;
}

export function DotPattern({className}: DotPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 opacity-40",
        "[background-image:radial-gradient(circle_at_1px_1px,var(--accent-current)_1px,transparent_0)]",
        "[background-size:20px_20px]",
        className
      )}
    />
  );
}
