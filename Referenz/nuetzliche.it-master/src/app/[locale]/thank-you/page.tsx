import {Button} from "@/components/ui/button";
import {BookingButton} from "@/components/booking/BookingButton";
import {Container} from "@/components/layout/Container";
import {SectionTracker} from "@/components/analytics/SectionTracker";
import {buildMetadata} from "@/lib/metadata";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/data/types";
import {getTranslations} from "next-intl/server";

interface ThankYouPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ThankYouPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.thankYou"});

  return buildMetadata({
    locale,
    route: "thank-you",
    title: t("title"),
    description: t("description")
  });
}

export default async function ThankYouPage({params}: ThankYouPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "thankYou"});
  const tCommon = await getTranslations({locale, namespace: "common"});

  return (
    <section id="thank-you-hero" className="py-16 sm:py-20">
      <SectionTracker sectionId="thank-you-hero" />
      <Container className="max-w-4xl">
        <div className="surface-card rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,250,0.92))] p-8 shadow-[0_32px_90px_-56px_rgba(15,61,94,0.42)] sm:p-10">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{t("kicker")}</p>
          <h1 className="pt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-4xl">{t("title")}</h1>
          <p className="max-w-2xl pt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{t("description")}</p>

          <div className="mt-8 grid gap-4 rounded-[24px] border border-slate-200/80 bg-white/85 p-5 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-[var(--ink-primary)]">{t("nextSteps.step1.title")}</p>
              <p className="pt-2 text-sm leading-relaxed text-slate-600">{t("nextSteps.step1.text")}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink-primary)]">{t("nextSteps.step2.title")}</p>
              <p className="pt-2 text-sm leading-relaxed text-slate-600">{t("nextSteps.step2.text")}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink-primary)]">{t("nextSteps.step3.title")}</p>
              <p className="pt-2 text-sm leading-relaxed text-slate-600">{t("nextSteps.step3.text")}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <BookingButton ctaId="thank_you_booking" position="thank_you_page" className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90">
              {tCommon("ctaPrimary")}
            </BookingButton>
            <Button asChild variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-50">
              <Link href="/services">{t("secondaryCta")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}