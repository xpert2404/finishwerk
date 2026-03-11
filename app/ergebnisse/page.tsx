import type { Metadata } from "next";
import { CaseMechanicsSection } from "@/components/sections/case-mechanics-section";
import { CtaSection } from "@/components/sections/cta-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProofStripSection } from "@/components/sections/proof-strip-section";
import { ResultsSection } from "@/components/sections/results-section";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: "Ergebnisse",
  description:
    "Messbare Wirkung statt vager Versprechen: Kundenbeispiele, KPIs, Diagramme und Case Mechanics zeigen, wie digitale Systeme Geschäftswachstum unterstützen.",
  alternates: { canonical: "/ergebnisse" },
};

export default function ErgebnissePage() {
  return (
    <>
      <PageHero
        eyebrow="Ergebnisse"
        title="Messbare Wirkung statt vager Leistungsversprechen."
        body="KPIs, Kundenbeispiele und Diagramme zeigen die Logik hinter dem Ergebnis: bessere Marge, stärkere Sichtbarkeit, geführte Conversion und mehr Kontrolle."
      />
      <ProofStripSection content={homeContent.proofLanes} />
      <ResultsSection
        metrics={homeContent.resultMetrics}
        chartSeries={homeContent.chartSeries}
      />
      <CaseMechanicsSection content={homeContent.caseStudy} />
      <IndustriesSection content={homeContent.industries} />
      <CtaSection content={homeContent.cta} />
    </>
  );
}
