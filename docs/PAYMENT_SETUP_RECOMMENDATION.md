# Shalcon Intelligence — Payment Setup Recommendation

Research baseline: 29 Aug 2026  
Reconciled: 31 Aug 2026  
Status: operating recommendation; KYC/bank/accounting actions remain owner-controlled.

## Locked business facts
- Contracting party: Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.
- Billing/notices email: `shalconintelligence@gmail.com`.
- GST status supplied by proprietor: Not registered.
- Standard Healthcare Pilot: **₹39,000 setup + ₹9,000/month** managed optimization/support after stabilization.
- Implementation milestones: **50% / 30% / 20%**.
- Third-party usage/vendor charges: client-paid or separately itemized.

These are no longer pending identity/pricing decisions.

## Recommended first-client payment stack
Do not make Stripe or custom checkout a launch dependency.

Use:
1. written proposal/SOW + sequential invoice/reference;
2. Razorpay Payment Link as preferred online collection method once Live activation is ready;
3. verified bank transfer as an approved alternative where appropriate;
4. recurring/subscription automation only after actual payment volume makes it useful.

Do not build website checkout/subscription code before there is enough real sales volume to justify the complexity.

## Standard Healthcare implementation collection
For ₹39,000 setup:
- 50% start: **₹19,500**;
- 30% staging/UAT-ready: **₹11,700**;
- 20% production acceptance: **₹7,800**.

Managed optimization/support: **₹9,000/month**, billed in advance after the included stabilization period unless the signed SOW changes it.

## Invoice/payment request fields
Each request should identify:
- invoice/reference number;
- client legal/business name;
- Shalcon contracting identity;
- project/SOW reference;
- milestone;
- amount/currency;
- current tax treatment confirmed for the business;
- due date;
- payment method/reference;
- verified payment/settlement status.

Do not mark a milestone paid from a screenshot alone when provider/bank status can be verified.

## Provider/KYC rule
Razorpay supports sole-proprietorship onboarding, but the live Dashboard controls current KYC/business-document/bank/declaration requirements.

Do not assume an exemption from a requested ownership/authorised-signatory declaration. Do not misclassify the business merely to bypass documentation.

Keep PAN, Aadhaar, bank proof, KYC screenshots and payment-provider secrets outside this public repository.

## UDYAM
**Paused by owner instruction.** Do not continue, infer or mark UDYAM status until Abu provides his update.

## Vendor/usage fees
Default rule:
- Meta/WhatsApp → client account where practical;
- telephony/minutes → client account where practical;
- model/API usage → client account or explicit allowance/overage;
- CRM/automation/database/hosting → client account where practical or clearly itemized;
- no hidden markup unless the signed proposal explicitly states a managed/bundled charge.

## Owner-controlled remaining actions
- complete Razorpay/business-proof/KYC flow when ready;
- verify settlement bank;
- confirm accountant/tax/invoice presentation while GST-unregistered;
- define who can issue/refund/verify payments operationally.

## ChatGPT-owned after activation
- verify Payment Link capability without exposing KYC/secrets;
- prepare exact first-milestone collection flow using the invoice reference;
- record/reconcile payment ID, paid date, amount and settlement;
- update payment readiness in `docs/LAUNCH_GATE.md`.
