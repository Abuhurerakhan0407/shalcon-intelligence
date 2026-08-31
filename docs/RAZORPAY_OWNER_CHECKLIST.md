# Shalcon Intelligence — Razorpay Owner Checklist

Status date: 31 Aug 2026
Purpose: reduce the remaining payment setup to the minimum owner-controlled actions. Do not put PAN, Aadhaar, bank numbers, OTPs, MSME certificate contents or KYC screenshots in GitHub/chat.

## Current state
- [x] Sole proprietorship operating model recorded.
- [x] Trading name: Shalcon Intelligence.
- [x] Owner reports UDYAM/MSME obtained on 31 Aug 2026.
- [x] Healthcare pricing + 50/30/20 payment milestones approved.
- [x] Invoice template and Payment Link operating flow prepared.
- [ ] Razorpay account KYC submitted/approved.
- [ ] Live payments activated.
- [ ] Settlement bank verified.
- [ ] Accountant confirms invoice/tax presentation while GST-unregistered.
- [ ] First Payment Link + ledger/reconciliation flow verified.

## Abu's private actions
Perform these only in Razorpay/accounting interfaces you trust. Do not send the sensitive values back to ChatGPT.

1. Sign in/create Razorpay with owner-controlled email/mobile.
2. Select the business classification that accurately represents Shalcon as a sole proprietorship.
3. Complete proprietor identity/KYC using the live flow.
4. Where requested, use the private UDYAM/MSME certificate as business proof.
5. If the live flow asks for GSTIN and the proprietor remains unregistered, use the available no-GSTIN route rather than inventing a GSTIN.
6. Complete any additional business/address/authorised-signatory document request shown by Razorpay.
7. Add the intended settlement bank account and complete verification.
8. Resolve any Dashboard clarification request.
9. Wait for Live activation.
10. Confirm with an accountant how the first non-GST invoice should be presented and what records Shalcon should retain.

## What to report back to ChatGPT
Only non-sensitive status is needed:

`RAZORPAY: LIVE / BANK VERIFIED / ACCOUNTING CONFIRMED`

or tell which status is still pending. Do not paste identifiers, account numbers, PAN/Aadhaar, OTPs, certificate numbers or screenshots containing them.

## What ChatGPT does after PASS
- verify invoice numbering/ledger controls;
- prepare the exact first-client payment request for the signed milestone;
- ensure Payment Link description/reference matches invoice/SOW;
- keep API keys unnecessary for initial manual collection;
- reconcile launch gate and proceed to the next owner gate.

## Sources
Current Razorpay official docs were rechecked on 31 Aug 2026:
- account setup/KYC;
- Payment Links;
- settlements.

The live Razorpay Dashboard controls if it requests different/additional documents.