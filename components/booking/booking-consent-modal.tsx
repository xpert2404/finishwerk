"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { ModalShell } from "@/components/booking/modal-shell";
import { Button } from "@/components/ui/button";

type BookingConsentModalProps = {
  open: boolean;
  onAccept: () => void;
  onClose: () => void;
};

export function BookingConsentModal({
  open,
  onAccept,
  onClose,
}: BookingConsentModalProps) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={siteConfig.booking.consentTitle}
      className="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="surface-panel-soft rounded-[1.5rem] p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] p-3">
              <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <p className="text-sm leading-7 text-[var(--muted-strong)]">
              {siteConfig.booking.consentText}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onAccept} className="sm:flex-1">
            Terminbuchung laden
          </Button>
          <Button variant="secondary" onClick={onClose} className="sm:flex-1">
            Abbrechen
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-strong)]">
          <a href={siteConfig.legal.privacyHref} className="inline-flex items-center gap-2 hover:text-white">
            Datenschutz ansehen
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </ModalShell>
  );
}
