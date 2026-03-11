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
  const content = getIndustryLandingPage(locale, "medical-practices");
  return buildMetadata({locale, route: "industries-medical-practices", title: content.metadataTitle, description: content.metadataDescription});
}

export default async function MedicalPracticesPage({params}: IndustryPageProps) {
  const {locale} = await params;
  const content = getIndustryLandingPage(locale, "medical-practices");
  const tCommon = await getTranslations({locale, namespace: "common"});

  return <SegmentLandingPage locale={locale} sectionId="industry-medical-practices" {...content} secondaryHref="/ai-data-control" primaryCtaLabel={tCommon("ctaPrimary")} />;
}