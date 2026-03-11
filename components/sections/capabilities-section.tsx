import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

export function CapabilitiesSection({
  content,
}: {
  content: readonly string[];
}) {
  return (
    <SectionShell id="leistungen">
      <SectionIntro
        eyebrow="Systembausteine"
        title="Die Leistungen sind Bausteine. Entscheidend ist, wie sie zusammenspielen."
        body="FinishWerk liefert Websites, Shops, SEO, Bestellsysteme, Social und Infrastruktur nicht als lose Services, sondern als präzise zusammengesetztes System."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {content.map((item, index) => (
          <Reveal key={item} delay={index * 0.05}>
            <GlowPanel soft className="h-full">
              <p className="font-medium text-white">{item}</p>
            </GlowPanel>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
