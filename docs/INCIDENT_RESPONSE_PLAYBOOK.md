# Shalcon Intelligence — Incident Response Playbook

Purpose: operational response for Shalcon-managed automation/integration incidents. This is not a substitute for a client's legal/security incident plan.

## Severity

### SEV-1 — critical
Examples:
- confirmed exposure of credentials or personal data;
- automation sends materially unsafe/unauthorized messages at scale;
- production integration performs unauthorized/destructive writes;
- compromise of a privileged account;
- active incident affecting sensitive client data.

Action: contain immediately; stop affected automation if that reduces harm; notify the designated client incident contact; preserve evidence; rotate/revoke exposed access.

### SEV-2 — high
Examples:
- production workflow materially unavailable;
- repeated failed bookings/writes/follow-ups;
- incorrect routing affecting a meaningful subset of requests;
- third-party outage with business impact but no confirmed data exposure.

Action: stabilize/fail safe, notify operational owner, investigate, provide workaround/status.

### SEV-3 — normal
Examples:
- isolated non-critical failure;
- reporting mismatch;
- cosmetic/admin defect that does not affect safe processing.

Action: record, prioritize, fix through normal support/change process.

## First 15 minutes for SEV-1/2

1. **Confirm signal** — what actually failed/exposed; avoid speculation.
2. **Contain** — pause the smallest affected workflow/integration necessary.
3. **Protect evidence** — preserve relevant logs, timestamps, request IDs and configuration state; never copy secrets into incident notes.
4. **Protect access** — revoke/rotate exposed keys/tokens/accounts where appropriate.
5. **Assign owner** — one technical incident owner and one client communication owner.
6. **Notify** — use the agreed client incident contact/channel.
7. **Fail safely** — route affected work to a human/manual path instead of continuing unreliable automation.

## Incident record

Record:
- incident ID;
- start/detection time;
- reporter/detection source;
- systems/integrations affected;
- known data categories affected;
- known customer/user scope;
- current impact;
- containment actions;
- credentials rotated/revoked (names only, never secret values);
- third-party/provider tickets/status;
- client contacts notified + timestamp;
- current owner;
- next update time;
- resolution time;
- root cause;
- corrective/preventive actions.

## Personal-data incident path

If personal data may be affected:
- identify which party controls the relevant processing purpose/data-subject relationship;
- notify the client's designated privacy/security contact without undue delay under the contract;
- provide facts necessary for the client to assess any legal notification duty;
- do not independently promise that notification is or is not legally required without the responsible legal/privacy owner assessing it;
- support containment, impact analysis, evidence and remediation;
- keep communications factual and avoid unsupported attribution.

The current India DPDP baseline and future-effective breach rules are summarized in `INDIA_DATA_PROTECTION_BASELINE_2026-08-29.md`; the applicable law/timing must be rechecked at incident time.

## AI-specific incidents

If the model/agent begins producing unsafe or out-of-scope outputs:
1. disable/route around the affected autonomous path;
2. preserve the prompt/config/model/version/test case;
3. confirm whether the output reached a real user/system;
4. switch to approved deterministic/human fallback;
5. update intent/guardrail/evaluation tests before restoring;
6. run regression cases for the failure class;
7. do not “fix” by silently broadening privileged data access.

## Integration/data-write incidents

For duplicate, wrong-target or unauthorized writes:
- stop retries if they may amplify damage;
- identify idempotency/request IDs;
- compare source-of-truth record with automated write;
- obtain client authorization before destructive rollback where business records may be affected;
- fix retry/idempotency/validation logic;
- add an automated regression test when feasible.

## Communication template — factual status

Use this structure, not speculation:

- **Detected:** [time]
- **Impact known now:** [facts]
- **Systems affected:** [facts]
- **Containment:** [done/in progress]
- **Data exposure:** [confirmed / not confirmed / under investigation]
- **Current fallback:** [manual/safe path]
- **Next update:** [time/trigger]

Do not state “no data breach” until investigation supports that conclusion.

## Recovery gate

Before restoring a SEV-1/2 workflow:
- [ ] root failure or containment understood;
- [ ] exposed credentials rotated/revoked as required;
- [ ] failing integration/model/config fixed;
- [ ] regression test/UAT scenario passes;
- [ ] monitoring/alert path active;
- [ ] client technical owner approves restoration where required;
- [ ] backlog/manual items reconciled without duplicate actions.

## Post-incident review

Within the practical project cadence:
1. timeline;
2. root cause;
3. why existing control failed;
4. impact;
5. containment/recovery;
6. permanent fix;
7. test/SOP/architecture change;
8. client follow-up;
9. unresolved risk/owner/date.

Every repeatable failure should improve a test, checklist or architecture rule. The goal is not a polished incident report; it is making the same incident harder to repeat.
