# Shalcon Intelligence — Automation Opportunity Audit

> Client-facing short-report template. Use only after a real discovery/audit. Separate client-confirmed facts, system-verified evidence and assumptions.

## PRE-SEND GATE — REQUIRED
Before exporting/sending:
- [ ] every `[BRACKETED PLACEHOLDER]` is replaced or removed;
- [ ] example workflow text is removed;
- [ ] current workflow statements came from client/system evidence, not public-research assumptions;
- [ ] evidence quality is labeled accurately;
- [ ] any numeric baseline includes source + period/definition where available;
- [ ] any opportunity estimate is clearly a planning scenario using identified assumptions;
- [ ] no revenue-loss/recovery/business-outcome guarantee appears;
- [ ] integration/API availability is not stated as verified unless actually checked;
- [ ] sensitive-data/human-escalation boundaries are included where relevant;
- [ ] recommendation is one of: bounded pilot / technical validation first / do not automate yet;
- [ ] draft/internal instructions are removed from client-facing export.

**Business:** [CLIENT]  
**Workflow audited:** [WORKFLOW]  
**Date:** [DATE]  
**Prepared by:** Shalcon Intelligence

## 1. What happens today
[5–8 numbered steps describing the actual client-confirmed current workflow in plain language.]

Example pattern to remove before export:
1. Inquiry arrives through [CHANNEL].
2. [ROLE] asks [KEY QUESTIONS].
3. Information is entered/copied into [SYSTEM].
4. Availability/status is checked in [SYSTEM].
5. Follow-up occurs through [PROCESS].
6. Final outcome is recorded in [SYSTEM / UNKNOWN].

**Evidence quality:** [SYSTEM-VERIFIED / CLIENT-REPORTED / PUBLIC OBSERVATION / UNKNOWN]

Do not silently upgrade client-reported or public observations to system-verified facts.

## 2. Main friction worth solving
### Primary friction
[ONE CONFIRMED OR CLEARLY LABELED HYPOTHESIZED BOTTLENECK]

### Why it matters operationally
Use only supported items, for example:
- manual handoff;
- waiting/queue step;
- duplicate entry;
- missing status;
- follow-up dependency;
- repeated routing/coordination.

Do not write `you are losing ₹X` unless client/system data supports the underlying facts and math is transparently qualified.

## 3. Recommended first automation
**[WORKFLOW NAME]**

Proposed flow:
`[INPUT] → [APPROVED INTAKE] → [ROUTE/QUALIFY] → [BOOK/ACT] → [FOLLOW UP] → [WRITE BACK] → [HUMAN ESCALATION]`

### Automate
- [ ] [APPROVED STEP]
- [ ] [APPROVED STEP]
- [ ] [APPROVED STEP]

### Keep human-owned
- [ ] [SENSITIVE / LOW-CONFIDENCE / CONSEQUENTIAL STEP]
- [ ] [EXCEPTION]

## 4. Required systems / technical dependencies
| System | Purpose | Evidence/status |
|---|---|---|
| [Website/WhatsApp/Phone] | Intake | [VERIFIED / CLIENT-REPORTED / UNKNOWN] |
| [Calendar/booking] | Booking | [ ] |
| [CRM/ERP/Sheet] | Write-back | [ ] |
| [Notification channel] | Staff escalation | [ ] |

Unknown integration/API access is a dependency to validate, not an invisible assumption.

## 5. Data boundary
### Required fields
[ONLY FIELDS NEEDED FOR WORKFLOW]

For each sensitive/personal field, document purpose and whether it can be excluded/minimized.

### Explicitly exclude from general automation
[UNNECESSARY MEDICAL/CLAIM/CANDIDATE CONTENT / CREDENTIALS / CARD DATA / PROFESSIONAL JUDGMENT / ETC.]

### Human escalation
[WHEN AUTOMATION STOPS + WHO OWNS DECISION]

Before real sensitive client data is connected, complete applicable role/data/security/retention/DPA review.

## 6. Measurement baseline
Measure before build where possible.

| Metric | Definition | Current baseline | Period/source | Evidence quality |
|---|---|---:|---|---|
| Inquiry/request volume | | | | |
| First-response latency | | | | |
| Staff touches per completed request | | | | |
| Follow-up completion | | | | |
| Booking/routing completion | | | | |
| Unresolved/unknown-status rate | | | | |
| Integration/failure count | | | | |

If a baseline is unavailable, write `NOT AVAILABLE`; do not invent one.

## 7. Opportunity estimate — optional
Use only when meaningful assumptions are available.

- Inquiry volume: [ ]
- Delayed/missed portion: [ ]
- Conversion assumption: [ ]
- Average conversion value: [ ]
- Scenario result: [ ]
- Assumption source: [CLIENT-SUPPLIED / CLIENT-ADJUSTED / MODEL STARTING ASSUMPTION]

**Required label:** planning scenario, not verified loss and not guaranteed recovery.

## 8. Recommended pilot boundary
**Pilot:** [ONE WORKFLOW]

Possible included items only if actually proposed:
- [ ] primary intake path;
- [ ] approved qualification/routing;
- [ ] booking/CRM/write-back integration;
- [ ] approved follow-up rule;
- [ ] human escalation;
- [ ] event/measurement logging;
- [ ] UAT scenarios.

Explicit exclusions should cover what is not included, such as extra channels/branches, migrations, dashboards, unlimited changes, or regulated professional decisions.

## 9. Risks / dependencies
- **[DEPENDENCY]:** [owner + required action]
- **[DEPENDENCY]:** [owner + required action]
- **[RISK]:** [mitigation / validation step]

Include client access/approval/vendor dependencies that can change timing/scope.

## 10. Recommendation
Choose one:

### Proceed to bounded pilot
Reason: [SUPPORTED FIT]

### Technical validation first
Need: [SPECIFIC INTEGRATION/ACCESS/DATA VALIDATION]

### Do not automate yet
Reason: [ECONOMICS / PROCESS / ACCESS / SAFETY / LOW VOLUME]

Do not force a paid recommendation if evidence says no-fit.

## 11. Commercial next step
If standard bounded Healthcare Pilot materially fits, current owner-approved baseline is:
- ₹39,000 setup/implementation;
- ₹9,000/month managed optimization/support after stabilization;
- 50% / 30% / 20% implementation milestones;
- vendor/API/message/call costs client-paid or separately itemized.

Do not force this baseline onto custom scope or another vertical. Final price/scope belongs in client-specific SOW.

## 12. Next action
**Owner:** [SHALCON / CLIENT]  
**Action:** [ONE CONCRETE NEXT STEP]  
**Target date:** [DATE]

---

### Audit standard
This report diagnoses one workflow. It is not a guarantee of revenue, savings, compliance, launch date or future performance. Final scope, price, timeline, security/data-processing responsibilities, support and acceptance criteria belong in the reviewed client-specific SOW.
