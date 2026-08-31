# Shalcon Intelligence — Vercel Deployment Runbook

Status date: 31 Aug 2026  
Status: **dedicated Shalcon Vercel project exists and current staging runtime is verified. Do not create a replacement project.**

## 1. Isolation rule
- Dedicated Vercel project: `shalcon-intelligence`
- Project ID: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`
- Production branch: `shalcon-market-ready-2026`
- Current staging alias: `https://shalcon-intelligence.vercel.app`
- Do not deploy Shalcon into any portfolio or other product project.
- Do not switch production back to repository `main` while `main` contains portfolio work.

## 2. Current verified runtime
- Deployment ID: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`
- Runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`
- State: READY / production
- Global staging response header verified live: `X-Robots-Tag: noindex, nofollow, noarchive`
- Owner enabled Vercel Authentication for All Deployments during staging.
- Homepage, Privacy and Terms have been rechecked live with HTTP 200 and expected security/staging headers.

Newer branch commits may update documentation without changing the deployed runtime. Do not redeploy merely to synchronize documentation SHAs.

## 3. Build contract
Current app contract:
- Framework: Vite
- Install: `npm ci` or platform equivalent
- Build: `npm run build`
- Output: `dist`
- Production branch: `shalcon-market-ready-2026`

Before any release-changing deployment:
- GitHub CI green;
- dependency/security gate green;
- marketing-claim guard green;
- lead safety tests green;
- production build green;
- compiled artifact security/performance gate green;
- `vercel.json` valid.

Do not bypass a red gate merely to obtain a deployment.

## 4. Production environment contract
Required server-side values:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Rules:
- never prefix with `VITE_`;
- never expose values in frontend code, screenshots, issues or client docs;
- never paste raw secrets into GitHub;
- rotate the current shared credential immediately before final public/paid launch because the working setup credential was manually transferred during setup;
- after rotation, prove the new secret succeeds and the old secret is rejected.

## 5. Lead-persistence verification — already completed
The current Vercel route has been verified against the dedicated Supabase destination:
- valid deployed lead write → success + durable row;
- destination replay/idempotency behavior verified;
- conflicting replay rejected;
- intentionally invalid destination verifier → Vercel returned `502 lead_persistence_failed` and did not pretend the lead was saved;
- destination restored and successful write retested;
- synthetic QA rows removed afterward.

Do not rerun destructive/failure injection casually. Repeat only when a release-changing integration modification requires it.

## 6. Staging protection
Until final public release:
- keep Vercel Authentication enabled;
- keep global `X-Robots-Tag: noindex, nofollow, noarchive`;
- do not set the temporary `.vercel.app` hostname as canonical;
- keep draft legal pages intentionally protected;
- avoid redeploy-only commits when Vercel Hobby rate limiting is active.

## 7. Final domain cutover
Only after owner controls the final domain and legal/payment gates are ready:
1. attach the final domain to project `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp` only;
2. verify DNS ownership and TLS;
3. choose canonical apex/www host and make the alternate redirect in one hop;
4. add final canonical URL, absolute OG/Twitter metadata, `robots.txt` and `sitemap.xml`;
5. rotate the Vercel→Supabase webhook credential;
6. run final API/contact/browser smoke tests;
7. remove staging Authentication/noindex only as a deliberate public-release action;
8. verify final indexability from the real production hostname;
9. record final release commit + deployment ID in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.

## 8. Final browser/release QA
Minimum after the final domain/secret/indexing change:
- Chromium desktop;
- Chromium mobile viewport;
- Firefox/WebKit-class engine where available;
- keyboard-only estimator/modal flow;
- reduced-motion behavior;
- mobile/constrained WebGL fallback;
- form success/failure/fallback state;
- booking, WhatsApp, email and legal links;
- CSP/security headers;
- canonical/robots/sitemap/social metadata;
- runtime error log check.

## 9. Rollback
Before public promotion, identify the last known-good deployment.

If release regresses:
- restore/rollback to last known-good deployment instead of debugging under live traffic;
- preserve backward compatibility of lead-persistence contract where possible;
- keep staging/noindex protections if rollback returns site to pre-public state;
- document root cause before re-promotion.

## 10. Current blockers
Vercel project creation is **not** a blocker anymore. Remaining Vercel-related release work is intentionally gated by:
- final production domain ownership/control;
- final legal/payment release approval;
- production webhook-secret rotation;
- final deployed cross-browser/domain/API QA;
- deliberate removal of staging protections for public launch.
