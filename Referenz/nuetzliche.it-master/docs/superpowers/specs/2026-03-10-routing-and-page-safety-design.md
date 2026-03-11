# Routing And Page Safety Design

## Goal

Repair localized routing and harden the affected pages so that canonical German and English URLs render consistently, legacy aliases redirect cleanly, and the site builds without locale-specific runtime failures.

## Problem Statement

The current site has three related failures:

1. The custom route normalization layer is effectively disabled because `middleware.ts` returns the `next-intl` handler immediately.
2. Public localized URLs and legacy aliases are defined in more than one place, which makes it easy for redirects, rewrites, and page files to drift apart.
3. Some pages still rely on optimistic data assumptions during prerendering, which makes the build fail instead of degrading predictably.

This shows up as broken URLs such as `/de/leistungen` and `/de/ueber-uns` depending on environment behavior, plus a prerender failure on `/de` caused by unchecked localized content access.

## Scope

In scope:

- Restore canonical localized routing for `home`, `services`, `ai-data-control`, `projects`, `about`, `contact`, `legal-notice`, `privacy-policy`, and `faq`
- Preserve clear legacy redirects for known alias paths like `/services`, `/leistungen`, `/de/services`, `/en/leistungen`, `/about`, `/de/about`, `/en/ueber-uns`
- Move the request entrypoint to a Next 16 compatible proxy implementation
- Keep `next-intl` pathnames as the source of canonical public routes
- Rework route helper usage so aliases, canonical rewrites, and tests are aligned
- Harden the affected pages and localized content access so `npm run build` succeeds
- Add verification coverage for routing, rendering, and build safety

Out of scope:

- Redesigning page layouts or marketing copy
- Adding new public routes
- Introducing fuzzy typo correction beyond already intentional aliases
- Replacing the overall i18n stack

## Success Criteria

- `/de/leistungen`, `/en/services`, `/de/ueber-uns`, `/en/about-us`, `/de/projekte`, and `/en/projects` render directly
- Supported alias paths redirect to the canonical localized URL with no loops
- Unsupported or ambiguous paths return not found instead of being guessed
- `about`, `services`, `projects`, and the homepage render in both locales during build and runtime
- `home`, `services`, `ai-data-control`, `projects`, `about`, `contact`, `legal-notice`, `privacy-policy`, and `faq` render in both locales during build and runtime where canonical localized routes exist
- `npm run build`, `npm run test:e2e`, and `npm run verify:routes` pass

## Source Of Truth

Canonical public routes stay defined in `src/i18n/routing.ts`.

The route helper layer in `src/lib/routes.ts` becomes a derivative mapping with two responsibilities only:

1. Resolve known legacy or mixed-language aliases to canonical localized URLs
2. Provide helper accessors for tests, metadata, and navigation code that need canonical path lookups

The design avoids maintaining two competing canonical matrices. `src/i18n/routing.ts` owns public localized pathnames; `src/lib/routes.ts` owns compatibility behavior around those pathnames.

## Canonical Route Set

The routing spec covers this closed set of canonical localized public routes:

| Route key | German | English |
|----------|--------|---------|
| `home` | `/de` | `/en` |
| `services` | `/de/leistungen` | `/en/services` |
| `ai-data-control` | `/de/ki-datenkontrolle` | `/en/ai-data-control` |
| `projects` | `/de/projekte` | `/en/projects` |
| `about` | `/de/ueber-uns` | `/en/about-us` |
| `contact` | `/de/kontakt` | `/en/contact` |
| `legal-notice` | `/de/impressum` | `/en/legal-notice` |
| `privacy-policy` | `/de/datenschutz` | `/en/privacy-policy` |
| `faq` | `/de/faq` | `/en/faq` |

Legacy compatibility is only supported for explicit aliases that map into this set.

## Locale Resolution Contract

Unprefixed aliases must resolve locale using the same explicit precedence everywhere:

1. locale prefix in the incoming pathname, if one exists
2. `NEXT_LOCALE` cookie, if valid
3. `accept-language` header using the existing German/English matching logic
4. default locale `de`

This contract applies to root entry, unprefixed alias redirects, and route verification tests. The implementation must not invent route-specific exceptions.

Expected outcomes for locale negotiation examples:

- `accept-language: en-US,en;q=0.9` -> `en`
- `accept-language: de-DE,de;q=0.9` -> `de`
- `accept-language: fr-FR,fr;q=0.9` with no valid locale cookie -> fallback `de`
- valid `NEXT_LOCALE=en` cookie beats `accept-language: de-DE,de;q=0.9` on unprefixed alias redirects

## Redirect Policy

- Locale-dependent redirects for `/` and unprefixed aliases use `307` so user-specific locale negotiation is not cached as a permanent global answer
- Deterministic prefixed alias redirects use `308` because the source and target are fixed for all users
- Redirects preserve query strings and drop only redundant trailing slashes during pathname normalization

For planning and tests, that means:

- `/` and unprefixed aliases should behave like temporary redirects
- prefixed mixed-language aliases should behave like `308` permanent redirects
- `/services?x=1` must become the locale-resolved canonical target with `?x=1` preserved

## Architecture

### 1. Request Entry Layer

The request entrypoint moves from the current bypassed `middleware.ts` flow to a Next 16 compatible `proxy.ts` flow.

Processing order:

1. Normalize the incoming pathname by trimming a trailing slash except for `/`
2. Ignore internal static, API, and asset requests via matcher rules
3. Check whether the normalized pathname is a known prefixed or unprefixed alias
4. If an alias has an unambiguous canonical target, return a redirect immediately
5. Otherwise pass the request into the `next-intl` routing handler
6. Let unknown routes fall through to the app not-found behavior

This keeps compatibility logic small and deterministic: redirects happen before `next-intl`, and canonical localized rendering stays inside `next-intl`.

### 2. Compatibility Mapping Layer

`src/lib/routes.ts` keeps explicit maps for:

- unprefixed aliases like `/services`, `/leistungen`, `/about`, `/ueber-uns`
- prefixed aliases like `/de/services`, `/en/leistungen`, `/de/about`, `/en/ueber-uns`

Each entry must resolve to exactly one canonical public URL. No heuristic matching is introduced. If a path is not in the map, it is not rewritten by compatibility code.

The compatibility boundary exposed to `proxy.ts`, tests, and supporting scripts is:

- `getLocalizedPath(routeKey, locale) -> string`
- `getAliasTarget(pathname) -> Record<Locale, string> | undefined`
- `getPrefixedAliasRedirect(pathname) -> string | undefined`

Contract details:

- `undefined` means "no compatibility match"
- alias helpers never throw for an unknown path
- there is no fuzzy or heuristic result type
- ambiguity is prevented by construction because every supported alias is explicitly declared

`getLocalizedPath(route, locale)` remains the central helper for app code that needs a canonical path. Any helper that duplicates canonical route definitions should be removed or reduced to derivation from the canonical route map.

### 3. Page Safety Layer

Pages that currently assume localized content exists will be hardened in two ways:

- localized `raw` payloads are read only after checking the expected structure or safely defaulting to an empty, non-crashing value
- page-level data assembly is moved closer to the consuming component so failures are isolated and easier to detect

The key principle is that missing or malformed localized content must fail in a controlled and debuggable way during verification, not via `undefined.title` during prerender.

Affected areas include:

- homepage sections using `t.raw(...)`; required payloads are the impact calculator categories and any home section collections already consumed during page assembly, and they should fail fast at the page assembly callsite if malformed; optional arrays may render the subsection empty rather than crash
- `about` page locale payload assembly; required payloads are `values`, `experienceBlock`, and `work.steps`, and they must be structurally validated before iteration
- `projects` page case-study content access; the case-study collection is required to remain iterable in both locales, while an individual missing draft item may simply be absent from the rendered list
- `services` page content and metadata; service collections and pillar collections are required and must remain safe to read in both locales
- `ai-data-control` page content and metadata; page-level `raw` payload sections like use cases, benefits, governance, timeline, quality assurance, and before/after steps are required and must remain structurally safe in both locales
- `contact`, `legal-notice`, `privacy-policy`, and `faq`; their page payloads are required at the route level, but optional subordinate UI fragments may render empty if a non-critical list is absent
- route-level metadata for `home`, `services`, `ai-data-control`, `projects`, `about`, `contact`, `legal-notice`, `privacy-policy`, and `faq`

Safe metadata behavior means:

- metadata generation may assume the namespace exists because it is version-controlled content
- if a page-specific metadata namespace is missing or structurally broken, the failure must happen at a clear metadata callsite during verification/build, not later through unrelated page rendering logic
- the implementation does not add runtime fallbacks that mask broken translation content in production; it makes the failure surface easier to identify and test

### 4. Testing Boundary

Routing verification is split into three layers:

- low-level route verification script for alias-to-canonical mappings
- request-level Playwright tests for redirects and 200 responses
- full production build verification for prerender safety

This keeps failure signals clear: mapping issues fail route verification, redirect issues fail routing tests, and unsafe content assumptions fail the build.

## File Responsibilities

- `proxy.ts`: request entrypoint, matcher, alias redirects, delegation to `next-intl`
- `middleware.ts`: removed so only one request entrypoint remains and there is no parallel routing shim to drift later
- `src/i18n/routing.ts`: canonical localized public pathnames
- `src/lib/routes.ts`: compatibility alias maps and canonical-path helpers
- `src/i18n/request.ts`: locale-to-message loading remains unchanged unless a hardening change is required
- `src/app/[locale]/page.tsx`: homepage composition; ensure it tolerates validated localized section data
- `src/app/[locale]/about/page.tsx`: ensure locale payload usage is structurally safe
- `src/app/[locale]/projects/page.tsx`: ensure case-study rendering remains stable in both locales
- `src/app/[locale]/services/page.tsx`: verify localized route and metadata remain build-safe
- `src/app/[locale]/ai-data-control/page.tsx`: verify localized route and metadata remain build-safe
- `src/app/[locale]/contact/page.tsx`: verify localized route and metadata remain build-safe
- `src/app/[locale]/faq/page.tsx`: verify localized route and metadata remain build-safe
- `src/app/[locale]/legal-notice/page.tsx`: verify localized route and metadata remain build-safe
- `src/app/[locale]/privacy-policy/page.tsx`: verify localized route and metadata remain build-safe
- `tests/routing.spec.ts`: canonical + legacy redirect matrix
- `tests/smoke.spec.ts`: page availability checks for affected routes
- `scripts/verify-locale-routing.mjs`: route consistency guardrails for future changes

`scripts/verify-locale-routing.mjs` must derive its assertions from `src/i18n/routing.ts` and `src/lib/routes.ts` rather than introducing a third independent route matrix.

## Redirect Rules

The routing layer should support these categories:

### Canonical direct hits

These return 200 and do not redirect:

- `/` is not part of this set; it is handled by locale negotiation and redirects to `/de` or `/en`
- `/de`
- `/en`
- `/de/leistungen`
- `/en/services`
- `/de/ki-datenkontrolle`
- `/en/ai-data-control`
- `/de/projekte`
- `/en/projects`
- `/de/ueber-uns`
- `/en/about-us`
- `/de/kontakt`
- `/en/contact`
- `/de/impressum`
- `/en/legal-notice`
- `/de/datenschutz`
- `/en/privacy-policy`
- `/de/faq`
- `/en/faq`

### Supported unprefixed aliases

These redirect based on locale resolution rules already used by the app:

- `/services`
- `/leistungen`
- `/about`
- `/about-us`
- `/ueber-uns`
- `/projects`
- `/projekte`
- `/contact`
- `/kontakt`
- `/legal-notice`
- `/impressum`
- `/privacy-policy`
- `/datenschutz`
- `/faq`

The root path `/` follows the same locale resolution contract and redirects to either `/de` or `/en`.

### Supported prefixed aliases

These always redirect to the canonical locale-specific URL:

- `/de/services` -> `/de/leistungen`
- `/en/leistungen` -> `/en/services`
- `/de/about` -> `/de/ueber-uns`
- `/de/about-us` -> `/de/ueber-uns`
- `/en/ueber-uns` -> `/en/about-us`
- `/de/projects` -> `/de/projekte`
- `/en/projekte` -> `/en/projects`
- `/de/legal-notice` -> `/de/impressum`
- `/en/impressum` -> `/en/legal-notice`
- `/de/privacy-policy` -> `/de/datenschutz`
- `/en/datenschutz` -> `/en/privacy-policy`

This list intentionally mirrors the explicit compatibility set. No additional aliases are handled unless they are declared and tested.

## Error Handling

- Unknown paths are never silently rewritten to a guessed route
- Alias redirects only happen for explicit map entries
- Missing translation structures should surface as verification/build failures with a clear callsite, not deep component property access on `undefined`
- Empty arrays or absent optional content may render no section, but must not crash the route

## Verification Plan

Required verification after implementation:

1. `npm run lint`
2. `npm run verify:routes`
3. `npm run build`
4. `npm run test:e2e`

The route test matrix must cover:

- direct canonical route hits for every in-scope route in DE and EN
- root `/` locale negotiation with cookie and header coverage
- legacy unprefixed aliases with locale cookie coverage
- mixed-language prefixed aliases
- runtime smoke coverage for every canonical in-scope page, including `home`, `services`, `ai-data-control`, `projects`, `about`, `contact`, `legal-notice`, `privacy-policy`, and `faq`

## Risks And Mitigations

- `Risk:` Redirect loops between compatibility logic and `next-intl` pathnames
  `Mitigation:` redirect before handing off to `next-intl`, and test both status code and `Location`

- `Risk:` Build still fails because a different homepage section has unsafe `raw` access
  `Mitigation:` audit the homepage sections that use `t.raw(...)` and validate each accessed structure during page assembly

- `Risk:` Canonical route definitions drift again later
  `Mitigation:` keep canonical paths in `src/i18n/routing.ts` and add route verification coverage so drift fails CI

## Implementation Notes

- Prefer `proxy.ts` over `middleware.ts` for Next 16 compatibility
- Keep the compatibility map explicit and boring; do not add smart inference
- Harden only the pages touched by the current failures and route coverage
- Preserve existing pathnames and external-facing URLs; this is a repair, not a URL redesign
