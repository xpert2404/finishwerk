import {ArrowRight} from "lucide-react";
import {BookingButton} from "@/components/booking/BookingButton";
import {Container} from "@/components/layout/Container";
import {Reveal} from "@/components/shared/Reveal";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";

interface FinalCTASectionProps {
  locale: Locale;
}

export async function FinalCTASection({locale}: FinalCTASectionProps) {
  const tCommon = await getTranslations({locale, namespace: "common"});
  const content =
    locale === "de"
      ? {
          kicker: "Nächster Schritt",
          title: "Wenn die Richtung klar ist, machen wir den Startpunkt konkret.",
          text: "Im Erstgespräch klären wir, wo .NET-Software, Workflow-Automatisierung oder kontrollierte KI den größten Hebel für Sie haben. Danach wissen Sie, was sinnvoll zuerst kommt.",
          secondary: "Oder schreiben Sie uns direkt"
        }
      : {
          kicker: "Next step",
          title: "Once the direction is clear, we turn it into a concrete first move.",
          text: "In the intro call we clarify where .NET software, workflow automation or controlled AI create the biggest leverage for you. After that, the right starting point becomes clear.",
          secondary: "Or write to us directly"
        };

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal preset="scale-in">
          <div className="mx-auto max-w-3xl rounded-[var(--radius-section)] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,250,0.94))] p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent-current)] uppercase">{content.kicker}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-4xl">{content.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">{content.text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <BookingButton
                className="rounded-[var(--radius-pill)] bg-[var(--accent-current)] px-8 py-3.5 text-sm font-medium text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-current)]/92"
                ctaId="final_cta"
                position="final_cta"
              >
                {tCommon("ctaPrimary")}
              </BookingButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-primary)] transition-colors hover:text-[var(--accent-current)]"
              >
                {content.secondary}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
