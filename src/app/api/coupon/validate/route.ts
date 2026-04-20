import { NextRequest, NextResponse } from 'next/server'

const COUPONS: Record<string, {
  type: 'percent' | 'fixed'
  value: number
  minOrder: number
  expiry?: string
  description: string
  active: boolean
}> = {
  'GABRY10':  { type:'percent', value:10, minOrder:0,  description:'10% di sconto su tutto',           active:true },
  'GABRY20':  { type:'percent', value:20, minOrder:30, description:'20% di sconto (min. €30)',          active:true },
  'WELCOME5': { type:'fixed',   value:5,  minOrder:15, description:'€5 di sconto — Benvenuto!',         active:true },
  'MENU10':   { type:'fixed',   value:10, minOrder:14, description:'€10 di sconto sui menu digitali',   active:true },
  'AMICO15':  { type:'percent', value:15, minOrder:0,  description:'15% di sconto — Porta un amico',    active:true },
  'ESTATE25': { type:'percent', value:25, minOrder:20, description:'25% di sconto — Promo Estate', expiry:'2025-09-01', active:true },
  'FLASH30':  { type:'percent', value:30, minOrder:35, description:'30% di sconto — Offerta Flash',     active:true },
}

export async function POST(req: NextRequest) {
  try {
    const { code, total } = await req.json()
    if (!code) return NextResponse.json({ valid:false, error:'Inserisci un codice' }, { status:400 })

    const coupon = COUPONS[code.toUpperCase().trim()]
    if (!coupon || !coupon.active) return NextResponse.json({ valid:false, error:'Coupon non valido o inesistente' }, { status:400 })
    if (coupon.expiry && new Date(coupon.expiry) < new Date()) return NextResponse.json({ valid:false, error:'Coupon scaduto' }, { status:400 })
    if (total < coupon.minOrder) return NextResponse.json({ valid:false, error:`Ordine minimo €${coupon.minOrder} richiesto (attuale: €${Number(total).toFixed(2)})` }, { status:400 })

    const discountAmount = coupon.type === 'percent'
      ? parseFloat(((total * coupon.value) / 100).toFixed(2))
      : parseFloat(Math.min(coupon.value, total).toFixed(2))

    return NextResponse.json({
      valid: true,
      code: code.toUpperCase().trim(),
      type: coupon.type,
      value: coupon.value,
      discountAmount,
      description: coupon.description,
      label: coupon.type === 'percent' ? `−${coupon.value}%` : `−€${coupon.value}`,
    })
  } catch {
    return NextResponse.json({ valid:false, error:'Errore server' }, { status:500 })
  }
}
