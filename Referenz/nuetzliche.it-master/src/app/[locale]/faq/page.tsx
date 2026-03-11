import {getTranslations} from "next-intl/server";
import {PageIntro} from "@/components/sections/PageIntro";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import {FaqExplorer} from "@/components/faq/FaqExplorer";
import {getFaqs} from "@/data/faqs";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";

interface FaqPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: FaqPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.faq"});

  return buildMetadata({
    locale,
    route: "faq",
    title: t("title"),
    description: t("description")
  });
}

export default async function FaqPage({params}: FaqPageProps) {
  const {locale} = await params;
  const tFaq = await getTranslations({locale, namespace: "faqPage"});
  const faqs = getFaqs(locale);

  return (
    <>
      <PageIntro kicker={tFaq("kicker")} title={tFaq("title")} description={tFaq("description")} />
      <section className="py-14 sm:py-16">
        <Container>
          <Reveal preset="fade-up">
            <FaqExplorer faqs={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
