import {ArrowRight} from "lucide-react";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import {getCaseStudies} from "@/data/caseStudies";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";

interface CaseStudySectionProps {
  locale: Locale;
}

export async function CaseStudySection({locale}: CaseStudySectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const studies = getCaseStudies(locale).filter((s) => s.status === "published").slice(0, 3);

  if (studies.length === 0) return null;

  const labels = {
    problem: tHome("case.labels.problem"),
    solution: tHome("case.labels.solution"),
    result: tHome("case.labels.result")
  };

  return (
    <section className="py-16 sm:py-20" id="cases">
      <Container className="space-y-10">
        <SectionHeading kicker={tHome("case.kicker")} title={tHome("case.title")} />

        <div className="space-y-6">
          {studies.map((study, index) => {
            const isDark = index % 2 === 1;
            return (
              <Reveal key={study.id} delay={index * 0.06} preset="fade-up" distance={18}>
                <article
                  className={`overflow-hidden rounded-[var(--radius-card-lg)] border p-6 sm:p-8 ${
                    isDark
                      ? "border-white/10 bg-[var(--surface-dark)] text-white shadow-[var(--shadow-dark)]"
                      : "border-slate-200/80 bg-white shadow-[var(--shadow-card)]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 pb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase ${
                          isDark ? "bg-white/10 text-[var(--accent-a)]" : "bg-[var(--accent-current)]/10 text-[var(--accent-current)]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    className={`text-xl font-semibold tracking-tight sm:text-2xl ${
                      isDark ? "text-white" : "text-[var(--ink-primary)]"
                    }`}
                  >
                    {study.title}
                  </h3>

                  <div className="mt-6 grid gap-5 lg:grid-cols-3">
                    <div className={`space-y-2 rounded-[20px] border p-5 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                        {labels.problem}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-slate-600"}`}>{study.problem}</p>
                    </div>
                    <div className={`space-y-2 rounded-[20px] border p-5 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                        {labels.solution}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-slate-600"}`}>{study.solution}</p>
                    </div>
                    <div className={`space-y-2 rounded-[20px] border p-5 ${isDark ? "border-[var(--accent-a)]/20 bg-[var(--accent-a)]/10" : "border-[var(--accent-current)]/18 bg-[var(--accent-current)]/6"}`}>
                      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                        {labels.result}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/90" : "text-slate-700"}`}>{study.result}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-primary)] transition-colors hover:text-[var(--accent-current)]"
          >
            {locale === "de" ? "Alle Projekte ansehen" : "View all projects"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
