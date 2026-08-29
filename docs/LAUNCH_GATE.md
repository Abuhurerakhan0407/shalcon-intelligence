# Shalcon Intelligence — Production Launch Gate

Status date: 29 Aug 2026

Production marketing is GO only when every **BLOCKER** below is PASS. Controlled founder-led outreach has a narrower gate and may begin earlier where explicitly stated.

## A. Source control
- [x] Shalcon work isolated from portfolio-contaminated `main`.
- [x] Dedicated market-ready branch exists.
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
- [x] Opportunity estimator framed as editable planning estimate, not guaranteed loss/recovery.
- [x] Fixed delivery/breakeven/revenue promises removed from website.
- [x] Claims register exists and public numeric proof requires evidence + permission.

## C. Conversion
- [x] Real booking URL configured in source.
- [x] WhatsApp contact path configured in source.
- [x] Email path configured in source.
- [x] Estimator form has a server boundary and false-success protection.
- [x] Contact consent collected and recorded in payload.
- [x] Server recalculates estimator values rather than trusting browser totals.
- [x] Persistence contract now supports authenticated webhook delivery + idempotency key.
- [x] Basic abuse controls: honeypot, input bounds and best-effort IP rate limit.
- [ ] **BLOCKER — dedicated durable Shalcon lead persistence configured.**
- [ ] **BLOCKER — successful real persistence test completed.**
- [ ] **BLOCKER — forced real destination failure test proves no false success.**

## D. Privacy / legal baseline
- [x] Privacy draft exists.
- [x] Website terms draft exists.
- [x] Public form warns against submitting sensitive client data.
- [x] Demo uses synthetic data.
- [x] Public lead endpoint minimizes stored page/referrer data and allowlists attribution fields.
- [ ] **BLOCKER — final legal/business identity inserted where required.**
- [ ] **BLOCKER — owner/legal review of production terms/privacy complete.**

## E. Technical QA
- [x] Strict CI build passes on current market-ready branch.
- [x] Dependency audit gate passes.
- [x] Lead safety test suite passes.
- [x] Vercel configuration JSON validation passes.
- [x] Compiled-artifact security/performance budget passes.
- [x] Desktop visual smoke QA passed on compiled CI artifact.
- [x] Mobile visual smoke QA passed on compiled CI artifact.
- [x] Estimator modal interaction QA passed: open/close, consent, failure state, scroll restoration.
- [x] Accessibility smoke QA passed: focus trap/return, keyboard close, mobile touch targets, no horizontal overflow in tested viewport.
- [x] Performance/bundle architecture reviewed; WebGL is lazy and skipped for constrained/mobile/save-data/reduced-motion conditions.
- [x] No critical console/runtime errors observed in tested compiled-artifact browser pass.
- [ ] **BLOCKER — dedicated Shalcon preview deployment exists and current branch is verified on it.**
- [ ] **BLOCKER — booking/WhatsApp/email + `/api/lead` verified against deployed preview.**
- [ ] Cross-browser deployed-preview smoke test (Chromium + at least one WebKit/Firefox-class browser where available).

## F. Sales readiness
- [x] Sales playbook.
- [x] Discovery/audit operating template.
- [x] Qualification framework.
- [x] Proposal/SOW template.
- [x] Objection/closing playbook.
- [x] Client onboarding template.
- [x] Delivery/UAT playbook.
- [x] Measurement schema.
- [x] Pilot/client report template.
- [x] Healthcare outbound copy framework.
- [x] Mumbai first-100-account research process.
- [x] Initial researched healthcare seed list.
- [x] Founder-led pipeline operating rhythm.
- [x] Basic financial/margin control model.
- [x] Launch-critical SOP index.
- [ ] **BLOCKER FOR PAID WORK — final commercial pricing/risk terms owner-approved.**
- [ ] **BLOCKER FOR PAID WORK — payment/KYC/bank/accounting collection path owner-ready.**

## G. Proof readiness
- [x] Healthcare flagship workflow explained on website.
- [x] Synthetic interactive prototype exists.
- [x] Proof standard documented.
- [x] Pilot measurement/reporting template exists.
- [ ] First production pilot baseline captured.
- [ ] First permission-backed case study published.

The last two proof items are **not required to begin controlled founder-led outbound**, but they are required before marketing any client-result claim.

## H. Controlled founder-led outreach gate
Controlled, low-volume, targeted outreach may start when:
1. strict CI + visual/interaction QA pass;
2. a working direct booking/contact path exists;
3. no unsupported marketing claim remains;
4. outbound copy references only public observations;
5. prospect opt-outs are respected;
6. the website does not pretend failed lead persistence succeeded.

Current status: **TECHNICALLY READY TO START CONTROLLED OUTREACH USING DIRECT BOOKING/CONTACT PATHS**, but do not depend on the website lead form until durable persistence is configured and tested.

## I. Full public / paid-traffic launch gate
Full public/paid acquisition additionally requires:
- dedicated Shalcon preview/production deployment verification;
- durable lead persistence + authenticated destination;
- successful persistence + forced-failure tests in the deployed environment;
- final privacy/legal identity review;
- owner-approved commercial/payment setup.

## J. Evidence discipline
A checked box means an asset/test exists now. It does not mean the process is mature. Sales, delivery, reporting and financial controls become proven only through real prospect/client execution data.
