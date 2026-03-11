import {Container} from "@/components/layout/Container";
import {ProcessExplainerVisual} from "@/components/shared/ProcessExplainerVisual";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import type {Locale, StoryboardStep, UseCaseItem} from "@/data/types";
import {getTranslations} from "next-intl/server";

interface WorkflowAutomationSectionProps {
  locale: Locale;
}

export async function WorkflowAutomationSection({locale}: WorkflowAutomationSectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const cases = (tHome.raw("useCases.items") as UseCaseItem[]).slice(0, 4);
  const workflowSteps = tHome.raw("useCases.visual.steps") as StoryboardStep[];

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          kicker={tHome("useCases.kicker")}
          title={tHome("useCases.title")}
          description={tHome("useCases.description")}
        />

        <article className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
          <Reveal preset="scale-in">
            <ProcessExplainerVisual
              variant="workflow"
              title={tHome("useCases.visual.title")}
              caption={tHome("useCases.visual.caption")}
              steps={workflowSteps}
              footerLabel={tHome("useCases.visual.footerLabel")}
              className="rounded-[32px] border border-slate-200 bg-white px-6 py-6 shadow-[0_22px_60px_-42px_rgba(15,61,94,0.18)] sm:px-7 sm:py-7"
            />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.04} preset="fade-up">
              <div className="grid gap-4 sm:grid-cols-2">
                {cases.map((item) => (
                  <article key={item.id} className="border-t border-slate-200 pt-4">
                    <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{item.title}</h3>
                    <p className="pt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                    <p className="pt-3 text-sm leading-relaxed text-slate-500">{item.outcome}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} preset="soft-parallax">
              <div className="border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600">
                Priorisierte Übergaben, transparente Statusrückmeldungen und weniger Medienbrüche sorgen dafür, dass Automatisierung im Alltag wirklich trägt.
              </div>
            </Reveal>
          </div>
        </article>
      </Container>
    </section>
  );
}
