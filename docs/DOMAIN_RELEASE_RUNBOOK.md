# Shalcon Intelligence — Domain + SEO Release Runbook

Status date: 30 Aug 2026

Recommended production domain: `shalconintelligence.com`

Latest connected availability check on 30 Aug 2026:
- `shalconintelligence.com` — available — $11.25/year
- `shalcon.io` — available — $30/year
- `shalcon.ai` — available — $160/2 years

Do not purchase without owner approval. Recheck immediately before purchase.

## Before purchase
- Keep Vercel Authentication on for all deployments while staging.
- Keep global `X-Robots-Tag: noindex, nofollow, noarchive` in `vercel.json` until final public release.
- Do not publish a canonical URL pointing at the temporary `.vercel.app` hostname.

## After owner controls the domain
1. Attach `shalconintelligence.com` to the dedicated Vercel project `shalcon-intelligence` only.
2. Verify DNS ownership and TLS.
3. Prefer `https://shalconintelligence.com` as canonical origin unless owner explicitly chooses `www`.
4. Redirect the alternate host (`www` ↔ apex) permanently to the canonical origin.
5. Add absolute canonical metadata to the homepage.
6. Add absolute `og:url` and share-image URLs.
7. Add/update `robots.txt` and `sitemap.xml` for the final public origin.
8. Remove the global staging `X-Robots-Tag` only after legal/payment/release gates are approved.
9. Change homepage robots metadata from staging-safe to `index,follow` only in the same final-release change.
10. Leave Privacy/Terms indexing policy deliberate; do not accidentally publish draft banners.
11. Verify redirects, TLS, response headers, canonical URL, robots, sitemap and social metadata from the deployed domain.
12. Re-run `/api/lead` success/failure smoke after domain cutover.
13. Re-check booking, WhatsApp, email and legal links from the final domain.

## HSTS rule
Do not intentionally add an aggressive custom HSTS/preload policy until the final domain/subdomain strategy is stable and HTTPS is confirmed everywhere. Vercel may send platform HSTS on its own domains; do not treat that as owner approval to preload the final custom domain.

## Release evidence required
- domain ownership/control confirmed;
- correct Vercel project association;
- TLS valid;
- canonical host redirects correct;
- no staging auth accidentally left on after deliberate public release;
- robots/indexing state intentionally changed from staging to production;
- sitemap uses final canonical origin;
- final release commit/Deployment ID recorded in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.
