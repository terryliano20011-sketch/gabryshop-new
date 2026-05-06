import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{minHeight:'100vh',background:'#000',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 6%',textAlign:'center'}}>
      
      <div style={{maxWidth:'520px',width:'100%'}}>
        {/* Icona */}
        <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'rgba(77,217,192,0.1)',border:'1px solid rgba(77,217,192,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px',fontSize:'36px'}}>
          ✅
        </div>

        <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:600,lineHeight:1,marginBottom:'16px',letterSpacing:'-0.03em'}}>
          Ordine ricevuto!
        </h1>

        <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.75)',fontSize:'15px',lineHeight:1.75,marginBottom:'36px'}}>
          Grazie per il tuo ordine. Ti contatteremo presto su WhatsApp o email per concordare il pagamento e procedere con la consegna.
        </p>

        {/* Step */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',padding:'24px',marginBottom:'28px',textAlign:'left'}}>
          <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(120,120,155,0.5)',marginBottom:'16px'}}>Cosa succede adesso</div>
          {[
            {n:'1', t:'Conferma ricevuta', d:'Hai ricevuto una email di riepilogo del tuo ordine'},
            {n:'2', t:'Ti contattiamo noi', d:'Ti scriviamo su WhatsApp o email entro poche ore'},
            {n:'3', t:'Concordiamo il pagamento', d:'Contanti, bonifico o Satispay — decidiamo insieme'},
            {n:'4', t:'Consegna del prodotto', d:'Ricevi il file digitale in 24-48 ore'},
          ].map(s => (
            <div key={s.n} style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'14px'}}>
              <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'rgba(77,217,192,0.1)',border:'1px solid rgba(77,217,192,0.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',fontWeight:700,color:'#4dd9c0'}}>{s.n}</div>
              <div>
                <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'13px',fontWeight:600,marginBottom:'2px'}}>{s.t}</div>
                <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'12px'}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contatti rapidi */}
        <div style={{display:'flex',gap:'10px',justifyContent:'center',marginBottom:'28px'}}>
          <a href="https://wa.me/393518435322" target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',gap:'8px',padding:'12px 20px',background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:'100px',textDecoration:'none',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,color:'#25D366'}}>
            💬 WhatsApp
          </a>
          <a href="mailto:gabryshop7@gmail.com"
            style={{display:'flex',alignItems:'center',gap:'8px',padding:'12px 20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'100px',textDecoration:'none',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,color:'rgba(180,180,210,0.8)'}}>
            ✉️ Email
          </a>
        </div>

        <Link href="/" style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(100,100,135,0.55)',textDecoration:'none'}}>
          ← Torna alla home
        </Link>
      </div>
    </div>
  )
}
