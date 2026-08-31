# Shalcon Intelligence — Financial Control

Status date: 31 Aug 2026

Purpose: prevent Shalcon from pricing work without understanding delivery cost, support burden and cash exposure.

This is an internal operating model, not accounting or tax advice. Final invoicing, GST/tax and bookkeeping treatment follow the owner/accountant setup.

## 0. Live finance ledger
Native Google Sheet: **Shalcon Intelligence — Invoice & Payment Ledger**  
Spreadsheet ID: `1LWV_P9z2bNehYfcz4ieIgncRhY2UvswjmpQaR-XX7lg`

Operating rules:
- create a ledger row only when a real invoice is actually issued or formally prepared for issuance;
- do not create fake/example client rows;
- current next working invoice number is `SI-2026-0001`, subject to accountant confirmation before first paid use;
- keep PAN, Aadhaar, MSME certificate fields, bank account details, OTPs, API secrets and client card data out of the ledger;
- invoice/payment references may be stored; secrets may not;
- cancelled invoice numbers remain recorded as cancelled and are not silently reused.

The ledger currently has no real invoice rows. Its formulas, dropdowns, India timezone, frozen headers and payment-summary structure were verified after native Google Sheets import.

## 1. Current approved Healthcare baseline
For the standard bounded Healthcare Pilot:
- implementation/setup: **₹39,000**;
- managed optimization/support: **₹9,000/month** after included stabilization;
- implementation collection: **50% / 30% / 20%**;
- third-party/API/message/call/vendor usage: client-paid or separately itemized.

Internal minimum commercial floors and margin controls are internal-only. Never expose them in client-facing SOW/proposals.

Other vertical/custom pricing is scoped after audit unless owner later approves a separate default.

## 2. Minimum record per opportunity/project
### Commercial
- client;
- proposal date/reference;
- implementation fee;
- recurring support fee;
- currency;
- payment schedule;
- third-party fees included vs client-paid;
- discount/exception and reason;
- expected project start/go-live.

### Delivery cost assumptions
- founder hours — discovery/scoping;
- founder hours — build/integration;
- founder hours — QA/UAT;
- founder hours — training/handover;
- expected monthly support hours;
- contractor cost, if any;
- model/API usage paid by Shalcon;
- automation platform cost paid by Shalcon;
- telephony/messaging cost paid by Shalcon;
- hosting/database cost paid by Shalcon;
- other project-specific cost.

## 3. Internal cost basis
Set an internal hourly cost/value for founder delivery time. It is not the selling rate.

`internal delivery cost = founder hours × internal hourly cost + contractor cost + Shalcon-paid third-party costs`

Use it to expose apparently profitable projects that hide excessive labour.

## 4. Contribution view
### Implementation contribution
Implementation fee collected
− direct implementation labour cost
− contractor cost
− implementation-specific vendor cost
− refunds/credits
= implementation contribution

### Monthly contribution
Monthly support fee
− support labour cost
− Shalcon-paid recurring vendor/API cost
= monthly contribution

Track amount and percentage. Do not label gross revenue as profit.

## 5. Proposal guardrails
Before a final proposal:
- scope bounded enough to estimate effort;
- vendor/usage payer explicit;
- support scope defined/capped;
- change requests outside fixed scope;
- payment schedule protects delivery cash flow;
- one extra QA/fix cycle does not make project uneconomic;
- discount tied to a real scope/commercial trade-off;
- internal floor/margin notes absent from client-facing export;
- refund/termination exposure understood.

If not, revise scope/price before sending.

## 6. Approved Healthcare payment logic
Standard Healthcare implementation:
- 50% at signature/start = **₹19,500**;
- 30% when staging is ready for agreed UAT = **₹11,700**;
- 20% on production acceptance = **₹7,800**.

Monthly managed support is billed in advance after included stabilization unless signed SOW changes it.

Do not begin material third-party spend before relevant client funds clear unless owner explicitly accepts the cash risk.

For non-standard work, payment schedule must be deliberately approved in the SOW rather than copied blindly.

## 7. Invoice / collection control
Before issuing an invoice:
1. signed SOW/written commercial acceptance exists;
2. milestone and exact amount are due under that agreement;
3. invoice number is unique and sequential under the accountant-approved convention;
4. supplier GST status and invoice wording are current;
5. client legal/billing details are verified;
6. the invoice contains no internal floor/margin notes;
7. a ledger row is created with issue/due dates and amount;
8. if Razorpay is used, Payment Link reference matches the invoice/project reference.

After payment:
- record payment reference/ID, paid date and amount/status;
- record settlement date when reconciled to bank;
- retain invoice/receipt/accounting records according to accountant/legal requirements;
- do not confuse Razorpay payment confirmation with bank settlement reconciliation.

## 8. Recurring support economics
Every recurring agreement must define:
- support window;
- optimization/revision allowance;
- incident severity handling;
- response target vs resolution expectation;
- excluded new workflows/integrations;
- usage/vendor costs;
- cancellation/renewal treatment.

Re-estimate after first 30–60 days using actual support time.

## 9. Weekly cash view
Track:
- bank cash available for agency operations;
- invoices issued;
- invoices due this week;
- overdue receivables;
- vendor/API commitments due;
- contractor payments;
- tax/accounting reserve per professional advice;
- net cash committed to active projects.

Unsigned proposals are not receivables.

## 10. Monthly agency view
Record:
- cash collected;
- implementation revenue;
- recurring revenue;
- direct delivery cost;
- recurring vendor cost;
- refunds/credits;
- contribution by client;
- founder delivery hours;
- unpaid invoices;
- sales spend;
- software/tool spend.

Purpose: identify bad economics early, not create vanity revenue charts.

## 11. Pricing review triggers
Reprice/rescope when patterns show:
- actual build hours exceed estimate by >25%;
- support hours exceed included allowance;
- vendor/API costs materially exceed assumption;
- client delays create repeated remobilization;
- integration instability creates ongoing manual work;
- change requests are absorbed without approval;
- every win requires discounting.

Inspect causes before changing prices from one anomalous project.

## 12. Deal approval checklist
- [ ] implementation amount filled;
- [ ] recurring amount filled where applicable;
- [ ] payment milestones filled;
- [ ] third-party costs assigned;
- [ ] estimated founder hours recorded;
- [ ] contractor/vendor costs recorded;
- [ ] support scope bounded;
- [ ] change-request rule included;
- [ ] refund/termination exposure understood;
- [ ] commercial exceptions highlighted internally;
- [ ] client export contains no internal margin/floor notes.

## 13. Payment-readiness boundary
Commercial logic, invoice template and native invoice/payment ledger are prepared.

**MSME/UDYAM:** owner reports obtained on 31 Aug 2026; business-proof availability is no longer the known blocker.

Actual paid-work collection readiness still requires:
- Razorpay Live activation (or an explicitly approved alternative collection path);
- settlement bank verification;
- accountant confirmation of invoice/tax presentation while Shalcon remains GST-unregistered;
- first real Payment Link/invoice/settlement reconciliation proof.

## 14. Maturity boundary
Financial-control process is **BASIC READY** for first proposals and pre-payment preparation. It becomes execution-proven only after real invoices, collections, settlements and project-cost actuals are recorded.