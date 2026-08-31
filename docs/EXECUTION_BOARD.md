# Shalcon Intelligence — Execution Board

Status date: 31 Aug 2026
Operating split target: **ChatGPT ~90% / Abu ~10%**.

Strategy: `docs/MARKET_READY_MASTER.md`  
Release evidence/blockers: `docs/LAUNCH_GATE.md`  
Fast handoff: `PROJECT_STATE.md`

## Operating rules
- ChatGPT continues reversible, non-owner-dependent work without asking for cosmetic approval.
- Abu is needed for legal acceptance, purchases, KYC/bank actions, sensitive credentials, external sending, real-client access, and final business decisions.
- “Prepared” is not “live.” “Live” requires deployed evidence.
- Do not recreate already-finished infrastructure because an older note says it is missing.
- UDYAM work is paused until Abu provides his update.

## Current readiness

| Area | Status | Owner now |
|---|---|---|
| Repository / CI | GREEN | ChatGPT |
| Website positioning / truth | READY | ChatGPT |
| Live Shalcon deployment | READY / staging-protected | ChatGPT |
| Lead persistence | VERIFIED END-TO-END | ChatGPT |
| Privacy / Terms / DPA / SOW | PREPARED; final review open | Abu / legal |
| Payment workflow | PREPARED; KYC/bank/accounting open | Abu |
| UDYAM | PAUSED pending owner update | Abu |
| Domain / SEO cutover | PREPARED; purchase/control open | Abu then ChatGPT |
| Healthcare outreach | 8 verified drafts, UNSENT | Abu + ChatGPT |
| Correct outreach sender | BLOCKED; connected Gmail is not Shalcon mailbox | Abu |
| First real client proof | NOT YET | Joint |

## P0 — Launch-critical

### Repository / release safety
- [x] Shalcon isolated on `shalcon-market-ready-2026`.
- [x] Portfolio-contaminated `main` excluded from Shalcon work.
- [x] CI production-build/security/claim/performance gates exist and pass.
- [x] Current agent/project-state documentation reconciled with deployed reality.
- [ ] GitHub branch protection/ruleset for the market-ready branch. Connected GitHub tooling currently exposes read-only protection state, so this remains an owner/UI action unless tooling changes.

### Website / deployment
- [x] Healthcare-first flagship and Audit → Pilot → System positioning.
- [x] Unsupported proof/testimonials removed.
- [x] Synthetic demo and estimator limitations clear.
- [x] Booking / WhatsApp / email paths implemented.
- [x] Accessibility/mobile/reduced-motion safeguards implemented and previously smoke-tested.
- [x] Dedicated Shalcon Vercel project exists.
- [x] Correct branch deployed.
- [x] Global staging `X-Robots-Tag: noindex, nofollow, noarchive` verified live.
- [x] Live homepage / Privacy / Terms HTTP and security-header checks passed.
- [ ] Final deployed Chromium + Firefox/WebKit-class release smoke after final domain/public-release changes.

### Lead persistence
- [x] Dedicated Supabase project exists in `ap-south-1`.
- [x] Schema, RLS/browser-role denial and Edge Function deployed.
- [x] Authenticated Vercel webhook configured.
- [x] Wrong-secret, first-write, replay and conflict behavior tested.
- [x] Real Vercel → Supabase write tested.
- [x] Forced destination failure tested fail-closed.
- [x] Destination restored and retested.
- [x] Synthetic QA rows removed.
- [ ] Rotate the manually transferred production webhook credential immediately before final public launch; prove new works and old fails.

### Legal / data handling
- [x] Privacy draft.
- [x] Website Terms draft.
- [x] DPA template.
- [x] Proposal/SOW template.
- [x] India data-protection baseline research.
- [x] Lead-retention recommendation.
- [x] Owner identity inserted.
- [ ] Owner/legal review of Privacy/Terms/SOW/DPA risk language.
- [ ] Engagement-specific role/data/security/retention review before processing real sensitive client data.

### Commercial / payment
- [x] Healthcare Pilot default approved: ₹39,000 setup + ₹9,000/month.
- [x] 50/30/20 implementation milestones approved.
- [x] Invoice template and payment-link workflow prepared.
- [x] Razorpay onboarding guidance rechecked/hardened.
- [ ] UDYAM — intentionally paused pending owner update.
- [ ] Razorpay KYC / settlement bank / accounting-tax presentation owner-ready.

### Domain / public release
- [x] `shalconintelligence.com` recommended and last rechecked available at $11.25/year on 31 Aug 2026.
- [x] Domain/SEO cutover runbook exists.
- [x] Staging canonical/indexing safeguards documented.
- [ ] Owner purchases/controls final domain.
- [ ] Attach domain to correct Vercel project and verify DNS/TLS.
- [ ] Add final canonical, absolute OG/social metadata, robots and sitemap.
- [ ] Remove staging auth/noindex only in deliberate final release.

## P1 — Revenue engine

### Sales system
- [x] Discovery/qualification framework.
- [x] Audit report template.
- [x] Proposal/SOW and objection/close playbook.
- [x] Onboarding, delivery/UAT, measurement/reporting and financial-control assets.
- [x] Live Google Sheets sales pipeline.

### Healthcare Batch 01
- [x] Eight verified prospects in pipeline.
- [x] Eight personalized Gmail drafts prepared and reviewed.
- [x] All eight remain `Draft Ready`; sent/replied/discovery counts remain zero.
- [x] Copy uses public workflow observations and synthetic-demo framing.
- [ ] Connect/use approved Shalcon business Gmail account.
- [ ] Owner explicitly authorizes controlled send.
- [ ] Send first batch, then update pipeline statuses.
- [ ] Run follow-up/reply/discovery cadence based on actual responses.

## P2 — Proof
- [x] Synthetic Healthcare proof.
- [x] Production pilot baseline/reporting template.
- [ ] First qualified audit.
- [ ] First proposal.
- [ ] First paid pilot.
- [ ] Baseline/post-pilot evidence.
- [ ] Permission-backed case study.

## Deliberately deferred
Do not spend launch energy on hiring systems, partner programs, broad international expansion, large-scale content machinery, or multiple mature SaaS products before first-client evidence.

## Next execution order
1. Keep CI/release evidence coherent and staging protected.
2. Finish safe domain/legal/payment preparation without purchases/KYC/legal acceptance.
3. Wait for Abu's UDYAM update; do not alter UDYAM state meanwhile.
4. Resolve owner/legal and Razorpay/bank/accounting gates.
5. Connect correct Shalcon Gmail and obtain explicit send authorization.
6. Buy/connect final domain only after explicit cost approval.
7. Rotate integration secret immediately before final public launch.
8. Run final deployed cross-browser/domain QA and deliberately enable public indexing.
9. Convert outreach → audit → proposal → bounded pilot → permission-backed evidence.
