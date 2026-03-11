# CRO & Design Audit — nützliche.IT

Stand: 2026-03-10

---

## A) Repo-Realität

- Next.js 16.1.6, Tailwind v4, Framer Motion 12.34, next-intl 4.8, shadcn/radix.
- Kein Deployment-Config (kein Vercel/Netlify/Docker/CI).
- Vorhanden: 4 Solution-Pages, 3 Industry-Pages, Thank-You, Analytics-Scaffold, Contact-API, JSON-LD, Sitemap/Robots.
- Fehlend: Lösungen-Übersicht, Branchen-Übersicht, Business-Webapps, Finanznahe-Dienste, Industrie-IP, Case-Detail-Seiten, Proof-Bar, ICP-Sektion.

## B) Inhalts-Audit — Kritische Probleme

| Section | Problem | Impact |
|---|---|---|
| **Hero** | 3 CTAs (splittet Intent), hardcoded Copy, rechte Spalte überfrachtet mit 4 Floating-Cards + Lanes + Footer-Signals | Conversion-Split, kein klarer nächster Schritt |
| **Services** | Abstract-Copy ("Wirkung, Kontrolle und saubere Umsetzung"), ~9 UI-Elemente, Jargon ("Passende Lösungslinie") | Kognitive Überlastung |
| **AITrust** | "Volle Datenkontrolle" 3× wiederholt, 5-Schritt-Prozess zu komplex für Homepage-Preview, keine CTA | Redundanz, kein Conversion-Path |
| **WorkflowAutomation** | Hardcoded deutscher Text am Ende (EN kaputt), kein CTA, redundant mit Services | Broken i18n, keine Aktion |
| **CaseStudy** | Nur 1 Case, keine Metriken/ROI, Tags redundant | Schwacher Proof |
| **WhyUs** | "Reviews + Tests", "Wartbar" = Tischstandards, keine echte Differenzierung | Null Differenzierung |
| **FAQPreview** | 3 von 12 FAQs, auf 145 Zeichen abgeschnitten | Zu wenig Signal |
| **FinalCTA** | 2 quasi-identische CTAs + Kontaktinfo-Sidebar als Fluchtweg | Split + Escape |

## C) Visuelles System

1. **Kein echtes Designsystem**: CSS-Variablen für Radii definiert aber ignoriert (rounded-[24px], [26px], [30px], [34px], [36px]). 12+ verschiedene Shadow-Werte ohne System.
2. **Monotonie**: Jede Section startet mit identischem 11px-tracking-uppercase Kicker. ~10 ähnliche weiße Karten hintereinander. Kein Rhythmuswechsel.
3. **Typografie komprimiert**: H3 inkonsistent (text-[1.65rem] vs text-sm). Kicker zu klein (11px).
4. **Home-Animations**: 7s Float + 7.5s Orb-Pulse = Rauschen statt Premium.

## D) Conversion-System

1. Kein Proof-Bar nach Hero (Erfahrung, Engineering, Ergebnisse).
2. Keine ICP-Sektion (Wer ist gemeint? Kaufmotiv?).
3. Kein Sticky-Mobile-CTA.
4. Schwache interne Verlinkung (Solution⟷Industry⟷Case fehlt als Mesh).
5. Kein Testimonial/Logo/Quote.
6. Impact Calculator existiert, keine Einbindung.
7. Subpages Services/AI-Data-Control/FAQ/Projects enden ohne CTA.

## E) Beschlossene Maßnahmen

→ Siehe PLAN.md + separate docs (design-system.md, copy-system.md, positioning.md)
