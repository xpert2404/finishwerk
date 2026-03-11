# Rework Plan v5 (implemented)

## Scope

1. Umlaute und Encoding bereinigt.
2. Card-/Box-System vereinheitlicht.
3. Calendly auf Cal.com umgestellt.
4. Erstgespräch als In-Page-Modal mit Overlay und Consent-Gate umgesetzt.
5. DSGVO-Härtung für Drittanbieter-Embeds ergänzt.
6. KI-Seite um Nutzen + Compliance-Risiken + Schutzbedarfsbranchen erweitert.
7. React aus Außendarstellung entfernt.
8. Routing-/Locale-Hygiene verbessert und QA-Skripte ergänzt.

## Kernänderungen

- Neue Booking-Architektur in `SiteConfig`:
  - `booking` (Cal.com public/embed URL + consent)
  - `embedConsent`
- Neue Komponenten:
  - `src/components/booking/BookingProvider.tsx`
  - `src/components/booking/BookingButton.tsx`
- Maps-Embed mit Consent-Gate:
  - `src/components/shared/LocationMapEmbed.tsx`
- Locale-Layout integriert globalen Booking-Dialog:
  - `src/app/[locale]/layout.tsx`
- Kontakt, Hero, Final CTA, Header triggern Booking-Modal statt Redirect.
- About/Kontakt/Team/Services visuell neu ausbalanciert (Spacing, Min-Heights, Surface-Stil).
- Datenschutztext erweitert um Drittanbieter-Embeds, Speicher/Löschung, Rechte, Aufsichtsbehörde-Hinweis.
- Locale-Alias-Routen unter `src/app/[locale]` reduziert (duplizierte Seiten entfernt).
- Verifikationsskripte:
  - `npm run verify:routes`
  - `npm run verify:text`

## ENV

- `NEXT_PUBLIC_CALCOM_URL`
- `NEXT_PUBLIC_CALCOM_EMBED_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_LINK_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_LABEL`
- Legacy-Fallback (temporär): `NEXT_PUBLIC_CALENDLY_URL`

## QA

- `npm run lint`
- `npm run build`
- `npm run verify:routes`
- `npm run verify:text`
