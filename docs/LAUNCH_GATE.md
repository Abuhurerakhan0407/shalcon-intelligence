# Shalcon Intelligence — Production Launch Gate

Status date: 31 Aug 2026

A checked box means evidence exists now. Full public/paid acquisition is GO only when every explicit **BLOCKER** is PASS. Controlled founder-led outreach uses the narrower Section H gate.

## A. Source control
- [x] Shalcon work isolated from portfolio-contaminated `main`.
- [x] Active market-ready branch: `shalcon-market-ready-2026`.
- [x] Old duplicate prototype files and obsolete build instructions removed from active path.
- [x] `.env*`, `.vercel` and local secret/deployment material ignored appropriately.
- [x] CI production-build gate exists.
- [x] Marketing-claim regression guard exists.
- [x] Runtime dependency-usage guard exists.
- [x] Compiled-artifact security/performance gate exists.
- [x] Current control/runbook documentation reconciled with deployed reality.
- [ ] Recommended hardening: GitHub branch protection/ruleset for `shalcon-market-ready-2026`. Current connected integration cannot verify/manage it (`403` on protection read); this is not a launch blocker while disciplined branch control continues.

## B. Positioning / truth
- [x] Healthcare-first flagship offer leads homepage.
- [x] Other supported verticals remain secondary/adjacent.
- [x] Unsupported client metrics/testimonials removed.
- [x] Demo clearly synthetic/prototype.
- [x] Demo routing is deterministic and safety-aware.
- [x] Opportunity estimator is editable planning math, not verified loss/recovery.
- [x] No fixed delivery/breakeven/revenue promise remains in public marketing.
- [x] Claims register requires evidence + permission before identifiable numeric client proof.

## C. Conversion / lead capture
- [x] Booking, WhatsApp and email conversion paths configured.
- [x] `/api/lead` server trust boundary implemented.
- [x] Contact consent captured.
- [x] Estimator values recomputed server-side.
- [x] Page/referrer minimized and UTM attribution allowlisted.
- [x] Honeypot, bounded inputs and best-effort short-window rate limiting implemented.
- [x] Authenticated HTTPS webhook + idempotency contract implemented.
- [x] Dedicated Supabase project exists in `ap-south-1`: `qfsnmjeacwdkbukwxbwz`.
- [x] `public.shalcon_leads` uses RLS and browser-role access revocation.
- [x] Edge Function `shalcon-lead-webhook` deployed.
- [x] Wrong-secret / first-write / exact-replay / conflicting-replay contract tested.
- [x] Dedicated Vercel project configured against the Shalcon destination.
- [x] Real Vercel→Supabase persistence succeeded with consent/attribution/server-computed estimator values.
- [x] Forced destination failure returned `502 lead_persistence_failed` without false success or extra row.
- [x] Destination restored and successful write retested.
- [x] Synthetic integration QA rows deleted.

Lead capture itself is **PASS / VERIFIED**. Do not recreate the project because older historical notes suggested it was missing.

## D. Privacy / legal baseline
- [x] Privacy draft exists.
- [x] Website Terms draft exists.
- [x] Draft legal pages remain intentionally noindex during staging.
- [x] Public form warns against sensitive client-data submission.
- [x] Demo uses synthetic data.
- [x] India data-protection timing/baseline research exists.
- [x] DPA template exists.
- [x] Proposal/SOW template exists with pre-send placeholder/internal-note safety gate.
- [x] Owner identity/billing/signatory details inserted into contracting materials.
- [x] Practical lead-retention recommendation prepared.
- [x] Owner legal/risk review consolidated into one explicit decision pack.
- [x] **OWNER BUSINESS DECISION GATE — PASS 31 Aug 2026.** Abu approved the recommended Privacy/Terms/SOW/DPA/refund/dispute/data-processing/liability business defaults. This is owner approval, not fabricated professional legal review.
- [ ] **BLOCKER FOR REAL CLIENT MATERIAL PERSONAL/HEALTH DATA — engagement-specific role/data/security/retention/DPA review complete where applicable.**
- [ ] Professional counsel review remains recommended before material first-client contract reliance, unusual liability/SLA/refund terms, material sensitive-data processing or representing documents as counsel-approved.

The owner should not be asked to re-approve the same defaults unless the terms materially change.

## E. Technical QA / deployment
- [x] Strict GitHub Actions CI is green on the reconciled market-ready branch.
- [x] Dependency/security audit gate passes.
- [x] Lead/API/client/demo/Supabase/legal safety tests pass.
- [x] Production build passes.
- [x] Compiled-artifact secret/claim/performance budget passes.
- [x] Prior compiled desktop + mobile visual smoke passed.
- [x] Estimator interaction/failure/scroll-restoration QA passed.
- [x] Accessibility smoke passed: focus trap/return, keyboard close, mobile touch targets, no tested horizontal overflow.
- [x] Main landmark/skip navigation and mobile Escape/focus-return semantics implemented.
- [x] WebGL remains lazy and skipped for constrained/mobile/save-data/reduced-motion conditions.
- [x] Supabase security/performance advisor output reviewed.
- [x] Correct Shalcon Vercel project and branch are live.
- [x] Live homepage, Privacy and Terms return HTTP 200 with expected security/staging headers.
- [x] Production alias currently serves `X-Robots-Tag: noindex, nofollow, noarchive`.
- [x] Vercel Authentication is enabled for All Deployments during staging.
- [x] Latest 31 Aug runtime log review found no new production error/fatal logs in the checked window.
- [ ] **BLOCKER BEFORE FINAL PUBLIC RELEASE — final deployed Chromium + Firefox/WebKit-class smoke after final domain/secret/indexing changes.**

Current verified runtime:
- project: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- deployed runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- deployment: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- alias: `https://shalcon-intelligence.vercel.app`

Documentation/runbook commits after the runtime commit do not require redeployment merely to synchronize SHA labels.

## F. Sales / commercial readiness
- [x] Sales playbook, discovery/audit, qualification, objection/close assets prepared.
- [x] Proposal/SOW, DPA, onboarding, delivery/UAT, measurement/reporting assets prepared.
- [x] Financial-control, incident/security and SOP assets prepared.
- [x] Healthcare outbound framework and research process prepared.
- [x] Live Google Sheets founder-led sales pipeline exists.
- [x] **15 Healthcare prospects are `Draft Ready`; 1 remains deliberately `Research Ready`.**
- [x] Eight personalized first-touch Gmail drafts exist, remain unsent, and are backed up for migration.
- [x] Seven additional verified decision/operations-level LinkedIn drafts exist in Batch 02 and remain unsent.
- [x] Exact five-prospect Controlled Batch 01 is owner-authorized.
- [x] All five Batch 01 public observations revalidated after approval.
- [x] Four public-business-inbox email fallbacks for Batch 01 are prepared; Neev remains LinkedIn-only because no clean business email was verified.
- [x] Four Batch 01 fallback inboxes were freshly reverified on official clinic websites immediately before attempted execution on 31 Aug 2026.
- [x] Five prospect-specific synthetic workflow maps prepared for positive replies/discovery support.
- [x] Reply → discovery handoff exists for positive, neutral, pricing, wrong-person, rejection and opt-out responses.
- [x] Draft copy uses public-observation grounding, synthetic-demo framing and human clinical escalation.
- [x] Owner-approved Healthcare Pilot default: ₹39,000 setup + ₹9,000/month, 50/30/20 milestones, client-paid/separately-itemized vendor usage.
- [x] Invoice/payment-link operating workflow + native finance ledger prepared.
- [x] SOW client-facing template no longer exposes Shalcon internal price-floor information.
- [x] **UDYAM/MSME owner reports obtained 31 Aug 2026.** Certificate remains private owner material; do not publish or commit KYC fields.
- [ ] **BLOCKER FOR PAID WORK — Razorpay KYC/Live activation + settlement bank + accountant/tax collection path owner-ready.**

## G. Proof readiness
- [x] Healthcare flagship workflow explained publicly without claiming client deployment.
- [x] Healthcare architecture proof exists.
- [x] Synthetic interactive prototype exists.
- [x] Proof standard documented.
- [x] Pilot baseline/reporting template exists.
- [ ] First qualified audit/proposal.
- [ ] First production pilot baseline.
- [ ] First measured pilot result validated by client.
- [ ] First permission-backed case study.

No client-result claim may be marketed from synthetic behavior or internal estimates.

## H. Controlled founder-led outreach gate
Technically eligible when:
1. CI + current website QA are green;
2. booking/contact path works;
3. unsupported marketing claims are absent;
4. copy uses public observations only;
5. opt-outs are respected;
6. failed lead persistence cannot masquerade as success.

All technical conditions above are currently satisfied.

### Authorization
- [x] **Controlled Batch 01 explicitly owner-authorized on 31 Aug 2026 with `APPROVE BATCH 01`. Do not ask for this approval again.**

Authorized prospects only:
1. Dr. Riyaz Quereshi — Tru Smile
2. Niteen Tulpule — Sirona Diagnostics
3. Dr. Chandraprabha Kumar — Neevwellbeing’s The Dental Clinic
4. Dr. Anand Shroff — Shroff Eye Hospital
5. Dr. Vinit Shah — Vinit Eye Clinic

Any prospect outside this exact list requires separate authorization.

### Gmail execution evidence
- [x] Owner confirms access/control of `shalconintelligence@gmail.com`.
- [x] User-provided ChatGPT Gmail settings screenshot on 31 Aug visibly shows `shalconintelligence@gmail.com` as the connected Gmail account.
- [x] Approved sender remains `shalconintelligence@gmail.com`.
- [ ] **TOOL EXECUTION BLOCKER — connector registry exposes Gmail profile/send actions, but both `get_profile` and `send_email` currently fail with `Resource not found` at execution time.** This is a connector/tool-resolution failure, not evidence that the owner lacks access or that the Gmail UI is connected to the wrong account.

No prospect email was sent by the failed calls. Do not mark any row `Sent` until a successful real outbound event exists. Do not ask the owner to reconnect/prove the mailbox again unless the UI actually changes.

### LinkedIn execution
- [ ] **LinkedIn tool blocker — current available tools do not expose an authenticated LinkedIn messaging session, and plugin discovery found no usable LinkedIn messaging plugin.**

Four Batch 01 email fallback drafts remain executable the moment the Gmail write action resolves. Neev remains LinkedIn-only; do not use patient-booking WhatsApp as a fallback.

Current status: **AUTHORIZED / REVALIDATED / TOOL-BLOCKED / UNSENT.** Fifteen prospects remain `Draft Ready`; one remains `Research Ready`; sent/replied/discovery counts remain zero.

Authorization is not market evidence. Update a row to `Sent` only after a real outbound event.

## I. Full public / paid-traffic launch gate
Still required:
- Razorpay Live activation, bank settlement verification and accounting presentation;
- owner purchase/control of final production domain;
- final canonical/social/robots/sitemap configuration;
- production webhook-secret rotation after infrastructure freeze;
- final deployed domain/API/cross-browser QA;
- deliberate removal of staging Authentication/noindex protections;
- engagement-specific legal/data review before material real-client sensitive-data processing where applicable.

Owner business legal defaults and MSME/UDYAM are no longer on the generic blocker list.

## J. Domain / SEO
- [x] Exact-brand options researched through connected Vercel account.
- [x] Rechecked 31 Aug 2026: `shalconintelligence.com` available at $11.25/year; `shalcon.io` $30/year; `shalcon.ai` $160/2 years.
- [x] `shalconintelligence.com` remains recommended.
- [x] Domain/SEO release runbook exists.
- [x] Current staging response-header noindex protection verified live.
- [ ] **BLOCKER — owner purchases/controls final production domain.**
- [ ] Attach domain, verify DNS/TLS and canonical redirect strategy.
- [ ] Add final canonical, absolute OG/social metadata, robots and sitemap.
- [ ] Enable production indexing only in deliberate final release.

## K. Credential rotation
- [x] Rotation runbook exists.
- [ ] **BLOCKER BEFORE FINAL PUBLIC/PAID LAUNCH — rotate manually transferred Vercel→Supabase credential, prove new secret works, prove old secret is rejected, delete synthetic QA row and record evidence without exposing raw secret.**

## L. Evidence discipline
- Checked means evidence exists now; it does not mean Shalcon has mature real-client proof.
- Historical research issues are not the live send manifest; the current Google Sheet + approved batch docs control send state.
- Owner-reported MSME completion is not independent verification of certificate fields.
- Owner business approval of legal defaults is not professional legal advice or counsel sign-off.
- Controlled Batch 01 is authorized but remains unsent until an approved authenticated channel produces a real outbound event.
- No purchase, KYC action, professional legal approval or secret rotation may be inferred from preparation alone.