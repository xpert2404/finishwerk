import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {Container} from "@/components/layout/Container";
import {PageIntro} from "@/components/sections/PageIntro";
import {TeamGridSection} from "@/components/sections/TeamGrid";
import {FinalCTASection} from "@/components/sections/FinalCTA";
import {Reveal} from "@/components/shared/Reveal";
import {LocationMapEmbed} from "@/components/shared/LocationMapEmbed";
import {EXPERIENCE_YEARS, getSiteConfig} from "@/data/config";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {stagger} from "@/lib/motion";
import {getTranslations} from "next-intl/server";

interface AboutPageProps {
  params: Promise<{locale: Locale}>;
}

interface ExperienceBlock {
  title: string;
  text: string;
  points: string[];
}

export async function generateMetadata({params}: AboutPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.about"});
  return buildMetadata({locale, route: "about", title: t("title"), description: t("description")});
}

export default async function AboutPage({params}: AboutPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "aboutPage"});
  const tUi = await getTranslations({locale, namespace: "ui.labels"});
  const values = t.raw("values") as string[];
  const experienceBlock = t.raw("experienceBlock") as ExperienceBlock;
  const site = getSiteConfig();

  return (
    <>
      <PageIntro
        kicker={t("kicker")}
        title={t("title", {years: EXPERIENCE_YEARS})}
        description={t("description")}
      />

      <section className="py-16 sm:py-20">
        <Container className="space-y-8">
          <Reveal preset="soft-parallax">
            <Card className="surface-card overflow-hidden border-slate-200">
              <CardContent className="space-y-5 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent-current)] uppercase">
                  {t("experienceLabel", {years: EXPERIENCE_YEARS})}
                </p>
                <h2 className="text-balance text-2xl font-semibold text-[var(--ink-primary)] sm:text-3xl">{experienceBlock.title}</h2>
                <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">{experienceBlock.text}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {experienceBlock.points.map((point) => (
                    <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[var(--ink-primary)]">
                      {point}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal delay={stagger(0)} preset="scale-in">
              <Card className="surface-card h-full min-h-[280px] border-slate-200">
                <CardContent className="space-y-4 p-6 sm:p-7">
                  <h2 className="text-2xl font-semibold text-[var(--ink-primary)]">{t("mission.title")}</h2>
                  <p className="text-base leading-relaxed text-slate-600">{t("mission.text")}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {values.map((value) => (
                      <Badge key={value} variant="secondary" className="rounded-full bg-slate-100 text-[var(--ink-primary)]">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={stagger(1)} preset="scale-in">
              <Card className="surface-card h-full min-h-[280px] border-slate-200">
                <CardContent className="space-y-4 p-6 sm:p-7">
                  <h2 className="text-2xl font-semibold text-[var(--ink-primary)]">{t("work.title")}</h2>
                  <ol className="space-y-3 text-sm text-slate-600">
                    {(t.raw("work.steps") as string[]).map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-current)]/10 text-xs font-semibold text-[var(--accent-current)]">
                          {index + 1}
                        </span>
                        <span className="pt-0.5 text-base leading-relaxed text-slate-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <TeamGridSection locale={locale} />

      <section className="py-10 sm:py-12">
        <Container>
          <Reveal preset="scale-in">
            <LocationMapEmbed
              title={t("location.title")}
              description={t("location.description")}
              embedUrl={site.locationMap.embedUrl}
              mapsLinkUrl={site.locationMap.mapsLinkUrl}
              openMapsLabel={t("location.openMaps")}
              mapLabel={site.locationMap.label}
              iframeTitle={tUi("mapEmbedTitle")}
              requiresConsent={site.locationMap.requiresConsent}
              consentTitle={t("location.consentTitle")}
              consentDescription={t("location.consentDescription")}
              loadEmbedLabel={t("location.loadEmbed")}
              mapHeightClassName="h-[320px] sm:h-[360px]"
            />
          </Reveal>
        </Container>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
