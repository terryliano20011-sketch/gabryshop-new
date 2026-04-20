import { ImageResponse } from 'next/og'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find(p => p.slug === params.slug)
  const category = product ? CATEGORIES.find(c => c.id === product.category_id) : null

  return new ImageResponse(
    (
      <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#05050a 0%,#0d0d1f 50%,#05050a 100%)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'60px 80px',fontFamily:'serif',position:'relative'}}>
        <div style={{position:'absolute',top:'5%',left:'40%',width:'500px',height:'400px',background:'radial-gradient(ellipse,rgba(180,145,80,0.1) 0%,transparent 70%)',filter:'blur(40px)'}}/>

        {/* Left content */}
        <div style={{display:'flex',flexDirection:'column',gap:'20px',flex:1,maxWidth:'620px'}}>
          {/* Category badge */}
          {category && (
            <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 18px',background:'rgba(201,169,110,0.1)',border:'1px solid rgba(201,169,110,0.25)',borderRadius:'100px',width:'fit-content'}}>
              <span style={{fontSize:'20px'}}>{category.icon}</span>
              <span style={{fontSize:'16px',color:'#c9a96e',fontFamily:'sans-serif'}}>{category.name}</span>
            </div>
          )}
          {/* Product name */}
          <div style={{fontSize:'54px',fontWeight:'bold',color:'white',lineHeight:1.1}}>
            {product?.name || 'Prodotto'}
          </div>
          {/* Description */}
          <div style={{fontSize:'22px',color:'rgba(150,150,185,0.8)',lineHeight:1.4,fontFamily:'sans-serif'}}>
            {product?.description?.slice(0,100)}...
          </div>
          {/* Price + delivery */}
          <div style={{display:'flex',gap:'20px',alignItems:'center',marginTop:'10px'}}>
            <div style={{fontSize:'52px',fontWeight:'bold',color:'#c9a96e'}}>€{product?.price}</div>
            <div style={{fontSize:'18px',color:'rgba(120,120,155,0.7)',fontFamily:'sans-serif'}}>⚡ {product?.delivery_time}</div>
          </div>
        </div>

        {/* Right: brand */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'linear-gradient(135deg,#c9a96e,#7c6af0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',fontWeight:'bold',color:'white'}}>G</div>
            <span style={{fontSize:'32px',fontWeight:'bold',color:'white'}}><span style={{color:'#c9a96e'}}>Gabry</span>Shop</span>
          </div>
          <div style={{fontSize:'16px',color:'rgba(120,120,155,0.6)',fontFamily:'sans-serif'}}>gabryshop-digitale.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
