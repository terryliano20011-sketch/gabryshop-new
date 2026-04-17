import Link from 'next/link'
import { ArrowRight, Code, Zap, Heart } from 'lucide-react'

export default function ChiSiamoPage() {
  return (
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'140px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'0 6%'}}>
        <div style={{marginBottom:'72px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'#c9a96e',display:'block',marginBottom:'16px'}}>Il team</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(3rem,7vw,6rem)',fontWeight:600,lineHeight:0.92,letterSpacing:'-0.025em',color:'white',marginBottom:'20px'}}>Chi siamo</h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'16px',color:'rgba(140,140,175,0.8)',lineHeight:1.7,maxWidth:'480px'}}>Il team dietro GabryShop.</p>
        </div>

        <div className="g-card" style={{padding:'clamp(36px,6vw,60px)',borderRadius:'24px',marginBottom:'24px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-20%',right:'-5%',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(201,169,110,0.05) 0%,transparent 70%)',filter:'blur(50px)',pointerEvents:'none'}}/>
          <div style={{position:'relative'}}>
            <div style={{width:'64px',height:'64px',borderRadius:'18px',background:'linear-gradient(135deg,#c9a96e,#8b6fd4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',marginBottom:'24px'}}>👨‍💻</div>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'2.2rem',fontWeight:600,marginBottom:'16px',lineHeight:1.1}}>Gabry — Fondatore</h2>
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.82)',fontSize:'15px',lineHeight:1.8,marginBottom:'16px'}}>
              Sono uno sviluppatore informatico appassionato di tecnologia e business digitale. Ho creato GabryShop per mettere a disposizione di privati e piccole imprese strumenti digitali professionali a prezzi accessibili, con una qualità da grande agenzia.
            </p>
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.75)',fontSize:'14px',lineHeight:1.8}}>
              Ogni prodotto è frutto di studio, esperienza pratica e feedback dei clienti. L&apos;obiettivo è che ogni acquisto porti valore reale al tuo business.
            </p>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'48px'}}>
          {[
            {icon:Code, title:'Expertise tecnica', desc:'Anni di esperienza in sviluppo web, automazioni e soluzioni digitali enterprise.', color:'#7c6af0'},
            {icon:Zap,  title:'Consegna rapida',   desc:'Processi ottimizzati per garantire consegna in 24-48 ore senza compromessi sulla qualità.', color:'#c9a96e'},
            {icon:Heart,title:'Cliente prima',     desc:'Rimborso garantito e supporto dedicato. Non sei soddisfatto? Ti rimborsiamo.', color:'#ec4899'},
          ].map(item => (
            <div key={item.title} className="g-card" style={{padding:'28px 24px',borderRadius:'18px'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:`${item.color}12`,border:`1px solid ${item.color}22`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'16px'}}>
                <item.icon size={20} style={{color:item.color}}/>
              </div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.25rem',fontWeight:600,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.72)',fontSize:'13px',lineHeight:1.65}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <Link href="/" className="g-btn g-btn-gold" style={{borderRadius:'14px',display:'inline-flex',padding:'15px 36px',fontSize:'15px'}}>
            Scopri i prodotti <ArrowRight size={17}/>
          </Link>
        </div>
      </div>
    </div>
  )
}
