import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = CATEGORIES.find(c => c.slug === slug)
  if (!category) notFound()
  const products = PRODUCTS.filter(p => p.category_id === category.id).map(p => ({ ...p, category }))

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8888aa] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Torna alla home
      </Link>

      <div className="mb-12">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{background:`${category.color}15`}}>
          {category.icon}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3" style={{fontFamily:'Playfair Display,serif'}}>{category.name}</h1>
        <p className="text-[#8888aa] text-lg max-w-xl">{category.description}</p>
      </div>

      <div className="divider-gold mb-12" />

      {products.length === 0 ? (
        <div className="text-center py-20 text-[#8888aa]">Nessun prodotto disponibile in questa categoria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      )}
    </div>
  )
}
