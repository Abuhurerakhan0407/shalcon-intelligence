


# SHALCON INTELLIGENCE — DETAILED BUILD BRIEF FOR CLAUDE CODE

Read fully before coding. Do not skip sections.

## MASTER EXECUTION COMMAND

When this brief is provided:

1. Read the entire document fully before making changes
2. Do not skip sections
3. Do not begin coding immediately
4. First analyze existing project files
5. Produce a phased execution plan
6. Wait for user approval before major refactors
7. Execute phase-by-phase
8. After each phase, report progress using the required response format

## STOP CONDITIONS

Immediately stop and ask for clarification if:

- Required files are missing
- Existing code conflicts with this brief
- A major architectural rewrite is required
- Package compatibility issues are detected
- Performance constraints cannot be met



## 0. CONTEXT

Existing file: `shalcon_final_jsx.txt` — single-file React component, inline styles, working site.
Task: rebuild same site with 3D hero, glassmorphism, scroll + cursor animation. Keep all data/copy. Upgrade rendering + motion layer.

Assets provided:
- `shalcon-logo.svg` — vector logo, brand green
- Crystal reference image (1000452197.jpg) — visual reference for 3D hero scene, NOT to be used as a flat image/video. Build geometry inspired by it.
- `shalcon_roi_calculator_jsx.txt` — standalone multi-phase ROI Calculator component. Integrate into main site as a modal (see Section 12). Key feature — highlight it.

---

## 1. SKILLS — invoke explicitly, do not freestyle

- **UI/UX Pro Designer skill** → every layout, spacing, type-scale, color, component-style decision routes through this skill. If skill gives conflicting guidance to this brief, brief wins on data/content, skill wins on visual polish.
- **Context Engineering Expert skill** → use if this build is split into sub-agent tasks (e.g. one agent for 3D scene, one for motion layer, one for layout). Keep each sub-agent's context scoped to only what it needs.
- **Frontend-design skill** (if installed) → design token consistency check before final pass.
- Any installed Three.js/WebGL skill → use for scene construction, not raw guesswork.
- Any installed Framer Motion/GSAP skill → use for motion implementation patterns.

---

## 2. EXISTING DESIGN TOKENS — reuse exactly, do not invent new palette

```js
const G = {
  bg: "#030308", card: "#0A0A14", card2: "#0D0D1A",
  green: "#00FF94", blue: "#00CFFF", amber: "#FF9F00",
  pink: "#FF4FD8", purple: "#A78BFA",
  muted: "#555577", border: "#1A1A2E", white: "#FFFFFF",
};
```

Fonts (Google Fonts, already imported in old file — keep same imports):
```
Syne: 400,600,700,800   -> class "syne" -> headings, buttons
IBM Plex Mono: 300,400,500,600 -> class "mono" -> body/mono text, default body font
Syne Mono -> class "smono" -> stat numbers
```

Niche accent colors (from `NICHES` object — do not change):
```
Healthcare: #00FF94   EdTech: #00CFFF   Insurance: #FF9F00
E-commerce: #FF4FD8   HR: #A78BFA
```

---

## 3. CONTENT — reuse verbatim, zero rewrites

Port these blocks unchanged from old file into new data layer (e.g. `/src/data/content.js`):
`SITE_CONFIG`, `NICHES` (5 entries), `SERVICES` (6 entries), `TESTIMONIALS` (2 entries), `HERO_STATS`, `PLATFORM_STATS`, `LIVE_FEED`, `DEMO_INIT` (chat demo seed data — check old file for this block, section `demo`).

Update only `SITE_CONFIG`:
```js
calendlyLink: "https://calendly.com/shalconintelligence/30min"
whatsappNumber: "919833001193"
linkedinURL: "https://www.linkedin.com/in/shalcon-intelligence-a6b999407"
email: "shalconintelligence@gmail.com"
```

Logo: replace all logo markup (search old file for the spinning-square logo mark, appears in nav + footer) with `shalcon-logo.svg`, tinted `#00FF94`.

---

## 4. SECTION MAP — keep exact order and IDs

```
#hero            — full viewport, 3D crystal scene background
#industries      — 5 niche tabs, pain/solution cards
#roi-calculator  — NEW, featured section, see §12. Placed after industries, before services.
#services        — 6 service cards
#how-it-works  — progress rings, steps
#demo          — live chat demo widget (existing logic, keep)
(testimonials block — no id currently, keep position after demo)
#book          — CTA, green background
footer         — 4-column links
```

---

## 5. EXISTING BEHAVIOR TO PRESERVE (do not regress)

- Custom cursor: already implemented — two elements, dot (11px, green, blur-glow, mix-blend-mode difference) + lagging ring (34px, 130ms ease trail). Keep this system, extend it (see 7.3), don't replace it.
- Niche tab switching (`activeNiche` state) — drives color + content of industries section.
- Live chat demo (`chatMsgs`, `sendChat`, `isTyping`) — keep functional, restyle only.
- Testimonial blur-to-reveal on hover/tap — keep, enhance (see 7.7).
- Animated counters (`counters` state, ticking up) — keep logic, restyle only.
- Mobile menu (`mobileOpen`) — keep functional.
- `.reveal` class scroll-fade-in pattern — replace with GSAP ScrollTrigger equivalent, same visual intent (fade+rise on enter viewport).

---

## 6. TECH STACK — exact packages

```
npm create vite@latest . -- --template react
npm i three @react-three/fiber @react-three/drei
npm i gsap
npm i framer-motion
npm i tailwindcss @tailwindcss/vite
```

File structure:
```
/src
  /components
    Nav.jsx
    Hero3D.jsx          <- WebGL crystal scene
    CursorLight.jsx      <- cursor tracking + light/particle interaction
    GlassCard.jsx        <- reusable glass panel component
    IndustriesSection.jsx
    ServicesSection.jsx
    HowItWorks.jsx
    DemoWidget.jsx
    Testimonials.jsx
    CTA.jsx
    Footer.jsx
    ROICalculatorModal.jsx  <- overlay wrapper, mounts ROICalculator
    ROICalculator.jsx       <- ported from shalcon_roi_calculator_jsx.txt, logic untouched
  /data
    content.js           <- all SITE_CONFIG/NICHES/SERVICES/etc, ported verbatim
  /hooks
    useScrollProgress.js
    useCursorPosition.js
  App.jsx
  main.jsx
  index.css              <- Tailwind + font imports + glass utility classes
```

---

## 7. WOW MOMENTS — exact implementation spec, not vague direction

### 7.1 Hero 3D crystal scene
- Library: `@react-three/fiber` + `@react-three/drei`.
- Geometry: procedural crystal clusters — use `THREE.ConeGeometry` or custom `BufferGeometry` shards (6-8 sided elongated crystals), grouped in clusters of 4-9, scattered along a diagonal band across the viewport (mirrors reference image composition: diagonal crystal chain, black background).
- Material: `MeshStandardMaterial` or `MeshPhysicalMaterial`, emissive `#00FF94`, emissiveIntensity 1.2-1.8, low roughness, slight transmission for glow-through effect.
- Lighting: 1 ambient (low), 2-3 point lights colored `#00FF94`, one following cursor (see 7.3).
- Idle animation: slow group rotation (~0.02 rad/s) + individual shard bob (sine wave, offset per shard so it's not synchronized) — this is the "ambient drift loop."
- Background: pure black `#030308` (matches `G.bg`), matches reference image.
- Performance: instance shards with `InstancedMesh` if count > 30. Cap total shard count ~60-80 for perf.

### 7.2 Scroll-driven camera + section reveal
- Library: GSAP + ScrollTrigger, `scrub: true` tied to hero scroll range only (0 to 100vh of scroll) — camera moves from front-on to slight angled pull-back as user scrolls past hero, crystal scene scales/fades to ~20% opacity and pins behind subsequent sections as ambient backdrop (very subtle, low opacity, not distracting).
- Sections after hero: GSAP ScrollTrigger per section, trigger on `top 80%`, animate `opacity 0->1` + `y: 40->0`, duration 0.8s, ease `power2.out`. Stagger children (cards) by 0.08s.
- Do not use React state + IntersectionObserver for this — use GSAP ScrollTrigger directly, more performant.

### 7.3 Cursor light + crystal interaction
- Extend existing cursor dot/ring (keep as-is, it's already good UI feedback).
- Add: in Hero3D scene, one `THREE.PointLight` position synced to cursor's normalized viewport coords (raycast or simple screen-to-3D projection), color `#00FF94`, intensity 2, distance 8. Nearby shards' emissiveIntensity should respond (brighten within light radius) — achievable via the point light itself if materials are lit correctly, no extra JS needed beyond light position sync.
- Outside hero viewport: cursor dot/ring only (existing behavior), no 3D light (scene not present).

### 7.4 Magnetic buttons
- Apply to: primary CTA buttons (`.btn-primary`), niche tabs, nav CTA.
- Framer Motion: on `onMouseMove`, compute offset from button center, translate button up to 8px toward cursor within a 60px radius, spring back (`type: "spring", stiffness: 150, damping: 15`) on mouse leave.

### 7.5 Niche tab -> scene color sync
- On `activeNiche` change, tween Hero3D's emissive/point-light color from current niche color to new niche color (GSAP `.to()` on a color object, or Framer Motion `animate` on a ref) — only if industries section's local crystal accent (a smaller decorative 3D or SVG element near that section) is present. Do not force-recolor the hero scene from a section lower on the page — keep hero always green, apply color-sync only to any crystal/glow accents within `#industries` section itself.

### 7.6 Stat counters
- Keep existing tick-up logic for `HERO_STATS`/live numbers.
- For `PLATFORM_STATS` (static end values): animate count from 0 to target using GSAP ScrollTrigger trigger + a simple `gsap.to(obj, {value: target, onUpdate...})` tween, fires once when scrolled into view.

### 7.7 Testimonials
- Keep blur-to-reveal (already implemented, works well, don't touch logic).
- Add: `GlassCard` wrapper — on hover, `box-shadow` bloom (`0 0 40px rgba(0,255,148,0.15)`) + `translateY(-4px)`, Framer Motion, 200ms.

---

## 8. GLASSMORPHISM SPEC — exact CSS values

```css
.glass-card {
  background: rgba(10, 10, 20, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
.glass-card:hover {
  border-color: rgba(0, 255, 148, 0.3);
}
```
Use this as base for all cards replacing old `G.card` flat-background cards. Keep `G.border` accent lines for corner-bracket decorative elements already in old design (small L-shaped corner accents seen in progress-ring cards) — glassmorphism doesn't remove those details, layer on top.

---

## 9. RESPONSIVE / PERFORMANCE RULES

- Breakpoint: mobile <768px (matches old file's `.grid-mobile-1` pattern).
- Mobile: replace Hero3D WebGL scene with a lightweight version — reduce shard count to ~20, disable cursor-light point-light sync (mobile has no cursor), keep idle drift animation only. If device has `prefers-reduced-motion` or is detected as low-power (check `navigator.hardwareConcurrency < 4` as rough proxy), fall back further to a static crystal SVG/gradient background, no WebGL canvas at all.
- Custom cursor dot/ring: already hidden on mobile in old file (`hide-m` class) — keep that.
- Target: hero scene <3MB total asset weight, first paint <1.5s on 4G, 3D canvas lazy-mounted (don't block initial HTML paint — show static gradient placeholder, mount Canvas after `requestIdleCallback` or on-load).

---

## 10. WHAT NOT TO DO

- Do not use actual video files — no video generation, no video element for hero.
- Do not rewrite any copy in NICHES/SERVICES/TESTIMONIALS.
- Do not change color palette or introduce new brand colors.
- Do not remove existing working features (chat demo, custom cursor, counters, testimonial reveal) — extend, don't replace.
- Do not skip mobile fallback — WebGL scene must degrade gracefully, never crash or freeze on low-end devices.

---

## 12. ROI CALCULATOR — key feature, integrate as nav-triggered modal

Decision: no new page, no route change. Trigger from nav. Open as full-screen glass overlay modal on top of current page.

### 12.1 Placement
- Add nav item: **"Calculate My ROI"** — styled distinct from other nav links (filled pill button, `G.green` background, `G.bg` text, pulse-glow animation on idle to draw eye — this is the highlighted key feature).
- Same button repeated once more inline: place a compact teaser block right after Hero section (before `#industries`) — small glass card, headline like "See what you're losing daily," live ticking loss-counter preview (use a generic default industry average, not tied to calculator's state), button "Calculate Exact Number →" — opens same modal.
- Both entry points open identical modal. No duplicate logic.

### 12.2 Modal behavior
- Component: `ROICalculatorModal.jsx` wraps `ROICalculator.jsx` (ported unchanged from `shalcon_roi_calculator_jsx.txt`).
- Framer Motion `AnimatePresence` — backdrop fade-in (`opacity 0->1`, 250ms) + modal scale/slide-in (`scale 0.95->1, y: 20->0`, 350ms, `ease: [0.16,1,0.3,1]`).
- Backdrop: `rgba(3,3,8,0.85)` + `backdrop-filter: blur(8px)` — page content visible/blurred behind, reinforces glassmorphism theme.
- Modal container: full-screen on mobile, max-width 960px centered with glass border on desktop (`.glass-card` styling from Section 8, but higher opacity background `rgba(10,10,20,0.92)` — content must stay fully readable, don't over-blur internal calculator).
- Close: X button top-right, `Escape` key, click outside modal (not inside).
- Body scroll lock while modal open (`overflow: hidden` on `<body>`, restore on close).
- On close mid-flow: reset `ROICalculator` internal phase state back to `"calc"` — don't persist stale form data if reopened (matches its own existing `reset()` function — call it on modal close).

### 12.3 Data — keep 100% unchanged
- Do not touch: `PACKAGES`, `INDUSTRIES`, `useCountUp`, `formatINR`, phase logic (`calc -> reveal -> pricing -> capture -> confirmed`), loss calculations, glitch/scanline effects, particle effects. This component already works — port as-is into new file, only change wrapper/mounting, not internals.
- Update only `CONTACT` object inside `ROICalculator.jsx` to match main site's real contact info (same values as `SITE_CONFIG` in Section 3):
```js
const CONTACT = {
  whatsapp: "919833001193",
  calendly: "https://calendly.com/shalconintelligence/30min",
  email: "shalconintelligence@gmail.com",
};
```

### 12.4 Visual highlight treatment (this is the key feature — make it feel like one)
- Nav button: idle pulse-glow, `box-shadow: 0 0 0 rgba(0,255,148,0.4)` animating to `0 0 20px rgba(0,255,148,0.6)` and back, 2.5s loop, `ease-in-out`.
- Hero teaser card: border uses animated gradient sweep (`G.green` -> transparent -> `G.green`, moving along border, 3s loop) — subtle, not distracting, signals "special."
- On modal open: brief haptic-style feedback via scale-bounce on trigger button (`scale 1 -> 0.95 -> 1`, 150ms) before modal animates in.

### 12.5 What NOT to do here
- Do not turn this into a separate route/page (`/roi-calculator`) — stays same-page modal.
- Do not rewrite calculator's internal copy, math, or phase flow.
- Do not let modal break scroll position of main page — restore exact scroll position on close.
- Do not load `ROICalculator.jsx` code until nav button first clicked — lazy-load the component (`React.lazy` + `Suspense`) to keep initial page weight down.

---

## 11. DELIVERABLE / DONE CRITERIA

- All original copy present, byte-identical.
- Real Calendly/WhatsApp/LinkedIn/email links functional.
- Hero: 3D crystal scene live, idle drift animation running, cursor light interaction working on desktop.
- Scroll: sections reveal via ScrollTrigger, hero scene pulls back/fades as user scrolls past it.
- Buttons: magnetic hover working on primary CTAs.
- Mobile: lightweight fallback confirmed working, no jank, no crash.
- Lighthouse performance score >75 mobile, >90 desktop.


# CLAUDE CODE BUILD BRIEF OPTIMIZATION SUGGESTIONS

These suggestions are intended to improve execution quality, instruction reliability, context retention, and reduce hallucinations when Claude Code processes large technical build briefs.

---

## 1. INSTRUCTION PRIORITY HIERARCHY (HIGHLY RECOMMENDED)

Large build briefs often contain many constraints, technical requirements, design rules, and implementation details. When instructions conflict, Claude needs a clear priority order to resolve conflicts correctly.

Add this near the top of the build brief:

```md
INSTRUCTION PRIORITY (highest → lowest)

1. Do not break existing working logic
2. Preserve all existing copy, data, and business logic exactly
3. Follow explicit technical and architectural specifications in this build brief
4. Maintain performance, responsiveness, and accessibility requirements
5. Improve visual polish, UX quality, and code quality where unspecified
6. Make autonomous implementation decisions only when no explicit instruction exists


Before writing any code, do NOT begin implementation immediately.

First perform the following:

1. Analyze the existing codebase completely
2. Identify architecture constraints and dependencies
3. Detect risky refactors or migration points
4. Identify missing files or ambiguous requirements
5. Produce a structured implementation plan

Only begin coding after planning is complete.
If major architecture changes are required, stop and request approval first.

Execution Mode: PHASED BUILD

Do not attempt full implementation in a single pass.

Build in phases:

Phase 1 — Project analysis and migration strategy
Phase 2 — Architecture setup and data extraction
Phase 3 — Base layout and shared components
Phase 4 — Hero 3D implementation
Phase 5 — Motion and interaction systems
Phase 6 — ROI calculator integration
Phase 7 — Responsive optimization and fallbacks
Phase 8 — Performance optimization and QA

Complete one phase fully before proceeding to the next.
Validate each phase before moving forward.

Anti-Hallucination Rules

- Never assume a file exists
- Never assume component APIs without inspecting them
- Never reference variables, functions, or assets without verification
- Always inspect project files before using them
- If a required file is missing, stop and ask for clarification
- If ambiguity exists, ask instead of guessing

Context Discipline Rules

Use only context relevant to the current subtask.
Avoid loading unnecessary files into active context.
When working on isolated components, limit context to only required dependencies.

File Verification Protocol

Before implementation, verify presence and contents of all referenced files including:

- shalcon_final_jsx.txt
- shalcon_roi_calculator_jsx.txt
- shalcon-logo.svg
- reference assets
- existing data files

If any file differs from expectations, report mismatch before coding.

Change Safety Rules

- Prefer incremental refactors over destructive rewrites
- Preserve working features unless explicitly replacing them
- Validate critical features after each phase
- Avoid introducing regressions during visual upgrades

Implementation Decision Rule

If implementation details are unspecified:

1. Choose the simplest robust solution
2. Prefer maintainability over cleverness
3. Favor performance-aware approaches
4. Keep decisions consistent with project architecture

Pre-Delivery Self Check

Before marking task complete, verify:

- Original copy unchanged
- Existing logic preserved
- All required sections implemented
- Performance constraints satisfied
- Mobile fallback works
- No console errors
- No broken imports
- No missing assets

Response Format Rules

For each phase provide:

1. What was analyzed
2. What changed
3. Risks / blockers
4. Next phase plan



