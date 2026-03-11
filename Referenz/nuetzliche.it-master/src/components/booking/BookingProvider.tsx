"use client";

import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {createContext, type CSSProperties, useContext, useMemo, useState, useSyncExternalStore} from "react";
import {ExternalLink, Mail, Phone, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import {CONTACT_FACTS} from "@/data/config";
import type {BookingConfig} from "@/data/types";
import {trackOutboundClick} from "@/lib/analytics";
import {cn} from "@/lib/utils";

const BOOKING_CONSENT_KEY = "embed-consent:booking";

type BookingMode = "closed" | "consent-compact" | "booking-expanded";

function subscribeStorage(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

function readBookingConsent() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(BOOKING_CONSENT_KEY) === "1";
  } catch {
    return false;
  }
}

interface BookingLabels {
  title: string;
  description: string;
  consentTitle: string;
  consentDescription: string;
  consentAction: string;
  externalAction: string;
  missingConfig: string;
  preConsentTitle?: string;
  preConsentDescription?: string;
  preConsentAction?: string;
  preConsentSecondaryAction?: string;
}

interface BookingProviderProps {
  children: React.ReactNode;
  booking: BookingConfig;
  labels: BookingLabels;
}

interface BookingContextValue {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

function isCalUrl(value: string) {
  return /^https?:\/\/(?:[^/]+\.)?cal\.(eu|com)(?:\/|$)/i.test(value);
}

function getOpenMode(hasPublicUrl: boolean, requiresConsent: boolean, hasConsent: boolean): Exclude<BookingMode, "closed"> {
  if (!hasPublicUrl) {
    return "booking-expanded";
  }

  if (requiresConsent && !hasConsent) {
    return "consent-compact";
  }

  return "booking-expanded";
}

export function BookingProvider({children, booking, labels}: BookingProviderProps) {
  const [mode, setMode] = useState<BookingMode>("closed");
  const [consentOverride, setConsentOverride] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const storedConsent = useSyncExternalStore(
    subscribeStorage,
    () => readBookingConsent(),
    () => false
  );

  const hasConsent = !booking.requiresConsent || consentOverride || storedConsent;
  const hasPublicUrl = Boolean(booking.publicUrl) && isCalUrl(booking.publicUrl);
  const hasEmbedUrl = Boolean(booking.embedUrl) && isCalUrl(booking.embedUrl);
  const canRenderEmbed = hasEmbedUrl && hasConsent;

  const value = useMemo<BookingContextValue>(
    () => ({
      openBooking: () => setMode(getOpenMode(hasPublicUrl, booking.requiresConsent, hasConsent))
    }),
    [booking.requiresConsent, hasConsent, hasPublicUrl]
  );

  function allowEmbedAndExpand() {
    setConsentOverride(true);

    try {
      window.sessionStorage.setItem(BOOKING_CONSENT_KEY, "1");
    } catch {
      // Ignore unavailable storage and keep in-memory consent for the current session.
    }

    setMode("booking-expanded");
  }

  const mobileExpandedClasses = booking.ui.modalMobileFullscreen
    ? "max-lg:inset-0 max-lg:top-0 max-lg:left-0 max-lg:h-[100dvh] max-lg:w-screen max-lg:max-w-none max-lg:max-h-none max-lg:translate-x-0 max-lg:translate-y-0 max-lg:rounded-none"
    : "max-lg:max-h-[95dvh] max-lg:rounded-2xl";

  const dialogStyle = {
    "--booking-modal-desktop-max-width": booking.ui.modalDesktopMaxWidth,
    "--booking-modal-desktop-height": booking.ui.modalDesktopHeight,
    "--booking-iframe-min-mobile": `${booking.ui.iframeMinHeightMobile}px`,
    "--booking-iframe-min-desktop": `${booking.ui.iframeMinHeightDesktop}px`,
    "--booking-consent-max-width": booking.ui.consentModalMaxWidth,
    "--booking-consent-padding": booking.ui.consentModalPadding
  } as CSSProperties;

  const transitionDuration = booking.ui.transitionDurationMs / 1000;

  return (
    <BookingContext.Provider value={value}>
      {children}

      <Dialog open={mode !== "closed"} onOpenChange={(nextOpen) => !nextOpen && setMode("closed")}>
        <DialogContent
          className="w-auto max-w-none sm:max-w-none border-0 bg-transparent p-0 shadow-none data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100"
          style={dialogStyle}
          showCloseButton={false}
        >
          <AnimatePresence initial={false} mode={prefersReducedMotion ? "sync" : "wait"}>
            <motion.div
              key={mode === "consent-compact" ? "consent" : "booking"}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? false : {opacity: 0.92, scale: 0.985}}
              animate={{opacity: 1, scale: 1}}
              exit={prefersReducedMotion ? undefined : {opacity: 0.96, scale: 0.99}}
              transition={
                prefersReducedMotion
                  ? {duration: 0}
                  : {duration: transitionDuration, ease: [0.22, 1, 0.36, 1]}
              }
              className={cn(
                "relative overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-900/20",
                mode === "consent-compact"
                  ? "w-[var(--booking-consent-max-width)] rounded-3xl"
                  : cn(
                      "flex h-[88dvh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col rounded-2xl",
                      "lg:h-[var(--booking-modal-desktop-height)] lg:w-[var(--booking-modal-desktop-max-width)] lg:max-w-none",
                      mobileExpandedClasses
                    )
              )}
            >
              <button
                type="button"
                onClick={() => setMode("closed")}
                aria-label="Close booking dialog"
                className="absolute top-4 right-4 z-20 inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>

              {mode === "consent-compact" ? (
                <div className="space-y-4 p-[var(--booking-consent-padding)] sm:p-6">
                  <DialogTitle className="pr-10 text-xl font-semibold tracking-tight text-[var(--ink-primary)]">
                    {labels.preConsentTitle || labels.consentTitle}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-slate-600">
                    {labels.preConsentDescription || labels.consentDescription}
                  </DialogDescription>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Button
                      type="button"
                      className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90"
                      onClick={allowEmbedAndExpand}
                    >
                      {labels.preConsentAction || labels.consentAction}
                    </Button>
                    {hasPublicUrl ? (
                      <Button asChild type="button" variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)]">
                        <a
                          href={booking.publicUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={() => trackOutboundClick({targetDomain: new URL(booking.publicUrl).hostname})}
                        >
                          {labels.preConsentSecondaryAction || labels.externalAction}
                          <ExternalLink className="ml-2 size-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
                    <DialogTitle className="pr-10 text-xl font-semibold text-[var(--ink-primary)]">{labels.title}</DialogTitle>
                    <DialogDescription className="pt-1 text-sm leading-relaxed text-slate-600">{labels.description}</DialogDescription>
                  </div>

                  {!hasPublicUrl ? (
                    <div className="space-y-4 p-6">
                      <p className="text-sm leading-relaxed text-slate-600">{labels.missingConfig}</p>
                      <div className="grid gap-2 text-sm text-slate-600">
                        <a href={`mailto:${CONTACT_FACTS.email}`} className="inline-flex items-center gap-2 hover:text-[var(--accent-current)]">
                          <Mail className="size-4" />
                          {CONTACT_FACTS.email}
                        </a>
                        <a href={`tel:${CONTACT_FACTS.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 hover:text-[var(--accent-current)]">
                          <Phone className="size-4" />
                          {CONTACT_FACTS.phone}
                        </a>
                      </div>
                    </div>
                  ) : canRenderEmbed ? (
                    <div className="flex min-h-0 flex-1 bg-slate-100/30">
                      <div className="min-h-0 flex-1 bg-white">
                        <iframe
                          title={labels.title}
                          src={booking.embedUrl}
                          className="h-full w-full min-h-[var(--booking-iframe-min-mobile)] border-0 bg-white lg:min-h-[var(--booking-iframe-min-desktop)]"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 p-6">
                      <p className="text-sm leading-relaxed text-slate-600">{labels.consentDescription}</p>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="button"
                          className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90"
                          onClick={allowEmbedAndExpand}
                        >
                          {labels.consentAction}
                        </Button>
                        <Button asChild type="button" variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)]">
                          <a
                            href={booking.publicUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={() => trackOutboundClick({targetDomain: new URL(booking.publicUrl).hostname})}
                          >
                            {labels.externalAction}
                            <ExternalLink className="ml-2 size-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
