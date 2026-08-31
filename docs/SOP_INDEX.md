# Shalcon Intelligence — SOP Index

Status date: 31 Aug 2026

Purpose: make first-client sales/delivery repeatable without documenting hypothetical scale.

Status values:
- `READY` — working SOP/template/process exists.
- `VERIFIED` — process/infrastructure exists and has production evidence.
- `PARTIAL` — useful asset exists but owner/legal/client-specific completion remains.
- `BLOCKED` — genuine owner/account/release dependency remains.
- `DEFERRED` — deliberately postponed until real demand.

## Sales + pre-sale
| SOP | Status | Source / note |
|---|---|---|
| Target-account research | READY | `HEALTHCARE_GTM_100_ACCOUNTS.md` |
| Healthcare outreach copy/process | READY | `OUTREACH_COPY_HEALTHCARE.md`, Batch 02 drafts; actual send still requires approved channel + owner authorization |
| Live prospect tracking | VERIFIED | Google Sheets founder-led pipeline; 15 `Draft Ready`, 1 `Research Ready`, 0 sent/replied/discovery |
| Discovery / automation audit | READY | `DISCOVERY_AUDIT_TEMPLATE.md` |
| Qualification | READY | `SALES_PLAYBOOK.md` |
| Objection handling / close | READY | `OBJECTION_CLOSE_PLAYBOOK.md` |
| Proposal + SOW | READY | `PROPOSAL_SOW_TEMPLATE.md`; mandatory pre-send scrub gate |
| Data-processing appendix | PARTIAL | `DATA_PROCESSING_ADDENDUM_TEMPLATE.md`; client/legal review where applicable |
| Commercial margin review | READY | `FINANCIAL_CONTROL.md`, `COMMERCIAL_RECOMMENDATION_V1.md` |
| Healthcare commercial baseline | READY | ₹39,000 setup + ₹9,000/month; 50/30/20; vendor usage separate/client-paid |
| UDYAM/MSME | OWNER-REPORTED COMPLETE | obtained per owner 31 Aug 2026; certificate remains private |
| Razorpay onboarding | READY PROCESS / OWNER ACTION OPEN | `PAYMENT_COLLECTION_SETUP.md`, `RAZORPAY_OWNER_CHECKLIST.md` |
| Payment collection | BLOCKED UNTIL LIVE | Razorpay Live activation + settlement bank + accountant/tax presentation |

## Client start
| SOP | Status | Source |
|---|---|---|
| Client onboarding | READY | `CLIENT_ONBOARDING_TEMPLATE.md` |
| Access/credential request + least privilege | READY | `CLIENT_ACCESS_SECURITY_CHECKLIST.md` |
| Sensitive-data scoping | PARTIAL | Working checklist exists; real engagement requires client-specific role/data/security/retention review |
| Workflow confirmation | READY | `DELIVERY_PLAYBOOK.md` |
| Baseline measurement | READY | `MEASUREMENT_SCHEMA.md` |
| Legal/risk owner review | PARTIAL | `OWNER_LEGAL_REVIEW_CHECKLIST.md`; DPDP timing refreshed 31 Aug 2026 |

## Build + delivery
| SOP | Status | Source |
|---|---|---|
| Prototype with synthetic/test data | READY | `DELIVERY_PLAYBOOK.md` |
| Integration implementation | READY | `DELIVERY_PLAYBOOK.md`, `CLIENT_ACCESS_SECURITY_CHECKLIST.md` |
| Human escalation design | READY | same |
| UAT + acceptance | READY | `DELIVERY_PLAYBOOK.md`, Proposal Appendix A |
| Integration failure testing | READY | `DELIVERY_PLAYBOOK.md` |
| Production access review | READY | `CLIENT_ACCESS_SECURITY_CHECKLIST.md` |
| Go-live stabilization | READY | `DELIVERY_PLAYBOOK.md` |
| Change requests | READY | `PROPOSAL_SOW_TEMPLATE.md` |

## Reporting + optimization
| SOP | Status | Source |
|---|---|---|
| Operational measurement | READY | `MEASUREMENT_SCHEMA.md` |
| Pilot/client report | READY | `CLIENT_PILOT_REPORT_TEMPLATE.md` |
| Marketing claim approval | READY | `CLAIMS_REGISTER.md` |
| Monthly support economics | READY | `FINANCIAL_CONTROL.md` |
| Incident response | READY | `INCIDENT_RESPONSE_PLAYBOOK.md` |
| Incident post-mortem / prevention loop | READY | `INCIDENT_RESPONSE_PLAYBOOK.md` |
| Permission-backed case-study process | READY PROCESS / NO CLIENT PROOF YET | `CLAIMS_REGISTER.md`, pilot report process |

## Website + acquisition infrastructure
| SOP | Status | Source / evidence |
|---|---|---|
| Website claim safety | VERIFIED | CI marketing-claim guard + `CLAIMS_REGISTER.md` |
| Repository secret leakage guard | VERIFIED | `scripts/verify-repo-secrets.mjs` + CI |
| Lead endpoint fail-closed behavior | VERIFIED | `/api/lead.js` + automated + production failure tests |
| Dedicated Supabase destination | VERIFIED | project `qfsnmjeacwdkbukwxbwz`, Edge Function + RLS/browser-role denial |
| Durable website lead persistence | VERIFIED | real Vercel→Supabase `201`, replay/conflict/failure tests completed |
| Dedicated Shalcon Vercel deployment | VERIFIED | project `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`, branch `shalcon-market-ready-2026` |
| Staging indexing protection | VERIFIED | live `X-Robots-Tag: noindex, nofollow, noarchive` + Vercel Authentication |
| Live HTTP/API smoke | VERIFIED | homepage/privacy/terms `200`; GET `/api/lead` correctly `405`, POST-only |
| Privacy/website Terms | PARTIAL | drafts exist, owner/legal review pending |
| India DPDP planning baseline | READY / PHASED-LAW AWARE | `INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`, refreshed 31 Aug 2026 |
| Domain/canonical public cutover | BLOCKED | owner must purchase/control final domain first |
| Webhook credential rotation | BLOCKED UNTIL FINAL RELEASE | rotate after infrastructure freeze; prove new works/old fails |
| Final cross-browser/domain release QA | BLOCKED UNTIL CUTOVER | execute after final domain/secret/indexing changes |
| Public indexing enablement | BLOCKED UNTIL RELEASE | deliberate final action only |

## Outreach control
Current outreach capability is prepared, but sending is not an automatic SOP step.

Before first external message:
1. verify current prospect/contact route;
2. use current Google Sheets pipeline as send manifest;
3. for email, confirm approved Shalcon sender mailbox;
4. obtain explicit owner send authorization for the exact controlled batch/channel;
5. send controlled low-volume batch;
6. update actual status/follow-up from real outcome;
7. record opt-out/rejection immediately.

Historical research issues are not send manifests.

## Deferred SOPs
Do not document deeply until workload justifies them:
- hiring/onboarding employees;
- agency-wide procurement;
- partner/channel management;
- multi-team escalation matrices;
- complex enterprise account management;
- international entity/tax structures;
- exit/acquisition planning.

## SOP change rule
When a real project exposes a repeatable failure:
1. fix current project;
2. record root cause;
3. update relevant SOP/template;
4. add an objective test/check where possible.

Documentation earns its place by preventing repeated mistakes, not by making Shalcon look artificially mature.