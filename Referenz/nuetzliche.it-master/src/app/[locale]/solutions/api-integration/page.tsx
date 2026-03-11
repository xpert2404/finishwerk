import {SegmentLandingPage} from "@/components/marketing/SegmentLandingPage";
import {getSolutionLandingPage} from "@/data/landingPages";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {getTranslations} from "next-intl/server";

interface SolutionPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: SolutionPageProps) {
  const {locale} = await params;
  const content = getSolutionLandingPage(locale, "api-integration");
  return buildMetadata({locale, route: "solutions-api-integration", title: content.metadataTitle, description: content.metadataDescription});
}

export default async function ApiIntegrationPage({params}: SolutionPageProps) {
  const {locale} = await params;
  const content = getSolutionLandingPage(locale, "api-integration");
  const tCommon = await getTranslations({locale, namespace: "common"});

  return <SegmentLandingPage locale={locale} sectionId="solution-api-integration" {...content} secondaryHref="/industries/it-service" primaryCtaLabel={tCommon("ctaPrimary")} />;
}