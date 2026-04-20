import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { to, name, orderItems, total, downloadLinks } = await req.json()

    const itemsHtml = orderItems.map((item: any) =>
      `<tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a24;color:#f0f0f8;">${item.product_name}</td>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a24;color:#c9a96e;text-align:right;font-weight:600;">€${item.price}</td>
      </tr>`
    ).join('')

    const linksHtml = downloadLinks?.map((link: any) =>
      `<a href="${link.url}" style="display:block;background:#c9a96e;color:#0a0a0f;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:8px 0;">
        ⬇️ Scarica: ${link.name}
      </a>`
    ).join('') || ''

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'DM Sans',system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#c9a96e,#8b6fd4);padding:12px 16px;border-radius:12px;margin-bottom:16px;">
        <span style="font-size:24px;">✨</span>
      </div>
      <h1 style="color:#f0f0f8;font-size:28px;margin:0 0 8px;font-family:Georgia,serif;">GabryShop</h1>
      <p style="color:#8888aa;margin:0;">Conferma ordine e download</p>
    </div>

    <!-- Main card -->
    <div style="background:#111118;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;margin-bottom:24px;">
      <h2 style="color:#f0f0f8;font-size:22px;margin:0 0 8px;font-family:Georgia,serif;">Grazie, ${name}! 🎉</h2>
      <p style="color:#8888aa;margin:0 0 24px;">Il tuo pagamento è stato ricevuto. Ecco il riepilogo del tuo ordine.</p>

      <!-- Ordine -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${itemsHtml}
        <tr>
          <td style="padding:16px 0 0;color:#8888aa;font-weight:600;">Totale pagato</td>
          <td style="padding:16px 0 0;color:#c9a96e;font-weight:700;font-size:20px;text-align:right;">€${total}</td>
        </tr>
      </table>

      <!-- Download -->
      ${linksHtml ? `
      <div style="background:rgba(201,169,110,0.05);border:1px solid rgba(201,169,110,0.2);border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="color:#f0f0f8;margin:0 0 16px;font-size:16px;">⬇️ I tuoi download</h3>
        ${linksHtml}
        <p style="color:#8888aa;font-size:12px;margin:12px 0 0;">I link scadono tra 1 anno. Puoi scaricare il file fino a 10 volte.</p>
      </div>` : `
      <div style="background:rgba(124,106,240,0.05);border:1px solid rgba(124,106,240,0.2);border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#8888aa;margin:0;">📋 Il tuo ordine è personalizzato e sarà lavorato dal nostro team. Riceverai una comunicazione entro le tempistiche indicate.</p>
      </div>`}

      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account" style="display:block;background:linear-gradient(135deg,#c9a96e,#d4b87a);color:#0a0a0f;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;text-align:center;">
        Vai al tuo Account →
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#8888aa;font-size:12px;">
      <p>Hai domande? <a href="mailto:info@gabryshop.it" style="color:#c9a96e;">info@gabryshop.it</a> · 
        <a href="https://wa.me/393518435322" style="color:#c9a96e;">WhatsApp</a></p>
      <p style="margin-top:8px;">© ${new Date().getFullYear()} GabryShop — 
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/privacy" style="color:#c9a96e;">Privacy</a> · 
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/termini" style="color:#c9a96e;">Termini</a>
      </p>
    </div>
  </div>
</body>
</html>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@gabryshop.it',
        to,
        subject: '✅ Ordine confermato — GabryShop',
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(JSON.stringify(err))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Email non inviata' }, { status: 500 })
  }
}
