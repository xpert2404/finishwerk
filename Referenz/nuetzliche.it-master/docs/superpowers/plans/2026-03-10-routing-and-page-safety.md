# Routing And Page Safety Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore canonical localized routing, preserve explicit alias redirects, and harden affected localized pages so the app builds and renders cleanly in both locales.

**Architecture:** Move request normalization into a single Next 16 `proxy.ts` entrypoint that resolves explicit aliases before delegating to `next-intl`. Keep canonical pathnames in `src/i18n/routing.ts`, keep compatibility lookups in `src/lib/routes.ts`, and add page-level message guards where `t.raw(...)` currently assumes data shape. Verification stays layered across route checks, Playwright routing/smoke tests, and production build.

**Tech Stack:** Next.js 16, next-intl, TypeScript, Playwright, Node verification scripts

---

## Chunk 1: Route Contract, Proxy Migration, And Page Hardening

### File Structure

- Create: `proxy.ts` - single request entrypoint for alias redirects and `next-intl` delegation
- Delete: `middleware.ts` - remove the temporary bypass layer so only one request entrypoint remains
- Modify: `src/lib/routes.ts` - explicit compatibility maps, helper contract cleanup, locale resolution support where needed by proxy/tests
- Modify: `src/i18n/routing.ts` - keep canonical localized pathnames aligned with the route contract
- Modify: `scripts/verify-locale-routing.mjs` - derive checks from canonical/alias sources and assert root + alias behavior
- Modify: `tests/routing.spec.ts` - expand redirect/canonical route coverage for all in-scope routes and root locale negotiation
- Modify: `tests/smoke.spec.ts` - ensure all canonical pages remain reachable in both desktop and mobile projects
- Modify: `src/app/[locale]/page.tsx` - keep homepage composition stable after message-shape hardening
- Modify: `src/components/sections/Hero.tsx` - only if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/components/sections/ImpactSection.tsx` - guard localized impact payload access before using nested properties
- Modify: `src/components/sections/Services.tsx` - only if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/components/sections/CaseStudy.tsx` - only if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/components/sections/FinalCTA.tsx` - only if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/app/[locale]/about/page.tsx` - validate required localized arrays/objects before iteration
- Modify: `src/app/[locale]/ai-data-control/page.tsx` - validate required `t.raw(...)` structures before use
- Modify: `src/app/[locale]/projects/page.tsx` - keep localized case-study rendering stable and explicit
- Modify: `src/app/[locale]/services/page.tsx` - verify metadata/content access still matches canonical routing after proxy migration
- Modify: `src/app/[locale]/contact/page.tsx` - verify metadata/content path remains build-safe
- Modify: `src/app/[locale]/faq/page.tsx` - verify metadata/content path remains build-safe
- Modify: `src/app/[locale]/legal-notice/page.tsx` - verify metadata/content path remains build-safe
- Modify: `src/app/[locale]/privacy-policy/page.tsx` - verify metadata/content path remains build-safe
- Optional Create: `src/lib/messages.ts` - only if a small shared validator/guard helper reduces duplication across `about`, `ai-data-control`, and homepage sections without adding a new abstraction layer that is broader than this repair

### Task 1: Lock The Routing Contract In Tests First

**Files:**
- Modify: `tests/routing.spec.ts`
- Modify: `scripts/verify-locale-routing.mjs`
- Reference: `docs/superpowers/specs/2026-03-10-routing-and-page-safety-design.md`

- [ ] **Step 1: Expand the failing route matrix in Playwright**

Add redirect cases for:

```ts
const redirectChecks = [
  {path: '/', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en', status: 307},
  {path: '/', headers: {'accept-language': 'de-DE,de;q=0.9'}, expected: '/de', status: 307},
  {path: '/services', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/leistungen', status: 307},
  {path: '/services', headers: {cookie: 'NEXT_LOCALE=en', 'accept-language': 'de-DE,de;q=0.9'}, expected: '/en/services', status: 307},
  {path: '/services', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/services', status: 307},
  {path: '/leistungen', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/services', status: 307},
  {path: '/about', headers: {'accept-language': 'en-US,en;q=0.9'}, expected: '/en/about-us', status: 307},
  {path: '/about-us', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/ueber-uns', status: 307},
  {path: '/ueber-uns', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/ueber-uns', status: 307},
  {path: '/projects', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/projekte', status: 307},
  {path: '/projekte', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/projects', status: 307},
  {path: '/contact', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/kontakt', status: 307},
  {path: '/kontakt', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/contact', status: 307},
  {path: '/legal-notice', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/impressum', status: 307},
  {path: '/impressum', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/legal-notice', status: 307},
  {path: '/privacy-policy', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/privacy-policy', status: 307},
  {path: '/datenschutz', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/datenschutz', status: 307},
  {path: '/faq', headers: {cookie: 'NEXT_LOCALE=en'}, expected: '/en/faq', status: 307},
  {path: '/de/services', expected: '/de/leistungen', status: 308},
  {path: '/en/leistungen', expected: '/en/services', status: 308},
  {path: '/de/about', expected: '/de/ueber-uns', status: 308},
  {path: '/de/about-us', expected: '/de/ueber-uns', status: 308},
  {path: '/en/ueber-uns', expected: '/en/about-us', status: 308},
  {path: '/de/projects', expected: '/de/projekte', status: 308},
  {path: '/en/projekte', expected: '/en/projects', status: 308},
  {path: '/de/legal-notice', expected: '/de/impressum', status: 308},
  {path: '/en/impressum', expected: '/en/legal-notice', status: 308},
  {path: '/de/privacy-policy', expected: '/de/datenschutz', status: 308},
  {path: '/en/datenschutz', expected: '/en/privacy-policy', status: 308}
];

const fallbackChecks = [
  {path: '/', headers: {'accept-language': 'fr-FR,fr;q=0.9'}, expected: '/de', status: 307},
  {path: '/services', headers: {cookie: 'NEXT_LOCALE=fr'}, expected: '/de/leistungen', status: 307}
];

const queryChecks = [
  {path: '/services?x=1', headers: {cookie: 'NEXT_LOCALE=de'}, expected: '/de/leistungen?x=1', status: 307}
];

const notFoundChecks = [
  '/de/unknown-route',
  '/en/not-a-real-page',
  '/fr/services'
];

const okChecks = [
  '/de', '/en',
  '/de/leistungen', '/en/services',
  '/de/ki-datenkontrolle', '/en/ai-data-control',
  '/de/projekte', '/en/projects',
  '/de/ueber-uns', '/en/about-us',
  '/de/kontakt', '/en/contact',
  '/de/impressum', '/en/legal-notice',
  '/de/datenschutz', '/en/privacy-policy',
  '/de/faq', '/en/faq'
];
```

- [ ] **Step 2: Run the routing test to prove the current implementation fails**

Run: `npx playwright test tests/routing.spec.ts --project=desktop-chromium`

Expected: FAIL on root negotiation and/or alias redirects because the current request entrypoint bypasses custom route compatibility.

- [ ] **Step 3: Strengthen the route verification script to match the spec**

Update `scripts/verify-locale-routing.mjs` so it:

- checks `/` with cookie/header negotiation
- checks default-to-`de` fallback when no supported locale is present
- checks canonical DE/EN routes for every in-scope page
- checks legal/privacy alias redirects
- derives its assertions from `src/i18n/routing.ts` and `src/lib/routes.ts` instead of inventing a third route matrix
- checks unsupported paths resolve to not found instead of guessed redirects
- preserves query strings on redirect assertions, e.g. `/services?source=test` -> `/de/leistungen?source=test`
- continues accepting only `307` or `308`, but asserts the expected status per case when you add route-specific expectations

Suggested assertion shape:

```js
async function expectRedirect(pathname, expectedLocation, expectedStatus, headers = {}) {
  const response = await request(pathname, headers);
  assert(response.status === expectedStatus, `${pathname} should redirect with ${expectedStatus}, got ${response.status}`);
  assert(response.headers.get('location') === expectedLocation, `${pathname} should redirect to ${expectedLocation}, got ${response.headers.get('location')}`);
}
```

- [ ] **Step 4: Run the route verification script and confirm it fails before implementation**

Run: `npm run verify:routes`

Expected: FAIL before the proxy migration, with at least one redirect mismatch or unsupported-path behavior mismatch surfacing the current routing problem.

- [ ] **Step 5: Record the route contract inline in comments only where ambiguity would otherwise survive**

Add minimal comments only if needed around the route matrices or redirect-status distinctions; do not add narrative comments to every case.

- [ ] **Step 6: Checkpoint commit only if the user explicitly requests git commits**

Run if requested: `git add tests/routing.spec.ts scripts/verify-locale-routing.mjs && git commit -m "test: expand localized route contract coverage"`

### Task 2: Replace The Bypassed Middleware With A Single Proxy Entry Layer

**Files:**
- Create: `proxy.ts`
- Delete: `middleware.ts`
- Modify: `src/lib/routes.ts`
- Modify: `src/i18n/routing.ts`

- [ ] **Step 1: Write the minimal proxy flow against the approved contract**

Implement `proxy.ts` with this shape:

```ts
import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from '@/i18n/routing';
import {getAliasTarget, getLocalizedPath, getPrefixedAliasRedirect, resolveLocaleForUnprefixedPath} from '@/lib/routes';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (pathname === '/') {
    const locale = resolveLocaleForUnprefixedPath(request);
    return redirectWithStatus(request, getLocalizedPath('home', locale), 307);
  }

  const prefixedRedirect = getPrefixedAliasRedirect(pathname);
  if (prefixedRedirect) return redirectWithStatus(request, prefixedRedirect, 308);

  const unprefixedTarget = getAliasTarget(pathname);
  if (unprefixedTarget) {
    const locale = resolveLocaleForUnprefixedPath(request);
    return redirectWithStatus(request, unprefixedTarget[locale], 307);
  }

  return handleI18nRouting(request);
}
```

The helper that builds redirects must preserve query strings.

- [ ] **Step 2: Add the proxy matcher config so internal requests are excluded**

Export a matcher equivalent to the approved scope:

```ts
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
```

This keeps static assets, framework internals, and API routes out of the compatibility logic.

- [ ] **Step 3: Remove the old middleware entrypoint**

Delete `middleware.ts` after `proxy.ts` is in place so the app no longer has a dead compatibility layer with misleading logic.

- [ ] **Step 4: Refactor `src/lib/routes.ts` so the helper contract is explicit and boring**

Ensure the file exposes only the helpers the spec committed to:

```ts
export function getLocalizedPath(route: RouteKey, locale: Locale): string;
export function getAliasTarget(pathname: string): Record<Locale, string> | undefined;
export function getPrefixedAliasRedirect(pathname: string): string | undefined;
export function resolveLocaleForUnprefixedPath(request: NextRequest): Locale;
```

Implementation details:

- keep canonical route keys aligned with `src/i18n/routing.ts`
- keep alias maps explicit, no fuzzy matching
- preserve support for encoded and ASCII German variants already intentionally handled
- normalize trailing slashes before lookup

- [ ] **Step 5: Verify `src/i18n/routing.ts` remains the canonical pathname source**

Do not move canonical public paths into `src/lib/routes.ts`. If you need duplication reduction, derive route helpers from the existing canonical map rather than redefining it again.

- [ ] **Step 6: Run the focused routing test and make it pass**

Run: `npx playwright test tests/routing.spec.ts --project=desktop-chromium`

Expected: PASS for canonical route hits, root locale negotiation, and explicit alias redirects.

- [ ] **Step 7: Run the route verification script and make it pass**

Run: `npm run verify:routes`

Expected: PASS with a final success line covering the full redirect + canonical matrix.

- [ ] **Step 8: Checkpoint commit only if the user explicitly requests git commits**

Run if requested: `git add proxy.ts middleware.ts src/lib/routes.ts src/i18n/routing.ts tests/routing.spec.ts scripts/verify-locale-routing.mjs && git commit -m "fix: restore localized route compatibility"`

### Task 3: Harden Page-Level Localized Data Access Where Build Failures Can Happen

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/components/sections/Hero.tsx` if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/components/sections/ImpactSection.tsx`
- Modify: `src/components/sections/Services.tsx` if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/components/sections/CaseStudy.tsx` if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/components/sections/FinalCTA.tsx` if the homepage audit finds unsafe structured locale payload access there
- Modify: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/[locale]/ai-data-control/page.tsx`
- Modify: `src/app/[locale]/projects/page.tsx`
- Optional Create/Modify: `src/lib/messages.ts`

- [ ] **Step 1: Reproduce the current build failure before changing page safety code**

Run: `npm run build`

Expected: FAIL with the current prerender error around undefined localized content access on `/de` or another affected localized page.

- [ ] **Step 2: Add the smallest possible shared guard helper only if duplication is already obvious**

If three or more files need the same exact message-shape assertions, create a tiny helper like:

```ts
export function assertArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}
```

If the callsites are all slightly different, keep the guards page-local instead of creating a generic utility kitchen sink.

- [ ] **Step 3: Harden homepage-impact localized payloads first**

In `src/components/sections/ImpactSection.tsx`, validate the value from `tHome.raw('impact.categories')` before `buildCategories(...)` reads nested properties.

Target shape:

```ts
const rawCategories = tHome.raw('impact.categories');
const labels = assertImpactCategoryMessages(rawCategories, locale);
const categories = buildCategories(site.impactCalculator.categories, labels);
```

If required IDs are missing, throw a clear error naming the missing category/key so the build fails at the correct callsite.

- [ ] **Step 4: Audit homepage composition so the root route cannot fail somewhere else**

Check `src/app/[locale]/page.tsx` and the homepage sections it composes (`HeroSection`, `ImpactSection`, `ServicesSection`, `CaseStudySection`, `FinalCTASection`) for any other `t.raw(...)`-driven payloads that are required during prerender.

Expected action:

- if another homepage section has required structured payloads, validate them at the section boundary now
- if a section reads only scalar translation keys, leave it unchanged

- [ ] **Step 5: Verify homepage metadata stays build-safe**

Check `src/app/[locale]/page.tsx` `generateMetadata(...)` and confirm the `metadata.home` namespace is used consistently for both locales and still resolves after the routing/proxy migration.

Done means `/de` and `/en` metadata generation succeeds during `npm run build` without locale-specific namespace failures.

- [ ] **Step 6: Harden `about` page arrays and objects before iteration**

Validate:

- `t.raw('values')`
- `t.raw('experienceBlock')`
- `t.raw('work.steps')`

Expected behavior:

- malformed required payload -> clear error at `about` page assembly
- empty but valid arrays -> render zero items without crashing

- [ ] **Step 7: Harden `ai-data-control` page raw payload reads**

Validate the required shapes for:

- `useCases`
- `benefits`
- `governance`
- `timeline`
- `qualityAssurance`
- `nonLocalAiRisks`
- `protectedSectors`
- `beforeAfter.steps`

Keep the validation boundary in the page file unless the exact checks are truly shared.

- [ ] **Step 8: Harden and verify `projects` localized case-study rendering**

Confirm `getCaseStudies(locale)` always returns an iterable array, keep `src/app/[locale]/projects/page.tsx` tolerant of non-published entries, and verify the page still renders the expected localized heading in both locales after the guard changes.

- [ ] **Step 9: Re-run the production build and make it pass**

Run: `npm run build`

Expected: PASS with both locales prerendering successfully and no `undefined.title`-style failures.

- [ ] **Step 10: Checkpoint commit only if the user explicitly requests git commits**

Run if requested: `git add src/app/[locale]/page.tsx src/components/sections/ImpactSection.tsx src/app/[locale]/about/page.tsx src/app/[locale]/ai-data-control/page.tsx src/app/[locale]/projects/page.tsx src/lib/messages.ts && git commit -m "fix: harden localized page data access"`

If no shared helper is added, omit `src/lib/messages.ts` from the command.

### Task 4: Verify Canonical Pages End-To-End In Production Shape

**Files:**
- Modify: `tests/smoke.spec.ts`
- Modify: `src/app/[locale]/services/page.tsx`
- Modify: `src/app/[locale]/contact/page.tsx`
- Modify: `src/app/[locale]/faq/page.tsx`
- Modify: `src/app/[locale]/legal-notice/page.tsx`
- Modify: `src/app/[locale]/privacy-policy/page.tsx`
- Modify: `src/app/[locale]/ai-data-control/page.tsx`
- Modify: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/[locale]/projects/page.tsx`

- [ ] **Step 1: Expand smoke coverage to every canonical route that should render in production**

Add page cases so `tests/smoke.spec.ts` covers, at minimum:

```ts
const pages = [
  {name: 'home-de', path: '/de', heading: /Software, die passt/i},
  {name: 'home-en', path: '/en', heading: /Software that fits/i},
  {name: 'services-de', path: '/de/leistungen', heading: /Leistungen mit klarem Einsatzbild/i},
  {name: 'services-en', path: '/en/services', heading: /Services with a clear use case/i},
  {name: 'about-de', path: '/de/ueber-uns', heading: /Über 10 Jahre gebündelte Erfahrung im Team/i},
  {name: 'about-en', path: '/en/about-us', heading: /Over 10 years of combined team experience/i},
  {name: 'projects-de', path: '/de/projekte', heading: /Ausgewählte Fallbeispiele/i},
  {name: 'projects-en', path: '/en/projects', heading: /Selected case examples/i},
  {name: 'contact-de', path: '/de/kontakt', heading: /Schnell klären, sauber starten/i},
  {name: 'contact-en', path: '/en/contact', heading: /Clarify quickly, start cleanly/i},
  {name: 'faq-de', path: '/de/faq', heading: /Fragen, die im Erstgespräch häufig gestellt werden/i},
  {name: 'faq-en', path: '/en/faq', heading: /Questions we hear most in intro calls/i},
  {name: 'legal-de', path: '/de/impressum', heading: /Angaben gemäß §5 TMG/i},
  {name: 'legal-en', path: '/en/legal-notice', heading: /Information according to §5 TMG/i},
  {name: 'privacy-de', path: '/de/datenschutz', heading: /Informationen zur Datenverarbeitung/i},
  {name: 'privacy-en', path: '/en/privacy-policy', heading: /Information on data processing/i},
  {name: 'ai-de', path: '/de/ki-datenkontrolle', heading: /Lokale KI-Lösungen mit klaren Prozessgrenzen/i},
  {name: 'ai-en', path: '/en/ai-data-control', heading: /Local AI solutions with explicit process boundaries/i}
];
```

Use exact headings from the current localized message files rather than placeholder text.

- [ ] **Step 2: Run smoke tests in one browser project before touching page files further**

Run: `npx playwright test tests/smoke.spec.ts --project=desktop-chromium`

Expected: FAIL if any canonical localized page still falls into not-found or crashes during runtime.

- [ ] **Step 3: Verify and fix `services` metadata and runtime rendering**

Check `src/app/[locale]/services/page.tsx` for correct metadata namespace usage and confirm `/de/leistungen` plus `/en/services` render the expected heading.

- [ ] **Step 4: Verify and fix `contact` metadata and runtime rendering**

Check `src/app/[locale]/contact/page.tsx` for correct metadata namespace usage and confirm `/de/kontakt` plus `/en/contact` render the expected heading.

- [ ] **Step 5: Verify and fix `faq` metadata and runtime rendering**

Check `src/app/[locale]/faq/page.tsx` for correct metadata namespace usage and confirm `/de/faq` plus `/en/faq` render the expected heading.

- [ ] **Step 6: Verify and fix `legal-notice` metadata and runtime rendering**

Check `src/app/[locale]/legal-notice/page.tsx` for correct metadata namespace usage and confirm `/de/impressum` plus `/en/legal-notice` render the expected heading.

- [ ] **Step 7: Verify and fix `privacy-policy` metadata and runtime rendering**

Check `src/app/[locale]/privacy-policy/page.tsx` for correct metadata namespace usage and confirm `/de/datenschutz` plus `/en/privacy-policy` render the expected heading.

- [ ] **Step 8: Verify runtime rendering remains stable for `ai-data-control`, `about`, and `projects`**

Confirm `/de/ki-datenkontrolle`, `/en/ai-data-control`, `/de/ueber-uns`, `/en/about-us`, `/de/projekte`, and `/en/projects` still render their expected headings after the earlier hardening work.

- [ ] **Step 9: Fix build-time metadata or prerender regressions exposed by verification**

If `npm run build` still fails after the smoke and metadata fixes, repair only the listed route/page files or the shared localized-data guards owned by this chunk until prerender succeeds for both locales.

Done means the build completes without metadata lookup errors, missing namespace crashes, or nested-property failures from localized payloads.

- [ ] **Step 10: Run the full verification sequence**

Run in order:

1. `npm run lint`
2. `npm run verify:routes`
3. `npm run build`
4. `npm run test:e2e`

Expected:

- `eslint` exits with code 0
- route verification prints a pass summary
- production build succeeds
- Playwright finishes with all tests passing on desktop and mobile

If any step fails, fix the failing route/page/metadata issue in the files owned by this chunk and rerun the full sequence until all four commands pass in order.

- [ ] **Step 11: Checkpoint commit only if the user explicitly requests git commits**

Run if requested: `git add tests/smoke.spec.ts src/app/[locale]/services/page.tsx src/app/[locale]/contact/page.tsx src/app/[locale]/faq/page.tsx src/app/[locale]/legal-notice/page.tsx src/app/[locale]/privacy-policy/page.tsx src/app/[locale]/ai-data-control/page.tsx src/app/[locale]/about/page.tsx src/app/[locale]/projects/page.tsx && git commit -m "test: verify localized pages in production flow"`
