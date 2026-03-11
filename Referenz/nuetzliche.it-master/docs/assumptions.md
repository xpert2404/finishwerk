# Assumptions

## Confirmed unknowns

- Hosting provider, DNS ownership, and deployment workflow are unknown.
- Public-domain mismatch is not yet proven; external page extraction failed, so only a partial outside-in verification is currently possible.
- No production analytics property ID is configured yet.
- No confirmed CRM, webhook, or email delivery target is configured for contact-form submissions.
- OSS / NuGet proof metrics, customer quotes, and named-logo permissions are not yet sourced.

## Current implementation assumptions

- The contact form forwards to `CONTACT_FORM_WEBHOOK_URL` when configured.
- If no webhook is configured, the server route logs the submission for local verification only. This is not sufficient for production.
- Booking completion tracking is not final until Cal.com success redirect or callback details are available.

## Content assumptions

- The homepage may reference `15+` years of combined experience based on existing repo content.
- Industry ICPs suggested in the brief are treated as working hypotheses until explicitly confirmed.

## Deployment follow-up needed

- Verify whether the repo deploys to `nuetzliche.it`.
- Verify apex vs `www` redirect behavior.
- Verify DNS, SSL, and hosting target once infrastructure details are available.