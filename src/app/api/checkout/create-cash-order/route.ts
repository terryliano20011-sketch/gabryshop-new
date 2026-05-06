import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()

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
      }).select('id').single()
      if (order) orderId = order.id
    } catch (e) {
      console.error('Supabase error:', e)
    }

    // Email diretta al proprietario
    const itemsHtml = items.map((i: any) => `
      <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:13px">
        <b>${i.product.name}</b> — €${i.product.price}
      </td></tr>`).join('')

    await resend.emails.send({
      from: 'GabryShop <onboarding@resend.dev>',
      to: ['terryliano20011@gmail.com'],
      replyTo: form.email,
      subject: `🛒 Nuovo ordine €${total} da ${form.name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px">
        <h2 style="color:#111;margin-bottom:4px">🛒 Nuovo ordine ricevuto!</h2>
        <p style="color:#666;margin-bottom:20px">Paga alla consegna · ${new Date().toLocaleString('it-IT')}</p>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:16px">
          <b>Cliente:</b> ${form.name}<br/>
          <b>Email:</b> ${form.email}<br/>
          ${form.vat ? `<b>P.IVA:</b> ${form.vat}<br/>` : ''}
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px">${itemsHtml}</table>
        <div style="background:#1a1a2e;color:white;border-radius:8px;padding:16px;text-align:center;font-size:20px;font-weight:700;margin-bottom:20px">
          Totale: €${total}
        </div>
        <a href="mailto:${form.email}" style="display:inline-block;padding:10px 20px;background:#4dd9c0;color:#000;border-radius:8px;text-decoration:none;font-weight:700">📧 Rispondi al cliente</a>
      </div>`
    })

    // Email al cliente
    await resend.emails.send({
      from: 'GabryShop <onboarding@resend.dev>',
      to: [form.email],
      subject: '✅ Ordine ricevuto — GabryShop',
      html: `<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#000;color:white">
        <h2>✅ Ordine ricevuto!</h2>
        <p>Grazie ${form.name}! Ti contatteremo presto per il pagamento.</p>
        <p style="color:#aaa">Ordine: <b>${String(orderId).slice(0,8).toUpperCase()}</b></p>
        <p style="color:#aaa">Totale: <b style="color:#4dd9c0">€${total}</b></p>
        <p>Puoi contattarci su WhatsApp: <a href="https://wa.me/393518435322" style="color:#4dd9c0">+39 351 843 5322</a></p>
      </div>`
    })

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Cash order error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
