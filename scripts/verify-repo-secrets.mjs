import { execFileSync } from "node:child_process";
import fs from "node:fs";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean);

const violations = [];

for (const file of tracked) {
  const normalized = file.replaceAll("\\", "/");
  const base = normalized.split("/").at(-1) || "";

  if ((base === ".env" || base.startsWith(".env.")) && !base.endsWith(".example")) {
    violations.push(`${file}: tracked environment file`);
  }
  if (normalized === ".vercel" || normalized.startsWith(".vercel/")) {
    violations.push(`${file}: tracked local Vercel binding`);
  }

  let text = "";
  try {
    const stat = fs.statSync(file);
    if (!stat.isFile() || stat.size > 2_000_000) continue;
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const checks = [
    [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, "private key block"],
    [/\bghp_[A-Za-z0-9]{30,}\b/, "GitHub personal token"],
    [/\bgithub_pat_[A-Za-z0-9_]{30,}\b/, "GitHub fine-grained token"],
    [/\bsb_secret_[A-Za-z0-9_-]{20,}\b/, "Supabase secret key"],
    [/\bsk_live_[A-Za-z0-9]{20,}\b/, "live payment secret"],
    [/\b(?:LEAD_WEBHOOK_SECRET|SHALCON_LEAD_WEBHOOK_SECRET)\s*=\s*[^\s#]{24,}/, "configured Shalcon webhook secret"],
    [/\bSUPABASE_SERVICE_ROLE_KEY\s*=\s*eyJ[A-Za-z0-9._-]{30,}/, "legacy Supabase service-role key"],
  ];

  for (const [pattern, label] of checks) {
    if (pattern.test(text)) violations.push(`${file}: possible ${label}`);
  }
}

if (violations.length) {
  console.error("Repository secret guard failed:\n" + violations.map((v) => `- ${v}`).join("\n"));
  process.exit(1);
}

console.log(`Repository secret guard passed across ${tracked.length} tracked paths.`);
