"use client";

import {useState, useSyncExternalStore} from "react";
import {ExternalLink, MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";

const MAP_CONSENT_KEY = "embed-consent:maps";

function subscribeStorage(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

function readMapConsent() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(MAP_CONSENT_KEY) === "1";
  } catch {
    return false;
  }
}

interface LocationMapEmbedProps {
  title: string;
  description?: string;
  embedUrl: string;
  mapsLinkUrl: string;
  openMapsLabel: string;
  mapLabel: string;
  iframeTitle: string;
  className?: string;
  mapHeightClassName?: string;
  requiresConsent?: boolean;
  consentTitle?: string;
  consentDescription?: string;
  loadEmbedLabel?: string;
}

export function LocationMapEmbed({
  title,
  description,
  embedUrl,
  mapsLinkUrl,
  openMapsLabel,
  mapLabel,
  iframeTitle,
  className,
  mapHeightClassName = "h-[320px]",
  requiresConsent = false,
  consentTitle,
  consentDescription,
  loadEmbedLabel
}: LocationMapEmbedProps) {
  const [allowedOverride, setAllowedOverride] = useState(false);
  const storedConsent = useSyncExternalStore(
    subscribeStorage,
    () => readMapConsent(),
    () => false
  );
  const allowed = !requiresConsent || allowedOverride || storedConsent;

  function allowEmbed() {
    setAllowedOverride(true);

    try {
      window.sessionStorage.setItem(MAP_CONSENT_KEY, "1");
    } catch {
      // Ignore unavailable storage and keep in-memory consent for the current page.
    }
  }

  const canRenderMap = allowed;

  return (
    <Card className={cn("surface-card gap-0 overflow-hidden border-slate-200 py-0", className)}>
      <CardHeader className="space-y-2 border-b border-slate-200/80 bg-white p-6 sm:p-7">
        <CardTitle className="text-xl text-[var(--ink-primary)]">{title}</CardTitle>
        {description ? <p className="text-sm leading-relaxed text-slate-600">{description}</p> : null}
      </CardHeader>

      <CardContent className="space-y-0 p-0">
        <div className="relative border-b border-slate-200">
          {canRenderMap ? (
            <>
              <iframe
                title={iframeTitle}
                src={embedUrl}
                className={cn("h-full w-full border-0", mapHeightClassName)}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="relative inline-flex size-14 items-center justify-center rounded-full border-2 border-[var(--accent-current)]/65 bg-white/85">
                  <span className="absolute inline-flex size-20 rounded-full border border-[var(--accent-current)]/24" />
                  <span className="absolute inline-flex size-28 rounded-full border border-[var(--accent-current)]/12" />
                  <MapPin className="size-5 text-[var(--accent-current)]" />
                </span>
              </div>
            </>
          ) : (
            <div className={cn("flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 py-6 text-center sm:px-7", mapHeightClassName)}>
              <p className="text-sm font-semibold text-[var(--ink-primary)]">{consentTitle || title}</p>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                {consentDescription || "Wenn Sie die Karte laden, wird eine Verbindung zu Google Maps aufgebaut."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button type="button" className="rounded-full bg-[var(--accent-current)] text-white hover:bg-[var(--accent-current)]/90" onClick={allowEmbed}>
                  {loadEmbedLabel || "Karte laden"}
                </Button>
                <Button asChild type="button" variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-50">
                  <a href={mapsLinkUrl} target="_blank" rel="noreferrer noopener">
                    {openMapsLabel}
                    <ExternalLink className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-7">
          <p className="text-sm text-slate-600">{mapLabel}</p>
          <Button asChild variant="outline" className="rounded-full border-slate-300 text-[var(--ink-primary)] hover:bg-slate-50">
            <a href={mapsLinkUrl} target="_blank" rel="noreferrer noopener">
              {openMapsLabel}
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
