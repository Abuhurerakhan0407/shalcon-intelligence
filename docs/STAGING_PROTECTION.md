# Shalcon staging protection

Status date: 31 Aug 2026

## Current verified state
- Vercel project: `shalcon-intelligence`
- Project ID: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- Production branch: `shalcon-market-ready-2026`
- Current staging alias: `https://shalcon-intelligence.vercel.app`
- Verified deployed runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- Verified deployment: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- Live response header: `X-Robots-Tag: noindex, nofollow, noarchive`
- Homepage, Privacy and Terms were rechecked on 31 Aug 2026 and returned HTTP 200 with staging noindex protection.
- Owner enabled **Vercel Authentication → All Deployments** as additional staging protection.

## Rules
- Keep the global staging `X-Robots-Tag` in `vercel.json` until the deliberate final public release.
- Do not disable Vercel Authentication as part of routine documentation/deployment work.
- Do not publish a temporary `.vercel.app` canonical URL.
- Do not remove draft legal-page protections before owner/legal approval.
- Do not create redeploy-only commits merely to chase documentation changes or Hobby build-rate status.

## Final-release removal sequence
Only after domain ownership, legal/payment gates and final infrastructure freeze:
1. attach/verify the final production domain;
2. rotate the Vercel→Supabase webhook credential and prove new-secret success + old-secret rejection;
3. run final deployed cross-browser/release QA;
4. remove staging authentication/noindex controls deliberately;
5. verify production robots/canonical/sitemap/social metadata;
6. record final commit and deployment evidence in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.
