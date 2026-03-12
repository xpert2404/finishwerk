import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PageHero({ eyebrow, title, body }: PageHeroProps) {
  return (
    <SectionShell className="pt-28 pb-10 sm:pt-40 sm:pb-16 lg:pt-48 lg:pb-20">
      <Reveal preset="fade-up">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[2rem] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance heading-gradient">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-[var(--muted-strong)] sm:text-lg lg:text-xl">
            {body}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
