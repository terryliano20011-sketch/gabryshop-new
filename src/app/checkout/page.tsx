'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShoppingCart, User, CreditCard, Trash2, Tag } from 'lucide-react'

const STEPS = ['Riepilogo', 'I tuoi dati', 'Pagamento']

export default function CheckoutPage() {
  const { items, removeItem, total } = useCart()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', vat: '', coupon: '' })
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)
  const [loading, setLoading] = useState(false)

  const finalTotal = Math.max(0, total - discount)

  const applyCoupon = () => {
    if (form.coupon.toUpperCase() === 'GABRY10') {
      setDiscount(total * 0.1)
      setCouponApplied(true)
    } else {
      alert('Coupon non valido')
    }
  }

  const handlePayPal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, form, total: finalTotal }),
      })
      const data = await res.json()
      if (data.approveUrl) window.location.href = data.approveUrl
      else alert('Errore creazione ordine')
    } catch {
      alert('Errore nel pagamento. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) return (
    <div className="pt-28 pb-20 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <ShoppingCart className="w-16 h-16 text-[#8888aa] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2" style={{fontFamily:'Playfair Display,serif'}}>Carrello vuoto</h2>
      <p className="text-[#8888aa] mb-8">Non hai ancora aggiunto prodotti.</p>
      <Link href="/" className="btn-gold px-6 py-3 rounded-xl font-semibold">Scopri i prodotti</Link>
    </div>
  )

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8888aa] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Continua lo shopping
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8" style={{fontFamily:'Playfair Display,serif'}}>Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${i === step ? 'bg-[#c9a96e] text-[#0a0a0f]' : i < step ? 'bg-[#c9a96e]/20 text-[#c9a96e]' : 'bg-white/5 text-[#8888aa]'}`}>
              <span>{i < step ? '✓' : i + 1}</span> {s}
            </div>
            {i < STEPS.length - 1 && <div className="w-6 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">

          {step === 0 && (
            <div className="luxury-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{fontFamily:'Playfair Display,serif'}}>
                <ShoppingCart className="w-5 h-5 text-[#c9a96e]" /> Il tuo ordine
              </h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 bg-white/3 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl shrink-0">{item.product.category?.icon || '📦'}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm truncate">{item.product.name}</div>
                      <div className="text-[#8888aa] text-xs">{item.product.delivery_time}</div>
                      {item.briefing && Object.keys(item.briefing).length > 0 && (
                        <div className="text-xs text-[#c9a96e] mt-1">✏️ Personalizzato</div>
                      )}
                    </div>
                    <div className="text-white font-bold shrink-0">€{item.product.price}</div>
                    <button onClick={() => removeItem(item.product.id)} className="text-[#8888aa] hover:text-red-400 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8888aa]" />
                  <input className="input-luxury pl-9 text-sm" placeholder="Codice coupon (prova: GABRY10)" value={form.coupon} onChange={e => setForm(f => ({...f, coupon: e.target.value}))} disabled={couponApplied} />
                </div>
                <button onClick={applyCoupon} disabled={couponApplied} className="px-4 py-2 rounded-lg border border-[#c9a96e]/40 text-[#c9a96e] text-sm hover:bg-[#c9a96e]/10 transition-colors disabled:opacity-50">
                  {couponApplied ? '✓ Applicato' : 'Applica'}
                </button>
              </div>
              <button onClick={() => setStep(1)} className="btn-gold w-full py-4 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2">
                Continua <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="luxury-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{fontFamily:'Playfair Display,serif'}}>
                <User className="w-5 h-5 text-[#c9a96e]" /> I tuoi dati
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#8888aa] mb-1 block">Nome e cognome *</label>
                  <input className="input-luxury" placeholder="Mario Rossi" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                </div>
                <div>
                  <label className="text-sm text-[#8888aa] mb-1 block">Email *</label>
                  <input className="input-luxury" type="email" placeholder="mario@email.it" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
                <div>
                  <label className="text-sm text-[#8888aa] mb-1 block">Partita IVA <span className="text-xs opacity-60">(opzionale)</span></label>
                  <input className="input-luxury" placeholder="IT12345678901" value={form.vat} onChange={e => setForm(f => ({...f, vat: e.target.value}))} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="px-6 py-4 rounded-xl border border-white/10 text-[#8888aa] hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Indietro
                </button>
                <button onClick={() => setStep(2)} disabled={!form.name || !form.email} className="btn-gold flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continua <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="luxury-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{fontFamily:'Playfair Display,serif'}}>
                <CreditCard className="w-5 h-5 text-[#c9a96e]" /> Pagamento
              </h2>
              <div className="bg-[#003087]/20 border border-[#003087]/40 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">🅿️</span>
                <div>
                  <div className="text-white text-sm font-medium">PayPal</div>
                  <div className="text-[#8888aa] text-xs">Carte di credito, debito e saldo PayPal. 100% sicuro.</div>
                </div>
              </div>
              <div className="text-sm text-[#8888aa] mb-6 space-y-1 bg-white/3 rounded-xl p-4">
                <div>Ordine per: <span className="text-white">{form.name}</span></div>
                <div>Email conferma: <span className="text-white">{form.email}</span></div>
                <div className="pt-2 border-t border-white/5 mt-2">Totale: <span className="text-[#c9a96e] font-bold text-xl ml-2">€{finalTotal.toFixed(2)}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl border border-white/10 text-[#8888aa] hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Indietro
                </button>
                <button onClick={handlePayPal} disabled={loading} className="btn-gold flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? '⏳ Caricamento...' : `🅿️ Paga €${finalTotal.toFixed(2)} con PayPal`}
                </button>
              </div>
              <p className="text-xs text-[#8888aa] mt-4 text-center">🔒 Transazione protetta SSL · Rimborso garantito 7 giorni</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="luxury-card rounded-2xl p-6 h-fit">
          <h3 className="text-white font-semibold mb-4" style={{fontFamily:'Playfair Display,serif'}}>Riepilogo</h3>
          <div className="space-y-2 text-sm mb-4">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between text-[#8888aa]">
                <span className="truncate mr-2">{item.product.name}</span>
                <span className="text-white shrink-0">€{item.product.price}</span>
              </div>
            ))}
          </div>
          <div className="divider-gold mb-4" />
          {discount > 0 && (
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#8888aa]">Sconto coupon</span>
              <span className="text-[#22c55e]">-€{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span className="text-white">Totale</span>
            <span className="text-[#c9a96e] text-xl">€{finalTotal.toFixed(2)}</span>
          </div>
          <div className="text-xs text-[#8888aa] mt-2">IVA inclusa · Tutto digitale</div>
        </div>
      </div>
    </div>
  )
}
