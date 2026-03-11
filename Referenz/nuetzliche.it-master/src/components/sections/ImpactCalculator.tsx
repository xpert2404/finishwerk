"use client";

import {useMemo, useState} from "react";
import {BadgeCheck, Layers3} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {BeforeAfterRail} from "@/components/shared/BeforeAfterRail";
import type {BeforeAfterStep, ImpactCategory, ImpactCalculatorResult} from "@/data/types";
import {cn} from "@/lib/utils";

interface ImpactCalculatorLabels {
  kicker: string;
  title: string;
  description: string;
  categoryLabel: string;
  subcategoryLabel: string;
  volumeLabel: string;
  weeklyLabel: string;
  monthlyLabel: string;
  annualLabel: string;
  stepLabel: string;
  beforeLabel: string;
  afterLabel: string;
  assumptionsLabel: string;
  effectsLabel: string;
  assumption: string;
}

interface ImpactCalculatorProps {
  labels: ImpactCalculatorLabels;
  categories: ImpactCategory[];
  minVolumePerWeek: number;
  maxVolumePerWeek: number;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function calculateImpact(volumePerWeek: number, minutesBefore: number, minutesAfter: number): ImpactCalculatorResult {
  const savedPerItem = Math.max(minutesBefore - minutesAfter, 0);
  const weeklyHoursSaved = (volumePerWeek * savedPerItem) / 60;

  return {
    weeklyHoursSaved,
    monthlyHoursSaved: weeklyHoursSaved * 4.3,
    annualHoursSaved: weeklyHoursSaved * 52
  };
}

export function ImpactCalculator({labels, categories, minVolumePerWeek, maxVolumePerWeek}: ImpactCalculatorProps) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [subcategoryId, setSubcategoryId] = useState(categories[0]?.defaultSubcategoryId ?? "");
  const [volumePerWeek, setVolumePerWeek] = useState(
    categories[0]?.subcategories[0]?.assumptions.defaultVolumePerWeek ?? minVolumePerWeek
  );
  const selectedCategory = useMemo(() => categories.find((item) => item.id === categoryId) ?? categories[0], [categories, categoryId]);
  const selectedSubcategory = useMemo(() => {
    if (!selectedCategory) {
      return undefined;
    }

    return selectedCategory.subcategories.find((item) => item.id === subcategoryId) ?? selectedCategory.subcategories[0];
  }, [selectedCategory, subcategoryId]);

  const result = useMemo(() => {
    if (!selectedSubcategory) {
      return calculateImpact(minVolumePerWeek, 0, 0);
    }

    return calculateImpact(
      clamp(volumePerWeek, minVolumePerWeek, maxVolumePerWeek),
      selectedSubcategory.assumptions.minutesBefore,
      selectedSubcategory.assumptions.minutesAfter
    );
  }, [maxVolumePerWeek, minVolumePerWeek, selectedSubcategory, volumePerWeek]);

  if (!selectedCategory || !selectedSubcategory) {
    return null;
  }

  function handleCategoryChange(nextCategoryId: string) {
    const nextCategory = categories.find((item) => item.id === nextCategoryId);
    if (!nextCategory) {
      return;
    }

    const nextSubcategory =
      nextCategory.subcategories.find((item) => item.id === nextCategory.defaultSubcategoryId) ?? nextCategory.subcategories[0];

    setCategoryId(nextCategory.id);
    setSubcategoryId(nextSubcategory.id);
    setVolumePerWeek(nextSubcategory.assumptions.defaultVolumePerWeek);
  }

  function handleSubcategoryChange(nextSubcategoryId: string) {
    const nextSubcategory = selectedCategory.subcategories.find((item) => item.id === nextSubcategoryId);
    if (!nextSubcategory) {
      return;
    }

    setSubcategoryId(nextSubcategory.id);
    setVolumePerWeek(nextSubcategory.assumptions.defaultVolumePerWeek);
  }

  return (
    <section className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent-current)] uppercase">{labels.kicker}</p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--ink-primary)] sm:text-4xl">{labels.title}</h2>
        <p className="text-pretty text-base leading-relaxed text-slate-600">{labels.description}</p>
      </header>

      <div className="grid gap-8 xl:grid-cols-[0.42fr_0.58fr] xl:items-start">
        <article className="rounded-[30px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{labels.categoryLabel}</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = category.id === selectedCategory.id;
                  return (
                    <Button
                      key={category.id}
                      type="button"
                      variant={active ? "default" : "outline"}
                      className={cn(
                        "rounded-full",
                        active
                          ? "bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90"
                          : "border-slate-300 text-[var(--ink-primary)] hover:bg-slate-50"
                      )}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.title}
                    </Button>
                  );
                })}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{selectedCategory.description}</p>
            </div>

            <div className="space-y-2">
              <Label>{labels.subcategoryLabel}</Label>
              <div className="grid gap-2">
                {selectedCategory.subcategories.map((subcategory) => {
                  const active = subcategory.id === selectedSubcategory.id;
                  return (
                    <button
                      key={subcategory.id}
                      type="button"
                      onClick={() => handleSubcategoryChange(subcategory.id)}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-left transition-colors",
                        active
                          ? "border-[var(--accent-current)]/25 bg-[var(--accent-current)]/6"
                          : "border-slate-200 bg-slate-50/70 hover:bg-slate-100"
                      )}
                    >
                      <p className="text-sm font-semibold text-[var(--ink-primary)]">{subcategory.title}</p>
                      <p className="pt-1 text-sm leading-relaxed text-slate-600">{subcategory.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-2">
                <Label htmlFor="impact-volume">{labels.volumeLabel}</Label>
                <Input
                  id="impact-volume"
                  type="number"
                  min={minVolumePerWeek}
                  max={maxVolumePerWeek}
                  value={volumePerWeek}
                  onChange={(event) => setVolumePerWeek(clamp(Number(event.target.value), minVolumePerWeek, maxVolumePerWeek))}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.assumptionsLabel}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white px-3 py-3">
                    <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.beforeLabel}</p>
                    <p className="pt-1 text-lg font-semibold text-[var(--ink-primary)]">
                      {selectedSubcategory.assumptions.minutesBefore} min
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-3 py-3">
                    <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.afterLabel}</p>
                    <p className="pt-1 text-lg font-semibold text-[var(--ink-primary)]">
                      {selectedSubcategory.assumptions.minutesAfter} min
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.weeklyLabel}</p>
                <p className="pt-2 text-2xl font-semibold text-[var(--ink-primary)]">{result.weeklyHoursSaved.toFixed(1)} h</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.monthlyLabel}</p>
                <p className="pt-2 text-2xl font-semibold text-[var(--ink-primary)]">{result.monthlyHoursSaved.toFixed(1)} h</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/65 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.annualLabel}</p>
                <p className="pt-2 text-2xl font-semibold text-[var(--ink-primary)]">{result.annualHoursSaved.toFixed(0)} h</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
              <div className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-[var(--accent-current)]" />
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">{labels.effectsLabel}</p>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {selectedSubcategory.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <span className="mt-2 inline-flex size-1.5 rounded-full bg-[var(--accent-current)]" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs leading-relaxed text-slate-500">{labels.assumption}</p>
          </div>
        </article>

        <article className="rounded-[30px] border border-slate-200 bg-slate-50/55 p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--accent-current)]/20 bg-[var(--accent-current)]/8 text-[var(--accent-current)]">
              <Layers3 className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink-primary)]">{selectedSubcategory.title}</p>
              <p className="text-sm leading-relaxed text-slate-600">{selectedSubcategory.summary}</p>
            </div>
          </div>

          <BeforeAfterRail
            title={selectedCategory.title}
            description={selectedCategory.description}
            stepLabel={labels.stepLabel}
            beforeLabel={labels.beforeLabel}
            afterLabel={labels.afterLabel}
            steps={selectedCategory.steps as BeforeAfterStep[]}
            note={selectedCategory.note}
            surface="flat"
          />
        </article>
      </div>
    </section>
  );
}
