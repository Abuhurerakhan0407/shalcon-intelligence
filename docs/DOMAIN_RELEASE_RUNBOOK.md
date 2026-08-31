# Shalcon Intelligence — Domain + SEO Release Runbook

Status date: 31 Aug 2026

Recommended production domain: `shalconintelligence.com`.

Latest connected availability recheck on 31 Aug 2026:
- `shalconintelligence.com` — available — $11.25/year;
- `shalcon.io` — available — $30/year;
- `shalcon.ai` — available — $160/2 years.

Availability/pricing can change. Recheck immediately before purchase. Do not purchase without explicit owner approval.

## Current staging state
Dedicated Vercel project:
- project: `shalcon-intelligence`;
- project ID: `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`;
- production branch: `shalcon-market-ready-2026`;
- live staging alias: `https://shalcon-intelligence.vercel.app`;
- verified runtime commit: `8f3ee67bb3889e7c05dfd35b27f3d9b361a51166`;
- deployment: `dpl_FcRYobZDc1NzBhfWMTWdYYmz1JiC`.

Verified staging protection:
- Vercel Authentication enabled for All Deployments;
- live `X-Robots-Tag: noindex, nofollow, noarchive`;
- homepage/Privacy/Terms return HTTP 200;
- durable lead persistence already deployed and verified.

Do not create a new Vercel project or point the final domain at `main`.

## Before purchase / cutover
- keep Vercel Authentication on;
- keep global staging `X-Robots-Tag` in `vercel.json`;
- do not publish `.vercel.app` as canonical;
- keep Privacy/Terms draft/indexing state deliberate;
- keep current lead endpoint/persistence healthy;
- complete owner/legal and payment-release preparation as applicable.

## After owner controls the domain
1. Attach the final domain only to Vercel project `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`.
2. Confirm production branch remains `shalcon-market-ready-2026`.
3. Verify DNS ownership and TLS.
4. Prefer `https://shalconintelligence.com/` as canonical origin unless owner deliberately chooses `www`.
5. Configure one-hop permanent redirect from alternate host to canonical host.
6. Add canonical URL to homepage.
7. Add absolute `og:url`, `og:image` and `twitter:image`.
8. Add/update production `robots.txt` and `sitemap.xml` using canonical origin only.
9. Add only verified business/contact structured data.
10. Keep staging Authentication/noindex active while the release is still being assembled.

## Production credential rotation — before public release
After domain/infrastructure is stable and before staging protections are removed:
1. generate/approve a new Vercel→Supabase shared credential through owner-controlled secret handling;
2. update destination + Vercel configuration without exposing raw values;
3. verify new credential succeeds end-to-end;
4. verify old credential is rejected;
5. delete any synthetic rotation-test lead;
6. record only non-secret evidence in release docs.

Follow `docs/WEBHOOK_SECRET_ROTATION_RUNBOOK.md`.

## Final deployed QA
With final domain + rotated credential still staging-protected, verify:
- canonical homepage → 200;
- alternate host → single-hop canonical redirect;
- TLS valid;
- Privacy/Terms → 200;
- CSS/JS/assets work under CSP;
- booking/WhatsApp/email/legal links work;
- `/api/lead` method restrictions remain correct;
- synthetic valid POST persists exactly once;
- destination failure remains fail-closed if a safe non-destructive check is warranted;
- synthetic QA row removed;
- desktop Chromium smoke;
- mobile Chromium viewport;
- Firefox/WebKit-class smoke where available;
- keyboard/reduced-motion/accessibility smoke;
- canonical/OG/Twitter/robots/sitemap all use final domain;
- no staging `.vercel.app` URL appears as canonical;
- production runtime error/fatal logs remain clean.

Do not casually repeat destructive production failure injection if the persistence contract has not changed.

## Public-release action
Only when domain, legal, payment and final-QA gates pass and owner approves public release:
1. remove/disable Vercel staging Authentication deliberately;
2. remove global staging `X-Robots-Tag: noindex, nofollow, noarchive`;
3. ensure homepage robots intent is `index,follow`;
4. keep Privacy/Terms indexing decision deliberate and consistent with approved legal pages;
5. deploy/verify release;
6. confirm public hostname requires no auth;
7. confirm response headers no longer block intended production indexing;
8. confirm `robots.txt` + sitemap + canonical work publicly;
9. record final release commit, deployment ID and domain evidence in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.

## HSTS rule
Do not intentionally add an aggressive custom HSTS/preload policy until final domain/subdomain strategy is stable and HTTPS is confirmed everywhere. Platform HSTS on Vercel-owned domains does not itself authorize preload of the custom domain.

## Rollback rule
Identify the last known-good production deployment before public release. If final release regresses:
- roll back/restore known-good deployment rather than debugging under live acquisition traffic;
- preserve lead-persistence compatibility;
- restore staging/noindex protections if the site returns to a non-public review state;
- document root cause before re-promotion.

## Release evidence required
- owner domain ownership/control;
- correct Vercel project association;
- TLS valid;
- canonical redirect correct;
- rotated credential evidence without secret disclosure;
- final browser/API smoke pass;
- staging auth/noindex deliberately removed;
- intended production indexing verified;
- sitemap/canonical/social metadata use final origin;
- final release commit/deployment ID recorded.
