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
  const content = getSolutionLandingPage(locale, "rag-knowledge-search");
  return buildMetadata({locale, route: "solutions-rag-knowledge-search", title: content.metadataTitle, description: content.metadataDescription});
}

export default async function RAGKnowledgeSearchPage({params}: SolutionPageProps) {
  const {locale} = await params;
  const content = getSolutionLandingPage(locale, "rag-knowledge-search");
  const tCommon = await getTranslations({locale, namespace: "common"});

  return <SegmentLandingPage locale={locale} sectionId="solution-rag-knowledge-search" {...content} secondaryHref="/industries/law-firms" primaryCtaLabel={tCommon("ctaPrimary")} />;
}