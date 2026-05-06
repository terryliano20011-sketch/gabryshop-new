import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()

    // 1. Salva ordine su Supabase
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
          briefing: item.briefing || null,
        })),
        total,
        status: 'pending',
        briefing: items.reduce((acc: any, item: any) => {
          if (item.briefing && Object.keys(item.briefing).length > 0) {
            acc[item.product.name] = item.briefing
          }
          return acc
        }, {}),
        coupon_code: form.coupon || null,
      }).select('id').single()
      if (order) orderId = order.id
    } catch (e) {
      console.error('Supabase error:', e)
    }

    // 2. Email al PROPRIETARIO
    const itemsRows = (items || []).map((i: any) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb">
          <div style="display:flex;justify-content:space-between">
            <span style="font-size:13px;color:#111">${i.product.name}</span>
            <span style="font-size:13px;font-weight:700">€${i.product.price}</span>
          </div>
          ${i.briefing && Object.keys(i.briefing).length > 0 ? '<div style="font-size:11px;color:#6366f1;margin-top:2px">✏️ Briefing compilato</div>' : '<div style="font-size:11px;color:#f59e0b;margin-top:2px">⚠️ Nessun briefing</div>'}
        </td>
      </tr>`).join('')

    const briefingRows = (items || [])
      .filter((i: any) => i.briefing && Object.keys(i.briefing).length > 0)
      .map((i: any) => `
        <div style="margin-bottom:12px;background:#f9fafb;border-radius:8px;padding:12px">
          <div style="font-weight:700;font-size:12px;color:#111;margin-bottom:8px">📦 ${i.product.name}</div>
          ${Object.entries(i.briefing).map(([k,v]) => `
            <div style="display:flex;gap:8px;margin-bottom:4px">
              <span style="font-size:11px;color:#6b7280;min-width:120px;text-transform:uppercase;letter-spacing:0.05em">${k.replace(/_/g,' ')}</span>
              <span style="font-size:12px;color:#111">${Array.isArray(v) ? (v as string[]).join(', ') : String(v)}</span>
            </div>`).join('')}
        </div>`).join('')

    const ownerHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:32px 20px">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
      <tr><td style="background:linear-gradient(135deg,#1a1a2e,#2d1b4e);border-radius:16px 16px 0 0;padding:28px 32px;text-align:center">
        <div style="font-size:36px;margin-bottom:8px">🛒</div>
        <h1 style="color:white;font-size:20px;font-weight:700;margin:0 0 4px">Nuovo ordine ricevuto!</h1>
        <p style="color:rgba(200,200,220,0.7);font-size:13px;margin:0">Paga alla consegna · ${new Date().toLocaleString('it-IT')}</p>
      </td></tr>
      <tr><td style="background:white;padding:28px 32px">
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:20px">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px">👤 Cliente</div>
          <div style="font-size:16px;font-weight:700;color:#111;margin-bottom:2px">${form.name}</div>
          <div style="font-size:13px;color:#6b7280">${form.email}</div>
          ${form.vat ? `<div style="font-size:12px;color:#9ca3af;margin-top:2px">P.IVA: ${form.vat}</div>` : ''}
        </div>
        <div style="margin-bottom:20px">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px">🛍️ Prodotti</div>
          <table width="100%" cellpadding="0" cellspacing="0">${itemsRows}</table>
        </div>
        <div style="background:#1a1a2e;border-radius:10px;padding:16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <span style="color:rgba(200,200,220,0.8);font-size:14px;font-weight:600">Totale da incassare</span>
          <span style="color:#4dd9c0;font-size:28px;font-weight:800">€${total}</span>
        </div>
        ${briefingRows ? `<div style="margin-bottom:20px">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px">✏️ Briefing cliente</div>
          ${briefingRows}
        </div>` : ''}
        <div style="display:flex;gap:10px;justify-content:center">
          <a href="https://wa.me/393518435322?text=Ciao ${encodeURIComponent(form.name)}, ho ricevuto il tuo ordine GabryShop!" style="padding:12px 20px;background:#25D366;color:white;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700">💬 Contatta cliente</a>
          <a href="mailto:${form.email}?subject=Il tuo ordine GabryShop" style="padding:12px 20px;background:#f3f4f6;color:#111;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;border:1px solid #e5e7eb">📧 Scrivi email</a>
        </div>
      </td></tr>
      <tr><td style="background:#1a1a2e;border-radius:0 0 16px 16px;padding:14px 32px;text-align:center">
        <p style="color:rgba(200,200,220,0.4);font-size:11px;margin:0">GabryShop · Notifica automatica ordine</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`

    // 3. Email al CLIENTE
    const clientHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#000;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000">
  <tr><td align="center" style="padding:40px 20px">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
      <tr><td style="background:#0d0d18;border-radius:20px 20px 0 0;padding:40px;text-align:center;border-bottom:1px solid rgba(77,217,192,0.15)">
        <div style="font-size:48px;margin-bottom:12px">✅</div>
        <h1 style="color:white;font-size:24px;font-weight:600;margin:0 0 8px">Ordine ricevuto!</h1>
        <p style="color:rgba(150,150,185,0.8);font-size:14px;margin:0">Grazie ${form.name}, ti contatteremo presto.</p>
      </td></tr>
      <tr><td style="background:#0d0d18;padding:28px 32px">
        <div style="background:rgba(77,217,192,0.06);border:1px solid rgba(77,217,192,0.15);border-radius:10px;padding:14px;margin-bottom:20px;text-align:center">
          <div style="color:rgba(120,120,155,0.6);font-size:11px;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.1em">Ordine</div>
          <div style="color:#4dd9c0;font-size:16px;font-weight:700">${String(orderId).slice(0,8).toUpperCase()}</div>
        </div>
        <p style="color:rgba(140,140,175,0.8);font-size:13px;line-height:1.7;margin-bottom:20px">
          Ti contatteremo su WhatsApp o email entro poche ore per concordare il pagamento. Non devi fare nulla — aspetta il nostro messaggio!
        </p>
        <div style="text-align:center">
          <a href="https://gabryshop-digitale.vercel.app" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#4dd9c0,#1a9e88);color:#000;text-decoration:none;border-radius:100px;font-size:14px;font-weight:700">Torna al sito →</a>
        </div>
      </td></tr>
      <tr><td style="background:#080810;border-radius:0 0 20px 20px;padding:20px;text-align:center;border-top:1px solid rgba(255,255,255,0.04)">
        <p style="color:rgba(80,80,110,0.55);font-size:11px;margin:0">© 2026 GabryShop · gabryshop7@gmail.com</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`

    // Invia entrambe le email
    const [ownerRes, clientRes] = await Promise.allSettled([
      resend.emails.send({
        from: 'GabryShop <onboarding@resend.dev>',
        to: ['terryliano20011@gmail.com'],
        replyTo: form.email,
        subject: `🛒 Nuovo ordine €${total} da ${form.name}`,
        html: ownerHtml,
      }),
      resend.emails.send({
        from: 'GabryShop <onboarding@resend.dev>',
        to: [form.email],
        subject: '✅ Ordine ricevuto — GabryShop',
        html: clientHtml,
      }),
    ])

    console.log('Owner email:', ownerRes.status, ownerRes.status === 'fulfilled' ? (ownerRes.value as any)?.data?.id : (ownerRes as any).reason)
    console.log('Client email:', clientRes.status)

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    console.error('Cash order error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
