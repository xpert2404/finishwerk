"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {HEADER_HOME_WIDE_ONLY} from "@/data/config";
import {mainNavigation} from "@/data/navigation";
import {BookingButton} from "@/components/booking/BookingButton";
import {Container} from "@/components/layout/Container";
import {HeaderMobileMenu} from "@/components/layout/HeaderMobileMenu";
import {LocaleSwitcher} from "@/components/layout/LocaleSwitcher";
import {Button} from "@/components/ui/button";
import {Link, usePathname} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

export function Header() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tUi = useTranslations("ui.labels");
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const containerSize = HEADER_HOME_WIDE_ONLY && isHomeRoute ? "hero" : "default";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <Container size={containerSize} className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="inline-flex items-center">
          <Image src="/brand/logo-wordmark-transparent.png" alt="nützliche.IT" width={185} height={32} className="h-auto w-[165px] sm:w-[185px]" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={tUi("mainNavigation")}>
          {mainNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-4 text-[13px] font-medium text-[var(--ink-primary)]",
                  active && "bg-slate-100",
                  item.highlight && "border border-[var(--accent-current)] text-[var(--accent-current)]"
                )}
              >
                <Link href={item.href}>{tNav(item.labelKey)}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <BookingButton className="rounded-full bg-[var(--accent-current)] px-5 text-white hover:bg-[var(--accent-current)]/90">
            {tCommon("ctaPrimary")}
          </BookingButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <HeaderMobileMenu />
        </div>
      </Container>
    </header>
  );
}
