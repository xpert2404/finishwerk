"use client";

import Link from "next/link";
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
  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-opacity duration-300 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        className="absolute inset-0 bg-[rgba(3,7,18,0.72)] backdrop-blur-sm"
        onClick={onClose}
        aria-label="Navigation schließen"
      />
      <div
        className={cn(
          "surface-panel absolute right-0 top-0 flex h-full w-full max-w-sm flex-col gap-8 rounded-l-[2rem] border-l p-6 transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            Navigation
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

        <nav className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="surface-panel-soft rounded-2xl px-4 py-4 text-lg font-medium text-white hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
}
