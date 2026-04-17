'use client'
import { useState } from 'react'
import { Mail, MessageCircle, Clock, Send, ArrowRight } from 'lucide-react'

export default function ContattiPage() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'140px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 6%'}}>

        {/* Header */}
        <div style={{marginBottom:'72px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'#c9a96e',display:'block',marginBottom:'16px'}}>Supporto</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(3rem,7vw,6rem)',fontWeight:600,lineHeight:0.92,letterSpacing:'-0.025em',color:'white',marginBottom:'20px'}}>
            Contattaci
          </h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'16px',color:'rgba(140,140,175,0.8)',lineHeight:1.7,maxWidth:'480px'}}>
            Siamo qui per aiutarti. Risposta garantita entro 24 ore.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:'48px',alignItems:'start'}}>

          {/* Colonna sinistra */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[
              {icon:<MessageCircle size={18}/>, label:'WhatsApp', value:'Risposta entro 1 ora', href:`https://wa.me/393401234567`, color:'#25D366'},
              {icon:<Mail size={18}/>,          label:'Email',    value:'terryliano20011@gmail.com',  href:'mailto:terryliano20011@gmail.com', color:'#c9a96e'},
              {icon:<Clock size={18}/>,         label:'Orari',   value:'Lun–Ven 9:00–18:00', href:'#', color:'#7c6af0'},
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="g-card"
                style={{display:'flex',alignItems:'center',gap:'16px',padding:'20px 24px',textDecoration:'none',borderRadius:'16px'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:`${item.color}12`,border:`1px solid ${item.color}22`,color:item.color}}>
                  {item.icon}
                </div>
                <div>
                  <div style={{color:'white',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:600,marginBottom:'3px'}}>{item.label}</div>
                  <div style={{color:'rgba(120,120,155,0.65)',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12.5px'}}>{item.value}</div>
                </div>
                <ArrowRight size={15} style={{color:'rgba(120,120,155,0.35)',marginLeft:'auto'}}/>
              </a>
            ))}

            <div className="g-card" style={{padding:'24px',borderRadius:'16px',marginTop:'4px'}}>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.3rem',fontWeight:600,marginBottom:'10px'}}>Risposta rapida garantita</h3>
              <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.72)',fontSize:'13.5px',lineHeight:1.7}}>
                Per richieste urgenti usa WhatsApp. Per domande tecniche o preventivi, inviaci un&apos;email con tutti i dettagli del progetto.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="g-card" style={{padding:'36px',borderRadius:'20px'}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'40px 0'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>✅</div>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.8rem',fontWeight:600,marginBottom:'10px'}}>Messaggio inviato!</h3>
                <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.7)',fontSize:'14px'}}>Ti risponderemo entro 24 ore.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.5rem',fontWeight:600,marginBottom:'4px'}}>Inviaci un messaggio</h3>
                <div>
                  <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(120,120,155,0.65)',display:'block',marginBottom:'8px'}}>Nome</label>
                  <input className="g-input" placeholder="Mario Rossi" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
                </div>
                <div>
                  <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(120,120,155,0.65)',display:'block',marginBottom:'8px'}}>Email</label>
                  <input className="g-input" type="email" placeholder="mario@email.it" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/>
                </div>
                <div>
                  <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(120,120,155,0.65)',display:'block',marginBottom:'8px'}}>Messaggio</label>
                  <textarea className="g-input" rows={5} placeholder="Descrivi la tua richiesta..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required style={{resize:'none'}}/>
                </div>
                <button type="submit" className="g-btn g-btn-gold" style={{width:'100%',justifyContent:'center',borderRadius:'14px',padding:'15px',fontSize:'15px'}}>
                  <Send size={16}/> Invia messaggio
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
