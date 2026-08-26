import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function cleanHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 45000)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers })
  try {
    const { url, company_name } = await req.json()
    if (!url || !company_name) return new Response(JSON.stringify({ error: 'url and company_name are required' }), { status: 400, headers })

    const target = new URL(url)
    if (!['http:', 'https:'].includes(target.protocol)) throw new Error('Only http/https URLs are supported')
    if (target.hostname.includes('linkedin.com')) throw new Error('LinkedIn pages are not fetched by this research function')

    const page = await fetch(target.toString(), { headers: { 'User-Agent': 'ShalconResearchBot/1.0 (+public-company-research)' }, redirect: 'follow' })
    if (!page.ok) throw new Error(`Website fetch failed with ${page.status}`)
    const text = cleanHtml(await page.text())
    if (!text) throw new Error('No readable public website content found')

    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('GEMINI_API_KEY is not configured')
    const model = Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash'
    const prompt = `Analyze this public company website for Shalcon Intelligence. Do not invent facts. Company: ${company_name}. Website text: ${text}. Return JSON only: {"summary":"2 concise sentences","industry":"string or unknown","observed_workflows":["up to 5 evidence-based items"],"automation_opportunities":["up to 5 opportunities"],"buying_signals":["only signals visible in supplied text"],"recommended_offer":"ClinicBot|EduFlow|RenewBot|CartSave|HireFlow|Custom AI Automation|None","evidence":["short phrases from supplied facts, paraphrased"]}.`

    const ai = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.1 } }),
    })
    if (!ai.ok) throw new Error(`Gemini request failed with ${ai.status}`)
    const payload = await ai.json()
    const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!raw) throw new Error('Gemini returned no content')
    return new Response(JSON.stringify({ ...JSON.parse(raw), source_url: target.toString(), model }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { status: 500, headers })
  }
})
