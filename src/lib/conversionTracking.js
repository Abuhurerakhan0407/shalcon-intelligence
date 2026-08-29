const SAFE_DETAIL_KEYS = new Set(["industry", "packageName", "code", "surface"]);

function clean(value, max = 160) {
  return String(value ?? "").trim().slice(0, max);
}

function safeReferrer() {
  if (typeof document === "undefined" || !document.referrer) return "";
  try {
    const url = new URL(document.referrer);
    if (!/^https?:$/.test(url.protocol)) return "";
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return "";
  }
}

function context() {
  if (typeof window === "undefined") return {};
  try {
    const url = new URL(window.location.href);
    return {
      timestamp: new Date().toISOString(),
      path: clean(url.pathname, 240),
      referrer: safeReferrer(),
      utmSource: clean(url.searchParams.get("utm_source"), 100),
      utmMedium: clean(url.searchParams.get("utm_medium"), 100),
      utmCampaign: clean(url.searchParams.get("utm_campaign"), 120),
    };
  } catch {
    return { timestamp: new Date().toISOString() };
  }
}

function safeDetail(detail) {
  const output = {};
  for (const [key, value] of Object.entries(detail || {})) {
    if (!SAFE_DETAIL_KEYS.has(key)) continue;
    if (!["string", "number", "boolean"].includes(typeof value)) continue;
    output[key] = typeof value === "string" ? clean(value) : value;
  }
  return output;
}

export function trackConversion(name, detail = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    name: clean(name, 100),
    ...context(),
    ...safeDetail(detail),
  };

  window.dispatchEvent(new CustomEvent("shalcon:conversion", { detail: payload }));

  if (Array.isArray(window.dataLayer)) {
    const { name: event, ...properties } = payload;
    window.dataLayer.push({ event, ...properties });
  }
}
