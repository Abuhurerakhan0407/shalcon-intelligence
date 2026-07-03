# PROJECT_STATE.md — Shalcon Intelligence

Living status doc for the Shalcon Intelligence marketing site. Source of truth for resuming work in a new session. Last updated: end of Phase 7.

## Version control (current)

- **Now a git repository.** `main` branch exists (baseline commit `0a0b3d2` "final build").
- Phase 7 committed on branch **`phase-7-responsive-stabilization`** (commit `2ad03e6` "Phase 7: responsive optimization and mobile stabilization"), branched off `main`. Not yet merged.
- `dist/` is gitignored (build output not tracked).
- Supersedes the earlier "not a git repo" note.

---

## Project goal

Premium B2B marketing site for **Shalcon Intelligence**, an AI automation agency. Dark-luxury aesthetic (black + emerald green), cinematic, high-trust, ROI-driven. Flagship feature = the **Revenue Leak Detector / ROI Calculator** (Phase 6). Migrated from two standalone source files into a componentized Vite + React app.

Authoritative spec: `docs/CLAUDE_CODE_BUILD_BRIEF.md`. Source references (do not ship directly): `source/shalcon_final.jsx`, `source/shalcon_roi_calculator.jsx`.

## Tech stack

- **Build:** Vite 5 (`npm run dev` / `build` / `preview`), ESM, `type: module`.
- **UI:** React 18 (StrictMode).
- **Styling:** Tailwind v4 via `@tailwindcss/vite` + design tokens in `@theme`; heavy use of inline styles + a few hand-written utility/animation classes in `src/index.css`.
- **3D:** THREE.js (imperative, not R3F despite deps) — lazy `crystalScene.js`. `@react-three/fiber` + `drei` are installed but the hero uses a hand-rolled imperative scene.
- **Motion:** GSAP 3 + ScrollTrigger. `framer-motion` installed but not used (GSAP chosen instead).
- **Fonts:** Syne, IBM Plex Mono, Syne Mono (Google Fonts).

## Completed phases

### Phase 2 — Architecture + data extraction
- `src/data/content.js` — all content/config as named exports: `SITE_CONFIG`, `NICHES`, `SERVICES`, `TESTIMONIALS`, `HERO_STATS`, `PLATFORM_STATS`, `LIVE_FEED`, `DEMO_INIT`/`DEMO_RESPONSES`, `ROI_PACKAGES`, `ROI_INDUSTRIES`, `ROI_DEFAULTS`, `ROI_MATH`, and the `G` palette object. **Frozen — do not edit.**
- `src/index.css` — Tailwind import, `@theme` tokens, glass/button/card utility classes, keyframe library, reduced-motion + mobile media queries.

### Phase 3 — Base layout + shared components
- `src/App.jsx` shell; section order: `#hero → #roi-teaser → (#platform-stats) → #industries → #roi-calculator → #services → #how-it-works → #demo → #testimonials → #book → footer`.
- Shared `Section.jsx` wrapper (id, eyebrow, top-border, `data-reveal` inner container).
- Components: `Nav`, `HeroSection`, `ROITeaser`, `IndustriesSection`, `ServicesSection`, `HowItWorks`, `DemoWidget`, `Testimonials`, `CTA`, `Footer`, `GlassCard`, `CursorLight`.
- `#roi-calculator` is currently an anchor + placeholder button (real modal = Phase 6).

### Phase 4 — Hero 3D
- `Hero3D.jsx` renders a CSS gradient/glow fallback always, then upgrades to WebGL after `requestIdleCallback`. Never blocks first paint.
- `three/crystalScene.js` — imperative THREE scene (own rAF loop), disposed on unmount.
- `hooks/useHeroMode.js` — picks `fallback` vs `webgl` (WebGL support, reduced-motion, `hardwareConcurrency < 4`). Initial value always `fallback`.
- **Do not modify Phase 4 files.**

### Phase 5 — Motion + interaction (just completed)
- Lazy motion boot in `App.jsx` `useEffect`: dynamic-imports `scrollReveal + magnetic + countUp`, gated on `prefers-reduced-motion`, cleaned up on unmount.
- `motion/scrollReveal.js` — `gsap.from` opacity/y on `[data-reveal]`, play-once (visible is the natural state, so JS-fail = content still shows).
- `motion/magnetic.js` — `quickTo` transform-only pull (±8px) on `.btn-primary, .btn-ghost, .roi-nav-pill, .niche-tab`. Cards excluded (they own a CSS `:hover` transform).
- `motion/countUp.js` — GSAP ScrollTrigger 0→target on `[data-countup]`, parses value strings, snaps to exact authored string, play-once.
- `components/PlatformStats.jsx` — restored "PLATFORM METRICS" band (was dropped in Phase 3), mounted between ROI teaser and `#industries`. Values animate via count-up.
- `HeroSection.jsx` — HERO_STATS count up 0→seed once on visibility, then existing live tick-up + feed rotation resume; paused off-screen.
- `Nav.jsx` — native smooth scroll + IntersectionObserver scroll-spy (`.nav-link.active`).
- `CursorLight.jsx` — dot + lagging ring; grows/brightens over interactive elements.

### Phase 6 — ROI calculator integration (just completed)
- `components/ROICalculator.jsx` — ported verbatim from `source/shalcon_roi_calculator.jsx`. Only two changes on port: import path (`../src/data` → `../data`) and a new `CONTACT` object (the source referenced `CONTACT.*` in the confirmed phase but never defined it — would ReferenceError; §12.3 sanctions adding it). Internals untouched: `useCountUp`, `formatINR`, `calc→reveal→pricing→capture→confirmed` flow, loss math, glitch/scanline/particle effects.
- `components/ROICalculatorModal.jsx` — full-screen glass overlay wrapper. **CSS-only motion (no framer-motion)** per user decision: backdrop fade+blur, panel opacity/translateY(24)/scale(.96) enter, symmetrical faster exit. X + Escape + click-outside close, body scroll-lock (overflow:hidden → preserves scroll position). Unmount-on-close resets the calculator (no imperative reset needed).
- `App.jsx` — `roiOpen` state; `onOpenROI(e)` gives the clicked trigger a scale-bounce then opens; modal is `React.lazy` + `Suspense`, mounted only while open (§12.5). Placeholder `#roi-calculator` copy finalized; button now opens the real modal.
- `ROITeaser.jsx` — live ticking loss preview from a **generic** `ROI_DEFAULTS` seed (not calculator state), reduced-motion gated, width-reserved (no layout shift); `.roi-sweep` gradient-border highlight.
- `index.css` — Phase 6 block: modal overlay + keyframes, nav pill idle pulse-glow, teaser sweep, `roi-bounce`, all frozen under `prefers-reduced-motion`.
- Modal is code-split into its own chunk (`ROICalculatorModal`, ~8.6 kB gzip) — confirmed absent from the initial bundle.

## Architecture decisions

- **GSAP over framer-motion** for all motion (both installed; framer-motion unused).
- **Imperative THREE**, not R3F — hero scene lives in a ref, fully detached from React reconciliation, so React re-renders never restart/throttle the 3D rAF (protects 3D FPS).
- **Motion is always additive/lazy** — dynamic-imported after mount, never blocks first paint; `gsap.from`-style reveals keep the final/visible state as the default so failures/reduced-motion never hide content.
- **Reduced-motion is a hard gate** — JS motion boot early-returns; CSS media query freezes keyframes/transitions; elements always render real final values.
- **Content is centralized + frozen** in `content.js`; components import, never inline copy.
- **No layout shift** — all animation is transform/opacity or text-only inside fixed grids.

## Files modified in Phase 5

- Created: `src/components/PlatformStats.jsx`, `src/motion/countUp.js`
- Modified: `src/App.jsx`, `src/components/HeroSection.jsx`, `src/motion/magnetic.js`, `src/index.css`
- Pre-existing Phase 5 scaffolding (verified/kept): `src/motion/scrollReveal.js`, `src/components/CursorLight.jsx`, `src/hooks/useReducedMotion.js`, scroll-spy in `Nav.jsx`.

## Remaining phases

### Phase 7 — Responsive optimization + fallbacks (COMPLETED)

**Responsive helpers already implemented** (pre-existing from an earlier unrecorded session):
- Global overflow guards: `html / body / #root` all `overflow-x: hidden`; App root wrapper too.
- Grid-collapse helper classes in `index.css`: `.grid-split`, `.grid-cards-3`, `.grid-cards-4`, `.grid-cards-2`, `.grid-mobile-2`, `.no-scrollbar` — sections keep inline `display:grid`, column counts collapse via breakpoints.
- Desktop-only chrome hidden on mobile via `.hide-m` (hero stats widget, cursor light, timeline connector line).
- Full-screen ROI modal on mobile; ROI calculator has its own `@media(max-width:640px)` 1-col collapse.

**Mobile overflow resolved** — closed this session (CSS-only, `src/index.css`):
- `.grid-cards-4` now collapses to 1 column ≤560px → HowItWorks timeline stacks vertically + footer stacks cleanly (previously stuck 2-up down to 320px, risking clipped text in ~130px cells).
- `body { overflow-wrap: break-word }` + `img { max-width:100%; height:auto }` — long-token / media overflow safety.

**Hero mobile fallback already existed** — `useHeroMode` returns `fallback` (static gradient + CSS glow, no WebGL) when reduced-motion / low-power (`hardwareConcurrency < 4`) / no WebGL; WebGL scene is only 9 shards and defers to `requestIdleCallback`. Cursor-reactive effects already gated on `(hover:hover)`. Left untouched per hard rule (no Phase 4 3D edits).

**Verified breakpoints** (headless Chromium against the production `preview` build, `/tmp/overflow-check.mjs`) — zero horizontal overflow at each:
- 320
- 375
- 414
- 768
- 1024
- 1440

Also 0px overflow with the ROI modal open at 375. Visual clips at 320px confirm no clipped text in timeline / footer / demo.

**Build remains green** — `npm run build` succeeds, **62 modules**, no warnings; code-splitting intact (ROI modal ~8.58 kB gzip stays out of the initial bundle).

### Phase 8 — Performance optimization + QA
- Bundle/code-split review, Lighthouse, cross-browser, final motion/FPS QA, a11y pass.

## Recovery instructions (new session)

1. `cd /root/projects/shalcon-intelligence`; `npm install` if `node_modules` missing.
2. Read `docs/CLAUDE_CODE_BUILD_BRIEF.md` (authoritative) and `CLAUDE.md` (brand context), then this file.
3. Verify baseline: `npm run build` (expect success, ~59 modules) or `npm run dev`.
4. **Hard constraints:** never edit `src/data/content.js`; never modify Phase 4 3D (`Hero3D.jsx`, `three/crystalScene.js`, `hooks/useHeroMode.js`); don't change the Phase 3 section order/layout; keep everything gated on `prefers-reduced-motion`; no layout shift; don't regress 3D FPS.
5. Git repo (see "Version control" at top). `main` = baseline; Phase 7 lives on `phase-7-responsive-stabilization` (unmerged). Branch before committing new work.
6. Work phase-by-phase, validate each, stop for approval before starting the next. **Phase 7 complete — currently awaiting approval to start Phase 8.**
