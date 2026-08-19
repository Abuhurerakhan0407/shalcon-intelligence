import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Body = {
  lead?: { name?: string; title?: string; city?: string }
  company?: { name?: string; industry?: string; website_summary?: string }
  signal?: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers })
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })

  try {
    const body = await req.json() as Body
    if (!body.lead?.name || !body.company?.name) {
      return new Response(JSON.stringify({ error: 'lead.name and company.name are required' }), { status: 400, headers })
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }), { status: 500, headers })
    const model = Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash'

    const prompt = `You qualify B2B prospects for Shalcon Intelligence.\nOffers: ClinicBot for healthcare; EduFlow for schools/EdTech; RenewBot for insurance; CartSave for ecommerce; HireFlow for recruitment; Custom AI Automation otherwise.\nLead: ${JSON.stringify(body.lead)}\nCompany: ${JSON.stringify(body.company)}\nObserved signal: ${body.signal || 'none'}\nReturn only JSON: {"icp_fit":0-30,"problem_fit":0-30,"buying_signal":0-20,"engagement":0-10,"data_quality":0-10,"recommended_offer":"string","rationale":"one evidence-based sentence","opener":"short personalized opener with no invented facts","next_action":"research|approval|email|nurture|skip"}. Score conservatively.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
      }),
    })
    if (!response.ok) throw new Error(`Gemini request failed with ${response.status}`)

    const payload = await response.json()
    const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!raw) throw new Error('Gemini returned no content')
    const result = JSON.parse(raw)
    const score = ['icp_fit','problem_fit','buying_signal','engagement','data_quality']
      .reduce((sum, key) => sum + Number(result[key] || 0), 0)

    return new Response(JSON.stringify({ ...result, score: Math.max(0, Math.min(100, score)), model }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { status: 500, headers })
  }
})
