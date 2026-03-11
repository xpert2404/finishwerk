"use client";

import {useSyncExternalStore} from "react";
import {Menu} from "lucide-react";
import {useTranslations} from "next-intl";
import {mainNavigation} from "@/data/navigation";
import {useBooking} from "@/components/booking/BookingProvider";
import {Button, buttonVariants} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Link} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

function subscribeNoop() {
  return () => undefined;
}

export function HeaderMobileMenu() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tUi = useTranslations("ui.labels");
  const {openBooking} = useBooking();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={tUi("openMenu")}
        disabled
        className={cn(
          buttonVariants({variant: "outline", size: "icon"}),
          "rounded-full border-slate-300 text-[var(--ink-primary)] opacity-100"
        )}
      >
        <Menu className="size-4" />
      </button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger
        aria-label={tUi("openMenu")}
        className={cn(
          buttonVariants({variant: "outline", size: "icon"}),
          "rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-50"
        )}
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm border-l border-slate-200 bg-white p-0">
        <SheetHeader className="border-b border-slate-200">
          <SheetTitle className="text-left text-[var(--ink-primary)]">nützliche.IT</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 p-5" aria-label={tUi("mobileNavigation")}>
          {mainNavigation.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="rounded-xl px-3 py-2 text-[var(--ink-primary)] transition-colors hover:bg-slate-50"
            >
              {tNav(item.labelKey)}
            </Link>
          ))}
          <Button
            type="button"
            className="mt-3 rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90"
            onClick={openBooking}
          >
            {tCommon("ctaPrimary")}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
