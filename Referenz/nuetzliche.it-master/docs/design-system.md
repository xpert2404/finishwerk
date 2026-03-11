# Design System — nützliche.IT

Stand: 2026-03-10

---

## Farben

| Token | Wert | Einsatz |
|---|---|---|
| `--ink-primary` | `#384048` | Text, Headlines, Dark-Sections |
| `--accent-a` | `#c8692e` | Orange-Akzent (Logo, Micro-Highlights) |
| `--accent-b` | `#0f3d5e` | Navy-Akzent (Primary CTA, Links, Icons) |
| `--accent-current` | `var(--accent-b)` | Aktiver Akzent (per `data-theme` schaltbar) |

### Section-Backgrounds

| Token | Wert | Einsatz |
|---|---|---|
| `--background` | `#ffffff` | Standard-Section |
| `--surface-alt` | `#f8fafb` | Abwechslungs-Sections (z.B. ICP, Process) |
| `--surface-dark` | `var(--ink-primary)` | Dark-Sections (Proof-Bar, Case, FinalCTA) |
| `--surface-dark-foreground` | `#ffffff` | Text auf Dark-Sections |

**Regel:** Niemals 3 aufeinander folgende weiße Sections. Rhythmus: weiß → alt → weiß → dunkel → …

## Schatten

| Token | Einsatz |
|---|---|
| `--shadow-subtle` | Kleine UI-Elemente, Badges |
| `--shadow-card` | Standard-Karten |
| `--shadow-elevated` | Hervorgehobene Karten, Hover-States |shutdown
| `--shadow-hero` | Hero-Shell, große visuelle Blöcke |
| `--shadow-dark` | Dark-Mode-Karten |
| `--shadow-cta` | Primary CTA-Buttons |

**Regel:** Keine willkürlichen shadow-[...] Werte. Immer Token nutzen.

## Radien

| Token | Wert | Einsatz |
|---|---|---|
| `--radius-card` | `24px` | Standard-Karten, Content-Blöcke |
| `--radius-card-lg` | `30px` | Große Karten, Section-Wrapper |
| `--radius-section` | `32px` | Section-Level Container |
| `--radius-pill` | `9999px` | Buttons, Badges, Tags |

**Regel:** Keine `rounded-[Npx]` Arbitrary-Werte mehr. Nur Token.

## Spacing

| Token | Wert | Einsatz |
|---|---|---|
| `--space-section` | `5rem` | Standard-Section py |
| `--space-section-lg` | `6rem` | Große Sections (Hero, FinalCTA) |
| `--space-card` | `1.5rem` | Card-Innenabstand |
| `--space-tight` | `0.75rem` | Enge Abstände (innerhalb Cards) |

## Typografie

| Element | Style | Regel |
|---|---|---|
| **Kicker** | `text-xs font-semibold tracking-[0.18em] uppercase` | Nur wo fachlich sinnvoll, nicht auf jeder Section |
| **H2 (Section)** | `text-3xl sm:text-4xl font-semibold tracking-tight` | Max 12 Worte |
| **H3 (Card)** | `text-xl font-semibold tracking-tight` | Konsistent, nicht text-[1.65rem] |
| **Body** | `text-sm sm:text-base leading-relaxed text-slate-600` | Max 2 Sätze pro Block |
| **CTA-Microcopy** | `text-sm text-slate-500` | Friction-Reducer unter dem Button |

## Motion

Siehe docs/motion-system.md (Phase 4). Grundregel: Keine 7s-Float-Loops. Premium = Ruhe + Präzision.
