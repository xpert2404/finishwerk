import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";

interface PageIntroProps {
  kicker?: string;
  title: string;
  titleAccentPart?: string;
  description: string;
}

export function PageIntro({kicker, title, titleAccentPart, description}: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50/70 py-14 sm:py-16">
      <Container>
        <Reveal>
          <div className="max-w-4xl space-y-4">
            {kicker ? <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent-current)]">{kicker}</p> : null}
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
              {title}
              {titleAccentPart ? <span className="text-[var(--accent-current)]"> {titleAccentPart}</span> : null}
            </h1>
            <p className="text-pretty text-base leading-relaxed text-slate-600">{description}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
