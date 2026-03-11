import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {SectionHeading} from "@/components/shared/SectionHeading";
import {getFaqs} from "@/data/faqs";
import type {Locale} from "@/data/types";
import {getTranslations} from "next-intl/server";

interface FAQSectionProps {
  locale: Locale;
}

export async function FAQSection({locale}: FAQSectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const faqs = getFaqs(locale);

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeading kicker={tHome("faq.kicker")} title={tHome("faq.title")} />

        <Reveal preset="scale-in">
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-slate-200 bg-white px-5 sm:px-8">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-left text-base font-medium text-[var(--ink-primary)]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
