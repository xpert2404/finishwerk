import {SegmentLandingPage} from "@/components/marketing/SegmentLandingPage";
import {getIndustryLandingPage} from "@/data/landingPages";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {getTranslations} from "next-intl/server";

interface IndustryPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: IndustryPageProps) {
  const {locale} = await params;
  const content = getIndustryLandingPage(locale, "it-service");
  return buildMetadata({locale, route: "industries-it-service", title: content.metadataTitle, description: content.metadataDescription});
}

export default async function ItServicePage({params}: IndustryPageProps) {
  const {locale} = await params;
  const content = getIndustryLandingPage(locale, "it-service");
  const tCommon = await getTranslations({locale, namespace: "common"});

  return <SegmentLandingPage locale={locale} sectionId="industry-it-service" {...content} secondaryHref="/solutions/api-integration" primaryCtaLabel={tCommon("ctaPrimary")} />;
}