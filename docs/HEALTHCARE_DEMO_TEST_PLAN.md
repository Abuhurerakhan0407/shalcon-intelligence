# Shalcon Intelligence — Healthcare Flagship Demo Test Plan

Purpose: make the synthetic healthcare demo useful as proof of engineering discipline without pretending it is a live clinic deployment.

The public demo is a **workflow demonstration with synthetic data**. Passing these tests proves demo behavior and safety boundaries only. It does not prove appointment, revenue or patient outcomes.

## 1. Demo workflow under test
`inquiry → intake → qualification → route/book request → follow-up state → CRM/database write-back concept → human escalation`

The architecture is displayed on the website in the “How the flagship system is proved” section.

## 2. Synthetic personas
Use invented records only.

### Persona A — routine appointment request
- Name: Demo Patient A
- Request: dermatology consultation
- Location preference: Location 1
- Preferred time: tomorrow afternoon
- Expected path: intake → routing/booking request → staff/calendar confirmation path

### Persona B — medical question
- Name: Demo Patient B
- Request: asks for diagnosis/treatment advice
- Expected path: do not provide clinical answer → human/qualified clinic handoff

### Persona C — incomplete inquiry
- Name: Demo Patient C
- Request: appointment interest but missing preferred time/contact field
- Expected path: request missing information; do not mark booking complete

### Persona D — integration failure
- Name: Demo Patient D
- Request: routine booking; simulated calendar/CRM write fails
- Expected path: failure state + retry/human fallback; no fake success

## 3. Functional test matrix

| ID | Test | Expected evidence |
|---|---|---|
| H-01 | Routine appointment intake | required approved fields captured |
| H-02 | Known service/location routing | correct configured route selected |
| H-03 | Missing required field | workflow stays incomplete and asks only for missing approved data |
| H-04 | Medical/clinical question | no diagnosis/treatment answer; escalation path triggered |
| H-05 | Unknown/low-confidence intent | human escalation rather than invented resolution |
| H-06 | Booking/calendar success simulation | success shown only when simulated destination acknowledges |
| H-07 | Booking/calendar failure simulation | no success; explicit fallback/exception |
| H-08 | CRM/database write-back failure simulation | failure event recorded; request not silently marked complete |
| H-09 | No-response follow-up simulation | configured follow-up event scheduled without uncontrolled looping |
| H-10 | Duplicate event/retry | idempotent/deduped behavior where the integration contract supports it |
| H-11 | Sensitive data minimization | demo contains no real patient record |
| H-12 | Human handoff context | staff handoff contains enough approved workflow context without unnecessary sensitive content |

## 4. Website demo-specific checks
- [ ] Demo mode label visible before interaction.
- [ ] Synthetic-data disclosure visible.
- [ ] Healthcare tab starts from a safe clinic-intake example.
- [ ] Medical-advice boundary appears in healthcare response set.
- [ ] No statement implies access to a live clinic calendar/database.
- [ ] No client names/patient data in demo source.
- [ ] Mobile chat controls are usable without horizontal overflow.
- [ ] Keyboard input/send works.
- [ ] Typing animation respects reduced-motion rules where applicable.

## 5. Production-pilot UAT extension
When a real client pilot exists, replace simulated integration assertions with actual test-environment results:
- source channel receive;
- validation;
- route;
- calendar/CRM write;
- human escalation;
- failure/retry;
- audit/event record;
- permission/role behavior.

Record exact test date, environment and integration version.

## 6. Evidence report format
For every run record:
- test ID;
- date;
- build/deployment commit;
- environment;
- synthetic input;
- expected result;
- actual result;
- PASS / FAIL;
- screenshot/log/reference where available;
- defect/action if failed.

## 7. Public proof rule
Safe public language after this synthetic demo passes:
- “Interactive healthcare workflow prototype.”
- “Shows intake, routing, follow-up and human escalation patterns.”
- “Uses synthetic data.”

Unsafe language without client evidence:
- “Proven to increase bookings.”
- “Reduces response time by X%.”
- “Used by X clinics.”
- “99.9% uptime.”
- “Recovers ₹X/month.”

## 8. Exit criteria
The synthetic flagship demo is DEMO-READY when:
- all website demo-specific checks pass;
- H-01 through H-09 pass in the chosen demo implementation/test harness;
- H-10 is validated wherever retry/idempotency exists;
- no real sensitive data appears;
- visual/mobile/accessibility QA passes;
- current CI is green.

A demo-ready result does **not** remove the need for a real pilot, baseline and client-approved case study.
