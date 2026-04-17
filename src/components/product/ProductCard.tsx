"use client"

import Link from 'next/link'
import { Star, Clock, Award, Zap, Pencil } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'

const BADGES: Record<string, {label:string,icon:any,color:string}> = {
  bestseller: {label:'Più Venduto',icon:Award,color:'#c9a96e'},
  new:        {label:'Novità',    icon:Zap,  color:'#7c6af0'},
  customizable:{label:'Custom',  icon:Pencil,color:'#10b981'},
  '24h':      {label:'24h',      icon:Clock, color:'#ec4899'},
}

export default function ProductCard({product,delay=0}:{product:Product,delay?:number}) {
  const {addItem,items} = useCart()
  const inCart = items.some(i=>i.product.id===product.id)
  const badge = product.badge ? BADGES[product.badge] : null
  const img = product.images?.[0]

  return (
    <div className="card" style={{animationDelay:`${delay}ms`}}>
      <div style={{position:'relative',height:'200px',overflow:'hidden',borderRadius:'12px 12px 0 0',background:'#111120'}}>
        {img ? (
          <img src={img} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.7)',transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)'}} />
        ) : (
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'56px',opacity:0.2}}>
            {product.category?.icon||'📦'}
          </div>
        )}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(8,8,16,0.85) 0%, transparent 50%)'}} />

        {badge && (
          <div style={{position:'absolute',top:'12px',left:'12px',display:'inline-flex',alignItems:'center',gap:'5px',padding:'4px 11px',borderRadius:'100px',fontSize:'11px',fontWeight:700,background:`${badge.color}18`,color:badge.color,border:`1px solid ${badge.color}32`,backdropFilter:'blur(8px)',fontFamily:'DM Sans,system-ui,sans-serif'}}>
            <badge.icon size={11}/>{badge.label}
          </div>
        )}
        {product.original_price && (
          <div style={{position:'absolute',top:'12px',right:'12px',padding:'4px 9px',borderRadius:'100px',fontSize:'11px',fontWeight:700,background:'rgba(239,68,68,0.75)',color:'white',backdropFilter:'blur(8px)',fontFamily:'DM Sans,system-ui,sans-serif'}}>
            -{Math.round((1-product.price/product.original_price)*100)}%
          </div>
        )}
      </div>

      <div style={{padding:'20px 22px 24px'}}>
        <h3 style={{fontFamily:'Playfair Display,serif',color:'white',fontSize:'19px',fontWeight:600,marginBottom:'8px',lineHeight:1.3}}>{product.name}</h3>
        <p style={{color:'rgba(130,130,165,0.7)',fontSize:'13px',lineHeight:1.6,marginBottom:'16px',fontFamily:'DM Sans,system-ui,sans-serif',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{product.description}</p>

        <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <Star size={13} style={{color:'#c9a96e',fill:'#c9a96e'}} />
            <span style={{fontSize:'12px',color:'rgba(130,130,165,0.75)',fontFamily:'DM Sans,system-ui,sans-serif'}}>{product.rating} ({product.review_count})</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <Clock size={13} style={{color:'rgba(130,130,165,0.5)'}} />
            <span style={{fontSize:'12px',color:'rgba(130,130,165,0.75)',fontFamily:'DM Sans,system-ui,sans-serif'}}>{product.delivery_time}</span>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'baseline',gap:'8px'}}>
            <span style={{fontSize:'26px',fontWeight:800,color:'white',fontFamily:'Playfair Display,serif'}}>€{product.price}</span>
            {product.original_price && <span style={{fontSize:'14px',color:'rgba(130,130,165,0.5)',textDecoration:'line-through',fontFamily:'DM Sans,system-ui,sans-serif'}}>€{product.original_price}</span>}
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <Link href={`/prodotto/${product.slug}`} style={{padding:'9px 14px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(160,160,185,0.8)',fontSize:'12px',fontWeight:600,textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif',transition:'all 0.2s'}}>
              Dettagli
            </Link>
            <button onClick={()=>addItem(product)} disabled={inCart}
              className={inCart ? '' : 'btn-primary'}
              style={inCart ? {padding:'9px 14px',borderRadius:'10px',background:'rgba(201,169,110,0.12)',color:'#c9a96e',border:'1px solid rgba(201,169,110,0.25)',fontSize:'12px',fontWeight:700,cursor:'default',fontFamily:'DM Sans,system-ui,sans-serif'} : {padding:'9px 14px',borderRadius:'10px',fontSize:'12px',fontWeight:700}}>
              {inCart ? '✓ Aggiunto' : 'Acquista'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
