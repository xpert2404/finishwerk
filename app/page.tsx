import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSystemSection } from "@/components/sections/solution-system-section";
import { TrustCountersSection } from "@/components/sections/trust-counters-section";
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
      <HeroSection content={homeContent.hero} />
      <TrustCountersSection />
      <ProblemSection content={homeContent.problems} />
      <SolutionSystemSection content={homeContent.solutionClusters} />
      <CtaSection content={homeContent.cta} />
    </>
  );
}
