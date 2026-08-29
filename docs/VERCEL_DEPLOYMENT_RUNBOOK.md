# Shalcon Intelligence — Vercel Deployment Runbook

Status: deployment-ready procedure; dedicated Shalcon Vercel project not yet created/bound.

## 1. Isolation rule
Do not deploy Shalcon into an Abu portfolio project or another product project.

The existing GitHub repository's `main` branch currently contains portfolio work, so a Vercel project created from this repository must explicitly use `shalcon-market-ready-2026` as its production branch until Shalcon has a dedicated repository/default branch.

Never assume Vercel will choose the correct branch automatically.

## 2. New project configuration
Create one Vercel project dedicated to Shalcon.

Recommended project name: `shalcon-intelligence` if available.

Required settings:
- Framework: Vite / auto-detected.
- Install: `npm ci` or platform equivalent.
- Build: `npm run build`.
- Output: `dist`.
- Node: 22-compatible runtime/build environment.
- Production branch: `shalcon-market-ready-2026` while repository `main` remains portfolio content.

Do not connect a custom domain until preview verification passes.

## 3. Environment variables
Required server-side production/preview values after lead persistence exists:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_SECRET`

Rules:
- never prefix either with `VITE_`;
- do not expose values to browser/client builds;
- use separate preview/production destinations or secrets if environments need isolation;
- rotate the secret if accidentally logged/exposed.

## 4. Pre-deployment source gate
Before deploying a commit:
- current branch CI is green;
- npm security audit gate passes;
- marketing claim guard passes;
- lead safety tests pass;
- production build passes;
- compiled-artifact security/performance gate passes;
- `vercel.json` validates.

Do not bypass a red gate just to obtain a preview URL.

## 5. Preview verification — no lead destination yet
A preview can be created before persistence is configured to verify fail-closed behavior.

Expected result:
- site renders correctly;
- booking/WhatsApp/email work;
- estimator works;
- audit form submission receives a safe `lead_capture_not_configured` failure;
- UI does **not** show saved confirmation;
- direct booking/WhatsApp fallback remains visible.

This preview is not ready for paid traffic.

## 6. Preview verification — with lead destination
After environment variables are configured:
1. submit synthetic lead;
2. verify exactly one durable row exists;
3. verify schema v2 fields + consent evidence;
4. verify idempotency behavior at destination;
5. deliberately fail/disable persistence and submit again;
6. verify website displays failure, not success;
7. restore persistence and retest;
8. verify no secret in page source/client bundle/browser-visible variables;
9. verify booking, WhatsApp and email;
10. verify privacy + terms pages;
11. review function/runtime logs for unhandled errors.

## 7. Browser QA on deployed preview
Minimum:
- Chromium desktop;
- Chromium/mobile responsive viewport;
- one additional browser engine/class where tooling permits;
- keyboard-only estimator modal;
- reduced-motion mode;
- constrained/mobile fallback (no decorative WebGL load on small screens);
- form error/success/fallback states.

Record the preview deployment/commit used for the release decision.

## 8. Security headers
`vercel.json` currently defines the baseline headers. Verify them on the deployed URL, not just JSON syntax.

Check at minimum:
- CSP;
- `X-Content-Type-Options`;
- `X-Frame-Options` / frame-ancestors behavior;
- Referrer Policy;
- Permissions Policy.

If a required production analytics/integration domain is added later, update CSP narrowly; do not replace it with a wildcard.

## 9. Domain cutover
Only after preview gate passes:
1. add the approved Shalcon production domain;
2. choose canonical host (`www` vs apex);
3. redirect the non-canonical host consistently;
4. update canonical/OG metadata to the production URL;
5. generate/finalize sitemap using that host;
6. verify HTTPS;
7. rerun contact + estimator tests on the real domain;
8. verify search metadata/robots.

## 10. Rollback
Before first production promotion, identify the last known-good deployment.

If production regresses:
- restore/rollback to the last known-good deployment rather than debugging live under traffic;
- keep lead persistence schema backward-compatible with the previous website contract where possible;
- document incident/root cause before re-promoting.

## 11. Current blocker
The connected Vercel account does not currently expose a dedicated Shalcon project through the available project list. Creating/binding the correct project must not risk another project or the portfolio. This remains an owner/account-level deployment step until a dedicated project can be explicitly created/selected.
