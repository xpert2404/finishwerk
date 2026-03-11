"use client";

import type {AnalyticsEvent, AnalyticsEventName, AnalyticsEventParams, ClickCtaPayload, GenerateLeadPayload, OutboundClickPayload, SectionViewPayload} from "@/lib/events";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

function withPagePath(params: AnalyticsEventParams): AnalyticsEventParams {
  if (typeof window === "undefined") {
    return params;
  }

  return {
    page_path: window.location.pathname,
    ...params
  };
}

export function isAnalyticsEnabled() {
  return analyticsEnabled && GA_MEASUREMENT_ID.length > 0;
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = withPagePath(params);
  const event: AnalyticsEvent = {name, params: payload};

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({event: name, ...payload});

  if (isAnalyticsEnabled() && typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  void fetch("/api/events/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event),
    keepalive: true
  }).catch(() => undefined);
}

export function trackPageView(pagePath: string) {
  trackEvent("page_view", {page_path: pagePath});
}

export function trackCTA({ctaId, position, pagePath}: ClickCtaPayload) {
  trackEvent("click_cta", {cta_id: ctaId, position, page_path: pagePath});
}

export function trackLead({method, formId, pagePath, value}: GenerateLeadPayload) {
  trackEvent("generate_lead", {method, form_id: formId, page_path: pagePath, value});
}

export function trackOutboundClick({targetDomain, pagePath}: OutboundClickPayload) {
  trackEvent("outbound_click", {target_domain: targetDomain, page_path: pagePath});
}

export function trackPageSection({sectionId, pagePath}: SectionViewPayload) {
  trackEvent("view_page_section", {section_id: sectionId, page_path: pagePath});
}