import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const OWNER_EMAIL = 'terryliano20011@gmail.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gabryshop-digitale.vercel.app'

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()

    // 1. Salva ordine su Supabase con status 'pending_cash'
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

    // 2. Invia email al proprietario
    try {
      const itemsList = items.map((i: any) => `• ${i.product.name} — €${i.product.price}`).join('\n')
      await fetch(`${SITE_URL}/api/email/order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          orderId,
          items: items.map((i: any) => ({
            product_name: i.product.name,
            price: i.product.price,
            quantity: i.quantity || 1,
            briefing: i.briefing || null,
          })),
          total,
          isCash: true,
        }),
      })
    } catch (e) {
      console.error('Email error:', e)
    }

    return NextResponse.json({ success: true, orderId })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
