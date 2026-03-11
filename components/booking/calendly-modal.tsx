"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { ModalShell } from "@/components/booking/modal-shell";
import { Button } from "@/components/ui/button";
import { CalEmbed } from "@/components/booking/calendly-embed";

type CalModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CalModal({ open, onClose }: CalModalProps) {
  return (
    <ModalShell open={open} onClose={onClose} title="Kostenloses Erstgespräch buchen">
      <div className="space-y-5">
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted-strong)]">
          Der externe Buchungsdienst wird erst in diesem Schritt geladen. Wenn
          Sie die Terminbuchung lieber in einem separaten Tab öffnen möchten,
          steht die externe Variante ebenfalls zur Verfügung.
        </p>
        <CalEmbed />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={siteConfig.booking.calUrl}
            newTab
            variant="secondary"
            className="sm:flex-1"
          >
            Extern bei Cal.com öffnen
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={onClose} className="sm:flex-1">
            Schließen
          </Button>
        </div>
      </div>
    </ModalShell>
  );
}
