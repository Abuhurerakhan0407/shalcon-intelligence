# Shalcon Intelligence — Webhook Credential Rotation Runbook

Status date: 30 Aug 2026

Scope: rotate the shared Vercel `/api/lead` → Supabase Edge Function credential before final public launch. The currently working integration credential was manually transferred during setup, so it must not be treated as the final production secret.

## Safety rules
- Never commit the raw secret to Git.
- Never paste the raw secret into public issues, screenshots, docs or logs.
- Supabase Edge Function source stores only a SHA-256 verifier, not the raw secret.
- Vercel stores the raw secret only as a private environment variable.
- Rotate only after the infrastructure/domain/legal release configuration is otherwise stable to avoid unnecessary repeated secret handling.

## Rotation sequence
1. Generate a fresh high-entropy secret locally/in a trusted secret-generation environment.
2. Compute its SHA-256 hex digest.
3. Update the Supabase Edge Function verifier to the new hash only.
4. Deploy the Edge Function.
5. Before changing Vercel, verify the old secret is rejected by the destination only after the cutover plan is ready; avoid prolonged outage.
6. Update Vercel `LEAD_WEBHOOK_SECRET` privately to the new raw value for the correct Shalcon project/environment.
7. Redeploy/restart if Vercel requires it for the new environment value.
8. Submit one synthetic `/api/lead` request through the final deployment.
9. Confirm Vercel returns 201 and the exact synthetic lead appears in the dedicated Shalcon Supabase table.
10. Delete the synthetic QA lead.
11. Confirm the previous credential now returns 401 at the destination.
12. Check Vercel runtime errors and Supabase logs for unexplained failures.
13. Record only rotation date, verifier/source commit and success evidence — never the raw credential.

## Failure handling
If Vercel still uses the old secret after the Supabase verifier changes, `/api/lead` should fail closed with `502 lead_persistence_failed`. Restore service by completing the Vercel secret update; do not weaken destination authentication or add both raw secrets to source.

## Completion definition
Rotation is PASS only when:
- new credential works end-to-end;
- old credential is rejected;
- no raw secret appears in repository/docs/log evidence;
- synthetic test row is cleaned up;
- final release tracker records the test.
