import {getTranslations} from "next-intl/server";
import {PageIntro} from "@/components/sections/PageIntro";
import {Container} from "@/components/layout/Container";
import {Badge} from "@/components/ui/badge";
import {Reveal} from "@/components/shared/Reveal";
import {getServices} from "@/data/services";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {StructuredData} from "@/components/shared/StructuredData";
import {getServiceJsonLd} from "@/lib/jsonld";
import {CheckCircle2, ArrowRight} from "lucide-react";
import {BookingButton} from "@/components/booking/BookingButton";
import {FinalCTASection} from "@/components/sections/FinalCTA";

interface ServicesPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ServicesPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.services"});
  return buildMetadata({locale, route: "services", title: t("title"), description: t("description")});
}

export default async function ServicesPage({params}: ServicesPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "servicesPage"});
  const tCommon = await getTranslations({locale, namespace: "common"});
  const services = getServices(locale);

  return (
    <>
      <StructuredData data={getServiceJsonLd(locale, services)} />
      <PageIntro kicker={t("kicker")} title={t("title")} description={t("description")} />

      <section className="py-14 sm:py-16">
        <Container className="space-y-10">
          <Reveal preset="fade-up">
            <nav className="flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-white px-5 py-4 shadow-sm sm:px-6">
              <span className="mr-2 text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">
                {t("labels.index")}
              </span>
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--surface-alt)] px-4 py-2 text-sm font-medium text-[var(--ink-primary)] transition-all hover:border-[var(--accent-current)]/40 hover:bg-[var(--accent-current)]/5 hover:text-[var(--accent-current)]"
                >
                  {service.title}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="space-y-6">
            {services.map((service, index) => {
              const isDark = index === 0;
              return (
                <Reveal key={service.id} delay={index * 0.04}>
                  <article
                    id={service.id}
                    className={`overflow-hidden rounded-3xl border transition-shadow hover:shadow-md ${
                      isDark
                        ? "border-white/10 bg-[var(--surface-dark)] text-white shadow-[var(--shadow-dark)]"
                        : "border-[var(--border-subtle)] bg-white shadow-sm"
                    }`}
                  >
                    <div className="px-6 py-6 sm:px-8 sm:py-7">
                      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
                        <div className="space-y-5">
                          <div className="space-y-3">
                            <h3 className={`text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-[var(--ink-primary)]"}`}>
                              {service.title}
                            </h3>
                            <p className={`text-base leading-relaxed ${isDark ? "text-white/75" : "text-[var(--ink-muted)]"}`}>
                              {service.summary}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <p className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                              {t("labels.goodFit")}
                            </p>
                            <ul className="space-y-2.5">
                              {service.benefits.map((item) => (
                                <li key={item} className={`flex items-start gap-2.5 text-sm leading-relaxed ${isDark ? "text-white/75" : "text-[var(--ink-muted)]"}`}>
                                  <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {service.integrations.map((item) => (
                              <Badge
                                key={item}
                                variant="secondary"
                                className={`rounded-full border text-xs shadow-none ${
                                  isDark
                                    ? "border-white/10 bg-white/5 text-white/70"
                                    : "border-[var(--border-subtle)] bg-[var(--surface-alt)] text-[var(--ink-muted)]"
                                }`}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className={`space-y-6 xl:border-l xl:pl-8 ${isDark ? "xl:border-white/10" : "xl:border-[var(--border-subtle)]"}`}>
                          <div className="space-y-3">
                            <p className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                              {t("labels.deliverables")}
                            </p>
                            <ul className="space-y-2">
                              {service.deliverables.map((item) => (
                                <li key={item} className={`flex items-start gap-2 text-sm leading-relaxed ${isDark ? "text-white/75" : "text-[var(--ink-muted)]"}`}>
                                  <ArrowRight className={`mt-1 size-3 shrink-0 ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={`space-y-3 border-t pt-5 ${isDark ? "border-white/10" : "border-[var(--border-subtle)]"}`}>
                            <p className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>
                              {t("labels.process")}
                            </p>
                            <ol className="grid gap-2 sm:grid-cols-2">
                              {service.process.map((item, stepIndex) => (
                                <li
                                  key={item}
                                  className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${
                                    isDark
                                      ? "border-white/10 bg-white/5"
                                      : "border-[var(--border-subtle)] bg-[var(--surface-alt)]/60"
                                  }`}
                                >
                                  <span className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                    isDark ? "bg-[var(--accent-a)]/15 text-[var(--accent-a)]" : "bg-[var(--accent-current)]/10 text-[var(--accent-current)]"
                                  }`}>
                                    {stepIndex + 1}
                                  </span>
                                  <span className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-[var(--ink-muted)]"}`}>{item}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          <p className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-[var(--ink-muted)]"}`}>
                            <span className={`font-semibold ${isDark ? "text-[var(--accent-a)]" : "text-[var(--accent-current)]"}`}>{t("labels.quality")}</span>{" "}
                            {service.qualityStandard}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal preset="fade-up">
            <div className="mx-auto max-w-xl pt-8 text-center">
              <p className="mb-6 text-base leading-relaxed text-[var(--ink-muted)]">
                {locale === "de"
                  ? "Nicht sicher, welcher Leistungsbereich am besten passt? Im Erstgespräch klären wir gemeinsam, wo der größte Hebel liegt."
                  : "Not sure which service area fits best? In the intro call we'll identify where the biggest leverage sits."}
              </p>
              <BookingButton>{tCommon("ctaPrimary")}</BookingButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
