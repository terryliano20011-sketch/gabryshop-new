'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShoppingCart, User, CreditCard, Trash2, Tag, Lock, Shield } from 'lucide-react'

const STEPS = ['Riepilogo', 'I tuoi dati', 'Pagamento']

export default function CheckoutPage() {
  const { items, removeItem, total } = useCart()
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState({ name:'', email:'', vat:'', coupon:'' })
  const [discount, setDiscount] = useState(0)
  const [couponOk, setCouponOk] = useState(false)
  const [payMethod, setPayMethod] = useState<'paypal'|'card'>('paypal')
  const [loading, setLoading]   = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const final = Math.max(0, total - discount)

  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [couponInfo, setCouponInfo] = useState<{label:string,description:string}|null>(null)

  const applyCoupon = async () => {
    if (!form.coupon.trim() || couponOk) return
    setCouponLoading(true)
    setCouponError('')
    try {
      const res = await fetch('/api/coupon/validate', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ code: form.coupon, total })
      })
      const data = await res.json()
      if (data.valid) {
        setDiscount(data.discountAmount)
        setCouponOk(true)
        setCouponInfo({ label: data.label, description: data.description })
      } else {
        setCouponError(data.error)
      }
    } catch {
      setCouponError('Errore di rete. Riprova.')
    } finally {
      setCouponLoading(false)
    }
  }

  const handlePay = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, form, total: final, payMethod }),
      })
      const data = await res.json()
      if (data.approveUrl) window.location.href = data.approveUrl
      else alert(data.error || 'Errore nel pagamento')
    } catch { alert('Errore. Riprova.') }
    finally { setLoading(false) }
  }

  if (items.length === 0) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',background:'#05050a',paddingTop:'80px'}}>
      <ShoppingCart size={48} style={{color:'rgba(120,120,155,0.3)'}}/>
      <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'2rem',fontWeight:600}}>Carrello vuoto</h2>
      <p style={{color:'rgba(120,120,155,0.7)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px'}}>Non hai ancora aggiunto prodotti.</p>
      <Link href="/" className="g-btn g-btn-gold" style={{marginTop:'8px',borderRadius:'12px'}}>Scopri i prodotti</Link>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'100px',paddingBottom:'80px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 5%'}}>

        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(120,120,155,0.65)',textDecoration:'none',fontSize:'13px',fontFamily:'Outfit,system-ui,sans-serif',marginBottom:'36px'}}>
          <ArrowLeft size={14}/> Continua lo shopping
        </Link>

        <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'2.8rem',fontWeight:600,marginBottom:'36px',lineHeight:1}}>Checkout</h1>

        {/* Stepper */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'40px'}}>
          {STEPS.map((s,i) => (
            <div key={s} style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 18px',borderRadius:'100px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,transition:'all 0.3s',
                background:i===step?'#c9a96e':i<step?'rgba(201,169,110,0.1)':'rgba(255,255,255,0.04)',
                color:i===step?'#08060a':i<step?'#c9a96e':'rgba(120,120,155,0.55)',
                border:i<step?'1px solid rgba(201,169,110,0.2)':'1px solid transparent'}}>
                <span>{i<step?'✓':i+1}</span> {s}
              </div>
              {i < STEPS.length-1 && <div style={{width:'24px',height:'1px',background:'rgba(255,255,255,0.07)'}}/>}
            </div>
          ))}
        </div>

        <div className="grid-checkout" style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'24px',alignItems:'start'}}>

          {/* ── MAIN ── */}
          <div>

            {/* STEP 0 — Riepilogo */}
            {step === 0 && (
              <div className="g-card" style={{padding:'32px',borderRadius:'20px'}}>
                <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'24px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <ShoppingCart size={20} style={{color:'#c9a96e'}}/> Il tuo ordine
                </h2>
                <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'28px'}}>
                  {items.map(item => (
                    <div key={item.product.id} style={{display:'flex',alignItems:'center',gap:'14px',padding:'16px',background:'rgba(255,255,255,0.025)',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.05)'}}>
                      <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{item.product.category?.icon||'📦'}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:600,marginBottom:'3px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.product.name}</div>
                        <div style={{color:'rgba(120,120,155,0.6)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px'}}>{item.product.delivery_time}</div>
                        {item.briefing && Object.keys(item.briefing).length > 0 && <div style={{color:'#c9a96e',fontSize:'11px',marginTop:'3px'}}>✏️ Briefing compilato</div>}
                      </div>
                      <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.4rem',fontWeight:600,flexShrink:0}}>€{item.product.price}</div>
                      <button onClick={() => removeItem(item.product.id)} style={{background:'transparent',border:'none',cursor:'pointer',padding:'6px',borderRadius:'8px',color:'rgba(120,120,155,0.4)',flexShrink:0}}>
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon avanzato */}
                <div style={{marginBottom:'24px'}}>
                  <div style={{display:'flex',gap:'10px',marginBottom:'8px'}}>
                    <div style={{flex:1,position:'relative'}}>
                      <Tag size={14} style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'rgba(120,120,155,0.4)'}}/>
                      <input className="g-input" placeholder="Codice coupon (es. GABRY10, WELCOME5...)"
                        style={{paddingLeft:'40px',borderColor:couponOk?'rgba(74,222,128,0.3)':couponError?'rgba(239,68,68,0.3)':'rgba(255,255,255,0.08)'}}
                        value={form.coupon}
                        onChange={e=>{setForm(f=>({...f,coupon:e.target.value}));setCouponError('')}}
                        onKeyDown={e=>e.key==='Enter'&&!couponOk&&applyCoupon()}
                        disabled={couponOk}/>
                    </div>
                    <button onClick={applyCoupon} disabled={couponOk||!form.coupon.trim()||couponLoading}
                      style={{padding:'12px 20px',borderRadius:'12px',border:`1px solid ${couponOk?'rgba(74,222,128,0.3)':'rgba(201,169,110,0.28)'}`,
                        color:couponOk?'#4ade80':'#c9a96e',background:couponOk?'rgba(74,222,128,0.06)':'rgba(201,169,110,0.06)',
                        fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',
                        opacity:(couponOk||!form.coupon.trim())?0.6:1,transition:'all 0.2s'}}>
                      {couponLoading?'...' : couponOk?'✓ Applicato':'Applica'}
                    </button>
                  </div>
                  {couponOk && couponInfo && (
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',background:'rgba(74,222,128,0.05)',border:'1px solid rgba(74,222,128,0.15)',borderRadius:'10px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'16px'}}>🎁</span>
                        <div>
                          <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'#4ade80',fontSize:'13px',fontWeight:600}}>{couponInfo.label} applicato!</div>
                          <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.65)',fontSize:'11px'}}>{couponInfo.description}</div>
                        </div>
                      </div>
                      <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',color:'rgba(74,222,128,0.6)',background:'rgba(74,222,128,0.06)',padding:'3px 8px',borderRadius:'100px',border:'1px solid rgba(74,222,128,0.15)'}}>
                        applicato
                      </div>
                    </div>
                  )}
                  {couponError && (
                    <div style={{padding:'10px 14px',background:'rgba(239,68,68,0.05)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:'10px'}}>
                      <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'#f87171',fontSize:'12px'}}>❌ {couponError}</span>
                    </div>
                  )}
                </div>

                <button onClick={() => setStep(1)} className="g-btn g-btn-gold" style={{width:'100%',justifyContent:'center',borderRadius:'14px',padding:'16px',fontSize:'15px'}}>
                  Continua <ArrowRight size={17}/>
                </button>
              </div>
            )}

            {/* STEP 1 — Dati */}
            {step === 1 && (
              <div className="g-card" style={{padding:'32px',borderRadius:'20px'}}>
                <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'24px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <User size={20} style={{color:'#c9a96e'}}/> I tuoi dati
                </h2>
                <div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'28px'}}>
                  {[
                    {key:'name',  label:'NOME E COGNOME *', type:'text',  ph:'Mario Rossi'},
                    {key:'email', label:'EMAIL *',           type:'email', ph:'mario@email.it'},
                    {key:'vat',   label:'PARTITA IVA (opzionale)', type:'text', ph:'IT12345678901'},
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(120,120,155,0.6)',display:'block',marginBottom:'8px'}}>{f.label}</label>
                      <input className="g-input" type={f.type} placeholder={f.ph} value={(form as any)[f.key]} onChange={e=>setForm(prev=>({...prev,[f.key]:e.target.value}))}/>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button onClick={() => setStep(0)} className="g-btn g-btn-ghost" style={{borderRadius:'14px',padding:'14px 24px'}}><ArrowLeft size={15}/> Indietro</button>
                  <button onClick={() => setStep(2)} disabled={!form.name||!form.email} className="g-btn g-btn-gold" style={{flex:1,justifyContent:'center',borderRadius:'14px',padding:'16px',fontSize:'15px',opacity:(!form.name||!form.email)?0.5:1}}>
                    Continua <ArrowRight size={17}/>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Pagamento */}
            {step === 2 && (
              <div className="g-card" style={{padding:'32px',borderRadius:'20px'}}>
                <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'24px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <CreditCard size={20} style={{color:'#c9a96e'}}/> Metodo di pagamento
                </h2>

                {/* Selezione metodo */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'28px'}}>
                  {/* PayPal */}
                  <button onClick={() => setPayMethod('paypal')} style={{padding:'20px',borderRadius:'16px',border:`2px solid ${payMethod==='paypal'?'rgba(201,169,110,0.5)':'rgba(255,255,255,0.07)'}`,background:payMethod==='paypal'?'rgba(201,169,110,0.04)':'rgba(255,255,255,0.02)',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',transition:'all 0.2s'}}>
                    <div style={{fontSize:'28px'}}>🅿️</div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'14px',fontWeight:600}}>PayPal</div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'11px',textAlign:'center'}}>Conto PayPal o carta tramite PayPal</div>
                    {payMethod==='paypal' && <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,color:'#c9a96e',background:'rgba(201,169,110,0.1)',padding:'3px 10px',borderRadius:'100px',border:'1px solid rgba(201,169,110,0.2)'}}>✓ Selezionato</div>}
                  </button>

                  {/* Carta diretta */}
                  <button onClick={() => setPayMethod('card')} style={{padding:'20px',borderRadius:'16px',border:`2px solid ${payMethod==='card'?'rgba(201,169,110,0.5)':'rgba(255,255,255,0.07)'}`,background:payMethod==='card'?'rgba(201,169,110,0.04)':'rgba(255,255,255,0.02)',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',transition:'all 0.2s'}}>
                    <div style={{display:'flex',gap:'6px'}}>
                      {/* Loghi carte */}
                      <div style={{width:'36px',height:'24px',background:'#1a1f71',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:900,color:'white',fontFamily:'Arial,sans-serif',letterSpacing:'-0.5px'}}>VISA</div>
                      <div style={{width:'36px',height:'24px',background:'transparent',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                        <div style={{width:'16px',height:'16px',borderRadius:'50%',background:'#eb001b',position:'absolute',left:'2px'}}/>
                        <div style={{width:'16px',height:'16px',borderRadius:'50%',background:'#f79e1b',position:'absolute',right:'2px',opacity:0.9}}/>
                      </div>
                      <div style={{width:'36px',height:'24px',background:'#006FCF',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8px',fontWeight:900,color:'white',fontFamily:'Arial,sans-serif'}}>AMEX</div>
                    </div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'14px',fontWeight:600}}>Carta di credito / debito</div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'11px',textAlign:'center'}}>Visa, Mastercard, Amex</div>
                    {payMethod==='card' && <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,color:'#c9a96e',background:'rgba(201,169,110,0.1)',padding:'3px 10px',borderRadius:'100px',border:'1px solid rgba(201,169,110,0.2)'}}>✓ Selezionato</div>}
                  </button>
                </div>

                {/* Info metodo selezionato */}
                {payMethod === 'card' && (
                  <div style={{padding:'16px 20px',background:'rgba(201,169,110,0.04)',border:'1px solid rgba(201,169,110,0.12)',borderRadius:'14px',marginBottom:'24px'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                      <Lock size={15} style={{color:'#c9a96e',flexShrink:0,marginTop:'2px'}}/>
                      <div>
                        <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'13px',fontWeight:600,marginBottom:'4px'}}>Pagamento sicuro con carta</div>
                        <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.7)',fontSize:'12px',lineHeight:1.6}}>
                          Verrai reindirizzato al checkout sicuro PayPal dove potrai inserire i dati della tua carta. I dati non passano mai per i nostri server — sicurezza garantita da PayPal.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {payMethod === 'paypal' && (
                  <div style={{padding:'16px 20px',background:'rgba(0,48,135,0.08)',border:'1px solid rgba(0,48,135,0.2)',borderRadius:'14px',marginBottom:'24px'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                      <span style={{fontSize:'18px',flexShrink:0}}>🅿️</span>
                      <div>
                        <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'13px',fontWeight:600,marginBottom:'4px'}}>Pagamento con PayPal</div>
                        <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.7)',fontSize:'12px',lineHeight:1.6}}>
                          Accedi al tuo conto PayPal oppure paga con carta direttamente dalla finestra PayPal. Rimborso garantito 7 giorni.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Riepilogo finale */}
                <div style={{padding:'20px',background:'rgba(255,255,255,0.025)',borderRadius:'14px',marginBottom:'24px'}}>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'12px',marginBottom:'4px'}}>Ordine per: <span style={{color:'white',fontWeight:600}}>{form.name}</span></div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'12px',marginBottom:'16px'}}>Email conferma: <span style={{color:'white'}}>{form.email}</span></div>
                  <div style={{height:'1px',background:'rgba(255,255,255,0.05)',marginBottom:'16px'}}/>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                    <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'13px'}}>Totale da pagare</span>
                    <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'2rem',fontWeight:600,color:'white'}}>€{final.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkbox T&C obbligatorio */}
                <div style={{padding:'16px 20px',background:'rgba(255,255,255,0.02)',border:`1px solid ${acceptedTerms?'rgba(201,169,110,0.2)':'rgba(255,255,255,0.06)'}`,borderRadius:'14px',marginBottom:'16px',transition:'border-color 0.2s'}}>
                  <label style={{display:'flex',alignItems:'flex-start',gap:'12px',cursor:'pointer'}}>
                    <div onClick={()=>setAcceptedTerms(v=>!v)}
                      style={{width:'20px',height:'20px',borderRadius:'6px',border:`2px solid ${acceptedTerms?'#c9a96e':'rgba(120,120,155,0.4)'}`,background:acceptedTerms?'#c9a96e':'transparent',flexShrink:0,marginTop:'1px',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s',cursor:'pointer'}}>
                      {acceptedTerms&&<span style={{color:'#08060a',fontSize:'12px',fontWeight:900,lineHeight:1}}>✓</span>}
                    </div>
                    <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(150,150,185,0.82)',lineHeight:1.6}}>
                      Ho letto e accetto i{' '}
                      <a href="/termini" target="_blank" style={{color:'#c9a96e',textDecoration:'underline'}}>Termini e Condizioni</a>
                      {' '}e la{' '}
                      <a href="/privacy" target="_blank" style={{color:'#c9a96e',textDecoration:'underline'}}>Privacy Policy</a>.
                      {' '}<strong style={{color:'rgba(240,180,180,0.85)'}}>Confermo che i prodotti digitali personalizzati non sono rimborsabili dopo l&apos;inizio della lavorazione.</strong>
                    </span>
                  </label>
                </div>

                <div style={{display:'flex',gap:'12px'}}>
                  <button onClick={() => setStep(1)} className="g-btn g-btn-ghost" style={{borderRadius:'14px',padding:'14px 24px'}}><ArrowLeft size={15}/> Indietro</button>
                  <button onClick={handlePay} disabled={loading||!acceptedTerms} className="g-btn g-btn-gold" style={{flex:1,justifyContent:'center',borderRadius:'14px',padding:'16px',fontSize:'15px',opacity:(loading||!acceptedTerms)?0.45:1}}>
                    {loading ? '⏳ Reindirizzamento...' : payMethod === 'card' ? `💳 Paga €${final.toFixed(2)} con carta` : `🅿️ Paga €${final.toFixed(2)} con PayPal`}
                  </button>
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginTop:'20px',flexWrap:'wrap'}}>
                  {[
                    {icon:<Lock size={12}/>, text:'SSL sicuro'},
                    {icon:<Shield size={12}/>, text:'Rimborso 7 giorni'},
                    {icon:<span style={{fontSize:'12px'}}>🅿️</span>, text:'Protetto da PayPal'},
                  ].map(b => (
                    <div key={b.text} style={{display:'flex',alignItems:'center',gap:'5px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(100,100,135,0.7)'}}>
                      <span style={{color:'rgba(120,120,155,0.5)'}}>{b.icon}</span>{b.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="g-card checkout-sidebar" style={{padding:'24px',borderRadius:'20px',position:'sticky',top:'100px'}}>
            <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.3rem',fontWeight:600,marginBottom:'20px'}}>Riepilogo ordine</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
              {items.map(item => (
                <div key={item.product.id} style={{display:'flex',justifyContent:'space-between',gap:'12px',alignItems:'flex-start'}}>
                  <span style={{color:'rgba(120,120,155,0.72)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',lineHeight:1.4}}>{item.product.name}</span>
                  <span style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,flexShrink:0}}>€{item.product.price}</span>
                </div>
              ))}
            </div>
            <div style={{height:'1px',background:'rgba(255,255,255,0.05)',marginBottom:'16px'}}/>
            {discount > 0 && (
              <div style={{marginBottom:'12px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{color:'rgba(120,120,155,0.65)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px'}}>Subtotale</span>
                  <span style={{color:'rgba(150,150,185,0.8)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px'}}>€{total.toFixed(2)}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:'rgba(74,222,128,0.04)',border:'1px solid rgba(74,222,128,0.12)',borderRadius:'8px'}}>
                  <div>
                    <span style={{color:'#4ade80',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',fontWeight:600}}>🎁 {form.coupon.toUpperCase()}</span>
                    {couponInfo && <div style={{color:'rgba(74,222,128,0.7)',fontSize:'10px',fontFamily:'Outfit,system-ui,sans-serif'}}>{couponInfo.description}</div>}
                  </div>
                  <span style={{color:'#4ade80',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:700}}>−€{discount.toFixed(2)}</span>
                </div>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
              <span style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>Totale</span>
              <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.9rem',fontWeight:600,color:'#c9a96e'}}>€{final.toFixed(2)}</span>
            </div>
            <div style={{color:'rgba(90,90,120,0.6)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',marginBottom:'20px'}}>IVA inclusa · Tutto digitale</div>

            {/* Loghi pagamento */}
            <div style={{padding:'14px',background:'rgba(255,255,255,0.02)',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.05)'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(120,120,155,0.45)',marginBottom:'12px',textAlign:'center'}}>Metodi accettati</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',flexWrap:'wrap'}}>
                <div style={{width:'40px',height:'26px',background:'#1a1f71',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:900,color:'white',fontFamily:'Arial,sans-serif',letterSpacing:'-0.5px'}}>VISA</div>
                <div style={{width:'40px',height:'26px',background:'transparent',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#eb001b',position:'absolute',left:'3px'}}/>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#f79e1b',position:'absolute',right:'3px',opacity:0.9}}/>
                </div>
                <div style={{width:'40px',height:'26px',background:'#006FCF',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:900,color:'white',fontFamily:'Arial,sans-serif'}}>AMEX</div>
                <div style={{width:'40px',height:'26px',background:'#003087',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:900,color:'#009cde',fontFamily:'Arial,sans-serif',letterSpacing:'-0.5px'}}>PP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
