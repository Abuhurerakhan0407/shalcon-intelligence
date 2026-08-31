# Shalcon Intelligence — Delivery Playbook

Status date: 31 Aug 2026

## Delivery principle
Build the smallest production workflow that solves the agreed operational problem, prove it through acceptance tests, then expand. Do not automate unclear processes simply because a tool makes it possible.

## 1. Sales → delivery handoff gate
Before kickoff, delivery must have:
- signed/accepted proposal/SOW;
- applicable start-payment condition satisfied or an explicit owner-approved exception;
- confirmed decision maker;
- workflow owner;
- current workflow notes/diagram based on client-confirmed facts;
- systems/integrations in scope;
- explicit exclusions;
- data sensitivity/role notes;
- applicable DPA/data-processing/security terms completed before real personal/sensitive data access;
- testable acceptance criteria;
- target implementation window + client dependencies;
- third-party cost ownership;
- named client access owner and UAT approver.

For the standard Healthcare Pilot, normal start payment is 50% = ₹19,500 unless the signed SOW deliberately changes it.

Do not begin material delivery merely because a prospect verbally says yes.

## 2. Kickoff checklist
- Confirm business outcome and workflow owner.
- Re-read scope/exclusions in plain language.
- Confirm channels/integrations.
- Confirm what automation may handle vs must escalate.
- Confirm client operating hours/availability assumptions where relevant.
- Confirm fallback when an integration is unavailable.
- Confirm test environment/data.
- Confirm production release approver.
- Confirm baseline + success measures.
- Confirm support/stabilization boundaries.
- Confirm vendor/account/cost ownership.

## 3. Access policy
Never request passwords in ordinary chat, email or public forms.

Prefer:
- delegated roles;
- scoped API/service accounts;
- OAuth/provider invites;
- test/sandbox accounts;
- least privilege.

Document who granted access, permitted actions and revocation/rotation owner without recording secret values in ordinary project notes.

Do not copy real sensitive client data into demos. Production sensitive-data access occurs only when required, authorized, appropriately protected and covered by the engagement-specific review.

## 4. Build stages
### A. Workflow definition
Produce client-confirmed current-state and proposed future-state flow. Identify states, triggers, decisions, integrations, human handoffs, retries and error paths.

### B. Prototype
Use synthetic/test data. Validate conversation/business logic and escalation before production systems/data.

### C. Integration
Connect only approved systems using environment-specific credentials. Add logging, idempotency/duplicate protection where needed and visible failure behavior.

### D. Test
Run applicable:
- happy path;
- invalid/missing input;
- timeout/upstream failure;
- duplicate/replay;
- permission/access denial;
- human handoff;
- retry/fallback;
- data-minimization/logging checks.

### E. UAT
Client executes agreed acceptance scenarios. Record pass/fail/evidence and distinguish in-scope defects from change requests.

### F. Go-live
Before production approval:
- UAT pass/accepted exceptions recorded;
- rollback/fallback ready;
- production access reviewed;
- data/retention/incident ownership confirmed;
- applicable payment milestone condition satisfied;
- client production approver explicitly says go.

Release during agreed window and monitor first real events.

### G. Stabilization
Review incidents, missed intents, routing errors, user confusion and support burden. Make agreed stabilization fixes before expanding scope.

Standard Healthcare baseline includes 14 days of stabilization after acceptance unless SOW changes it.

## 5. Healthcare guardrails
Healthcare automation remains operational by default, not clinical.

Do not automate final:
- diagnosis;
- treatment recommendation;
- emergency medical judgment;
- prescription/medication decisions;
- interpretation of medical reports;
- other clinical decisions requiring authorized professional judgment.

Urgent/sensitive intents use client-approved routing/escalation language and human ownership. Do not let a generative model independently decide an emergency disposition unless an appropriately reviewed, explicitly scoped system exists.

Public demos use synthetic patient data. Production collects only fields genuinely required for the agreed workflow.

## 6. Error-handling standard
Every material external integration needs:
- timeout;
- explicit failure state;
- retry strategy where safe;
- duplicate/idempotency control where relevant;
- human-visible alert for important failures;
- structured/minimized logging;
- no false success;
- documented manual fallback for business-critical steps.

## 7. UAT minimum pattern
| Test | Expected result | Status | Evidence |
|---|---|---|---|
| New inquiry/request | Workflow receives valid record |  |  |
| Required intake | Required approved fields collected |  |  |
| Routing | Correct destination/path selected |  |  |
| Booking/write-back | Expected system record/action occurs |  |  |
| Follow-up | Only agreed condition triggers sequence |  |  |
| Human escalation | Staff notified with approved/minimum context |  |  |
| Integration outage | Safe fallback/error appears; no false success |  |  |
| Duplicate/replay | No unintended duplicate operational action |  |  |
| Access denial | Failure handled safely |  |  |
| Reporting | Expected event/status recorded |  |  |
| Sensitive/unsupported request | Correct human/safe boundary |  |  |

Client-specific Appendix A in the SOW controls final acceptance cases.

## 8. Go-live report
Each release report should contain:
- version/date;
- workflow diagram;
- integrations;
- tested scenarios;
- accepted limitations;
- access owners (never secret values);
- support path;
- rollback/fallback;
- baseline metrics;
- retention/offboarding notes where relevant;
- next review date.

## 9. Post-launch measurement
Use workflow-relevant measures, for example:
- response latency;
- intake completion;
- routing/booking completion;
- follow-up completion;
- escalation rate;
- error rate;
- staff touches per inquiry;
- opt-outs/complaints.

Record metric definition/source/timeframe. Never publish as client proof without validation and permission through `CLAIMS_REGISTER.md`.

## 10. Change requests
Out of scope when adding materially new:
- channel;
- integration;
- workflow branch/objective;
- data source;
- role/permission model;
- reporting requirement;
- acceptance criteria.

In-scope bug fixes against agreed acceptance criteria are not change requests.

Never absorb repeated extra scope merely to avoid a commercial conversation.

## 11. Incident priority
- **P0:** security/privacy issue or harmful incorrect action → disable/contain affected path immediately.
- **P1:** core workflow unavailable → fallback + urgent repair.
- **P2:** partial degradation → repair within agreed support handling.
- **P3:** cosmetic/minor improvement → backlog/change process.

Follow `INCIDENT_RESPONSE_PLAYBOOK.md` for incident handling.

## 12. Offboarding
- export/handover agreed client-owned configuration/data;
- revoke Shalcon access not required for contracted support;
- rotate shared credentials where appropriate;
- document shutdown/transfer;
- retain/delete data according to agreement/applicable obligations;
- close unused environments/webhooks/tokens;
- preserve only necessary business/legal records.

## 13. Delivery proof boundary
A successful internal test or synthetic demo is not a client result. First-client delivery evidence requires real UAT/production records, a defined baseline/post period and client validation. Public use additionally requires permission.
