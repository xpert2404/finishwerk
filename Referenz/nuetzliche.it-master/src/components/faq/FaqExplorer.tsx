"use client";

import {useMemo, useState} from "react";
import {Search} from "lucide-react";
import {useTranslations} from "next-intl";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {BookingButton} from "@/components/booking/BookingButton";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Link} from "@/i18n/navigation";
import type {FAQItem} from "@/data/types";

interface FaqExplorerProps {
  faqs: FAQItem[];
}

type CategoryFilter = "all" | FAQItem["category"];

export function FaqExplorer({faqs}: FaqExplorerProps) {
  const tFaq = useTranslations("faqPage");
  const tCommon = useTranslations("common");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const categories = useMemo(
    () => [
      {id: "all" as const, label: tFaq("categories.all")},
      {id: "prozess" as const, label: tFaq("categories.process")},
      {id: "ki" as const, label: tFaq("categories.ai")},
      {id: "technik" as const, label: tFaq("categories.tech")},
      {id: "compliance" as const, label: tFaq("categories.compliance")}
    ],
    [tFaq]
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const categoryMatch = category === "all" || faq.category === category;
      if (!categoryMatch) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${faq.question} ${faq.answer}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [faqs, category, normalizedQuery]);

  return (
    <div className="surface-card rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
      <div className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={tFaq("searchPlaceholder")}
              className="h-11 rounded-xl border-slate-200 bg-white pl-10"
              aria-label={tFaq("searchPlaceholder")}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const isActive = category === item.id;
              return (
                <Button
                  key={item.id}
                  type="button"
                  variant="outline"
                  onClick={() => setCategory(item.id)}
                  className={isActive ? "rounded-full border-[var(--accent-current)] bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90 hover:text-white" : "rounded-full border-slate-300 bg-white text-[var(--ink-primary)] hover:bg-slate-50"}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
          <p>{tFaq("resultCount", {count: filteredFaqs.length})}</p>
          {category !== "all" ? <Badge className="rounded-full bg-slate-100 text-slate-600">{categories.find((item) => item.id === category)?.label}</Badge> : null}
        </div>

        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-5 sm:px-7">
            {filteredFaqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger className="text-left text-base font-medium text-[var(--ink-primary)]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
            <p className="text-lg font-semibold text-[var(--ink-primary)]">{tFaq("emptyTitle")}</p>
            <p className="pt-2 text-sm leading-relaxed text-slate-600">{tFaq("emptyText")}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-5">
              <Button type="button" variant="outline" onClick={() => {
                setQuery("");
                setCategory("all");
              }} className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-100">
                {tFaq("resetFilters")}
              </Button>
              <Button asChild variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-100">
                <Link href="/contact">{tCommon("contactNow")}</Link>
              </Button>
              <BookingButton className="rounded-full bg-[var(--accent-current)] px-6 text-white hover:bg-[var(--accent-current)]/90">
                {tCommon("ctaPrimary")}
              </BookingButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
