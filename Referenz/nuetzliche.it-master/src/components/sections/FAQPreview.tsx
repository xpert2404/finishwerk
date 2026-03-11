import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import {getFaqs} from "@/data/faqs";
import type {Locale} from "@/data/types";
import {stagger} from "@/lib/motion";
import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";

interface FAQPreviewSectionProps {
  locale: Locale;
}

function trimAnswer(text: string): string {
  if (text.length <= 145) {
    return text;
  }
  return `${text.slice(0, 142).trimEnd()}...`;
}

export async function FAQPreviewSection({locale}: FAQPreviewSectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const tCommon = await getTranslations({locale, namespace: "common"});
  const faqs = getFaqs(locale).slice(0, 3);

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          kicker={tHome("faqPreview.kicker")}
          title={tHome("faqPreview.title")}
          description={tHome("faqPreview.description")}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.id} delay={stagger(index, 0.04)} preset="scale-in">
              <Card className="surface-card h-full border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-base leading-snug text-[var(--ink-primary)]">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-600">{trimAnswer(faq.answer)}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90">
            <Link href="/faq">{tHome("faqPreview.ctaAll")}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-100">
            <Link href="/contact">{tCommon("contactNow")}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
