import {ArrowRight, ShieldCheck} from "lucide-react";
import {BookingButton} from "@/components/booking/BookingButton";
import {Container} from "@/components/layout/Container";
import {DotPattern} from "@/components/shared/DotPattern";
import {Reveal} from "@/components/shared/Reveal";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";

interface HeroSectionProps {
  locale: Locale;
}

const heroContent = {
  de: {
    headline: "Maßgeschneiderte .NET-Software und Workflow-Automatisierung, die Prozesse messbar entlastet.",
    accent: "Mit lokaler KI dort, wo sie konkret hilft.",
    subline:
      "Für Kanzleien, Arztpraxen, beratungsnahe Dienste und Unternehmen mit hohem Schutzbedarf bauen wir .NET-Webapps, PWAs und kontrollierte Workflows, die Routineaufwand senken, Freigaben sauber abbilden und Ergebnisse nachvollziehbar machen.",
    microcopy: "15 Min · kostenlos · unverbindlich · keine Vorbereitung nötig",
    ctaSecondary: "Projekte ansehen",
    visualItems: [
      {label: ".NET-Software & PWAs", detail: "Maßgeschneiderte Webapps mit klarer Architektur"},
      {label: "Workflow-Automatisierung", detail: "End-to-End-Prozesse, keine Insellösungen"},
      {label: "Volle Datenkontrolle", detail: "DE/EU-Hosting, DSGVO, Rollen & Governance"}
    ]
  },
  en: {
    headline: "Custom .NET software and workflow automation that measurably reduces process friction.",
    accent: "With local AI where it concretely helps.",
    subline:
      "For law firms, medical practices, advisory services and organizations with high data protection needs — we build .NET web apps, PWAs and controlled workflows that reduce routine effort, map approvals cleanly and keep results traceable.",
    microcopy: "15 min · free · no commitment · no preparation needed",
    ctaSecondary: "View projects",
    visualItems: [
      {label: ".NET software & PWAs", detail: "Custom web apps with clean architecture"},
      {label: "Workflow automation", detail: "End-to-end processes, no siloed tools"},
      {label: "Full data control", detail: "DE/EU hosting, GDPR, roles & governance"}
    ]
  }
} as const;

export async function HeroSection({locale}: HeroSectionProps) {
  const tCommon = await getTranslations({locale, namespace: "common"});
  const content = heroContent[locale];

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,1))]">
      <DotPattern className="opacity-[0.035]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" aria-hidden="true" />

      <Container size="hero" className="relative pb-16 pt-14 sm:pb-20 sm:pt-18 lg:pb-24 lg:pt-20">
        <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <Reveal preset="soft-parallax" distance={22}>
            <div className="space-y-7">
              <div className="space-y-5">
                <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-5xl lg:text-6xl lg:leading-[1.06]">
                  {content.headline}
                  <span className="mt-2 block bg-gradient-to-r from-[var(--accent-current)] to-[var(--accent-current)]/70 bg-clip-text text-[0.88em] text-transparent">
                    {content.accent}
                  </span>
                </h1>
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">{content.subline}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <BookingButton
                  className="rounded-[var(--radius-pill)] bg-[var(--accent-current)] px-8 py-3.5 text-sm font-medium text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-current)]/92"
                  ctaId="hero_primary"
                  position="hero"
                >
                  {tCommon("ctaPrimary")}
                </BookingButton>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-primary)] transition-colors hover:text-[var(--accent-current)]"
                >
                  {content.ctaSecondary}
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <p className="text-sm text-slate-500">{content.microcopy}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} preset="fade-up" distance={18}>
            <div className="space-y-4">
              {content.visualItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-start gap-4 rounded-[var(--radius-card)] border p-5 shadow-[var(--shadow-card)] ${
                    index === 2
                      ? "border-[var(--accent-current)]/20 bg-[var(--accent-current)]/[0.04]"
                      : "border-slate-200/80 bg-white/90"
                  }`}
                >
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-current)]/10 text-[var(--accent-current)]">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink-primary)]">{item.label}</p>
                    <p className="pt-1 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
