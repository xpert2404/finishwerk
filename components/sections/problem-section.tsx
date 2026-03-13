import {
  CircleDollarSign,
  SearchX,
  MousePointerClick,
  CalendarX,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { GlowPanel } from "@/components/ui/glow-panel";
import { SectionIntro } from "@/components/ui/section-intro";

type ProblemItem = {
  title: string;
  body: string;
};

const icons = [CircleDollarSign, SearchX, MousePointerClick, CalendarX];

export function ProblemSection({
  content,
}: {
  content: readonly ProblemItem[];
}) {
  return (
    <SectionShell id="probleme">
      <SectionIntro
        eyebrow="Kommt Ihnen das bekannt vor?"
        title="Wenn Sie sich hier wiedererkennen, sind Sie nicht allein — aber Sie können es ändern."
        body="Die meisten lokalen Unternehmen haben dieselben Probleme. Der Unterschied: Manche lösen sie. Manche nicht."
      />

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
        {content.map((item, index) => {
          const Icon = icons[index] ?? CalendarX;

          return (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              preset={index % 2 === 0 ? "fade-up" : "fade-left"}
            >
              <GlowPanel className="h-full">
                <div className="flex items-start gap-4">
                  <div className="inline-flex shrink-0 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-3">
                    <Icon className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)] sm:mt-3">
                      {item.body}
                    </p>
                  </div>
                </div>
              </GlowPanel>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
