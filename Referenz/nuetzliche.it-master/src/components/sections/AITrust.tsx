import {Container} from "@/components/layout/Container";
import {ProcessExplainerVisual} from "@/components/shared/ProcessExplainerVisual";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import type {BenefitItem, Locale, ScenarioStep, StoryboardNote, StoryboardStep} from "@/data/types";
import {getTranslations} from "next-intl/server";

interface AITrustSectionProps {
  locale: Locale;
}

interface GovernanceCard {
  title: string;
  text: string;
}

export async function AITrustSection({locale}: AITrustSectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const pillars = tHome.raw("aiTrust.pillars") as string[];
  const governance = tHome.raw("aiTrust.governance") as GovernanceCard[];
  const benefits = tHome.raw("aiTrust.benefits") as BenefitItem[];
  const scenarioSteps = tHome.raw("aiTrust.scenario.steps") as ScenarioStep[];
  const pillarNotes: StoryboardNote[] = pillars.map((pillar, index) => ({id: `pillar-${index + 1}`, label: pillar}));
  const storyboardSteps = scenarioSteps as StoryboardStep[];

  return (
    <section className="py-16 sm:py-20" id="ai-control">
      <Container className="space-y-8">
        <SectionHeading
          kicker={tHome("aiTrust.kicker")}
          title={tHome("aiTrust.title")}
          description={tHome("aiTrust.description")}
        />

        <Reveal preset="scale-in">
          <article className="rounded-[32px] border border-slate-200 bg-white px-6 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-slate-600">{tHome("aiTrust.visualCaption")}</p>
                <ol className="space-y-4 border-l border-slate-200 pl-5">
                  {benefits.map((benefit, index) => (
                    <li key={benefit.id} className="relative">
                      <span className="absolute -left-[1.35rem] top-1.5 inline-flex size-2.5 rounded-full bg-[var(--accent-current)]/85" />
                      <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{benefit.title}</h3>
                      <p className="pt-1.5 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
                      {index < benefits.length - 1 ? <div className="pt-4" /> : null}
                    </li>
                  ))}
                </ol>
              </div>

              <ProcessExplainerVisual
                variant="ai-control"
                title={tHome("aiTrust.scenario.title")}
                caption={tHome("aiTrust.visualCaption")}
                steps={storyboardSteps}
                notes={pillarNotes}
                className="border-0 bg-transparent px-0 py-0 shadow-none"
              />
            </div>

            <div className="mt-8 grid gap-6 border-t border-slate-200 pt-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
              <div className="space-y-4">
                {governance.map((item, index) => (
                  <div key={item.title} className={index > 0 ? "border-t border-slate-200 pt-4" : ""}>
                    <p className="text-sm font-semibold text-[var(--ink-primary)]">{item.title}</p>
                    <p className="pt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <aside className="space-y-3 border-t border-slate-200 pt-4 xl:border-t-0 xl:pt-0">
                {pillars.map((pillar, index) => (
                  <p key={pillar} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                    <span className="mt-1.5 inline-flex size-1.5 rounded-full bg-[var(--accent-current)]" />
                    <span>
                      <span className="mr-1 font-semibold text-[var(--ink-primary)]">{String(index + 1).padStart(2, "0")}.</span>
                      {pillar}
                    </span>
                  </p>
                ))}
              </aside>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
