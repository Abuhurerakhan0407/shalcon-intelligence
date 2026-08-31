# Shalcon Intelligence — Payment Collection Setup

Status date: 31 Aug 2026
Owner: Abu Hurera Khan
Business type: Sole proprietorship trading as Shalcon Intelligence
GST status supplied by proprietor: Not registered

This is an operational setup checklist, not tax/legal/accounting advice. Confirm invoice/tax treatment with an accountant before the first paid client invoice.

## 0. Current payment-readiness state
- **UDYAM/MSME: owner-reported obtained on 31 Aug 2026.**
- The certificate itself has not been stored in this public repository and has not been independently verified here. Keep certificate number/PAN/Aadhaar/QR/KYC data private.
- Business-proof availability is no longer the known blocker it was earlier.
- **Invoice/payment ledger: ACTIVE and empty, ready for first real invoice.**
- Remaining payment gate: Razorpay KYC/Live activation + settlement-bank verification + accountant/tax presentation + first real Payment Link/settlement reconciliation.

### Live finance ledger
Native Google Sheet: **Shalcon Intelligence — Invoice & Payment Ledger**  
Spreadsheet ID: `1LWV_P9z2bNehYfcz4ieIgncRhY2UvswjmpQaR-XX7lg`

Verified after import:
- India timezone;
- frozen working headers;
- native invoice table;
- currency/status/payment-method validation;
- invoiced/collected/outstanding summary formulas;
- milestone setup values for the approved Healthcare baseline;
- no fake invoice rows.

Current working next invoice number: `SI-2026-0001`, subject to accountant confirmation before first issuance.

## 1. Recommended launch payment stack

**Primary collection method: Razorpay Payment Links.**

Reason:
- no custom checkout build is required for first clients;
- payment links can be created from the Razorpay Dashboard;
- each client/payment can have a unique amount, reference and expiry;
- it is simpler to reconcile against the signed SOW and invoice than adding checkout code before there is sales volume.

Do not build a website payment button or subscription billing flow until actual sales volume justifies it.

## 2. Razorpay 2026 onboarding facts checked from official docs

Official Razorpay documentation rechecked on 31 Aug 2026 says:
- Sole Proprietorship is a supported business type.
- Razorpay currently uses CKYC as a fast-track onboarding route where records are available; if identity verification cannot complete through the available route, the live Dashboard may request additional verification such as DigiLocker/manual ID/Video KYC depending on account classification.
- If there is no GSTIN, current Razorpay setup material provides an “I don't have a GSTIN” path.
- Bank details are required for settlements and the account must be KYC approved/fully activated before Razorpay settles customer payments.
- Razorpay may request additional business/category documents or clarifications during review; the live Dashboard request controls.
- Payment Links can be created and managed from the Dashboard without building a website checkout.

Official sources:
- https://razorpay.com/docs/payments/set-up/?preferred-country=IN
- https://razorpay.com/docs/payments/business-types-kyc-documents/?preferred-country=IN
- https://razorpay.com/docs/payments/faqs/?preferred-country=IN
- https://razorpay.com/docs/payments/payment-links/
- https://razorpay.com/docs/payments/settlements/?preferred-country=IN

Do not rely on a stale static checklist when the live Razorpay Dashboard asks for different/additional documents.

## 3. Owner KYC packet to prepare

### Identity
- [ ] Abu Hurera Khan PAN available privately
- [ ] Aadhaar/authorised-signatory identity route available privately where requested
- [ ] Mobile/OTP/CKYC or alternate verification route available as requested by Razorpay

### Business proof
Because Shalcon is being treated as a sole proprietorship and the proprietor states no GST registration:
- [x] UDYAM/MSME certificate — **owner reports obtained 31 Aug 2026**
- [ ] Keep the current certificate file available privately for upload if Razorpay asks for it
- [ ] Keep any additional business/address document requested by the live Dashboard available privately

Do not commit or paste the MSME certificate, PAN, Aadhaar, bank proof, OTP or KYC screenshots into the public GitHub repository.

Do not misclassify the business merely to bypass proprietorship document checks; use the classification that accurately represents Shalcon.

### Bank / settlement
- [ ] Settlement bank account selected
- [ ] Account number + IFSC available privately
- [ ] Account-holder/name compatibility checked against Razorpay onboarding
- [ ] Cancelled cheque/bank proof available privately if automated verification fails

## 4. Account setup sequence

1. Create/sign in to Razorpay using owner-controlled email/mobile.
2. Choose the business type that accurately represents Shalcon's sole-proprietorship setup.
3. Enter proprietor identity/PAN details privately.
4. Enter brand/trading name `Shalcon Intelligence`.
5. Enter business address/details matching the supporting documents.
6. Select `I don't have a GSTIN` if the live form asks for GSTIN and that remains true.
7. Upload the UDYAM/MSME certificate when the live Dashboard accepts/requests it as business proof.
8. Complete CKYC / Aadhaar / DigiLocker / Video KYC or other requested verification.
9. Add settlement bank details and complete bank verification.
10. Complete any additional ownership/authorised-signatory declaration requested by the live Dashboard.
11. Resolve Dashboard clarification requests, if any.
12. Submit for activation.
13. Do not treat Test mode as permission to collect real money; wait for Live activation.
14. Once Live mode is active, verify that a Payment Link can be created with an exact amount/reference and that payment/settlement status can be reconciled.

## 5. First-client collection process

For the approved Healthcare Pilot default:
- Total setup: ₹39,000
- Milestone 1: 50% = **₹19,500** at signature/start
- Milestone 2: 30% = **₹11,700** when staging is ready for agreed UAT
- Milestone 3: 20% = **₹7,800** on production acceptance
- Ongoing managed optimization/support: **₹9,000/month**, billed in advance after the included stabilization period

Third-party/API/message/call/vendor charges are client-paid or separately itemized.

For every payment:
1. signed proposal/SOW or written acceptance exists;
2. issue the invoice/payment request with a unique invoice/reference number;
3. create/update the real invoice row in the native finance ledger;
4. create Razorpay Payment Link for the exact due milestone;
5. include client name + project + invoice/reference in the Payment Link description/reference;
6. when paid, record payment ID/reference, paid date, amount/status;
7. send receipt/paid confirmation;
8. reconcile against bank settlement and record settlement date.

Do not create a fake/test client invoice merely to make the ledger look used.

## 6. Invoice numbering

Current working sequential scheme:

`SI-2026-0001`
`SI-2026-0002`
`SI-2026-0003`

Rules:
- confirm the convention with the accountant before first issuance;
- after issuance begins, never reuse an invoice number;
- cancelled invoices remain in the ledger with status `Cancelled` rather than disappearing;
- payment links use the same invoice/reference number where possible;
- the native finance ledger is the operational record for invoice/payment/settlement status.

## 7. GST / tax guard

The proprietor currently states Shalcon is **not GST registered**.

Operational rule until accountant/legal confirmation:
- do not add or collect a GST component as if Shalcon has a GSTIN;
- do not invent a GSTIN;
- do not label a document as containing collected GST if none is lawfully being collected;
- use the invoice template in `docs/INVOICE_TEMPLATE.md` and have the accounting treatment reviewed before the first paid invoice.

If GST registration status changes, update all invoice/payment/legal templates before the next invoice.

## 8. Security rules

- Never put Razorpay API keys in GitHub, email drafts, screenshots or client docs.
- Use Dashboard Payment Links first; API keys are unnecessary for the initial manual collection workflow.
- Enable account MFA/2FA where available.
- Keep MSME/PAN/Aadhaar/bank/KYC documents out of this public repository and finance ledger.
- Treat identity/bank details as owner-controlled private material.
- Do not ask a client to send card details directly to Shalcon.

## 9. Launch gate definition

Payment readiness becomes PASS when:
- Razorpay Live mode is activated or an explicitly approved alternative collection method is ready;
- settlement bank account is verified;
- accountant/tax presentation has been confirmed for the current non-GST-registered state;
- invoice numbering/ledger is active;
- a real Payment Link/invoice flow can be reconciled through payment and settlement without exposing secrets.

Current checklist:
- [x] MSME/business proof available at owner-report level
- [x] Invoice template prepared
- [x] Native invoice/payment ledger active
- [ ] Razorpay KYC/Live activation
- [ ] Settlement bank verified
- [ ] Accountant/tax presentation confirmed
- [ ] First real Payment Link/payment/settlement reconciliation verified

**Current status: IN PROGRESS.** The remaining items are owner/account/provider-dependent, not missing internal infrastructure.