# Shalcon Intelligence — Domain + SEO Release Gate

Status date: 31 Aug 2026

Status: metadata foundation exists; live staging is intentionally protected from indexing; final canonical/social/sitemap release requires owner control of the production domain plus legal/payment/release approval.

## 1. Current staging state
Live alias: `https://shalcon-intelligence.vercel.app`

Verified on 31 Aug 2026:
- homepage HTTP 200;
- Privacy HTTP 200;
- Terms HTTP 200;
- global `X-Robots-Tag: noindex, nofollow, noarchive` present;
- Vercel Authentication enabled for All Deployments during staging;
- `/api/lead` GET correctly returns 405 / `Allow: POST`;
- durable lead persistence is already deployed and verified.

The homepage source still contains `meta robots=index,follow`, but the stronger staging response header intentionally prevents indexing until final release. Do not remove that response header merely to make source metadata look consistent before launch gates pass.

## 2. Current metadata foundation
Site already contains:
- descriptive title;
- meta description;
- Open Graph title/description/type;
- Twitter summary-card metadata;
- responsive viewport;
- language declaration.

Do not invent a canonical hostname before owner controls the production domain.

## 3. Recommended domain
Latest connected Vercel recheck on 31 Aug 2026:
- `shalconintelligence.com` — available at $11.25/year — recommended;
- `shalcon.io` — $30/year;
- `shalcon.ai` — $160/2 years.

Availability/pricing can change. Recheck immediately before purchase. No purchase occurs without explicit owner approval.

## 4. Production-domain decisions
Before SEO cutover confirm:
- final owned domain;
- canonical host: apex or `www`;
- HTTPS active;
- single-hop redirect from non-canonical host;
- domain attached only to dedicated Shalcon Vercel project `prj_AZBIuv6c0uJmR4AF8SStuzGB2Dzp`;
- production branch remains `shalcon-market-ready-2026`;
- no portfolio/other product is attached to the hostname.

Preferred default if `shalconintelligence.com` is purchased: canonical apex `https://shalconintelligence.com/` and redirect `www` to apex, unless owner deliberately chooses otherwise.

## 5. Metadata to finalize after domain exists
Add/verify:
- canonical link;
- `og:url`;
- absolute `og:image`;
- `twitter:image`;
- production favicon/assets;
- `sitemap.xml` using canonical host only;
- production `robots.txt`;
- appropriate Organization/ProfessionalService structured data using verified business/contact facts only.

Do not put unverified registration/tax/legal claims into structured data.

## 6. Social preview asset
Use the real Shalcon brand asset; never substitute a generated/reinterpreted logo.

Recommended preview:
- 1200×630;
- exact Shalcon logo/wordmark where used;
- concise `AI Front Desk + Lead Operations Systems` message;
- Healthcare-first support line;
- readable, high-contrast composition.

Production image URL must be absolute and publicly accessible without staging authentication after release.

## 7. Public-indexing gate
Do not actively index/submit the production site until:
- owner/legal review of Privacy/Terms/core risk positions is complete;
- payment path is ready enough for paid work/public acquisition;
- final domain points to correct Shalcon project;
- unsupported claims remain absent;
- lead persistence remains healthy;
- production webhook credential has been rotated after infrastructure freeze;
- final domain/API/cross-browser QA passes;
- owner deliberately approves public release.

Controlled founder-led one-to-one outreach can begin earlier once the correct Shalcon sender and explicit send authorization exist; public SEO indexing is a separate gate.

## 8. Final release sequence
1. owner purchases/controls final domain;
2. attach domain and verify DNS/TLS/redirects;
3. add canonical/social/robots/sitemap metadata while staging protection remains active;
4. rotate Vercel→Supabase webhook credential and prove new succeeds/old fails;
5. clean synthetic rotation QA data;
6. run final Chromium + Firefox/WebKit-class smoke, mobile/desktop/accessibility/contact/API checks;
7. verify legal/payment release gates;
8. deliberately disable staging Authentication/noindex protections;
9. confirm public homepage and canonical host are indexable as intended;
10. validate `robots.txt`, sitemap, canonical, OG/Twitter URLs from public network state;
11. record final commit/deployment/domain evidence in `docs/LAUNCH_GATE.md` and `PROJECT_STATE.md`.

## 9. Search-intent pages — later, evidence-led
Do not create dozens of thin generic SEO pages before message-market fit.

After qualified sales conversations reveal real search/use-case language, prioritize a few useful workflow pages, for example:
- AI front desk for clinics;
- clinic WhatsApp intake + follow-up automation;
- multi-location clinic lead routing;
- admissions intake + follow-up automation.

Each page should describe a real workflow, constraints and human-control boundary—not keyword-stuffed “AI automation agency in [city]” pages.

## 10. Technical verification after cutover
- canonical URL → 200;
- alternate host → one-hop canonical redirect;
- Privacy/Terms → 200;
- CSS/JS/assets load under CSP;
- OG image publicly reachable;
- no `.vercel.app` preview/staging URL used as canonical;
- sitemap contains production URLs only;
- `robots.txt` intentionally permits/blocks exactly what release requires;
- response `X-Robots-Tag` no longer accidentally blocks production after release;
- mobile layout remains valid;
- contact/booking/API flows work;
- no new production error/fatal logs;
- search inspection/Lighthouse can run against real public hostname.

## 11. Current blocker
Final SEO/canonical cutover is intentionally blocked by owner domain purchase/control plus final legal/payment/release approval—not by missing lead persistence or missing Vercel/Supabase infrastructure.
