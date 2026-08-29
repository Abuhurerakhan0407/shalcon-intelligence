# Shalcon Intelligence — Payment Setup Recommendation

Research date: 29 Aug 2026
Status: implementation/business recommendation; account/KYC actions remain owner-controlled.

## Recommendation

For first Indian clients, do **not** make Stripe a launch dependency.

Use this order:
1. invoice + bank transfer / approved payment link for implementation milestones;
2. Razorpay for online collection where useful;
3. Razorpay Subscriptions only where the recurring amount/payment method fits the client's setup;
4. Stripe only if Shalcon obtains/has a suitable India account and the international use case justifies it.

## Why

Current official Razorpay documentation supports Subscriptions with reusable plans, automatic billing, Dashboard/API management and subscription links. Recurring methods include cards, UPI AutoPay and eMandate, subject to method-specific rules/limits.

Current official Stripe support still states that new Stripe accounts in India are invite-only. That makes Stripe an optional future route rather than a reliable launch prerequisite.

## Implementation-fee collection

The recommended 50/30/20 project milestone structure does not require a subscription system.

Each invoice/payment request should identify:
- client legal/business name;
- Shalcon legal/business name once finalized;
- project/SOW reference;
- milestone;
- amount/currency;
- applicable tax treatment according to accountant setup;
- due date;
- payment destination/method;
- payment confirmation/reference.

Do not mark a project milestone paid from a screenshot alone where the actual account status can be verified.

## Recurring support

Recommended V1 Healthcare managed support is proposed at ₹9,000/month pending owner approval.

At that level, Razorpay's current published recurring-method limitations should be checked at account setup and before choosing a specific AutoPay method. Razorpay currently documents cards/UPI recurring support up to ₹15,000 for the cited subscription settings, with eMandate also available for INR subscriptions; provider limits can change, so recheck at implementation time.

Do not hard-code payment-provider assumptions into client contracts. State the amount/due date; payment mechanism may change by mutual operational arrangement.

## Usage/vendor fees

Default commercial rule:
- Meta/WhatsApp fees → client account where practical;
- telephony/minutes → client account where practical;
- model/API usage → client account or explicit allowance/overage;
- CRM/automation/database/hosting → client account where practical or clearly itemized;
- no hidden markup unless the proposal explicitly states a managed/bundled charge.

This reduces Shalcon's cash exposure and makes offboarding cleaner.

## What ChatGPT can prepare

Already prepared:
- payment milestone language in proposal/SOW;
- commercial guardrails;
- recommended V1 pricing decision;
- vendor-cost ownership rules.

After the owner account/KYC path is chosen, implementation can add:
- payment instructions/template;
- payment-link process;
- subscription-plan setup where appropriate;
- invoice/paid-status workflow;
- internal payment-stage SOP.

## Owner-only blocker

The remaining work is not strategic design. It is account authority:
- choose/finalize business/legal identity;
- complete bank/payment-provider KYC/account setup;
- confirm tax/GST/invoicing treatment with accountant as applicable;
- approve who can issue/refund/verify payments.

No payment credential, bank detail or secret belongs in this public repository.
