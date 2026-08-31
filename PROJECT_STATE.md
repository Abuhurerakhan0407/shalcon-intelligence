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
- **Approved business/outreach sender: `shalconintelligence@gmail.com` — owner reconfirmed 31 Aug 2026**
- Owner confirms direct access/control of this mailbox.
- Connected Google Calendar profile independently returns **Shalcon Intelligence / `shalconintelligence@gmail.com`**.
- Connected Google Drive profile currently returns **Abu hurera Khan / `iamabuhurerakhan@gmail.com`**; the live pipeline and finance ledger are in this owner-controlled Drive workspace. This is usable but must not be mislabeled as the Shalcon business Google account.
- Connected Gmail profile currently returns **`iafakhan9999@gmail.com`**, which is not authorized for Shalcon prospect outreach.
- Connector identity map: `docs/GOOGLE_CONNECTOR_IDENTITY_MAP_2026-08-31.md`.
- GST status supplied by proprietor: not registered
- **UDYAM/MSME: owner reports obtained on 31 Aug 2026**
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

## 7. Legal / MSME / payment
Prepared: Privacy, Terms, DPA, SOW, owner legal checklist, data-protection baseline, retention recommendation, invoice/payment guides and native finance ledger.

Client SOW and automation-audit templates have pre-send scrub gates. No internal price floor should leak to clients.

### DPDP timing
India DPDP baseline was refreshed 31 Aug 2026 against the 13 Nov 2025 Gazette notifications. Do not pretend all substantive duties are already in force. One-year and eighteen-month commencement tranches are scheduled, including major dates **13 Nov 2026** and **13 May 2027**, subject to later legal changes.

Owner/legal review remains open. Never claim generic “100% DPDP compliant/secure.” Sensitive-data engagements require engagement-specific controls/review.

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
- KYC/secrets excluded.

Payment readiness is now narrowed to:
- Razorpay KYC + Live activation using accurate proprietorship details and owner-controlled business proof;
- settlement bank verification;
- accountant/tax presentation for the current non-GST-registered state;
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

### Draft / response-ready inventory
- 8 earlier personalized Gmail drafts — unsent; full migration backup in `docs/GMAIL_DRAFT_MIGRATION_BACKUP_2026-08-31.md` so switching Gmail accounts cannot strand the work;
- 7 verified LinkedIn drafts in `docs/HEALTHCARE_OUTREACH_DRAFTS_BATCH_02_2026-08-31.md` — unsent;
- 4 Batch 01 public-business-inbox email fallback drafts in `docs/OUTREACH_BATCH_01_EMAIL_FALLBACKS_2026-08-31.md` — unsent;
- 5 prospect-specific synthetic reply maps in `docs/BATCH_01_SYNTHETIC_WORKFLOW_MAPS_2026-08-31.md` — prepared for use only after a relevant prospect asks to see the map or for discovery support;
- reply/objection/pricing/opt-out/discovery handling in `docs/OUTREACH_REPLY_TO_DISCOVERY_HANDOFF.md`.

### First controlled Batch 01
Owner explicitly authorized the exact five-prospect Batch 01 on 31 Aug 2026 with `APPROVE BATCH 01`.

Authorized prospects:
1. Dr. Riyaz Quereshi — Tru Smile
2. Niteen Tulpule — Sirona Diagnostics
3. Dr. Chandraprabha Kumar — Neevwellbeing’s The Dental Clinic
4. Dr. Anand Shroff — Shroff Eye Hospital
5. Dr. Vinit Shah — Vinit Eye Clinic

All five recipient/company/public-workflow observations were revalidated after approval.

Authorization is **not** evidence of contact. All five remain `Draft Ready` until a real outbound message leaves an owner-approved authenticated channel. The live Sheet records the authorization and channel fallback in Next Action.

Email fallbacks are prepared for Tru Smile, Sirona Diagnostics, Shroff Eye Hospital and Vinit Eye Clinic. Neev remains LinkedIn-only because no sufficiently clean public business email was verified; do not use patient-booking WhatsApp for cold outreach.

Batch 02 additional recipients remain prepared but are not included in Batch 01 authorization:
- Feriel Palia Jackson — Clinical Diagnostic Centre
- Dr. Priyank Bajani — Happy Teeth by Dr. Bajani

Sole `Research Ready` account: **Mumbai Diagnostic Centre**. Keep it unpromoted until a sufficiently clean decision-maker/business-development route is verified. Do not use ambiguous support/patient routes or scraped third-party personal data merely to fill the pipeline.

### Email sender control
- Owner-approved business/outreach mailbox: **`shalconintelligence@gmail.com`**.
- Owner reconfirmed this exact sender on 31 Aug 2026 and states they have access/control of it.
- Connected Google Calendar already verifies the correct Shalcon Google account identity.
- Current ChatGPT Gmail connector session alone is authenticated to a different account (`iafakhan9999@gmail.com`). That connector identity is **not authorized for Shalcon prospect outreach**.
- The available Gmail send action has no `From`/send-as selector, so ownership of the correct mailbox does not make the stale Gmail connector safe for sending.
- Several internal connector-verification messages were sent only to `shalconintelligence@gmail.com` while testing the session identity; **no prospect was contacted**. Do not send further connector-test emails.
- Do not ask the owner to prove mailbox ownership/access again. Re-authenticate the Gmail connector if direct ChatGPT Gmail execution is needed.

### Channel execution boundary
- Batch 01 authorization is complete. Do not ask for it again.
- Gmail execution is blocked only by Gmail connector authentication to the approved Shalcon mailbox.
- Current available tools do not expose an authenticated LinkedIn messaging session, and plugin discovery found no available LinkedIn messaging plugin, so LinkedIn sends cannot be truthfully marked completed from this environment.
- Any outreach outside the exact five-prospect Batch 01 still requires separate authorization.

### Reply → discovery
`docs/OUTREACH_REPLY_TO_DISCOVERY_HANDOFF.md` contains response triage, opt-out handling, pricing response, discovery handoff and direct routing to the five prepared synthetic maps.

Saved discovery scheduling URL: `https://calendar.app.google/HMdDM2iUEuwbaMUEA`. The correct Shalcon Calendar account is connected, but a public visitor-context fetch was not independently completed in this environment. Recheck public access before including the link in a live prospect reply.

## 9. Domain / release
Recommended domain: `shalconintelligence.com`; fresh connected check on 31 Aug showed it available at $11.25/year. Alternatives remained `shalcon.io` $30/year and `shalcon.ai` $160/2 years. No purchase made. Recheck and obtain explicit owner approval before purchase.

After ownership:
1. attach only to correct Vercel project;
2. verify DNS/TLS/apex-www redirect;
3. add canonical, absolute OG/Twitter metadata, robots and sitemap;
4. rotate Vercel→Supabase webhook credential;
5. prove new credential works and old fails without exposing either;
6. run final domain/API/cross-browser QA;
7. deliberately remove staging auth/noindex only when public release is approved.

## 10. Genuine remaining gates
### Owner/account-controlled
1. Re-authenticate ChatGPT Gmail to `shalconintelligence@gmail.com` if ChatGPT is to execute the email fallback sends directly.
2. Make an authenticated LinkedIn messaging session available if ChatGPT is to execute LinkedIn directly; no available LinkedIn messaging plugin was found in the current environment.
3. Razorpay KYC / Live activation / settlement bank / accountant-tax readiness.
4. Final Privacy/Terms/SOW/DPA business-risk/legal review.
5. Production-domain purchase/control.

### ChatGPT after owner gates/channel access
6. Execute already-authorized Batch 01 through an approved authenticated channel and update pipeline from real send outcomes.
7. Verify first real Payment Link/invoice/settlement reconciliation.
8. Domain/canonical/social/robots/sitemap cutover.
9. Production webhook-secret rotation.
10. Final deployed browser/domain/API QA.
11. Deliberate public-indexing cutover.

### Market evidence
12. First qualified discovery/audit/proposal.
13. First paid bounded pilot.
14. Baseline/post-pilot evidence.
15. Permission-backed case study.

## 11. Execution order
1. Keep runtime protected and CI green.
2. MSME/UDYAM is complete at owner-report level; use private certificate only where a legitimate private process needs it.
3. Execute already-authorized Batch 01 as soon as an owner-approved authenticated sending channel is available; do not ask for Batch 01 approval again.
4. If a Batch 01 prospect asks for more detail, use only that prospect’s prepared synthetic workflow map and keep it explicitly hypothesis-based.
5. Advance Razorpay KYC/Live + bank/accounting readiness.
6. Record owner/legal decisions without pretending professional review happened.
7. Keep Mumbai Diagnostic Centre research-only unless recipient evidence improves.
8. Purchase/connect final domain only after explicit spend approval.
9. Rotate integration secret immediately before final public launch.
10. Run final deployed cross-browser/domain/API QA and deliberately enable public indexing.
11. Convert controlled outreach → discovery → audit → proposal → bounded pilot → measured proof.

## 12. Truth rules
- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims;
- synthetic demos/maps are never client deployments or evidence of client pain;
- sensitive professional judgment remains human-controlled;
- no mass cold WhatsApp;
- patient-booking WhatsApp is not a default cold channel;
- no cross-product infrastructure shortcuts;
- no broad compliance/security claim without evidence;
- owner-reported MSME completion is not the same as independently verifying certificate fields;
- Batch 01 is authorized but not sent until actual channel evidence exists;
- no purchases, KYC actions or legal approvals inferred from preparation alone.