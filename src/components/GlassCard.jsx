/**
 * GlassCard — reusable glass panel (brief §8).
 * Base styling lives in .glass-card (index.css). This wrapper lets any
 * section drop in a consistent glass surface with optional padding/style
 * overrides. Hover bloom + motion are layered on in Phase 5 — not here.
 */
export default function GlassCard({
  as: Tag = "div",
  className = "",
  style = {},
  padding = "28px 26px",
  children,
  ...rest
}) {
  return (
    <Tag
      className={`glass-card ${className}`.trim()}
      style={{ padding, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
