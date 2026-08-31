# Shalcon Intelligence — Payment Setup Recommendation

Research baseline: 29 Aug 2026  
Reconciled: 31 Aug 2026  
Status: operating recommendation; KYC/bank/accounting actions remain owner-controlled.

## Locked business facts
- Contracting party: Abu Hurera Khan, sole proprietor trading as Shalcon Intelligence.
- Billing/notices email: `shalconintelligence@gmail.com`.
- GST status supplied by proprietor: Not registered.
- **MSME/UDYAM: owner reports obtained 31 Aug 2026.**
- Standard Healthcare Pilot: **₹39,000 setup + ₹9,000/month** managed optimization/support after stabilization.
- Implementation milestones: **50% / 30% / 20%**.
- Third-party usage/vendor charges: client-paid or separately itemized.

These are no longer pending identity/pricing/business-proof decisions. Exact MSME certificate fields remain private and are not independently verified in this repo.

## Recommended first-client payment stack
Do not make Stripe or custom checkout a launch dependency.

Use:
1. written proposal/SOW + sequential invoice/reference;
2. Razorpay Payment Link as preferred online collection method once Live activation is ready;
3. verified bank transfer as an approved alternative where appropriate;
4. native **Shalcon Intelligence — Invoice & Payment Ledger** as collection/settlement record;
5. recurring/subscription automation only after actual payment volume makes it useful.

Do not build website checkout/subscription code before real sales volume justifies the complexity.

## Standard Healthcare implementation collection
For ₹39,000 setup:
- 50% start: **₹19,500**;
- 30% staging/UAT-ready: **₹11,700**;
- 20% production acceptance: **₹7,800**.

Managed optimization/support: **₹9,000/month**, billed in advance after included stabilization unless the signed SOW changes it.

## Invoice/payment record
Native ledger spreadsheet ID: `1LWV_P9z2bNehYfcz4ieIgncRhY2UvswjmpQaR-XX7lg`.

Current working next invoice seed: `SI-2026-0001`, subject to accountant confirmation before first issuance.

Each real request should identify:
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

Do not create fake invoice rows. Do not mark a milestone paid from a screenshot alone when provider/bank status can be verified.

## Provider/KYC rule
Razorpay supports sole-proprietorship onboarding, but the live Dashboard controls current KYC/business-document/bank/declaration requirements.

Use the owner-controlled MSME certificate where legitimately requested by the live onboarding flow. Do not paste certificate number/QR/PAN/Aadhaar/bank details into this repository or chat.

Do not assume an exemption from a requested ownership/authorised-signatory declaration. Do not misclassify the business merely to bypass documentation.

## Vendor/usage fees
Default rule:
- Meta/WhatsApp → client account where practical;
- telephony/minutes → client account where practical;
- model/API usage → client account or explicit allowance/overage;
- CRM/automation/database/hosting → client account where practical or clearly itemized;
- no hidden markup unless the signed proposal explicitly states a managed/bundled charge.

## Owner-controlled remaining actions
- complete Razorpay KYC + Live activation;
- verify settlement bank;
- confirm accountant/tax/invoice presentation while GST-unregistered.

## ChatGPT-owned after activation
- verify Payment Link capability without exposing KYC/secrets;
- prepare exact first-milestone collection flow using the invoice reference;
- record/reconcile payment ID, paid date, amount and settlement in the native ledger;
- update payment readiness in `docs/LAUNCH_GATE.md`.
