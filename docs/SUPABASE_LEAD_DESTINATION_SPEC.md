# Shalcon Intelligence — Dedicated Lead Persistence Specification

Status: implementation-ready specification; **not deployed**.

Purpose: define the dedicated Shalcon persistence destination required by `LEAD_CAPTURE_SETUP.md` without reusing Pagevelope, Madrasa ERP, or any other product database.

## 1. Architecture

`Website estimator → Vercel /api/lead → authenticated HTTPS webhook → dedicated Shalcon Supabase Edge Function → private lead table`

The browser must never receive a Supabase secret/service-role key.

The Vercel function authenticates to the webhook with:
- `X-Shalcon-Webhook-Secret`
- `Idempotency-Key`

The Edge Function must reject an incorrect/missing shared secret before writing anything.

## 2. Dedicated project rule
Create a separate Supabase project for Shalcon. Do **not** place agency leads in another product's production database merely because that database already exists.

Recommended region for an India-first agency: `ap-south-1`, subject to owner/account confirmation at project-creation time.

## 3. Database placement
Preferred table: a non-exposed/private schema such as `private.shalcon_leads`.

If implementation constraints require `public`, then:
- enable RLS immediately;
- revoke `anon` and `authenticated` table privileges unless there is an explicitly approved client use case;
- create no public read/write policy for the website;
- write only from trusted server-side code.

The lead destination is an internal agency store, not a browser-facing database API.

## 4. Table contract

Recommended columns:

| Column | Type | Requirement |
|---|---|---|
| `lead_id` | uuid | primary key; supplied by trusted Vercel endpoint |
| `schema_version` | smallint | required; currently 2 |
| `source` | text | required |
| `created_at` | timestamptz | required |
| `received_at` | timestamptz | default now() |
| `contact_consent` | boolean | required true for normal persisted leads |
| `contact_consent_at` | timestamptz | required |
| `contact_consent_version` | text | required |
| `name` | text | required |
| `whatsapp` | text | required normalized digits |
| `company` | text | optional |
| `industry` | text | optional |
| `package_name` | text | optional |
| `currency` | text | allow `INR`, `USD`, blank/null only |
| `inquiries` | numeric | optional |
| `miss_percent` | numeric | optional |
| `conversion_rate` | numeric | optional |
| `avg_txn` | numeric | optional |
| `estimated_daily_opportunity_at_risk` | numeric | optional |
| `estimated_monthly_opportunity_at_risk` | numeric | optional |
| `estimated_yearly_opportunity_at_risk` | numeric | optional |
| `page` | text | minimized origin + path only |
| `referrer` | text | minimized origin + path only |
| `utm_source` | text | optional |
| `utm_medium` | text | optional |
| `utm_campaign` | text | optional |
| `stage` | text | internal CRM stage; default `new` |
| `owner` | text | internal optional |
| `next_action_at` | timestamptz | internal optional |
| `last_contact_at` | timestamptz | internal optional |
| `opted_out_at` | timestamptz | internal optional |
| `notes` | text | internal optional; never copy sensitive clinical/candidate/policy content here |

## 5. Idempotency
`lead_id` is the primary dedupe key.

The destination must use insert-or-ignore / equivalent conflict handling on `lead_id` so a retry cannot create duplicate leads.

A duplicate request with the same `lead_id` should return a successful idempotent response only when the previously stored row is valid. It must not silently overwrite contact/consent fields with attacker-controlled differences.

## 6. Edge Function behavior

Pseudo-flow:

1. Allow `POST` only.
2. Read `X-Shalcon-Webhook-Secret`.
3. Compare to server-side Edge Function secret.
4. Reject missing/wrong secret with 401/403.
5. Read `Idempotency-Key`.
6. Parse body and require `leadId` to equal that header.
7. Require `schemaVersion === 2`.
8. Validate required consent/contact fields again.
9. Map camelCase payload into database column names.
10. Insert using `lead_id` as the conflict key.
11. Return non-2xx on database failure.
12. Return JSON `{ "ok": true, "leadId": "..." }` only after durable write or valid idempotent replay.

Do not log the shared secret or full lead payload.

## 7. Edge Function authentication model
This webhook is server-to-server and does not have a Supabase user JWT. It therefore requires custom webhook authentication inside the function body.

When deployed, platform JWT verification may need to be disabled for this specific webhook function because the caller is the Vercel server route, **but only because the function itself verifies the strong `X-Shalcon-Webhook-Secret` before any database action**.

Do not use an unauthenticated function body with no custom secret check.

## 8. Secrets
Required at destination:
- generated `SHALCON_LEAD_WEBHOOK_SECRET` matching the Vercel `LEAD_WEBHOOK_SECRET`;
- Supabase server secret/secret-key available only inside the Edge Function as required by the selected database-access pattern.

Required at Vercel:
- `LEAD_WEBHOOK_URL` = deployed Edge Function HTTPS URL;
- `LEAD_WEBHOOK_SECRET` = same generated secret.

No secret belongs in `VITE_*`, frontend source, public assets, analytics, or Git.

## 9. Data API / RLS rules
Current Supabase behavior can vary by project settings: a table in an exposed schema may require explicit grants to appear through the Data API. That is irrelevant to the public website because this table should not be publicly exposed at all.

If the table is in `public`:
- enable RLS;
- revoke access from `anon` and `authenticated` unless a future authenticated internal application explicitly needs it;
- do not create permissive public policies just to make an insert work;
- use trusted server-side credentials in the Edge Function.

## 10. Retention + data subject operations
Before production launch, owner/legal review must define a retention period.

Operational requirements:
- search a lead by `lead_id`, WhatsApp, or name for correction/deletion handling;
- record opt-out timestamp;
- remove or correct inaccurate contact details upon approved request;
- do not delete records that must legally be retained without confirming the applicable record-keeping requirement;
- document who has access to the project/table.

## 11. Abuse controls
Defense layers:
- website honeypot;
- Vercel input validation and best-effort IP rate limit;
- authenticated Vercel → Edge Function webhook;
- destination idempotency;
- optional Supabase/edge abuse controls if actual traffic requires them.

Do not store IP addresses merely to make the basic limiter work.

## 12. Verification after deployment
Run all of these before changing the launch gate:

1. Wrong webhook secret → destination rejects.
2. Missing idempotency key → destination rejects.
3. Mismatched body `leadId` / header → destination rejects.
4. Valid synthetic lead → exactly one row stored.
5. Repeat same lead ID → no duplicate row.
6. Vercel endpoint returns success only after stored row exists.
7. Destination/database forced failure → Vercel endpoint returns failure and website shows no saved confirmation.
8. Query strings/fragments do not appear in stored page/referrer.
9. No secret appears in frontend bundle/browser network config.
10. `anon`/`authenticated` cannot read or write the lead table.
11. Supabase security advisors reviewed after schema/function creation.
12. Correction/deletion test performed on synthetic record.

## 13. Current blocker
Actual creation/deployment requires the owner-controlled Supabase organization/project-cost confirmation. Until that is provided, this specification is the maximum safe implementation progress without contaminating another project or silently creating billable infrastructure.
