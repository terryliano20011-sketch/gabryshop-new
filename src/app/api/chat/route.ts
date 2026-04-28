import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Sei Gabry AI, l'assistente virtuale di GabryShop. Rispondi SEMPRE in italiano, in modo amichevole e conciso (max 3-4 frasi).

PRODOTTI E PREZZI:
SITI WEB: Landing Page Pro €29 | Portfolio €25 | Sito Aziendale €39 | Ristorante €35 | Parrucchiere €29 | Freelancer €22 | E-commerce €40
MENU DIGITALI: QR Ristorante €19 | Bar/Cocktail €15 | Pizzeria €17 | Gelateria €14 | Multilingua €22 | Ordini Tavolo €35
FOGLI EXCEL: Inventario €10 | Fatturazione €12 | Budget €10 | Dipendenti €15 | CRM €18 | Gantt €14 | Listino €12
AUTOMAZIONI: WhatsApp Bot €35 | Email Marketing €25 | Instagram Bot €28 | Google Sheets €20 | Bot Prenotazioni €32 | Social Media €22
APP MOBILE: PWA Business €40 | App Prenotazioni €35 | App Catalogo €30

Consegna: 24-48 ore per la maggior parte dei prodotti. Pagamento: PayPal, Visa, Mastercard, Amex. Rimborso: 7 giorni. Coupon: GABRY10 (10% sconto), WELCOME5 (€5 sconto). Contatto: WhatsApp +39 351 843 5322, email terryliano20011@gmail.com.

Se non sai rispondere, suggerisci di contattare su WhatsApp.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json({
        message: 'Ciao! Sono Gabry AI 👋 Il sistema è in manutenzione. Per info immediate scrivi su WhatsApp: +39 351 843 5322'
      })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.trim(),
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: (messages || []).slice(-6).map((m: any) => ({
          role: m.role,
          content: m.content || m.text || ''
        })),
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Anthropic error:', response.status, errText)
      return NextResponse.json({
        message: `Ciao! Ho un problema tecnico (${response.status}). Scrivimi su WhatsApp: +39 351 843 5322 🙏`
      })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text

    if (!text) {
      return NextResponse.json({ message: 'Non ho capito. Puoi riformulare la domanda? 😊' })
    }

    return NextResponse.json({ message: text })

  } catch (err: any) {
    console.error('Chat route error:', err?.message)
    return NextResponse.json({
      message: 'Problema di connessione momentaneo. Scrivimi su WhatsApp: +39 351 843 5322 🙏'
    })
  }
}
