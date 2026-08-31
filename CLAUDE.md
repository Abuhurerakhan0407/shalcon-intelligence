# SHALCON INTELLIGENCE — AGENT CONTEXT

Read `PROJECT_STATE.md` first for current implementation state, `docs/LAUNCH_GATE.md` for release evidence/blockers, and `docs/MARKET_READY_MASTER.md` for strategy. Older phase notes and legacy prototype files are historical only.

## Company / offer
Shalcon Intelligence is an AI automation agency / AI Operations Systems Partner.

Primary launch wedge: **Healthcare / clinics**.
Secondary: **EdTech / coaching / admissions**.
Adjacent supported workflows: Insurance, E-commerce, HR/Recruitment.

Flagship: **AI Front Desk + Lead Operations System** — intake, approved qualification, routing/booking, permission-aware follow-up, CRM/database write-back, operational reporting and human escalation.

Sell connected workflows, not isolated AI tools.

## Truth rules
- Never invent client metrics, uptime, testimonials or proof.
- Public demos are synthetic unless verified otherwise.
- Numeric client-result claims require evidence + permission in `docs/CLAIMS_REGISTER.md`.
- Opportunity-at-Risk Estimator is a planning model, not verified loss/recovery.
- Never guarantee revenue, conversion, recovery or breakeven.
- Sensitive professional judgment remains human-controlled.
- Do not imply a lead was saved unless durable persistence acknowledged it.

## Acquisition rules
- Default first-touch: targeted email / LinkedIn / manual founder-led outreach.
- No mass cold WhatsApp strategy.
- Do not use patient booking WhatsApp numbers for unsolicited outreach.
- Eight Healthcare drafts exist but remain unsent.
- Current connected Gmail sender is **not** the approved Shalcon business mailbox; do not send from that account.
- External sends require owner authorization.

## Repository rules
- Work only on `shalcon-market-ready-2026`.
- Do not edit/merge `main` while it contains portfolio work.
- Do not recreate removed prototype source as active source.
- Never commit real secrets, KYC material, bank data or machine-local agent settings.
- Keep CI green and avoid unnecessary deployment-only commits.

## Technical state — VERIFIED
Stack: Vite 8, React 18, Tailwind v4, Three.js, GSAP/ScrollTrigger, Vercel `/api/lead`, dedicated Supabase persistence.

Lead path is live and verified:
Browser → Vercel `/api/lead` → authenticated HTTPS webhook → dedicated Shalcon Supabase.

Verified behaviors include successful durable write, replay handling, conflict rejection, fail-closed persistence behavior and restored production destination. Synthetic QA rows were cleaned.

Current live runtime:
- Vercel project: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- branch: `shalcon-market-ready-2026`
- deployed runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- deployment: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- alias: `https://shalcon-intelligence.vercel.app`
- staging header: `X-Robots-Tag: noindex, nofollow, noarchive` verified live

## Current owner-controlled gates
Do not fake completion of these:
1. final owner/legal review of Privacy, Terms, SOW/DPA risk language;
2. Razorpay/bank/accounting/KYC readiness;
3. UDYAM status — **owner has asked agents to leave this untouched until owner provides an update**;
4. owner purchase/control of final production domain;
5. correct Shalcon Gmail connection/use before outreach sending;
6. explicit authorization before first external outreach send;
7. production webhook-secret rotation immediately before final public launch;
8. first real qualified audit/pilot and permission-backed proof.

## Remaining ChatGPT-safe work
- eliminate stale project-control documentation;
- maintain domain/SEO release runbook without purchasing anything;
- prepare exact owner/legal decision pack without declaring legal approval;
- keep payment workflow guidance accurate without collecting KYC material;
- keep release evidence coherent;
- expand/research pipeline only when it does not distract from first controlled batch;
- prepare final cross-browser/domain release QA for execution after domain cutover.

## Execution behavior
Do not stop for cosmetic approvals. Continue reversible, non-owner-dependent work until a real credential, legal authority, purchase, KYC, external send, or client-data decision is required.
