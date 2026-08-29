# Shalcon Intelligence — Execution Board

Status date: 29 Aug 2026
Operating split target: **ChatGPT ~90% / Abu ~10%**.

This is the action board. Strategy belongs in `MARKET_READY_MASTER.md`; release blockers belong in `LAUNCH_GATE.md`.

## Rules

- ChatGPT continues every task that can be performed safely through connected tools/code/research without asking for unnecessary approval.
- Abu is pulled in only for identity, legal authority, billable account creation, money/KYC, irreversible external business decisions, real client access, or human sales conversations.
- “Prepared” is not “live.” Infrastructure is complete only after deployed verification.
- Do not work on deferred scale theatre while launch-critical work is open.

## Current readiness view

| Area | Working status | Owner now |
|---|---|---|
| Repository / engineering safety | Strong / green CI | ChatGPT |
| Website truth + positioning | Strong | ChatGPT |
| Website conversion UX | Strong, deployment pending | ChatGPT |
| Lead persistence code | Prepared, project deployment blocked | Abu → ChatGPT |
| Preview deployment | Prepared, dedicated project missing | Abu/tool boundary → ChatGPT |
| Sales assets | Strong | ChatGPT |
| Commercial recommendation | Prepared, approval pending | Abu |
| Privacy/data-processing drafts | Strong draft, approval pending | Abu/legal review |
| Payment path | Recommended, account/KYC pending | Abu |
| Prospecting system | Ready | ChatGPT |
| Real sales evidence | Not started | Abu + ChatGPT |
| Permission-backed case study | Not possible before pilot | Joint |

Overall market-readiness estimate should not hide the evidence gap: the agency has a substantial operating system and launch stack, but it is not a proven agency until real prospects/pilots produce evidence.

# P0 — Launch-critical

## 1. Source control / truth

| Task | Status | Owner |
|---|---|---|
| Isolate Shalcon from portfolio `main` | DONE | ChatGPT |
| Recover real Shalcon site | DONE | ChatGPT |
| Remove duplicate legacy source | DONE | ChatGPT |
| Remove obsolete Claude-era build brief | DONE | ChatGPT |
| Claims register | DONE | ChatGPT |
| Truth regression guard | DONE | ChatGPT |
| Repo secret leakage guard | DONE | ChatGPT |
| Dependency/security gates | DONE | ChatGPT |

## 2. Website / positioning

| Task | Status | Owner |
|---|---|---|
| Healthcare-first flagship | DONE | ChatGPT |
| Audit → Pilot → System positioning | DONE | ChatGPT |
| Remove unsupported client proof | DONE | ChatGPT |
| Synthetic demo labeling | DONE | ChatGPT |
| Deterministic safety-aware demo flows | DONE | ChatGPT |
| Healthcare architecture proof | DONE | ChatGPT |
| Trust-by-design section | DONE IN SOURCE | ChatGPT |
| Opportunity estimator redesign | DONE | ChatGPT |
| Conversion tracking architecture | DONE | ChatGPT |
| Booking / WhatsApp / email routes | DONE IN SOURCE | ChatGPT |
| Accessibility / mobile / reduced-motion work | DONE IN SOURCE + prior artifact QA | ChatGPT |
| Security headers | DONE | ChatGPT |
| Latest strict CI after all current changes | VERIFY AFTER QUEUE | ChatGPT |
| Dedicated deployed preview | BLOCKED — no Shalcon Vercel project | ChatGPT after safe project target exists |
| Deployed cross-browser/contact/API QA | WAITING ON PREVIEW | ChatGPT |

## 3. Lead persistence

| Task | Status | Owner |
|---|---|---|
| Harden `/api/lead` | DONE | ChatGPT |
| Require authenticated webhook | DONE | ChatGPT |
| Idempotency contract | DONE | ChatGPT |
| Require `{ok:true, leadId}` acknowledgement | DONE | ChatGPT |
| Cross-site/media-type rejection | DONE | ChatGPT |
| Supabase table design | DONE IN REPO | ChatGPT |
| Supabase Edge Function | DONE IN REPO | ChatGPT |
| RLS/browser-role denial | DONE IN DESIGN | ChatGPT |
| Destination estimator revalidation | DONE | ChatGPT |
| Static persistence safety tests | DONE | ChatGPT |
| Choose/authorize Supabase organization/cost | **OWNER BLOCKER** | **Abu** |
| Create dedicated Shalcon Supabase project | WAITING ON OWNER BLOCKER | ChatGPT/tool after Abu authorization |
| Apply schema | WAITING | ChatGPT |
| Set Edge Function webhook secret | WAITING / account-secret step | Abu + ChatGPT where tool permits |
| Deploy Edge Function | WAITING | ChatGPT |
| Configure Vercel webhook URL/secret | WAITING ON PROJECT | Abu + ChatGPT where tool permits |
| Real success/replay/conflict/failure tests | WAITING | ChatGPT |

## 4. Legal / data handling

| Task | Status | Owner |
|---|---|---|
| Privacy draft | DONE | ChatGPT |
| Website terms draft | DONE | ChatGPT |
| Draft pages noindex | DONE | ChatGPT |
| Current India DPDP timing research | DONE | ChatGPT |
| Data-processing baseline | DONE | ChatGPT |
| DPA template | DONE | ChatGPT |
| Client access/security checklist | DONE | ChatGPT |
| Incident response playbook | DONE | ChatGPT |
| Final legal/business identity | **OWNER BLOCKER** | **Abu** |
| Professional/owner legal review | OWNER BLOCKER | Abu / adviser |
| Replace draft/noindex with approved production legal pages | WAITING ON REVIEW | ChatGPT |

## 5. Commercial / payment

| Task | Status | Owner |
|---|---|---|
| Market pricing research | DONE | ChatGPT |
| Commercial V1 recommendation | DONE | ChatGPT |
| Recommended Healthcare Pilot: ₹39k setup + ₹9k/mo | READY FOR APPROVAL | Abu |
| Scope floors/exclusions/risk limits | DONE | ChatGPT |
| Payment milestone model 50/30/20 | DONE | ChatGPT |
| Razorpay-first / Stripe-nonblocking recommendation | DONE | ChatGPT |
| Final pricing/risk approval | **OWNER BLOCKER FOR PAID WORK** | **Abu** |
| Bank / payment provider / KYC / GST-accounting setup | OWNER BLOCKER | Abu |
| Operational payment-link/invoice workflow | WAITING ON ACCOUNT SETUP | ChatGPT |

# P1 — Revenue engine

## 6. Audit / sales system

| Task | Status | Owner |
|---|---|---|
| Discovery call framework | DONE | ChatGPT |
| Qualification score | DONE | ChatGPT |
| Client-facing audit report template | DONE | ChatGPT |
| Proposal/SOW | DONE | ChatGPT |
| Objection/close playbook | DONE | ChatGPT |
| Onboarding template | DONE | ChatGPT |
| Delivery/UAT | DONE | ChatGPT |
| Measurement/reporting | DONE | ChatGPT |
| Financial control | DONE BASIC | ChatGPT |
| SOP index | DONE | ChatGPT |

## 7. Healthcare acquisition

| Task | Status | Owner |
|---|---|---|
| ICP / targeting rules | DONE | ChatGPT |
| First-100 process | DONE | ChatGPT |
| Initial Mumbai seed accounts | DONE | ChatGPT |
| Email/LinkedIn sequences | DONE | ChatGPT |
| Prospect personalization rules | DONE | ChatGPT |
| Pipeline stages/operating rhythm | DONE | ChatGPT |
| Expand Tier-A researched list | NEXT SAFE TASK | ChatGPT |
| First controlled outreach batch | READY AFTER FINAL TARGET/CONTACT QA | Abu sends/participates; ChatGPT prepares |
| Reply triage + follow-ups | AFTER OUTREACH | ChatGPT + Abu |
| Discovery calls | AFTER POSITIVE REPLIES | Abu, with ChatGPT prep |

# P2 — Proof

## 8. First pilot

| Task | Status | Owner |
|---|---|---|
| Synthetic Healthcare proof | DONE | ChatGPT |
| Synthetic EdTech proof | DONE | ChatGPT |
| Production pilot baseline template | DONE | ChatGPT |
| Select first real pilot | NOT YET POSSIBLE | Abu + ChatGPT |
| Scope production access/data | WAITING ON CLIENT | ChatGPT + Abu/client |
| Build/integrate pilot | WAITING ON CLIENT | ChatGPT where tools/access permit |
| UAT/go-live | WAITING | Joint |
| Measure outcome | WAITING | ChatGPT + client data |
| Client permission for publication | WAITING | Abu |
| Case study | WAITING | ChatGPT |

# P3 — Deliberately deferred

Do not spend launch energy on:
- hiring systems;
- partner/channel programs;
- international entity/tax expansion;
- broad multi-team agency ops;
- five mature SaaS products;
- elaborate content-authority machinery;
- exit strategy.

## Next handoff trigger

ChatGPT should keep executing P0/P1 safe tasks until the next step requires an owner action.

The first likely hard owner action is **authorizing a dedicated Shalcon Supabase project in the connected organization after seeing its cost**. Do not ask for unrelated decisions before that is the actual blocking dependency.
