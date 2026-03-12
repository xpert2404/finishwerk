import type { Metadata } from "next";
import { ArrowRight, Mail, MapPin, ShieldCheck } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-button";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { Button } from "@/components/ui/button";
import { GlowPanel } from "@/components/ui/glow-panel";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kostenloses Erstgespräch buchen oder per E-Mail anfragen. Kein Agentur-Pitch, sondern Fokus auf Marge, Sichtbarkeit und Conversion.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Lassen Sie uns den Umsatzhebel finden, der wirklich zählt."
        body="Im Erstgespräch geht es nicht um leere Agentur-Pitches, sondern um Marge, Sichtbarkeit, Conversion und Prozesslogik."
      />

      {/* ── Contact Form + Booking Section ── */}
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Contact Form */}
          <Reveal preset="fade-up">
            <GlowPanel className="h-full p-8 sm:p-10">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Nachricht senden
              </p>
              <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Schreiben Sie uns direkt.
              </h2>
              <ContactForm />
            </GlowPanel>
          </Reveal>

          {/* Right: Booking + Info */}
          <Reveal preset="fade-up" delay={0.08}>
            <div className="space-y-5">
              <GlowPanel className="space-y-6 p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  Erstgespräch buchen
                </p>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Kostenlos und unverbindlich.
                </h2>
                <p className="text-base leading-8 text-[var(--muted-strong)]">
                  Erst wenn der geschäftliche Hebel klar ist, wird über
                  Umsetzung gesprochen. Kein Agentur-Pitch, keine vorgefertigte
                  Lösung.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <BookingButton
                    label="Erstgespräch buchen"
                    variant="primary"
                    className="sm:min-w-[15rem]"
                  />
                  <Button
                    href={`mailto:${siteConfig.contact.email}`}
                    variant="secondary"
                    className="sm:min-w-[15rem]"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Per E-Mail anfragen
                  </Button>
                </div>
              </GlowPanel>

              <GlowPanel soft>
                <div className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      E-Mail
                    </p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-white hover:text-[var(--accent)]"
                    >
                      {siteConfig.contact.email}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GlowPanel>

              <GlowPanel soft>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      Standort
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                      {siteConfig.contact.region} — Remote-first,
                      deutschlandweit verfügbar.
                    </p>
                  </div>
                </div>
              </GlowPanel>

              <GlowPanel soft>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      Datenschutz zuerst
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                      Die Terminbuchung wird nicht automatisch geladen. Erst
                      nach Ihrer ausdrücklichen Zustimmung wird der externe
                      Buchungsdienst eingebunden.
                    </p>
                  </div>
                </div>
              </GlowPanel>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <FaqSection content={homeContent.faqItems} />
    </>
  );
}
