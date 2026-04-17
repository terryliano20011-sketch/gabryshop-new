'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShoppingCart, User, CreditCard, Trash2, Tag } from 'lucide-react'

const STEPS = ['Riepilogo', 'I tuoi dati', 'Pagamento']

export default function CheckoutPage() {
  const { items, removeItem, total } = useCart()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name:'', email:'', vat:'', coupon:'' })
  const [discount, setDiscount] = useState(0)
  const [couponOk, setCouponOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const final = Math.max(0, total - discount)

  const applyCoupon = () => {
    if (form.coupon.toUpperCase() === 'GABRY10') { setDiscount(total * 0.1); setCouponOk(true) }
    else alert('Coupon non valido')
  }

  const handlePayPal = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/create-order', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items, form, total: final }) })
      const data = await res.json()
      if (data.approveUrl) window.location.href = data.approveUrl
      else alert(data.error || 'Errore nel pagamento')
    } catch { alert('Errore nel pagamento. Riprova.') }
    finally { setLoading(false) }
  }

  if (items.length === 0) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',background:'#05050a',paddingTop:'80px'}}>
      <ShoppingCart size={48} style={{color:'rgba(120,120,155,0.4)'}}/>
      <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'2rem',fontWeight:600}}>Carrello vuoto</h2>
      <p style={{color:'rgba(120,120,155,0.7)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px'}}>Non hai ancora aggiunto prodotti.</p>
      <Link href="/" className="g-btn g-btn-gold" style={{marginTop:'8px',borderRadius:'12px'}}>Scopri i prodotti</Link>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'100px',paddingBottom:'80px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 5%'}}>

        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(120,120,155,0.7)',textDecoration:'none',fontSize:'13px',fontFamily:'Outfit,system-ui,sans-serif',marginBottom:'40px',transition:'color 0.2s'}}>
          <ArrowLeft size={15}/> Continua lo shopping
        </Link>

        <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'3rem',fontWeight:600,marginBottom:'40px',lineHeight:1}}>Checkout</h1>

        {/* Stepper */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'48px'}}>
          {STEPS.map((s,i) => (
            <div key={s} style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 18px',borderRadius:'100px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,transition:'all 0.3s',background:i===step?'#c9a96e':i<step?'rgba(201,169,110,0.12)':'rgba(255,255,255,0.04)',color:i===step?'#08060a':i<step?'#c9a96e':'rgba(120,120,155,0.6)',border:i<step?'1px solid rgba(201,169,110,0.25)':'1px solid transparent'}}>
                <span>{i<step?'✓':i+1}</span> {s}
              </div>
              {i < STEPS.length-1 && <div style={{width:'24px',height:'1px',background:'rgba(255,255,255,0.07)'}}/>}
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'24px',alignItems:'start'}}>
          <div>
            {/* Step 0 */}
            {step === 0 && (
              <div className="g-card" style={{padding:'32px'}}>
                <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'24px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <ShoppingCart size={20} style={{color:'#c9a96e'}}/> Il tuo ordine
                </h2>
                <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'28px'}}>
                  {items.map(item=>(
                    <div key={item.product.id} style={{display:'flex',alignItems:'center',gap:'14px',padding:'16px',background:'rgba(255,255,255,0.025)',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.05)'}}>
                      <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{item.product.category?.icon||'📦'}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:600,marginBottom:'3px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.product.name}</div>
                        <div style={{color:'rgba(120,120,155,0.65)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px'}}>{item.product.delivery_time}</div>
                        {item.briefing && Object.keys(item.briefing).length>0 && <div style={{color:'#c9a96e',fontSize:'11px',marginTop:'3px'}}>✏️ Personalizzato</div>}
                      </div>
                      <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.4rem',fontWeight:600,flexShrink:0}}>€{item.product.price}</div>
                      <button onClick={()=>removeItem(item.product.id)} style={{background:'transparent',border:'none',cursor:'pointer',padding:'6px',borderRadius:'8px',color:'rgba(120,120,155,0.5)',transition:'color 0.2s',flexShrink:0}}>
                        <Trash2 size={15}/>
                      </button>
                    </div>
                  ))}
                </div>
                {/* Coupon */}
                <div style={{display:'flex',gap:'10px',marginBottom:'24px'}}>
                  <div style={{flex:1,position:'relative'}}>
                    <Tag size={15} style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'rgba(120,120,155,0.5)'}}/>
                    <input className="g-input" placeholder="Codice coupon (prova: GABRY10)" style={{paddingLeft:'40px'}} value={form.coupon} onChange={e=>setForm(f=>({...f,coupon:e.target.value}))} disabled={couponOk}/>
                  </div>
                  <button onClick={applyCoupon} disabled={couponOk} style={{padding:'12px 20px',borderRadius:'12px',border:'1px solid rgba(201,169,110,0.3)',color:'#c9a96e',background:'rgba(201,169,110,0.06)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',opacity:couponOk?0.5:1}}>
                    {couponOk?'✓ Applicato':'Applica'}
                  </button>
                </div>
                <button onClick={()=>setStep(1)} className="g-btn g-btn-gold" style={{width:'100%',justifyContent:'center',borderRadius:'14px',padding:'16px',fontSize:'15px'}}>
                  Continua <ArrowRight size={17}/>
                </button>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="g-card" style={{padding:'32px'}}>
                <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'24px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <User size={20} style={{color:'#c9a96e'}}/> I tuoi dati
                </h2>
                <div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'28px'}}>
                  <div>
                    <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(120,120,155,0.7)',letterSpacing:'0.05em',display:'block',marginBottom:'8px'}}>NOME E COGNOME *</label>
                    <input className="g-input" placeholder="Mario Rossi" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
                  </div>
                  <div>
                    <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(120,120,155,0.7)',letterSpacing:'0.05em',display:'block',marginBottom:'8px'}}>EMAIL *</label>
                    <input className="g-input" type="email" placeholder="mario@email.it" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
                  </div>
                  <div>
                    <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(120,120,155,0.7)',letterSpacing:'0.05em',display:'block',marginBottom:'8px'}}>PARTITA IVA <span style={{fontWeight:300,letterSpacing:0}}>(opzionale)</span></label>
                    <input className="g-input" placeholder="IT12345678901" value={form.vat} onChange={e=>setForm(f=>({...f,vat:e.target.value}))}/>
                  </div>
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button onClick={()=>setStep(0)} className="g-btn g-btn-ghost" style={{borderRadius:'14px',padding:'14px 24px'}}>
                    <ArrowLeft size={16}/> Indietro
                  </button>
                  <button onClick={()=>setStep(2)} disabled={!form.name||!form.email} className="g-btn g-btn-gold" style={{flex:1,justifyContent:'center',borderRadius:'14px',padding:'16px',fontSize:'15px',opacity:(!form.name||!form.email)?0.5:1}}>
                    Continua <ArrowRight size={17}/>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="g-card" style={{padding:'32px'}}>
                <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'24px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <CreditCard size={20} style={{color:'#c9a96e'}}/> Pagamento
                </h2>
                <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'20px',background:'rgba(0,48,135,0.12)',border:'1px solid rgba(0,48,135,0.25)',borderRadius:'14px',marginBottom:'24px'}}>
                  <div style={{fontSize:'32px'}}>🅿️</div>
                  <div>
                    <div style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:600,marginBottom:'3px'}}>PayPal</div>
                    <div style={{color:'rgba(120,120,155,0.7)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px'}}>Carte di credito, debito e saldo PayPal. 100% sicuro.</div>
                  </div>
                </div>
                <div style={{padding:'20px',background:'rgba(255,255,255,0.025)',borderRadius:'14px',marginBottom:'24px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px'}}>
                  <div style={{color:'rgba(120,120,155,0.7)',marginBottom:'6px'}}>Ordine per: <span style={{color:'white',fontWeight:600}}>{form.name}</span></div>
                  <div style={{color:'rgba(120,120,155,0.7)',marginBottom:'16px'}}>Email: <span style={{color:'white'}}>{form.email}</span></div>
                  <div style={{height:'1px',background:'rgba(255,255,255,0.05)',marginBottom:'16px'}}/>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                    <span style={{color:'rgba(120,120,155,0.7)'}}>Totale da pagare</span>
                    <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'2rem',fontWeight:600,color:'white'}}>€{final.toFixed(2)}</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button onClick={()=>setStep(1)} className="g-btn g-btn-ghost" style={{borderRadius:'14px',padding:'14px 24px'}}>
                    <ArrowLeft size={16}/> Indietro
                  </button>
                  <button onClick={handlePayPal} disabled={loading} className="g-btn g-btn-gold" style={{flex:1,justifyContent:'center',borderRadius:'14px',padding:'16px',fontSize:'15px',opacity:loading?0.7:1}}>
                    {loading ? '⏳ Caricamento...' : `🅿️ Paga €${final.toFixed(2)} con PayPal`}
                  </button>
                </div>
                <p style={{textAlign:'center',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(90,90,120,0.7)',marginTop:'16px'}}>🔒 Transazione SSL protetta · Rimborso garantito 7 giorni</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="g-card" style={{padding:'24px',position:'sticky',top:'100px'}}>
            <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.3rem',fontWeight:600,marginBottom:'20px'}}>Riepilogo</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
              {items.map(item=>(
                <div key={item.product.id} style={{display:'flex',justifyContent:'space-between',gap:'12px'}}>
                  <span style={{color:'rgba(120,120,155,0.75)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.product.name}</span>
                  <span style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,flexShrink:0}}>€{item.product.price}</span>
                </div>
              ))}
            </div>
            <div style={{height:'1px',background:'rgba(255,255,255,0.05)',marginBottom:'16px'}}/>
            {discount > 0 && (
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{color:'rgba(120,120,155,0.7)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px'}}>Sconto coupon</span>
                <span style={{color:'#4ade80',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600}}>-€{discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
              <span style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>Totale</span>
              <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.8rem',fontWeight:600,color:'#c9a96e'}}>€{final.toFixed(2)}</span>
            </div>
            <div style={{color:'rgba(90,90,120,0.65)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',marginTop:'6px'}}>IVA inclusa · Tutto digitale</div>
          </div>
        </div>
      </div>
    </div>
  )
}
