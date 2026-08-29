# Shalcon Intelligence — Proposal + Statement of Work Template

> Working template. Replace bracketed fields. Commercial/legal terms require owner approval before signing.

## 1. Client
- Company: [CLIENT]
- Primary contact: [NAME / ROLE]
- Project: [PROJECT NAME]
- Proposal date: [DATE]
- Valid until: [DATE]

## 2. Executive summary
[CLIENT] currently handles [WORKFLOW] using [CURRENT TOOLS/PROCESS]. The audit identified [BOTTLENECKS]. Shalcon proposes a focused automation system that [BUSINESS OPERATING OUTCOME] while preserving human control for [ESCALATION / SENSITIVE CASES].

## 3. Current-state workflow
Document the real existing flow in 5–10 steps.

Example:
1. Inquiry arrives on WhatsApp.
2. Receptionist asks standard questions.
3. Availability is checked manually.
4. Booking is entered in calendar/ERP.
5. Follow-up depends on staff memory.
6. Outcome is not consistently recorded.

## 4. Proposed future-state workflow
1. Inquiry is captured from [CHANNEL].
2. Approved intake questions collect [FIELDS].
3. Workflow classifies request into [INTENTS].
4. Approved requests are routed/booked in [SYSTEM].
5. Configured follow-up runs for [CONDITION].
6. Status is written to [CRM/DATABASE].
7. [SENSITIVE/LOW-CONFIDENCE] cases escalate to [ROLE].
8. Events are logged for reporting.

## 5. Deliverables
- [Automation / assistant]
- [Channel integration]
- [CRM/database integration]
- [Booking/routing]
- [Follow-up sequence]
- [Human handoff]
- [Reporting/events]
- [Admin/configuration documentation]
- [UAT test plan]
- [Training/handover]

## 6. Explicit exclusions
Unless added in writing, the project excludes:
- medical diagnosis or treatment advice;
- legal/financial advice;
- unsupported third-party integrations;
- data migration beyond agreed fields;
- new CRM implementation if only integration was scoped;
- unlimited revisions;
- paid third-party usage fees;
- additional channels/workflows not listed above.

## 7. Acceptance criteria
Project is accepted when the agreed UAT scenarios pass, including:
- inquiry captured;
- required data collected;
- correct routing/booking;
- follow-up trigger works;
- human escalation works;
- integration failure produces safe fallback;
- agreed reporting event is recorded.

Attach final test cases as Appendix A.

## 8. Implementation plan
### Stage 1 — Workflow confirmation
Duration: [X]
Output: signed-off workflow and field map.

### Stage 2 — Prototype
Duration: [X]
Output: synthetic/test-data workflow demonstration.

### Stage 3 — Integration
Duration: [X]
Output: connected staging workflow.

### Stage 4 — UAT
Duration: [X]
Output: test results and fixes.

### Stage 5 — Go-live + stabilization
Duration: [X]
Output: production release, monitoring and handover.

Timelines depend on client access, approvals and third-party availability.

## 9. Client responsibilities
Client will:
- appoint a decision maker and workflow owner;
- provide lawful, authorized access to systems in scope;
- approve messaging/content and escalation rules;
- provide test accounts/data where needed;
- complete UAT within agreed response windows;
- pay third-party platform/API fees unless explicitly included;
- notify Shalcon before changing connected systems or credentials.

## 10. Commercials
### Implementation fee
[AMOUNT / RANGE]

### Ongoing support/optimization
[AMOUNT / MONTH]

### Third-party costs
Billed directly by vendor or reimbursed by client as specified: [LIST].

### Payment schedule
Recommended default:
- 50% to start;
- 30% when staging workflow is ready for UAT;
- 20% on production acceptance.

Alternative schedules must be written into this SOW.

## 11. Change requests
Anything that materially adds a channel, integration, workflow branch, data source, role model, reporting requirement or objective is estimated separately before work begins.

## 12. Support
Define:
- support window;
- communication channel;
- incident priorities;
- included optimization hours/revisions;
- response target (not resolution guarantee);
- exclusions.

## 13. Data and security
- Use least-privilege access.
- Do not send credentials through public forms/messages.
- Sensitive data categories must be identified before integration.
- Public demos use synthetic data.
- Production logging should avoid unnecessary sensitive data.
- Data-processing terms are attached when applicable.

## 14. Third-party dependencies
The solution may depend on services such as WhatsApp/Meta, telephony, CRM, calendar, AI model, automation, hosting or database providers. Vendor outages, policy changes, rate limits and price changes are outside Shalcon's direct control. Shalcon will design reasonable fallbacks where scoped.

## 15. Performance and outcome language
Shalcon commits to agreed deliverables and acceptance criteria. Revenue, conversion, savings or business-performance outcomes are targets for measurement, not guarantees, unless a specific contractual guarantee is separately written and approved.

## 16. Intellectual property
Define separately:
- client-owned business data;
- client-specific deliverables after payment;
- Shalcon pre-existing templates/libraries/know-how;
- third-party software licenses.

## 17. Termination / pause
Specify treatment of:
- completed work;
- unpaid invoices;
- handover/export;
- access revocation;
- third-party charges;
- retained/deleted data.

## 18. Sign-off
Client: ____________________  Date: ______

Shalcon Intelligence: ____________________  Date: ______

---

# Appendix A — UAT cases
| ID | Scenario | Input | Expected output | Result | Evidence |
|---|---|---|---|---|---|
| UAT-01 | New inquiry |  |  |  |  |
| UAT-02 | Qualification |  |  |  |  |
| UAT-03 | Booking/routing |  |  |  |  |
| UAT-04 | Follow-up |  |  |  |  |
| UAT-05 | Human escalation |  |  |  |  |
| UAT-06 | Integration outage |  |  |  |  |
| UAT-07 | Duplicate request |  |  |  |  |
| UAT-08 | Reporting |  |  |  |  |
