# Shalcon Intelligence — Lead Capture Setup

## Current behavior
The website submits automation-audit requests to `/api/lead`.

The server returns success only after the configured persistence destination returns a successful HTTP response. If persistence is unavailable, invalid or failing, the visitor receives an explicit failure and is offered direct WhatsApp / calendar paths. The website must never display a false “saved” confirmation.

## Required production environment

### `LEAD_WEBHOOK_URL`
Server-side **HTTPS** endpoint that accepts JSON POST requests.

### `LEAD_WEBHOOK_SECRET`
Generated shared secret of at least 24 characters. The Vercel function sends it only in the server-to-server `X-Shalcon-Webhook-Secret` header.

Never expose either value in browser code. Do not place webhook credentials in the URL itself.

The persistence destination must reject requests whose shared-secret header does not match its configured value.

## Server trust boundary
Browser-derived totals are **not trusted**.

The server:
- validates and normalizes the WhatsApp number to digits only;
- requires explicit contact consent;
- bounds estimator inputs;
- recalculates opportunity-at-risk values itself;
- strips query strings/fragments from stored page/referrer URLs;
- allowlists only `utm_source`, `utm_medium`, and `utm_campaign` for attribution;
- rejects non-HTTPS or credential-bearing persistence URLs;
- requires an authenticated shared-secret webhook;
- generates a unique `leadId` for each accepted persistence attempt;
- sends that same ID as the `Idempotency-Key` header;
- applies a best-effort short-window IP rate limit before calling persistence;
- does not persist or log the client IP as lead data;
- fails closed when persistence fails.

The in-memory rate limit is defense in depth, not a replacement for destination/WAF abuse controls because serverless instances do not share one guaranteed global memory space.

## Persisted payload — schema v2
- `schemaVersion` = `2`
- `leadId` — server-generated UUID
- `source` = `shalcon_opportunity_estimator`
- `createdAt`
- `contactConsent` = `true`
- `contactConsentAt`
- `contactConsentVersion` = `website-audit-contact-v1`
- `name`
- `whatsapp` — normalized digits only
- `company`
- `industry`
- `packageName`
- `currency` — INR/USD only; otherwise blank
- `inquiries`
- `missPercent`
- `conversionRate`
- `avgTxn`
- `estimatedDailyOpportunityAtRisk`
- `estimatedMonthlyOpportunityAtRisk`
- `estimatedYearlyOpportunityAtRisk`
- `page` — origin + pathname only
- `referrer` — origin + pathname only
- `utmSource`
- `utmMedium`
- `utmCampaign`

Estimator fields are planning assumptions and must never be described as verified financial loss, guaranteed recovery, or actual client performance.

## Opportunity calculation
When every required numeric input is valid, the server calculates:

`daily = inquiries × (missPercent / 100) × (conversionRate / 100) × avgTxn`

Then:
- monthly = daily × 30
- yearly = daily × 365

If any required numeric input is invalid or outside the approved bound, the stored derived opportunity values are `null` rather than fabricated.

## Destination requirements
The final destination must:
1. require and verify `X-Shalcon-Webhook-Secret`;
2. use `leadId` / `Idempotency-Key` to prevent duplicate storage where supported;
3. persist the request durably;
4. return non-2xx on failure;
5. preserve `createdAt` and consent evidence;
6. preserve source/attribution fields;
7. restrict access to authorized Shalcon operators;
8. support deletion/correction workflows;
9. avoid collecting unnecessary sensitive data;
10. provide a clear way to record contact opt-out;
11. document retention and deletion policy;
12. apply its own abuse/rate controls as needed;
13. avoid silently coercing failed writes into successful HTTP responses.

## Production verification
Before launch:
1. configure both server-side environment variables;
2. send a request with the wrong webhook secret directly to the destination and confirm rejection;
3. submit a synthetic test lead through the website;
4. confirm the persisted record matches schema v2;
5. confirm `leadId` matches the server `Idempotency-Key` received by the destination;
6. verify server-computed opportunity values match submitted assumptions;
7. verify query strings/fragments are not retained in page/referrer;
8. verify the UI shows success only after persistence;
9. force destination failure and verify the UI does **not** show success;
10. confirm WhatsApp and booking fallbacks work;
11. confirm neither secret appears in browser source/network configuration;
12. test correction/deletion handling;
13. document retention and authorized operators.

## Automated safety coverage
CI tests cover method restrictions, body limits, malformed payloads, consent, WhatsApp validation, honeypot behavior, persistence configuration, webhook-secret strength, HTTPS/credential restrictions, server-side opportunity calculation, idempotency headers, URL minimization, invalid estimator inputs, best-effort IP rate limiting and upstream failure handling.

## Current launch status
**BLOCKED** until a dedicated Shalcon persistence destination is configured and the production verification above passes.

Do not point this endpoint at another product's production database merely because it already exists.
