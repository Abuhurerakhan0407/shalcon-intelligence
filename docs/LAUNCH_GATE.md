# Shalcon Intelligence — Production Launch Gate

Status date: 29 Aug 2026

A checked box means evidence exists now. Production/public paid acquisition is GO only when every explicit **BLOCKER** is PASS. Controlled founder-led outreach has a narrower gate in Section H.

## A. Source control
- [x] Shalcon work isolated from portfolio-contaminated `main`.
- [x] Dedicated market-ready branch exists.
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
- [x] Real booking URL configured in source.
- [x] WhatsApp contact path configured in source.
- [x] Email path configured in source.
- [x] Estimator form has a server boundary and false-success protection.
- [x] Contact consent collected and recorded in payload.
- [x] Server recalculates estimator values rather than trusting browser totals.
- [x] Server persistence contract uses authenticated webhook delivery + idempotency key.
- [x] Basic abuse controls: honeypot, input bounds and best-effort IP rate limit.
- [x] Dedicated Supabase table/function/config implementation prepared in repository.
- [x] Persistence destination revalidates contact/consent/estimator contract and refuses conflicting idempotent replays.
- [x] Supabase table design enables RLS and revokes browser-role access.
- [x] Dedicated Shalcon Supabase project created in `ap-south-1` (`qfsnmjeacwdkbukwxbwz`).
- [x] Lead table + Edge Function deployed; final raw shared secret is not committed to Git/Supabase source.
- [x] Real persistence path tested: wrong secret 401, initial write 201, exact replay 200 with `replay:true`, conflicting replay 409.
- [x] Synthetic QA row removed after test; lead table returned to zero rows.
- [x] Temporary QA credential rotated out and verified rejected after rotation.
- [ ] **BLOCKER — deployed Vercel `/api/lead` configured with the final webhook URL/secret and successful end-to-end form persistence verified.**
- [ ] **BLOCKER — forced deployed Vercel destination failure proves the website never shows false success.**

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
- [ ] **BLOCKER — final legal/business identity inserted where required.**
- [ ] **BLOCKER — owner/legal review of production terms/privacy complete.**
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
- [x] Supabase security advisor reviewed after schema creation; only intentional INFO for RLS with no policies.
- [x] Supabase performance advisor reviewed; unused-index INFO expected on new zero-row table.
- [ ] **BLOCKER — dedicated Shalcon preview deployment exists and current branch is verified on it.**
- [ ] **BLOCKER — booking/WhatsApp/email + `/api/lead` verified against deployed preview.**
- [ ] Cross-browser deployed-preview smoke test (Chromium + at least one WebKit/Firefox-class browser where available).

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
- [x] Founder-led pipeline operating rhythm.
- [x] Basic financial/margin control model.
- [x] Launch-critical SOP index.
- [ ] **BLOCKER FOR PAID WORK — final commercial pricing/risk terms owner-approved.**
- [ ] **BLOCKER FOR PAID WORK — payment/KYC/bank/accounting collection path owner-ready.**

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
6. the website does not pretend failed lead persistence succeeded.

Current status: **TECHNICALLY READY FOR CONTROLLED OUTREACH USING DIRECT BOOKING/CONTACT PATHS.** Supabase persistence exists, but do not depend on the estimator form until the Vercel preview is configured and the complete browser → Vercel → Supabase path is tested.

## I. Full public / paid-traffic launch gate
Full public/paid acquisition additionally requires:
- dedicated Shalcon preview/production deployment verification;
- deployed Vercel → Supabase lead persistence success + forced-failure tests;
- final privacy/legal identity review;
- owner-approved commercial/payment setup;
- final production domain/metadata.

## J. Domain / SEO
- [x] Exact-brand domain options researched through connected registrar/deployment account.
- [x] `shalconintelligence.com` recommended if still available when purchased.
- [ ] **BLOCKER FOR FINAL DOMAIN RELEASE — owner controls/approves final domain.**
- [ ] Canonical URL, sitemap and absolute social metadata finalized after domain ownership/connection.

## K. Evidence discipline
A checked box means an asset/test exists now. It does not mean sales/delivery/compliance is mature. Operational claims become proven only through real prospect/client execution and permission-backed evidence.
