import {getTranslations} from "next-intl/server";
import {buildMetadata} from "@/lib/metadata";
import {getLocalBusinessJsonLd, getOrganizationJsonLd, getServiceJsonLd, getWebsiteJsonLd} from "@/lib/jsonld";
import {getServices} from "@/data/services";
import type {Locale} from "@/data/types";
import {StructuredData} from "@/components/shared/StructuredData";
import {HeroSection} from "@/components/sections/Hero";
import {ProofBarSection} from "@/components/sections/ProofBar";
import {ServicesSection} from "@/components/sections/Services";
import {ICPSection} from "@/components/sections/ICPSection";
import {ProcessSection} from "@/components/sections/Process";
import {CaseStudySection} from "@/components/sections/CaseStudy";
import {DataControlSection} from "@/components/sections/DataControl";
import {FinalCTASection} from "@/components/sections/FinalCTA";

interface HomePageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: HomePageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.home"});
  return buildMetadata({
    locale,
    route: "home",
    title: t("title"),
    description: t("description")
  });
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;
  const services = getServices(locale);

  return (
    <>
      <StructuredData data={[getOrganizationJsonLd(locale), getWebsiteJsonLd(locale), getLocalBusinessJsonLd(locale), ...getServiceJsonLd(locale, services)]} />
      <HeroSection locale={locale} />
      <ProofBarSection locale={locale} />
      <ServicesSection locale={locale} />
      <ICPSection locale={locale} />
      <ProcessSection locale={locale} />
      <CaseStudySection locale={locale} />
      <DataControlSection locale={locale} />
      <FinalCTASection locale={locale} />
    </>
  );
}
