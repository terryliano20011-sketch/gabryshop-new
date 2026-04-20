import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { OrderConfirmationEmail } from '@/components/emails/OrderConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customerName, customerEmail, orderId, items, total, status } = body

    const html = renderToStaticMarkup(
      createElement(OrderConfirmationEmail, { customerName, customerEmail, orderId, items, total, status })
    )

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
