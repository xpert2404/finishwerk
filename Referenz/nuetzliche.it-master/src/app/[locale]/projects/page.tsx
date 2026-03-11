import {Badge} from "@/components/ui/badge";
import {Container} from "@/components/layout/Container";
import {PageIntro} from "@/components/sections/PageIntro";
import {Reveal} from "@/components/shared/Reveal";
import {getCaseStudies} from "@/data/caseStudies";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {getTranslations} from "next-intl/server";
import {FinalCTASection} from "@/components/sections/FinalCTA";

interface ProjectsPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ProjectsPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.projects"});
  return buildMetadata({locale, route: "projects", title: t("title"), description: t("description")});
}

export default async function ProjectsPage({params}: ProjectsPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "projectsPage"});
  const caseStudies = getCaseStudies(locale).filter((s) => s.status === "published");

  return (
    <>
      <PageIntro kicker={t("kicker")} title={t("title")} description={t("description")} />

      <section className="py-14 sm:py-16">
        <Container className="space-y-6">
          {caseStudies.map((item, index) => {
            const isDark = index === 0;
            return (
              <Reveal key={item.id} delay={index * 0.05} preset="fade-up" distance={18}>
                <article
                  className={`overflow-hidden rounded-[var(--radius-card-lg)] border p-6 sm:p-8 ${
                    isDark
                      ? "border-white/10 bg-[var(--surface-dark)] text-white shadow-[var(--shadow-dark)]"
                      : "border-[var(--border-subtle)] bg-white shadow-[var(--shadow-card)]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 pb-4">
                    {item.tags.map((tag) => (
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
                    {item.title}
                  </h3>

                  <div className="mt-6 grid gap-5 lg:grid-cols-3">
                    <div className={`space-y-2 rounded-[20px] border p-5 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--border-subtle)] bg-[var(--surface-alt)]/80"}`}>
                      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                        {t("labels.problem")}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-[var(--ink-muted)]"}`}>{item.problem}</p>
                    </div>
                    <div className={`space-y-2 rounded-[20px] border p-5 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--border-subtle)] bg-[var(--surface-alt)]/80"}`}>
                      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                        {t("labels.solution")}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-[var(--ink-muted)]"}`}>{item.solution}</p>
                    </div>
                    <div className={`space-y-2 rounded-[20px] border p-5 ${isDark ? "border-[var(--accent-a)]/20 bg-[var(--accent-a)]/10" : "border-[var(--accent-current)]/18 bg-[var(--accent-current)]/6"}`}>
                      <p className={`text-xs font-semibold tracking-[0.14em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                        {t("labels.result")}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/90" : "text-[var(--ink-primary)]"}`}>{item.result}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
