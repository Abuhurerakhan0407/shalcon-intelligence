# Shalcon Intelligence — Lead Retention Policy Default

Status date: 31 Aug 2026  
Owner business decision: **APPROVED 31 Aug 2026**

Purpose: practical default for the public audit/lead form. This is an owner-approved business policy, not a claim that one retention period is legally mandatory in every case. Engagement-specific/legal/accounting requirements can override the default where appropriate.

## Approved public-lead retention

### New / unqualified inquiry
Default: **90 days** from last meaningful interaction.

Reason: enough time for a normal sales cycle and follow-up without keeping abandoned inquiries indefinitely.

### Active sales conversation / proposal
Retain while the opportunity is active, then move to the relevant closed-opportunity rule.

### Closed-lost / no-response prospect
Default: **180 days** from last meaningful interaction, unless the person asks for deletion sooner or records must be retained for a specific lawful/business reason.

### Do-not-contact / opt-out
Keep the minimum suppression record needed to honor the opt-out (for example normalized contact route + opt-out status/date) rather than deleting the fact of the opt-out and accidentally contacting the person again.

### Client / paid business records
Contract, invoice, payment and accounting records follow applicable accounting/tax/legal retention requirements rather than the marketing-lead schedule. Do not delete records that must lawfully be retained merely because a marketing deletion request was made; separate the marketing/contact data from required business records where practical.

## Data minimization
- Do not collect patient medical records or other sensitive client data in the public audit form.
- Keep only the fields needed for the inquiry, attribution, consent and estimator context.
- Avoid storing full referrer query strings or unnecessary identifiers.
- Do not store IP addresses as lead records.

## Operational deletion process
1. Monthly review of stale lead rows.
2. Identify rows beyond the approved retention period.
3. Preserve suppression data needed for opt-outs separately/minimally where required.
4. Delete stale lead rows from the Shalcon lead store.
5. Record aggregate deletion count/date rather than copying deleted payloads into logs.
6. If a person requests deletion/correction, handle the request sooner subject to legitimate record-retention obligations.

## Approved default summary
- 90 days new/unqualified;
- 180 days closed-lost/no-response;
- active opportunities while active;
- minimal opt-out suppression record;
- accounting/client records per applicable obligations.

Do not ask the owner to re-approve these defaults unless the retention model materially changes.