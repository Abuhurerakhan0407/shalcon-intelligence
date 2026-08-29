import { withSupabase } from 'npm:@supabase/server@^1'

const MAX_BODY_BYTES = 20_000
const UUID_V4ISH = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const DIGITS = /^[0-9]{7,15}$/
const HASH = /^[a-f0-9]{64}$/

// SHA-256 verifier only. The raw shared secret lives only in the trusted caller
// environment. Rotating the secret means updating this verifier and redeploying.
const EXPECTED_WEBHOOK_SECRET_SHA256 = '585414741393e8531c76b516c69b5faa6caebb168449ae0db1fb412db2bdfa1f'

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

function clean(value: unknown, max: number) {
  return String(value ?? '').trim().slice(0, max)
}

function checkedNullableNumber(value: unknown, min: number, max: number) {
  if (value === null || value === undefined || value === '') return { ok: true, value: null as number | null }
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) return { ok: false, value: null as number | null }
  return { ok: true, value: parsed }
}

function validIso(value: unknown) {
  const raw = clean(value, 80)
  return raw && Number.isFinite(Date.parse(raw)) ? raw : ''
}

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return hex(new Uint8Array(digest))
}

async function suppliedSecretMatches(value: string) {
  if (!value) return false
  const suppliedHash = await sha256(value)
  if (!HASH.test(suppliedHash) || suppliedHash.length !== EXPECTED_WEBHOOK_SECRET_SHA256.length) return false

  let diff = 0
  for (let index = 0; index < suppliedHash.length; index += 1) {
    diff |= suppliedHash.charCodeAt(index) ^ EXPECTED_WEBHOOK_SECRET_SHA256.charCodeAt(index)
  }
  return diff === 0
}

function opportunityFromInputs(inquiries: number, missPercent: number, conversionRate: number, avgTxn: number) {
  const dailyExact = inquiries * (missPercent / 100) * (conversionRate / 100) * avgTxn
  return {
    daily: Math.round(dailyExact),
    monthly: Math.round(dailyExact * 30),
    yearly: Math.round(dailyExact * 365),
  }
}

function mapLead(body: Record<string, unknown>) {
  const leadId = clean(body.leadId, 64)
  const schemaVersion = Number(body.schemaVersion)
  const source = clean(body.source, 80)
  const createdAt = validIso(body.createdAt)
  const contactConsentAt = validIso(body.contactConsentAt)
  const contactConsentVersion = clean(body.contactConsentVersion, 80)
  const name = clean(body.name, 100)
  const whatsapp = clean(body.whatsapp, 20)
  const company = clean(body.company, 120)
  const industry = clean(body.industry, 80)
  const packageName = clean(body.packageName, 80)
  const currency = clean(body.currency, 8).toUpperCase()

  if (!UUID_V4ISH.test(leadId)) return { error: 'invalid_lead_id' as const }
  if (schemaVersion !== 2) return { error: 'unsupported_schema_version' as const }
  if (source !== 'shalcon_opportunity_estimator') return { error: 'invalid_source' as const }
  if (!createdAt || !contactConsentAt) return { error: 'invalid_timestamp' as const }
  if (body.contactConsent !== true || !contactConsentVersion) return { error: 'invalid_consent' as const }
  if (!name || !DIGITS.test(whatsapp)) return { error: 'invalid_contact' as const }
  if (!['', 'INR', 'USD'].includes(currency)) return { error: 'invalid_currency' as const }

  const inquiries = checkedNullableNumber(body.inquiries, 0, 100_000)
  const missPercent = checkedNullableNumber(body.missPercent, 0, 100)
  const conversionRate = checkedNullableNumber(body.conversionRate, 0, 100)
  const avgTxn = checkedNullableNumber(body.avgTxn, 0, 1_000_000_000)
  const estimatedDaily = checkedNullableNumber(body.estimatedDailyOpportunityAtRisk, 0, Number.MAX_SAFE_INTEGER)
  const estimatedMonthly = checkedNullableNumber(body.estimatedMonthlyOpportunityAtRisk, 0, Number.MAX_SAFE_INTEGER)
  const estimatedYearly = checkedNullableNumber(body.estimatedYearlyOpportunityAtRisk, 0, Number.MAX_SAFE_INTEGER)

  if (![inquiries, missPercent, conversionRate, avgTxn, estimatedDaily, estimatedMonthly, estimatedYearly].every((field) => field.ok)) {
    return { error: 'invalid_estimator_data' as const }
  }

  const inputValues = [inquiries.value, missPercent.value, conversionRate.value, avgTxn.value]
  const estimateValues = [estimatedDaily.value, estimatedMonthly.value, estimatedYearly.value]
  const inputsComplete = inputValues.every((value) => value !== null)

  if (!inputsComplete) {
    if (!estimateValues.every((value) => value === null)) return { error: 'invalid_opportunity_values' as const }
  } else {
    const expected = opportunityFromInputs(
      inquiries.value as number,
      missPercent.value as number,
      conversionRate.value as number,
      avgTxn.value as number
    )
    if (
      estimatedDaily.value !== expected.daily ||
      estimatedMonthly.value !== expected.monthly ||
      estimatedYearly.value !== expected.yearly
    ) {
      return { error: 'invalid_opportunity_values' as const }
    }
  }

  const row = {
    lead_id: leadId,
    schema_version: schemaVersion,
    source,
    created_at: createdAt,
    contact_consent: true,
    contact_consent_at: contactConsentAt,
    contact_consent_version: contactConsentVersion,
    name,
    whatsapp,
    company,
    industry,
    package_name: packageName,
    currency,
    inquiries: inquiries.value,
    miss_percent: missPercent.value,
    conversion_rate: conversionRate.value,
    avg_txn: avgTxn.value,
    estimated_daily_opportunity_at_risk: estimatedDaily.value,
    estimated_monthly_opportunity_at_risk: estimatedMonthly.value,
    estimated_yearly_opportunity_at_risk: estimatedYearly.value,
    page: clean(body.page, 300),
    referrer: clean(body.referrer, 300),
    utm_source: clean(body.utmSource, 100),
    utm_medium: clean(body.utmMedium, 100),
    utm_campaign: clean(body.utmCampaign, 120),
  }

  return { row }
}

export default {
  fetch: withSupabase({ auth: 'none' }, async (req, ctx) => {
    if (req.method !== 'POST') {
      return json(405, { ok: false, error: 'method_not_allowed' })
    }

    const suppliedSecret = clean(req.headers.get('x-shalcon-webhook-secret'), 500)
    if (!(await suppliedSecretMatches(suppliedSecret))) {
      return json(401, { ok: false, error: 'unauthorized' })
    }

    const contentType = req.headers.get('content-type') || ''
    if (!contentType.toLowerCase().includes('application/json')) {
      return json(415, { ok: false, error: 'unsupported_media_type' })
    }

    const raw = await req.text()
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return json(413, { ok: false, error: 'payload_too_large' })
    }

    let body: Record<string, unknown>
    try {
      const parsed = JSON.parse(raw || '{}')
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return json(400, { ok: false, error: 'invalid_payload' })
      }
      body = parsed as Record<string, unknown>
    } catch {
      return json(400, { ok: false, error: 'invalid_json' })
    }

    const idempotencyKey = clean(req.headers.get('idempotency-key'), 64)
    const bodyLeadId = clean(body.leadId, 64)
    if (!UUID_V4ISH.test(idempotencyKey) || idempotencyKey !== bodyLeadId) {
      return json(400, { ok: false, error: 'invalid_idempotency_key' })
    }

    const mapped = mapLead(body)
    if ('error' in mapped) {
      return json(400, { ok: false, error: mapped.error })
    }

    const payloadHash = await sha256(JSON.stringify(mapped.row))
    const row = { ...mapped.row, payload_hash: payloadHash }

    const { error: insertError } = await ctx.supabaseAdmin
      .from('shalcon_leads')
      .insert(row)

    if (!insertError) {
      return json(201, { ok: true, leadId: row.lead_id, replay: false })
    }

    if (insertError.code !== '23505') {
      console.error('shalcon_lead_insert_failed', insertError.code || 'unknown')
      return json(500, { ok: false, error: 'persistence_failed' })
    }

    const { data: existing, error: readError } = await ctx.supabaseAdmin
      .from('shalcon_leads')
      .select('lead_id,payload_hash')
      .eq('lead_id', row.lead_id)
      .maybeSingle()

    if (readError || !existing) {
      console.error('shalcon_lead_replay_lookup_failed', readError?.code || 'missing')
      return json(500, { ok: false, error: 'persistence_failed' })
    }

    if (existing.payload_hash !== payloadHash) {
      return json(409, { ok: false, error: 'idempotency_conflict' })
    }

    return json(200, { ok: true, leadId: row.lead_id, replay: true })
  }),
}
