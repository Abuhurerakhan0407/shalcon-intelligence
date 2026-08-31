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
- Billing/notices + approved outreach sender: `shalconintelligence@gmail.com`
- Owner confirms direct access/control of this mailbox.
- User-provided ChatGPT Gmail settings screenshot on 31 Aug visibly shows `shalconintelligence@gmail.com` connected.
- Connected Google Calendar independently returns **Shalcon Intelligence / `shalconintelligence@gmail.com`**.
- Connected Google Drive currently returns **Abu hurera Khan / `iamabuhurerakhan@gmail.com`**; the live pipeline and finance ledger are in this owner-controlled Drive workspace. This is usable but must not be mislabeled as the Shalcon business Google account.
- Gmail connector execution currently fails at tool level with `Resource not found`; this is a connector-resolution bug, not an owner mailbox-access problem.
- GST status supplied by proprietor: not registered.
- **UDYAM/MSME: owner reports obtained on 31 Aug 2026.**
- **Owner business legal defaults approved 31 Aug 2026.** This is business approval, not professional legal/counsel sign-off.
- Preferred contract wording: **“Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.”**

The MSME certificate itself is private owner material and is not stored in this public repository. Do not request or commit PAN/Aadhaar/OTP/bank/KYC data. Use the owner-controlled certificate directly only where a legitimate private onboarding/accounting process needs it.

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
- last independently verified READY deployment before this handoff update: `dpl_9QG2rBdwArU7tUp7wvY5UEDYw4qZ`
- last independently verified deployed commit before this handoff update: `946094af4ce545ad2b58c87b6b92f9a56f246d15`
- alias: `https://shalcon-intelligence.vercel.app`
- global staging header: `X-Robots-Tag: noindex, nofollow, noarchive`
- Vercel Authentication: enabled during staging

A previous deployment attempt on green branch head `d6748e8ec25d36a78badd8480ec40dca591d3dbf` was blocked by Vercel `build-rate-limit`. Investigation proved the same Shalcon repo/branch was also triggering legacy portfolio projects `abu_portfolio2` and `abu-hurera-portfolio-v2`. Owner reports those two portfolio Git links were removed on 31 Aug 2026. This commit is the single controlled post-cleanup trigger; verify actual Vercel deployment evidence before claiming the runtime updated.

### Supabase
- project: `shalcon-intelligence`
- ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- table: `public.shalcon_leads`
- RLS enabled; browser roles denied
- Edge Function `shalcon-lead-webhook` active

Lead capture is verified end-to-end: successful write/replay, conflicting replay rejection, fail-closed destination failure, recovery, and QA-row cleanup were tested. Production webhook credential still needs final rotation immediately before public launch because it was manually transferred during setup.

## 6. Website / QA state
Implemented and verified in source:
- Healthcare-first flagship positioning
- unsupported testimonials/metrics removed
- clearly synthetic demo
- Opportunity-at-Risk Estimator with editable assumptions/non-guarantee framing
- booking, WhatsApp, LinkedIn and email routes
- lead persistence + consent/attribution controls
- accessibility/mobile/reduced-motion fallbacks
- CSP/security headers
- CI gates for secrets, dependencies, claims, API/client/demo/Supabase/legal safety, build and compiled artifacts
- owner-reviewed Privacy/Terms source with approved lead-retention defaults
- legal CI guard updated after owner approval

CI #264 passed on `d6748e8ec25d36a78badd8480ec40dca591d3dbf` before this state-update commit.

The last independently checked live staging deployment returned HTTP 200 for Homepage, Privacy and Terms and preserved global `X-Robots-Tag: noindex, nofollow, noarchive`. At that check, live Privacy/Terms still showed the older 30 Aug draft wording because the newer source had not yet deployed. Reverify after this post-cleanup deployment trigger.

Final domain/secret/indexing changes still require deployed Chromium + Firefox/WebKit-class smoke.

## 7. Legal / MSME / payment
Prepared: Privacy, Terms, DPA, SOW, owner legal checklist, data-protection baseline, retention recommendation, invoice/payment guides and native finance ledger.

Client SOW and automation-audit templates have pre-send scrub gates. No internal price floor should leak to clients.

### Owner legal decision
Owner approved the prepared business defaults on 31 Aug 2026, including the operational Privacy/Terms/SOW/DPA positions, 90/180-day public-lead retention defaults, milestone-based cancellation/refund position, Mumbai/Maharashtra/India dispute preference, bounded-liability preference and human control of sensitive decisions.

This closes the **owner business-decision gate**. It does **not** equal professional legal advice or counsel sign-off. Use engagement-specific/professional review where triggered by material health/sensitive-data processing, unusual liability/SLA/refund terms, cross-border processing, or material first-client contract reliance. Never claim generic “100% DPDP compliant/secure.”

### DPDP timing
India DPDP baseline was refreshed 31 Aug 2026 against the 13 Nov 2025 Gazette notifications. Do not pretend all substantive duties are already in force. One-year and eighteen-month commencement tranches are scheduled, including major dates **13 Nov 2026** and **13 May 2027**, subject to later legal changes.

### MSME
**No longer a blocker:** owner reports MSME/UDYAM obtained on 31 Aug 2026. Treat this as owner-reported complete; do not claim certificate-field verification unless the private certificate is actually reviewed for a specific legitimate need.

### Finance/payment preparation
Native Google Sheet: **Shalcon Intelligence — Invoice & Payment Ledger**  
Spreadsheet ID: `1LWV_P9z2bNehYfcz4ieIgncRhY2UvswjmpQaR-XX7lg`

This ledger currently resides in the owner-controlled Google Drive identity `iamabuhurerakhan@gmail.com`. Do not migrate or duplicate it merely to unify connector accounts unless the owner explicitly asks.

Verified preparation:
- India timezone;
- native invoice table + validation;
- summary formulas;
- approved Healthcare milestone values;
- current working invoice seed `SI-2026-0001`;
- no fake invoice rows;
- KYC/secrets excluded;
- current GST-unregistered invoice wording does not present the document as a GST tax invoice or collect GST.

Payment readiness is now narrowed to:
- Razorpay KYC + Live activation using accurate proprietorship details and owner-controlled business proof;
- settlement bank verification;
- accountant confirmation for invoice numbering/TDS/income-tax/recordkeeping presentation while GST-unregistered;
- first real Payment Link/payment/settlement reconciliation after Live activation.

## 8. Live sales state — VERIFIED 31 Aug
Google Sheet: **Shalcon Intelligence — Sales Pipeline**  
Spreadsheet ID: `1AhYb8qOAcDhFaaTmrwubsyXmio7TUsHMVaChynuo0CQ`  
Tab: `Pipeline`

This Sheet currently resides in the owner-controlled Google Drive identity `iamabuhurerakhan@gmail.com`.

Current live counts:
- active Healthcare prospects: **16**
- `Draft Ready`: **15**
- `Research Ready`: **1**
- sent: **0**
- replied: **0**
- discovery: **0**

### First controlled Batch 01
Owner explicitly authorized the exact five-prospect Batch 01 on 31 Aug 2026 with `APPROVE BATCH 01`. Do not ask for this authorization again.

Authorized prospects:
1. Dr. Riyaz Quereshi — Tru Smile
2. Niteen Tulpule — Sirona Diagnostics
3. Dr. Chandraprabha Kumar — Neevwellbeing’s The Dental Clinic
4. Dr. Anand Shroff — Shroff Eye Hospital
5. Dr. Vinit Shah — Vinit Eye Clinic

All five recipient/company/public-workflow observations were revalidated after approval.

Authorization is **not** evidence of contact. All five remain `Draft Ready` until a real outbound message leaves an owner-approved authenticated channel.

Prepared continuity:
- 8 earlier personalized Gmail drafts, unsent, backed up in `docs/GMAIL_DRAFT_MIGRATION_BACKUP_2026-08-31.md`;
- 7 verified LinkedIn drafts in `docs/HEALTHCARE_OUTREACH_DRAFTS_BATCH_02_2026-08-31.md`, unsent;
- 4 Batch 01 public-business-inbox email fallbacks in `docs/OUTREACH_BATCH_01_EMAIL_FALLBACKS_2026-08-31.md`, unsent;
- 5 prospect-specific synthetic reply maps in `docs/BATCH_01_SYNTHETIC_WORKFLOW_MAPS_2026-08-31.md`;
- reply/objection/pricing/opt-out/discovery handling in `docs/OUTREACH_REPLY_TO_DISCOVERY_HANDOFF.md`.

Neev remains LinkedIn-only because no sufficiently clean public business email was verified; do not use patient-booking WhatsApp for cold outreach.

Batch 02 additional recipients remain prepared but are not included in Batch 01 authorization:
- Feriel Palia Jackson — Clinical Diagnostic Centre
- Dr. Priyank Bajani — Happy Teeth by Dr. Bajani

Sole `Research Ready` account: **Mumbai Diagnostic Centre**. Keep it unpromoted until a sufficiently clean decision-maker/business-development route is verified.

### Channel execution boundary
- Batch 01 authorization is complete.
- User-provided Gmail settings show `shalconintelligence@gmail.com` connected, but Gmail profile/send actions currently fail at connector layer with `Resource not found`; a prospect send attempt failed before delivery, so **0 prospects were contacted**.
- Do not ask the owner to prove/reconnect the mailbox again unless visible UI state actually changes.
- Current available tools do not expose an authenticated LinkedIn messaging session; plugin discovery found no usable LinkedIn messaging plugin.
- Any outreach outside exact Batch 01 still requires separate authorization.

### Reply → discovery
`docs/OUTREACH_REPLY_TO_DISCOVERY_HANDOFF.md` contains response triage, opt-out handling, pricing response, discovery handoff and direct routing to the five prepared synthetic maps.

Saved discovery scheduling URL: `https://calendar.app.google/HMdDM2iUEuwbaMUEA`. The correct Shalcon Calendar account is connected, but a public visitor-context fetch was not independently completed in this environment. Recheck public access before including the link in a live prospect reply.

## 9. Domain / release
Recommended domain: `shalconintelligence.com`; fresh connected check on 31 Aug showed it available at $11.25/year. Alternatives remained `shalcon.io` $30/year and `shalcon.ai` $160/2 years. No purchase made. Recheck and obtain explicit owner approval before purchase.

After ownership:
1. attach only to correct Shalcon Vercel project;
2. verify DNS/TLS/apex-www redirect;
3. add canonical, absolute OG/Twitter metadata, robots and sitemap;
4. rotate Vercel→Supabase webhook credential;
5. prove new credential works and old fails without exposing either;
6. run final domain/API/cross-browser QA;
7. deliberately remove staging auth/noindex only when public release is approved.

## 10. Genuine remaining gates
### Owner/account-controlled
1. Razorpay KYC / Live activation / settlement bank / accountant-tax readiness.
2. Production-domain purchase/control when explicitly ready to spend.
3. Authenticated LinkedIn messaging session only if direct LinkedIn execution by ChatGPT is desired.

Owner legal-business approval, MSME, Batch 01 authorization, mailbox ownership/access, and the requested legacy Vercel Git cleanup are complete at owner-report level and must not be reopened without contrary evidence.

### ChatGPT / system work
4. Verify this post-cleanup Vercel deployment and live owner-reviewed Privacy/Terms while staging protection remains active.
5. Retry already-authorized Batch 01 when Gmail write execution resolves; update pipeline only from real sends.
6. Verify first real Payment Link/invoice/settlement reconciliation after Razorpay Live.
7. Domain/canonical/social/robots/sitemap cutover after domain ownership.
8. Production webhook-secret rotation immediately before public release.
9. Final deployed browser/domain/API QA.
10. Deliberate public-indexing cutover.

### Market evidence
11. First qualified discovery/audit/proposal.
12. First paid bounded pilot.
13. Baseline/post-pilot evidence.
14. Permission-backed case study.

## 11. Execution order
1. Verify the single post-cleanup Shalcon deployment trigger and keep staging protected.
2. Execute already-authorized Batch 01 as soon as an approved authenticated sending action works; do not ask for Batch 01 approval again.
3. If a Batch 01 prospect asks for more detail, use only that prospect’s prepared synthetic workflow map and keep it explicitly hypothesis-based.
4. Advance Razorpay KYC/Live + bank/accounting readiness.
5. Keep Mumbai Diagnostic Centre research-only unless recipient evidence improves.
6. Purchase/connect final domain only after explicit spend approval.
7. Rotate integration secret immediately before final public launch.
8. Run final deployed cross-browser/domain/API QA and deliberately enable public indexing.
9. Convert controlled outreach → discovery → audit → proposal → bounded pilot → measured proof.

## 12. Truth rules
- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims;
- synthetic demos/maps are never client deployments or evidence of client pain;
- sensitive professional judgment remains human-controlled;
- no mass cold WhatsApp;
- patient-booking WhatsApp is not a default cold channel;
- no cross-product infrastructure shortcuts;
- no broad compliance/security claim without evidence;
- owner-reported MSME completion is not independent certificate-field verification;
- owner legal-business approval is not professional legal approval;
- Batch 01 is authorized but not sent until actual channel evidence exists;
- no purchases, KYC actions, sends or runtime deployments inferred from preparation alone.