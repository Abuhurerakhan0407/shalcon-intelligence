# SHALCON INTELLIGENCE — MARKET READY MASTER

Status date: 29 Aug 2026
Branch: `shalcon-market-ready-2026`
Purpose: authoritative operating plan for turning Shalcon Intelligence into a credible, secure, measurable AI automation agency.

## 0. Operating rules

1. Do not edit or merge into `main` while it contains Abu's portfolio work.
2. A checklist item is not evidence. Mark work complete only when a working asset, test, integration, document or measured process exists.
3. No fabricated client results, testimonials, platform counts, uptime, recovery rates or breakeven promises.
4. Synthetic demos must remain clearly labeled.
5. Sell operating systems and measurable workflows, not generic “AI bot” capability lists.
6. Human judgment remains in the loop for sensitive/consequential medical, insurance and employment decisions.
7. Do not create/reuse cross-product infrastructure merely to remove a checkbox.
8. Current release status is governed by `docs/LAUNCH_GATE.md`.
9. Fast resume state is governed by `PROJECT_STATE.md`.

## 1. Market research conclusion

The AI automation agency market is crowded with the same surface offer: voice agents, WhatsApp automation, CRM routing, n8n/Make workflows, qualification, booking and dashboards.

Competitor research is recorded in `docs/COMPETITOR_RESEARCH_2026-08-29.md`.

Shalcon cannot differentiate by naming more tools. The defensible launch position is:
- vertical workflow knowledge;
- clear audit → pilot → system buying path;
- implementation quality;
- explicit human escalation;
- honest value modelling;
- measurable production baselines/results;
- good security/data handling;
- ongoing optimization after launch.

## 2. Positioning

### Category
**AI Operations Systems Partner**

### Main promise
Shalcon designs and deploys systems that capture, qualify, follow up, book, route and update business systems automatically — while escalating the right exceptions to humans.

### Launch wedge
Primary: **Healthcare / clinics**

Secondary: **EdTech / coaching / admissions**

Supported adjacent workflows: Insurance, E-commerce, HR/Recruitment.

### Flagship offer
**AI Front Desk + Lead Operations System**

Core modules:
1. web / approved messaging inquiry intake;
2. voice workflow where appropriate;
3. qualification and routing;
4. appointment/demo scheduling;
5. follow-up and reminders;
6. CRM/database write-back;
7. operational events/reporting;
8. human escalation and safe failure paths.

## 3. Buying paths

### Audit
Free automation opportunity audit.

Output: current-state workflow, bottleneck map, automation priority, data/integration constraints and an editable impact model.

### Pilot
One bounded production workflow with explicit acceptance criteria and measurement.

Price after discovery. Third-party/API fees and client responsibilities stated separately.

### System
Multi-channel operating workflow with integrations, reporting, monitoring and optimization.

Current Starter/Growth/Enterprise figures are indicative planning ranges until owner approves final commercial risk/margins. Never promise fixed breakeven or recovery percentages.

## 4. Website / engineering state

### Completed and verified in source/CI
- Shalcon recovered into an isolated branch.
- Vite 8 + React 18 build chain.
- Direct runtime dependencies reduced to React, React DOM, Three.js and GSAP.
- npm security audit gate.
- runtime dependency-usage guard.
- marketing-claim regression guard.
- compiled-artifact secret/claim/performance guard.
- unsupported old metrics/testimonials removed.
- Healthcare-first homepage and flagship architecture proof.
- synthetic deterministic industry demo logic.
- opportunity-at-risk estimator replacing misleading loss/recovery framing.
- estimator assumptions visible/editable.
- booking, WhatsApp and email paths configured.
- centralized non-sensitive conversion-event layer.
- privacy/terms drafts.
- legal drafts kept `noindex` until final review.
- responsive/readability improvements.
- keyboard skip link + main landmark.
- modal focus trap/return and mobile touch-target improvements.
- mobile/reduced-motion/low-power/save-data WebGL fallback.
- Vercel security headers.
- server-side lead validation, consent evidence, attribution minimization, rate limiting and false-success prevention.
- authenticated/idempotent persistence contract prepared.
- strict production CI currently green.

### Still required for deployed release
- dedicated Shalcon Vercel project/preview;
- dedicated Shalcon Supabase project;
- deploy/test lead persistence;
- deployed browser/contact/API QA;
- final production domain + canonical/absolute metadata;
- final legal identity/privacy/terms approval.

## 5. Lead capture architecture

Browser → `/api/lead` → authenticated HTTPS webhook → dedicated Shalcon Supabase Edge Function → internal lead table.

### Vercel trust boundary
`/api/lead` currently:
- accepts POST only;
- limits body size;
- uses a honeypot;
- applies best-effort short-window rate limiting without persisting IP as lead data;
- validates name/WhatsApp/explicit contact permission;
- bounds estimator inputs;
- recalculates opportunity values server-side;
- strips query/fragment data from retained page/referrer;
- allowlists UTM source/medium/campaign;
- requires HTTPS destination and strong shared secret;
- creates a UUID lead ID and idempotency key;
- returns success only when the destination succeeds.

### Supabase destination implementation
Prepared, not deployed:
- `supabase/sql/create_shalcon_leads.sql`
- `supabase/functions/shalcon-lead-webhook/index.ts`
- `supabase/config.toml`
- `supabase/README.md`
- `tests/supabase-lead-destination.test.mjs`

Destination design:
- custom shared-secret authentication before any DB access;
- schema/source/contact/consent validation;
- second estimator validation + recomputation at persistence boundary;
- RLS enabled;
- browser roles revoked;
- exact replay allowed without duplicate;
- conflicting same-ID payload rejected rather than overwritten;
- no full payload/secret logging.

Do not point it at Pagevelope, Madrasa ERP or another product database.

## 6. Data protection / compliance baseline

Do not claim generic “100% DPDP compliant.” Compliance is role-, workflow-, data-, vendor- and time-specific.

Important timing: the 13 Nov 2025 Government notifications phased commencement of the DPDP Act/Rules. As of 29 Aug 2026, the framework is enacted/notified, but many substantive private-sector processing provisions and Rules are scheduled for later commencement rather than all being in force today.

Shalcon should nevertheless build toward the notified standard now: data minimization, clear notice/purpose, access controls, reasonable security safeguards, appropriate logs, processor-contract terms, deletion/retention handling and breach readiness.

Operational/legal research is in `docs/INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`.
Working client appendix is `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`.

Before any real client personal data enters production:
- identify client/Shalcon roles;
- create field/data map;
- approve vendors/integrations;
- define access, retention and escalation;
- sign appropriate contract/DPA terms;
- use client-authorized credentials;
- keep sensitive/consequential decisions human-controlled where required;
- obtain engagement-specific legal advice when the risk warrants it.

## 7. Proof strategy

### Before real client evidence
Use capability proof only:
- synthetic workflow demo;
- architecture view;
- test/QA evidence;
- safe failure behavior;
- integration design;
- measurable demo properties that are actually observed.

Do not turn demo numbers into client-performance claims.

### After a production pilot
1. record baseline before deployment;
2. define success metric before build;
3. collect post-launch measurements;
4. document timeframe/sample size/context;
5. obtain client permission before publishing name/logo/result;
6. add approved evidence to `CLAIMS_REGISTER.md`;
7. only then replace demo proof with a public case study.

## 8. Sales machine

Working assets exist for:
- service overview;
- Healthcare offer;
- EdTech offer;
- discovery/audit questions;
- qualification scoring;
- objections/closing;
- proposal + SOW;
- client onboarding;
- delivery/UAT;
- pilot reporting/measurement;
- financial/margin control;
- Healthcare outreach copy;
- pipeline operating rhythm;
- initial Mumbai prospect seed list;
- launch-critical SOP index.

Controlled outbound uses targeted email/LinkedIn/manual research first. WhatsApp is not the default mass cold channel. Prospect observations must be public/supportable and opt-outs must be recorded.

## 9. Owner split — target 90/10

### ChatGPT / execution owner
Research, planning, code, QA, truthful copy, website conversion, estimator, analytics architecture, lead-capture implementation, security controls, documentation, demos, offer sheets, sales collateral, prospecting process, deployment preparation and launch tracking.

### Business owner only
Tasks requiring identity, legal authority, money/account ownership or real human selling:
- choose/authorize billable infrastructure when required;
- final legal/business identity;
- review/sign legal agreements;
- approve prices/payment/risk limits;
- complete bank/KYC/GST/accounting/provider ownership actions;
- authorize real client/system access;
- attend/close early sales conversations;
- provide/approve truthful client evidence;
- approve final domain purchase/ownership where necessary.

## 10. Current execution status

### Sprint 0 — Recovery + truth
- [x] Isolate Shalcon branch.
- [x] Recover genuine agency site.
- [x] Reclassify old 30 foundations.
- [x] Create claims register.
- [x] Remove stale duplicate/Claude-era instructions that could reintroduce old claims.

### Sprint 1 — Website trust + conversion
- [x] Remove unsupported proof.
- [x] Reframe demos as synthetic.
- [x] Fix contact routes.
- [x] Redesign estimator assumptions/language.
- [x] Implement secure lead server boundary.
- [x] Prepare dedicated persistence implementation.
- [x] Add privacy/terms drafts.
- [x] Add conversion event architecture.
- [x] Responsive/accessibility/performance engineering pass.
- [x] Strict CI/build/artifact gates.
- [ ] Deploy dedicated preview.
- [ ] Deploy/test dedicated persistence.

### Sprint 2 — Flagship proof
- [x] Healthcare flagship workflow on website.
- [x] Healthcare architecture proof.
- [x] Synthetic interactive demo with safety boundaries.
- [x] EdTech synthetic scenario within the multi-industry demo.
- [ ] Production pilot evidence (requires client).

### Sprint 3 — Sales machine
- [x] Service/offer sheets.
- [x] Discovery audit system.
- [x] Proposal/SOW.
- [x] Objection/close framework.
- [x] Delivery/onboarding/report templates.
- [x] CRM schema/process.
- [x] Healthcare targeting and outreach framework.
- [x] Initial researched Mumbai seed accounts.
- [ ] Final owner-approved commercial terms.
- [ ] Live CRM/pipeline persistence tied to real leads.

### Sprint 4 — Launch
- [x] Domain options researched; exact-brand `.com` recommended if still available at purchase time.
- [ ] Dedicated preview + deployed QA.
- [ ] Final production domain release.
- [ ] First controlled outreach batch.
- [ ] First qualified audit/proposal.
- [ ] First paid pilot.
- [ ] Permission-backed case study.

## 11. Deferred until evidence/revenue

Do not block launch on:
- hiring;
- partnerships;
- broad international expansion;
- five mature standalone SaaS products;
- complex authority/content programs;
- large internal automation suite;
- exit planning.

## 12. Release standard

Shalcon is market-ready when a prospect can:
1. understand the operating problem/offer quickly;
2. see real proof or an explicitly labeled synthetic demo;
3. estimate value without misleading guarantees;
4. book/contact without broken links;
5. submit a lead that is durably stored;
6. understand the next step;
7. see credible privacy/security boundaries;
8. receive a professional audit/proposal/onboarding flow.

Anything beyond that is optimization, evidence-building or scale—not a reason to keep polishing forever.
