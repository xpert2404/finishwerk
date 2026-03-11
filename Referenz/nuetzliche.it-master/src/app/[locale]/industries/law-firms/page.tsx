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
  const content = getIndustryLandingPage(locale, "law-firms");
  return buildMetadata({locale, route: "industries-law-firms", title: content.metadataTitle, description: content.metadataDescription});
}

export default async function LawFirmsPage({params}: IndustryPageProps) {
  const {locale} = await params;
  const content = getIndustryLandingPage(locale, "law-firms");
  const tCommon = await getTranslations({locale, namespace: "common"});

  return <SegmentLandingPage locale={locale} sectionId="industry-law-firms" {...content} secondaryHref="/solutions/rag-knowledge-search" primaryCtaLabel={tCommon("ctaPrimary")} />;
}