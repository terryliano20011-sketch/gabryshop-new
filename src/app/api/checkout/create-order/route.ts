import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

async function getPayPalToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  const secret = process.env.PAYPAL_CLIENT_SECRET!
  const base64 = Buffer.from(`${clientId}:${secret}`).toString('base64')
  for (const url of ['https://api-m.paypal.com/v1/oauth2/token','https://api-m.sandbox.paypal.com/v1/oauth2/token']) {
    try {
      const res = await fetch(url, { method:'POST', headers:{ Authorization:`Basic ${base64}`, 'Content-Type':'application/x-www-form-urlencoded' }, body:'grant_type=client_credentials' })
      const data = await res.json()
      if (data.access_token) return { token: data.access_token, baseUrl: url.replace('/v1/oauth2/token','') }
    } catch {}
  }
  throw new Error('PayPal auth failed')
}

export async function POST(req: NextRequest) {
  try {
    const { items, form, total: final } = await req.json()
    const { token, baseUrl } = await getPayPalToken()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gabryshop-digitale.vercel.app'

    // 1. Salva ordine su Supabase PRIMA del pagamento
    let supabaseOrderId: string | null = null
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name,
          customer_email: form.email,
          customer_vat: form.vat || null,
          items: items.map((item: any) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            briefing: item.briefing || null,
          })),
          total: total,
          discount_amount: 0,
          coupon_code: form.coupon || null,
          status: 'pending',
          briefing: items.reduce((acc: any, item: any) => {
            if (item.briefing && Object.keys(item.briefing).length > 0) {
              acc[item.product.name] = item.briefing
            }
            return acc
          }, {}),
        })
        .select('id')
        .single()

      if (!error && order) supabaseOrderId = order.id
    } catch (e) {
      console.error('Supabase order save error:', e)
      // Continua comunque col pagamento
    }

    // 2. Crea ordine PayPal
    const orderItems = items.map((item: any) => ({
      name: item.product.name.substring(0, 127),
      unit_amount: { currency_code:'EUR', value: Number(item.product.price).toFixed(2) },
      quantity: String(item.quantity),
    }))

    const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: Number(total).toFixed(2),
            breakdown: { item_total: { currency_code:'EUR', value: Number(total).toFixed(2) } },
          },
          items: orderItems,
          custom_id: supabaseOrderId || JSON.stringify({ email: form.email }),
        }],
        payment_source: {
          paypal: {
            experience_context: {
              return_url: `${siteUrl}/checkout/success`,
              cancel_url: `${siteUrl}/checkout`,
              brand_name: 'GabryShop',
              locale: 'it-IT',
              user_action: 'PAY_NOW',
            }
          }
        }
      }),
    })

    const order = await res.json()
    const approveUrl = order.links?.find((l: any) => l.rel === 'approve' || l.rel === 'payer-action')?.href

    if (!approveUrl) {
      return NextResponse.json({ error: 'Errore PayPal: ' + (order.message || 'no link') }, { status: 500 })
    }

    // 3. Invia email di conferma
    try {
      const emailPayload = {
        customerName: form.name,
        customerEmail: form.email,
        orderId: supabaseOrderId || order.id,
        items: items.map((item: any) => ({
          product_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity || 1,
          briefing: item.briefing || null,
        })),
        total: final,
        status: 'pending',
      }
      const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://gabryshop-digitale.vercel.app'
      await fetch(`${siteBase}/api/email/order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPayload),
      })
    } catch (emailErr) {
      console.error('Email send error (non-blocking):', emailErr)
    }

    return NextResponse.json({ orderId: order.id, approveUrl, supabaseOrderId })
  } catch (error: any) {
    console.error('PayPal error:', error)
    return NextResponse.json({ error: error.message || 'Errore' }, { status: 500 })
  }
}
