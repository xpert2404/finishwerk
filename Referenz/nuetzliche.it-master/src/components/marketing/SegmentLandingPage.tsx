import {ArrowRight} from "lucide-react";
import {BookingButton} from "@/components/booking/BookingButton";
import {SectionTracker} from "@/components/analytics/SectionTracker";
import {Container} from "@/components/layout/Container";
import {PageIntro} from "@/components/sections/PageIntro";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import {Button} from "@/components/ui/button";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/data/types";

interface SegmentLandingPageProps {
  locale: Locale;
  sectionId: string;
  kicker: string;
  title: string;
  description: string;
  audience: string;
  introBullets: string[];
  proofTitle: string;
  proofItems: Array<{label: string; text: string}>;
  stepsTitle: string;
  steps: Array<{title: string; text: string}>;
  stackTitle: string;
  stackItems: string[];
  securityTitle: string;
  securityItems: string[];
  faqTitle: string;
  faqs: Array<{question: string; answer: string}>;
  ctaTitle: string;
  ctaText: string;
  secondaryHref: "/services" | "/projects" | "/contact" | "/ai-data-control" | "/industries/law-firms" | "/industries/medical-practices" | "/industries/it-service" | "/solutions/rag-knowledge-search" | "/solutions/idp-documents" | "/solutions/api-integration";
  secondaryLabel: string;
  primaryCtaLabel: string;
}

export function SegmentLandingPage({
  locale,
  sectionId,
  kicker,
  title,
  description,
  audience,
  introBullets,
  proofTitle,
  proofItems,
  stepsTitle,
  steps,
  stackTitle,
  stackItems,
  securityTitle,
  securityItems,
  faqTitle,
  faqs,
  ctaTitle,
  ctaText,
  secondaryHref,
  secondaryLabel,
  primaryCtaLabel
}: SegmentLandingPageProps) {
  const labels = locale === "de"
    ? {
        primaryCta: "Erstgespräch",
        proof: "Proof",
        flow: "Ablauf",
        stack: "Bausteine",
        security: "Security",
        faq: "FAQ",
        nextStep: "Nächster Schritt",
        ctaMeta: "15 Min, kostenlos, keine Vorbereitung nötig."
      }
    : {
        primaryCta: "Intro call",
        proof: "Proof",
        flow: "Flow",
        stack: "Stack",
        security: "Security",
        faq: "FAQ",
        nextStep: "Next step",
        ctaMeta: "15 minutes, free, no preparation needed."
      };

  return (
    <>
      <section id={sectionId}>
        <SectionTracker sectionId={sectionId} />
        <PageIntro kicker={kicker} title={title} description={description} />
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <Container className="space-y-10">
          <Reveal preset="soft-parallax">
            <article className="grid gap-5 rounded-[30px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,250,0.94))] p-6 shadow-[0_28px_80px_-56px_rgba(15,61,94,0.38)] lg:grid-cols-[1.1fr_0.9fr] sm:p-8">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-600">{audience}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {introBullets.map((item) => (
                    <div key={item} className="rounded-[20px] border border-slate-200/80 bg-white/88 px-4 py-4 text-sm leading-relaxed text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--accent-current)]/15 bg-[var(--accent-current)]/6 p-5">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{labels.primaryCta}</p>
                <p className="pt-3 text-2xl font-semibold tracking-tight text-[var(--ink-primary)]">{primaryCtaLabel}</p>
                <p className="pt-3 text-sm leading-relaxed text-slate-600">{labels.ctaMeta}</p>
                <div className="pt-5">
                  <BookingButton ctaId={`${sectionId}_hero_booking`} position={sectionId} className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90">
                    {primaryCtaLabel}
                  </BookingButton>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="space-y-6">
            <SectionHeading kicker={labels.proof} title={proofTitle} />
            <div className="grid gap-4 md:grid-cols-3">
              {proofItems.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.04} preset="scale-in">
                  <article className="home-surface-card h-full rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_22px_58px_-46px_rgba(15,61,94,0.34)]">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent-current)] uppercase">{item.label}</p>
                    <p className="pt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <Reveal preset="fade-up">
              <article className="rounded-[30px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_28px_75px_-56px_rgba(15,61,94,0.34)] sm:p-7">
                <SectionHeading kicker={labels.flow} title={stepsTitle} />
                <ol className="space-y-4 pt-6">
                  {steps.map((step, index) => (
                    <li key={step.title} className="grid gap-3 border-t border-slate-200/80 pt-4 md:grid-cols-[auto_1fr]">
                      <span className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-[var(--accent-current)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--ink-primary)]">{step.title}</p>
                        <p className="pt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>

            <div className="space-y-6">
              <Reveal preset="soft-parallax">
                <article className="rounded-[30px] border border-slate-200/80 bg-slate-50/85 p-6 sm:p-7">
                  <SectionHeading kicker={labels.stack} title={stackTitle} />
                  <ul className="space-y-3 pt-5">
                    {stackItems.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                        <span className="mt-2 inline-flex size-2 rounded-full bg-[var(--accent-current)]/90" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal delay={0.06} preset="soft-parallax">
                <article className="rounded-[30px] border border-slate-200/80 bg-[var(--ink-primary)] p-6 text-white shadow-[0_28px_85px_-46px_rgba(15,61,94,0.65)] sm:p-7">
                  <SectionHeading kicker={labels.security} title={securityTitle} className="[&_h2]:text-white [&_p]:text-white/80" />
                  <ul className="space-y-3 pt-5">
                    {securityItems.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/85">
                        <span className="mt-2 inline-flex size-2 rounded-full bg-[var(--accent-a)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading kicker={labels.faq} title={faqTitle} />
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.05} preset="scale-in">
                  <article className="rounded-[24px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_22px_58px_-46px_rgba(15,61,94,0.3)]">
                    <p className="text-sm font-semibold text-[var(--ink-primary)]">{faq.question}</p>
                    <p className="pt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal preset="scale-in">
            <article className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,250,0.94))] p-7 shadow-[0_30px_90px_-56px_rgba(15,61,94,0.4)] sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{labels.nextStep}</p>
              <h2 className="pt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--ink-primary)]">{ctaTitle}</h2>
              <p className="max-w-2xl pt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{ctaText}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <BookingButton ctaId={`${sectionId}_footer_booking`} position={`${sectionId}_footer`} className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90">
                  {primaryCtaLabel}
                </BookingButton>
                <Button asChild variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-50">
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <ArrowRight className="size-4 text-[var(--accent-current)]" />
                  {labels.ctaMeta}
                </span>
              </div>
            </article>
          </Reveal>
        </Container>
      </section>
    </>
  );
}