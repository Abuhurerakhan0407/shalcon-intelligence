# Shalcon Intelligence — Lead Magnet Release

Status date: 31 Aug 2026

Primary inbound asset: **Opportunity-at-Risk Estimator + Free Automation Audit**.

The estimator is a planning model, not proof that a visitor is losing or will recover a specific amount.

## 1. Visitor promise
A visitor can:
1. choose an industry starting preset;
2. replace assumptions with their own inquiry/conversion/value inputs;
3. see the mathematical opportunity-at-risk scenario;
4. understand formula/limitations;
5. request a free workflow audit;
6. use booking/WhatsApp direct paths where appropriate.

## 2. Required trust language
Public experience must state:
- presets are starting assumptions, not benchmarks;
- output is a planning estimate;
- output is not guaranteed loss/recovery;
- final implementation scope/pricing depends on audit/SOW;
- contact information is stored only after explicit contact consent;
- sensitive patient/client/candidate/claim/password/card information should not be submitted through the public form.

## 3. Capture contract — VERIFIED
The lead endpoint stores only after the persistence destination acknowledges durable success.

Server/destination contract includes:
- timestamp/source;
- name + normalized WhatsApp;
- company/business;
- selected industry/service/package context;
- currency + estimator assumptions;
- server-recomputed estimator output;
- contact-consent status/time/version;
- minimized page/referrer;
- allowlisted UTM source/medium/campaign;
- server-generated lead ID + idempotency key.

Browser-supplied calculated output is not authoritative.

## 4. Failure behavior — VERIFIED
If persistence fails:
- no false `request saved` state;
- explicit failure returned;
- booking/WhatsApp alternatives remain available;
- non-sensitive failure diagnostics may be emitted;
- sales reporting does not count a lead that was not durably stored.

A real forced destination-verifier failure was tested: Vercel returned `502 lead_persistence_failed` and no extra database row was created. Destination was restored and successful persistence retested.

## 5. Release checklist
- [x] estimator formula and assumptions visible/editable;
- [x] unsupported recovery/breakeven promises removed;
- [x] explicit consent checkbox;
- [x] honeypot;
- [x] server input bounds + WhatsApp normalization;
- [x] server recomputes estimator values;
- [x] failed persistence fails closed;
- [x] automated client/server safety tests;
- [x] booking/WhatsApp fallbacks;
- [x] dedicated Shalcon Supabase destination deployed;
- [x] RLS/browser-role access restrictions verified;
- [x] successful real Vercel→Supabase persistence test recorded;
- [x] exact replay/conflicting replay behavior verified;
- [x] forced real destination failure test recorded;
- [x] destination restored/retested;
- [x] synthetic QA rows removed;
- [x] dedicated Shalcon Vercel deployment verified;
- [x] live staging noindex protection verified;
- [x] live homepage/privacy/terms and `/api/lead` method smoke verified.

## 6. Current promotion gate
Lead magnet/persistence itself is **LIVE AND VERIFIED IN STAGING**.

Do not confuse this with full public/paid launch approval. Broad public/paid acquisition still waits for:
- owner/legal review;
- payment/bank/accounting readiness;
- final production domain ownership/cutover;
- final webhook credential rotation;
- final cross-browser/domain/API QA;
- deliberate removal of staging Authentication/noindex.

Controlled founder-led outreach is a separate gate and currently waits on the approved Shalcon sender + explicit owner send authorization.

## 7. Safe inbound content angles
Use:
- `Map the cost-sensitive steps in your inquiry workflow.`
- `Estimate the value attached to delayed follow-up using your own assumptions.`
- `See which part of intake, routing or follow-up is worth automating first.`

Avoid:
- `See exactly how much money you are losing.`
- `Recover X% with AI.`
- `Guaranteed ROI.`
- fake benchmark urgency.

## 8. Foundation 13 status
Foundation 13 is **VERIFIED / STAGING-LIVE**. Estimator, safe capture boundary, durable persistence, failure behavior and deployment are proven.

Remaining release blockers are broader business/public-release gates—not missing lead-magnet infrastructure.
