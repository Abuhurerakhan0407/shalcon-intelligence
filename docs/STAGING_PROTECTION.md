# Shalcon staging protection

Status date: 30 Aug 2026

- Vercel project: `shalcon-intelligence`
- Production branch: `shalcon-market-ready-2026`
- Current staging alias: `https://shalcon-intelligence.vercel.app`
- Owner reported enabling **Vercel Authentication → All Deployments** on 30 Aug 2026.
- This setting protects the staging deployment while the custom production domain/legal release is unfinished.
- The repository also contains the global staging response header `X-Robots-Tag: noindex, nofollow` in `vercel.json`; that header must be verified on a successful deployment before it is marked live.
- Do not remove Vercel Authentication until the final public-launch gate is explicitly passed and production indexing is intentionally enabled.

This file is also the single deliberate Git-trigger used after the earlier Hobby build-rate cooldown. Do not create repeated redeploy-only commits if Vercel rate-limits again.
