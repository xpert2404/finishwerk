import {Container} from "@/components/layout/Container";
import {ImpactCalculator} from "@/components/sections/ImpactCalculator";
import {Reveal} from "@/components/shared/Reveal";
import {getSiteConfig} from "@/data/config";
import type {BeforeAfterStep, ImpactCategory, ImpactCategoryProfile, Locale} from "@/data/types";
import {getTranslations} from "next-intl/server";

interface ImpactSectionProps {
  locale: Locale;
}

interface ImpactCategoryMessages {
  title: string;
  description: string;
  note: string;
  steps: BeforeAfterStep[];
  subcategories: Record<
    string,
    {
      title: string;
      summary: string;
      outcomes: string[];
    }
  >;
}

function buildCategories(
  profiles: ImpactCategoryProfile[],
  labels: Record<string, ImpactCategoryMessages>
): ImpactCategory[] {
  return profiles.map((category) => {
    const labelSet = labels[category.id];

    return {
      id: category.id,
      title: labelSet.title,
      description: labelSet.description,
      note: labelSet.note,
      steps: labelSet.steps,
      defaultSubcategoryId: category.defaultSubcategoryId,
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        title: labelSet.subcategories[subcategory.id].title,
        summary: labelSet.subcategories[subcategory.id].summary,
        outcomes: labelSet.subcategories[subcategory.id].outcomes,
        assumptions: subcategory.assumptions
      }))
    };
  });
}

export async function ImpactSection({locale}: ImpactSectionProps) {
  const tHome = await getTranslations({locale, namespace: "home"});
  const site = getSiteConfig();
  const categories = buildCategories(
    site.impactCalculator.categories,
    tHome.raw("impact.categories") as Record<string, ImpactCategoryMessages>
  );

  return (
    <section className="border-y border-slate-200 bg-slate-50/65 py-16 sm:py-20">
      <Container>
        <Reveal preset="soft-parallax">
          <ImpactCalculator
            labels={{
              kicker: tHome("impact.kicker"),
              title: tHome("impact.title"),
              description: tHome("impact.description"),
              categoryLabel: tHome("impact.categoryLabel"),
              subcategoryLabel: tHome("impact.subcategoryLabel"),
              volumeLabel: tHome("impact.volumeLabel"),
              weeklyLabel: tHome("impact.results.weekly"),
              monthlyLabel: tHome("impact.results.monthly"),
              annualLabel: tHome("impact.results.annual"),
              stepLabel: tHome("impact.stepLabel"),
              beforeLabel: tHome("impact.beforeLabel"),
              afterLabel: tHome("impact.afterLabel"),
              assumptionsLabel: tHome("impact.assumptionsLabel"),
              effectsLabel: tHome("impact.effectsLabel"),
              assumption: tHome("impact.assumption")
            }}
            categories={categories}
            minVolumePerWeek={site.impactCalculator.minVolumePerWeek}
            maxVolumePerWeek={site.impactCalculator.maxVolumePerWeek}
          />
        </Reveal>
      </Container>
    </section>
  );
}
