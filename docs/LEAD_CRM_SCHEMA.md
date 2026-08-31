# Shalcon Intelligence — Lead CRM Schema + Current Implementation

Status date: 31 Aug 2026

Purpose: define Shalcon’s minimum prospecting → audit → proposal → client-handoff data model and document the current implementation without creating a second competing source of truth.

This schema is for business-development records. Do not place patient records, candidate confidential data, policy/claim content, credentials or other unnecessary sensitive client information in it.

## 0. Current implementation
A live Google Sheets founder-led pipeline already exists:
- spreadsheet: **Shalcon Intelligence — Sales Pipeline**;
- spreadsheet ID: `1AhYb8qOAcDhFaaTmrwubsyXmio7TUsHMVaChynuo0CQ`;
- tab: `Pipeline`;
- current 31 Aug state: 8 prospects, all `Draft Ready`; 0 sent, 0 replied, 0 discovery.

Use that spreadsheet as the operational source of truth for early founder-led sales. Do **not** create a second CRM merely because this document describes a richer future schema.

The current sheet intentionally uses a compact early-stage layout. Expand fields only when real operating needs justify it.

## 1. Account fields
| Field | Required | Notes |
|---|---|---|
| `account_id` | future/when needed | stable internal ID |
| `business_name` | yes | public/legal trading name as known |
| `website` | no | public site |
| `city_area` | no | e.g. Bandra, Mumbai |
| `vertical` | yes | Healthcare initially |
| `segment` | no | dental, diagnostics, dermatology, etc. |
| `locations_count_public` | no | public observation only |
| `priority_tier` | yes | A / B / C or current sheet priority equivalent |
| `public_workflow_observation` | no | supportable observation, not internal claim |
| `observed_channels` | no | website, call, WhatsApp, booking, etc. |
| `research_source` | no | URL/reference used for observation |
| `research_date` | no | date checked |
| `do_not_contact` | yes | default false |
| `do_not_contact_reason` | no | opt-out/rejection/invalid/etc. |

## 2. Contact fields
| Field | Required | Notes |
|---|---|---|
| `contact_id` | future/when needed | stable internal ID |
| `account_id` | future/when needed | parent account |
| `name` | no | public/provided name |
| `role` | no | founder/director/manager/etc. |
| `email` | no | public/provided business contact |
| `linkedin_url` | no | public profile |
| `phone_whatsapp` | no | record only where appropriate for sales process |
| `contact_source` | no | where contact detail came from |
| `whatsapp_opt_in` | where WhatsApp used | default false until supported permission/basis exists |
| `whatsapp_opt_in_source` | no | prospect initiated / explicit permission / other supported basis |
| `whatsapp_opt_in_at` | no | timestamp where relevant |
| `contact_opt_out_at` | no | stop contact when set |

Patient-booking WhatsApp numbers are not default cold first-touch routes.

## 3. Opportunity fields
| Field | Required | Notes |
|---|---|---|
| `opportunity_id` | future/when needed | stable ID |
| `account_id` | future/when needed | parent account |
| `primary_contact_id` | no | current stakeholder |
| `stage` | yes | current operational status/stage |
| `workflow_pain` | no | prospect language where possible |
| `current_tools` | no | systems disclosed by prospect |
| `approx_volume` | no | prospect-supplied; mark source |
| `integration_readiness` | no | unknown / partial / ready / blocked |
| `decision_access` | no | none / indirect / decision-maker |
| `qualification_score` | no | sales-playbook score when used |
| `budget_signal` | no | unknown / weak / plausible / approved |
| `target_timeline` | no | prospect-stated |
| `next_action` | yes for active | exact action |
| `next_action_at` | yes for active | date/time |
| `last_contact_at` | no | timestamp |
| `owner` | yes | internal owner |
| `loss_reason` | required if lost | taxonomy from PMF framework |
| `nurture_revisit_at` | no | only when genuinely useful |

## 4. Stage model
Conceptual lifecycle:
1. `target_identified`
2. `researched`
3. `draft_ready`
4. `contacted`
5. `replied`
6. `qualified`
7. `audit_booked`
8. `audit_completed`
9. `proposal_sent`
10. `negotiation`
11. `won_onboarding`
12. `lost`
13. `nurture`
14. `do_not_contact`

Current Google Sheet labels are the operational truth. Do not rewrite live rows merely to satisfy this conceptual naming scheme.

## 5. Activity fields
Every meaningful touch should eventually record:
- activity/account/opportunity reference where useful;
- timestamp;
- channel;
- direction;
- activity type;
- concise note;
- outcome;
- next action;
- opt-out signal if any.

Do not store full private message/email content unless operationally necessary. A concise sales note is normally enough.

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
- estimated founder delivery/support hours internally;
- commercial exception/discount reason internally;
- proposal status;
- accepted date;
- start-payment received date.

Internal price floors or margin notes must not leak into client-facing proposals.

## 8. Source attribution
For website leads retain only approved v2 attribution fields:
- source;
- page path;
- minimized referrer origin/path;
- UTM source;
- UTM medium;
- UTM campaign.

For manually researched outbound accounts, use a truthful source such as `manual_research_mumbai_healthcare`; do not represent outbound research as an inbound lead.

## 9. Useful views as volume grows
Prioritize:
- active opportunities by next-action date;
- overdue next actions;
- contacts without a valid next action;
- stage counts;
- contacted → replied;
- replied → audit booked;
- audit → qualified/proposal;
- proposal → won;
- losses by reason;
- opt-outs;
- source/segment comparison;
- proposal value vs collected value;
- active client/project handoffs.

Always retain raw counts alongside rates. Tiny-sample rates are not market proof.

## 10. Data-quality rules
- No active opportunity without a next action + date.
- No closed-lost opportunity without loss reason.
- Public observations remain labeled observations until confirmed in discovery.
- Prospect language should not be silently replaced with AI interpretations.
- Estimated volume/ROI values must identify whether prospect-supplied, model-derived or system-verified.
- Opt-out/do-not-contact overrides cadence.
- A `Draft Ready` row is not `Contacted`; stage changes only after an actual event.
- Historical GitHub research lists are not the live CRM.

## 11. Upgrade trigger
Stay on the current Google Sheet until one or more become true:
- volume makes next-action tracking unreliable;
- multiple operators need controlled ownership/activity history;
- reporting becomes materially manual/error-prone;
- integrations need structured CRM APIs;
- permission/audit requirements exceed spreadsheet controls.

Only then migrate deliberately to a dedicated CRM/database, with one authoritative source and preserved history. Do not create parallel systems casually.
