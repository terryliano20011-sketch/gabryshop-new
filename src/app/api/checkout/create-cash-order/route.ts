import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // 2. Email al proprietario
    const { error } = await resend.emails.send({
      from: 'GabryShop <onboarding@resend.dev>',
      to: ['gabryshop7@gmail.com'],
      subject: `🛒 Nuovo ordine €${total} da ${form.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px">
          <h2 style="color:#111">🛒 Nuovo ordine ricevuto!</h2>
          <p style="color:#666;font-size:13px">${new Date().toLocaleString('it-IT')}</p>

          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0">
            <b>Cliente:</b> ${form.name}<br/>
            <b>Email:</b> ${form.email}<br/>
            ${form.vat ? `<b>P.IVA:</b> ${form.vat}<br/>` : ''}
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0">
            ${items.map((i: any) => `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px">${i.product.name}</td>
                <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;text-align:right;font-weight:700">€${i.product.price}</td>
              </tr>`).join('')}
            <tr>
              <td style="padding:12px 0;font-size:15px;font-weight:700">Totale</td>
              <td style="padding:12px 0;font-size:20px;font-weight:800;text-align:right;color:#4dd9c0">€${total}</td>
            </tr>
          </table>

          ${items.some((i: any) => i.briefing && Object.keys(i.briefing).length > 0) ? `
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0">
            <b style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af">✏️ Briefing</b><br/><br/>
            ${items.filter((i: any) => i.briefing && Object.keys(i.briefing).length > 0).map((i: any) => `
              <div style="margin-bottom:12px">
                <b>${i.product.name}</b><br/>
                ${Object.entries(i.briefing).map(([k,v]) => `<span style="color:#666;font-size:12px">${k}: ${v}</span>`).join('<br/>')}
              </div>`).join('')}
          </div>` : ''}

          <a href="mailto:${form.email}" style="display:inline-block;padding:12px 24px;background:#4dd9c0;color:#000;border-radius:8px;text-decoration:none;font-weight:700">
            📧 Rispondi al cliente
          </a>
        </div>
      `
    })

    if (error) console.error('Resend error:', error)
    else console.log('✅ Email inviata a gabryshop7@gmail.com')

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
