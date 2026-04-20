import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { customerName, customerEmail, orderId, items, total } = await req.json()

    const itemsHtml = (items || []).map((item: any) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
            <div>
              <div style="color:white;font-size:14px;font-weight:600;margin-bottom:3px">${item.product_name}</div>
              <div style="color:rgba(120,120,155,0.6);font-size:12px">Qtà: ${item.quantity || 1}</div>
              ${item.briefing && Object.keys(item.briefing).length > 0 ? '<div style="color:#c9a96e;font-size:11px;margin-top:4px">✏️ Briefing ricevuto</div>' : ''}
            </div>
            <div style="font-family:Georgia,serif;color:white;font-size:18px;font-weight:600;white-space:nowrap">€${item.price}</div>
          </div>
        </td>
      </tr>
    `).join('')

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#05050a;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#05050a;min-height:100vh">
  <tr><td align="center" style="padding:40px 20px">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

      <!-- Header -->
      <tr><td style="background:#0d0d18;border-radius:20px 20px 0 0;padding:40px;text-align:center;border-bottom:1px solid rgba(201,169,110,0.15)">
        <div style="margin-bottom:8px">
          <span style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:white">
            <span style="color:#c9a96e">Gabry</span>Shop
          </span>
        </div>
        <div style="margin-top:24px">
          <div style="font-size:48px;margin-bottom:12px">✅</div>
          <h1 style="font-family:Georgia,serif;color:white;font-size:28px;font-weight:600;margin:0 0 8px;line-height:1.2">Ordine confermato!</h1>
          <p style="color:rgba(150,150,185,0.8);font-size:15px;margin:0">Grazie ${customerName}, il tuo ordine è stato ricevuto.</p>
        </div>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:#0d0d18;padding:32px 40px">

        <!-- Numero ordine -->
        <div style="background:rgba(201,169,110,0.06);border:1px solid rgba(201,169,110,0.15);border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:center">
          <div style="color:rgba(120,120,155,0.7);font-size:11px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">Numero ordine</div>
          <div style="color:#c9a96e;font-family:Georgia,serif;font-size:18px;font-weight:bold">${(orderId || '').toString().slice(0,8).toUpperCase()}</div>
        </div>

        <!-- Prodotti -->
        <h2 style="font-family:Georgia,serif;color:white;font-size:18px;font-weight:600;margin-bottom:16px;margin-top:0">I tuoi prodotti</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
          ${itemsHtml}
          <tr><td style="padding:16px 0 0">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
              <span style="color:white;font-size:15px;font-weight:bold">Totale pagato</span>
              <span style="font-family:Georgia,serif;color:#c9a96e;font-size:26px;font-weight:bold">€${total}</span>
            </div>
          </td></tr>
        </table>

        <!-- Step -->
        <div style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:24px">
          <h3 style="font-family:Georgia,serif;color:white;font-size:15px;font-weight:600;margin:0 0 16px">⏱️ Cosa succede adesso?</h3>
          ${[
            ['1','Conferma ricevuta','Hai ricevuto questa email di conferma'],
            ['2','Lavorazione in corso','Iniziamo a preparare il tuo ordine entro poche ore'],
            ['3','Consegna','Ricevi il file digitale via email entro 24-48 ore'],
          ].map(([n,t,d]) => `
          <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px">
            <div style="width:24px;height:24px;border-radius:50%;background:rgba(201,169,110,0.12);border:1px solid rgba(201,169,110,0.2);color:#c9a96e;font-size:11px;font-weight:bold;text-align:center;line-height:24px;flex-shrink:0">${n}</div>
            <div>
              <div style="color:white;font-size:13px;font-weight:600">${t}</div>
              <div style="color:rgba(120,120,155,0.65);font-size:12px">${d}</div>
            </div>
          </div>`).join('')}
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin-bottom:24px">
          <a href="https://gabryshop-digitale.vercel.app" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c9a96e,#b8924a);color:#08060a;text-decoration:none;border-radius:100px;font-size:14px;font-weight:bold">
            Visita GabryShop →
          </a>
        </div>

        <!-- Supporto -->
        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.02);border-radius:12px">
          <p style="color:rgba(120,120,155,0.65);font-size:13px;margin:0 0 8px">Hai domande? Contattaci:</p>
          <a href="mailto:terryliano20011@gmail.com" style="color:#c9a96e;font-size:13px;text-decoration:none">terryliano20011@gmail.com</a>
        </div>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#080810;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.04)">
        <p style="color:rgba(80,80,110,0.6);font-size:11px;margin:0;line-height:1.6">
          © 2024 GabryShop · Tutti i diritti riservati<br/>
          Rimborso garantito 7 giorni · Prodotti 100% digitali
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`

    const { data, error } = await resend.emails.send({
      from: 'GabryShop <onboarding@resend.dev>',
      to: [customerEmail],
      subject: '✅ Ordine confermato — GabryShop',
      html,
    })

    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ success: true, id: data?.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
