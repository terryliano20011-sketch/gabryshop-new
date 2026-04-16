import { NextRequest, NextResponse } from 'next/server'

async function getPayPalToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  const secret = process.env.PAYPAL_CLIENT_SECRET!
  const base64 = Buffer.from(`${clientId}:${secret}`).toString('base64')
  
  // Prova prima live, fallback sandbox
  const urls = [
    'https://api-m.paypal.com/v1/oauth2/token',
    'https://api-m.sandbox.paypal.com/v1/oauth2/token'
  ]
  
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      })
      const data = await res.json()
      if (data.access_token) {
        return { token: data.access_token, baseUrl: url.replace('/v1/oauth2/token', '') }
      }
    } catch {}
  }
  throw new Error('PayPal auth failed')
}

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()
    const { token, baseUrl } = await getPayPalToken()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gabryshop-digitale.vercel.app'

    const orderItems = items.map((item: any) => ({
      name: item.product.name.substring(0, 127),
      unit_amount: { currency_code: 'EUR', value: Number(item.product.price).toFixed(2) },
      quantity: String(item.quantity),
    }))

    const totalFixed = Number(total).toFixed(2)

    const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: totalFixed,
            breakdown: {
              item_total: { currency_code: 'EUR', value: totalFixed },
            },
          },
          items: orderItems,
          custom_id: JSON.stringify({ email: form.email, name: form.name }),
        }],
        payment_source: {
          paypal: {
            experience_context: {
              return_url: `${siteUrl}/checkout/success`,
              cancel_url: `${siteUrl}/checkout`,
              brand_name: 'GabryShop',
              locale: 'it-IT',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW',
            }
          }
        }
      }),
    })

    const order = await res.json()
    console.log('PayPal response:', JSON.stringify(order))
    
    const approveUrl = order.links?.find((l: any) => l.rel === 'approve' || l.rel === 'payer-action')?.href
    
    if (!approveUrl) {
      console.error('No approve URL. Order:', JSON.stringify(order))
      return NextResponse.json({ error: 'Errore PayPal: ' + (order.message || 'nessun link approvazione') }, { status: 500 })
    }
    
    return NextResponse.json({ orderId: order.id, approveUrl })
  } catch (error: any) {
    console.error('PayPal error:', error)
    return NextResponse.json({ error: error.message || 'Errore creazione ordine' }, { status: 500 })
  }
}
