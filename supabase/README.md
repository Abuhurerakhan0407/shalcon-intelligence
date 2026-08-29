# Shalcon Intelligence — Supabase Lead Destination

Status: **implementation prepared, not deployed**.

This directory contains the dedicated Shalcon lead-persistence implementation. It must be deployed only to a separate Shalcon Supabase project, never Pagevelope, Madrasa ERP, or another product database.

## Files

- `sql/create_shalcon_leads.sql` — reviewed implementation SQL. It is intentionally not named as a migration yet because the final migration filename must be generated against the dedicated project/tooling rather than invented in advance.
- `functions/shalcon-lead-webhook/index.ts` — server-to-server webhook called only by the Vercel `/api/lead` route.
- `config.toml` — disables platform JWT verification for this one external-webhook function because the function performs custom shared-secret authentication before database access.

## Current Supabase pattern

Verified against current Supabase documentation on 29 Aug 2026:

- new Edge Functions can use `@supabase/server`;
- external/signed webhooks use `auth: 'none'` with `verify_jwt = false` and must authenticate the caller inside the function;
- `ctx.supabaseAdmin` is available for privileged database work and bypasses RLS;
- Edge Functions receive Supabase project URL and secret-key configuration from platform-managed environment variables;
- custom production secrets such as `SHALCON_LEAD_WEBHOOK_SECRET` must be stored in Edge Function secrets, never source control.

## Security contract

The destination requires all of the following before writing:

1. POST request;
2. configured shared secret at least 24 characters;
3. matching `X-Shalcon-Webhook-Secret`;
4. JSON body within the size limit;
5. UUID `Idempotency-Key` matching body `leadId`;
6. schema version 2;
7. expected source identifier;
8. valid consent evidence;
9. normalized contact fields;
10. bounded estimator inputs;
11. opportunity values that exactly match the destination's own recomputation.

The table has RLS enabled and all privileges revoked from `anon` and `authenticated`. The browser never talks directly to the table.

## Idempotency

A SHA-256 hash of the immutable normalized payload is stored with each lead.

- first valid write → `201`, one row inserted;
- exact retry with same `leadId` and same normalized payload → `200`, no duplicate;
- same `leadId` with different payload → `409`, existing row is not overwritten.

This is deliberately safer than an unrestricted upsert.

## Deployment sequence once the owner authorizes a dedicated project

1. Create/confirm the dedicated Shalcon Supabase project.
2. Apply the SQL to that project through the connected Supabase tooling.
3. Run Supabase security + performance advisors and fix anything material.
4. Set `SHALCON_LEAD_WEBHOOK_SECRET` in the project's Edge Function secrets.
5. Deploy `shalcon-lead-webhook` with JWT verification disabled **only because custom webhook authentication is implemented**.
6. Put the deployed function URL into Vercel as `LEAD_WEBHOOK_URL`.
7. Put the matching secret into Vercel as `LEAD_WEBHOOK_SECRET`.
8. Submit one synthetic lead and verify exactly one row.
9. Replay the same lead ID and verify no duplicate.
10. Test wrong secret, mismatched idempotency key and tampered opportunity totals.
11. Force database/function failure and confirm the website never shows a false saved state.
12. Confirm `anon` and `authenticated` cannot read or write the lead table.
13. Perform one synthetic correction/deletion workflow.

## Owner-only step

The implementation does not need redesign. The remaining owner dependency is authorization of the Supabase organization/project cost and later setting/approving production secrets/infrastructure where connector access cannot do so directly.
