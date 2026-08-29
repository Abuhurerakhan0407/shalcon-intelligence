# Shalcon Intelligence — Client Access & Security Checklist

Use before Shalcon receives production credentials or real client data.

## 1. Scope gate
- [ ] Workflow/SOW approved.
- [ ] Client system owner identified.
- [ ] Exact systems/integrations listed.
- [ ] Exact data fields required listed.
- [ ] Sensitive/consequential data identified.
- [ ] Human escalation/decision owner named.
- [ ] Data-processing/security terms completed where applicable.

## 2. Credential rules
- [ ] Prefer client-created named service/integration accounts over shared employee logins.
- [ ] Request only permissions needed for the workflow.
- [ ] Use read-only access when write permission is unnecessary.
- [ ] Never request credentials in the public website form.
- [ ] Never place secrets in proposal docs, Slack/WhatsApp screenshots, source code or Git.
- [ ] Store secrets only in the approved platform secret store/password manager.
- [ ] Record credential owner and rotation/revocation responsibility without recording the secret value in project notes.
- [ ] MFA enabled where the provider supports it and does not break the approved service-account pattern.

## 3. Environment separation
- [ ] Synthetic/test data used first.
- [ ] Staging/sandbox credentials used where available.
- [ ] Production credentials added only after staging/UAT need is proven.
- [ ] Production/test destinations clearly labeled.
- [ ] Test messages/bookings cannot reach real customers/patients/candidates by accident.

## 4. Data minimization
- [ ] Every collected field has an operational purpose.
- [ ] Unnecessary medical/clinical details excluded.
- [ ] Unnecessary insurance/claim documents excluded.
- [ ] Unnecessary candidate confidential data excluded.
- [ ] Payment-card secrets/CVV never enter general workflow logs.
- [ ] Passwords/API keys never enter prompts or general workflow records.
- [ ] Model/provider receives only the minimum required context.

## 5. AI / automation boundaries
- [ ] Approved intents documented.
- [ ] Disallowed intents documented.
- [ ] Human escalation conditions documented.
- [ ] Low-confidence/failure behavior is safe.
- [ ] No autonomous medical diagnosis/treatment advice.
- [ ] No autonomous insurance approval/coverage/claim determination unless separately legally approved and intentionally scoped.
- [ ] No autonomous final hiring/rejection decision unless separately legally approved and intentionally scoped.
- [ ] No model response is treated as verified system-of-record data without the required validation step.

## 6. Integration safety
- [ ] Webhooks authenticate callers where possible.
- [ ] Webhook retries are idempotent where duplicate actions matter.
- [ ] Write operations have explicit target IDs/constraints.
- [ ] Failure path cannot silently report success.
- [ ] Rate limits/timeouts understood.
- [ ] Third-party outage behavior defined.
- [ ] Logs avoid unnecessary full payloads/secrets.
- [ ] Destructive operations require explicit approval/guardrails.

## 7. Access review before go-live
- [ ] List every Shalcon/user/service account with production access.
- [ ] Remove temporary developer/test access no longer needed.
- [ ] Confirm client can revoke access independently.
- [ ] Confirm monitoring/alert ownership.
- [ ] Confirm backup/recovery responsibility.
- [ ] Confirm incident contact for both parties.
- [ ] Confirm retention/deletion/offboarding path.

## 8. Offboarding
- [ ] Export/handover agreed deliverables.
- [ ] Revoke Shalcon user/service access not required for ongoing support.
- [ ] Rotate shared secrets where appropriate.
- [ ] Delete/return client data under the agreement/retention plan.
- [ ] Close unused environments/webhooks/tokens.
- [ ] Preserve only records legally/contractually required.
- [ ] Record completion without copying secrets into the record.

## Rule
If a requested shortcut weakens access control merely to make an integration easier, stop and redesign the integration. Convenience is not an acceptance criterion.
