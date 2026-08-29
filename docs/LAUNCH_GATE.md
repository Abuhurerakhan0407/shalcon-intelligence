# Shalcon Intelligence — Production Launch Gate

Status date: 30 Aug 2026

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
- [x] Dedicated Vercel project configured with the authenticated Supabase webhook destination.
- [x] Real deployed Vercel → Supabase persistence test completed: `/api/lead` returned 201 and the row was stored with consent, attribution and server-computed estimator values.
- [x] Forced real destination failure completed: Supabase verifier was intentionally invalidated, `/api/lead` returned 502 `lead_persistence_failed`, and no additional row was stored.
- [x] Production verifier restored and re-tested: `/api/lead` returned 201 again.
- [x] All synthetic integration QA rows deleted after testing; lead table returned to zero rows.

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
- [x] Dedicated Shalcon Vercel production deployment exists and is verified as branch `shalcon-market-ready-2026`, commit `9a32577ec4b339b5b71482ae41cc2726f00bab80`.
- [x] Vercel production build completed successfully with Vite 8.2.2.
- [x] Live homepage, privacy, terms and `/api/lead` method behavior verified through Vercel.
- [x] Live `/api/lead` success and forced-failure behavior verified against the real Supabase destination.
- [x] Runtime 502/401 observed during QA is explained by the intentional destination-failure test; production destination was restored and re-tested successfully.
- [x] Latest robots-header source commit passes the full GitHub Actions gate: secret scan, Vercel config, dependency audit, truth guard, lead tests, production build and compiled-artifact checks.
- [ ] Deployed-site cross-browser visual smoke test (Chromium + at least one Firefox/WebKit-class browser where available).

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
- [x] Two Tier-A first-touch emails with verified professional addresses saved as Gmail drafts; not sent.
- [x] Founder-led pipeline operating rhythm.
- [x] Basic financial/margin control model.
- [x] Launch-critical SOP index.
- [x] Owner-approved Healthcare Pilot commercial default: ₹39,000 setup + ₹9,000/month, client-paid/separately-itemized vendor usage, 50/30/20 milestones.
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

Current status: **TECHNICALLY READY FOR CONTROLLED, LOW-VOLUME FOUNDER-LED HEALTHCARE OUTREACH.** The deployed estimator persistence path has been proven end-to-end and under forced failure. Draft emails remain unsent pending the owner's explicit send instruction.

## I. Full public / paid-traffic launch gate
Full public/paid acquisition still requires:
- final owner/legal review of privacy/terms and applicable client legal templates;
- payment/KYC/bank/accounting collection readiness;
- final production domain/metadata;
- production webhook-secret rotation after final infrastructure freeze;
- staging robots-header deployment and verification before unprotecting/indexing the site;
- final deployed release QA after those changes.

## J. Domain / SEO
- [x] Exact-brand domain options researched through connected registrar/deployment account.
- [x] `shalconintelligence.com` recommended if still available when purchased.
- [x] Pre-launch global robots response-header patch committed in `vercel.json`; latest source value is `X-Robots-Tag: noindex, nofollow, noarchive` at commit `1caa3b2b362966366f3eeab76b63d665fbcf43b6`.
- [x] Vercel Authentication enabled for All Deployments as an interim staging-protection control.
- [ ] **BLOCKER BEFORE UNPROTECTED STAGING/PUBLIC RELEASE — robots-header patch must successfully deploy. Vercel Hobby build-rate limiting is currently rejecting new deployments; verified live build `9a32577` still contains homepage `index,follow`.**
- [ ] **BLOCKER FOR FINAL DOMAIN RELEASE — owner controls/approves final domain.**
- [ ] Canonical URL, sitemap and absolute social metadata finalized after domain ownership/connection.

## K. Evidence discipline
A checked box means an asset/test exists now. It does not mean sales/delivery/compliance is mature. Operational claims become proven only through real prospect/client execution and permission-backed evidence.
