import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const functionSource = fs.readFileSync("supabase/functions/shalcon-lead-webhook/index.ts", "utf8");
const sqlSource = fs.readFileSync("supabase/sql/create_shalcon_leads.sql", "utf8");
const configSource = fs.readFileSync("supabase/config.toml", "utf8");

test("Supabase lead webhook disables platform JWT only with custom webhook authentication", () => {
  assert.match(configSource, /\[functions\.shalcon-lead-webhook\]/);
  assert.match(configSource, /verify_jwt\s*=\s*false/);
  assert.match(functionSource, /withSupabase\(\{ auth: 'none' \}/);
  assert.match(functionSource, /x-shalcon-webhook-secret/i);
  assert.match(functionSource, /SHALCON_LEAD_WEBHOOK_SECRET/);
  assert.match(functionSource, /secretsEqual\(configuredSecret, suppliedSecret\)/);

  const authCheck = functionSource.indexOf("if (!(await secretsEqual(configuredSecret, suppliedSecret)))");
  const firstDbWrite = functionSource.indexOf(".from('shalcon_leads')");
  assert.ok(authCheck >= 0 && firstDbWrite > authCheck, "secret authentication must happen before database access");
});

test("lead table is RLS-enabled and denied to browser roles", () => {
  assert.match(sqlSource, /alter table public\.shalcon_leads enable row level security;/i);
  assert.match(sqlSource, /revoke all on table public\.shalcon_leads from anon, authenticated;/i);
  assert.match(sqlSource, /grant select, insert, update, delete on table public\.shalcon_leads to service_role;/i);
  assert.match(sqlSource, /lead_id uuid primary key/i);
  assert.match(sqlSource, /payload_hash text not null/i);
});

test("destination preserves idempotency without overwriting conflicting payloads", () => {
  assert.match(functionSource, /idempotency-key/i);
  assert.match(functionSource, /idempotencyKey !== bodyLeadId/);
  assert.match(functionSource, /insertError\.code !== '23505'/);
  assert.match(functionSource, /existing\.payload_hash !== payloadHash/);
  assert.match(functionSource, /idempotency_conflict/);
  assert.ok(!/\.upsert\(/.test(functionSource), "do not upsert attacker-controlled data over an existing lead");
});

test("destination never embeds browser-safe or admin database keys in source", () => {
  assert.ok(!/SUPABASE_ANON_KEY/.test(functionSource));
  assert.ok(!/SUPABASE_SERVICE_ROLE_KEY/.test(functionSource));
  assert.ok(!/sb_secret_|service_role\s*[:=]\s*['\"][A-Za-z0-9]/.test(functionSource));
  assert.ok(!/console\.(log|error)\([^\n]*(body|row|payload)/i.test(functionSource), "full lead payload must not be logged");
});
