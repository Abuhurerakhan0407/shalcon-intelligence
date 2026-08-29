# PROJECT_STATE.md — Shalcon Intelligence

Status date: 30 Aug 2026
Branch: `shalcon-market-ready-2026`

Fast recovery handoff. Strategy/source of truth: `docs/MARKET_READY_MASTER.md`. Release evidence: `docs/LAUNCH_GATE.md`.

## 1. Repository safety
- **Do not edit or merge into `main` while it contains Abu's portfolio work.**
- Shalcon market-ready work lives only on `shalcon-market-ready-2026`.
- Old prototype duplicates and obsolete Claude-era preservation instructions were removed from the active branch.
- `.env*`, `.vercel` and local secret/deployment files are ignored; `.env.example` is intentionally tracked.

## 2. Positioning
Category: **AI Operations Systems Partner**.

Primary wedge: **Healthcare / clinics**.
Secondary: **EdTech / coaching / admissions**.
Adjacent supported workflows: Insurance, E-commerce, HR/Recruitment.

Flagship: **AI Front Desk + Lead Operations System** — intake, qualification, routing/booking, approved follow-up, CRM/database write-back, reporting and human escalation.

Buying path: Audit → bounded Pilot → connected System.

## 3. Owner-approved business identity — LOCKED 30 Aug 2026
Use these facts unless the owner explicitly changes them:
- Contracting party: **Abu Hurera Khan**
- Trading name: **Shalcon Intelligence**
- Business type: **Sole proprietorship**
- Business/notice address: **Rm 2, Mahavir Bldg, Opp. P&T Colony, Near Shri Kumar Society, Vakola, Santacruz East, Mumbai 400055, Maharashtra, India**
- Billing/notices email: **shalconintelligence@gmail.com**
- GST status supplied by proprietor: **Not registered**
- Authorized signatory: **Abu Hurera Khan**
- Signatory title: **Founder**

For contracts/DPA, preferred unambiguous party wording is: **“Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.”**

Do not ask the owner for these details again unless a later legal/accounting review requires a change.

## 4. Owner-approved commercial baseline — LOCKED 30 Aug 2026
Healthcare AI Front Desk + Lead Operations Pilot:
- setup/implementation: **₹39,000**;
- managed optimization/support after stabilization: **₹9,000/month**;
- implementation collection: **50% start / 30% staging-UAT-ready / 20% production acceptance**;
- third-party/API/message/call/vendor usage: client-paid or separately itemized;
- included stabilization: 14 days after acceptance unless proposal changes it;
- internal floor: do not go below ₹30,000 setup or ₹7,500/month support without written scope reduction or explicit strategic approval.

Public website pricing may remain indicative; this is the approved proposal default, not a requirement to publish a fixed price card.

## 5. Stack
- Vite 8 / React 18 / Tailwind v4
- Three.js lazy decorative enhancement
- GSAP / ScrollTrigger
- Vercel server route `/api/lead`
- Dedicated Supabase lead persistence in `ap-south-1`

Direct runtime dependencies intentionally limited to React, React DOM, Three.js and GSAP.

## 6. Website/trust state
Implemented:
- Healthcare-first flagship and architecture proof;
- unsupported metrics/testimonials removed;
- marketing truth regression guard;
- deterministic synthetic demo scenarios with safety/routing boundaries;
- editable Opportunity-at-Risk Estimator with clear limitations;
- booking, WhatsApp, LinkedIn and email routes;
- conversion/UTM tracking without unnecessary lead-data expansion;
- Privacy/Terms drafts with owner identity inserted;
- keyboard/focus/mobile accessibility improvements;
- constrained/mobile/save-data/reduced-motion WebGL fallback;
- Vercel CSP/security headers;
- Trust-by-Design section.

Live alias: `https://shalcon-intelligence.vercel.app`

Verified live Shalcon deployment:
- project id: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- branch: `shalcon-market-ready-2026`
- verified live commit: `9a32577ec4b339b5b71482ae41cc2726f00bab80`
- deployment id: `dpl_GhJnrgAksxEvDwe7umhgbfNuxiR9`
- state: READY / production

The first Vercel import from `main` was portfolio code and is not valid Shalcon evidence. Production Branch now tracks `shalcon-market-ready-2026`.

## 7. Lead capture — VERIFIED END TO END
Flow: Browser → `/api/lead` → authenticated HTTPS webhook → dedicated Shalcon Supabase.

Vercel route protections include POST-only handling, size limit, honeypot, bounded inputs, consent, WhatsApp normalization, server-side estimator recomputation, minimized page/referrer storage, allowlisted UTM attribution, HTTPS-only persistence, generated UUID/idempotency key and explicit `{ok:true}` acknowledgement before success.

Dedicated Supabase:
- project: `shalcon-intelligence`
- ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- table RLS enabled;
- `anon`/`authenticated` access revoked;
- Edge Function `shalcon-lead-webhook` active;
- raw shared secret not committed to Git/Supabase source.

Evidence:
- destination wrong secret → 401;
- first write → 201;
- exact replay → 200 / `replay:true`;
- conflicting replay → 409;
- live Vercel `/api/lead` → Supabase → 201 with correct consent/UTM/server-computed values;
- forced real destination failure → Vercel 502 `lead_persistence_failed`, no false saved state/no extra row;
- destination restored → subsequent live 201;
- all synthetic QA rows deleted; table returned to zero rows.

The only recorded Vercel runtime 401/502 is explained by the intentional forced-failure QA.

## 8. CI / QA
Workflow: `.github/workflows/shalcon-market-ready-ci.yml`.

Current gates cover:
- repository secret leakage;
- Vercel JSON validation;
- dependency/security audit;
- runtime dependency usage;
- marketing claim regression;
- lead/API/client/demo/Supabase/legal safety tests;
- production build;
- compiled artifact secret/claim/performance budgets.

Latest robots-header source commit passed the full GitHub Actions gate.

Compiled browser QA previously passed desktop/mobile containment, estimator interaction, failure handling, consent, legal/contact targets, focus trap/return, keyboard close, 44px touch targets and no critical runtime errors.

Remaining QA limitation: deployed Firefox/WebKit-class visual smoke is not yet evidenced.

## 9. Pre-launch indexing / staging protection
The verified live build `9a32577...` still contains homepage `index,follow`.

Latest source `vercel.json` contains:
`X-Robots-Tag: noindex, nofollow, noarchive`

Latest relevant source commit: `1caa3b2b362966366f3eeab76b63d665fbcf43b6`.

Vercel Hobby build-rate limiting is rejecting new deployments, so the response-header change is **not live yet**. Do not claim otherwise.

Owner enabled **Vercel Authentication → All Deployments**, which is the interim staging protection while waiting for the build window to reopen.

Do not spam redeploy attempts.

## 10. Legal/data-protection state
Current drafts/assets:
- `public/privacy.html`
- `public/terms.html`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`
- `docs/PROPOSAL_SOW_TEMPLATE.md`
- `docs/INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`

Owner identity is inserted. **Final owner/legal review remains open.** The templates are not legal opinions and engagement-specific role/data/security/retention review remains required where real client personal data is processed.

Never market a generic unsupported “100% DPDP compliant” claim.

## 11. Sales readiness
Complete assets include sales playbook, audit/discovery templates, proposal/SOW, DPA, objection/close playbook, onboarding, UAT/delivery, measurement/reporting, financial control, security/incident SOPs and Healthcare GTM materials.

Healthcare Batch 01:
- six Tier-A businesses have current public-observation/recipient verification recorded in Issue #27;
- directly strong first-touch routes currently include The Dental Hub email, VRX professional email and Meesha founder LinkedIn;
- two vetted email messages are saved in Gmail as **drafts only** and have not been sent;
- do not use patient booking WhatsApp numbers for unsolicited first-touch outreach;
- do not send external outreach without explicit owner instruction.

## 12. Genuine remaining blockers
### Infrastructure / release
1. Vercel Hobby build window must reopen.
2. Deploy and verify the committed global robots header.
3. Run final deployed release QA, including a Firefox/WebKit-class pass where available.
4. Rotate Vercel/Supabase webhook credential before full public/paid launch.
5. Choose/control final production domain and finalize canonical/sitemap/social metadata.

### Legal / commercial owner-controlled
6. Final owner/legal review of Privacy, Terms, DPA/SOW risk language.
7. Payment/KYC/bank/accounting collection path ready.

Identity and Healthcare Pilot price/payment milestones are **no longer blockers**; they were supplied/approved on 30 Aug 2026.

### Market evidence
8. Send first controlled Healthcare outreach batch when owner authorizes sending.
9. First qualified audit/proposal.
10. First production pilot.
11. Baseline/post-pilot evidence + permission-backed case study.

## 13. Next execution order
1. Keep CI green while Vercel throttles.
2. Finish safe legal/payment/domain preparation that does not require owner credentials or purchases.
3. When Vercel build window reopens, deploy/verify robots protection and rerun release QA.
4. Complete owner/legal review and payment/KYC readiness.
5. Purchase/connect final domain when owner authorizes the cost.
6. Rotate integration secret immediately before final public launch.
7. Run controlled Healthcare outreach only after explicit send approval.
8. Convert audit → proposal → bounded pilot → measured evidence.

## 14. Truth rules
- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims without separately approved contractual basis;
- synthetic demos never presented as client deployments;
- sensitive professional judgment remains human-controlled;
- no mass cold WhatsApp strategy;
- no cross-product infrastructure shortcuts;
- no broad compliance claim without evidence and engagement-specific basis.
