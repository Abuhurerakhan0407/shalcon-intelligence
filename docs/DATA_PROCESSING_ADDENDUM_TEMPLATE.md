# Shalcon Intelligence — Data Processing Addendum Template

> Working commercial template only. Not legal advice. Final language must be reviewed for the actual parties, jurisdiction, data, vendors and law in force when signed.

This Addendum supplements the applicable proposal / Statement of Work (the “Agreement”) between **[CLIENT LEGAL NAME]** (“Client”) and **Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence** (“Shalcon”).

Shalcon notice details:
- Operator / contracting party: Abu Hurera Khan
- Trading name: Shalcon Intelligence
- Business type: Sole proprietorship
- Notice address: Rm 2, Mahavir Bldg, Opp. P&T Colony, Near Shri Kumar Society, Vakola, Santacruz East, Mumbai 400055, Maharashtra, India
- Email: shalconintelligence@gmail.com
- GST status supplied by proprietor on 30 Aug 2026: not registered
- Authorized signatory: Abu Hurera Khan, Founder

## 1. Scope and roles

The parties will document their roles for each processing activity in Appendix A.

Where Shalcon processes personal data solely on documented instructions from Client for Client's workflow, Client is intended to control the purpose/business use and Shalcon acts as the service provider/processor to the extent recognized by applicable law.

Nothing in this template should be read as automatically assigning a statutory role where the actual processing relationship or applicable law provides otherwise.

Shalcon may separately determine purposes/means for its own business administration data (for example billing contacts, its own sales records, security administration and legal records) and those activities are outside Client's processor instructions unless expressly stated.

## 2. Documented instructions

Shalcon will process in-scope Client personal data only:
- to deliver, support, secure and troubleshoot the services described in the Agreement;
- on Client's documented instructions;
- as otherwise required by applicable law, in which case Shalcon will inform Client where legally permitted.

A request that materially changes data categories, purposes, recipients, integrations, retention or automated decision logic is a change request and may require a revised security/legal assessment.

## 3. Data minimization

The parties will define the minimum fields required for the workflow.

Unless expressly scoped and protected, Client will not provide and Shalcon will not intentionally collect through general/public channels:
- passwords or secret keys;
- payment-card authentication data;
- unnecessary health/clinical records;
- unnecessary insurance claim/policy documents;
- unnecessary identity documents;
- unnecessary candidate/employment confidential records;
- other data not required for the approved workflow.

Public demos and generic QA fixtures use synthetic data.

## 4. Confidentiality and personnel

Shalcon will limit in-scope personal-data access to personnel/contractors who need it for the approved work and are subject to appropriate confidentiality obligations.

Client will likewise limit credentials/access it provides to what Shalcon actually needs.

## 5. Security measures

Shalcon will apply technical and organizational measures appropriate to the scoped risk, which may include:
- least-privilege access;
- secret management outside source code;
- encrypted transport;
- platform/vendor encryption at rest where available;
- environment separation where appropriate;
- access/event logging appropriate to the system;
- dependency and vulnerability controls for Shalcon-managed code;
- input validation and safe failure paths;
- backups/recovery ownership for systems Shalcon is expressly responsible for;
- human escalation for sensitive, low-confidence or consequential workflows;
- removal/rotation of access when no longer required.

Specific controls and exclusions belong in Appendix B where the engagement warrants them.

## 6. Subprocessors and third-party platforms

Approved subprocessors/platforms will be listed in Appendix C or the applicable SOW.

Client acknowledges that the solution may depend on third-party hosting, messaging, telephony, AI model, automation, CRM, calendar, database and monitoring providers.

Shalcon will not intentionally add a new provider that materially changes the processing risk/scope without following the change/notification approach agreed with Client.

Client remains responsible for commercial/vendor accounts it directly owns unless the Agreement says otherwise.

## 7. Security incidents

Shalcon will notify Client's designated contact without undue delay after confirming a security incident affecting Client personal data in Shalcon-controlled systems, and will provide reasonably available information about:
- affected system/data scope;
- known timing/nature;
- containment/mitigation taken;
- investigation status;
- recommended Client actions where relevant.

Client is responsible for regulator/data-subject notifications for Client-controlled processing unless applicable law or the Agreement assigns a different responsibility.

The parties will cooperate reasonably on legally required incident response. Notification is not an admission of liability.

## 8. Data-subject / individual requests

If Shalcon receives a request concerning Client-controlled personal data and can reasonably identify the relevant Client, Shalcon will direct the requester to Client or notify Client rather than independently deciding the request, unless applicable law requires otherwise.

Where technically feasible and within scope, Shalcon will reasonably assist Client with locating, correcting, exporting or deleting in-scope data stored in Shalcon-managed systems.

## 9. Retention, return and deletion

Appendix A will state the agreed operational retention approach where known.

At termination or Client's written instruction, Shalcon will delete or return Client personal data under Shalcon's control according to the Agreement, subject to:
- agreed backup lifecycle;
- security logs;
- legal/accounting/record-preservation requirements;
- technically unavoidable transient copies;
- any separately documented lawful basis/requirement.

Access credentials should be revoked/rotated as part of offboarding.

## 10. Client responsibilities

Client will:
- ensure it has authority/lawful basis to provide and instruct processing of the data;
- provide required notices and collect permissions/consents where Client is responsible for them;
- approve messaging, content, decision rules and escalation paths;
- avoid providing unnecessary sensitive data;
- maintain accurate authorized-user/access lists;
- identify any sector-specific legal/security requirements before build;
- perform required human review where the workflow affects sensitive or consequential decisions;
- notify Shalcon of changes to connected systems or processing purpose.

## 11. Automated decisions and professional judgment

Unless expressly approved in a legally reviewed SOW, Shalcon systems will not be designed as the final autonomous decision maker for:
- medical diagnosis/treatment;
- insurance coverage/claim determinations;
- hiring/rejection or other consequential employment judgments;
- legal/financial professional advice;
- other decisions that the parties identify as requiring authorized human review.

Automation may collect, organize, route, schedule, remind, summarize or support approved operational steps while preserving the agreed decision boundary.

## 12. AI/model use

Unless Client expressly authorizes another arrangement in writing:
- Shalcon will not intentionally use Client personal data for Shalcon's unrelated marketing;
- Shalcon will not intentionally use Client personal data to train a general-purpose model owned by Shalcon;
- model/provider use will follow the approved architecture and provider terms/configuration;
- sensitive data should not be sent to a model/provider unless required, approved and appropriately controlled for the use case.

## 13. Cross-border processing

Where relevant, the parties will identify key processing/storage locations and any applicable legal restrictions before production. This template does not itself guarantee that a particular international transfer is permitted.

## 14. Audit and evidence

On reasonable request and subject to confidentiality/security restrictions, Shalcon will provide information reasonably necessary to demonstrate the agreed technical/organizational measures for the specific engagement.

On-site audits, penetration testing, extensive questionnaires or third-party attestations are outside standard scope unless required by law or separately agreed.

## 15. Liability / precedence

Liability, indemnity, governing law and dispute terms are controlled by the Agreement unless this Addendum expressly amends them.

If this Addendum conflicts with the SOW on technical processing details, the more specific agreed processing instruction controls; if it conflicts with negotiated legal terms, the signed legal amendment controls.

## 16. Signatures

Client legal name: ______________________________

Authorized signatory: ___________________________

Date: __________________

Shalcon legal name: Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence

Authorized signatory: Abu Hurera Khan — Founder

Date: __________________

---

# Appendix A — Processing Details

| Field | Agreed value |
|---|---|
| Project / workflow | [ ] |
| Client role | [ ] |
| Shalcon role | [ ] |
| Business purpose | [ ] |
| Data subjects | [ ] |
| Personal-data fields | [ ] |
| Explicitly excluded fields | [ ] |
| Sources/channels | [ ] |
| Destinations/systems | [ ] |
| Processing actions | [ ] |
| Retention | [ ] |
| Deletion/offboarding | [ ] |
| Human decision/escalation owner | [ ] |
| Client privacy/security contact | [ ] |
| Shalcon incident contact | shalconintelligence@gmail.com |

# Appendix B — Security / Operational Controls

- Authentication / access model: [ ]
- Credential ownership: [ ]
- Encryption / transport: [ ]
- Logging/monitoring: [ ]
- Backup/recovery responsibility: [ ]
- Production/staging separation: [ ]
- Incident alert path: shalconintelligence@gmail.com unless a project-specific channel is agreed
- Sensitive-field redaction/minimization: [ ]
- Human escalation rules: [ ]
- Availability/support target: [ ]
- Known exclusions / accepted risks: [ ]

# Appendix C — Approved Providers / Subprocessors

| Provider | Function | Data categories | Region/location if relevant | Client-owned account? | Notes |
|---|---|---|---|---:|---|
| [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
