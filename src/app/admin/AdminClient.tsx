'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ShoppingBag, TrendingUp, Users, Upload, Plus, LogOut, Eye, RefreshCw, X, ChevronDown, ChevronUp } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export default function AdminClient() {
  const router = useRouter()
  const [tab, setTab] = useState<'dashboard'|'products'|'orders'>('dashboard')
  const [dragging, setDragging] = useState(false)
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch { setOrders([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchOrders() }, [])

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    CATEGORIES.find(c => c.id === p.category_id)?.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  const sc = (s: string) => ({
    completed: { bg:'rgba(74,222,128,0.08)', color:'#4ade80', border:'rgba(74,222,128,0.2)', label:'✓ completato' },
    paid:      { bg:'rgba(201,169,110,0.08)', color:'#c9a96e', border:'rgba(201,169,110,0.2)', label:'💳 pagato' },
    pending:   { bg:'rgba(120,120,155,0.08)', color:'rgba(150,150,185,0.8)', border:'rgba(120,120,155,0.15)', label:'⏳ in attesa' },
    refunded:  { bg:'rgba(239,68,68,0.08)', color:'#f87171', border:'rgba(239,68,68,0.2)', label:'↩ rimborsato' },
  }[s] || { bg:'rgba(120,120,155,0.08)', color:'rgba(150,150,185,0.8)', border:'rgba(120,120,155,0.15)', label:s })

  const totalRevenue = orders.filter(o => ['paid','completed'].includes(o.status)).reduce((s: number, o: any) => s + (Number(o.total) || 0), 0)
  const uniqueEmails = new Set(orders.map((o: any) => o.customer_email)).size
  const STATS = [
    { label:'Ordini totali',   value: String(orders.length),         icon:ShoppingBag, color:'#c9a96e' },
    { label:'Entrate totali',  value: `€${totalRevenue.toFixed(0)}`, icon:TrendingUp,  color:'#4ade80' },
    { label:'Prodotti attivi', value: String(PRODUCTS.length),       icon:Package,     color:'#7c6af0' },
    { label:'Clienti unici',   value: String(uniqueEmails),          icon:Users,       color:'#ec4899' },
  ]

  return (
    <div style={{minHeight:'100vh', background:'#05050a'}}>

      {/* Topbar */}
      <div style={{background:'rgba(8,8,16,0.98)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'14px 0', position:'sticky', top:0, zIndex:100}}>
        <div style={{maxWidth:'1300px', margin:'0 auto', padding:'0 6%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
            <span style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.3rem', fontWeight:600}}>⚙️ Admin</span>
            <div style={{display:'flex', gap:'4px'}}>
              {(['dashboard','products','orders'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{padding:'7px 16px', borderRadius:'8px', border:'none', cursor:'pointer', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', fontWeight:600, transition:'all 0.2s', background: tab===t?'#c9a96e':'transparent', color: tab===t?'#08060a':'rgba(150,150,185,0.7)'}}>
                  {t==='dashboard'?'📊 Dashboard':t==='products'?'📦 Prodotti':'🛒 Ordini'}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'5px 12px', background:'rgba(74,222,128,0.08)', border:'1px solid rgba(74,222,128,0.2)', borderRadius:'100px'}}>
              <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80'}}/>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', color:'#4ade80', fontWeight:600}}>Live</span>
            </div>
            <button onClick={handleLogout} style={{display:'flex', alignItems:'center', gap:'5px', padding:'7px 14px', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.08)', background:'transparent', color:'rgba(150,150,185,0.7)', cursor:'pointer', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px'}}>
              <LogOut size={13}/> Esci
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1300px', margin:'0 auto', padding:'40px 6% 80px'}}>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <div style={{marginBottom:'32px'}}>
              <span className="overline" style={{marginBottom:'8px'}}>Panoramica</span>
              <h1 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2.5rem', fontWeight:600, lineHeight:1}}>Dashboard</h1>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'32px'}}>
              {STATS.map(s => (
                <div key={s.label} className="g-card" style={{padding:'24px'}}>
                  <div style={{width:'40px', height:'40px', borderRadius:'11px', background:`${s.color}12`, border:`1px solid ${s.color}22`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px'}}>
                    <s.icon size={18} style={{color:s.color}}/>
                  </div>
                  <div style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600, lineHeight:1, marginBottom:'6px'}}>{s.value}</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.65)', fontSize:'12px'}}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="g-card" style={{borderRadius:'20px', overflow:'hidden'}}>
              <div style={{padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <h3 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.3rem', fontWeight:600}}>Ultimi ordini</h3>
                <button onClick={() => setTab('orders')} style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'#c9a96e', background:'transparent', border:'none', cursor:'pointer'}}>Vedi tutti →</button>
              </div>
              <OrdersTable orders={orders.slice(0,5)} loading={loading} onSelect={setSelectedOrder} sc={sc}/>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
              <div>
                <span className="overline" style={{marginBottom:'8px'}}>Database reale Supabase</span>
                <h2 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600}}>Tutti gli ordini ({orders.length})</h2>
              </div>
              <button onClick={fetchOrders} className="g-btn g-btn-ghost" style={{borderRadius:'12px', padding:'10px 18px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px'}}>
                <RefreshCw size={14}/> Aggiorna
              </button>
            </div>
            <div className="g-card" style={{borderRadius:'20px', overflow:'hidden'}}>
              <OrdersTable orders={orders} loading={loading} onSelect={setSelectedOrder} sc={sc}/>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
              <div>
                <span className="overline" style={{marginBottom:'8px'}}>Catalogo</span>
                <h2 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600}}>Prodotti ({PRODUCTS.length})</h2>
              </div>
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <input className="g-input" placeholder="🔍 Cerca..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'200px', padding:'10px 16px', fontSize:'13px'}}/>
                <button className="g-btn g-btn-gold" style={{borderRadius:'12px', padding:'10px 18px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px'}}><Plus size={15}/> Nuovo</button>
              </div>
            </div>
            <div className="g-card" onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={e=>{e.preventDefault();setDragging(false)}}
              style={{padding:'24px', borderRadius:'18px', textAlign:'center', marginBottom:'20px', borderColor:dragging?'rgba(201,169,110,0.4)':'rgba(255,255,255,0.065)', borderStyle:'dashed', transition:'all 0.2s'}}>
              <Upload size={24} style={{color:'rgba(120,120,155,0.35)', margin:'0 auto 8px'}}/>
              <p style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.55)', fontSize:'13px', marginBottom:'10px'}}>Trascina file digitali da vendere</p>
              <button className="g-btn g-btn-ghost" style={{borderRadius:'10px', padding:'8px 18px', fontSize:'12px'}}>Seleziona file</button>
            </div>
            <div className="g-card" style={{borderRadius:'20px', overflow:'hidden'}}>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%', borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      {['Prodotto','Categoria','Prezzo','Badge','Azioni'].map(h => (
                        <th key={h} style={{padding:'12px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.45)'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p,i) => {
                      const cat = CATEGORIES.find(c=>c.id===p.category_id)
                      return (
                        <tr key={p.id} style={{borderBottom:i<filteredProducts.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}>
                          <td style={{padding:'14px 20px'}}>
                            <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'white', fontSize:'13px', fontWeight:500}}>{p.name}</div>
                            <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.45)', fontSize:'11px'}}>{p.delivery_time}</div>
                          </td>
                          <td style={{padding:'14px 20px'}}>
                            <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', color:cat?.color||'#c9a96e', background:`${cat?.color||'#c9a96e'}10`, padding:'3px 10px', borderRadius:'100px', border:`1px solid ${cat?.color||'#c9a96e'}20`}}>{cat?.icon} {cat?.name}</span>
                          </td>
                          <td style={{padding:'14px 20px', fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.15rem', fontWeight:600}}>€{p.price}</td>
                          <td style={{padding:'14px 20px'}}>
                            {p.badge && <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'100px', background:'rgba(201,169,110,0.08)', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.18)'}}>{p.badge}</span>}
                          </td>
                          <td style={{padding:'14px 20px'}}>
                            <a href={`/prodotto/${p.slug}`} target="_blank" style={{padding:'6px 12px', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.07)', background:'transparent', color:'rgba(150,150,185,0.65)', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:'4px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', textDecoration:'none'}}>
                              <Eye size={11}/> Vedi
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DETTAGLIO ORDINE */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} sc={sc}/>
      )}
    </div>
  )
}

// ─── TABELLA ORDINI ───
function OrdersTable({ orders, loading, onSelect, sc }: any) {
  if (loading) return <div style={{padding:'60px', textAlign:'center', fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.5)', fontSize:'13px'}}>Caricamento...</div>
  if (orders.length === 0) return (
    <div style={{padding:'80px', textAlign:'center'}}>
      <div style={{fontSize:'48px', marginBottom:'16px'}}>📭</div>
      <div style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.8rem', fontWeight:600, marginBottom:'10px'}}>Nessun ordine ancora</div>
      <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.55)', fontSize:'14px'}}>Gli ordini appariranno qui dopo i primi acquisti.</div>
    </div>
  )
  return (
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
            {['Cliente','Prodotti','Totale','Stato','Data','Azioni'].map(h => (
              <th key={h} style={{padding:'12px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.45)'}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any, i: number) => {
            const style = sc(o.status)
            const date = new Date(o.created_at).toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'2-digit'})
            const hasBriefing = o.briefing && Object.keys(o.briefing).length > 0
            return (
              <tr key={o.id} style={{borderBottom:i<orders.length-1?'1px solid rgba(255,255,255,0.03)':'none', cursor:'pointer', transition:'background 0.15s'}}
                onClick={() => onSelect(o)}>
                <td style={{padding:'16px 20px'}}>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'white', fontSize:'13px', fontWeight:500}}>{o.customer_name}</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.5)', fontSize:'11px'}}>{o.customer_email}</div>
                </td>
                <td style={{padding:'16px 20px'}}>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(150,150,185,0.8)', fontSize:'12px'}}>
                    {Array.isArray(o.items) ? o.items.map((it: any) => it.product_name).join(', ') : '—'}
                  </div>
                  {hasBriefing && <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', color:'#c9a96e', marginTop:'3px'}}>✏️ briefing compilato</div>}
                </td>
                <td style={{padding:'16px 20px', fontFamily:'Cormorant Garamond,serif', fontSize:'1.2rem', fontWeight:600, color:'white'}}>€{o.total}</td>
                <td style={{padding:'16px 20px'}}>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', background:style.bg, color:style.color, border:`1px solid ${style.border}`}}>{style.label}</span>
                </td>
                <td style={{padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.45)'}}>{date}</td>
                <td style={{padding:'16px 20px'}}>
                  <button onClick={e => { e.stopPropagation(); onSelect(o) }}
                    style={{padding:'6px 14px', borderRadius:'9px', border:'1px solid rgba(255,255,255,0.08)', background:'transparent', color:'rgba(150,150,185,0.7)', cursor:'pointer', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', display:'flex', alignItems:'center', gap:'4px'}}>
                    <Eye size={11}/> Dettagli
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── MODAL DETTAGLIO ORDINE ───
function OrderModal({ order, onClose, sc }: any) {
  const [openBriefing, setOpenBriefing] = useState<string|null>(null)
  const style = sc(order.status)
  const date = new Date(order.created_at).toLocaleString('it-IT')
  const briefing = order.briefing || {}
  const hasBriefing = Object.keys(briefing).length > 0

  return (
    <div style={{position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'flex-end'}} onClick={onClose}>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)'}}/>
      <div onClick={e => e.stopPropagation()}
        style={{position:'relative', width:'520px', maxWidth:'100vw', height:'100vh', background:'#0c0c18', borderLeft:'1px solid rgba(255,255,255,0.06)', overflowY:'auto', display:'flex', flexDirection:'column'}}>

        {/* Header */}
        <div style={{padding:'24px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'#0c0c18', zIndex:10}}>
          <div>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', marginBottom:'4px'}}>Dettaglio ordine</div>
            <h3 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.4rem', fontWeight:600}}>{order.customer_name}</h3>
          </div>
          <button onClick={onClose} style={{padding:'8px', borderRadius:'10px', border:'1px solid rgba(255,255,255,0.07)', background:'transparent', color:'rgba(150,150,185,0.6)', cursor:'pointer', display:'flex', alignItems:'center'}}>
            <X size={16}/>
          </button>
        </div>

        <div style={{padding:'24px', display:'flex', flexDirection:'column', gap:'20px'}}>

          {/* Info cliente */}
          <div className="g-card" style={{padding:'20px', borderRadius:'16px'}}>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', marginBottom:'14px'}}>👤 Cliente</div>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {[
                {k:'Nome', v: order.customer_name},
                {k:'Email', v: order.customer_email},
                {k:'P.IVA', v: order.customer_vat || '—'},
                {k:'Data', v: date},
              ].map(row => (
                <div key={row.k} style={{display:'flex', justifyContent:'space-between', gap:'12px'}}>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.5)'}}>{row.k}</span>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'white', fontWeight:500, textAlign:'right'}}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stato + totale */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
            <div className="g-card" style={{padding:'20px', borderRadius:'16px', textAlign:'center'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', marginBottom:'10px'}}>Stato</div>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', fontWeight:700, padding:'6px 14px', borderRadius:'100px', background:style.bg, color:style.color, border:`1px solid ${style.border}`}}>{style.label}</span>
            </div>
            <div className="g-card" style={{padding:'20px', borderRadius:'16px', textAlign:'center'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', marginBottom:'8px'}}>Totale</div>
              <div style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600}}>€{order.total}</div>
            </div>
          </div>

          {/* Prodotti acquistati */}
          {Array.isArray(order.items) && order.items.length > 0 && (
            <div className="g-card" style={{padding:'20px', borderRadius:'16px'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', marginBottom:'14px'}}>🛒 Prodotti acquistati</div>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                {order.items.map((item: any, i: number) => (
                  <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', background:'rgba(255,255,255,0.025)', borderRadius:'10px'}}>
                    <div>
                      <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'white', fontSize:'13px', fontWeight:500}}>{item.product_name}</div>
                      <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.5)', fontSize:'11px'}}>Qtà: {item.quantity}</div>
                    </div>
                    <div style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.2rem', fontWeight:600}}>€{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BRIEFING - la parte più importante */}
          {hasBriefing ? (
            <div className="g-card" style={{padding:'20px', borderRadius:'16px'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#c9a96e', marginBottom:'16px'}}>✏️ Briefing compilato dal cliente</div>
              {Object.entries(briefing).map(([productName, fields]: [string, any]) => (
                <div key={productName} style={{marginBottom:'16px'}}>
                  <button onClick={() => setOpenBriefing(openBriefing === productName ? null : productName)}
                    style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(201,169,110,0.06)', border:'1px solid rgba(201,169,110,0.15)', borderRadius:'10px', padding:'12px 16px', cursor:'pointer', marginBottom:'2px'}}>
                    <span style={{fontFamily:'Outfit,system-ui,sans-serif', color:'#c9a96e', fontSize:'13px', fontWeight:600}}>📦 {productName}</span>
                    {openBriefing === productName ? <ChevronUp size={14} style={{color:'#c9a96e'}}/> : <ChevronDown size={14} style={{color:'#c9a96e'}}/>}
                  </button>
                  {openBriefing === productName && (
                    <div style={{background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'10px', padding:'16px', display:'flex', flexDirection:'column', gap:'12px'}}>
                      {Object.entries(fields).map(([key, value]: [string, any]) => (
                        value && String(value).trim() !== '' && (
                          <div key={key}>
                            <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', marginBottom:'5px'}}>
                              {key.replace(/_/g,' ')}
                            </div>
                            <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'rgba(200,200,220,0.9)', lineHeight:1.6, background:'rgba(255,255,255,0.025)', padding:'10px 12px', borderRadius:'8px', whiteSpace:'pre-wrap'}}>
                              {Array.isArray(value) ? value.join(', ') : String(value)}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="g-card" style={{padding:'20px', borderRadius:'16px', textAlign:'center'}}>
              <div style={{fontSize:'28px', marginBottom:'8px'}}>📋</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.55)', fontSize:'13px'}}>Il cliente non ha ancora compilato il briefing.</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.4)', fontSize:'12px', marginTop:'6px'}}>Contattalo via email per raccogliere i dati.</div>
            </div>
          )}

          {/* Azioni rapide */}
          <div style={{display:'flex', gap:'10px'}}>
            <a href={`mailto:${order.customer_email}?subject=Il tuo ordine GabryShop&body=Ciao ${order.customer_name},`}
              className="g-btn g-btn-gold" style={{flex:1, justifyContent:'center', borderRadius:'12px', padding:'13px', fontSize:'13px', textDecoration:'none'}}>
              📧 Scrivi email
            </a>
            <a href={`https://wa.me/?text=Ciao ${order.customer_name}, ti scrivo riguardo al tuo ordine GabryShop`} target="_blank"
              className="g-btn g-btn-ghost" style={{flex:1, justifyContent:'center', borderRadius:'12px', padding:'13px', fontSize:'13px', textDecoration:'none'}}>
              💬 WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
