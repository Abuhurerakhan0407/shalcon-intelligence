# SHALCON INTELLIGENCE — AGENT CONTEXT

Read `PROJECT_STATE.md` first for the current implementation handoff and `docs/MARKET_READY_MASTER.md` for strategy. Do not treat older phase notes or the legacy 30-foundations HTML as proof of completion.

## Company
Shalcon Intelligence is an AI automation agency / AI Operations Systems Partner.

Primary launch wedge: **Healthcare / clinics**.
Secondary: **EdTech / coaching / admissions**.
Other supported workflows: Insurance, E-commerce, HR/Recruitment.

## Flagship offer
**AI Front Desk + Lead Operations System**

The operating path can include:
- inbound intake;
- approved qualification;
- routing / booking;
- permission-aware follow-up;
- CRM/database write-back;
- operational reporting;
- human escalation.

Sell the connected business workflow, not isolated AI tools.

## Positioning rule
Shalcon should win on vertical understanding, implementation quality, honest proof, clear human-control boundaries, measurement and reliable integrations — not generic “24/7 AI” claims.

## Truth rules
- Never invent client metrics, platform counts, uptime or testimonials.
- `src/data/content.js` is editable when market truth requires it; it is no longer “frozen.”
- Public demos are synthetic unless verified otherwise.
- Numeric client-result claims require evidence and permission recorded in `docs/CLAIMS_REGISTER.md`.
- The Opportunity-at-Risk Estimator is a planning model, not a verified loss/recovery calculator.
- Do not promise guaranteed revenue, conversion, recovery or breakeven.
- Do not imply a lead was saved unless the persistence destination actually acknowledged the write.

## Sensitive-workflow rule
Healthcare, insurance, HR and other sensitive workflows require explicit human escalation and data-minimization design. Do not position general AI automation as autonomous professional judgment.

## Acquisition rule
Default first-contact channels are targeted email and LinkedIn/manual prospecting. Do not build or recommend mass cold WhatsApp outreach. WhatsApp follow-up should be permission-aware / prospect-initiated as applicable.

## Repository rule
- Work on `shalcon-market-ready-2026`.
- Do not edit/merge `main` while it contains Abu portfolio work.
- Do not re-create removed `source/` prototype files as active source.
- Do not commit real environment secrets or machine-local agent permission settings.

## Technical stack
- Vite 8
- React 18
- Tailwind v4
- Three.js imperative scene
- GSAP/ScrollTrigger
- Vercel `/api/lead` server route

Direct runtime dependencies are intentionally kept minimal. Do not add a framework/library unless the shipped app actually needs it.

## Performance rules
- First paint must not depend on WebGL.
- Decorative Three.js remains lazy/conditional.
- Small-screen, reduced-motion, low-memory, low-CPU and Save-Data users keep the CSS fallback.
- Preserve keyboard/focus behavior and 44px mobile touch targets.
- Keep compiled-artifact size/security gate green.

## Lead-capture contract
The browser sends audit requests only to `/api/lead`.

The server:
- validates + bounds inputs;
- requires contact consent;
- recalculates estimator outputs itself;
- minimizes URLs/attribution;
- requires HTTPS persistence;
- requires `LEAD_WEBHOOK_SECRET`;
- sends authenticated server-to-server webhook requests;
- generates `leadId` and matching `Idempotency-Key`;
- applies basic abuse controls;
- fails closed when durable persistence fails.

Required production env:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Current blocker: dedicated Shalcon persistence has not been deployed yet. See `docs/SUPABASE_LEAD_DESTINATION_SPEC.md`.

## Market-ready status
Working launch assets exist for:
- positioning/offer;
- website + synthetic demo;
- discovery/qualification;
- objections/closing;
- proposal/SOW;
- onboarding;
- delivery/UAT;
- reporting/measurement;
- basic financial controls;
- pipeline cadence/outreach;
- claims control;
- lead destination specification.

Items requiring owner authority/account access remain blockers: dedicated billable infrastructure creation, final legal/business identity/review, commercial/payment approval and real client evidence.

## Execution behavior
Do not stop for cosmetic approvals. Keep improving safe, reversible, non-owner-dependent work until a real credential, cost, legal-authority, payment/KYC or business-decision dependency is reached.
