# Shalcon Intelligence — Automation Opportunity Audit

> Client-facing one-page/short-report template. Replace bracketed fields. Separate verified facts from assumptions.

**Business:** [CLIENT]
**Workflow audited:** [WORKFLOW]
**Date:** [DATE]
**Prepared by:** Shalcon Intelligence

## 1. What happens today

[5–8 numbered steps describing the actual current workflow in plain language.]

Example format:
1. Inquiry arrives through [CHANNEL].
2. [ROLE] asks [KEY QUESTIONS].
3. Information is copied into [SYSTEM].
4. Availability/status is checked in [SYSTEM].
5. Follow-up occurs through [PROCESS].
6. Final outcome is recorded in [SYSTEM / NOT CONSISTENTLY RECORDED].

**Evidence quality:** [VERIFIED / CLIENT-REPORTED / UNKNOWN]

## 2. Main friction worth solving

### Primary friction
[ONE SPECIFIC BOTTLENECK]

### Why it matters operationally
- [manual handoff]
- [waiting time]
- [duplicate entry]
- [missing status]
- [follow-up dependency]

Do not write “you are losing ₹X” unless the client's own verified numbers support that statement and the math is explicitly qualified.

## 3. Recommended first automation

**[WORKFLOW NAME]**

Proposed flow:

`[INPUT] → [INTAKE] → [QUALIFY] → [BOOK/ROUTE] → [FOLLOW UP] → [WRITE BACK] → [HUMAN ESCALATION]`

### Automate
- [ ] [APPROVED STEP]
- [ ] [APPROVED STEP]
- [ ] [APPROVED STEP]

### Keep human-owned
- [ ] [SENSITIVE / LOW-CONFIDENCE / CONSEQUENTAL STEP]
- [ ] [EXCEPTION]

## 4. Required systems

| System | Purpose | Current access/API status |
|---|---|---|
| [Website/WhatsApp/Phone] | Intake | [Verified/Likely/Unknown] |
| [Calendar] | Booking | [ ] |
| [CRM/ERP/Sheet] | Write-back | [ ] |
| [Notification channel] | Staff escalation | [ ] |

Unknown integration availability is a dependency, not an invisible assumption.

## 5. Data boundary

### Required fields
[ONLY THE FIELDS NEEDED]

### Explicitly exclude from general automation
[UNNECESSARY SENSITIVE DATA / CREDENTIALS / CLINICAL JUDGMENT / ETC.]

### Human escalation trigger
[WHEN AUTOMATION STOPS]

## 6. Measurement baseline

Measure before build where possible:

| Metric | Current baseline | Source quality |
|---|---:|---|
| Inquiry volume | [ ] | [ ] |
| Median/typical first-response time | [ ] | [ ] |
| Staff touches per completed request | [ ] | [ ] |
| Follow-up completion | [ ] | [ ] |
| Booking/completion rate | [ ] | [ ] |
| Unresolved/unknown-status rate | [ ] | [ ] |

A pilot should improve an agreed operational metric before Shalcon or Client treats it as a commercial success story.

## 7. Opportunity estimate — optional

Use only if the prospect provides meaningful assumptions.

- Daily/weekly inquiries: [ ]
- Delayed/missed portion: [ ]
- Likely conversion if handled: [ ]
- Average conversion value: [ ]
- Scenario result: [ ]

**Label:** planning scenario using client-supplied/adjusted assumptions; not verified loss and not guaranteed recovery.

## 8. Recommended pilot boundary

**Pilot:** [ONE WORKFLOW]

Included:
- [ ] primary intake path;
- [ ] approved qualification;
- [ ] one booking/CRM/write-back integration;
- [ ] follow-up rule;
- [ ] human escalation;
- [ ] agreed event tracking;
- [ ] UAT scenarios.

Excluded unless separately scoped:
- voice;
- extra departments/branches;
- extra CRMs/ERPs;
- data migration;
- custom app/dashboard;
- unlimited changes;
- regulated professional decisions.

## 9. Risks / dependencies

- **[DEPENDENCY]:** [owner + what must happen]
- **[DEPENDENCY]:** [owner + what must happen]
- **[RISK]:** [mitigation]

## 10. Recommendation

Choose one:

### Proceed to bounded pilot
Reason: [WHY]

### Technical validation first
Need: [ONE OR TWO SPECIFIC ITEMS]

### Do not automate yet
Reason: [ECONOMICS / PROCESS / ACCESS / SAFETY]

## 11. Next action

**Owner:** [SHALCON / CLIENT]
**Action:** [ONE CONCRETE NEXT STEP]
**Date:** [DATE]

---

### Audit standard
This report diagnoses a workflow. It is not a guarantee of revenue, savings, compliance or future performance. Final scope, price, security/data-processing requirements and acceptance criteria belong in the signed proposal/SOW.
