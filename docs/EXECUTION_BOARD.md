# Shalcon Intelligence — Execution Board

Status date: 31 Aug 2026
Operating split target: **ChatGPT ~90% / Abu ~10%**.

Strategy: `docs/MARKET_READY_MASTER.md`  
Release evidence/blockers: `docs/LAUNCH_GATE.md`  
Fast handoff: `PROJECT_STATE.md`

## Operating rules
- ChatGPT continues reversible, non-owner-dependent work without asking for cosmetic approval.
- Abu is needed for legal acceptance, purchases, KYC/bank actions, sensitive credentials, external account/channel access, real-client access, and final business decisions.
- “Prepared” is not “live.” “Live” requires deployed or real-event evidence.
- Do not recreate already-finished infrastructure because an older note says it is missing.
- MSME/UDYAM is owner-reported complete; keep certificate/KYC material private and use it only where onboarding specifically needs it.
- **Controlled Batch 01 is already owner-authorized. Do not ask for that approval again.**

## Current readiness

| Area | Status | Owner now |
|---|---|---|
| Repository / CI | GREEN | ChatGPT |
| Website positioning / truth | READY | ChatGPT |
| Live Shalcon deployment | READY / staging-protected | ChatGPT |
| Lead persistence | VERIFIED END-TO-END | ChatGPT |
| Privacy / Terms / DPA / SOW | PREPARED; final review open | Abu / legal |
| MSME / UDYAM | OWNER-REPORTED COMPLETE | Abu |
| Payment workflow | LEDGER READY; Razorpay/bank/accounting open | Abu |
| Domain / SEO cutover | PREPARED; purchase/control open | Abu then ChatGPT |
| Healthcare outreach | BATCH 01 AUTHORIZED / CHANNEL-BLOCKED / UNSENT | Abu account access + ChatGPT execution |
| Approved Gmail sender | `shalconintelligence@gmail.com`; connector not authenticated to it | Abu connection |
| LinkedIn direct execution | No authenticated messaging tool/session available | Abu account/session if needed |
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
- [x] Native Invoice & Payment Ledger created with `SI-2026-0001` working seed and no fake invoice rows.
- [x] Razorpay onboarding guidance rechecked/hardened.
- [x] **UDYAM/MSME — owner reports obtained 31 Aug 2026.**
- [ ] Razorpay KYC / Live activation owner-complete.
- [ ] Settlement bank verification complete.
- [ ] Accountant/tax presentation confirmed for current non-GST-registered state.
- [ ] First Payment Link + invoice-ledger reconciliation flow verified after Live activation.

### Domain / public release
- [x] `shalconintelligence.com` recommended and fresh recheck still available at $11.25/year on 31 Aug 2026.
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
- [x] Reply-to-discovery handoff prepared.

### Healthcare outbound inventory
- [x] 16 active Healthcare prospects in live pipeline.
- [x] 15 are `Draft Ready`.
- [x] 1 remains deliberately `Research Ready` because recipient evidence is too ambiguous.
- [x] Eight personalized Gmail drafts prepared and reviewed.
- [x] All 8 legacy Gmail drafts backed up before account migration.
- [x] Seven decision/operations-level LinkedIn drafts prepared and reviewed in Batch 02.
- [x] Exact five-prospect Controlled Batch 01 selected.
- [x] **Owner explicitly authorized Controlled Batch 01 on 31 Aug 2026.**
- [x] Four Batch 01 public-business-inbox email fallbacks prepared; Neev remains LinkedIn-only.
- [x] Live Sheet Next Action records Batch 01 authorization and channel fallback state.
- [x] Copy uses public workflow observations and synthetic-demo/human-control framing.
- [ ] Authenticate ChatGPT Gmail to `shalconintelligence@gmail.com` before email execution.
- [ ] Make an authenticated LinkedIn messaging session available if ChatGPT is expected to execute LinkedIn directly.
- [ ] Send first approved Batch 01 messages through a real approved channel, then update pipeline statuses from actual outcomes.
- [ ] Run follow-up/reply/discovery cadence based on actual responses.

## P2 — Proof
- [x] Synthetic Healthcare proof.
- [x] Production pilot baseline/reporting template.
- [ ] First real outbound message.
- [ ] First qualified audit.
- [ ] First proposal.
- [ ] First paid pilot.
- [ ] Baseline/post-pilot evidence.
- [ ] Permission-backed case study.

## Deliberately deferred
Do not spend launch energy on hiring systems, partner programs, broad international expansion, large-scale content machinery, or multiple mature SaaS products before first-client evidence.

## Next execution order
1. Keep CI/release evidence coherent and staging protected.
2. Execute already-authorized Controlled Batch 01 as soon as an approved authenticated channel is available; **no repeat approval question**.
3. Advance Razorpay KYC/Live, bank and accounting readiness.
4. Complete explicit owner/legal decisions and professional review where appropriate.
5. Keep the single weak-recipient prospect research-only; do not lower evidence standards.
6. Buy/connect final domain only after explicit cost approval.
7. Rotate integration secret immediately before final public launch.
8. Run final deployed cross-browser/domain QA and deliberately enable public indexing.
9. Convert outreach → audit → proposal → bounded pilot → permission-backed evidence.