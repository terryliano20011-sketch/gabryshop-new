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
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'100px',paddingBottom:'80px'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 5%'}}>

        <Link href={`/categoria/${category?.slug}`} style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(120,120,155,0.7)',textDecoration:'none',fontSize:'13px',fontFamily:'Outfit,system-ui,sans-serif',marginBottom:'48px',transition:'color 0.2s'}}>
          <ArrowLeft size={15}/> {category?.name}
        </Link>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'start'}}>

          {/* Sinistra */}
          <div>
            {/* Immagine */}
            <div style={{position:'relative',borderRadius:'20px',overflow:'hidden',marginBottom:'20px',background:'#0e0e18',height:'380px'}}>
              {img ? (
                <img src={img} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.7)'}}/>
              ) : (
                <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'80px',opacity:0.15}}>{category?.icon}</div>
              )}
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,5,10,0.5) 0%,transparent 60%)'}}/>
            </div>

            {/* Cosa è incluso */}
            <div className="g-card" style={{padding:'28px'}}>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.35rem',fontWeight:600,marginBottom:'20px',display:'flex',alignItems:'center',gap:'8px'}}>
                <CheckCircle size={18} style={{color:'#c9a96e'}}/> Cosa è incluso
              </h3>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {product.includes.map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'start',gap:'12px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13.5px',color:'rgba(145,145,180,0.85)',lineHeight:1.6}}>
                    <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#c9a96e',marginTop:'8px',flexShrink:0}}/>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Destra */}
          <div>
            {/* Badge */}
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'20px'}}>
              {product.badge==='bestseller'&&<span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#c9a96e',background:'rgba(201,169,110,0.08)',border:'1px solid rgba(201,169,110,0.2)',borderRadius:'100px',padding:'5px 14px'}}>⭐ Più Venduto</span>}
              {product.badge==='24h'&&<span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#e879a0',background:'rgba(232,121,160,0.08)',border:'1px solid rgba(232,121,160,0.2)',borderRadius:'100px',padding:'5px 14px'}}>⚡ Consegna 24h</span>}
              {product.is_customizable&&<span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#10b981',background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:'100px',padding:'5px 14px'}}>✏️ Personalizzabile</span>}
            </div>

            <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'clamp(2.2rem,4vw,3.2rem)',fontWeight:600,lineHeight:1.05,letterSpacing:'-0.02em',marginBottom:'16px'}}>{product.name}</h1>

            {/* Rating */}
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'24px'}}>
              <div style={{display:'flex',gap:'3px'}}>
                {[...Array(5)].map((_,i)=>(
                  <Star key={i} size={14} style={{color:i<Math.floor(product.rating)?'#c9a96e':'rgba(120,120,155,0.3)',fill:i<Math.floor(product.rating)?'#c9a96e':'transparent'}}/>
                ))}
              </div>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(120,120,155,0.7)'}}>{product.rating} ({product.review_count} recensioni)</span>
            </div>

            <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.8)',fontSize:'15px',lineHeight:1.75,marginBottom:'28px'}}>{product.long_description}</p>

            {/* Meta tags */}
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'32px'}}>
              {[
                {icon:<Clock size={13}/>,label:product.delivery_time},
                {icon:<Download size={13}/>,label:'Digitale'},
                {icon:<Shield size={13}/>,label:'Garantito'},
              ].map(m=>(
                <div key={m.label} style={{display:'flex',alignItems:'center',gap:'7px',padding:'8px 14px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'10px',color:'rgba(140,140,175,0.75)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12.5px'}}>
                  <span style={{color:'#c9a96e'}}>{m.icon}</span>{m.label}
                </div>
              ))}
            </div>

            {/* Prezzo + CTA */}
            <div className="g-card" style={{padding:'28px',marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'baseline',gap:'12px',marginBottom:'24px'}}>
                <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:'3.2rem',fontWeight:600,color:'white',lineHeight:1}}>€{product.price}</span>
                {product.original_price && <>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'1.1rem',color:'rgba(120,120,155,0.5)',textDecoration:'line-through'}}>€{product.original_price}</span>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,color:'#4ade80'}}>Risparmi €{product.original_price-product.price}</span>
                </>}
              </div>
              {product.is_customizable ? <BriefingForm product={product}/> : <AddToCartButton product={product}/>}
            </div>

            <p style={{display:'flex',alignItems:'center',gap:'8px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(90,90,120,0.7)'}}>
              <Shield size={13}/> Pagamento sicuro via PayPal · Rimborso garantito 7 giorni
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
