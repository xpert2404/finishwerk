import {getTranslations} from "next-intl/server";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Container} from "@/components/layout/Container";
import {SectionHeading} from "@/components/shared/SectionHeading";
import {Reveal} from "@/components/shared/Reveal";
import {HoverLift} from "@/components/shared/HoverLift";
import {stagger} from "@/lib/motion";
import {companyExpertise, getTeam} from "@/data/team";
import type {Locale} from "@/data/types";

interface TeamGridSectionProps {
  locale: Locale;
}

export async function TeamGridSection({locale}: TeamGridSectionProps) {
  const t = await getTranslations({locale, namespace: "aboutPage.team"});
  const team = getTeam(locale);
  const expertise = companyExpertise[locale];

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-14 sm:py-16">
      <Container className="space-y-8">
        <SectionHeading kicker={t("kicker")} title={t("title")} description={t("description")} />

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent-current)] uppercase">{t("expertiseLabel")}</p>
          <div className="flex flex-wrap gap-2">
            {expertise.map((item) => (
              <Badge key={item} variant="secondary" className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-[var(--ink-primary)]">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={stagger(index, 0.05)} preset="scale-in">
              <HoverLift>
                <Card className="surface-card h-full min-h-[280px] border-slate-200 bg-white">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-2xl text-[var(--ink-primary)]">{member.name}</CardTitle>
                    <p className="text-base leading-relaxed text-slate-700">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {member.focusAreas.map((focus) => (
                        <li key={focus} className="flex gap-2">
                          <span className="mt-1.5 inline-block size-1.5 rounded-full bg-[var(--accent-current)]" />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
