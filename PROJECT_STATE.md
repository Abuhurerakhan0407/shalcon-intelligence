# PROJECT_STATE.md — Shalcon Intelligence

Status date: 30 Aug 2026
Branch: `shalcon-market-ready-2026`

Fast recovery handoff. Strategy/source of truth: `docs/MARKET_READY_MASTER.md`. Release evidence: `docs/LAUNCH_GATE.md`.

## 1. Repository safety

- **Do not edit or merge into `main` while it contains Abu's portfolio work.**
- Market-ready Shalcon work lives only on `shalcon-market-ready-2026`.
- Old `source/` prototype duplicates removed; Git history preserves them.
- Obsolete `docs/CLAUDE_CODE_BUILD_BRIEF.md` removed because it instructed future agents to preserve unsupported claims and stale architecture rules.
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
- Dedicated Supabase lead persistence in `ap-south-1`

Direct runtime dependencies intentionally limited to React, React DOM, Three.js and GSAP.

## 4. Website / trust state

Implemented:
- Healthcare-first flagship and architecture proof;
- unsupported metrics/testimonials removed;
- marketing truth guard;
- deterministic synthetic demo scenarios with explicit safety boundaries;
- Opportunity-at-Risk Estimator with editable assumptions/formula limitations;
- booking, WhatsApp, LinkedIn and email routes;
- centralized non-sensitive conversion tracking + UTM attribution;
- privacy/terms drafts; drafts are `noindex,nofollow` until approved;
- keyboard skip link + main landmark;
- mobile navigation Escape/focus return;
- estimator modal focus trap/focus return;
- key mobile touch targets >=44px in tested UI;
- responsive architecture flow;
- constrained/mobile/save-data/reduced-motion WebGL fallback;
- Vercel CSP/security headers;
- Trust-by-Design section.

Live production alias:
- `https://shalcon-intelligence.vercel.app`

Verified live deployment source:
- Vercel project: `shalcon-intelligence`
- project id: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- branch: `shalcon-market-ready-2026`
- verified deployment commit: `9a32577ec4b339b5b71482ae41cc2726f00bab80`
- deployment id: `dpl_GhJnrgAksxEvDwe7umhgbfNuxiR9`
- build: READY / production

The initial Vercel deployment from `main` was portfolio code and is not valid Shalcon evidence. Production Branch tracking has since been changed to `shalcon-market-ready-2026`.

Final SEO canonical/absolute social metadata waits for an owned production domain.

## 5. Lead capture

Browser → `/api/lead` → authenticated HTTPS webhook → dedicated Shalcon Supabase persistence.

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
- upstream JSON acknowledgement must contain `{ ok: true }` before success;
- failure closes safely.

Vercel env configured by owner:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Do not expose the raw secret in source, screenshots or general logs. Rotate it before final public launch because the current integration credential was manually transferred during setup.

Payload schema: v2.

### Dedicated Supabase — DEPLOYED
Project:
- name: `shalcon-intelligence`
- project ref: `qfsnmjeacwdkbukwxbwz`
- region: `ap-south-1`
- status at creation/test: `ACTIVE_HEALTHY`

Live components:
- migration `create_shalcon_leads` applied;
- `public.shalcon_leads` created with RLS enabled;
- no public RLS policy;
- `anon` and `authenticated` table privileges revoked;
- only trusted server role has table privileges;
- Edge Function `shalcon-lead-webhook` active;
- custom server-to-server shared-secret verification happens before DB access;
- raw secret is not committed to Git or embedded in Supabase source; only a SHA-256 verifier is stored in source;
- destination revalidates schema/contact/consent/numbers;
- destination recomputes expected opportunity values and rejects mismatches;
- UUID + payload hash preserve exact replay behavior without overwriting conflicts.

### Live persistence evidence
Destination-only contract:
- wrong secret → 401;
- first synthetic write → 201 / `replay:false`;
- exact same write → 200 / `replay:true`;
- same UUID with changed payload → 409 `idempotency_conflict`;
- stored row remained unchanged after conflict;
- temporary QA credential rotated out and verified rejected.

Deployed Vercel integration:
- synthetic POST through `https://shalcon-intelligence.vercel.app/api/lead` → 201;
- Supabase stored consent, UTM attribution and server-computed opportunity values correctly;
- production Supabase verifier intentionally invalidated for forced-failure QA;
- same deployed Vercel endpoint then returned 502 `lead_persistence_failed` and no extra row was stored;
- production verifier immediately restored;
- a second deployed integration POST returned 201 again;
- all synthetic integration QA rows deleted; table returned to zero rows.

The one Vercel runtime 401/502 sequence during QA is explained by this intentional forced-failure test, not an unresolved production failure.

Supabase advisors after schema creation:
- security: one INFO for “RLS enabled, no policy” — intentional because the table is server-only;
- performance: unused-index INFO only — expected for a new zero-row table.

## 6. CI / QA

Workflow: `.github/workflows/shalcon-market-ready-ci.yml`.

Current gates:
- Node 22 install;
- repository secret-leakage guard;
- Vercel config JSON validation;
- npm dependency/security audit;
- runtime dependency usage;
- marketing-claim regression;
- API/client + demo + Supabase destination + legal safety tests;
- production build;
- compiled-artifact secret/claim/performance budget;
- build artifact upload.

Compiled browser QA on green artifacts passed estimator interaction, consent/failure paths, contact targets, legal links, focus trap/return, 390px containment, 44px target checks and showed no critical runtime errors.

Live Vercel verification completed:
- correct branch/commit metadata;
- successful production build;
- homepage returns 200 with Shalcon metadata and security headers;
- privacy and terms return 200 and are individually `noindex,nofollow`;
- `GET /api/lead` correctly returns 405 with `Allow: POST`;
- live compiled JS contains the canonical booking/WhatsApp/email configuration;
- real `/api/lead` success and forced-upstream-failure behavior verified.

Remaining QA limitation:
- deployed-site visual cross-browser smoke in a Firefox/WebKit-class browser is not yet evidenced.

## 7. Pre-launch indexing safety

The currently live verified deployment `9a32577...` still contains homepage `index,follow` metadata.

A global staging protection patch was committed afterward:
- commit: `e55b721264d90d012b6db3796e0b4aa4ea7ecdad`
- change: `X-Robots-Tag: noindex, nofollow` in `vercel.json`

**Important:** this no-index patch is not live yet because Vercel Hobby build-rate limiting rejected the deployment. Do not claim the staging homepage is no-indexed until a later Vercel deployment is verified to contain that header.

## 8. Data protection baseline

Current official India DPDP notifications were rechecked on 29 Aug 2026.

Important correction: the 2025 commencement notifications phased the Act/Rules. The framework is enacted/notified, but many substantive private-sector provisions are scheduled for later commencement rather than all being in force today.

Shalcon nevertheless builds toward the notified standard now: minimization, clear purpose/notice, access controls, reasonable security safeguards, logging, processor-contract terms, retention/deletion handling and breach readiness.

Files:
- `docs/INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`

Never market a generic unsupported “100% DPDP compliant” claim.

## 9. Market-ready business assets

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
- `docs/AUTOMATION_AUDIT_DELIVERABLE_TEMPLATE.md`
- `docs/OBJECTION_CLOSE_PLAYBOOK.md`
- `docs/PROPOSAL_SOW_TEMPLATE.md`
- `docs/DATA_PROCESSING_ADDENDUM_TEMPLATE.md`
- `docs/HEALTHCARE_PILOT_PRICING_RECOMMENDATION.md`

Acquisition:
- `docs/HEALTHCARE_GTM_100_ACCOUNTS.md`
- `docs/HEALTHCARE_TARGETS_MUMBAI_SEED.md`
- `docs/OUTREACH_COPY_HEALTHCARE.md`
- `docs/HEALTHCARE_OUTREACH_BATCH_01.md`
- `docs/PIPELINE_OPERATING_RHYTHM.md`
- `docs/LEAD_MAGNET_RELEASE.md`

Delivery/evidence/operations:
- `docs/CLIENT_ONBOARDING_TEMPLATE.md`
- `docs/DELIVERY_PLAYBOOK.md`
- `docs/MEASUREMENT_SCHEMA.md`
- `docs/CLIENT_PILOT_REPORT_TEMPLATE.md`
- `docs/FINANCIAL_CONTROL.md`
- `docs/ACCESS_SECURITY_SOP.md`
- `docs/INCIDENT_RESPONSE_SOP.md`
- `docs/SOP_INDEX.md`

Infrastructure:
- `docs/LEAD_CAPTURE_SETUP.md`
- `docs/SUPABASE_LEAD_DESTINATION_SPEC.md`
- `supabase/README.md`

Domain:
- `docs/DOMAIN_OPTIONS_2026-08-29.md`
- connected check found `shalconintelligence.com`, `shalcon.ai` and `shalcon.io` available at the time of the check; recheck immediately before purchase.
- exact-brand `.com` is recommended unless an already-owned better domain exists.

## 10. 30 Foundations

Do not use the legacy dashboard's complete/active/next labels. Use `docs/FOUNDATION_RECONCILIATION.md` plus `docs/LAUNCH_GATE.md`.

Launch-critical operational assets now exist for positioning, proof standard, discovery, proposals, objections, onboarding, delivery, reporting, financial control and SOPs.

Hiring, partnerships, broad scaling and exit planning remain intentionally deferred until evidence/revenue.

## 11. Genuine remaining blockers

### Infrastructure / release
1. Get the committed global no-index staging header onto a successful Vercel deployment after the Hobby build-rate window reopens.
2. Run final deployed release verification after that deployment.
3. Rotate the Vercel/Supabase webhook integration credential before final public launch.
4. Choose/control final production domain and finalize canonical/sitemap/social metadata.
5. Capture a deployed Firefox/WebKit-class visual smoke test where available.

### Legal/commercial — owner controlled
6. Final legal/business identity for public legal pages/contracts/invoices.
7. Review/approve privacy, website terms, DPA/client legal terms.
8. Final price/risk/margin approval.
9. Payment/KYC/bank/accounting collection path.

### Market evidence
10. Send first controlled Healthcare outreach batch.
11. First qualified audit/proposal.
12. First production pilot.
13. Baseline/post-pilot evidence + permission-backed case study.

## 12. Next execution order

1. Keep CI green.
2. Wait for the Vercel Hobby build-rate window to reopen; do not spam commits/redeploy attempts.
3. Deploy/verify the committed no-index staging header.
4. Finish remaining safe release QA and owner-decision packets.
5. Obtain legal/business identity and commercial/payment approvals only when they become the real blocker.
6. Finalize domain and production SEO.
7. Rotate integration credential before final public launch.
8. Run controlled Healthcare outreach.
9. Convert audit → proposal → bounded pilot → measured evidence.

## 13. Truth rules

- no fabricated metrics/testimonials;
- no guaranteed revenue/recovery/breakeven claims without separately approved contractual basis;
- synthetic demos never presented as client deployments;
- sensitive professional judgment remains appropriately human-controlled;
- no mass cold WhatsApp strategy;
- no cross-product infrastructure shortcuts;
- no broad compliance claim without evidence and engagement-specific basis.
