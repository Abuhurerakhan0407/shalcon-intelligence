# Shalcon Intelligence — Lead Capture Setup

Status date: 31 Aug 2026  
Status: **configured and verified end-to-end in the dedicated Shalcon infrastructure.**

## Current production behavior
The website submits automation-audit requests to `/api/lead`.

The server returns success only after the configured persistence destination returns an explicit durable-success acknowledgement. If persistence is unavailable, invalid or failing, the visitor receives a failure state and direct contact alternatives remain available. The website must never display a false “saved” confirmation.

Current path:
`Browser → Vercel /api/lead → authenticated HTTPS webhook → dedicated Shalcon Supabase Edge Function → public.shalcon_leads`

Dedicated Supabase project ref: `qfsnmjeacwdkbukwxbwz` (`ap-south-1`).

## Required production environment
### `LEAD_WEBHOOK_URL`
Server-side HTTPS URL for the deployed `shalcon-lead-webhook` Edge Function.

### `LEAD_WEBHOOK_SECRET`
Strong shared secret sent only server-to-server in `X-Shalcon-Webhook-Secret`.

Never expose either value in browser code, URLs, screenshots, issues or Git.

## Server trust boundary
Browser-derived totals are not trusted.

The Vercel route:
- validates and normalizes WhatsApp to digits only;
- requires explicit contact consent;
- bounds estimator inputs;
- recalculates opportunity-at-risk values server-side;
- strips query strings/fragments from stored page/referrer;
- allowlists `utm_source`, `utm_medium`, `utm_campaign` attribution only;
- rejects unsafe/non-HTTPS persistence configuration;
- requires authenticated shared-secret delivery;
- generates a unique `leadId` and matching `Idempotency-Key`;
- applies best-effort short-window IP rate limiting;
- does not store IP as lead data merely for that limiter;
- fails closed when durable persistence fails.

The in-memory rate limiter is defense in depth, not a globally shared serverless WAF.

## Persisted payload — schema v2
Contract includes:
- `schemaVersion = 2`;
- server-generated `leadId`;
- source + timestamps;
- consent evidence;
- bounded name/WhatsApp/company/industry/package fields;
- currency and estimator assumptions;
- server-computed daily/monthly/yearly opportunity-at-risk estimates;
- minimized page/referrer;
- allowlisted UTM attribution.

Estimator values are planning assumptions. They are not verified financial loss, guaranteed recovery or client performance.

## Opportunity calculation
When every required numeric input is valid:

`daily = inquiries × (missPercent / 100) × (conversionRate / 100) × avgTxn`

Then:
- monthly = daily × 30
- yearly = daily × 365

Invalid/out-of-bound required inputs produce `null` derived values rather than fabricated numbers.

## Destination contract
The deployed destination must continue to:
1. verify `X-Shalcon-Webhook-Secret`;
2. require matching `leadId` / `Idempotency-Key`;
3. durably persist first writes;
4. treat exact replay idempotently;
5. reject conflicting replay rather than overwriting protected data;
6. return non-2xx on failure;
7. preserve consent/source/attribution evidence;
8. restrict browser-role access;
9. support correction/deletion/opt-out operations;
10. avoid unnecessary sensitive data;
11. fail rather than silently converting a failed write into success.

## Completed production verification
Evidence completed before this status was marked verified:
- wrong destination secret rejected;
- valid synthetic write persisted exactly once;
- exact replay handled without duplicate;
- conflicting replay rejected;
- server-computed estimator values persisted correctly;
- minimized attribution/page fields verified;
- real Vercel→Supabase write succeeded;
- forced destination verifier failure caused Vercel `502 lead_persistence_failed` and no false saved state;
- destination restored and successful write retested;
- synthetic QA rows removed;
- browser roles denied direct lead-table access;
- security/performance advisor findings reviewed.

## Automated safety coverage
CI covers method restrictions, body limits, malformed payloads, consent, WhatsApp validation, honeypot behavior, persistence configuration, webhook-secret strength, HTTPS/credential restrictions, server-side opportunity calculation, idempotency headers, URL minimization, invalid estimator inputs, best-effort IP rate limiting and upstream failure handling.

## Maintenance / release rules
Do not recreate the Supabase project or point this endpoint at another product database.

After any material API/persistence change, repeat the minimum contract tests and clean synthetic records.

Before final public/paid launch:
- rotate the manually transferred Vercel→Supabase shared credential;
- prove the new secret succeeds and the old one fails;
- remove any synthetic rotation-test row;
- record final evidence in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.

## Current launch status
Lead capture itself is **PASS / VERIFIED**. Remaining launch blockers are external to this setup: final legal/payment/domain gates, final production secret rotation, and final release QA/public-indexing cutover.
