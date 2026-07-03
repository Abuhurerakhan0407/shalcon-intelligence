import { G } from "../data/content.js";

/**
 * Section wrapper system — enforces consistent section rhythm across the page.
 * - `id`      → anchor id (drives nav scroll + section map, brief §4)
 * - `eyebrow` → the small "› LABEL" mono kicker used on every section
 * - `topBorder` / `background` → per-section chrome matching the source layout
 * - `inner`   → max-width content container (1200px default, matches source)
 *
 * NOTE: scroll-reveal animation hooks are added in Phase 5. This is the
 * static structural shell only.
 */
export default function Section({
  id,
  eyebrow,
  background,
  topBorder = true,
  pad = "clamp(56px,8vw,110px) clamp(20px,5vw,60px)",
  maxWidth = 1200,
  children,
  style = {},
  innerStyle = {},
}) {
  return (
    <section
      id={id}
      style={{
        padding: pad,
        borderTop: topBorder ? `1px solid ${G.border}` : "none",
        background: background || "transparent",
        position: "relative",
        ...style,
      }}
    >
      <div data-reveal style={{ maxWidth, margin: "0 auto", ...innerStyle }}>
        {eyebrow && (
          <div
            className="mono"
            style={{
              color: G.green,
              fontSize: 10,
              letterSpacing: ".2em",
              marginBottom: 14,
            }}
          >
            › {eyebrow}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
