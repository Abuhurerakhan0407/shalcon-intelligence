# PROJECT_STATE.md — Shalcon Intelligence

Status date: 31 Aug 2026  
Active branch: `shalcon-market-ready-2026`

Fast authoritative handoff. Strategy: `docs/MARKET_READY_MASTER.md`. Release evidence: `docs/LAUNCH_GATE.md`. Execution order: `docs/EXECUTION_BOARD.md`.

## 1. Repository safety
- Never edit/merge Shalcon work into portfolio-contaminated `main`.
- Work on `shalcon-market-ready-2026` unless the repository is deliberately repaired later.
- Do not recreate already-deployed Vercel/Supabase infrastructure because old notes say it is missing.
- Never commit secrets, KYC documents, bank data or machine-local agent settings.
- Branch-protection state is **unverified**: the connected GitHub integration returned `403 Resource not accessible by integration` for the protection endpoint. Do not claim it is enabled.

## 2. Positioning / offer
Category: **AI Operations Systems Partner**.  
Primary wedge: **Healthcare / clinics**.  
Secondary: EdTech / coaching / admissions.  
Flagship: **AI Front Desk + Lead Operations System** — intake, approved qualification, routing/booking, permission-aware follow-up, CRM/database write-back, reporting and human escalation.

Buying path: Audit → bounded Pilot → connected System.

## 3. Locked owner/business facts
- Contracting party: **Abu Hurera Khan**
- Trading name: **Shalcon Intelligence**
- Business type: sole proprietorship
- Authorized signatory: Abu Hurera Khan — Founder
- Billing/notices email: `shalconintelligence@gmail.com`
- GST status supplied by proprietor: not registered
- Preferred contract wording: **“Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.”**

Do not ask for these facts again unless owner/accounting/legal review changes them.

## 4. Approved Healthcare commercial baseline
- ₹39,000 setup/implementation
- ₹9,000/month managed support after stabilization
- 50% start / 30% staging-UAT-ready / 20% production acceptance
- third-party/API/message/call/vendor usage: client-paid or separately itemized
- 14-day stabilization unless SOW changes it

Internal negotiation floors stay internal and must not appear in client documents.

## 5. Live infrastructure
### Vercel
- project: `shalcon-intelligence`
- project ID: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- production branch: `shalcon-market-ready-2026`
- runtime deployment: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- alias: `https://shalcon-intelligence.vercel.app`
- global staging header: `X-Robots-Tag: noindex, nofollow, noarchive`
- Vercel Authentication: enabled during staging

Do not redeploy only to make the runtime SHA match documentation-only commits.

### Supabase
- project: `shalcon-intelligence`
- ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- table: `public.shalcon_leads`
- RLS enabled; browser roles denied
- Edge Function `shalcon-lead-webhook` active

Lead capture is verified end-to-end: successful write/replay, conflicting replay rejection, fail-closed destination failure, recovery, and QA-row cleanup were tested. Production webhook credential still needs final rotation immediately before public launch because it was manually transferred during setup.

## 6. Website / QA state
Implemented and verified:
- Healthcare-first flagship positioning
- unsupported testimonials/metrics removed
- clearly synthetic demo
- Opportunity-at-Risk Estimator with editable assumptions/non-guarantee framing
- booking, WhatsApp, LinkedIn and email routes
- lead persistence + consent/attribution controls
- Privacy/Terms drafts
- accessibility/mobile/reduced-motion fallbacks
- CSP/security headers
- CI gates for secrets, dependencies, claims, API/client/demo/Supabase/legal safety, build and compiled artifacts

Homepage, Privacy and Terms returned HTTP 200 during 31 Aug live checks; staging noindex remained active and the checked prior-day runtime window had no new production error/fatal logs.

Final domain/secret/indexing changes still require deployed Chromium + Firefox/WebKit-class smoke.

## 7. Legal / payment / UDYAM
Prepared: Privacy, Terms, DPA, SOW, owner legal checklist, data-protection baseline, retention recommendation, invoice/payment guides.

Client SOW and automation-audit templates have pre-send scrub gates. No internal price floor should leak to clients.

Owner/legal review remains open. Never claim generic “100% DPDP compliant/secure.” Sensitive-data engagements require engagement-specific controls/review.

Payment readiness still requires owner-controlled Razorpay KYC/business proof, settlement bank verification and accountant/tax presentation.

**UDYAM/MSME is intentionally PAUSED. Do not ask, infer, complete or continue it until Abu provides his update.**

## 8. Live sales state — VERIFIED 31 Aug
Google Sheet: **Shalcon Intelligence — Sales Pipeline**  
Spreadsheet ID: `1AhYb8qOAcDhFaaTmrwubsyXmio7TUsHMVaChynuo0CQ`  
Tab: `Pipeline`

Current live counts:
- active Healthcare prospects: **16**
- `Draft Ready`: **15**
- `Research Ready`: **1**
- sent: **0**
- replied: **0**
- discovery: **0**

Draft inventory:
- 8 earlier personalized Gmail drafts — unsent;
- 7 verified LinkedIn drafts in `docs/HEALTHCARE_OUTREACH_DRAFTS_BATCH_02_2026-08-31.md` — unsent.

Batch 02 recipients:
- Dr. Anand Shroff — Shroff Eye Hospital
- Niteen Tulpule — Sirona Diagnostics
- Dr. Chandraprabha Kumar — Neevwellbeing’s The Dental Clinic
- Dr. Vinit Shah — Vinit Eye Clinic
- Dr. Riyaz Quereshi — Tru Smile
- Feriel Palia Jackson — Clinical Diagnostic Centre
- Dr. Priyank Bajani — Happy Teeth by Dr. Bajani

Sole `Research Ready` account: **Mumbai Diagnostic Centre**. Keep it unpromoted until a sufficiently clean decision-maker/business-development route is verified. Do not use ambiguous support/patient routes or scraped third-party personal data merely to fill the pipeline.

`Draft Ready` does not mean contacted. No external outreach has been sent.

Critical email sender control: connected Gmail is not the approved Shalcon mailbox. **Do not send from it.** Email outreach requires `shalconintelligence@gmail.com` or another owner-approved Shalcon sender.

All external outreach, including LinkedIn, still requires explicit owner authorization.

## 9. Domain / release
Recommended domain: `shalconintelligence.com`; last connected check on 31 Aug showed it available at $11.25/year. No purchase made. Recheck and obtain explicit owner approval before purchase.

After ownership:
1. attach only to correct Vercel project;
2. verify DNS/TLS/apex-www redirect;
3. add canonical, absolute OG/Twitter metadata, robots and sitemap;
4. rotate Vercel→Supabase webhook credential;
5. prove new credential works and old fails without exposing either;
6. run final domain/API/cross-browser QA;
7. deliberately remove staging auth/noindex only when public release is approved.

## 10. Genuine remaining gates
### Owner-controlled
1. UDYAM update — paused.
2. Razorpay KYC / settlement bank / accountant-tax readiness.
3. Final Privacy/Terms/SOW/DPA business-risk/legal review.
4. Correct Shalcon Gmail connection/use.
5. Explicit external outreach authorization.
6. Production-domain purchase/control.

### ChatGPT after owner gates
7. Domain/canonical/social/robots/sitemap cutover.
8. Production webhook-secret rotation.
9. Final deployed browser/domain/API QA.
10. Deliberate public-indexing cutover.
11. Controlled send execution + pipeline updates from real outcomes.

### Market evidence
12. First qualified discovery/audit/proposal.
13. First paid bounded pilot.
14. Baseline/post-pilot evidence.
15. Permission-backed case study.

## 11. Execution order
1. Keep runtime protected and CI green.
2. Leave UDYAM untouched until owner update.
3. Keep Mumbai Diagnostic Centre research-only unless recipient evidence improves.
4. Await owner/legal/payment/sender/send/domain gates while avoiding fake busywork.
5. After authorization, execute a small controlled outreach batch and record real outcomes.
6. Convert positive reply → discovery → audit → proposal → bounded pilot → measured proof.

## 12. Truth rules
- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims;
- synthetic demos are never client deployments;
- sensitive professional judgment remains human-controlled;
- no mass cold WhatsApp;
- patient-booking WhatsApp is not a default cold channel;
- no cross-product infrastructure shortcuts;
- no broad compliance/security claim without evidence;
- no external sends, purchases, KYC actions or legal approvals inferred from preparation alone.
