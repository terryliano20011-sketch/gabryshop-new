"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Star, Clock, Award, Zap, Pencil } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'

const BADGE_CONFIG = {
  bestseller: { label: 'Più Venduto', icon: Award, color: '#c9a96e' },
  new: { label: 'Novità', icon: Zap, color: '#7c6af0' },
  customizable: { label: 'Personalizzabile', icon: Pencil, color: '#10b981' },
  '24h': { label: 'Consegna 24h', icon: Clock, color: '#ec4899' },
}

interface Props {
  product: Product
  delay?: number
}

export default function ProductCard({ product, delay = 0 }: Props) {
  const { addItem, items } = useCart()
  const inCart = items.some(i => i.product.id === product.id)
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null
  const img = product.images?.[0]

  return (
    <div
      className="luxury-card rounded-2xl overflow-hidden group animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{background:'#1a1a24'}}>
        {img ? (
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
            {product.category?.icon || '📦'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {badge && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
            style={{ background: `${badge.color}25`, color: badge.color, border: `1px solid ${badge.color}50` }}
          >
            <badge.icon className="w-3 h-3" />
            {badge.label}
          </div>
        )}

        {product.original_price && (
          <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-bold">
            -{Math.round((1 - product.price / product.original_price) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-white text-lg leading-tight mb-2" style={{fontFamily:'Playfair Display,serif'}}>
          {product.name}
        </h3>
        <p className="text-sm text-[#8888aa] line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#c9a96e] fill-[#c9a96e]" />
            <span className="text-xs text-[#8888aa]">{product.rating} ({product.review_count})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#8888aa]" />
            <span className="text-xs text-[#8888aa]">{product.delivery_time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">€{product.price}</span>
            {product.original_price && (
              <span className="text-sm text-[#8888aa] line-through">€{product.original_price}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              href={`/prodotto/${product.slug}`}
              className="px-3 py-2 text-xs text-[#8888aa] border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-all"
            >
              Dettagli
            </Link>
            <button
              onClick={() => addItem(product)}
              disabled={inCart}
              className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                inCart
                  ? 'bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/30 cursor-default'
                  : 'btn-gold'
              }`}
            >
              {inCart ? '✓ Aggiunto' : 'Acquista'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
