# Vercel Git Cleanup — 31 Aug 2026

Purpose: record the deployment fan-out incident and its cleanup so future work does not reconnect Shalcon to legacy portfolio projects.

## Confirmed incident
Shalcon branch pushes from `Abuhurerakhan0407/shalcon-intelligence` / `shalcon-market-ready-2026` were being picked up by three Vercel projects:
- `shalcon-intelligence` — intended project
- `abu_portfolio2` — unintended legacy portfolio link
- `abu-hurera-portfolio-v2` — unintended legacy portfolio link

This unnecessary fan-out contributed to Vercel build-rate-limit failures and prevented newer approved Shalcon runtime/legal changes from deploying.

## Owner cleanup
On 31 Aug 2026 the owner disconnected the Shalcon Git repository from both legacy portfolio projects. Existing portfolio projects/domains were not deleted.

## Verification sequence
1. After the first cleanup pass, `abu-hurera-portfolio-v2` stopped deploying, while `abu_portfolio2` still created deployment `dpl_GsYyGkxJGu2HTURG4FE2KcvJY96m` from Shalcon commit `29dbfe1d9815b4e2c6bbc4334bb8057444d60253`.
2. The owner then disconnected Git specifically from `abu_portfolio2` as well.
3. Controlled verification commit `3d74587df016f38f48f051706d277120116e557a` produced only a single generic Vercel status context; neither `Vercel – abu_portfolio2` nor `Vercel – abu-hurera-portfolio-v2` appeared, and no fresh legacy portfolio deployment was observed from that commit.

**Cleanup status: VERIFIED.** The legacy portfolio Git fan-out is no longer an active Shalcon deployment blocker. The remaining Vercel failure on the verification commit was the independent build-rate-limit condition.

## Guardrail
Do not reconnect `Abuhurerakhan0407/shalcon-intelligence` to any portfolio Vercel project. Only the dedicated `shalcon-intelligence` Vercel project should react to this branch.
