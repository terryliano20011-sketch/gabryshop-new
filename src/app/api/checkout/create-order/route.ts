import { NextRequest, NextResponse } from 'next/server'

async function getPayPalToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  const secret = process.env.PAYPAL_CLIENT_SECRET!
  const base64 = Buffer.from(`${clientId}:${secret}`).toString('base64')
  const res = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()
    const token = await getPayPalToken()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const orderItems = items.map((item: any) => ({
      name: item.product.name,
      unit_amount: { currency_code: 'EUR', value: item.product.price.toFixed(2) },
      quantity: String(item.quantity),
    }))

    const res = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
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
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: 'EUR', value: total.toFixed(2) },
            },
          },
          items: orderItems,
          custom_id: JSON.stringify({ email: form.email, name: form.name }),
        }],
        application_context: {
          return_url: `${siteUrl}/checkout/success`,
          cancel_url: `${siteUrl}/checkout`,
          brand_name: 'GabryShop',
          locale: 'it-IT',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
        },
      }),
    })

    const order = await res.json()
    const approveUrl = order.links?.find((l: any) => l.rel === 'approve')?.href
    return NextResponse.json({ orderId: order.id, approveUrl })
  } catch (error) {
    console.error('PayPal error:', error)
    return NextResponse.json({ error: 'Errore creazione ordine' }, { status: 500 })
  }
}
