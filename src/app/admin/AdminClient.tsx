'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ShoppingBag, TrendingUp, Users, Upload, Plus, LogOut, Eye, Edit, RefreshCw } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export default function AdminClient() {
  const router = useRouter()
  const [tab, setTab] = useState<'dashboard'|'products'|'orders'>('dashboard')
  const [dragging, setDragging] = useState(false)
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  const fetchOrders = async () => {
    setLoadingOrders(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (e) {
      setOrders([])
    } finally {
      setLoadingOrders(false)
    }
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

  const statusStyle = (s: string) => ({
    completed: { bg:'rgba(74,222,128,0.08)', color:'#4ade80', border:'rgba(74,222,128,0.2)' },
    paid:      { bg:'rgba(201,169,110,0.08)', color:'#c9a96e', border:'rgba(201,169,110,0.2)' },
    pending:   { bg:'rgba(120,120,155,0.08)', color:'rgba(150,150,185,0.8)', border:'rgba(120,120,155,0.15)' },
    refunded:  { bg:'rgba(239,68,68,0.08)', color:'#f87171', border:'rgba(239,68,68,0.2)' },
  }[s] || { bg:'rgba(120,120,155,0.08)', color:'rgba(150,150,185,0.8)', border:'rgba(120,120,155,0.15)' })

  const totalRevenue = orders.filter(o => ['paid','completed'].includes(o.status)).reduce((s: number, o: any) => s + (o.total || 0), 0)
  const uniqueEmails = new Set(orders.map((o: any) => o.customer_email)).size

  const STATS = [
    { label:'Ordini totali',   value: String(orders.length),                icon:ShoppingBag, color:'#c9a96e' },
    { label:'Entrate totali',  value: `€${totalRevenue.toFixed(0)}`,        icon:TrendingUp,  color:'#4ade80' },
    { label:'Prodotti attivi', value: String(PRODUCTS.length),              icon:Package,     color:'#7c6af0' },
    { label:'Clienti unici',   value: String(uniqueEmails),                 icon:Users,       color:'#ec4899' },
  ]

  return (
    <div style={{minHeight:'100vh', background:'#05050a', padding:'0'}}>
      {/* Topbar admin separata dalla navbar pubblica */}
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
              <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'8px'}}>Panoramica</span>
              <h1 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2.5rem', fontWeight:600, lineHeight:1}}>Dashboard</h1>
            </div>

            {/* Stats */}
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

            {/* Ultimi ordini */}
            <div className="g-card" style={{borderRadius:'20px', overflow:'hidden'}}>
              <div style={{padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <h3 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.3rem', fontWeight:600}}>Ultimi ordini</h3>
                <button onClick={fetchOrders} style={{display:'flex', alignItems:'center', gap:'5px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(150,150,185,0.6)', background:'transparent', border:'none', cursor:'pointer'}}>
                  <RefreshCw size={12}/> Aggiorna
                </button>
              </div>
              {loadingOrders ? (
                <div style={{padding:'48px', textAlign:'center', fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.5)', fontSize:'13px'}}>Caricamento ordini...</div>
              ) : orders.length === 0 ? (
                <div style={{padding:'60px', textAlign:'center'}}>
                  <div style={{fontSize:'40px', marginBottom:'12px'}}>📭</div>
                  <div style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.4rem', fontWeight:600, marginBottom:'8px'}}>Nessun ordine ancora</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.55)', fontSize:'13px'}}>Gli ordini reali appariranno qui dopo i primi acquisti.</div>
                </div>
              ) : (
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse'}}>
                    <thead>
                      <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                        {['ID','Cliente','Prodotti','Totale','Stato','Data'].map(h => (
                          <th key={h} style={{padding:'12px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.45)'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0,10).map((o: any, i: number) => {
                        const sc = statusStyle(o.status)
                        const date = new Date(o.created_at).toLocaleDateString('it-IT', {day:'2-digit', month:'short'})
                        return (
                          <tr key={o.id} style={{borderBottom:i<Math.min(orders.length,10)-1?'1px solid rgba(255,255,255,0.03)':'none'}}>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', color:'rgba(120,120,155,0.5)', fontWeight:600}}>{o.id?.slice(0,8)}...</td>
                            <td style={{padding:'14px 20px'}}>
                              <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'white', fontWeight:500}}>{o.customer_name}</div>
                              <div style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', color:'rgba(120,120,155,0.5)'}}>{o.customer_email}</div>
                            </td>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(150,150,185,0.7)'}}>{Array.isArray(o.items) ? `${o.items.length} prodotto/i` : '—'}</td>
                            <td style={{padding:'14px 20px', fontFamily:'Cormorant Garamond,serif', fontSize:'1.2rem', fontWeight:600, color:'white'}}>€{o.total}</td>
                            <td style={{padding:'14px 20px'}}>
                              <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`}}>{o.status}</span>
                            </td>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.5)'}}>{date}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
              <div>
                <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'8px'}}>Catalogo</span>
                <h2 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600}}>Prodotti ({PRODUCTS.length})</h2>
              </div>
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <input className="g-input" placeholder="🔍 Cerca prodotti..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'220px', padding:'10px 16px', fontSize:'13px'}}/>
                <button className="g-btn g-btn-gold" style={{borderRadius:'12px', padding:'10px 18px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px'}}>
                  <Plus size={15}/> Nuovo
                </button>
              </div>
            </div>

            {/* Upload */}
            <div className="g-card"
              onDragOver={e=>{e.preventDefault();setDragging(true)}}
              onDragLeave={()=>setDragging(false)}
              onDrop={e=>{e.preventDefault();setDragging(false)}}
              style={{padding:'28px', borderRadius:'18px', textAlign:'center', marginBottom:'20px', borderColor:dragging?'rgba(201,169,110,0.4)':'rgba(255,255,255,0.065)', background:dragging?'rgba(201,169,110,0.03)':'transparent', transition:'all 0.2s', borderStyle:'dashed'}}>
              <Upload size={28} style={{color:'rgba(120,120,155,0.35)', margin:'0 auto 10px'}}/>
              <p style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.6)', fontSize:'13px', marginBottom:'12px'}}>Trascina qui i file digitali da vendere</p>
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
                            <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', color:cat?.color||'#c9a96e', background:`${cat?.color||'#c9a96e'}10`, padding:'3px 10px', borderRadius:'100px', border:`1px solid ${cat?.color||'#c9a96e'}20`}}>
                              {cat?.icon} {cat?.name}
                            </span>
                          </td>
                          <td style={{padding:'14px 20px', fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.15rem', fontWeight:600}}>
                            €{p.price}
                            {p.original_price && <span style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.35)', fontSize:'11px', textDecoration:'line-through', marginLeft:'6px'}}>€{p.original_price}</span>}
                          </td>
                          <td style={{padding:'14px 20px'}}>
                            {p.badge && <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'100px', background:'rgba(201,169,110,0.08)', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.18)'}}>{p.badge}</span>}
                          </td>
                          <td style={{padding:'14px 20px'}}>
                            <div style={{display:'flex', gap:'6px'}}>
                              <a href={`/prodotto/${p.slug}`} target="_blank" style={{padding:'6px 12px', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.07)', background:'transparent', color:'rgba(150,150,185,0.65)', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', textDecoration:'none'}}>
                                <Eye size={11}/> Vedi
                              </a>
                            </div>
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

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
              <div>
                <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'8px'}}>Database reale</span>
                <h2 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600}}>Tutti gli ordini</h2>
              </div>
              <button onClick={fetchOrders} className="g-btn g-btn-ghost" style={{borderRadius:'12px', padding:'10px 18px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px'}}>
                <RefreshCw size={14}/> Aggiorna
              </button>
            </div>

            <div className="g-card" style={{borderRadius:'20px', overflow:'hidden'}}>
              {loadingOrders ? (
                <div style={{padding:'60px', textAlign:'center', fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.5)', fontSize:'13px'}}>Caricamento...</div>
              ) : orders.length === 0 ? (
                <div style={{padding:'80px', textAlign:'center'}}>
                  <div style={{fontSize:'48px', marginBottom:'16px'}}>📭</div>
                  <div style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.8rem', fontWeight:600, marginBottom:'10px'}}>Nessun ordine ancora</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.55)', fontSize:'14px', lineHeight:1.7}}>
                    Gli ordini reali appariranno qui dopo i primi acquisti.<br/>
                    I dati vengono letti direttamente da Supabase.
                  </div>
                </div>
              ) : (
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'collapse'}}>
                    <thead>
                      <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                        {['ID','Cliente','Email','Prodotti','Totale','Stato','Data'].map(h => (
                          <th key={h} style={{padding:'12px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.45)'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o: any, i: number) => {
                        const sc = statusStyle(o.status)
                        const date = new Date(o.created_at).toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'2-digit'})
                        return (
                          <tr key={o.id} style={{borderBottom:i<orders.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', color:'rgba(120,120,155,0.45)', fontWeight:600}}>{o.id?.slice(0,8)}...</td>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'white', fontWeight:500}}>{o.customer_name}</td>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.55)'}}>{o.customer_email}</td>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(150,150,185,0.65)'}}>{Array.isArray(o.items)?`${o.items.length}x`:'—'}</td>
                            <td style={{padding:'14px 20px', fontFamily:'Cormorant Garamond,serif', fontSize:'1.2rem', fontWeight:600, color:'white'}}>€{o.total}</td>
                            <td style={{padding:'14px 20px'}}>
                              <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`}}>{o.status}</span>
                            </td>
                            <td style={{padding:'14px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.45)'}}>{date}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
