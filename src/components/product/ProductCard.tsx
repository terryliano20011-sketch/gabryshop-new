'use client'

import Link from 'next/link'
import { Star, Clock, Zap, Award, Pencil } from 'lucide-react'
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

  return (
    <div
      className="luxury-card rounded-2xl overflow-hidden group animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image / Preview area */}
      <div className="relative h-48 bg-gradient-to-br from-[#1a1a24] to-[#111118] flex items-center justify-center overflow-hidden">
        <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
          {product.category?.icon || '📦'}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/60 to-transparent" />
        
        {badge && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${badge.color}20`, color: badge.color, border: `1px solid ${badge.color}40` }}
          >
            <badge.icon className="w-3 h-3" />
            {badge.label}
          </div>
        )}

        {product.original_price && (
          <div className="absolute top-3 right-3 bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-1 rounded-full font-semibold">
            -{Math.round((1 - product.price / product.original_price) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-[#8888aa] line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Meta */}
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

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">€{product.price}</span>
              {product.original_price && (
                <span className="text-sm text-[#8888aa] line-through">€{product.original_price}</span>
              )}
            </div>
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
