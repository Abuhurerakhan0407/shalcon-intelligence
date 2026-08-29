# Shalcon Intelligence — SOP Index

Purpose: make delivery repeatable enough for the first clients without wasting launch time documenting hypothetical scale.

Status values:
- READY — working SOP/template exists.
- PARTIAL — working asset exists but production evidence is still needed.
- BLOCKED — requires owner/account/infrastructure action.
- DEFERRED — deliberately postponed until real demand.

## Sales + pre-sale

| SOP | Status | Source |
|---|---|---|
| Target-account research | READY | `HEALTHCARE_GTM_100_ACCOUNTS.md` |
| Healthcare outreach | READY | `OUTREACH_COPY_HEALTHCARE.md` |
| Discovery / automation audit | READY | `DISCOVERY_AUDIT_TEMPLATE.md` |
| Qualification | READY | `SALES_PLAYBOOK.md` |
| Objection handling / close | READY | `OBJECTION_CLOSE_PLAYBOOK.md` |
| Proposal + SOW | READY | `PROPOSAL_SOW_TEMPLATE.md` |
| Commercial margin review | READY BASIC | `FINANCIAL_CONTROL.md` |
| Payment collection | BLOCKED | Owner payment/KYC/accounting setup |

## Client start

| SOP | Status | Source |
|---|---|---|
| Client onboarding | READY | `CLIENT_ONBOARDING_TEMPLATE.md` |
| Access/credential request | PARTIAL | `CLIENT_ONBOARDING_TEMPLATE.md`, `DELIVERY_PLAYBOOK.md` |
| Sensitive-data scoping | READY BASIC | `DELIVERY_PLAYBOOK.md`, proposal data section |
| Workflow confirmation | READY | `DELIVERY_PLAYBOOK.md` |
| Baseline measurement | READY | `MEASUREMENT_SCHEMA.md` |

## Build + delivery

| SOP | Status | Source |
|---|---|---|
| Prototype with synthetic/test data | READY | `DELIVERY_PLAYBOOK.md` |
| Integration implementation | READY BASIC | `DELIVERY_PLAYBOOK.md` |
| Human escalation design | READY | `DELIVERY_PLAYBOOK.md` |
| UAT + acceptance | READY | `DELIVERY_PLAYBOOK.md`, proposal Appendix A |
| Integration failure testing | READY | `DELIVERY_PLAYBOOK.md` |
| Go-live stabilization | READY BASIC | `DELIVERY_PLAYBOOK.md` |
| Change requests | READY | `PROPOSAL_SOW_TEMPLATE.md` |

## Reporting + optimization

| SOP | Status | Source |
|---|---|---|
| Operational measurement | READY | `MEASUREMENT_SCHEMA.md` |
| Pilot/client report | READY | `CLIENT_PILOT_REPORT_TEMPLATE.md` |
| Marketing claim approval | READY | `CLAIMS_REGISTER.md` |
| Monthly support economics | READY BASIC | `FINANCIAL_CONTROL.md` |
| Incident review | READY BASIC | `CLIENT_PILOT_REPORT_TEMPLATE.md` |

## Website + acquisition infrastructure

| SOP | Status | Source |
|---|---|---|
| Website claim safety | READY | CI marketing-claim guard + `CLAIMS_REGISTER.md` |
| Lead endpoint fail-closed behavior | READY | `/api/lead.js` + automated tests |
| Durable website lead persistence | BLOCKED | Dedicated Shalcon destination not configured |
| Production deployment | BLOCKED | Dedicated Shalcon deployment/project not bound |
| Privacy/website terms | PARTIAL | Drafts exist; final owner/legal review pending |

## Deferred SOPs
Do not document these deeply until real workload justifies them:
- hiring/onboarding employees;
- agency-wide procurement;
- partner/channel management;
- multi-team escalation matrices;
- complex enterprise account management;
- international entity/tax structures;
- exit/acquisition planning.

## SOP change rule
When a real project exposes a repeatable failure:
1. fix the current project;
2. record the root cause;
3. update the relevant SOP/template;
4. add a test/checklist item if the failure is objectively testable.

Do not create SOPs purely to make the agency look mature. Documentation earns its place by preventing a repeated mistake.
