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
  const content = getSolutionLandingPage(locale, "idp-documents");
  return buildMetadata({locale, route: "solutions-idp-documents", title: content.metadataTitle, description: content.metadataDescription});
}

export default async function IdpDocumentsPage({params}: SolutionPageProps) {
  const {locale} = await params;
  const content = getSolutionLandingPage(locale, "idp-documents");
  const tCommon = await getTranslations({locale, namespace: "common"});

  return <SegmentLandingPage locale={locale} sectionId="solution-idp-documents" {...content} secondaryHref="/projects" primaryCtaLabel={tCommon("ctaPrimary")} />;
}