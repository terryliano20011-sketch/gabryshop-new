import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{background:'#060608',borderTop:'1px solid rgba(255,255,255,0.05)',marginTop:'40px'}}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8" style={{padding:'72px 5% 48px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr',gap:'48px',marginBottom:'64px',flexWrap:'wrap'}}>

          <div className="footer-brand-col">
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'linear-gradient(135deg,#0d1f2d,#1a3a4a)',border:'1.5px solid rgba(0,220,200,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 0 12px rgba(0,200,180,0.15)'}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="9" cy="11" r="7" stroke="#4dd9c0" strokeWidth="1.2" fill="none" opacity="0.8"/>
                  <line x1="2" y1="11" x2="16" y2="11" stroke="#4dd9c0" strokeWidth="0.8" opacity="0.5"/>
                  <ellipse cx="9" cy="11" rx="3.5" ry="7" stroke="#4dd9c0" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <rect x="13" y="5" width="7" height="6" rx="1.5" fill="#0d1f2d" stroke="#4dd9c0" strokeWidth="1"/>
                  <circle cx="15" cy="8" r="0.8" fill="#4dd9c0"/>
                  <circle cx="18" cy="8" r="0.8" fill="#4dd9c0"/>
                  <line x1="15" y1="5" x2="15" y2="3.5" stroke="#4dd9c0" strokeWidth="0.8"/>
                  <circle cx="15" cy="3" r="0.5" fill="#4dd9c0"/>
                  <line x1="18" y1="5" x2="18" y2="3.5" stroke="#4dd9c0" strokeWidth="0.8"/>
                  <circle cx="18" cy="3" r="0.5" fill="#4dd9c0"/>
                  <line x1="13" y1="9" x2="11" y2="9" stroke="#4dd9c0" strokeWidth="0.7" opacity="0.6"/>
                  <circle cx="10.5" cy="9" r="0.5" fill="#4dd9c0" opacity="0.6"/>
                </svg>
              </div>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'20px',fontWeight:800,letterSpacing:'-0.02em'}}>
                <span style={{color:'#4dd9c0'}}>Gabry</span>
                <span style={{color:'white'}}>Shop</span>
              </span>
            </div>
            <p style={{color:'rgba(120,120,150,0.75)',fontSize:'14px',lineHeight:1.75,maxWidth:'300px',fontFamily:'DM Sans,system-ui,sans-serif',marginBottom:'24px'}}>
              Servizi e prodotti digitali professionali per privati e aziende. Qualità garantita, consegna rapida.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <a href="mailto:gabryshop7@gmail.com" style={{display:'flex',alignItems:'center',gap:'8px',color:'rgba(120,120,150,0.7)',fontSize:'13px',textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif'}}>
                <Mail size={14} style={{color:'#c9a96e'}} /> gabryshop7@gmail.com
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
                ['/categoria/ristorazione','🍽️ Ristorazione'],
                ['/categoria/locali','🎉 Locali & Discoteche'],
                ['/categoria/bellezza','💈 Bellezza & Cura'],
                ['/categoria/sport','🏋️ Sport & Fitness'],
                ['/categoria/artigiani','🏠 Artigiani & Casa'],
                ['/categoria/professionisti','⚖️ Professionisti'],
                ['/categoria/negozi','🛍️ Negozi & Retail'],
                ['/categoria/automazioni','💬 Auto Risponditore'],
                ['/categoria/business','📊 Strumenti Business'],
                ['/categoria/creativita','🎨 Creatività'],
              ].map(([href,label])=>(
                <Link key={href} href={href} style={{color:'rgba(120,120,150,0.7)',fontSize:'13px',textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif',transition:'color 0.2s'}}>{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{color:'white',fontWeight:600,fontSize:'13px',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'20px',fontFamily:'DM Sans,system-ui,sans-serif'}}>Info</h4>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                ['/demo','🎯 Demo prodotti'],
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
