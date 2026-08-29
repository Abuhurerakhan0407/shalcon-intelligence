# Shalcon Intelligence — Measurement Schema

## Rule
Measure operational events before publishing ROI claims. A public result is allowed only when its source, period, definition and client permission are recorded in `CLAIMS_REGISTER.md`.

## Website conversion events
The frontend currently emits these through `window` event `shalcon:conversion` and pushes them to `dataLayer` when available:

- `booking_clicked`
- `whatsapp_clicked`
- `linkedin_clicked`
- `email_clicked`
- `roi_opened`
- `roi_industry_selected`
- `roi_lead_submitted`
- `roi_lead_failed`

### Common properties
Where relevant record:
- timestamp
- page / path
- referrer
- UTM source / medium / campaign
- selected industry
- selected indicative package
- failure code

Do not place phone numbers, names, patient information or other sensitive lead data into general analytics event properties.

## Funnel
1. Landing/session
2. Flagship/demo engagement
3. Estimator opened
4. Audit CTA / contact action
5. Lead persisted
6. Audit booked
7. Audit attended
8. Qualified opportunity
9. Proposal sent
10. Won / lost

Analytics must distinguish `lead persisted` from merely clicking a submit button.

## Client workflow baseline
Before implementation, record only metrics relevant to the agreed workflow. Examples:
- inquiry count by channel
- median/percentile response latency
- intake completion rate
- booking/routing completion
- no-response follow-up completion
- number of staff touches per inquiry
- escalation volume
- error / failed-handoff count

Record:
- exact metric definition
- source system
- baseline date range
- exclusions
- data quality limitations

## Post-launch events
A production workflow should emit or make observable events such as:
- `inquiry_received`
- `intake_started`
- `intake_completed`
- `qualification_completed`
- `booking_requested`
- `booking_confirmed`
- `routed_to_human`
- `followup_scheduled`
- `followup_sent`
- `followup_completed`
- `integration_failed`
- `manual_override`
- `workflow_completed`

Each event should contain only the minimum operational identifiers required for measurement/debugging. Avoid copying sensitive message content into analytics.

## Case-study evidence record
For any proposed public metric, record:
- client/project
- metric name
- baseline definition/value
- post-launch definition/value
- comparison period
- source query/report
- sample size / event count where relevant
- known confounders
- client permission date
- approved wording

Example approved wording style:
“Median first-response time decreased from [verified baseline] to [verified post-launch] during [period].”

Avoid causal wording like “Shalcon increased revenue by X%” unless the evidence actually supports causation and the client approves it.

## Weekly agency dashboard
Track:
- target accounts researched
- valid contacts
- outreach sent
- positive replies
- audits booked
- attendance rate
- qualified opportunities
- proposals
- wins
- lead-source distribution
- website estimator opens
- persisted web leads
- failed lead submissions

The dashboard should surface conversion rates, but retain raw counts to avoid misleading percentages on tiny samples.
