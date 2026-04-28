import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const OWNER_EMAIL = 'terryliano20011@gmail.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gabryshop-digitale.vercel.app'

export async function POST(req: NextRequest) {
  try {
    const { customerName, customerEmail, orderId, items, total } = await req.json()

    const itemsHtml = (items || []).map((item: any) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
            <div>
              <div style="color:white;font-size:14px;font-weight:600;margin-bottom:3px">${item.product_name}</div>
              <div style="color:rgba(120,120,155,0.6);font-size:12px">Qtà: ${item.quantity || 1}</div>
              ${item.briefing && Object.keys(item.briefing).length > 0 ? '<div style="color:#c9a96e;font-size:11px;margin-top:4px">✏️ Briefing ricevuto</div>' : ''}
            </div>
            <div style="font-family:Georgia,serif;color:white;font-size:18px;font-weight:600;white-space:nowrap">€${item.price}</div>
          </div>
        </td>
      </tr>`).join('')

  const itemsHtmlOwner = (items || []).map((item: any) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb">
          <div style="display:flex;justify-content:space-between">
            <span style="font-size:13px;color:#111">${item.product_name}</span>
            <span style="font-size:13px;font-weight:700;color:#111">€${item.price}</span>
          </div>
          ${item.briefing && Object.keys(item.briefing).length > 0 ? '<div style="font-size:11px;color:#6366f1;margin-top:3px">✏️ Briefing compilato</div>' : '<div style="font-size:11px;color:#f59e0b;margin-top:3px">⚠️ Nessun briefing</div>'}
        </td>
      </tr>`).join('')

    // EMAIL AL CLIENTE
    const customerHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#05050a;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#05050a;min-height:100vh">
  <tr><td align="center" style="padding:40px 20px">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
      <tr><td style="background:#0d0d18;border-radius:20px 20px 0 0;padding:40px;text-align:center;border-bottom:1px solid rgba(201,169,110,0.15)">
        <div style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:white;margin-bottom:20px"><span style="color:#c9a96e">Gabry</span>Shop</div>
        <div style="font-size:48px;margin-bottom:12px">✅</div>
        <h1 style="font-family:Georgia,serif;color:white;font-size:28px;font-weight:600;margin:0 0 8px">Ordine confermato!</h1>
        <p style="color:rgba(150,150,185,0.8);font-size:15px;margin:0">Grazie ${customerName}, il tuo ordine è stato ricevuto.</p>
      </td></tr>
      <tr><td style="background:#0d0d18;padding:32px 40px">
        <div style="background:rgba(201,169,110,0.06);border:1px solid rgba(201,169,110,0.15);border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:center">
          <div style="color:rgba(120,120,155,0.7);font-size:11px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">Numero ordine</div>
          <div style="color:#c9a96e;font-family:Georgia,serif;font-size:18px;font-weight:bold">${(orderId||'').toString().slice(0,8).toUpperCase()}</div>
        </div>
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
        <div style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:24px">
          <h3 style="font-family:Georgia,serif;color:white;font-size:15px;font-weight:600;margin:0 0 16px">⏱️ Cosa succede adesso?</h3>
          ${[['1','Conferma ricevuta','Hai ricevuto questa email di conferma'],['2','Lavorazione in corso','Iniziamo a preparare il tuo ordine entro poche ore'],['3','Consegna','Ricevi il file digitale via email entro 24-48 ore']].map(([n,t,d])=>`
          <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px">
            <div style="width:24px;height:24px;border-radius:50%;background:rgba(201,169,110,0.12);border:1px solid rgba(201,169,110,0.2);color:#c9a96e;font-size:11px;font-weight:bold;text-align:center;line-height:24px;flex-shrink:0">${n}</div>
            <div><div style="color:white;font-size:13px;font-weight:600">${t}</div><div style="color:rgba(120,120,155,0.65);font-size:12px">${d}</div></div>
          </div>`).join('')}
        </div>
        <div style="text-align:center;margin-bottom:24px">
          <a href="${SITE_URL}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#c9a96e,#b8924a);color:#08060a;text-decoration:none;border-radius:100px;font-size:14px;font-weight:bold">Visita GabryShop →</a>
        </div>
        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.02);border-radius:12px">
          <p style="color:rgba(120,120,155,0.65);font-size:13px;margin:0 0 8px">Hai domande? Contattaci:</p>
          <a href="mailto:${OWNER_EMAIL}" style="color:#c9a96e;font-size:13px;text-decoration:none">${OWNER_EMAIL}</a>
        </div>
      </td></tr>
      <tr><td style="background:#080810;border-radius:0 0 20px 20px;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.04)">
        <p style="color:rgba(80,80,110,0.6);font-size:11px;margin:0;line-height:1.6">© 2026 GabryShop · Tutti i diritti riservati<br/>Rimborso garantito 7 giorni · Prodotti 100% digitali</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`

    // EMAIL AL PROPRIETARIO (te)
    const ownerHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6">
  <tr><td align="center" style="padding:32px 20px">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
      <tr><td style="background:linear-gradient(135deg,#1a1a2e,#2d1b4e);border-radius:16px 16px 0 0;padding:28px 32px;text-align:center">
        <div style="font-size:36px;margin-bottom:8px">🛒</div>
        <h1 style="color:white;font-size:22px;font-weight:700;margin:0 0 6px">Nuovo ordine ricevuto!</h1>
        <p style="color:rgba(200,200,220,0.75);font-size:14px;margin:0">GabryShop · ${new Date().toLocaleString('it-IT')}</p>
      </td></tr>
      <tr><td style="background:white;padding:28px 32px">

        <!-- Cliente -->
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:20px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:10px">👤 Cliente</div>
          <div style="font-size:16px;font-weight:700;color:#111;margin-bottom:4px">${customerName}</div>
          <div style="font-size:13px;color:#6b7280">${customerEmail}</div>
        </div>

        <!-- Prodotti -->
        <div style="margin-bottom:20px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:10px">🛍️ Prodotti</div>
          <table width="100%" cellpadding="0" cellspacing="0">${itemsHtmlOwner}</table>
        </div>

        <!-- Totale -->
        <div style="background:#1a1a2e;border-radius:10px;padding:16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
          <span style="color:rgba(200,200,220,0.8);font-size:14px;font-weight:600">Totale incassato</span>
          <span style="color:#c9a96e;font-size:28px;font-weight:800">€${total}</span>
        </div>

        <!-- Azioni -->
        <div style="display:flex;gap:10px;justify-content:center">
          <a href="${SITE_URL}/admin" style="padding:12px 24px;background:#c9a96e;color:#08060a;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700">Vai all'Admin →</a>
          <a href="mailto:${customerEmail}?subject=Il tuo ordine GabryShop" style="padding:12px 24px;background:#f3f4f6;color:#111;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;border:1px solid #e5e7eb">📧 Rispondi al cliente</a>
        </div>
      </td></tr>
      <tr><td style="background:#1a1a2e;border-radius:0 0 16px 16px;padding:16px 32px;text-align:center">
        <p style="color:rgba(200,200,220,0.4);font-size:11px;margin:0">GabryShop Admin · Notifica automatica</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`

    // Invia entrambe le email in parallelo
    const [customerRes, ownerRes] = await Promise.allSettled([
      resend.emails.send({
        from: 'GabryShop <onboarding@resend.dev>',
        to: [customerEmail],
        subject: '✅ Ordine confermato — GabryShop',
        html: customerHtml,
      }),
      resend.emails.send({
        from: 'GabryShop <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        subject: `🛒 Nuovo ordine €${total} da ${customerName}`,
        html: ownerHtml,
      })
    ])

    return NextResponse.json({
      success: true,
      customer: customerRes.status === 'fulfilled' ? 'sent' : 'failed',
      owner: ownerRes.status === 'fulfilled' ? 'sent' : 'failed',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
