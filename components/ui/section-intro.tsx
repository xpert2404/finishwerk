import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  body,
  className,
}: SectionIntroProps) {
  return (
    <Reveal preset="soft-parallax" distance={18}>
      <div className={cn("max-w-3xl space-y-4", className)}>
        <Badge>{eyebrow}</Badge>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {body ? (
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)]">
            {body}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
