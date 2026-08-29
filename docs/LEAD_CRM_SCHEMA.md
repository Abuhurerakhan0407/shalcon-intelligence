# Shalcon Intelligence — Lead CRM Schema

Purpose: define the minimum data model for prospecting → audit → proposal → client handoff before choosing a specific CRM/database implementation.

This schema is for business-development records. Do not place patient records, candidate confidential data, policy/claim content, credentials or other unnecessary sensitive client information in it.

## 1. Account fields

| Field | Required | Notes |
|---|---|---|
| `account_id` | yes | stable internal ID |
| `business_name` | yes | public/legal trading name as known |
| `website` | no | public site |
| `city_area` | no | e.g. Bandra, Mumbai |
| `vertical` | yes | Healthcare initially |
| `segment` | no | dental, diagnostics, dermatology, etc. |
| `locations_count_public` | no | public observation only |
| `priority_tier` | yes | A / B / C |
| `public_workflow_observation` | no | supportable observation, not an internal claim |
| `observed_channels` | no | website, call, WhatsApp, booking, etc. |
| `research_source` | no | URL/reference used for observation |
| `research_date` | no | date checked |
| `do_not_contact` | yes | default false |
| `do_not_contact_reason` | no | opt-out/rejection/invalid/etc. |

## 2. Contact fields

| Field | Required | Notes |
|---|---|---|
| `contact_id` | yes | stable internal ID |
| `account_id` | yes | parent account |
| `name` | no | public/provided name |
| `role` | no | founder/director/manager/etc. |
| `email` | no | public/provided business contact |
| `linkedin_url` | no | public profile |
| `phone_whatsapp` | no | record only where appropriate for the sales process |
| `contact_source` | no | where contact detail came from |
| `whatsapp_opt_in` | yes | default false |
| `whatsapp_opt_in_source` | no | prospect initiated / explicit permission / other valid basis |
| `whatsapp_opt_in_at` | no | timestamp where relevant |
| `contact_opt_out_at` | no | stop contact when set |

## 3. Opportunity fields

| Field | Required | Notes |
|---|---|---|
| `opportunity_id` | yes | stable ID |
| `account_id` | yes | parent account |
| `primary_contact_id` | no | current stakeholder |
| `stage` | yes | controlled stage list below |
| `workflow_pain` | no | prospect language where possible |
| `current_tools` | no | systems disclosed by prospect |
| `approx_volume` | no | prospect-supplied; mark source |
| `integration_readiness` | no | unknown / partial / ready / blocked |
| `decision_access` | no | none / indirect / decision-maker |
| `qualification_score` | no | 0–14 from sales playbook |
| `budget_signal` | no | unknown / weak / plausible / approved |
| `target_timeline` | no | prospect-stated |
| `next_action` | yes for active | exact action |
| `next_action_at` | yes for active | date/time |
| `last_contact_at` | no | timestamp |
| `owner` | yes | internal owner |
| `loss_reason` | required if lost | taxonomy from PMF framework |
| `nurture_revisit_at` | no | only when genuinely useful |

## 4. Controlled stages
1. `target_identified`
2. `researched`
3. `contacted`
4. `replied`
5. `qualified`
6. `audit_booked`
7. `audit_completed`
8. `proposal_sent`
9. `negotiation`
10. `won_onboarding`
11. `lost`
12. `nurture`
13. `do_not_contact`

Avoid custom one-off stage names; use notes/tags for nuance.

## 5. Activity fields
Every meaningful touch should record:
- `activity_id`;
- account/opportunity ID;
- timestamp;
- channel;
- direction (outbound/inbound);
- activity type;
- concise note;
- outcome;
- next action created;
- opt-out signal if any.

Do not store full private message/email content unless operationally necessary. A concise sales note is usually enough.

## 6. Audit fields
For completed audits capture:
- workflow map reference;
- workflow owner;
- decision maker;
- starting channel;
- approximate volume/source;
- integration list/status;
- sensitive-data flags;
- human escalation rules;
- baseline availability;
- pilot success criteria;
- UAT owner;
- proposed next step.

## 7. Proposal / commercial fields
- proposal date;
- valid-until date;
- implementation fee;
- recurring/support fee;
- currency;
- payment milestones;
- third-party cost treatment;
- estimated founder delivery hours;
- estimated recurring support hours;
- commercial exceptions/discount reason;
- proposal status;
- accepted date;
- start-payment received date.

## 8. Source attribution
For website leads retain only the approved attribution fields from the v2 lead contract:
- source;
- page path;
- referrer origin/path;
- UTM source;
- UTM medium;
- UTM campaign.

For manually researched outbound accounts, use a source such as `manual_research_mumbai_healthcare` rather than pretending the prospect was an inbound lead.

## 9. Weekly dashboard views
Required views/queries:
- active opportunities by next-action date;
- overdue next actions;
- contacts without a valid next action;
- stage counts;
- contacted → replied;
- replied → audit booked;
- audit → qualified;
- qualified → proposal;
- proposal → won;
- losses by reason;
- opt-outs;
- source/segment comparison;
- proposal value vs collected value;
- active client/project handoffs.

Always retain raw counts alongside rates.

## 10. Data-quality rules
- No active opportunity without a next action + date.
- No closed-lost opportunity without a loss reason.
- Do not overwrite prospect language with an AI-written interpretation; keep the useful original phrase in notes where appropriate.
- Public observations remain labeled as observations until confirmed in discovery.
- Estimated volume/ROI values must indicate whether they were prospect-supplied, model-derived or verified from a system.
- Opt-out overrides any follow-up cadence.

## 11. Implementation decision
This schema can later live in a dedicated CRM, spreadsheet or Shalcon-owned database. Choose the implementation after lead persistence/project infrastructure is resolved; do not create a second disconnected source of truth simply to satisfy a checklist.
