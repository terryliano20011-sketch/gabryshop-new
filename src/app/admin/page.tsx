'use client'
import { useState } from 'react'
import { Package, Upload, Plus, BarChart2, ShoppingBag, Users, TrendingUp } from 'lucide-react'

const MOCK_STATS = [
  { label: 'Ordini totali', value: '47', icon: ShoppingBag, color: '#c9a96e' },
  { label: 'Entrate mese', value: '€3.240', icon: TrendingUp, color: '#22c55e' },
  { label: 'Prodotti attivi', value: '6', icon: Package, color: '#7c6af0' },
  { label: 'Clienti unici', value: '38', icon: Users, color: '#ec4899' },
]

export default function AdminPage() {
  const [tab, setTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard')
  const [dragging, setDragging] = useState(false)

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>Admin Panel</h1>
          <p className="text-[#8888aa]">Gestisci GabryShop</p>
        </div>
        <div className="flex gap-2 text-xs text-[#8888aa] bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] px-3 py-1.5 rounded-full">
          ● Live
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
        {(['dashboard','products','orders'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-[#c9a96e] text-[#0a0a0f]' : 'text-[#8888aa] hover:text-white'}`}>
            {t === 'dashboard' ? '📊 Dashboard' : t === 'products' ? '📦 Prodotti' : '🛒 Ordini'}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {MOCK_STATS.map(s => (
              <div key={s.label} className="luxury-card rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${s.color}15`}}>
                    <s.icon className="w-5 h-5" style={{color:s.color}} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-[#8888aa] text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="luxury-card rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4" style={{fontFamily:'Playfair Display,serif'}}>Ultimi ordini</h3>
            <div className="space-y-3">
              {[
                { id:'#0047', product:'Landing Page Pro', customer:'Mario R.', price:'€199', status:'completed'},
                { id:'#0046', product:'Menu Digitale QR', customer:'Lucia B.', price:'€149', status:'paid'},
                { id:'#0045', product:'Chatbot WhatsApp', customer:'Azienda XY', price:'€299', status:'pending'},
              ].map(o => (
                <div key={o.id} className="flex items-center gap-4 p-3 bg-white/3 rounded-xl text-sm">
                  <span className="text-[#8888aa] w-12">{o.id}</span>
                  <span className="text-white flex-1">{o.product}</span>
                  <span className="text-[#8888aa] hidden sm:block">{o.customer}</span>
                  <span className="text-white font-semibold">{o.price}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${o.status==='completed'?'bg-[#22c55e]/15 text-[#22c55e]':o.status==='paid'?'bg-[#c9a96e]/15 text-[#c9a96e]':'bg-[#8888aa]/15 text-[#8888aa]'}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>Gestione Prodotti</h2>
            <button className="btn-gold px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nuovo prodotto
            </button>
          </div>

          {/* Upload drag & drop */}
          <div
            className={`border-2 border-dashed rounded-2xl p-10 text-center mb-8 transition-all ${dragging ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/10 hover:border-white/20'}`}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false) }}
          >
            <Upload className="w-10 h-10 text-[#8888aa] mx-auto mb-3" />
            <h3 className="text-white font-medium mb-1">Trascina qui i file digitali</h3>
            <p className="text-[#8888aa] text-sm mb-4">PDF, ZIP, Excel, o qualsiasi file digitale</p>
            <button className="px-4 py-2 rounded-lg border border-white/10 text-sm text-[#8888aa] hover:text-white hover:border-white/20 transition-all">
              Seleziona file
            </button>
          </div>

          <div className="luxury-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-[#8888aa] font-medium">Prodotto</th>
                  <th className="text-left p-4 text-[#8888aa] font-medium hidden md:table-cell">Categoria</th>
                  <th className="text-left p-4 text-[#8888aa] font-medium">Prezzo</th>
                  <th className="text-left p-4 text-[#8888aa] font-medium hidden sm:table-cell">Vendite</th>
                  <th className="text-right p-4 text-[#8888aa] font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name:'Landing Page Pro', cat:'Siti Web', price:'€199', sales:'23'},
                  { name:'Menu Digitale QR', cat:'Menu Digitali', price:'€149', sales:'89'},
                  { name:'Chatbot WhatsApp', cat:'Automazioni', price:'€299', sales:'31'},
                  { name:'Gestionale Inventario', cat:'Excel', price:'€49', sales:'134'},
                ].map((p,i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="p-4 text-white font-medium">{p.name}</td>
                    <td className="p-4 text-[#8888aa] hidden md:table-cell">{p.cat}</td>
                    <td className="p-4 text-[#c9a96e] font-semibold">{p.price}</td>
                    <td className="p-4 text-[#8888aa] hidden sm:table-cell">{p.sales}</td>
                    <td className="p-4 text-right">
                      <button className="text-xs text-[#8888aa] hover:text-white border border-white/10 hover:border-white/20 px-3 py-1 rounded-lg transition-all">Modifica</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="luxury-card rounded-2xl p-6 text-center py-16">
          <BarChart2 className="w-12 h-12 text-[#8888aa] mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Gestione Ordini</h3>
          <p className="text-[#8888aa] text-sm">Disponibile dopo la configurazione del database Supabase.</p>
        </div>
      )}
    </div>
  )
}
