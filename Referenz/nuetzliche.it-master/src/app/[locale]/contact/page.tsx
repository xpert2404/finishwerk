import {Mail, MapPin, Phone} from "lucide-react";
import {BookingButton} from "@/components/booking/BookingButton";
import {Card, CardContent} from "@/components/ui/card";
import {Container} from "@/components/layout/Container";
import {ContactForm} from "@/components/sections/ContactForm";
import {PageIntro} from "@/components/sections/PageIntro";
import {LocationMapEmbed} from "@/components/shared/LocationMapEmbed";
import {Reveal} from "@/components/shared/Reveal";
import {CONTACT_FACTS, getSiteConfig} from "@/data/config";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {getLocalizedPath} from "@/lib/routes";
import {getTranslations} from "next-intl/server";

interface ContactPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ContactPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.contact"});
  return buildMetadata({locale, route: "contact", title: t("title"), description: t("description")});
}

export default async function ContactPage({params}: ContactPageProps) {
  const {locale} = await params;
  const tContact = await getTranslations({locale, namespace: "contact"});
  const tCommon = await getTranslations({locale, namespace: "common"});
  const tUi = await getTranslations({locale, namespace: "ui.labels"});
  const site = getSiteConfig();
  const successHref = getLocalizedPath("thank-you", locale);

  const titleParts = tContact("title").split(", ");
  const title = titleParts.length > 1 ? `${titleParts[0]},` : tContact("title");
  const titleAccentPart = titleParts.length > 1 ? titleParts.slice(1).join(", ") : undefined;

  return (
    <>
      <PageIntro
        kicker={tContact("headline")}
        title={title}
        titleAccentPart={titleAccentPart}
        description={tContact("text")}
      />

      <section className="py-10 sm:py-12 lg:py-14">
        <Container className="space-y-4 sm:space-y-5">
          <div className="grid items-stretch gap-6 xl:grid-cols-[1.42fr_0.58fr]">
            <Reveal preset="scale-in">
              <div id="contact-form" className="h-full scroll-mt-28">
                <ContactForm
                  labels={{
                    name: tContact("form.name"),
                    company: tContact("form.company"),
                    email: tContact("form.email"),
                    phone: tContact("form.phone"),
                    message: tContact("form.message"),
                    submit: tContact("form.submit"),
                    success: tContact("form.success"),
                    honeypot: tContact("form.honeypot"),
                    responseTime: tCommon("responseTime"),
                    submitError: tContact("form.submitError"),
                    privacyPrefix: tContact("form.privacyPrefix"),
                    privacyLinkLabel: tContact("form.privacyLinkLabel"),
                    submitting: tContact("form.submitting")
                  }}
                  successHref={successHref}
                />
              </div>
            </Reveal>

            <Reveal preset="scale-in" delay={0.04}>
              <Card className="surface-card h-full border-slate-200">
                <CardContent className="flex h-full flex-col gap-4 p-6 text-sm text-slate-600 sm:p-6">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent-current)] uppercase">
                      {locale === "de" ? "Direkte Kontaktwege" : "Direct contact channels"}
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-[var(--accent-current)]" />
                      <span>
                        {CONTACT_FACTS.addressLine}
                        <br />
                        {CONTACT_FACTS.postalLine}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="size-4 text-[var(--accent-current)]" />
                      <a href={`mailto:${CONTACT_FACTS.email}`} className="hover:text-[var(--accent-current)]">
                        {CONTACT_FACTS.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="size-4 text-[var(--accent-current)]" />
                      <a href={`tel:${CONTACT_FACTS.phone.replace(/[^\d+]/g, "")}`} className="hover:text-[var(--accent-current)]">
                        {CONTACT_FACTS.phone}
                      </a>
                    </p>
                  </div>

                  <div className="mt-auto pt-1">
                    <BookingButton className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90">
                      {tCommon("ctaPrimary")}
                    </BookingButton>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <Reveal preset="scale-in" delay={0.06}>
            <LocationMapEmbed
              title={tContact("map.title")}
              description={tContact("map.description")}
              embedUrl={site.locationMap.embedUrl}
              mapsLinkUrl={site.locationMap.mapsLinkUrl}
              openMapsLabel={tContact("map.openMaps")}
              mapLabel={site.locationMap.label}
              iframeTitle={tUi("mapEmbedTitle")}
              requiresConsent={site.locationMap.requiresConsent}
              consentTitle={tContact("map.consentTitle")}
              consentDescription={tContact("map.consentDescription")}
              loadEmbedLabel={tContact("map.loadEmbed")}
              mapHeightClassName="h-[320px] sm:h-[380px]"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
