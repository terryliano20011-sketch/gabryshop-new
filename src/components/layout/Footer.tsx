import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{background:'#060608',borderTop:'1px solid rgba(255,255,255,0.05)',marginTop:'40px'}}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8" style={{padding:'72px 20px 48px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'48px',marginBottom:'64px',flexWrap:'wrap'}}>

          <div style={{gridColumn:'span 2'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'linear-gradient(135deg,#c9a96e,#8b6fd4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>✦</div>
              <span style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700}}>
                <span style={{background:'linear-gradient(135deg,#c9a96e,#e8c878)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Gabry</span>
                <span style={{color:'white'}}>Shop</span>
              </span>
            </div>
            <p style={{color:'rgba(120,120,150,0.75)',fontSize:'14px',lineHeight:1.75,maxWidth:'300px',fontFamily:'DM Sans,system-ui,sans-serif',marginBottom:'24px'}}>
              Servizi e prodotti digitali professionali per privati e aziende. Qualità garantita, consegna rapida.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <a href="mailto:info@gabryshop.it" style={{display:'flex',alignItems:'center',gap:'8px',color:'rgba(120,120,150,0.7)',fontSize:'13px',textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif'}}>
                <Mail size={14} style={{color:'#c9a96e'}} /> info@gabryshop.it
              </a>
              <div style={{display:'flex',alignItems:'center',gap:'8px',color:'rgba(120,120,150,0.7)',fontSize:'13px',fontFamily:'DM Sans,system-ui,sans-serif'}}>
                <MapPin size={14} style={{color:'#c9a96e'}} /> Italia 🇮🇹
              </div>
            </div>
          </div>

          <div>
            <h4 style={{color:'white',fontWeight:600,fontSize:'13px',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'20px',fontFamily:'DM Sans,system-ui,sans-serif'}}>Servizi</h4>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                ['/categoria/siti-web','🌐 Siti Web'],
                ['/categoria/menu-digitali','🍽️ Menu Digitali'],
                ['/categoria/fogli-excel','📊 Fogli Excel'],
                ['/categoria/automazioni','🤖 Automazioni'],
                ['/categoria/app-mobile','📱 App Mobile'],
              ].map(([href,label])=>(
                <Link key={href} href={href} style={{color:'rgba(120,120,150,0.7)',fontSize:'13px',textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif',transition:'color 0.2s'}}>{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{color:'white',fontWeight:600,fontSize:'13px',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'20px',fontFamily:'DM Sans,system-ui,sans-serif'}}>Info</h4>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                ['/chi-siamo','Chi siamo'],
                ['/faq','FAQ'],
                ['/contatti','Contattaci'],
                ['/privacy','Privacy Policy'],
                ['/termini','Termini di Servizio'],
              ].map(([href,label])=>(
                <Link key={href} href={href} style={{color:'rgba(120,120,150,0.7)',fontSize:'13px',textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif'}}>{label}</Link>
              ))}
            </div>
          </div>

        </div>

        <div style={{height:'1px',background:'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)',marginBottom:'32px'}} />

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
          <p style={{color:'rgba(90,90,115,0.7)',fontSize:'12px',fontFamily:'DM Sans,system-ui,sans-serif'}}>
            © {new Date().getFullYear()} GabryShop. Tutti i diritti riservati.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'20px',color:'rgba(90,90,115,0.7)',fontSize:'12px',fontFamily:'DM Sans,system-ui,sans-serif'}}>
            <span>💳 PayPal</span>
            <span>🔒 SSL Sicuro</span>
            <span>⚡ Digitale</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
