# Shalcon Intelligence — Lead Capture Setup

## Current behavior
The website submits audit requests to `/api/lead`.

The server endpoint only returns success after the configured persistence destination returns a successful HTTP response. If persistence is unavailable or misconfigured, the visitor sees an explicit failure and is offered direct WhatsApp / calendar paths. The website must never display a false “saved” confirmation.

## Required production environment variable
`LEAD_WEBHOOK_URL`

This must be a server-side HTTPS endpoint that accepts JSON POST requests. Never expose its secret/token in frontend code.

## Payload
- source
- createdAt
- name
- whatsapp
- company
- industry
- packageName
- currency
- inquiries
- missPercent
- avgTxn
- estimatedDailyLoss
- estimatedMonthlyLoss
- estimatedYearlyLoss
- page
- referrer

The estimator values are user-adjusted planning assumptions and must not be stored or described as verified financial loss.

## Destination requirements
The final destination must:
1. persist the request durably;
2. return non-2xx on failure;
3. timestamp the record;
4. preserve source/attribution fields;
5. restrict access to authorized Shalcon operators;
6. support deletion/correction workflows;
7. avoid collecting unnecessary sensitive data;
8. provide a clear way to record contact opt-out.

## Production verification
Before launch:
1. submit a synthetic test lead;
2. confirm it exists in the destination;
3. verify the UI shows success only after persistence;
4. force destination failure and verify the UI does NOT show success;
5. confirm WhatsApp and booking fallbacks work;
6. confirm no secret appears in browser source/network configuration;
7. document retention and access policy.

## Current launch status
BLOCKED until a dedicated Shalcon persistence destination is configured and tested.

Do not point this at another product's production database merely because it already exists.
