# Shalcon Intelligence — Payment Collection Setup

Status date: 30 Aug 2026
Owner: Abu Hurera Khan
Business type: Sole proprietorship trading as Shalcon Intelligence
GST status supplied by proprietor: Not registered

This is an operational setup checklist, not tax/legal/accounting advice. Confirm invoice/tax treatment with an accountant before the first paid client invoice.

## 1. Recommended launch payment stack

**Primary collection method: Razorpay Payment Links.**

Reason:
- no custom checkout build is required for first clients;
- payment links can be created from the Razorpay Dashboard;
- each client/payment can have a unique amount, reference and expiry;
- it is simpler to reconcile against the signed SOW and invoice than adding checkout code before there is sales volume.

Do not build a website payment button or subscription billing flow until actual sales volume justifies it.

## 2. Razorpay 2026 onboarding facts checked from official docs

Official Razorpay documentation checked on 30 Aug 2026 says:
- Sole Proprietorship is a supported business type.
- For Individuals/Proprietorships, CKYC lookup can use the proprietor's Personal PAN + mobile OTP.
- If CKYC is unavailable, traditional identity verification / DigiLocker / manual ID and Video KYC may be required.
- Razorpay's current registered-business document flow asks for at least one required business document plus one additional document.
- Required business documents shown in the current setup flow: GST certificate OR MSME (UDYAM) Certificate.
- If there is no GSTIN, the setup flow provides an “I don't have a GSTIN” option.
- Additional document choices shown: Shop Establishment Certificate, Import Export Certificate (IEC), or Mobile Postpaid Bill.
- Bank details are required for settlements; Razorpay may use a ₹1 verification deposit and can request bank proof if verification fails.
- For sole proprietorship, UBO declaration is not required because the owner is the merchant.

Official sources:
- https://razorpay.com/docs/payments/set-up/?preferred-country=IN
- https://razorpay.com/docs/payments/business-types-kyc-documents/?preferred-country=IN
- https://razorpay.com/docs/payments/faqs/?preferred-country=IN
- https://razorpay.com/docs/payments/payment-links/

Razorpay may request additional documents depending on category/risk/review. The Dashboard's current request controls.

## 3. Owner KYC packet to prepare

### Identity
- [ ] Abu Hurera Khan PAN available
- [ ] Aadhaar available and mobile number linked where possible
- [ ] CKYC mobile OTP route available, or be ready for DigiLocker/Video KYC

### Business proof
Because Shalcon is being treated as a sole proprietorship and the proprietor states no GST registration:
- [ ] UDYAM/MSME certificate available **OR obtain/confirm another Razorpay-accepted required business document if Dashboard permits**
- [ ] One current additional document available: Shop Establishment Certificate / IEC / Mobile Postpaid Bill as accepted by the live Razorpay flow

Do not misclassify the business as “Individual/Unregistered” merely to bypass proprietorship document checks without confirming that classification is accurate for the business/accounting setup.

### Bank / settlement
- [ ] Settlement bank account selected
- [ ] Account number + IFSC available
- [ ] Account holder/name compatibility checked against Razorpay onboarding
- [ ] Cancelled cheque or branch-manager proof available if automated bank verification fails

## 4. Account setup sequence

1. Create/sign in to Razorpay using the owner-controlled email/mobile.
2. Choose the business type that accurately represents Shalcon's sole-proprietorship setup.
3. Enter proprietor identity/PAN details.
4. Enter brand name `Shalcon Intelligence`.
5. Enter business address/details matching the supporting documents.
6. Select `I don't have a GSTIN` if the live form asks for GSTIN and that remains true.
7. Upload the required business proof(s) requested by the Dashboard.
8. Complete CKYC / Aadhaar / DigiLocker / Video KYC as requested.
9. Add settlement bank details and complete bank verification.
10. Submit for activation.
11. Do not treat Test mode as permission to collect real money; wait for Live activation.
12. Once Live mode is active, create a small internal/test-safe Payment Link only if Razorpay permits a genuine controlled test; otherwise use the first real client invoice/payment after signed approval.

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
3. create Razorpay Payment Link for the exact due milestone;
4. include client name + project + invoice/reference in the Payment Link description/reference;
5. record link creation date, due date and status;
6. when paid, record Razorpay payment ID, paid date and amount;
7. send receipt/paid confirmation;
8. reconcile against bank settlement and invoice ledger.

## 6. Invoice numbering recommendation

Use a simple sequential scheme:

`SI-2026-0001`
`SI-2026-0002`
`SI-2026-0003`

Rules:
- never reuse an invoice number;
- cancelled invoices remain in the ledger with status `CANCELLED` rather than disappearing;
- payment links use the same invoice/reference number where possible;
- maintain one ledger containing invoice number, client, date, amount, status, payment ID and settlement date.

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
- Keep bank/KYC documents out of this public repository.
- Treat PAN/Aadhaar/bank details as owner-controlled private material.
- Do not ask a client to send card details directly to Shalcon.

## 9. Launch gate definition

Payment readiness becomes PASS when:
- Razorpay Live mode is activated or an explicitly approved alternative collection method is ready;
- settlement bank account is verified;
- accountant/tax presentation has been confirmed for the current non-GST-registered state;
- invoice numbering/ledger is active;
- a Payment Link can be created and reconciled without exposing secrets.
