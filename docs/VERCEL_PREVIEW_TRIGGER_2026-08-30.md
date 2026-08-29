# Dedicated Shalcon Vercel Deployment Trigger

Date: 30 Aug 2026

Dedicated Vercel project:
- project: `shalcon-intelligence`
- Vercel project id: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- linked GitHub repo: `Abuhurerakhan0407/shalcon-intelligence`
- tracked production branch: `shalcon-market-ready-2026`

The initial Vercel deployment came from GitHub `main`, which currently contains Abu portfolio code and is therefore not accepted as a Shalcon deployment.

The production branch has now been corrected to `shalcon-market-ready-2026`, and the required lead-persistence environment variables have been configured in Vercel by the owner.

This commit intentionally retriggers Vercel from the correct Shalcon branch after that environment setup.

Do not treat any deployment from `main` as Shalcon production. Verify the deployment metadata reports `githubCommitRef = shalcon-market-ready-2026` before release QA or promotion.
