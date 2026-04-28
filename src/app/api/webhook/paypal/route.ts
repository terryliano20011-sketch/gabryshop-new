import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const eventType = body.event_type

    // Gestisci solo i pagamenti completati
    if (eventType !== 'CHECKOUT.ORDER.APPROVED' && eventType !== 'PAYMENT.CAPTURE.COMPLETED') {
      return NextResponse.json({ received: true })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Estrai l'ID ordine Supabase dal custom_id
    const resource = body.resource
    const customId = resource?.purchase_units?.[0]?.custom_id ||
                     resource?.supplementary_data?.related_ids?.order_id ||
                     resource?.custom_id

    const paypalOrderId = resource?.id || resource?.supplementary_data?.related_ids?.order_id
    const captureId = resource?.id

    if (!customId) {
      console.error('No custom_id in webhook:', JSON.stringify(body).slice(0, 200))
      return NextResponse.json({ received: true })
    }

    // Aggiorna stato ordine su Supabase
    const updateData: any = {
      status: 'paid',
      updated_at: new Date().toISOString(),
    }
    if (paypalOrderId) updateData.paypal_order_id = paypalOrderId
    if (captureId && eventType === 'PAYMENT.CAPTURE.COMPLETED') updateData.paypal_capture_id = captureId

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', customId)

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
    }

    console.log(`✅ Order ${customId} marked as PAID`)
    return NextResponse.json({ received: true, updated: customId })
  } catch (err: any) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PayPal richiede risposta 200 anche per le verifiche
export async function GET() {
  return NextResponse.json({ status: 'webhook active' })
}
