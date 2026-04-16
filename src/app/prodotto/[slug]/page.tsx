import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, Clock, CheckCircle, Shield, Download } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import AddToCartButton from '@/components/product/AddToCartButton'
import BriefingForm from '@/components/product/BriefingForm'

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = PRODUCTS.find(p => p.slug === slug)
  if (!product) notFound()
  const category = CATEGORIES.find(c => c.id === product.category_id)
  const img = product.images?.[0]

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link href={`/categoria/${category?.slug}`} className="inline-flex items-center gap-2 text-sm text-[#8888aa] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {category?.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: immagine */}
        <div>
          <div className="luxury-card rounded-3xl overflow-hidden h-80 mb-6 relative" style={{background:'#1a1a24'}}>
            {img ? (
              <img
                src={img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl opacity-30">
                {category?.icon}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Cosa e incluso */}
          <div className="luxury-card rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2" style={{fontFamily:'Playfair Display,serif'}}>
              <CheckCircle className="w-5 h-5 text-[#c9a96e]" /> Cosa e incluso
            </h3>
            <ul className="space-y-3">
              {product.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#8888aa]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {product.badge === 'bestseller' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#c9a96e]/15 text-[#c9a96e] border border-[#c9a96e]/30">⭐ Piu Venduto</span>
            )}
            {product.badge === '24h' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/30">⚡ Consegna 24h</span>
            )}
            {product.is_customizable && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">✏️ Personalizzabile</span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#c9a96e] fill-[#c9a96e]' : 'text-[#333]'}`} />
              ))}
              <span className="text-sm text-[#8888aa] ml-1">{product.rating} ({product.review_count} recensioni)</span>
            </div>
          </div>

          <p className="text-[#8888aa] leading-relaxed mb-8">{product.long_description}</p>

          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-[#8888aa]">
              <Clock className="w-4 h-4 text-[#c9a96e]" /> {product.delivery_time}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-[#8888aa]">
              <Download className="w-4 h-4 text-[#c9a96e]" /> Digitale
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-[#8888aa]">
              <Shield className="w-4 h-4 text-[#c9a96e]" /> Garantito
            </div>
          </div>

          {/* Prezzo e CTA */}
          <div className="luxury-card rounded-2xl p-6 mb-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-white">€{product.price}</span>
              {product.original_price && (
                <span className="text-lg text-[#8888aa] line-through">€{product.original_price}</span>
              )}
              {product.original_price && (
                <span className="text-sm font-semibold text-[#22c55e]">
                  Risparmi €{product.original_price - product.price}
                </span>
              )}
            </div>
            {product.is_customizable ? <BriefingForm product={product} /> : <AddToCartButton product={product} />}
          </div>

          <p className="text-xs text-[#8888aa] flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            Pagamento sicuro via PayPal · Rimborso garantito 7 giorni
          </p>
        </div>
      </div>
    </div>
  )
}
