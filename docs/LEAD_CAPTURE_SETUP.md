# Shalcon Intelligence — Lead Capture Setup

## Current behavior
The website submits automation-audit requests to `/api/lead`.

The server endpoint returns success only after the configured persistence destination returns a successful HTTP response. If persistence is unavailable, invalid or failing, the visitor receives an explicit failure and is offered direct WhatsApp / calendar paths. The website must never display a false “saved” confirmation.

## Required production environment variable
`LEAD_WEBHOOK_URL`

This must be a server-side **HTTPS** endpoint that accepts JSON POST requests. Never expose its secret/token in frontend code.

## Server trust boundary
Browser-derived totals are **not trusted**.

The server:
- validates and normalizes the WhatsApp number to digits only;
- requires explicit contact consent;
- bounds estimator inputs;
- recalculates opportunity-at-risk values itself;
- strips query strings/fragments from stored page/referrer URLs;
- allowlists only `utm_source`, `utm_medium`, and `utm_campaign` for attribution;
- rejects non-HTTPS persistence destinations;
- fails closed when persistence fails.

## Persisted payload — schema v1
- `schemaVersion` = `1`
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
1. persist the request durably;
2. return non-2xx on failure;
3. preserve `createdAt` and consent evidence;
4. preserve source/attribution fields;
5. restrict access to authorized Shalcon operators;
6. support deletion/correction workflows;
7. avoid collecting unnecessary sensitive data;
8. provide a clear way to record contact opt-out;
9. document retention and deletion policy;
10. avoid silently coercing failed writes into successful HTTP responses.

## Production verification
Before launch:
1. submit a synthetic test lead;
2. confirm the persisted record matches schema v1;
3. verify server-computed opportunity values match the submitted assumptions;
4. verify query strings/fragments are not retained in page/referrer;
5. verify the UI shows success only after persistence;
6. force destination failure and verify the UI does **not** show success;
7. confirm WhatsApp and booking fallbacks work;
8. confirm no secret appears in browser source/network configuration;
9. test correction/deletion handling;
10. document retention and authorized operators.

## Automated safety coverage
CI tests cover method restrictions, body limits, malformed payloads, consent, WhatsApp validation, honeypot behavior, persistence configuration, HTTPS-only webhook destinations, server-side opportunity calculation, URL minimization, invalid estimator inputs and upstream failure handling.

## Current launch status
**BLOCKED** until a dedicated Shalcon persistence destination is configured and the production verification above passes.

Do not point this endpoint at another product's production database merely because it already exists.
