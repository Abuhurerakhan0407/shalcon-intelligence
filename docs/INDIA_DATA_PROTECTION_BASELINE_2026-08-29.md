# Shalcon Intelligence — India Data Protection Baseline

Research refreshed: 31 Aug 2026
Scope: operational planning baseline, not legal advice.
Primary sources: Government of India / MeitY Gazette notifications for the Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025.

## 1. Current legal timing — important

Do not write, sell or contract as though every substantive DPDP obligation is already in force on 31 Aug 2026.

The Central Government's Gazette notifications dated 13 Nov 2025 use staggered commencement.

### Act commencement notification — G.S.R. 843(E), 13 Nov 2025
The notification brings selected institutional/administrative provisions into force on publication, schedules section 6(9) and section 27(1)(d) for one year after publication, and schedules the main private-sector processing/rights/obligations provisions identified in the notification for eighteen months after publication.

Operational planning dates from that Gazette date:
- **13 Nov 2026:** the one-year tranche is scheduled to commence;
- **13 May 2027:** the eighteen-month tranche is scheduled to commence.

### DPDP Rules, 2025 — G.S.R. 846(E), 13 Nov 2025
- Rules 1, 2 and 17–21: in force from publication;
- Rule 4: scheduled one year after publication → **13 Nov 2026**;
- Rules 3, 5–16, 22 and 23: scheduled eighteen months after publication → **13 May 2027**.

Official sources:
- MeitY DPDP Rules page: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa
- Act commencement Gazette notification G.S.R. 843(E): MeitY Gazette PDF dated 13 Nov 2025
- DPDP Rules Gazette notification G.S.R. 846(E): MeitY Gazette PDF dated 13 Nov 2025

### What that means today
On 31 Aug 2026, the framework is enacted/notified and parts are already operative, but many of the core private-sector processing duties are still before their scheduled commencement date.

**Shalcon operating rule:** design toward the notified full framework now, but never advertise “fully DPDP compliant” merely because the product follows those design principles. Counsel should confirm the provisions actually in force at contract/go-live time and the role/facts of each engagement.

## 2. What the notified framework means for Shalcon's design

The Act places responsibility on the party determining processing purposes/means (the Data Fiduciary) for processing done on its behalf and contemplates processors being engaged under a valid contract once the relevant provisions are operative.

For Shalcon projects, role allocation must be written per engagement rather than assumed:
- client will often be the Data Fiduciary for its customer/patient/candidate/lead workflow;
- Shalcon may act as a Data Processor for client-controlled personal data;
- Shalcon may independently be a Data Fiduciary for its own website leads, prospects, billing contacts and agency records.

Do not market a generic sentence such as “DPDP compliant.” Compliance depends on role, purpose, data, client instructions, vendors, configuration, controls and the law in force at the relevant time.

## 3. Security baseline to build now

The notified 2025 Rules describe minimum safeguards that become relevant with their scheduled commencement. Shalcon should implement the practical safeguards now rather than waiting for the effective date.

Shalcon baseline:
- least-privilege system access;
- separate client credentials and environments where practical;
- no credentials in chat, public forms or repositories;
- encrypt in transit and use vendor/platform encryption at rest where available;
- access logs / operational event logs appropriate to the system;
- backup/recovery ownership defined for systems of record;
- human escalation for sensitive/consequential decisions;
- production secrets in platform secret stores;
- client-approved data fields only;
- no raw sensitive production data in demos/test fixtures;
- dependency/security review on shipped software;
- incident owner and client notification path defined in the SOW/DPA.

## 4. Personal-data breach readiness

Rule 7's breach-intimation mechanics are in the eighteen-month Rules tranche scheduled for 13 May 2027. The Rules include affected-person notification and Board intimation mechanics, including a 72-hour detailed update to the Board once Rule 7 is in force.

Shalcon should prepare now:
1. detect and contain;
2. preserve relevant logs/evidence;
3. identify systems/data/clients affected;
4. notify the client's designated security/privacy contact immediately under the contract;
5. do not independently make public/regulatory statements for client-controlled data unless authorized/legally required;
6. support the client with facts, mitigation and remediation;
7. rotate exposed secrets/access;
8. document root cause and prevention work.

Contract language must specify which party owns regulator/data-principal notification for the specific processing relationship.

## 5. Notice and consent design

Rule 3 is in the eighteen-month Rules tranche scheduled for 13 May 2027. It calls for notice that is understandable independently of other information, with clear/plain details including an itemized description of personal data and specified purposes, plus a route for rights/withdrawal.

For Shalcon's website audit form, the current product direction intentionally builds toward that standard:
- request only fields needed for the audit/contact purpose;
- explain why Shalcon will contact the visitor;
- capture explicit contact permission;
- record consent timestamp/version;
- provide privacy/contact route;
- avoid sensitive operational/client data in the public form.

The existing public Privacy Notice remains a launch-review draft until owner/legal approval; following the future-rule design direction is not a claim that those future provisions are already enforceable against Shalcon today.

## 6. Retention

Do not invent one universal retention period merely to imitate a compliance template.

Maintain a written schedule by data category and purpose, considering:
- active inquiry / prospect follow-up;
- won/lost sales records;
- contracts/invoices/accounting records;
- client production logs;
- security logs;
- backups;
- legal preservation requirements;
- opt-out/suppression records.

Use `docs/LEAD_RETENTION_RECOMMENDATION.md` as the working business proposal until owner/legal review approves or changes it.

## 7. Client project data classification gate

Before any production automation receives data, classify the project.

### Low sensitivity
Business contact / ordinary lead-routing fields.
Use normal least-privilege controls and minimization.

### Elevated sensitivity / consequential workflow
Healthcare records, insurance/policy/claim context, confidential candidate/employment data, financial/payment details, credentials, identity documents, or decisions materially affecting an individual.
Require a stricter architecture review, explicit field map, approved vendors, access-control plan, logging plan, retention plan and human-decision boundaries.

Public Shalcon demos must remain synthetic regardless of classification.

## 8. Contract/DPA checklist

For engagements involving personal data, the written agreement should cover at least:
- parties' roles and instructions;
- processing purpose and categories of data;
- permitted systems/vendors/subprocessors;
- confidentiality/access control;
- security measures;
- incident notification/cooperation;
- deletion/return at termination;
- assistance with correction/deletion/rights requests where applicable;
- cross-border/vendor considerations where applicable;
- audit/evidence cooperation proportionate to the engagement;
- prohibition on Shalcon using client data for unrelated model training/marketing without explicit lawful authorization;
- responsibility for legal notices/consent and messaging permissions;
- change control when the workflow/data scope changes.

Use `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md` as the working contract appendix; it requires professional review before use.

## 9. Launch decision

This baseline is not a reason to delay controlled founder-led sales conversations.

Before processing real client personal data in production, require:
- signed scope/contract;
- role/data map;
- client-authorized access;
- security and retention decisions appropriate to the use case;
- DPA/processor terms where applicable;
- final legal review appropriate to the engagement.

## 10. Marketing/source-control rule

Legal/compliance statements in marketing must stay narrow and verifiable. Prefer:
- “designed with data minimization, access controls and human escalation”
- “security and data-processing requirements are scoped per deployment”

over:
- “100% DPDP compliant”
- “fully compliant with all healthcare/insurance laws”

Broad claims require engagement-specific legal evidence and should not ship as generic marketing copy.

## 11. Recheck trigger

Recheck this baseline at minimum:
- immediately before 13 Nov 2026;
- immediately before 13 May 2027;
- before first production engagement involving sensitive/consequential personal data;
- whenever MeitY publishes a relevant corrigendum, amendment, exemption, direction or materially relevant guidance.