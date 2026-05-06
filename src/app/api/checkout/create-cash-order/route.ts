import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()

    // 1. Salva su Supabase
    let orderId = 'CASH-' + Date.now()
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const { data: order } = await supabase.from('orders').insert({
        customer_name: form.name,
        customer_email: form.email,
        customer_vat: form.vat || null,
        items: items.map((item: any) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity || 1,
        })),
        total,
        status: 'pending',
        coupon_code: form.coupon || null,
        briefing: items.reduce((acc: any, item: any) => {
          if (item.briefing && Object.keys(item.briefing).length > 0) {
            acc[item.product.name] = item.briefing
          }
          return acc
        }, {}),
      }).select('id').single()
      if (order) orderId = order.id
    } catch (e) {
      console.error('Supabase error:', e)
    }

    // 2. Email con Brevo
    const BREVO_KEY = process.env.BREVO_API_KEY
    console.log('BREVO_KEY presente:', !!BREVO_KEY, 'lunghezza:', BREVO_KEY?.length)
    if (BREVO_KEY) {
      const itemsList = items.map((i: any) => `${i.product.name} — €${i.product.price}`).join('\n')
      const briefingText = items
        .filter((i: any) => i.briefing && Object.keys(i.briefing).length > 0)
        .map((i: any) => `\n--- ${i.product.name} ---\n${Object.entries(i.briefing).map(([k,v]) => `${k}: ${v}`).join('\n')}`)
        .join('\n')

      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': BREVO_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'GabryShop', email: 'terryliano20011@gmail.com' },
          to: [{ email: 'terryliano20011@gmail.com', name: 'GabryShop' }],
          replyTo: { email: form.email, name: form.name },
          subject: `🛒 Nuovo ordine €${total} da ${form.name}`,
          textContent: `NUOVO ORDINE RICEVUTO!\n\nCliente: ${form.name}\nEmail: ${form.email}\n${form.vat ? `P.IVA: ${form.vat}\n` : ''}\nProdotti:\n${itemsList}\n\nTotale: €${total}\n${briefingText ? `\nBRIEFING:\n${briefingText}` : ''}`,
          htmlContent: `<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px">
            <h2 style="color:#111">🛒 Nuovo ordine da ${form.name}</h2>
            <p><b>Email:</b> ${form.email}</p>
            <p><b>Totale:</b> <span style="color:#4dd9c0;font-size:20px">€${total}</span></p>
            <hr/>
            <h3>Prodotti:</h3>
            ${items.map((i: any) => `<p>• ${i.product.name} — €${i.product.price}</p>`).join('')}
            ${briefingText ? `<hr/><h3>Briefing:</h3><pre style="background:#f5f5f5;padding:12px;border-radius:6px">${briefingText}</pre>` : ''}
            <hr/>
            <a href="mailto:${form.email}" style="padding:10px 20px;background:#4dd9c0;color:#000;border-radius:8px;text-decoration:none;font-weight:700">📧 Rispondi al cliente</a>
          </div>`
        })
      })
      const brevoResult = await brevoRes.json()
      console.log('Brevo response:', JSON.stringify(brevoResult))
    } else {
      console.log('BREVO_KEY mancante - email non inviata')
    }

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
