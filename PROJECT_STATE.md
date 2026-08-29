# PROJECT_STATE.md — Shalcon Intelligence

Status date: 29 Aug 2026
Branch: `shalcon-market-ready-2026`

This file is the fast recovery handoff. `docs/MARKET_READY_MASTER.md` is the strategic source of truth; `docs/LAUNCH_GATE.md` is the release gate.

## 1. Repository safety

- **Do not edit or merge into `main` while it contains Abu's portfolio work.**
- Shalcon market-ready work lives on `shalcon-market-ready-2026`.
- Old duplicate prototype files under `source/` were removed from this branch; Git history preserves them.
- Machine-local `.claude/settings.local.json` was removed and is ignored.

## 2. Current product / market position

Category: **AI Operations Systems Partner**.

Primary launch wedge: **Healthcare / clinics**.
Secondary: **EdTech / coaching / admissions**.
Other supported workflows: Insurance, E-commerce, HR/Recruitment.

Flagship offer: **AI Front Desk + Lead Operations System** — intake, qualification, routing/booking, approved follow-up, CRM/database write-back, reporting and human escalation.

Public demos are synthetic unless explicitly identified as verified client deployments.

## 3. Current stack

- Vite 8
- React 18
- Tailwind v4
- Three.js (imperative, lazy/conditional WebGL enhancement)
- GSAP / ScrollTrigger
- Vercel server route: `/api/lead`

Direct runtime dependencies are intentionally limited to React, React DOM, Three.js and GSAP. Unused R3F/Drei/Framer runtime packages were removed.

## 4. Website state

Completed on this branch:
- Healthcare-first positioning and flagship workflow.
- Unsupported client metrics/testimonials removed.
- Marketing-claim regression guard prevents known stale claims from reappearing.
- Synthetic demo labels and human-escalation boundaries.
- Opportunity-at-Risk Estimator replaces misleading recovery/breakeven framing.
- Editable assumptions + visible formula/limitations.
- Real booking URL, WhatsApp and email paths configured in source.
- Privacy and website-terms drafts.
- Consent before audit-request persistence.
- Responsive/readability/accessibility improvements.
- Modal focus trap + focus return.
- 44px mobile touch targets on key controls.
- Mobile/reduced-motion/low-power/save-data WebGL fallback.
- Security headers in `vercel.json`.

SEO still requires the final production domain before canonical/absolute OG metadata can be finalized safely.

## 5. Lead capture trust boundary

Browser submits to `/api/lead`.

Current server behavior:
- POST only;
- payload-size limit;
- honeypot;
- best-effort short-window IP rate limit without storing IP as lead data;
- explicit contact consent;
- WhatsApp normalization/validation;
- bounded estimator inputs;
- server recomputes opportunity values and ignores forged browser totals;
- page/referrer query/fragment minimization;
- only UTM source/medium/campaign attribution retained;
- requires HTTPS persistence destination;
- requires `LEAD_WEBHOOK_SECRET` (minimum 24 chars);
- sends `X-Shalcon-Webhook-Secret` server-to-server;
- server generates `leadId` UUID and sends matching `Idempotency-Key`;
- no saved confirmation unless persistence returns successful HTTP response;
- upstream failures fail closed.

Required production env vars:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Current payload schema: v2.

**Remaining blocker:** no dedicated durable Shalcon persistence destination has been created/configured yet.

See `docs/LEAD_CAPTURE_SETUP.md` and `docs/SUPABASE_LEAD_DESTINATION_SPEC.md`.

## 6. CI / QA

Workflow: `.github/workflows/shalcon-market-ready-ci.yml`

Current gates:
- Node 22 dependency install;
- valid Vercel config JSON;
- npm security audit;
- direct runtime dependency usage guard;
- marketing-claim regression guard;
- lead API/client safety tests;
- production build;
- compiled-artifact secret/claim/performance budget gate;
- build artifact upload.

Strict CI passed on the current authenticated/idempotent lead-capture contract before this handoff update.

Compiled-artifact browser QA previously passed for:
- estimator open/close;
- industry presets;
- consent behavior;
- persistence-failure state;
- booking/WhatsApp target URLs;
- legal links;
- Escape + body scroll restore;
- focus trap and focus return;
- 390px mobile modal/form containment;
- 44px touch target checks;
- no observed critical runtime errors.

A dedicated deployed Shalcon preview is still required for final deployed-environment and cross-browser verification.

## 7. Market-ready operating assets

### Strategy / truth
- `docs/MARKET_READY_MASTER.md`
- `docs/FOUNDATION_RECONCILIATION.md`
- `docs/CLAIMS_REGISTER.md`
- `docs/COMPETITOR_RESEARCH_2026-08-29.md`
- `docs/LAUNCH_GATE.md`

### Offer / sales
- `docs/SERVICE_OVERVIEW_ONE_PAGE.md`
- `docs/OFFER_HEALTHCARE_ONE_PAGE.md`
- `docs/OFFER_EDTECH_ONE_PAGE.md`
- `docs/SALES_PLAYBOOK.md`
- `docs/DISCOVERY_AUDIT_TEMPLATE.md`
- `docs/OBJECTION_CLOSE_PLAYBOOK.md`
- `docs/PROPOSAL_SOW_TEMPLATE.md`

### Acquisition
- `docs/HEALTHCARE_GTM_100_ACCOUNTS.md`
- `docs/HEALTHCARE_TARGETS_MUMBAI_SEED.md`
- `docs/OUTREACH_COPY_HEALTHCARE.md`
- `docs/PIPELINE_OPERATING_RHYTHM.md`
- `docs/LEAD_MAGNET_RELEASE.md`

### Delivery / evidence / operations
- `docs/CLIENT_ONBOARDING_TEMPLATE.md`
- `docs/DELIVERY_PLAYBOOK.md`
- `docs/MEASUREMENT_SCHEMA.md`
- `docs/CLIENT_PILOT_REPORT_TEMPLATE.md`
- `docs/FINANCIAL_CONTROL.md`
- `docs/SOP_INDEX.md`

### Persistence
- `docs/LEAD_CAPTURE_SETUP.md`
- `docs/SUPABASE_LEAD_DESTINATION_SPEC.md`

## 8. 30 Foundations — current interpretation

Do not trust the old “complete/active/next” labels. Use `docs/FOUNDATION_RECONCILIATION.md`.

Launch-useful items now have working assets for positioning, discovery, proposal, objections, onboarding, delivery, reporting, financial control and SOPs.

Items intentionally deferred until revenue include hiring, partnerships, broad scaling operations and exit planning.

## 9. Genuine remaining blockers

### Infrastructure / owner-controlled
1. Dedicated Shalcon lead persistence project/destination.
2. Dedicated Shalcon Vercel preview/production project + deployed verification.
3. Final production domain/canonical metadata.

### Legal / commercial owner-controlled
4. Final legal/business identity for terms/contracts/invoices.
5. Owner/legal review of privacy/website terms/client legal terms.
6. Final commercial price/risk approval.
7. Payment/KYC/bank/accounting collection path.

### Market evidence
8. Execute first controlled Healthcare outreach.
9. Complete first qualified audits/proposals.
10. Deliver first production pilot.
11. Capture baseline/post-pilot evidence.
12. Publish client proof only with verified evidence + permission.

## 10. Next execution order

1. Keep CI green after every change.
2. Prepare all non-billable infrastructure/specs that do not require owner credentials.
3. Create dedicated Shalcon persistence once owner authorizes the Supabase organization/cost.
4. Create/verify dedicated Vercel preview without touching portfolio deployments.
5. Run deployed lead success/failure + contact + cross-browser checks.
6. Finalize domain SEO/legal identity when known.
7. Begin/measure controlled Healthcare outreach.
8. Convert qualified opportunity → audit → proposal → bounded pilot.

## 11. Non-negotiable truth rules

- No fabricated client or platform metrics.
- No fake testimonials.
- No guaranteed revenue/recovery/breakeven language without a separately approved contractual basis.
- Do not imply synthetic demos are live client systems.
- Do not automate sensitive professional judgment without appropriate human control.
- Do not send mass cold WhatsApp outreach; use permission-aware communication.
- Do not create or reuse cross-product data infrastructure just to remove a launch checkbox.
