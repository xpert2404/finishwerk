# Information Architecture

## Current canonical pages

- `/de`, `/en`
- `/de/leistungen`, `/en/services`
- `/de/loesungen/rag-wissenssuche`, `/en/solutions/rag-knowledge-search`
- `/de/loesungen/idp-dokumente`, `/en/solutions/idp-documents`
- `/de/loesungen/telefonagenten`, `/en/solutions/voice-agents`
- `/de/loesungen/api-integration`, `/en/solutions/api-integration`
- `/de/branchen/kanzleien`, `/en/industries/law-firms`
- `/de/branchen/arztpraxen`, `/en/industries/medical-practices`
- `/de/branchen/it-service`, `/en/industries/it-service`
- `/de/ki-datenkontrolle`, `/en/ai-data-control`
- `/de/projekte`, `/en/projects`
- `/de/ueber-uns`, `/en/about-us`
- `/de/kontakt`, `/en/contact`
- `/de/danke`, `/en/thank-you`
- `/de/impressum`, `/en/legal-notice`
- `/de/datenschutz`, `/en/privacy-policy`
- `/de/faq`, `/en/faq`

## Planned route expansion

### Cases

- `/de/projekte/[slug]`
- `/en/projects/[slug]`

## Internal linking target

- Homepage links into services, AI/data-control, projects, contact, and thank-you continuation CTAs.
- Solution pages now link laterally to relevant industries or proof destinations and should gain dedicated case-detail links next.
- Industry pages now link to their matching solutions and should gain supporting case-detail links next.
- Thank-you page should route users back into booking or service exploration.

## Redirect notes

- Existing locale-aware alias redirects remain handled via `src/lib/routes.ts`.
- Future route additions must be added to `src/i18n/routing.ts` first, then mirrored into `src/lib/routes.ts` where compatibility redirects are needed.