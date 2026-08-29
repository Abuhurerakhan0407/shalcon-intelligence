# Shalcon Intelligence — Delivery Playbook

## Delivery principle
Build the smallest production workflow that solves the agreed operational problem, prove it through acceptance tests, then expand. Do not automate unclear processes just because a tool makes it possible.

## 1. Handoff from sales
Before kickoff, sales must provide:
- signed proposal/SOW;
- confirmed decision maker;
- workflow diagram or notes;
- systems/integrations in scope;
- excluded use cases;
- data sensitivity notes;
- acceptance criteria;
- target timeline;
- third-party costs/dependencies;
- named client owners for access and UAT.

## 2. Kickoff checklist
- Confirm business outcome and workflow owner.
- Re-read scope aloud in plain language.
- Confirm channels and integrations.
- Confirm what AI may answer vs must escalate.
- Confirm hours/availability assumptions.
- Confirm fallback when an integration is unavailable.
- Confirm test environment/data.
- Confirm who approves production release.
- Confirm success measures and baseline.

## 3. Access policy
Never request passwords in chat, email or public forms.
Prefer delegated access, scoped API keys, test accounts and least privilege.
Document who granted access, what it can do and when it should be revoked.
Do not copy real sensitive client data into demos unless explicitly required, authorized and protected.

## 4. Build stages

### A. Workflow definition
Produce current-state and future-state flow.
Identify states, triggers, decisions, integrations, human handoffs and error paths.

### B. Prototype
Use synthetic/test data.
Validate conversation design and business logic before connecting production systems.

### C. Integration
Connect only approved systems.
Use environment-specific credentials.
Add logging and visible failure behavior.

### D. Test
Run happy path, invalid input, timeout, duplicate submission, upstream outage, handoff, retry and permission tests.

### E. UAT
Client executes agreed acceptance scenarios.
Record pass/fail and unresolved items.

### F. Go-live
Confirm rollback/fallback.
Release during agreed window.
Monitor first real events.

### G. Stabilization
Review incidents, missed intents, routing errors and user confusion.
Make agreed stabilization fixes before expansion.

## 5. Healthcare guardrails
Public-facing healthcare automations should not diagnose, prescribe, interpret symptoms as clinical advice or pretend to replace a clinician.
Sensitive or urgent intents should be routed using client-approved rules and emergency language.
Use synthetic patient data for public demos.
Collect only fields required by the agreed workflow.

## 6. Error handling standard
Every external integration requires:
- timeout;
- explicit failure state;
- retry strategy where safe;
- duplicate protection where relevant;
- human-visible alert for important failure;
- structured log entry;
- no false success message.

## 7. UAT template

| Test | Expected result | Status | Evidence |
|---|---|---|---|
| New inquiry | Workflow receives record |  |  |
| Required intake | Required fields collected |  |  |
| Qualification | Correct branch selected |  |  |
| Booking/routing | Correct destination updated |  |  |
| Follow-up | Correct sequence triggered |  |  |
| Human escalation | Staff notified with context |  |  |
| Integration outage | User sees safe fallback |  |  |
| Duplicate input | No duplicate operational action |  |  |
| Reporting | Expected event recorded |  |  |

## 8. Launch report
Each go-live report should contain:
- version/date;
- workflow diagram;
- integrations;
- tested scenarios;
- known limitations;
- credentials/access owner list (never secrets themselves);
- support path;
- rollback/fallback path;
- baseline metrics;
- next review date.

## 9. Post-launch measurement
Choose metrics that match the workflow, for example:
- response latency;
- percentage of inquiries fully captured;
- qualification completion;
- bookings/routed outcomes;
- follow-up completion;
- escalation rate;
- error rate;
- staff touches per inquiry;
- opt-outs/complaints.

Never turn these into public marketing claims without verification and permission.

## 10. Change requests
A change is out of scope when it adds a new channel, integration, major workflow branch, data source, role/permission model, report, automation objective or materially changes acceptance criteria.
Small bug fixes inside agreed acceptance criteria are not change requests.

## 11. Incident priority
P0 — security/privacy incident or harmful incorrect action: disable affected path immediately.
P1 — core workflow unavailable: fallback + urgent repair.
P2 — partial function degraded: repair in agreed support window.
P3 — cosmetic/minor improvement: backlog.

## 12. Offboarding
- export agreed client-owned configuration/data;
- revoke Shalcon access;
- rotate shared credentials if any were used;
- document shutdown/transfer steps;
- retain/delete records according to agreement and applicable obligations.
