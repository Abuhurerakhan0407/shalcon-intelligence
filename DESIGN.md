# Abu Hurera Portfolio — Design System

## Surface mode
Experience + Persuade. The portfolio should feel authored and memorable, but visitors must understand the work before noticing the effects.

## Visual thesis
A dark, minimal operating-system aesthetic where **information visibly moves through connected systems**. Motion represents routing, context, handoff, progress and cause/effect. Avoid decorative animation that does not reinforce this idea.

## Design locks
- Background: near-black `#030308`
- Primary accent: signal green `#00ff8a`
- Typography: Syne for display, Manrope for reading, IBM Plex Mono for metadata
- Radius family: 11–28px; pills reserved for tags/status
- No fake client metrics, fake testimonials, fake activity feeds or fake terminal logs
- Humor/personality stays secondary to clarity

## Motion roles
### Framer Motion
Use for local component state, entry springs, cursor physics, button magnetism and lightweight React transitions.

### GSAP + ScrollTrigger
Use for scroll-linked storytelling only:
- hero depth and spotlight drift
- masked section-heading reveals
- orchestration path drawing and node staging
- project-story depth
- business-event signal travel
- process progress line
- closing CTA lamp resolution

Never animate the same transform on the same element with both engines.

## Motion timing
- feedback: 100–180ms
- routine component state: 180–300ms
- layout/view transition: 300–500ms
- authored focal entrance: 500–850ms
- scroll-linked sequences: scrubbed, spatially restrained, reversible
- preferred ease: `power3.out` / `cubic-bezier(0.16, 1, 0.3, 1)`
- no bounce/elastic by default

## Responsive rules
- `html`, `body`, `#root`, `main` never exceed the viewport width
- no page-level horizontal scrolling at any breakpoint
- animated elements may visually extend only inside clipped local containers
- desktop: sticky project storytelling and richer parallax
- mobile: stacked projects, shorter travel, no custom cursor, no hover-only information
- target touch controls >= 44×44px
- all major motion has a `prefers-reduced-motion` path

## Performance rules
- transform + opacity first
- no layout-property animation (`width`, `height`, `left`, `top`) for choreography
- WebGL only if a future visual genuinely needs it
- keep recurring loops low-cost and pause/disable them where motion preference or pointer type demands it
- run production build and responsive QA before deployment
