# Shalcon Intelligence — Production Launch Gate

Status date: 31 Aug 2026

A checked box means evidence exists now. Production/public paid acquisition is GO only when every explicit **BLOCKER** is PASS. Controlled founder-led outreach has a narrower gate in Section H.

## A. Source control
- [x] Shalcon work isolated from portfolio-contaminated `main`.
- [x] Dedicated market-ready branch exists: `shalcon-market-ready-2026`.
- [x] Old duplicate prototype files removed from active branch.
- [x] Obsolete Claude-era build brief removed from active branch.
- [x] Local agent/deployment/secret files ignored.
- [x] CI production-build gate exists.
- [x] Marketing-claim regression guard exists.
- [x] Runtime dependency-usage guard exists.
- [x] Compiled-artifact security/performance gate exists.

## B. Positioning and truth
- [x] Flagship offer leads homepage.
- [x] Healthcare is primary wedge; other verticals remain supported.
- [x] Unsupported client metrics removed from current marketing source.
- [x] Fabricated-looking testimonials removed.
- [x] Demo clearly labeled synthetic/prototype.
- [x] Demo responses use deterministic safety/routing rules instead of random faux-live responses.
- [x] Opportunity estimator framed as editable planning estimate, not guaranteed loss/recovery.
- [x] Fixed delivery/breakeven/revenue promises removed from website.
- [x] Claims register exists and public numeric proof requires evidence + permission.

## C. Conversion / lead capture
- [x] Real booking URL configured in source and present in deployed bundle.
- [x] WhatsApp contact path configured in source and present in deployed bundle.
- [x] Email path configured in source and present in deployed bundle.
- [x] Estimator form has a server boundary and false-success protection.
- [x] Contact consent collected and recorded in payload.
- [x] Server recalculates estimator values rather than trusting browser totals.
- [x] Server persistence contract uses authenticated webhook delivery + idempotency key.
- [x] Basic abuse controls: honeypot, input bounds and best-effort IP rate limit.
- [x] Dedicated Supabase table/function/config implementation exists in repository.
- [x] Persistence destination revalidates contact/consent/estimator contract and refuses conflicting idempotent replays.
- [x] Supabase table uses RLS and revokes browser-role access.
- [x] Dedicated Shalcon Supabase project created in `ap-south-1` (`qfsnmjeacwdkbukwxbwz`).
- [x] Lead table + Edge Function deployed; raw shared secret is not committed to Git/Supabase source.
- [x] Direct destination contract tested: wrong secret 401, initial write 201, exact replay 200 with `replay:true`, conflicting replay 409.
- [x] Dedicated Vercel project configured with authenticated Supabase webhook destination.
- [x] Real deployed Vercel → Supabase persistence test completed: `/api/lead` returned 201 and row stored with consent, attribution and server-computed estimator values.
- [x] Forced real destination failure completed: Supabase verifier intentionally invalidated, `/api/lead` returned 502 `lead_persistence_failed`, and no extra row was stored.
- [x] Production verifier restored and re-tested: `/api/lead` returned 201 again.
- [x] All synthetic integration QA rows deleted; lead table currently contains zero rows.

## D. Privacy / legal baseline
- [x] Privacy draft exists.
- [x] Website terms draft exists.
- [x] Draft legal pages are `noindex,nofollow` until approved.
- [x] Public form warns against submitting sensitive client data.
- [x] Demo uses synthetic data.
- [x] Public lead endpoint minimizes stored page/referrer data and allowlists attribution fields.
- [x] Current India DPDP commencement/timing baseline researched from official government sources.
- [x] Working client Data Processing Addendum template exists.
- [x] Marketing rule prohibits broad unsupported “fully compliant” claims.
- [x] Owner-supplied legal/business identity inserted into website legal drafts and client contracting templates: Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.
- [x] Billing/notices email, proprietor GST status and authorized signatory details recorded in contracting templates.
- [x] Practical lead-retention recommendation prepared in `docs/LEAD_RETENTION_RECOMMENDATION.md`.
- [ ] **BLOCKER — owner/legal review of production Privacy/Terms and risk language complete.**
- [ ] **BLOCKER FOR REAL CLIENT PERSONAL DATA — engagement-specific role/data/security/retention review completed where applicable.**

## E. Technical QA
- [x] Strict CI build passes on market-ready branch.
- [x] Dependency audit gate passes.
- [x] Lead safety test suite passes.
- [x] Supabase destination static safety tests exist.
- [x] Draft legal indexing tests exist.
- [x] Vercel configuration JSON validation passes.
- [x] Compiled-artifact security/performance budget passes.
- [x] Desktop visual smoke QA passed on a compiled CI artifact.
- [x] Mobile visual smoke QA passed on a compiled CI artifact.
- [x] Estimator modal interaction QA passed: open/close, consent, failure state, scroll restoration.
- [x] Accessibility smoke QA passed: focus trap/return, keyboard close, mobile touch targets, no horizontal overflow in tested viewport.
- [x] Main landmark + keyboard skip navigation implemented.
- [x] Mobile navigation Escape/focus-return semantics implemented.
- [x] Performance architecture reviewed; WebGL is lazy and skipped for constrained/mobile/save-data/reduced-motion conditions.
- [x] No critical console/runtime errors observed in tested compiled-artifact browser pass.
- [x] Supabase security advisor reviewed; only intentional INFO for server-only RLS-with-no-policy model.
- [x] Supabase performance advisor reviewed; unused-index INFO expected on new zero-row table.
- [x] Correct Shalcon Vercel production deployment exists from `shalcon-market-ready-2026`.
- [x] Live homepage, privacy, terms and `/api/lead` method behavior verified through Vercel.
- [x] Live `/api/lead` success and forced-failure behavior verified against real Supabase destination.
- [x] Runtime 502/401 during QA explained by intentional destination-failure testing; destination restored and re-tested successfully.
- [x] Latest GitHub branch head `5a91c066304018d7e8638930183404b27a93540a` passed GitHub Actions CI.
- [x] Global staging robots response header successfully deployed. Current production deployment `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`, commit `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`, is READY and serves `X-Robots-Tag: noindex, nofollow, noarchive` on `https://shalcon-intelligence.vercel.app`.
- [ ] **BLOCKER BEFORE FINAL PUBLIC RELEASE — deployed cross-browser visual smoke test (Chromium + Firefox/WebKit-class where available) after final domain/release changes.**

## F. Sales readiness
- [x] Sales playbook.
- [x] Discovery/audit operating template.
- [x] Qualification framework.
- [x] Proposal/SOW template.
- [x] Data Processing Addendum template.
- [x] Objection/closing playbook.
- [x] Client onboarding template.
- [x] Delivery/UAT playbook.
- [x] Measurement schema.
- [x] Pilot/client report template.
- [x] Healthcare outbound copy framework.
- [x] Mumbai first-100-account research process.
- [x] Initial researched healthcare seed list.
- [x] Personalized Healthcare outreach Batch 01 prepared.
- [x] Live Google Sheets sales pipeline exists with controlled stages/priorities and eight verified `Draft Ready` Healthcare prospects.
- [x] Eight verified Healthcare first-touch Gmail drafts exist and remain unsent.
- [x] Founder-led pipeline operating rhythm.
- [x] Basic financial/margin control model.
- [x] Launch-critical SOP index.
- [x] Owner-approved Healthcare Pilot commercial default: ₹39,000 setup + ₹9,000/month, client-paid/separately-itemized vendor usage, 50/30/20 milestones.
- [x] Invoice template and payment-collection setup/runbook prepared.
- [ ] **BLOCKER FOR PAID WORK — UDYAM/Razorpay KYC/bank/accounting collection path owner-ready.**

## G. Proof readiness
- [x] Healthcare flagship workflow explained on website.
- [x] Healthcare architecture proof exists.
- [x] Synthetic interactive prototype exists.
- [x] Proof standard documented.
- [x] Pilot measurement/reporting template exists.
- [ ] First production pilot baseline captured.
- [ ] First permission-backed case study published.

The last two proof items are not required to begin controlled founder-led outbound, but they are required before marketing any client-result claim.

## H. Controlled founder-led outreach gate
Controlled, low-volume, targeted outreach may start when:
1. strict CI + visual/interaction QA pass;
2. a working direct booking/contact path exists;
3. no unsupported marketing claim remains;
4. outbound copy references only public observations;
5. prospect opt-outs are respected;
6. website/API does not pretend failed lead persistence succeeded.

Current status: **TECHNICALLY READY FOR CONTROLLED, LOW-VOLUME FOUNDER-LED HEALTHCARE OUTREACH.** Eight drafts are prepared but remain unsent. Sending still requires the owner's explicit authorization.

## I. Full public / paid-traffic launch gate
Full public/paid acquisition still requires:
- final owner/legal review of Privacy/Terms and applicable client legal templates;
- UDYAM/Razorpay KYC/bank/accounting collection readiness;
- owner purchase/control of final production domain and final canonical/social/robots/sitemap configuration;
- production webhook-secret rotation after final infrastructure freeze;
- final deployed release QA after domain/secret/public-indexing changes.

## J. Domain / SEO
- [x] Exact-brand domain options researched through connected Vercel account.
- [x] Rechecked 31 Aug 2026: `shalconintelligence.com` available at $11.25/year; `shalcon.io` $30/year; `shalcon.ai` $160/2 years.
- [x] `shalconintelligence.com` recommended.
- [x] Global staging response header `X-Robots-Tag: noindex, nofollow, noarchive` is live on current production alias.
- [x] Vercel Authentication remains enabled for All Deployments as staging protection.
- [x] Domain + SEO release runbook exists at `docs/DOMAIN_RELEASE_RUNBOOK.md`.
- [ ] **BLOCKER FOR FINAL DOMAIN RELEASE — owner purchases/controls the final domain.**
- [ ] Canonical URL, sitemap, absolute OG/social metadata and final indexability change completed after domain ownership and legal/payment release approval.

## K. Credential rotation
- [x] Rotation runbook exists at `docs/WEBHOOK_SECRET_ROTATION_RUNBOOK.md`.
- [ ] **BLOCKER BEFORE FINAL PUBLIC/PAID LAUNCH — rotate the manually transferred Vercel → Supabase webhook credential, prove new secret works, prove old secret is rejected, clean synthetic QA row, and record evidence without exposing the raw secret.**

## L. Evidence discipline
A checked box means an asset/test exists now. It does not mean sales/delivery/compliance is mature. Operational/client-result claims become proven only through real prospect/client execution and permission-backed evidence.
