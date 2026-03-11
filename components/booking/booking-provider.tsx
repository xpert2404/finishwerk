"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  type CSSProperties,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

/* ── Consent Storage ──────────────────────────── */

const CONSENT_KEY = "finishwerk.booking-consent.v1";

function subscribeStorage(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function readConsent() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(CONSENT_KEY) === "1";
  } catch {
    return false;
  }
}

/* ── Context ──────────────────────────────────── */

type BookingMode = "closed" | "consent" | "booking";

interface BookingCtx {
  openBooking: () => void;
}

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useBooking must be used within BookingProvider");
  return c;
}

/* ── Config ───────────────────────────────────── */

const cfg = siteConfig.booking;

const UI = {
  desktopMaxW: "min(98vw, 1480px)",
  desktopH: "min(94dvh, 1100px)",
  consentMaxW: "min(92vw, 460px)",
  iframeMinDesktop: 760,
  iframeMinMobile: 700,
  transition: 0.22,
} as const;

const LABELS = {
  title: "Erstgespräch buchen",
  description: "Wählen Sie einen passenden Termin — kostenlos und unverbindlich.",
  consentTitle: "Kalender laden?",
  consentBody:
    "Für die Terminanzeige wird Cal.com als externer Dienst geladen. Dabei können Daten an den Anbieter übertragen werden.",
  consentAction: "Einwilligen und öffnen",
  externalAction: "Extern öffnen",
} as const;

const EMBED_URL = `${cfg.calUrl}?embed=true&layout=month_view&theme=light`;
const PUBLIC_URL = cfg.calUrl;

/* ── Provider ─────────────────────────────────── */

export function BookingProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BookingMode>("closed");
  const [localConsent, setLocalConsent] = useState(false);
  const prefersReduced = useReducedMotion();

  const storedConsent = useSyncExternalStore(subscribeStorage, readConsent, () => false);
  const hasConsent = localConsent || storedConsent;

  const value = useMemo<BookingCtx>(
    () => ({
      openBooking: () => setMode(hasConsent ? "booking" : "consent"),
    }),
    [hasConsent],
  );

  function grantAndExpand() {
    setLocalConsent(true);
    try {
      sessionStorage.setItem(CONSENT_KEY, "1");
    } catch {
      /* storage unavailable — in-memory consent suffices */
    }
    setMode("booking");
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (mode === "closed") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mode]);

  // Close on Escape
  useEffect(() => {
    if (mode === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const vars = {
    "--bk-desktop-w": UI.desktopMaxW,
    "--bk-desktop-h": UI.desktopH,
    "--bk-consent-w": UI.consentMaxW,
    "--bk-iframe-min-m": `${UI.iframeMinMobile}px`,
    "--bk-iframe-min-d": `${UI.iframeMinDesktop}px`,
  } as CSSProperties;

  return (
    <Ctx.Provider value={value}>
      {children}

      {/* ── Modal Overlay ── */}
      <AnimatePresence>
        {mode !== "closed" && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: UI.transition }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            style={vars}
            onClick={() => setMode("closed")}
            aria-hidden="true"
          >
            {/* prevent overlay click from closing when clicking modal body */}
            <div onClick={(e) => e.stopPropagation()}>
              <AnimatePresence initial={false} mode={prefersReduced ? "sync" : "wait"}>
                <motion.div
                  key={mode === "consent" ? "consent" : "booking"}
                  role="dialog"
                  aria-modal="true"
                  aria-label={mode === "consent" ? LABELS.consentTitle : LABELS.title}
                  layout={!prefersReduced}
                  initial={prefersReduced ? false : { opacity: 0.92, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReduced ? undefined : { opacity: 0.96, scale: 0.99 }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { duration: UI.transition, ease: [0.22, 1, 0.36, 1] }
                  }
                  className={
                    mode === "consent"
                      ? "relative w-[var(--bk-consent-w)] overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-strong)] shadow-2xl"
                      : "relative flex max-h-[100dvh] w-[calc(100vw-0.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-strong)] shadow-2xl max-lg:inset-0 max-lg:h-[100dvh] max-lg:max-h-none max-lg:w-screen max-lg:max-w-none max-lg:rounded-none lg:h-[var(--bk-desktop-h)] lg:w-[var(--bk-desktop-w)] lg:max-w-none"
                  }
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setMode("closed")}
                    aria-label="Dialog schließen"
                    className="absolute right-4 top-4 z-20 inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-4" />
                  </button>

                  {mode === "consent" ? (
                    /* ── Consent Compact ── */
                    <div className="space-y-4 p-6">
                      <h2 className="pr-10 text-xl font-semibold tracking-tight text-white">
                        {LABELS.consentTitle}
                      </h2>
                      <p className="text-sm leading-relaxed text-[var(--muted-strong)]">
                        {LABELS.consentBody}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <Button onClick={grantAndExpand} variant="primary">
                          {LABELS.consentAction}
                        </Button>
                        <Button
                          href={PUBLIC_URL}
                          newTab
                          variant="secondary"
                        >
                          {LABELS.externalAction}
                          <ExternalLink className="ml-2 size-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* ── Booking Expanded ── */
                    <>
                      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6 sm:py-5">
                        <h2 className="pr-10 text-xl font-semibold text-white">
                          {LABELS.title}
                        </h2>
                        <p className="pt-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                          {LABELS.description}
                        </p>
                      </div>

                      {hasConsent ? (
                        <div className="flex min-h-0 flex-1">
                          <div className="min-h-0 flex-1 bg-white">
                            <iframe
                              title={LABELS.title}
                              src={EMBED_URL}
                              className="h-full w-full min-h-[var(--bk-iframe-min-m)] border-0 bg-white lg:min-h-[var(--bk-iframe-min-d)]"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 p-6">
                          <p className="text-sm leading-relaxed text-[var(--muted-strong)]">
                            {LABELS.consentBody}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button onClick={grantAndExpand} variant="primary">
                              {LABELS.consentAction}
                            </Button>
                            <Button href={PUBLIC_URL} newTab variant="secondary">
                              {LABELS.externalAction}
                              <ExternalLink className="ml-2 size-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* External link at bottom of booking view */}
                      <div className="flex items-center justify-end border-t border-white/[0.06] px-5 py-3">
                        <a
                          href={PUBLIC_URL}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] transition-colors hover:text-white"
                        >
                          In Cal.com öffnen
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
