'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ShoppingBag, TrendingUp, Users, Upload, Plus, BarChart2, LogOut, Eye, Trash2, Edit } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

const STATS = [
  { label:'Ordini totali',   value:'47',    icon:ShoppingBag, color:'#c9a96e', trend:'+12%' },
  { label:'Entrate mese',    value:'€1.840',icon:TrendingUp,  color:'#4ade80', trend:'+8%' },
  { label:'Prodotti attivi', value:'29',    icon:Package,     color:'#7c6af0', trend:'' },
  { label:'Clienti unici',   value:'38',    icon:Users,       color:'#ec4899', trend:'+5%' },
]

const ORDERS = [
  { id:'#0047', product:'Landing Page Pro',         customer:'Mario R.',    price:'€29',  status:'completed', date:'18 Apr' },
  { id:'#0046', product:'Menu Digitale QR',          customer:'Lucia B.',    price:'€19',  status:'paid',      date:'17 Apr' },
  { id:'#0045', product:'Chatbot WhatsApp',          customer:'Azienda XY',  price:'€35',  status:'completed', date:'16 Apr' },
  { id:'#0044', product:'CRM Clienti Excel',         customer:'Paolo M.',    price:'€18',  status:'pending',   date:'15 Apr' },
  { id:'#0043', product:'Bot Prenotazioni',          customer:'Sara L.',     price:'€32',  status:'completed', date:'14 Apr' },
  { id:'#0042', product:'Sito Ristorante',           customer:'Trattoria XY',price:'€35',  status:'completed', date:'13 Apr' },
]

export default function AdminClient() {
  const router = useRouter()
  const [tab, setTab] = useState<'dashboard'|'products'|'orders'>('dashboard')
  const [dragging, setDragging] = useState(false)
  const [search, setSearch] = useState('')

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    CATEGORIES.find(c=>c.id===p.category_id)?.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method:'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  const statusColor = (s: string) => ({
    completed: { bg:'rgba(74,222,128,0.08)', color:'#4ade80', border:'rgba(74,222,128,0.2)' },
    paid:      { bg:'rgba(201,169,110,0.08)', color:'#c9a96e', border:'rgba(201,169,110,0.2)' },
    pending:   { bg:'rgba(120,120,155,0.08)', color:'rgba(120,120,155,0.7)', border:'rgba(120,120,155,0.15)' },
    refunded:  { bg:'rgba(239,68,68,0.08)', color:'#f87171', border:'rgba(239,68,68,0.2)' },
  }[s] || { bg:'rgba(120,120,155,0.08)', color:'rgba(120,120,155,0.7)', border:'rgba(120,120,155,0.15)' })

  return (
    <div style={{ minHeight:'100vh', background:'#05050a', paddingTop:'32px', paddingBottom:'80px' }}>
      <div style={{ maxWidth:'1300px', margin:'0 auto', padding:'0 6%' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'40px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'8px' }}>Pannello di controllo</span>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2.5rem', fontWeight:600, lineHeight:1 }}>GabryShop Admin</h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'6px 14px', background:'rgba(74,222,128,0.08)', border:'1px solid rgba(74,222,128,0.2)', borderRadius:'100px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80', animation:'pulse 2s infinite' }}/>
              <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'#4ade80', fontWeight:600 }}>Live</span>
            </div>
            <button onClick={handleLogout} className="g-btn g-btn-ghost" style={{ borderRadius:'12px', padding:'10px 18px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px' }}>
              <LogOut size={14}/> Esci
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'4px', background:'rgba(255,255,255,0.03)', borderRadius:'14px', padding:'4px', width:'fit-content', marginBottom:'36px' }}>
          {(['dashboard','products','orders'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:'10px 20px', borderRadius:'10px', border:'none', cursor:'pointer', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', fontWeight:600, transition:'all 0.2s',
                background: tab===t ? '#c9a96e' : 'transparent',
                color: tab===t ? '#08060a' : 'rgba(120,120,155,0.7)' }}>
              {t==='dashboard'?'📊 Dashboard':t==='products'?'📦 Prodotti':'🛒 Ordini'}
            </button>
          ))}
        </div>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'28px' }}>
              {STATS.map(s => (
                <div key={s.label} className="g-card" style={{ padding:'24px' }}>
                  <div style={{ display:'flex', alignItems:'start', justifyContent:'space-between', marginBottom:'16px' }}>
                    <div style={{ width:'40px', height:'40px', borderRadius:'11px', background:`${s.color}12`, border:`1px solid ${s.color}22`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <s.icon size={18} style={{ color:s.color }}/>
                    </div>
                    {s.trend && <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:600, color:'#4ade80', background:'rgba(74,222,128,0.08)', padding:'3px 8px', borderRadius:'100px' }}>{s.trend}</span>}
                  </div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2rem', fontWeight:600, lineHeight:1, marginBottom:'6px' }}>{s.value}</div>
                  <div style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.65)', fontSize:'12px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="g-card" style={{ borderRadius:'20px', overflow:'hidden' }}>
              <div style={{ padding:'24px 28px', borderBottom:'1px solid rgba(255,255,255,0.045)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.35rem', fontWeight:600 }}>Ultimi ordini</h3>
                <button onClick={()=>setTab('orders')} style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'#c9a96e', background:'transparent', border:'none', cursor:'pointer' }}>Vedi tutti →</button>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      {['ID','Prodotto','Cliente','Data','Importo','Stato'].map(h => (
                        <th key={h} style={{ padding:'12px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o,i) => {
                      const sc = statusColor(o.status)
                      return (
                        <tr key={o.id} style={{ borderBottom: i<ORDERS.length-1?'1px solid rgba(255,255,255,0.035)':'none', transition:'background 0.2s' }}>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'rgba(120,120,155,0.6)', fontWeight:600 }}>{o.id}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'white', fontWeight:500 }}>{o.product}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'rgba(150,150,185,0.8)' }}>{o.customer}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.55)' }}>{o.date}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Cormorant Garamond,serif', fontSize:'1.1rem', fontWeight:600, color:'white' }}>{o.price}</td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, padding:'4px 12px', borderRadius:'100px', background:sc.bg, color:sc.color, border:`1px solid ${sc.border}` }}>
                              {o.status}
                            </span>
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

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
              <h2 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.8rem', fontWeight:600 }}>Gestione Prodotti</h2>
              <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                <input className="g-input" placeholder="🔍 Cerca prodotti..." value={search} onChange={e=>setSearch(e.target.value)}
                  style={{ width:'220px', padding:'10px 16px', fontSize:'13px' }}/>
                <button className="g-btn g-btn-gold" style={{ borderRadius:'12px', padding:'10px 18px', fontSize:'13px', display:'flex', alignItems:'center', gap:'6px' }}>
                  <Plus size={15}/> Nuovo prodotto
                </button>
              </div>
            </div>

            {/* Upload drag & drop */}
            <div
              className="g-card"
              onDragOver={e=>{e.preventDefault();setDragging(true)}}
              onDragLeave={()=>setDragging(false)}
              onDrop={e=>{e.preventDefault();setDragging(false)}}
              style={{ padding:'32px', borderRadius:'18px', textAlign:'center', marginBottom:'24px', borderColor:dragging?'rgba(201,169,110,0.4)':'rgba(255,255,255,0.065)', background:dragging?'rgba(201,169,110,0.03)':'transparent', transition:'all 0.2s', borderStyle:'dashed', borderWidth:'1px' }}>
              <Upload size={32} style={{ color:'rgba(120,120,155,0.4)', margin:'0 auto 12px' }}/>
              <h4 style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'white', fontSize:'14px', fontWeight:600, marginBottom:'6px' }}>Trascina qui i file digitali</h4>
              <p style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.55)', fontSize:'12px', marginBottom:'16px' }}>PDF, ZIP, Excel, o qualsiasi file digitale da vendere</p>
              <button className="g-btn g-btn-ghost" style={{ borderRadius:'10px', padding:'9px 20px', fontSize:'13px' }}>Seleziona file</button>
            </div>

            {/* Products table */}
            <div className="g-card" style={{ borderRadius:'20px', overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      {['Prodotto','Categoria','Prezzo','Badge','Vendite','Azioni'].map(h => (
                        <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p,i) => {
                      const cat = CATEGORIES.find(c=>c.id===p.category_id)
                      return (
                        <tr key={p.id} style={{ borderBottom:i<filteredProducts.length-1?'1px solid rgba(255,255,255,0.035)':'none' }}>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'white', fontSize:'13px', fontWeight:500, marginBottom:'3px' }}>{p.name}</div>
                            <div style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.5)', fontSize:'11px' }}>{p.delivery_time}</div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:cat?.color||'#c9a96e', background:`${cat?.color||'#c9a96e'}12`, padding:'3px 10px', borderRadius:'100px', border:`1px solid ${cat?.color||'#c9a96e'}22` }}>
                              {cat?.icon} {cat?.name}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px', fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.2rem', fontWeight:600 }}>
                            €{p.price}
                            {p.original_price && <span style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.4)', fontSize:'11px', textDecoration:'line-through', marginLeft:'6px' }}>€{p.original_price}</span>}
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            {p.badge && <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'100px', background:'rgba(201,169,110,0.08)', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.2)' }}>{p.badge}</span>}
                          </td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.65)', fontSize:'13px' }}>{p.review_count}</td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', gap:'6px' }}>
                              <button style={{ padding:'7px 12px', borderRadius:'9px', border:'1px solid rgba(255,255,255,0.08)', background:'transparent', color:'rgba(150,150,185,0.7)', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px' }}>
                                <Eye size={12}/> Vedi
                              </button>
                              <button style={{ padding:'7px 12px', borderRadius:'9px', border:'1px solid rgba(255,255,255,0.08)', background:'transparent', color:'rgba(150,150,185,0.7)', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px' }}>
                                <Edit size={12}/> Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.45)', fontSize:'12px', marginTop:'12px', textAlign:'right' }}>{filteredProducts.length} prodotti</p>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.8rem', fontWeight:600, marginBottom:'24px' }}>Gestione Ordini</h2>
            <div className="g-card" style={{ borderRadius:'20px', overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      {['ID','Prodotto','Cliente','Data','Importo','Stato','Azioni'].map(h => (
                        <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o,i) => {
                      const sc = statusColor(o.status)
                      return (
                        <tr key={o.id} style={{ borderBottom:i<ORDERS.length-1?'1px solid rgba(255,255,255,0.035)':'none' }}>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'rgba(120,120,155,0.6)', fontWeight:600 }}>{o.id}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'white', fontWeight:500 }}>{o.product}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', color:'rgba(150,150,185,0.8)' }}>{o.customer}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', color:'rgba(120,120,155,0.55)' }}>{o.date}</td>
                          <td style={{ padding:'16px 20px', fontFamily:'Cormorant Garamond,serif', fontSize:'1.1rem', fontWeight:600, color:'white' }}>{o.price}</td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, padding:'4px 12px', borderRadius:'100px', background:sc.bg, color:sc.color, border:`1px solid ${sc.border}` }}>
                              {o.status}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <button style={{ padding:'7px 14px', borderRadius:'9px', border:'1px solid rgba(255,255,255,0.08)', background:'transparent', color:'rgba(150,150,185,0.7)', cursor:'pointer', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', display:'flex', alignItems:'center', gap:'4px' }}>
                              <Eye size={12}/> Dettagli
                            </button>
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
    </div>
  )
}
