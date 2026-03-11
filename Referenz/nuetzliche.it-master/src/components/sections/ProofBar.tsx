import {Container} from "@/components/layout/Container";
import type {Locale} from "@/data/types";

interface ProofBarSectionProps {
  locale: Locale;
}

const proofContent = {
  de: [
    {value: "15+", label: "Jahre Erfahrung"},
    {value: ".NET", label: "Maßgeschneiderte Software"},
    {value: "DE/EU", label: "Hosting & Betrieb"},
    {value: "5.0 \u2605", label: "Google-Bewertung"}
  ],
  en: [
    {value: "15+", label: "years experience"},
    {value: ".NET", label: "custom software"},
    {value: "DE/EU", label: "hosting & operations"},
    {value: "5.0 \u2605", label: "Google rating"}
  ]
} as const;

export function ProofBarSection({locale}: ProofBarSectionProps) {
  const items = proofContent[locale];

  return (
    <section className="border-b border-white/10 bg-[var(--surface-dark)] py-6">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-semibold text-white sm:text-3xl">{item.value}</p>
              <p className="pt-1 text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
