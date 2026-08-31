# PROJECT_STATE.md — Shalcon Intelligence

Status date: 31 Aug 2026  
Active branch: `shalcon-market-ready-2026`

Fast recovery handoff. Strategy: `docs/MARKET_READY_MASTER.md`. Release evidence/blockers: `docs/LAUNCH_GATE.md`. Execution order: `docs/EXECUTION_BOARD.md`.

## 1. Non-negotiable repository safety
- Do not edit/merge Shalcon work into portfolio-contaminated `main`.
- Work only on `shalcon-market-ready-2026` unless the repository is deliberately repaired later.
- Do not recreate removed prototype files or already-deployed Vercel/Supabase infrastructure because an old note says it is missing.
- Do not commit secrets, KYC documents, bank data or machine-local agent settings.
- Current branch-protection status could not be read through the connected GitHub integration (`403 Resource not accessible by integration`). Treat branch protection as unverified hardening, not as a launch-complete control. Do not claim it is enabled.

## 2. Positioning
Category: **AI Operations Systems Partner**.

Primary launch wedge: **Healthcare / clinics**.  
Secondary: **EdTech / coaching / admissions**.  
Adjacent supported workflows: Insurance, E-commerce, HR/Recruitment.

Flagship: **AI Front Desk + Lead Operations System** — intake, approved qualification, routing/booking, permission-aware follow-up, CRM/database write-back, reporting and human escalation.

Buying path: Audit → bounded Pilot → connected System.

## 3. Owner-approved identity — LOCKED 30 Aug 2026
- Contracting party: **Abu Hurera Khan**
- Trading name: **Shalcon Intelligence**
- Business type: **Sole proprietorship**
- Business/notice address: **Rm 2, Mahavir Bldg, Opp. P&T Colony, Near Shri Kumar Society, Vakola, Santacruz East, Mumbai 400055, Maharashtra, India**
- Billing/notices email: **shalconintelligence@gmail.com**
- GST status supplied by proprietor: **Not registered**
- Authorized signatory: **Abu Hurera Khan — Founder**

Preferred contract wording: **“Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.”**

Do not ask for these facts again unless owner/accounting/legal review changes them.

## 4. Owner-approved Healthcare commercial baseline
- setup/implementation: **₹39,000**;
- managed optimization/support after stabilization: **₹9,000/month**;
- milestones: **50% start / 30% staging-UAT-ready / 20% production acceptance**;
- third-party/API/message/call/vendor usage: client-paid or separately itemized;
- included stabilization: 14 days after acceptance unless proposal changes it.

Internal negotiation floor remains an internal operating rule only. It was removed from the client-facing SOW template and must not be exposed to prospects.

## 5. Stack / live deployment
- Vite 8 / React 18 / Tailwind v4
- Three.js lazy decorative enhancement
- GSAP / ScrollTrigger
- Vercel `/api/lead`
- dedicated Supabase persistence in `ap-south-1`

Live staging alias: `https://shalcon-intelligence.vercel.app`

Verified runtime:
- Vercel project ID: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- production branch: `shalcon-market-ready-2026`
- runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- deployment ID: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- state: READY / production
- live staging header: `X-Robots-Tag: noindex, nofollow, noarchive`
- Vercel Authentication: enabled for All Deployments during staging

Newer branch commits are primarily control/runbook/client-safety documentation. Do not redeploy merely to make deployment SHA equal documentation head.

## 6. Lead capture — VERIFIED END TO END
Flow: Browser → Vercel `/api/lead` → authenticated HTTPS webhook → dedicated Shalcon Supabase.

Supabase:
- project: `shalcon-intelligence`
- ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- table: `public.shalcon_leads`
- RLS enabled;
- `anon` / `authenticated` access revoked;
- Edge Function `shalcon-lead-webhook` active.

Verified evidence:
- wrong destination secret rejected;
- first write → `201`;
- exact replay → valid replay without duplicate;
- conflicting replay → rejected;
- live Vercel→Supabase write → `201` with consent/UTM/server-computed estimator values;
- forced destination verifier failure → Vercel `502 lead_persistence_failed`, no false success/no extra row;
- verifier restored → success retested;
- synthetic QA rows deleted.

Lead capture is not a current blocker. The shared production webhook credential must still be rotated immediately before final public/paid launch because it was manually transferred during setup.

## 7. Website / trust state
Implemented and verified in source/current runtime where applicable:
- Healthcare-first flagship and architecture proof;
- unsupported metrics/testimonials removed;
- deterministic synthetic demo + human escalation boundaries;
- editable Opportunity-at-Risk Estimator with non-guarantee framing;
- booking / WhatsApp / LinkedIn / email routes;
- conversion/UTM tracking without unnecessary lead-data expansion;
- Privacy/Terms drafts with proprietor identity;
- keyboard/focus/mobile accessibility improvements;
- constrained/mobile/save-data/reduced-motion WebGL fallback;
- CSP/security headers;
- Trust-by-Design section.

Homepage, Privacy and Terms were rechecked live on 31 Aug and returned HTTP 200 with staging/security headers. Runtime error/fatal log review found no new production errors in the checked prior-day window.

## 8. CI / QA
Workflow: `.github/workflows/shalcon-market-ready-ci.yml`.

Gates include:
- repository secret leakage;
- Vercel JSON validation;
- dependency/security audit;
- runtime dependency usage;
- marketing-claim regression;
- lead/API/client/demo/Supabase/legal safety tests;
- production build;
- compiled artifact secret/claim/performance budgets.

Current reconciled branch work must remain passing GitHub Actions CI. Prior browser QA passed desktop/mobile containment, estimator interaction/failure handling, focus behavior, touch targets and no critical runtime errors in tested artifacts.

Remaining release QA: final deployed Chromium + Firefox/WebKit-class smoke after final domain, secret and public-indexing changes.

## 9. Legal / client-document state
Prepared:
- `public/privacy.html`
- `public/terms.html`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`
- `docs/PROPOSAL_SOW_TEMPLATE.md`
- `docs/OWNER_LEGAL_REVIEW_CHECKLIST.md`
- `docs/INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`
- `docs/LEAD_RETENTION_RECOMMENDATION.md`

The SOW and automation-audit templates have mandatory pre-send scrub gates. Shalcon’s internal minimum price floor is not present in client-facing commercial text.

Owner/legal review remains open. Do not market a generic “100% DPDP compliant/secure” claim. Real sensitive-data engagements require engagement-specific review.

## 10. Payment / UDYAM
Invoice template and Razorpay/payment-link operating guidance exist.

Payment readiness remains owner-controlled:
- Razorpay KYC/business-proof activation;
- settlement bank verification;
- accountant/tax presentation while GST-unregistered.

**UDYAM is intentionally PAUSED. Abu explicitly said to leave UDYAM/MSME untouched until he provides an update. Do not ask, infer, mark complete or continue UDYAM work meanwhile.**

## 11. Sales state
Live Google Sheets founder-led pipeline contains **16 active Healthcare prospects**.

Current state verified from the live Sheet:
- `Research Ready`: **3**
- `Draft Ready`: **13**
- sent: **0**
- replied: **0**
- discovery: **0**

`Research Ready` is a deliberate pre-draft state: current public workflow evidence exists, but the decision-maker/contact route and/or personalized first-touch draft still needs verification. It must never be counted as send-ready.

The remaining `Research Ready` accounts are:
- Clinical Diagnostic Centre (CDC);
- Happy Teeth by Dr. Bajani;
- Mumbai Diagnostic Centre.

Five of the 31 Aug research additions now have founder/decision-level LinkedIn drafts in `docs/HEALTHCARE_OUTREACH_DRAFTS_BATCH_02_2026-08-31.md`: Shroff Eye Hospital / Dr. Anand Shroff, Tru Smile / Dr. Riyaz Quereshi, Neevwellbeing / Dr. Chandraprabha Kumar, Sirona Diagnostics / Niteen Tulpule, and Vinit Eye Clinic / Dr. Vinit Shah.

The earlier eight personalized Gmail drafts also remain unsent. Therefore `Draft Ready = 13` does **not** mean 13 Gmail drafts: 8 are Gmail drafts and 5 are repo-stored LinkedIn drafts.

Critical sender control: connected Gmail currently belongs to a non-Shalcon mailbox. **Do not send from it.** Connect/use `shalconintelligence@gmail.com` or another owner-approved Shalcon sender before email outreach.

External outreach on any channel still requires explicit owner authorization.

Historical GitHub Healthcare research issue #27 is a research pool, not the live send manifest. Use current Google Sheet + current draft assets before any send.

## 12. Domain / SEO
Latest connected 31 Aug recheck:
- `shalconintelligence.com` — available — $11.25/year — recommended;
- `shalcon.io` — $30/year;
- `shalcon.ai` — $160/2 years.

No purchase has been made through this workflow. Do not purchase without explicit owner approval.

After ownership: attach only to the dedicated Shalcon Vercel project, verify DNS/TLS/canonical redirects, add canonical/absolute social metadata/robots/sitemap, rotate webhook credential, run final release QA, then deliberately remove staging auth/noindex.

## 13. Genuine remaining blockers
### Owner-controlled
1. UDYAM update — paused pending owner response.
2. Razorpay KYC / settlement bank / accountant-tax readiness.
3. Final owner/legal review of Privacy, Terms, DPA/SOW risk positions.
4. Correct Shalcon Gmail connection/use.
5. Explicit outreach-send authorization.
6. Final production-domain purchase/control.

### Release work after owner gates
7. Attach/finalize domain + canonical/social/robots/sitemap.
8. Rotate Vercel/Supabase webhook credential and prove new works / old fails.
9. Final deployed Chromium + Firefox/WebKit-class/domain/API QA.
10. Deliberately remove staging Authentication/noindex and verify production indexing.

### Market evidence
11. Continue recipient-route research for the 3 remaining `Research Ready` accounts without lowering verification standards.
12. First qualified discovery/audit/proposal.
13. First paid bounded pilot.
14. Baseline/post-pilot evidence.
15. Permission-backed case study.

## 14. Next execution order
1. Keep current runtime staging-protected and CI green.
2. Do not touch UDYAM until Abu updates it.
3. Continue public research/contact-route verification for the 3 `Research Ready` Healthcare accounts without sending.
4. Resolve owner/legal + Razorpay/bank/accounting readiness.
5. Connect correct Shalcon sender and obtain explicit first-send authorization.
6. Purchase/connect final domain only after explicit cost approval.
7. Rotate integration secret immediately before final public launch.
8. Run final deployed cross-browser/domain/API QA and deliberately enable public indexing.
9. Convert controlled outreach → discovery → audit → proposal → bounded pilot → measured permission-backed proof.

## 15. Truth rules
- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims;
- synthetic demos never presented as client deployments;
- sensitive professional judgment remains human-controlled;
- no mass cold WhatsApp;
- no patient-booking WhatsApp used as default cold first touch;
- no cross-product infrastructure shortcuts;
- no broad compliance/security claim without evidence and engagement-specific basis;
- no external sends, purchases, KYC actions or legal approvals inferred from preparation alone.
