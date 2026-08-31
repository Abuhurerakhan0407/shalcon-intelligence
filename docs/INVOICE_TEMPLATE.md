# Shalcon Intelligence — Commercial Invoice Template

> Working operational template. Current proprietor-supplied status on 31 Aug 2026: **Not registered for GST**. CBIC guidance rechecked 31 Aug 2026 confirms that an unregistered supplier cannot issue a GST tax invoice or collect GST; an ordinary commercial invoice may be used. Accountant confirmation is still required before first paid use for numbering, TDS/income-tax handling and recordkeeping. MSME/UDYAM is owner-reported obtained, but certificate number/QR/PAN-linked details remain private unless a legitimate accounting/client requirement is confirmed.

## Seller
**Abu Hurera Khan**  
Sole proprietor trading as **Shalcon Intelligence**  
Rm 2, Mahavir Bldg, Opp. P&T Colony, Near Shri Kumar Society, Vakola, Santacruz East, Mumbai 400055, Maharashtra, India  
Email: shalconintelligence@gmail.com  
GST status: **Not registered**

---

# COMMERCIAL INVOICE

> **Non-GST-registered supplier. This is not a GST tax invoice. No GST is charged or collected.** If Shalcon later becomes GST-registered, the invoice process must be updated before issuing the next invoice.

**Invoice No.:** SI-2026-[####]  
**Invoice Date:** [DD MMM YYYY]  
**Due Date:** [DD MMM YYYY]  
**Project / SOW:** [PROJECT NAME / SOW REFERENCE]  
**Payment milestone:** [50% Start / 30% UAT-ready / 20% Production acceptance / Monthly support / Other]

Current ledger seed: `SI-2026-0001`. Confirm the numbering convention with the accountant before issuing the first paid invoice; once issuance begins, never silently reuse or renumber issued/cancelled invoice numbers.

## Bill To
**Client legal name:** [CLIENT LEGAL NAME]  
**Contact:** [NAME / ROLE]  
**Billing address:** [ADDRESS]  
**Email:** [EMAIL]  
**Client GSTIN (if they provide one for their records):** [GSTIN / N/A]

## Charges

| Description | Qty | Unit Price | Amount |
|---|---:|---:|---:|
| [Healthcare AI Front Desk + Lead Operations Pilot — milestone] | 1 | ₹[ ] | ₹[ ] |
| [Optional separately approved item] | [ ] | ₹[ ] | ₹[ ] |

**Subtotal:** ₹[ ]  
**GST:** **₹0 — not charged; supplier currently not GST-registered**  
**Total due:** **₹[ ]**

## Approved Healthcare Pilot milestone reference
For the owner-approved ₹39,000 setup:
- 50% start: **₹19,500**
- 30% staging/UAT-ready: **₹11,700**
- 20% production acceptance: **₹7,800**

Managed optimization/support after stabilization: **₹9,000/month**, billed in advance unless the signed proposal states otherwise.

Third-party/API/message/call/vendor costs are client-paid or separately itemized.

## Payment
**Payment method:** Razorpay Payment Link / Bank transfer / [OTHER APPROVED METHOD]  
**Payment link/reference:** [LINK OR REFERENCE — do not place API secrets here]  
**Razorpay payment ID after payment:** [ ]  
**Paid date:** [ ]  
**Status:** DRAFT / ISSUED / PARTIALLY PAID / PAID / CANCELLED

Operational overdue status may be derived in the finance ledger from the due date; it does not need to replace the actual invoice status.

## Notes
- This invoice relates to the written proposal/SOW referenced above.
- Business outcomes such as revenue, conversion or appointment volume are not guaranteed unless separately written and approved in the signed agreement.
- Third-party usage charges are excluded unless expressly listed above.
- No GST amount is included or collected while Shalcon remains unregistered.
- Do not label this document a GST tax invoice or include a supplier GSTIN while none exists.
- Do not expose private MSME/PAN/Aadhaar/bank/KYC identifiers merely because they exist; include only identifiers an accountant/legal requirement says belong on the invoice.
- Accountant review remains required before first paid use, including numbering convention, income-tax/TDS handling where relevant, and record retention.

## Authorized by
**Abu Hurera Khan**  
Founder  
Sole proprietor trading as Shalcon Intelligence

---

## Internal ledger — source of truth for collection status
Native Google Sheet: **Shalcon Intelligence — Invoice & Payment Ledger**  
Spreadsheet ID: `1LWV_P9z2bNehYfcz4ieIgncRhY2UvswjmpQaR-XX7lg`

After a real invoice is issued, record at minimum:
- Invoice number;
- Client;
- Project/SOW reference;
- Issue date;
- Due date;
- Currency/amount;
- Status;
- Payment method/reference;
- Paid date;
- Settlement date;
- concise notes.

Do not create fake prospect invoice rows and do not store secrets/KYC material in the ledger.