"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
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
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6",
            scrolled
              ? "header-glass border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "border-transparent bg-transparent",
          )}
        >
          {/* ── Logo ── */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-black/40 ring-1 ring-white/5 transition-all duration-300 group-hover:ring-[var(--accent)]/30">
              <Image
                src="/brand/finishwerk-icon.png"
                alt="FinishWerk Icon"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-base font-semibold tracking-tight text-white transition-colors group-hover:text-[var(--accent-strong)]">
                FinishWerk
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
                Digitale Systeme
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-white"
                    : "text-[var(--muted-strong)] hover:bg-white/[0.04] hover:text-white",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0.5 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-[var(--muted-strong)] transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
              aria-label="Anrufen"
            >
              <Phone className="h-4 w-4" />
            </a>
            <BookingButton
              label={siteConfig.ctaLabel}
              variant="primary"
              className="min-w-[13rem]"
            />
          </div>

          {/* ── Mobile Menu Button ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-[var(--muted-strong)] transition-all hover:text-white"
              aria-label="Anrufen"
            >
              <Phone className="h-4 w-4" />
            </a>
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

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        items={siteConfig.navItems}
      >
        <BookingButton
          label={siteConfig.ctaLabel}
          variant="primary"
          className="w-full"
        />
      </MobileNav>
    </>
  );
}
