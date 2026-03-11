import {Card, CardContent} from "@/components/ui/card";
import {Container} from "@/components/layout/Container";
import {PageIntro} from "@/components/sections/PageIntro";
import {CONTACT_FACTS, LEGAL_FACTS} from "@/data/config";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {getTranslations} from "next-intl/server";

interface LegalNoticePageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: LegalNoticePageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.legal"});
  return buildMetadata({locale, route: "legal-notice", title: t("title"), description: t("description")});
}

export default async function LegalNoticePage({params}: LegalNoticePageProps) {
  const {locale} = await params;

  return (
    <>
      <PageIntro
        kicker={locale === "de" ? "Impressum" : "Legal notice"}
        title={locale === "de" ? "Angaben gemäß §5 TMG" : "Information according to §5 TMG"}
        description={
          locale === "de"
            ? "Rechtlich erforderliche Anbieterkennzeichnung für nützliche.IT."
            : "Legally required provider identification for nützliche.IT."
        }
      />

      <section className="py-14 sm:py-16">
        <Container>
          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-6 text-sm leading-relaxed text-slate-700">
              <div>
                <h2 className="text-base font-semibold text-[var(--ink-primary)]">nützliche.IT</h2>
                <p>{LEGAL_FACTS.representative}</p>
                <p>{CONTACT_FACTS.addressLine}</p>
                <p>{CONTACT_FACTS.postalLine}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">Kontakt</h3>
                <p>Telefon: {CONTACT_FACTS.phone}</p>
                <p>Telefax: {CONTACT_FACTS.fax}</p>
                <p>
                  E-Mail: <a href={`mailto:${CONTACT_FACTS.email}`}>{CONTACT_FACTS.email}</a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">
                  {locale === "de" ? "Umsatzsteuer" : "VAT information"}
                </h3>
                <p>USt.-IdNr.: {LEGAL_FACTS.vatId}</p>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
