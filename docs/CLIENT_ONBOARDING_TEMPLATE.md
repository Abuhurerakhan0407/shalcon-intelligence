# Shalcon Intelligence — Client Onboarding Template

## Project identity
- Client:
- Project:
- Decision maker:
- Workflow owner:
- Technical/contact owner:
- UAT approver:
- Target environment:

## Outcome
In one sentence, what operating problem are we changing?

`[CURRENT WORKFLOW] → [DESIRED OPERATING OUTCOME]`

## Scope confirmation
### Included
- Channels:
- Workflow steps:
- Integrations:
- Reporting:
- Human escalation:

### Explicitly excluded
- 
- 
- 

## Current workflow
1.
2.
3.
4.
5.

## Future workflow
1.
2.
3.
4.
5.

## Information collected by workflow
For every field, document why it is required.

| Field | Required? | Purpose | Sensitive? | Retention need |
|---|---|---|---|---|
|  |  |  |  |  |

Do not collect data merely because it may be useful later.

## Human escalation rules
Escalate when:
- user requests a human;
- workflow confidence is below approved threshold;
- sensitive/urgent intent matches client rule;
- integration verification fails;
- action exceeds approved automation authority;
- client-defined exception occurs.

Client must approve final escalation wording and destination.

## System access matrix
Never paste passwords/secrets into this document.

| System | Environment | Access needed | Owner granting access | Method | Revoke after? |
|---|---|---|---|---|---|
|  |  |  |  | OAuth / scoped key / invite |  |

Prefer delegated roles, scoped keys, sandbox/test accounts and least privilege.

## Communication content approval
- Welcome/intake wording approved by:
- Follow-up wording approved by:
- Escalation wording approved by:
- Opt-out wording approved by:
- Languages approved:

## Third-party dependencies
| Vendor | Purpose | Client/Shalcon account | Cost owner | Known limit/dependency |
|---|---|---|---|---|
|  |  |  |  |  |

## Baseline measurement
Attach source evidence when possible.

| Metric | Definition | Baseline period | Value | Source |
|---|---|---|---|---|
|  |  |  |  |  |

## UAT owner and test window
- Client UAT owner:
- Test start:
- Test completion target:
- Production approval method:

## Go-live readiness
- [ ] Scope frozen for release
- [ ] Access/integrations verified
- [ ] Synthetic/staging test complete
- [ ] Sensitive-data review complete
- [ ] Error/fallback paths tested
- [ ] Human escalation tested
- [ ] Duplicate/retry behavior tested
- [ ] Baseline saved
- [ ] Client UAT signed off
- [ ] Rollback/fallback documented
- [ ] Support contacts confirmed
- [ ] Production approver says go

## Post-launch
- Stabilization review date:
- First measurement review date:
- Access revocation/rotation date where relevant:
- Open issues:
