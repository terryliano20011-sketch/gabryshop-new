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

    // 2. Email con Resend a terryliano20011@gmail.com (account verificato)
    const { data, error } = await resend.emails.send({
      from: 'GabryShop <onboarding@resend.dev>',
      to: ['terryliano20011@gmail.com'],
      replyTo: form.email,
      subject: `🛒 Nuovo ordine €${total} da ${form.name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px">
        <h2>🛒 Nuovo ordine ricevuto!</h2>
        <p><b>Cliente:</b> ${form.name}</p>
        <p><b>Email:</b> ${form.email}</p>
        ${form.vat ? `<p><b>P.IVA:</b> ${form.vat}</p>` : ''}
        <hr/>
        ${items.map((i: any) => `<p>• ${i.product.name} — €${i.product.price}</p>`).join('')}
        <hr/>
        <p style="font-size:20px"><b>Totale: €${total}</b></p>
        <a href="mailto:${form.email}" style="padding:10px 20px;background:#4dd9c0;color:#000;border-radius:8px;text-decoration:none;font-weight:700">📧 Rispondi al cliente</a>
      </div>`
    })

    if (error) console.error('Resend error:', error)
    else console.log('Email inviata:', data?.id)

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
