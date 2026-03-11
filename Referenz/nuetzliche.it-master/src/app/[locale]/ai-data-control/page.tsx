import {getTranslations} from "next-intl/server";
import {PageIntro} from "@/components/sections/PageIntro";
import {Container} from "@/components/layout/Container";
import {BeforeAfterRail} from "@/components/shared/BeforeAfterRail";
import {Reveal} from "@/components/shared/Reveal";
import {buildMetadata} from "@/lib/metadata";
import {FinalCTASection} from "@/components/sections/FinalCTA";
import type {BenefitItem, BeforeAfterStep, Locale} from "@/data/types";

interface AIPageProps {
  params: Promise<{locale: Locale}>;
}

interface GovernanceItem {
  title: string;
  text: string;
}

interface TimelineItem {
  date: string;
  text: string;
}

interface QualityAssurance {
  title: string;
  note: string;
  items: string[];
}

export async function generateMetadata({params}: AIPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.ai"});
  return buildMetadata({locale, route: "ai-data-control", title: t("title"), description: t("description")});
}

export default async function AIDataControlPage({params}: AIPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "aiPage"});

  const useCases = t.raw("useCases") as string[];
  const benefits = t.raw("benefits") as BenefitItem[];
  const governance = t.raw("governance") as GovernanceItem[];
  const timeline = t.raw("timeline") as TimelineItem[];
  const qualityAssurance = t.raw("qualityAssurance") as QualityAssurance;
  const nonLocalAiRisks = t.raw("nonLocalAiRisks") as string[];
  const protectedSectors = t.raw("protectedSectors") as string[];
  const beforeAfterSteps = t.raw("beforeAfter.steps") as BeforeAfterStep[];

  return (
    <>
      <PageIntro kicker={t("kicker")} title={t("title")} description={t("description")} />

      {/* ROI Benefits — the hook */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal preset="fade-up">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-6">
                  <p className="text-base font-semibold text-[var(--ink-primary)]">{benefit.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Before vs. After — full width */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-alt)] py-16 sm:py-20">
        <Container>
          <Reveal preset="soft-parallax">
            <BeforeAfterRail
              title={t("beforeAfter.kicker")}
              description={t("beforeAfter.description")}
              stepLabel={locale === "de" ? "Prozessschritt" : "Step"}
              beforeLabel={t("beforeAfter.beforeLabel")}
              afterLabel={t("beforeAfter.afterLabel")}
              steps={beforeAfterSteps}
              note={t("beforeAfter.note")}
              surface="flat"
            />
          </Reveal>
        </Container>
      </section>

      {/* Use cases + Governance */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-14">
          <Reveal preset="fade-up">
            <div className="grid gap-10 xl:grid-cols-[0.45fr_0.55fr] xl:items-start">
              <div className="space-y-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{t("useCasesTitle")}</p>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-3 border-b border-[var(--border-subtle)] pb-3 last:border-b-0 last:pb-0">
                      <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent-current)]" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{t("governanceTitle")}</p>
                <div className="grid gap-5 sm:grid-cols-3">
                  {governance.map((item) => (
                    <div key={item.title} className="space-y-2 border-t border-[var(--border-subtle)] pt-4">
                      <p className="text-sm font-semibold text-[var(--ink-primary)]">{item.title}</p>
                      <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} preset="fade-up">
            <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
              <aside className="rounded-[30px] border border-[var(--border-subtle)] bg-white px-6 py-6 sm:px-7">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{qualityAssurance.title}</p>
                <p className="pt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{qualityAssurance.note}</p>
                <ol className="mt-5 space-y-3">
                  {qualityAssurance.items.map((item, index) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                      <span className="inline-flex min-w-6 justify-center text-[var(--accent-current)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </aside>

              <div className="space-y-4 rounded-[32px] border border-[var(--border-subtle)] bg-white px-6 py-6 sm:px-7">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{t("riskTitle")}</p>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {nonLocalAiRisks.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 inline-flex size-1.5 shrink-0 rounded-full bg-[var(--accent-current)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-[var(--ink-muted)]">{t("riskNote")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} preset="fade-up">
            <div className="grid gap-10 xl:grid-cols-[1fr_1fr] xl:items-start">
              <div className="space-y-4 border-t border-[var(--border-subtle)] pt-5">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{t("sectorTitle")}</p>
                <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{protectedSectors.join(", ")}.</p>
                <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{t("sectorNote")}</p>
              </div>

              <section className="space-y-4 border-t border-[var(--border-subtle)] pt-5">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{t("complianceTitle")}</p>
                <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{t("complianceNote")}</p>
                <ol className="divide-y divide-[var(--border-subtle)] rounded-[30px] border border-[var(--border-subtle)] bg-[var(--surface-alt)] px-6 py-2">
                  {timeline.map((item) => (
                    <li key={item.date} className="grid gap-2 py-4 first:pt-4 last:pb-4">
                      <span className="text-sm font-semibold text-[var(--ink-primary)]">{item.date}</span>
                      <span className="text-sm leading-relaxed text-[var(--ink-muted)]">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
