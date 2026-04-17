'use client'
import Link from 'next/link'
import { Star, Clock, Award, Zap, Pencil } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'

const BADGES: Record<string, {label:string,icon:any,color:string}> = {
  bestseller: {label:'Più Venduto', icon:Award,  color:'#c9a96e'},
  new:        {label:'Novità',      icon:Zap,    color:'#7c6af0'},
  customizable:{label:'Custom',    icon:Pencil, color:'#10b981'},
  '24h':      {label:'24h',        icon:Clock,  color:'#e879a0'},
}

export default function ProductCard({ product, delay=0 }: { product:Product; delay?:number }) {
  const { addItem, items } = useCart()
  const inCart = items.some(i => i.product.id === product.id)
  const badge = product.badge ? BADGES[product.badge] : null
  const img = product.images?.[0]

  return (
    <div className="g-card" style={{ animationDelay:`${delay}ms` }}>
      {/* Image */}
      <div style={{ position:'relative', height:'195px', overflow:'hidden', borderRadius:'12px 12px 0 0', background:'#0e0e18' }}>
        {img ? (
          <img src={img} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.65)', transition:'filter 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}/>
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'52px', opacity:0.2 }}>
            {product.category?.icon || '📦'}
          </div>
        )}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,5,10,0.88) 0%, transparent 50%)' }}/>

        {badge && (
          <div style={{ position:'absolute', top:'12px', left:'12px', display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 11px', borderRadius:'100px', fontSize:'10px', fontWeight:700, letterSpacing:'0.05em', background:`${badge.color}16`, color:badge.color, border:`1px solid ${badge.color}28`, fontFamily:'Outfit,system-ui,sans-serif', backdropFilter:'blur(8px)' }}>
            <badge.icon size={10}/> {badge.label}
          </div>
        )}
        {product.original_price && (
          <div style={{ position:'absolute', top:'12px', right:'12px', padding:'4px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:700, background:'rgba(239,68,68,0.7)', color:'white', backdropFilter:'blur(8px)', fontFamily:'Outfit,system-ui,sans-serif' }}>
            -{Math.round((1 - product.price / product.original_price) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:'20px 22px 24px' }}>
        <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.35rem', fontWeight:600, marginBottom:'8px', lineHeight:1.25 }}>{product.name}</h3>
        <p style={{ color:'rgba(120,120,155,0.72)', fontSize:'13px', lineHeight:1.65, marginBottom:'18px', fontFamily:'Outfit,system-ui,sans-serif', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{product.description}</p>

        <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
            <Star size={12} style={{ color:'#c9a96e', fill:'#c9a96e' }}/>
            <span style={{ fontSize:'12px', color:'rgba(120,120,155,0.75)', fontFamily:'Outfit,system-ui,sans-serif' }}>{product.rating} ({product.review_count})</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
            <Clock size={12} style={{ color:'rgba(120,120,155,0.5)' }}/>
            <span style={{ fontSize:'12px', color:'rgba(120,120,155,0.75)', fontFamily:'Outfit,system-ui,sans-serif' }}>{product.delivery_time}</span>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'10px' }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:'8px' }}>
            <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'2rem', fontWeight:600, lineHeight:1, color:'white' }}>€{product.price}</span>
            {product.original_price && <span style={{ fontSize:'13px', color:'rgba(110,110,145,0.55)', textDecoration:'line-through', fontFamily:'Outfit,system-ui,sans-serif' }}>€{product.original_price}</span>}
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <Link href={`/prodotto/${product.slug}`}
              style={{ padding:'9px 14px', borderRadius:'10px', border:'1px solid rgba(255,255,255,0.09)', color:'rgba(145,145,180,0.8)', fontSize:'12px', fontWeight:600, textDecoration:'none', fontFamily:'Outfit,system-ui,sans-serif', transition:'all 0.2s' }}>
              Dettagli
            </Link>
            <button onClick={() => addItem(product)} disabled={inCart}
              className={inCart ? '' : 'g-btn g-btn-gold'}
              style={inCart
                ? { padding:'9px 14px', borderRadius:'10px', background:'rgba(201,169,110,0.1)', color:'#c9a96e', border:'1px solid rgba(201,169,110,0.22)', fontSize:'12px', fontWeight:700, cursor:'default', fontFamily:'Outfit,system-ui,sans-serif' }
                : { padding:'9px 14px', borderRadius:'10px', fontSize:'12px' }}>
              {inCart ? '✓ Aggiunto' : 'Acquista'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
