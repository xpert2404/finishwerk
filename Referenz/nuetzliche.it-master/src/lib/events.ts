export type AnalyticsEventName = "view_page_section" | "click_cta" | "generate_lead" | "outbound_click" | "view_item_list" | "page_view";

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  params: AnalyticsEventParams;
}

export interface ClickCtaPayload {
  ctaId: string;
  position: string;
  pagePath?: string;
}

export interface GenerateLeadPayload {
  method: "form" | "cal";
  formId?: string;
  pagePath?: string;
  value?: number;
}

export interface OutboundClickPayload {
  targetDomain: string;
  pagePath?: string;
}

export interface SectionViewPayload {
  sectionId: string;
  pagePath?: string;
}