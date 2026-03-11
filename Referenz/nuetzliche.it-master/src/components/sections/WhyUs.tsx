import {Container} from "@/components/layout/Container";
import {SectionHeading} from "@/components/shared/SectionHeading";
import {Reveal} from "@/components/shared/Reveal";
import {stagger} from "@/lib/motion";
import type {Locale, ProofItem} from "@/data/types";
import {getTranslations} from "next-intl/server";

interface WhyUsSectionProps {
  locale: Locale;
}

export async function WhyUsSection({locale}: WhyUsSectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const items = tHome.raw("quality.items") as ProofItem[];

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeading
          kicker={tHome("quality.kicker")}
          title={tHome("quality.title")}
          description={tHome("quality.description")}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={stagger(index, 0.05)} preset="scale-in">
              <article className="h-full border-t border-slate-200 pt-4">
                <p className="text-xs font-semibold tracking-[0.15em] text-[var(--accent-current)] uppercase">{item.label}</p>
                <p className="pt-3 text-2xl font-semibold text-[var(--ink-primary)]">{item.value}</p>
                <p className="pt-4 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
