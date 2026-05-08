import Link from 'next/link'

const DEMOS = [
  { slug:'ristorazione', name:'Ristorante', icon:'🍽️', desc:'Menu QR + sito con prenotazioni', color:'#f59e0b' },
  { slug:'locali', name:'Locale / Discoteca', icon:'🎉', desc:'Sito eventi + drink list digitale', color:'#8b5cf6' },
  { slug:'bellezza', name:'Parrucchiere / Spa', icon:'💈', desc:'Sito prenotazioni + listino', color:'#ec4899' },
  { slug:'sport', name:'Palestra / PT', icon:'🏋️', desc:'Sito corsi + app prenotazioni', color:'#10b981' },
  { slug:'artigiani', name:'Artigiano', icon:'🏠', desc:'Sito + biglietto digitale + preventivi', color:'#f97316' },
  { slug:'professionisti', name:'Professionista', icon:'⚖️', desc:'Sito studio legale / medico', color:'#6366f1' },
  { slug:'negozi', name:'Negozio / Boutique', icon:'🛍️', desc:'E-commerce + listino digitale', color:'#c9a96e' },
  { slug:'automazioni', name:'Auto Risponditore', icon:'💬', desc:'Bot WhatsApp + Instagram DM', color:'#4dd9c0' },
  { slug:'business', name:'Strumenti Business', icon:'📊', desc:'CRM + Dashboard + Fatturazione', color:'#3b82f6' },
  { slug:'creativita', name:'Creatività', icon:'🎨', desc:'Logo + Social Kit + Video promo', color:'#e879f9' },
]

export default function DemoPage() {
  return (
    <div style={{minHeight:'100vh',background:'#000',paddingTop:'120px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 6%'}}>

        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'#4dd9c0',display:'block',marginBottom:'14px'}}>Esempi reali</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'clamp(2.5rem,6vw,4.5rem)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:'16px'}}>
            Vedi cosa<br/><em style={{fontStyle:'italic',color:'#4dd9c0'}}>creiamo.</em>
          </h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.6)',fontSize:'15px',maxWidth:'480px',margin:'0 auto',lineHeight:1.7}}>
            Esempi dimostrativi per ogni settore. Clicca per vedere il risultato finale che ricevi.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
          {DEMOS.map(d => (
            <Link key={d.slug} href={`/demo/${d.slug}`} style={{
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'20px',padding:'28px',
              textDecoration:'none',display:'flex',
              flexDirection:'column',gap:'14px',
              transition:'all 0.3s ease',
              position:'relative',overflow:'hidden',
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(77,217,192,0.3)';(e.currentTarget as HTMLElement).style.background='rgba(77,217,192,0.04)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.07)';(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.03)'}}>
              <div style={{fontSize:'36px'}}>{d.icon}</div>
              <div>
                <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'22px',fontWeight:700,marginBottom:'4px'}}>{d.name}</div>
                <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.55)',fontSize:'13px',lineHeight:1.5}}>{d.desc}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'auto',paddingTop:'14px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
                <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'#4dd9c0',fontWeight:600}}>Vedi demo →</span>
                <div style={{width:'8px',height:'8px',borderRadius:'50%',background:d.color}}/>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
