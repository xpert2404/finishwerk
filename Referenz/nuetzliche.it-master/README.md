# nützliche.IT Website Relaunch

Next.js App Router implementation for the nützliche.IT relaunch.

## Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- shadcn/ui components
- next-intl (DE + EN)
- Framer Motion
- lucide-react

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_SITE_URL=https://www.nuetzliche.it
NEXT_PUBLIC_CALCOM_URL=https://cal.eu/nuetzliche-it/erstgespraech
NEXT_PUBLIC_CALCOM_EMBED_URL=https://cal.eu/nuetzliche-it/erstgespraech?embed=true
NEXT_PUBLIC_CAL_EMBED_THEME=light
NEXT_PUBLIC_ANYDESK_URL=https://get.anydesk.com
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps?q=Ringstra%C3%9Fe+1,+79541+L%C3%B6rrach&output=embed
NEXT_PUBLIC_GOOGLE_MAPS_LINK_URL=https://www.google.com/maps/search/?api=1&query=Ringstra%C3%9Fe+1,+79541+L%C3%B6rrach
NEXT_PUBLIC_GOOGLE_MAPS_LABEL=Ringstraße 1, 79541 Lörrach
```

After changing booking or maps env values, restart the dev server (`npm run dev`).

Cal.eu theming note:

- The embed URL is normalized to include `embed=true` and, by default, `theme=light`.
- If the widget still appears dark, adjust the event/branding theme in your Cal.eu dashboard.

Legacy fallback (temporary):

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/nuetzliche-it/erstgespraech
```

## Routes

Primary localized routes:

- `/de`, `/de/leistungen`, `/de/ki-datenkontrolle`, `/de/projekte`, `/de/ueber-uns`, `/de/kontakt`, `/de/impressum`, `/de/datenschutz`
- `/en`, `/en/services`, `/en/ai-data-control`, `/en/projects`, `/en/about-us`, `/en/contact`, `/en/legal-notice`, `/en/privacy-policy`

Redirect behavior:

- Unprefixed aliases redirect to DE canonical paths, for example:
  - `/services` -> `/de/leistungen`
  - `/about` and `/about-us` -> `/de/ueber-uns`
  - `/contact` -> `/de/kontakt`
  - `/legal-notice` -> `/de/impressum`
  - `/privacy-policy` -> `/de/datenschutz`
  - `/projects` -> `/de/projekte`
  - `/ai-data-control` -> `/de/ki-datenkontrolle`
- `/de/über-uns` redirects to `/de/ueber-uns`.

## Booking and embed consent

- "Erstgespräch buchen" opens an in-page modal with Cal.eu.
- Cal.eu and Google Maps embeds load only after explicit consent.

## Verification scripts

```bash
npm run verify:routes
npm run verify:text
```

## Content sources

- Structured content: `src/data`
- Translations: `src/messages`
- Reference rationale: `docs/reference-dump.md`

## SEO

- Per-page metadata (localized)
- JSON-LD (`Organization`, `ProfessionalService`, `Service`)
- `robots.ts` and `sitemap.ts`
- OG/icon based on `public/brand/logo-square-512.png`

