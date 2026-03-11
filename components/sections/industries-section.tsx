import { Building2, ShoppingBag, Store, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type IndustryItem = {
  title: string;
  body: string;
};

const icons = [UtensilsCrossed, Store, ShoppingBag, Building2];

export function IndustriesSection({
  content,
}: {
  content: readonly IndustryItem[];
}) {
  return (
    <SectionShell id="branchen">
      <SectionIntro
        eyebrow="Branchen"
        title="Breit genug für mehrere Geschäftsmodelle. Klar genug, um konkrete Probleme zu lösen."
        body="Restaurants sind ein starker Einstieg. Die übergeordnete Positionierung bleibt bewusst breiter: lokale Unternehmen, E-Commerce und Dienstleister profitieren von denselben Systemhebeln."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {content.map((item, index) => {
          const Icon = icons[index] ?? Building2;

          return (
            <Reveal key={item.title} delay={index * 0.08}>
              <GlowPanel className="group h-full">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors group-hover:border-[var(--accent-border)] group-hover:bg-[var(--accent-bg)]">
                  <Icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                  {item.body}
                </p>
              </GlowPanel>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
