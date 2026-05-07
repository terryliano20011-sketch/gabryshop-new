import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

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

    // 2. Email con Gmail SMTP (nodemailer)
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,   // terryliano20011@gmail.com
          pass: process.env.GMAIL_PASS,   // App Password Gmail
        },
      })

      const itemsHtml = items.map((i: any) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#111">
            ${i.product.name}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;font-weight:700;text-align:right;color:#111">
            €${i.product.price}
          </td>
        </tr>`).join('')

      const briefingHtml = items
        .filter((i: any) => i.briefing && Object.keys(i.briefing).length > 0)
        .map((i: any) => `
          <div style="margin-bottom:12px">
            <b>${i.product.name}</b><br/>
            ${Object.entries(i.briefing).map(([k,v]) => `<span style="color:#666">${k}:</span> ${v}`).join('<br/>')}
          </div>`).join('')

      await transporter.sendMail({
        from: `GabryShop <${process.env.GMAIL_USER}>`,
        to: 'terryliano20011@gmail.com',
        replyTo: form.email,
        subject: `🛒 Nuovo ordine €${total} da ${form.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px">
            <h2 style="color:#111;margin-bottom:4px">🛒 Nuovo ordine ricevuto!</h2>
            <p style="color:#666;margin-bottom:20px;font-size:13px">${new Date().toLocaleString('it-IT')}</p>
            
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:20px">
              <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Cliente</div>
              <div style="font-size:16px;font-weight:700;color:#111">${form.name}</div>
              <div style="font-size:13px;color:#666">${form.email}</div>
              ${form.vat ? `<div style="font-size:12px;color:#999">P.IVA: ${form.vat}</div>` : ''}
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
              ${itemsHtml}
            </table>

            <div style="background:#1a1a2e;border-radius:10px;padding:16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
              <span style="color:rgba(200,200,220,0.8);font-size:14px;font-weight:600">Totale da incassare</span>
              <span style="color:#4dd9c0;font-size:24px;font-weight:800">€${total}</span>
            </div>

            ${briefingHtml ? `
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:20px">
              <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px">✏️ Briefing cliente</div>
              ${briefingHtml}
            </div>` : ''}

            <a href="mailto:${form.email}" style="display:inline-block;padding:12px 24px;background:#4dd9c0;color:#000;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">
              📧 Rispondi al cliente
            </a>
          </div>
        `
      })
      console.log('Email inviata con successo a terryliano20011@gmail.com')
    } catch (emailErr) {
      console.error('Email error:', emailErr)
      // Non blocca l'ordine se email fallisce
    }

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
