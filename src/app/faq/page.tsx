'use client'
import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'

const FAQS = [
  {q:'Come ricevo i prodotti dopo il pagamento?', a:'Dopo il pagamento riceverai immediatamente un\'email con il link per scaricare i tuoi file digitali. Puoi anche accedere alla pagina Account.'},
  {q:'Quali metodi di pagamento accettate?', a:'Accettiamo pagamenti tramite PayPal, che include tutte le principali carte di credito e debito oltre al saldo PayPal.'},
  {q:'Posso richiedere un rimborso?', a:'Sì! Offriamo rimborso completo entro 7 giorni dall\'acquisto, senza domande. Contattaci via email o WhatsApp.'},
  {q:'I prodotti personalizzabili richiedono più tempo?', a:'Sì. I prodotti personalizzabili vengono lavorati manualmente. Il tempo di consegna è indicato su ogni prodotto, generalmente 24-72 ore.'},
  {q:'Posso richiedere modifiche dopo la consegna?', a:'Sì, per i prodotti personalizzabili offriamo fino a 2 revisioni gratuite incluse nel prezzo.'},
  {q:'I file sono compatibili con tutti i dispositivi?', a:'Sì. I file Excel richiedono Microsoft Excel 2016+ o Google Sheets. I siti web funzionano su tutti i dispositivi.'},
  {q:'Posso usare un coupon sconto?', a:'Sì! Inserisci il codice coupon nella pagina del carrello. Prova GABRY10 per il 10% di sconto.'},
  {q:'Emettete fattura?', a:'Sì, inserisci la partita IVA al checkout per ricevere fattura elettronica entro 48 ore dall\'acquisto.'},
]

export default function FAQPage() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'140px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 6%'}}>
        <div style={{marginBottom:'72px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'#c9a96e',display:'block',marginBottom:'16px'}}>Supporto</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(3rem,7vw,5.5rem)',fontWeight:600,lineHeight:0.95,letterSpacing:'-0.025em',color:'white',marginBottom:'20px'}}>Domande frequenti</h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'16px',color:'rgba(140,140,175,0.8)',lineHeight:1.7}}>Trova risposta alle domande più comuni.</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'60px'}}>
          {FAQS.map((faq,i) => (
            <div key={i} className="g-card" style={{borderRadius:'14px',overflow:'hidden',transition:'border-color 0.3s',borderColor:open===i?'rgba(201,169,110,0.2)':'rgba(255,255,255,0.065)'}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',gap:'16px'}}>
                <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'14.5px',fontWeight:500,lineHeight:1.4}}>{faq.q}</span>
                <ChevronDown size={16} style={{color:open===i?'#c9a96e':'rgba(120,120,155,0.5)',flexShrink:0,transition:'transform 0.3s',transform:open===i?'rotate(180deg)':'none'}}/>
              </button>
              {open===i && (
                <div style={{padding:'0 24px 20px'}}>
                  <div style={{height:'1px',background:'rgba(255,255,255,0.04)',marginBottom:'16px'}}/>
                  <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(130,130,165,0.8)',fontSize:'14px',lineHeight:1.75}}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="g-card" style={{padding:'36px',borderRadius:'20px',textAlign:'center'}}>
          <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.6rem',fontWeight:600,marginBottom:'10px'}}>Non hai trovato risposta?</h3>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.7)',fontSize:'14px',marginBottom:'24px'}}>Contattaci e ti risponderemo entro 24 ore.</p>
          <a href="https://wa.me/393518435322" target="_blank" className="g-btn g-btn-gold" style={{borderRadius:'12px',display:'inline-flex'}}>
            💬 Scrivici su WhatsApp <ArrowRight size={15}/>
          </a>
        </div>
      </div>
    </div>
  )
}
