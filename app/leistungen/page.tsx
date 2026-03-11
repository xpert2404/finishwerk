import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { SolutionSystemSection } from "@/components/sections/solution-system-section";
import { VisibilitySection } from "@/components/sections/visibility-section";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Websites, Shops, SEO, Bestellsysteme, Social und Prozesse — als präzise zusammengesetztes System statt loser Service-Liste.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Digitale Systeme statt einzelner Services."
        body="FinishWerk liefert Websites, Shops, SEO, Bestellsysteme, Social und Infrastruktur nicht als lose Services, sondern als zusammengesetztes System mit klarer Geschäftswirkung."
      />
      <SolutionSystemSection content={homeContent.solutionClusters} />
      <VisibilitySection content={homeContent.visibility} />
      <CapabilitiesSection content={homeContent.capabilities} />
      <CtaSection content={homeContent.cta} />
    </>
  );
}
