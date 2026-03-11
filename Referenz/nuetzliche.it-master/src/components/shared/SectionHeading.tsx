import {cn} from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({kicker, title, description, align = "left", className}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <header className={cn("space-y-3", isCenter && "text-center", className)}>
      {kicker ? <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{kicker}</p> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-3xl text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base">{description}</p> : null}
    </header>
  );
}
