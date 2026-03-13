import { ArrowRight, Mail } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { Button } from "@/components/ui/button";
import { GlowPanel } from "@/components/ui/glow-panel";
import { siteConfig } from "@/content/site";

type CtaContent = {
  title: string;
  body: string;
  primaryCta: string;
  primaryCtaMicro?: string;
  secondaryCta: string;
};

export function CtaSection({ content }: { content: CtaContent }) {
  return (
    <SectionShell id="kontakt">
      <Reveal preset="scale-in">
        <GlowPanel className="overflow-hidden rounded-[2.25rem] p-0">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6 p-6 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Kontakt / Erstgespräch
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {content.title}
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-strong)]">
                {content.body}
              </p>
              <div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <BookingButton
                    label={content.primaryCta}
                    variant="primary"
                    className="sm:min-w-[15rem]"
                  />
                  <Button
                    href={`mailto:${siteConfig.contact.email}`}
                    variant="secondary"
                    className="sm:min-w-[15rem]"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {content.secondaryCta}
                  </Button>
                </div>
                {content.primaryCtaMicro && (
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {content.primaryCtaMicro}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="space-y-5">
                <div className="surface-panel-soft rounded-[1.6rem] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    Datenschutz zuerst
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    Die Terminbuchung wird nicht automatisch geladen. Erst nach
                    Ihrer ausdrücklichen Zustimmung wird der externe
                    Buchungsdienst eingebunden.
                  </p>
                </div>
                <div className="surface-panel-soft rounded-[1.6rem] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    Alternative Kontaktmöglichkeit
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-3 inline-flex items-center gap-2 text-base font-medium text-white hover:text-[var(--accent)]"
                  >
                    {siteConfig.contact.email}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-strong)]">
                  <a
                    href={siteConfig.legal.privacyHref}
                    className="hover:text-white"
                  >
                    Datenschutz
                  </a>
                  <a
                    href={siteConfig.legal.imprintHref}
                    className="hover:text-white"
                  >
                    Impressum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </GlowPanel>
      </Reveal>
    </SectionShell>
  );
}
