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
- MSME/UDYAM is owner-reported complete; keep certificate/KYC material private and use it only where onboarding specifically needs it.

## Current readiness

| Area | Status | Owner now |
|---|---|---|
| Repository / CI | GREEN | ChatGPT |
| Website positioning / truth | READY | ChatGPT |
| Live Shalcon deployment | READY / staging-protected | ChatGPT |
| Lead persistence | VERIFIED END-TO-END | ChatGPT |
| Privacy / Terms / DPA / SOW | PREPARED; final review open | Abu / legal |
| MSME / UDYAM | OWNER-REPORTED COMPLETE | Abu |
| Payment workflow | BUSINESS PROOF AVAILABLE; Razorpay/bank/accounting open | Abu |
| Domain / SEO cutover | PREPARED; purchase/control open | Abu then ChatGPT |
| Healthcare outreach | 15 Draft Ready / 1 Research Ready / UNSENT | Abu + ChatGPT |
| Correct Gmail sender | BLOCKED; connected Gmail is not Shalcon mailbox | Abu |
| First real client proof | NOT YET | Joint |

## P0 — Launch-critical

### Repository / release safety
- [x] Shalcon isolated on `shalcon-market-ready-2026`.
- [x] Portfolio-contaminated `main` excluded from Shalcon work.
- [x] CI production-build/security/claim/performance gates exist and pass.
- [x] Current agent/project-state documentation reconciled with deployed reality.
- [ ] GitHub branch protection/ruleset for the market-ready branch. Connected GitHub integration cannot verify/manage protection (`403` on protection read), so this remains unverified hardening rather than a launch blocker.

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
- [x] **UDYAM/MSME — owner reports obtained 31 Aug 2026.**
- [ ] Razorpay KYC / Live activation owner-complete.
- [ ] Settlement bank verification complete.
- [ ] Accountant/tax presentation confirmed for current non-GST-registered state.
- [ ] First Payment Link + invoice-ledger reconciliation flow verified after Live activation.

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

### Healthcare outbound inventory
- [x] 16 active Healthcare prospects in live pipeline.
- [x] 15 are `Draft Ready`.
- [x] 1 remains deliberately `Research Ready` because recipient evidence is too ambiguous.
- [x] Eight personalized Gmail drafts prepared and reviewed.
- [x] Seven decision/operations-level LinkedIn drafts prepared and reviewed in Batch 02.
- [x] Copy uses public workflow observations and synthetic-demo/human-control framing.
- [ ] Connect/use approved Shalcon business Gmail account for email sends.
- [ ] Owner explicitly authorizes controlled external send.
- [ ] Send first small batch, then update pipeline statuses from actual outcomes.
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
2. MSME/UDYAM is complete at owner-report level; use private certificate only when an onboarding form actually needs it.
3. Advance Razorpay KYC/Live, bank and accounting readiness.
4. Reduce legal review to explicit owner decisions and keep conservative defaults until approved.
5. Keep the single weak-recipient prospect research-only; do not lower evidence standards.
6. Connect correct Shalcon Gmail and obtain explicit send authorization.
7. Buy/connect final domain only after explicit cost approval.
8. Rotate integration secret immediately before final public launch.
9. Run final deployed cross-browser/domain QA and deliberately enable public indexing.
10. Convert outreach → audit → proposal → bounded pilot → permission-backed evidence.