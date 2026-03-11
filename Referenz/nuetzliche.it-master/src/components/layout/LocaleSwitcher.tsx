"use client";

import {useLocale, useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";

export function LocaleSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
      <span className="sr-only">{t("language")}</span>
      <Button
        asChild
        variant={locale === "de" ? "default" : "ghost"}
        size="sm"
        className={locale === "de" ? "rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90" : "rounded-full text-[var(--ink-primary)]"}
      >
        <Link href={pathname} locale="de">
          DE
        </Link>
      </Button>
      <Button
        asChild
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        className={locale === "en" ? "rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90" : "rounded-full text-[var(--ink-primary)]"}
      >
        <Link href={pathname} locale="en">
          EN
        </Link>
      </Button>
    </div>
  );
}
