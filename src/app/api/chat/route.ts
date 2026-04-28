import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Sei Gabry AI, l'assistente virtuale di GabryShop. Rispondi SEMPRE in italiano, in modo amichevole e conciso (max 3-4 frasi).

PRODOTTI E PREZZI:
SITI WEB: Landing Page Pro €29 | Portfolio €25 | Sito Aziendale €39 | Ristorante €35 | Parrucchiere €29 | Freelancer €22 | E-commerce €40
MENU DIGITALI: QR Ristorante €19 | Bar/Cocktail €15 | Pizzeria €17 | Gelateria €14 | Multilingua €22 | Ordini Tavolo €35
FOGLI EXCEL: Inventario €10 | Fatturazione €12 | Budget €10 | Dipendenti €15 | CRM €18 | Gantt €14 | Listino €12
AUTOMAZIONI: WhatsApp Bot €35 | Email Marketing €25 | Instagram Bot €28 | Google Sheets €20 | Bot Prenotazioni €32 | Social Media €22
APP MOBILE: PWA Business €40 | App Prenotazioni €35 | App Catalogo €30

Consegna: 24-48 ore. Pagamento: PayPal, Visa, Mastercard. Rimborso 7 giorni. Coupon: GABRY10 (10%), WELCOME5 (€5). WhatsApp: +39 351 843 5322.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = body.messages || []
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return NextResponse.json({ message: 'Chiave API mancante. Contattaci su WhatsApp: +39 351 843 5322' })
    }

    // Costruisci messaggi nel formato corretto per Anthropic
    // Deve alternare user/assistant e iniziare con user
    const formatted: { role: 'user' | 'assistant'; content: string }[] = []
    for (const m of messages.slice(-6)) {
      const role = m.role === 'user' ? 'user' : 'assistant'
      const content = String(m.content || m.text || '').trim()
      if (!content) continue
      // Evita messaggi consecutivi dello stesso ruolo
      if (formatted.length > 0 && formatted[formatted.length - 1].role === role) continue
      formatted.push({ role, content })
    }

    // Deve iniziare con user
    if (formatted.length === 0 || formatted[0].role !== 'user') {
      return NextResponse.json({ message: 'Come posso aiutarti? 😊' })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: formatted,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('Anthropic error:', response.status, JSON.stringify(err))
      return NextResponse.json({ message: `Errore tecnico (${response.status}): ${err?.error?.message || 'sconosciuto'}. WhatsApp: +39 351 843 5322` })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || 'Come posso aiutarti? 😊'
    return NextResponse.json({ message: text })

  } catch (err: any) {
    console.error('Chat error:', err?.message)
    return NextResponse.json({ message: 'Errore momentaneo. WhatsApp: +39 351 843 5322 🙏' })
  }
}

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY
  return Response.json({
    hasKey: !!key,
    keyLength: key?.length || 0,
    keyStart: key ? key.substring(0, 14) + '...' : 'NON TROVATA',
  })
}
