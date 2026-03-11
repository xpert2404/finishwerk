"use client";

import Script from "next/script";
import {useEffect, useRef} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {GA_MEASUREMENT_ID, isAnalyticsEnabled, trackPageView} from "@/lib/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);
  const search = searchParams.toString();
  const pagePath = `${pathname}${search ? `?${search}` : ""}`;

  useEffect(() => {
    if (lastTrackedPath.current === pagePath) {
      return;
    }

    lastTrackedPath.current = pagePath;
    trackPageView(pagePath);
  }, [pagePath]);

  return isAnalyticsEnabled() ? (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  ) : null;
}