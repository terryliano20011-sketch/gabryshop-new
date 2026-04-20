export { generateMetadata } from './metadata'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
    <div style={{minHeight:'100vh', background:'#05050a', paddingTop:'140px', paddingBottom:'100px'}}>
      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 6%'}}>

        {/* Back */}
        <Link href="/" style={{display:'inline-flex', alignItems:'center', gap:'8px', color:'rgba(120,120,155,0.65)', textDecoration:'none', fontSize:'13px', fontFamily:'Outfit,system-ui,sans-serif', marginBottom:'48px', transition:'color 0.2s'}}>
          <ArrowLeft size={14}/> Torna alla home
        </Link>

        {/* Header */}
        <div style={{marginBottom:'64px'}}>
          <div style={{width:'56px', height:'56px', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', marginBottom:'20px', background:`${category.color}12`, border:`1px solid ${category.color}22`}}>
            {category.icon}
          </div>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#c9a96e', display:'block', marginBottom:'12px'}}>Categoria</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'clamp(2.5rem,6vw,5rem)', fontWeight:600, lineHeight:0.95, letterSpacing:'-0.025em', marginBottom:'16px'}}>
            {category.name}
          </h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(140,140,175,0.78)', fontSize:'16px', lineHeight:1.7, maxWidth:'500px'}}>
            {category.description}
          </p>
        </div>

        {/* Divider */}
        <div style={{height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,169,110,0.2),transparent)', marginBottom:'48px'}}/>

        {/* Prodotti */}
        {products.length === 0 ? (
          <div style={{textAlign:'center', padding:'80px 0'}}>
            <div style={{fontSize:'48px', marginBottom:'16px'}}>📭</div>
            <p style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.6)', fontSize:'15px'}}>Nessun prodotto disponibile in questa categoria.</p>
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'16px'}}>
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60}/>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{marginTop:'80px', textAlign:'center'}}>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.6)', fontSize:'14px', marginBottom:'20px'}}>
            Non trovi quello che cerchi?
          </p>
          <Link href="/contatti" className="g-btn g-btn-ghost" style={{borderRadius:'12px', display:'inline-flex'}}>
            Contattaci per un preventivo <ArrowRight size={15}/>
          </Link>
        </div>

      </div>
    </div>
  )
}
