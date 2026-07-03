import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * initCountUp — count-from-zero on scroll for PLATFORM_STATS (brief §7.6,
 * Phase 5 §5). Every `[data-countup="<value>"]` element animates 0 → target
 * once as it enters the viewport, then snaps to the EXACT original string.
 *
 * The raw display value (e.g. "1,247+", "99.97%", "< 2min") is parsed into
 * {prefix, target, suffix, decimals, thousands} so mixed-format metrics animate
 * correctly. Values whose remainder still contains a digit (e.g. "24/7") are
 * left static — there is no single number to tween, so we never mangle them.
 *
 * Tween writes textContent only (no width reservation change beyond the digits
 * already sized by the final value) → no layout shift, transform-free, cheap.
 * Fires once (toggleActions play-once). Caller must skip under
 * prefers-reduced-motion so the React-rendered final value simply stays put.
 *
 * @returns {() => void} cleanup killing every trigger/tween created.
 */
function parseValue(raw) {
  // prefix (non-digits) → number (with optional , thousands and . decimals) → suffix
  const m = String(raw).match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  // A digit left in the suffix means a second number (e.g. "24/7") — don't animate.
  if (/\d/.test(suffix)) return null;
  const thousands = numStr.includes(",");
  const clean = numStr.replace(/,/g, "");
  const dot = clean.indexOf(".");
  const decimals = dot === -1 ? 0 : clean.length - dot - 1;
  const target = parseFloat(clean);
  if (!Number.isFinite(target)) return null;
  return { prefix, target, suffix, decimals, thousands };
}

function format(val, meta) {
  let s =
    meta.decimals > 0 ? val.toFixed(meta.decimals) : String(Math.round(val));
  if (meta.thousands) {
    const parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    s = parts.join(".");
  }
  return meta.prefix + s + meta.suffix;
}

export function initCountUp(root = document) {
  const els = Array.from(root.querySelectorAll("[data-countup]"));
  const tweens = [];

  els.forEach((el) => {
    const raw = el.getAttribute("data-countup");
    const meta = parseValue(raw);
    if (!meta) return; // non-numeric (e.g. "24/7") — leave the rendered value alone

    const proxy = { v: 0 };
    el.textContent = format(0, meta);

    const tween = gsap.to(proxy, {
      v: meta.target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = format(proxy.v, meta);
      },
      // Snap to the exact authored string so formatting is always pixel-perfect.
      onComplete: () => {
        el.textContent = raw;
      },
    });
    tweens.push(tween);
  });

  ScrollTrigger.refresh();

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
  };
}
