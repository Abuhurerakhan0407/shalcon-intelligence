# PROJECT_STATE.md — Shalcon Intelligence

Status date: 29 Aug 2026
Branch: `shalcon-market-ready-2026`

Fast recovery handoff. Strategy/source of truth: `docs/MARKET_READY_MASTER.md`. Release evidence: `docs/LAUNCH_GATE.md`.

## 1. Repository safety

- **Do not edit or merge into `main` while it contains Abu's portfolio work.**
- Market-ready Shalcon work lives only on `shalcon-market-ready-2026`.
- Old `source/` prototype duplicates removed; Git history preserves them.
- Obsolete `docs/CLAUDE_CODE_BUILD_BRIEF.md` removed because it instructed future agents to preserve old unsupported claims and stale architecture rules.
- Machine-local Claude settings removed/ignored.
- `.env*` secrets and `.vercel` local bindings ignored; `.env.example` is intentionally tracked.

## 2. Market position

Category: **AI Operations Systems Partner**.

Primary wedge: **Healthcare / clinics**.
Secondary: **EdTech / coaching / admissions**.
Adjacent workflows remain: Insurance, E-commerce, HR/Recruitment.

Flagship: **AI Front Desk + Lead Operations System** — intake, qualification, routing/booking, approved follow-up, CRM/database write-back, reporting and human escalation.

Buying path: Audit → bounded Pilot → connected System.

## 3. Stack

- Vite 8
- React 18
- Tailwind v4
- Three.js, imperative/lazy enhancement
- GSAP / ScrollTrigger
- Vercel server route `/api/lead`

Direct runtime dependencies intentionally limited to React, React DOM, Three.js and GSAP.

## 4. Website / trust state

Implemented:
- Healthcare-first flagship and architecture proof.
- Unsupported metrics/testimonials removed.
- marketing truth guard.
- deterministic synthetic demo scenarios with explicit safety boundaries.
- Opportunity-at-Risk Estimator with editable assumptions/formula limitations.
- booking, WhatsApp, LinkedIn and email routes.
- centralized non-sensitive conversion tracking + UTM attribution.
- privacy/terms drafts; drafts are `noindex,nofollow` until approved.
- keyboard skip link + main landmark.
- mobile navigation Escape/focus return.
- estimator modal focus trap/focus return.
- key mobile touch targets >=44px in tested UI.
- responsive architecture flow.
- constrained/mobile/save-data/reduced-motion WebGL fallback.
- Vercel CSP/security headers.

Final SEO canonical/absolute social metadata waits for an owned production domain.

## 5. Lead capture

Browser → `/api/lead` → authenticated HTTPS webhook → dedicated Shalcon persistence destination.

### Vercel `/api/lead`
- POST only;
- body limit;
- honeypot;
- best-effort in-memory short-window rate limit without persisting IP as lead data;
- explicit contact consent;
- WhatsApp normalization/validation;
- estimator bounds and server-side recomputation;
- minimized page/referrer storage;
- only UTM source/medium/campaign retained;
- HTTPS persistence URL only;
- shared secret minimum 24 chars;
- server-generated UUID `leadId` + matching `Idempotency-Key`;
- failure closes safely; success only follows upstream success.

Production env:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Payload schema: v2.

### Dedicated Supabase implementation — CODE COMPLETE, NOT DEPLOYED
Files:
- `supabase/sql/create_shalcon_leads.sql`
- `supabase/config.toml`
- `supabase/functions/shalcon-lead-webhook/index.ts`
- `supabase/functions/.env.example`
- `supabase/README.md`
- `tests/supabase-lead-destination.test.mjs`

Design:
- custom shared-secret auth occurs before database access;
- `auth:'none'` / `verify_jwt=false` used only for the server-to-server external webhook, with custom authentication in the function;
- destination revalidates schema/contact/consent/numbers;
- destination independently recomputes opportunity values and rejects mismatches;
- RLS enabled; `anon`/`authenticated` privileges revoked;
- payload hash + lead UUID provide safe exact replay behavior;
- same UUID with different normalized payload returns conflict rather than overwrite;
- full lead payload/secrets are never logged by design.

**Infrastructure blocker:** dedicated Shalcon Supabase project still needs owner organization/cost authorization before creation/deployment.

Do not reuse Madrasa ERP or Pagevelope databases.

## 6. CI / QA

Workflow: `.github/workflows/shalcon-market-ready-ci.yml`.

Latest fully checked branch run after the persistence/legal/domain batch: **PASS**.

Current gates:
- Node 22 install;
- Vercel config JSON validation;
- npm dependency/security audit;
- runtime dependency usage;
- marketing-claim regression;
- API/client + demo + persistence + legal safety tests;
- production build;
- compiled-artifact secret/claim/performance budget;
- build artifact upload.

Compiled browser QA on prior exact green artifacts passed estimator interaction, consent/failure paths, contact targets, legal links, focus trap/return, 390px containment, 44px target checks and showed no critical runtime errors.

A dedicated deployed Shalcon preview remains required for final deployed-environment/cross-browser verification.

## 7. Data protection baseline

Current official India DPDP notifications were rechecked on 29 Aug 2026.

Important correction: the 2025 commencement notifications phased the Act/Rules. The framework is enacted/notified, but many substantive private-sector provisions are scheduled for later commencement rather than all being in force today.

Shalcon nevertheless builds toward the notified standard now: minimization, clear purpose/notice, access controls, reasonable security safeguards, logging, processor-contract terms, retention/deletion handling and breach readiness.

Files:
- `docs/INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`

Never market a generic unsupported “100% DPDP compliant” claim.

## 8. Market-ready business assets

Strategy/truth:
- `docs/MARKET_READY_MASTER.md`
- `docs/FOUNDATION_RECONCILIATION.md`
- `docs/CLAIMS_REGISTER.md`
- `docs/COMPETITOR_RESEARCH_2026-08-29.md`
- `docs/LAUNCH_GATE.md`

Offer/sales:
- `docs/SERVICE_OVERVIEW_ONE_PAGE.md`
- `docs/OFFER_HEALTHCARE_ONE_PAGE.md`
- `docs/OFFER_EDTECH_ONE_PAGE.md`
- `docs/SALES_PLAYBOOK.md`
- `docs/DISCOVERY_AUDIT_TEMPLATE.md`
- `docs/OBJECTION_CLOSE_PLAYBOOK.md`
- `docs/PROPOSAL_SOW_TEMPLATE.md`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`

Acquisition:
- `docs/HEALTHCARE_GTM_100_ACCOUNTS.md`
- `docs/HEALTHCARE_TARGETS_MUMBAI_SEED.md`
- `docs/OUTREACH_COPY_HEALTHCARE.md`
- `docs/PIPELINE_OPERATING_RHYTHM.md`
- `docs/LEAD_MAGNET_RELEASE.md`

Delivery/evidence/operations:
- `docs/CLIENT_ONBOARDING_TEMPLATE.md`
- `docs/DELIVERY_PLAYBOOK.md`
- `docs/MEASUREMENT_SCHEMA.md`
- `docs/CLIENT_PILOT_REPORT_TEMPLATE.md`
- `docs/FINANCIAL_CONTROL.md`
- `docs/SOP_INDEX.md`

Infrastructure:
- `docs/LEAD_CAPTURE_SETUP.md`
- `docs/SUPABASE_LEAD_DESTINATION_SPEC.md`
- `supabase/README.md`

Domain:
- `docs/DOMAIN_OPTIONS_2026-08-29.md`
- connected check found `shalconintelligence.com`, `shalcon.ai` and `shalcon.io` available at the time of the check; recheck immediately before purchase.
- exact-brand `.com` is recommended unless an already-owned better domain exists.

## 9. 30 Foundations

Do not use the legacy dashboard's complete/active/next labels. Use `docs/FOUNDATION_RECONCILIATION.md` plus `docs/LAUNCH_GATE.md`.

Launch-critical operational assets now exist for positioning, proof standard, discovery, proposals, objections, onboarding, delivery, reporting, financial control and SOPs.

Hiring, partnerships, broad scaling and exit planning remain intentionally deferred until evidence/revenue.

## 10. Genuine remaining blockers

### Owner/infrastructure
1. Authorize which Supabase organization + the disclosed project cost for dedicated Shalcon persistence.
2. Create/deploy dedicated Shalcon Supabase project/function/table/secrets and run live success/failure/idempotency tests.
3. Create a dedicated Shalcon Vercel project/preview without touching portfolio deployments; current connected Vercel project list has no Shalcon project.
4. Choose/control final production domain.

### Legal/commercial
5. Final legal/business identity for public legal pages/contracts/invoices.
6. Review/approve privacy, website terms, DPA/client legal terms.
7. Final price/risk/margin approval.
8. Payment/KYC/bank/accounting collection path.

### Market evidence
9. First controlled Healthcare outreach batch.
10. First qualified audit/proposal.
11. First production pilot.
12. baseline/post-pilot evidence + permission-backed case study.

## 11. Next execution order

1. Keep CI green.
2. Finish every safe non-owner implementation/task.
3. When no material non-owner blocker remains, get Supabase organization/cost authorization.
4. Deploy/test persistence.
5. Create/verify dedicated Vercel preview.
6. Finish deployed cross-browser/contact/API QA.
7. Finalize domain canonical/SEO + approved legal identity.
8. Run controlled Healthcare outreach.
9. Convert audit → proposal → bounded pilot → measured evidence.

## 12. Truth rules

- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims without separately approved contractual basis;
- synthetic demos never presented as client deployments;
- sensitive professional judgment remains appropriately human-controlled;
- no mass cold WhatsApp strategy;
- no cross-product infrastructure shortcuts;
- no broad compliance claim without evidence and engagement-specific basis.
