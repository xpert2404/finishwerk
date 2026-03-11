# Analytics

## Goal

Track the lead funnel centrally and keep provider-specific code isolated.

## Current implementation

- Client analytics wrapper: `src/lib/analytics.ts`
- Typed event names/payloads: `src/lib/events.ts`
- GA4-ready bootstrapping: `src/components/analytics/AnalyticsProvider.tsx`
- Server-side event sink for debugging/local verification: `src/app/api/events/track/route.ts`

## Event catalog

### Recommended / core

- `generate_lead`
  - Params: `method`, `form_id`, `page_path`, `value`
  - Current status: fired on successful contact-form submission
  - TODO: fire on confirmed booking completion once Cal.com success redirect/callback is configured

### Custom

- `click_cta`
  - Params: `cta_id`, `position`, `page_path`
  - Current status: wired on booking buttons and contact-form submit flow
- `view_page_section`
  - Params: `section_id`, `page_path`
  - Current status: foundation available via `SectionTracker`; currently used on thank-you page
- `outbound_click`
  - Params: `target_domain`, `page_path`
  - Current status: wired on outbound Cal.com links inside the booking dialog
- `view_item_list`
  - Params: list-specific
  - Current status: reserved for solution/industry/use-case lists

## Environment variables

- `NEXT_PUBLIC_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## Lead flow measurement

### Path 1: contact form

1. User submits contact form
2. `src/app/api/forms/contact/route.ts` validates and forwards payload
3. Client fires `generate_lead` with `method=form`
4. User is redirected to `/danke` or `/thank-you`

### Path 2: booking

1. User clicks booking CTA
2. `click_cta` is fired
3. Embedded/external Cal.com opens
4. TODO: wire Cal.com success redirect or callback to fire `generate_lead` with `method=cal`

## Notes

- The current event API route logs events server-side for verification. It is not a replacement for a product analytics backend.
- Production rollout requires a real GA4 property ID and verification in DebugView.