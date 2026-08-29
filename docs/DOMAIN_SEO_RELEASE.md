# Shalcon Intelligence — Domain + SEO Release Gate

Status: metadata foundation exists; final canonical/absolute social metadata requires the production domain.

## 1. Current metadata
The site already contains:
- descriptive title;
- meta description;
- Open Graph title/description/type;
- Twitter summary card metadata;
- responsive viewport;
- language declaration.

Do not invent a canonical hostname before the owner approves/attaches the production domain.

## 2. Production-domain decisions
Before SEO cutover confirm:
- exact production domain;
- canonical host: apex or `www`;
- HTTPS active;
- redirect from non-canonical host;
- no old portfolio/product site attached to that domain;
- correct Vercel project receives the domain.

## 3. Metadata to finalize after domain exists
Add/verify:
- `<link rel="canonical" href="https://.../">`;
- `og:url`;
- absolute `og:image`;
- `twitter:image`;
- Organization/ProfessionalService JSON-LD using verified contact/business details only;
- production favicon/assets;
- `sitemap.xml` with canonical host;
- `robots.txt` appropriate for production.

Do not put unverified legal-entity information into structured data.

## 4. Social preview asset
Use the real Shalcon brand asset. Do not substitute a generated logo.

Recommended social preview composition:
- 1200×630;
- Shalcon wordmark/logo;
- concise line such as “AI Front Desk + Lead Operations Systems”;
- healthcare-first supporting line;
- high contrast and readable at small preview sizes.

The image URL must be absolute in production metadata.

## 5. Indexing gate
Do not actively submit/index the production site until:
- privacy/terms final review is complete;
- contact paths work;
- lead form is either fully durable or deliberately disabled/clearly fail-closed;
- unsupported claims remain absent;
- production domain points to the verified Shalcon deployment.

## 6. Search-intent pages — later, evidence-led
Do not create dozens of generic SEO pages before message-market fit.

After qualified sales conversations reveal real search/use-case language, prioritize a small number of useful pages such as:
- AI front desk for clinics;
- clinic WhatsApp intake + follow-up automation;
- multi-location clinic lead routing;
- admissions intake + follow-up automation for coaching/EdTech.

Each page should describe a real workflow and human-control boundary rather than thin “AI automation agency in [city]” keyword pages.

## 7. Technical verification after domain cutover
- canonical resolves with 200;
- canonical host redirect is single-hop;
- privacy/terms return 200;
- CSS/JS/assets return correctly under CSP;
- OG image accessible without auth;
- no preview/staging URL used as canonical;
- sitemap uses only production URLs;
- robots file does not accidentally block production;
- mobile viewport/layout remains valid;
- Lighthouse/search inspection can run against real production host.

## 8. Current blocker
The production domain has not been confirmed/attached in the current Shalcon deployment flow. Final canonical/social/sitemap metadata is intentionally blocked rather than guessing the hostname.
