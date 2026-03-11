"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingButton } from "@/components/booking/booking-button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-5",
            scrolled
              ? "surface-panel border-white/10"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-black/30">
              <Image
                src="/brand/finishwerk-icon.png"
                alt="FinishWerk Icon"
                fill
                className="object-cover"
                sizes="44px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-semibold tracking-tight text-white">
                FinishWerk
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Digitale Systeme
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium hover:text-white",
                  pathname === item.href
                    ? "text-white"
                    : "text-[var(--muted-strong)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <BookingButton
              label={siteConfig.ctaLabel}
              variant="primary"
              className="min-w-[13rem]"
            />
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} items={siteConfig.navItems}>
        <BookingButton
          label={siteConfig.ctaLabel}
          variant="primary"
          className="w-full"
        />
      </MobileNav>
    </>
  );
}
