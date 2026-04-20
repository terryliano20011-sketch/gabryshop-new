import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GabryShop — Servizi Digitali Professionali'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #05050a 0%, #0d0d1f 50%, #05050a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'serif', position: 'relative',
      }}>
        {/* Gold glow */}
        <div style={{position:'absolute',top:'10%',left:'50%',transform:'translateX(-50%)',width:'600px',height:'300px',background:'radial-gradient(ellipse,rgba(180,145,80,0.15) 0%,transparent 70%)',filter:'blur(40px)'}}/>

        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'32px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'14px',background:'linear-gradient(135deg,#c9a96e,#7c6af0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'bold',color:'white'}}>G</div>
          <span style={{fontSize:'42px',fontWeight:'bold',color:'white'}}>
            <span style={{color:'#c9a96e'}}>Gabry</span>Shop
          </span>
        </div>

        {/* Headline */}
        <div style={{fontSize:'64px',fontWeight:'bold',color:'white',textAlign:'center',lineHeight:1.1,marginBottom:'20px'}}>
          Servizi Digitali
          <br/>
          <span style={{color:'#c9a96e',fontStyle:'italic'}}>Professionali</span>
        </div>

        {/* Subtitle */}
        <div style={{fontSize:'22px',color:'rgba(150,150,185,0.8)',textAlign:'center',marginBottom:'36px'}}>
          Siti web · Menu digitali · Automazioni · App mobile
        </div>

        {/* Badges */}
        <div style={{display:'flex',gap:'16px'}}>
          {['⚡ 24-48h consegna','✅ +200 clienti','🔒 Pagamento sicuro'].map(b => (
            <div key={b} style={{padding:'10px 20px',background:'rgba(201,169,110,0.1)',border:'1px solid rgba(201,169,110,0.3)',borderRadius:'100px',fontSize:'16px',color:'#c9a96e'}}>
              {b}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
