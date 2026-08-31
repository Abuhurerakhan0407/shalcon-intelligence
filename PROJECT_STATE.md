# PROJECT_STATE.md — Shalcon Intelligence

Status date: 31 Aug 2026
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

Current verified live Shalcon runtime deployment:
- project id: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- branch: `shalcon-market-ready-2026`
- deployed runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- deployment id: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- state: READY / production
- live response header: `X-Robots-Tag: noindex, nofollow, noarchive`

The active branch contains newer documentation/runbook commits after the deployed runtime commit. Those changes do not alter the deployed website/runtime. GitHub CI is green on the reconciled documentation head; Vercel may still rate-limit redundant docs-only deployment attempts.

The first Vercel import from `main` was portfolio code and is not valid Shalcon evidence. Production Branch tracks `shalcon-market-ready-2026`.

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

The only recorded Vercel runtime 401/502 is explained by the intentional forced-failure QA. A 31 Aug production error/fatal log check found no new runtime errors in the prior 24 hours.

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

The current market-ready branch head passes the full GitHub Actions CI gate. A Vercel status failure on newer docs-only commits can reflect Hobby deployment rate limiting rather than CI/runtime failure.

Compiled browser QA previously passed desktop/mobile containment, estimator interaction, failure handling, consent, legal/contact targets, focus trap/return, keyboard close, 44px touch targets and no critical runtime errors.

Live homepage, Privacy and Terms were rechecked on 31 Aug and returned HTTP 200 with the staging `X-Robots-Tag` response header and security headers.

Remaining QA limitation: final deployed Firefox/WebKit-class visual smoke after domain/public-release changes is not yet evidenced.

## 9. Pre-launch indexing / staging protection
The current live production alias serves:
`X-Robots-Tag: noindex, nofollow, noarchive`

This global response header is verified live on the homepage, Privacy and Terms. The homepage HTML still contains `meta robots=index,follow`, but the staging response header intentionally prevents indexing until the final public-release change.

Owner enabled **Vercel Authentication → All Deployments** as additional staging protection.

The source `vercel.json` continues to contain the same global staging robots header. Do not remove the header or disable staging protection until legal/payment/domain release gates are deliberately passed.

Do not spam redeploy attempts merely to deploy documentation-only commits while Hobby build-rate limiting is active.

## 10. Legal/data-protection state
Current drafts/assets:
- `public/privacy.html`
- `public/terms.html`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`
- `docs/PROPOSAL_SOW_TEMPLATE.md`
- `docs/INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`
- `docs/LEAD_RETENTION_RECOMMENDATION.md`

Owner identity is inserted. **Final owner/legal review remains open.** The templates are not legal opinions and engagement-specific role/data/security/retention review remains required where real client personal data is processed.

Never market a generic unsupported “100% DPDP compliant” claim.

## 11. Sales readiness
Complete assets include sales playbook, audit/discovery templates, proposal/SOW, DPA, objection/close playbook, onboarding, UAT/delivery, measurement/reporting, financial control, security/incident SOPs and Healthcare GTM materials.

Healthcare Batch 01:
- eight verified Healthcare prospects are present in the founder-led Google Sheets pipeline;
- all eight pipeline rows are currently `Draft Ready`; sent/replied/discovery counts remain zero;
- eight personalized first-touch Gmail drafts exist and remain unsent;
- the draft copy has been re-reviewed for synthetic-demo framing, public-observation grounding and clinical/human escalation boundaries;
- the currently connected Gmail sender is not the approved Shalcon business mailbox, so **do not send from the connected non-Shalcon mailbox**;
- use/connect the approved Shalcon business mailbox before any authorized send;
- do not use patient booking WhatsApp numbers for unsolicited first-touch outreach;
- do not send external outreach without explicit owner instruction.

## 12. Genuine remaining blockers
### Infrastructure / release
1. Final production domain must be chosen/controlled and canonical/sitemap/social metadata finalized.
2. Rotate the Vercel/Supabase webhook credential before full public/paid launch.
3. Run final deployed cross-browser release QA after domain/secret/public-indexing changes.

### Legal / commercial owner-controlled
4. Complete final owner/legal review of Privacy, Terms, DPA/SOW risk language.
5. Complete UDYAM and Razorpay KYC/bank/accounting collection readiness.
6. Purchase/control the final domain when owner explicitly approves purchase.
7. Connect/use the approved Shalcon business Gmail account before outreach sending.

Identity and Healthcare Pilot price/payment milestones are **no longer blockers**; they were supplied/approved on 30 Aug 2026.

### Market evidence
8. Explicitly authorize and send the first controlled Healthcare outreach batch from the correct Shalcon sender.
9. First qualified audit/proposal.
10. First production pilot.
11. Baseline/post-pilot evidence + permission-backed case study.

## 13. Next execution order
1. Keep current runtime protected and CI green; avoid unnecessary Vercel redeploy attempts.
2. Finish remaining safe legal/payment/domain preparation that does not require owner credentials, purchases or legal acceptance.
3. Complete owner-controlled UDYAM/Razorpay readiness and final legal review.
4. Connect/use the approved Shalcon business Gmail account; send outreach only after explicit owner authorization.
5. Purchase/connect final domain only after explicit owner approval; then finalize canonical/sitemap/social metadata.
6. Rotate integration secret immediately before final public launch and prove new-secret success + old-secret rejection without exposing raw credentials.
7. Run final deployed cross-browser QA, deliberately switch indexing/public-release controls, and record final release evidence.
8. Convert controlled Healthcare outreach → audit → proposal → bounded pilot → measured permission-backed evidence.

## 14. Truth rules
- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims without separately approved contractual basis;
- synthetic demos never presented as client deployments;
- sensitive professional judgment remains human-controlled;
- no mass cold WhatsApp strategy;
- no cross-product infrastructure shortcuts;
- no broad compliance claim without evidence and engagement-specific basis.