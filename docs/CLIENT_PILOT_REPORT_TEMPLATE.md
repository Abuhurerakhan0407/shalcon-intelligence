# Shalcon Intelligence — Client Pilot Report Template

Use for the first production pilot and recurring optimization reviews. Report observed system behavior; do not turn estimates into verified business results.

## 1. Report header
- Client: [CLIENT]
- Workflow: [WORKFLOW]
- Reporting period: [START] → [END]
- Environment: [PRODUCTION / PILOT]
- Owner: [CLIENT OWNER]
- Shalcon owner: [NAME]

## 2. Executive summary
In 3–5 bullets:
- what was live during the period;
- what changed;
- what worked reliably;
- what failed or required manual intervention;
- what action is recommended next.

Avoid marketing language inside an operational report.

## 3. Scope during this period
List only active components:
- intake channel(s);
- qualification rules;
- booking/routing;
- follow-up;
- CRM/database write-back;
- human escalation;
- reporting/alerts.

Record any feature that was disabled, staged or not yet connected.

## 4. Baseline
Baseline period: [DATES]

| Metric | Definition | Source | Baseline | Notes |
|---|---|---|---:|---|
| Inquiry volume | | | | |
| First-response latency | | | | |
| Intake completion | | | | |
| Booking/routing completion | | | | |
| Follow-up completion | | | | |
| Staff touches per inquiry | | | | |
| Escalation rate | | | | |
| Failed handoffs/integrations | | | | |

If a baseline does not exist, mark it NOT AVAILABLE. Do not fabricate one.

## 5. Pilot-period observations

| Metric | Definition | Source | Result | Change vs baseline | Confidence / caveat |
|---|---|---|---:|---:|---|
| Inquiry volume | | | | | |
| First-response latency | | | | | |
| Intake completion | | | | | |
| Booking/routing completion | | | | | |
| Follow-up completion | | | | | |
| Staff touches per inquiry | | | | | |
| Escalation rate | | | | | |
| Failed handoffs/integrations | | | | | |

Use raw counts alongside percentages when sample sizes are small.

## 6. Reliability
Record:
- successful workflow runs;
- failed workflow runs;
- retries;
- manual overrides;
- third-party outages;
- unresolved incidents;
- median/percentile latency where measurable.

Do not publish “uptime” unless the monitoring method and observation period support it.

## 7. Human escalation
- Top escalation reasons.
- Requests the automation correctly refused/deferred.
- Requests incorrectly escalated.
- Requests that should have escalated but did not.
- Rule changes recommended.

## 8. Quality review
Sample reviewed: [N]

Record:
- correct intent/routing;
- required fields captured;
- approved content followed;
- hallucination/unsupported-answer incidents;
- privacy/logging issues;
- duplicate/loop incidents.

## 9. Incidents
For each material issue:
- time/date;
- affected workflow;
- user/business impact;
- detection method;
- immediate mitigation;
- root cause if known;
- permanent action;
- owner;
- status.

## 10. Commercial/business indicators
Only include revenue, conversion, savings or booking impact when:
- the source is available;
- baseline and post-launch definitions match;
- timeframe is clear;
- major confounders are recorded;
- the client understands the limitation.

Never convert the website opportunity estimator into a claimed client result.

## 11. Changes made this period
| Change | Reason | Date | Evidence / test |
|---|---|---|---|
| | | | |

## 12. Next-period actions
Prioritize 1–5 actions with owner and target date.

| Priority | Action | Owner | Target | Success check |
|---|---|---|---|---|
| P0 | | | | |

## 13. Case-study eligibility
Before any result leaves the private client report:
- [ ] metric source archived;
- [ ] baseline/post definition consistent;
- [ ] period stated;
- [ ] sample size/event count recorded where relevant;
- [ ] known confounders recorded;
- [ ] client permission obtained;
- [ ] approved wording added to `CLAIMS_REGISTER.md`.

Until all are checked, the result remains internal operational evidence.
