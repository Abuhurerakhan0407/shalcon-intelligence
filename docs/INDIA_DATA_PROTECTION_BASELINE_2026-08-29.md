# Shalcon Intelligence — India Data Protection Baseline

Research date: 29 Aug 2026
Scope: operational planning baseline, not legal advice.
Primary sources reviewed: Government of India / MeitY notifications for the Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025.

## 1. Important timing correction

Do not write or sell as though every substantive DPDP obligation is already in force today.

The Central Government's 13 Nov 2025 commencement notification phased the Act. The matching DPDP Rules, 2025 notification also phases commencement:

- certain institutional/administrative provisions commenced on publication;
- Rule 4 is scheduled to commence one year after publication;
- Rules 3, 5–16, 22 and 23 are scheduled to commence eighteen months after publication;
- the Act's substantive sections 3–17 are likewise scheduled for eighteen-month commencement under the 13 Nov 2025 notification.

For Shalcon on 29 Aug 2026, this means the framework is enacted/notified and the agency should build toward it, while many core private-sector processing duties are not yet at their scheduled commencement date.

Practical rule: use the notified requirements as the design baseline now; have counsel confirm the exact obligations in force for Shalcon and each client at contract/go-live time.

## 2. What the notified framework means for Shalcon's design

The Act places responsibility on the party determining processing purposes/means (the Data Fiduciary) for processing done on its behalf and contemplates processors being engaged under a valid contract.

For Shalcon projects, role allocation must be written per engagement rather than assumed:
- client will often be the Data Fiduciary for its customer/patient/candidate/lead workflow;
- Shalcon may act as a Data Processor for client-controlled personal data;
- Shalcon may independently be a Data Fiduciary for its own website leads, prospects, billing contacts and agency records.

Do not market a generic sentence such as “DPDP compliant.” Compliance depends on role, purpose, data, client instructions, vendors, configuration, controls and the law in force at the relevant time.

## 3. Security baseline to build now

The notified 2025 Rules describe minimum reasonable safeguards including appropriate protection measures, access controls, visibility/logging for unauthorized access, business-continuity/back-up measures, processor-contract safeguards, and technical/organizational measures.

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

The notified Rules set out affected-person and Board intimation requirements, including a 72-hour detailed update to the Board under Rule 7 once that rule is in force.

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

Rule 3, once commenced, calls for a notice understandable independently of other information, with clear/plain details including an itemized description of personal data and specified purposes, plus a route for exercising rights/withdrawing consent.

For Shalcon's website audit form, the current product direction is consistent with that trajectory:
- request only fields needed for the audit/contact purpose;
- explain why Shalcon will contact the visitor;
- capture explicit contact permission;
- record consent timestamp/version;
- provide privacy/contact route;
- avoid sensitive operational/client data in the public form.

Final public notice still needs the final legal identity, production vendors and retention decision.

## 6. Retention

Do not invent one universal retention period yet.

Create a written schedule by data category and purpose, considering:
- active inquiry / prospect follow-up;
- won/lost sales records;
- contracts/invoices/accounting records;
- client production logs;
- security logs;
- backups;
- legal preservation requirements;
- opt-out/suppression records.

The current Shalcon lead schema supports opt-out and operational lifecycle fields so deletion/retention can be applied deliberately later.

## 7. Client project data classification gate

Before any production automation receives data, classify the project:

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

This compliance baseline is not a reason to delay controlled founder-led sales conversations.

Before processing real client personal data in production, require:
- signed scope/contract;
- role/data map;
- client-authorized access;
- security and retention decisions appropriate to the use case;
- DPA/processor terms where applicable;
- final legal review appropriate to the engagement.

## 10. Source-control rule

Legal/compliance statements in marketing must stay narrow and verifiable. Prefer:
- “designed with data minimization, access controls and human escalation”
- “security and data-processing requirements are scoped per deployment”

over:
- “100% DPDP compliant”
- “fully compliant with all healthcare/insurance laws”

Those broad claims require engagement-specific legal evidence and should not ship as generic marketing copy.
