"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { NavItem } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  children?: ReactNode;
};

export function MobileNav({ open, onClose, items, children }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-opacity duration-300 lg:hidden",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        className="absolute inset-0 bg-[rgba(3,7,18,0.78)] backdrop-blur-md"
        onClick={onClose}
        aria-label="Navigation schließen"
      />
      <div
        className={cn(
          "surface-panel absolute right-0 top-0 flex h-full w-full max-w-[20rem] flex-col gap-6 rounded-l-[2rem] border-l p-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            Menü
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Navigation schließen"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "rounded-2xl px-4 py-3.5 text-base font-medium transition-all duration-200",
                pathname === item.href
                  ? "surface-panel-soft border-[var(--accent-border)] text-white"
                  : "text-[var(--muted-strong)] hover:bg-white/[0.03] hover:text-white",
              )}
              style={
                open
                  ? {
                      animation: `slideInRight 0.3s ease ${0.05 + i * 0.04}s both`,
                    }
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <a
            href="tel:+491728710565"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.07]"
          >
            Jetzt anrufen
          </a>
          {children}
        </div>
      </div>
    </div>
  );
}
