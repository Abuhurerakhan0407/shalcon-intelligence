# Shalcon Intelligence — Supabase Lead Destination

Status date: 31 Aug 2026  
Status: **deployed and verified in the dedicated Shalcon project. Do not create another project.**

## Production destination
- project: `shalcon-intelligence`
- project ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- table: `public.shalcon_leads`
- Edge Function: `shalcon-lead-webhook`
- RLS: enabled
- `anon` / `authenticated`: direct table access revoked

This directory is the source/reference for the existing production lead destination. Never deploy it into Pagevelope, Madrasa ERP or another product database.

## Files
- `sql/create_shalcon_leads.sql` — source SQL matching the dedicated Shalcon lead-table contract.
- `functions/shalcon-lead-webhook/index.ts` — server-to-server webhook called by Vercel `/api/lead`.
- `config.toml` — disables platform JWT verification for this external webhook because the function performs its own strong shared-secret authentication before database access.

## Security contract
Before writing, the destination requires:
1. POST request;
2. configured shared secret of sufficient strength;
3. matching `X-Shalcon-Webhook-Secret`;
4. bounded JSON body;
5. UUID `Idempotency-Key` matching body `leadId`;
6. supported schema version;
7. expected source identifier;
8. valid consent evidence;
9. normalized/bounded contact fields;
10. bounded estimator inputs;
11. derived opportunity values matching destination recomputation.

The browser never talks directly to the lead table.

## Idempotency
A hash of the immutable normalized payload protects replay integrity.

Verified behavior:
- first valid write → `201`, one row inserted;
- exact retry with same `leadId` + payload → `200`, no duplicate;
- same `leadId` with conflicting payload → `409`, existing row not overwritten.

## Production verification already completed
- wrong webhook secret rejected;
- valid first write persisted;
- exact replay handled without duplicate;
- conflicting replay rejected;
- real Vercel `/api/lead` → Supabase write succeeded;
- consent/attribution/server-computed estimator values verified;
- intentional verifier failure caused Vercel `502 lead_persistence_failed` and no false saved state;
- verifier restored and success retested;
- browser roles confirmed unable to read/write lead table;
- security/performance advisors reviewed;
- synthetic QA rows removed.

Do not rerun forced production-failure testing casually. Repeat it only when a material persistence change requires evidence.

## Secrets
Production uses a destination-side `SHALCON_LEAD_WEBHOOK_SECRET` matched by Vercel `LEAD_WEBHOOK_SECRET`; Vercel also stores `LEAD_WEBHOOK_URL`.

Never put raw values in Git, browser code, screenshots, issues, logs or client documents.

The current working shared credential was manually transferred during initial setup. It must be rotated immediately before final public/paid launch after infrastructure freeze.

Rotation acceptance:
1. new secret succeeds end-to-end;
2. old secret is rejected;
3. synthetic rotation-test data is deleted;
4. no raw secret appears in recorded evidence.

## Maintenance rule
Do not recreate schema/project/function from scratch during normal continuation. Treat `docs/SUPABASE_LEAD_DESTINATION_SPEC.md`, `docs/LEAD_CAPTURE_SETUP.md`, `docs/WEBHOOK_SECRET_ROTATION_RUNBOOK.md`, `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md` as current operating references.

Any future schema/API change must preserve or deliberately version the Vercel↔Supabase contract and rerun the applicable safety tests before public release.
