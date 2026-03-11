import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufige Fragen zu Branchenfokus, Ergebnissystem, Projektrahmen und Datenschutz — direkt beantwortet.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Häufige Fragen"
        title="Einwände früh klären, bevor Projekte unnötig komplex werden."
        body="Branchenfokus, Ergebnissystem, Projektrahmen und Datenschutz — die wichtigsten Fragen direkt beantwortet."
      />
      <FaqSection content={homeContent.faqItems} />
      <CtaSection content={homeContent.cta} />
    </>
  );
}
