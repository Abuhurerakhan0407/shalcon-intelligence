import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers })
  try {
    const { pillar = 'AI automation', audience = 'business decision-makers', objective = 'start a useful sales conversation', context = '' } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('GEMINI_API_KEY is not configured')
    const model = Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash'

    const prompt = `Write one LinkedIn post for Shalcon Intelligence, an AI automation agency. Pillar: ${pillar}. Audience: ${audience}. Objective: ${objective}. Context: ${context}. Voice: direct, confident, useful, non-corporate, no fake case studies, no fabricated numbers, no cliches, no AI hype. Keep it 90-180 words. Return JSON only: {"hook":"string","body":"string","cta":"string","hashtags":["3-5 relevant hashtags"],"visual_brief":"one concise visual direction"}.`

    const ai = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.65 } }),
    })
    if (!ai.ok) throw new Error(`Gemini request failed with ${ai.status}`)
    const payload = await ai.json()
    const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!raw) throw new Error('Gemini returned no content')
    return new Response(JSON.stringify({ ...JSON.parse(raw), model }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { status: 500, headers })
  }
})
