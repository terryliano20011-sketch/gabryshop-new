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
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 20px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
  <tr><td style="background:linear-gradient(135deg,#0d1f2d,#1a3a4a);border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:32px;margin-bottom:10px">🛒</div>
    <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 6px">Nuovo ordine ricevuto</h1>
    <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0">${new Date().toLocaleString('it-IT')}</p>
  </td></tr>
  <tr><td style="background:#fff;padding:28px 32px">
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:24px">
      <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin:0 0 10px">👤 Cliente</p>
      <p style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 4px">${form.name}</p>
      <p style="font-size:13px;color:#64748b;margin:0">${form.email}</p>
      ${form.vat ? '<p style="font-size:12px;color:#94a3b8;margin:4px 0 0">P.IVA: ' + form.vat + '</p>' : ''}
    </div>
    <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin:0 0 10px">🛍️ Prodotti</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
      ${items.map((i: any) => '<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1e293b;font-weight:500">' + i.product.name + '</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:700;text-align:right">€' + i.product.price + '</td></tr>').join('')}
      <tr>
        <td style="padding:14px 0 0;font-size:14px;font-weight:700;color:#0f172a">Totale</td>
        <td style="padding:14px 0 0;font-size:22px;font-weight:800;color:#4dd9c0;text-align:right">€${total}</td>
      </tr>
    </table>
    ${(() => {
      const briefingItems = items.filter((i: any) => i.briefing && Object.keys(i.briefing).length > 0)
      if (briefingItems.length === 0) return ''
      const rows = briefingItems.map((i: any) => {
        const fields = Object.entries(i.briefing).map(([k,v]) => '<div style="margin-bottom:4px"><span style="font-size:11px;color:#94a3b8;min-width:120px;display:inline-block;text-transform:capitalize">' + String(k).replace(/_/g,' ') + '</span><span style="font-size:12px;color:#334155;font-weight:500">' + String(v) + '</span></div>').join('')
        return '<p style="font-size:13px;font-weight:700;color:#0f172a;margin:0 0 8px">' + i.product.name + '</p>' + fields
      }).join('')
      return '<div style="background:#f8fafc;border-left:3px solid #4dd9c0;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px"><p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin:0 0 12px">✏️ Briefing compilato</p>' + rows + '</div>'
    })()}
    })

    if (error) console.error('Resend error:', error)
    else console.log('✅ Email inviata a gabryshop7@gmail.com')

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
