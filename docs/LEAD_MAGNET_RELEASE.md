# Shalcon Intelligence — Lead Magnet Release

Primary inbound asset: **Opportunity-at-Risk Estimator + Free Automation Audit**.

The estimator is not a revenue-loss calculator and must not be marketed as proof that a visitor is losing or will recover a specific amount.

## 1. Visitor promise
A visitor can:
1. choose an industry starting preset;
2. replace assumptions with their own inquiry/conversion/value inputs;
3. see the mathematical opportunity-at-risk scenario;
4. understand the formula and limitations;
5. request a free workflow audit;
6. use WhatsApp or booking as a fallback/direct path.

## 2. Required trust language
The public experience must state:
- presets are starting assumptions, not benchmarks;
- output is a planning estimate;
- output is not guaranteed loss or recovery;
- final implementation scope/pricing depends on audit;
- contact information is stored only after explicit consent;
- sensitive client/patient/candidate/policy data should not be submitted through the public form.

## 3. Capture contract
The lead endpoint must store only after the persistence destination acknowledges success.

Required lead fields:
- timestamp;
- source;
- name;
- normalized WhatsApp number;
- company/business;
- selected industry;
- selected indicative package;
- currency;
- estimator assumptions;
- server-recomputed estimator output;
- contact-consent status/time/version;
- page path;
- UTM attribution fields where present;
- referrer path/origin without unnecessary query data.

Do not store browser-supplied calculated outputs as authoritative values.

## 4. Failure behavior
If persistence is missing or fails:
- do not show “request saved”;
- show an explicit failure state;
- keep booking/WhatsApp fallbacks available;
- emit the non-sensitive failure event for diagnostics;
- never mark the record as a lead in sales reporting unless it actually exists in the destination.

## 5. Release checklist
- [x] Estimator formula uses inquiry volume × delayed/missed rate × likely conversion × average conversion value.
- [x] Assumptions are editable and visibly disclosed.
- [x] Unsupported recovery/breakeven promises removed.
- [x] Consent checkbox exists.
- [x] Honeypot exists.
- [x] Server input bounds and WhatsApp normalization exist.
- [x] Server recomputes estimator values.
- [x] Failed persistence fails closed.
- [x] Automated safety tests cover client/server contract.
- [x] WhatsApp fallback exists.
- [x] Booking fallback exists.
- [ ] Dedicated durable Shalcon persistence destination configured.
- [ ] Successful real persistence test recorded.
- [ ] Forced real destination failure test recorded.
- [ ] Production/preview deployment verified end to end.

## 6. Promotion gate
The estimator can be shown as a demo/planning tool before persistence is live, but do not drive paid traffic or depend on the form for lead acquisition until the four unchecked release items above are complete.

Controlled founder-led outbound may still use the booking/WhatsApp paths while the lead-form infrastructure is being finalized, provided the recipient has a clear working contact path.

## 7. Inbound content angles
Safe angles:
- “Map the cost-sensitive steps in your inquiry workflow.”
- “Estimate the value attached to delayed follow-up using your own assumptions.”
- “See which part of intake, routing or follow-up is worth automating first.”

Avoid:
- “See exactly how much money you are losing.”
- “Recover X% with AI.”
- “Guaranteed ROI.”
- fake benchmark-based urgency.

## 8. Foundation 13 status
Foundation 13 is **IMPLEMENTED BUT RELEASE-BLOCKED**: the lead magnet and safe capture boundary exist; durable production persistence and deployed end-to-end verification are still required before it is considered fully live.
