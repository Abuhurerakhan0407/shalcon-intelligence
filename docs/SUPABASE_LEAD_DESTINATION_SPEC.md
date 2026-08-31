# Shalcon Intelligence — Dedicated Lead Persistence Reference

Status date: 31 Aug 2026  
Status: **deployed and verified. This file is now the production contract/reference; do not create a second Shalcon persistence project.**

Purpose: document the dedicated Shalcon lead-persistence destination used by the live website while preserving the security and idempotency contract for future maintenance.

## 1. Verified architecture
`Website estimator → Vercel /api/lead → authenticated HTTPS webhook → dedicated Shalcon Supabase Edge Function → private server-controlled lead table`

Current dedicated Supabase:
- project: `shalcon-intelligence`
- project ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- table: `public.shalcon_leads`
- RLS: enabled
- browser roles `anon` / `authenticated`: access revoked
- Edge Function: `shalcon-lead-webhook` active

Do not reuse Pagevelope, Madrasa ERP or another product database for Shalcon leads.

## 2. Trust boundary
The browser sends lead submissions only to Vercel `/api/lead`.

Vercel authenticates server-to-server to the Supabase Edge Function using:
- `X-Shalcon-Webhook-Secret`
- `Idempotency-Key`

The browser must never receive the webhook secret or a Supabase service/server credential.

The Edge Function must reject missing/incorrect webhook authentication before any database write.

## 3. Table contract
Production implementation follows the schema-v2 lead contract, including identifiers, consent evidence, bounded contact/business fields, server-recomputed estimator values, minimized page/referrer values, allowlisted UTM attribution and internal CRM fields.

Core fields include:
- `lead_id` — UUID primary key supplied by trusted Vercel endpoint;
- `schema_version` — current contract version 2;
- `source`, `created_at`, `received_at`;
- consent fields: `contact_consent`, `contact_consent_at`, `contact_consent_version`;
- contact/business fields: `name`, `whatsapp`, `company`, `industry`, `package_name`;
- estimator inputs/derived outputs;
- minimized `page` and `referrer`;
- allowlisted `utm_source`, `utm_medium`, `utm_campaign`;
- internal stage/owner/follow-up/opt-out fields;
- internal notes, with a rule against copying unnecessary sensitive clinical/candidate/policy content.

Any future schema change must remain backward-compatible with the deployed Vercel contract or be versioned deliberately.

## 4. Idempotency contract
`lead_id` is the primary dedupe key and must match `Idempotency-Key`.

Required behavior:
- first valid request persists one row;
- exact replay returns a valid idempotent success without creating a duplicate;
- replay with conflicting protected payload data is rejected rather than silently overwriting consent/contact data;
- database failure returns non-2xx;
- success is returned only after durable write or a valid exact replay.

## 5. Edge Function behavior
Production contract:
1. allow `POST` only;
2. verify `X-Shalcon-Webhook-Secret`;
3. require `Idempotency-Key`;
4. require body `leadId` to match the header;
5. require supported schema version;
6. revalidate required contact/consent/estimator fields;
7. map payload to database representation;
8. insert safely using `lead_id` conflict handling;
9. reject conflicting replay;
10. return `{ "ok": true, "leadId": "..." }` only after durable write/valid replay;
11. do not log raw shared secret or full sensitive lead payload.

This is a server-to-server webhook. Platform JWT verification may be disabled for this specific function only because custom strong webhook authentication is enforced before database action.

## 6. Secrets
Destination-side secret:
- `SHALCON_LEAD_WEBHOOK_SECRET`

Vercel-side values:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Security rules:
- no secret in `VITE_*`;
- no secret in Git, analytics, issues, screenshots or client documents;
- no cross-product secret reuse;
- production credential must be rotated immediately before final public/paid launch because the current working credential was manually transferred during setup.

## 7. Verified production tests
Completed evidence includes:
- wrong webhook secret → rejected;
- valid first write → `201` and one durable row;
- exact replay → successful replay response with no duplicate;
- conflicting replay → rejected;
- live Vercel `/api/lead` → Supabase write → successful persistence with consent/attribution/server-computed estimator values;
- intentional verifier failure → Vercel `502 lead_persistence_failed`, no false success, no extra row;
- verifier restored → successful persistence retested;
- synthetic integration QA rows deleted after tests;
- security advisor reviewed; intentional server-only RLS/no-browser-policy model retained;
- performance advisor reviewed; new/empty-table informational findings understood.

Do not rerun forced production failure testing unless a release-changing persistence modification justifies it.

## 8. Data minimization / retention
Public form must not collect patient medical records, payment-card data, passwords, confidential claim data or other unnecessary sensitive client information.

Operational requirements:
- support correction/deletion handling where applicable;
- record opt-out/suppression state;
- minimize stored page/referrer and attribution fields;
- define/follow final approved retention schedule;
- preserve legally required records when applicable;
- keep project/table access limited to authorized operators.

Current lead-retention recommendation is documented separately in `docs/LEAD_RETENTION_RECOMMENDATION.md` and remains subject to owner/legal approval.

## 9. Abuse / failure controls
Defense layers:
- website honeypot;
- bounded server validation;
- best-effort IP rate limiting without storing IP merely for that limiter;
- authenticated Vercel→Supabase webhook;
- destination revalidation;
- idempotency/conflict protection;
- explicit fail-closed behavior when durable persistence fails.

## 10. Maintenance verification
After any material persistence/API change, verify:
1. wrong secret rejected;
2. missing/mismatched idempotency rejected;
3. valid synthetic lead stored exactly once;
4. exact replay does not duplicate;
5. conflicting replay rejected;
6. Vercel only reports success after durable acknowledgement;
7. forced/simulated destination failure does not create false UI success;
8. query strings/fragments remain excluded from stored page/referrer;
9. no secret appears in browser-visible assets/config;
10. browser roles cannot read/write lead table;
11. synthetic QA records are removed after test.

## 11. Current blocker
Supabase project creation/deployment is **complete**, not a blocker. Remaining persistence-related launch work is:
- rotate the Vercel/Supabase shared credential after final infrastructure freeze;
- prove new secret succeeds and old secret fails without exposing either;
- clean any synthetic rotation-test row;
- record final release evidence in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.
