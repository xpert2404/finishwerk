import { CaseMechanicsSection } from "@/components/sections/case-mechanics-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ResultsSection } from "@/components/sections/results-section";
import { SolutionSystemSection } from "@/components/sections/solution-system-section";
import { TrustCountersSection } from "@/components/sections/trust-counters-section";
import { VisibilitySection } from "@/components/sections/visibility-section";
import { homeContent } from "@/content/home";
import { buildOrganizationJsonLd } from "@/lib/metadata";

export default function Home() {
  const jsonLd = buildOrganizationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hook — Pain-first headline + dashboard visual */}
      <HeroSection content={homeContent.hero} />

      {/* 2. Quick proof — trust counters */}
      <TrustCountersSection />

      {/* 3. Agitate — customer-perspective problems */}
      <ProblemSection content={homeContent.problems} />

      {/* 4. Solution — 3-phase system */}
      <SolutionSystemSection content={homeContent.solutionClusters} />

      {/* 5. Case study — real restaurant example with GSAP scroll */}
      <CaseMechanicsSection content={homeContent.caseStudy} />

      {/* 6. Results — measurable KPIs + charts */}
      <ResultsSection
        metrics={homeContent.resultMetrics}
        chartSeries={homeContent.chartSeries}
      />

      {/* 7. Mid-page CTA */}
      <CtaSection content={homeContent.cta} />

      {/* 8. SEO / Visibility for non-tech audience */}
      <VisibilitySection content={homeContent.visibility} />

      {/* 9. Industries */}
      <IndustriesSection content={homeContent.industries} />

      {/* 10. FAQ — objection handling */}
      <FaqSection content={homeContent.faqItems} />

      {/* 11. Final CTA */}
      <CtaSection content={homeContent.cta} />
    </>
  );
}
