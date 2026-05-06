import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div style={{minHeight:'100vh',background:'#000',paddingTop:'140px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'780px',margin:'0 auto',padding:'0 6%'}}>

        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(120,120,155,0.6)',textDecoration:'none',fontSize:'13px',fontFamily:'Outfit,system-ui,sans-serif',marginBottom:'48px'}}>
          ← Torna alla home
        </Link>

        <div style={{marginBottom:'48px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'#4dd9c0',display:'block',marginBottom:'14px'}}>Documenti legali</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:600,lineHeight:0.95,marginBottom:'12px'}}>Privacy Policy</h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.55)',fontSize:'13px'}}>Ultimo aggiornamento: Gennaio 2026</p>
        </div>

        <div style={{height:'1px',background:'linear-gradient(90deg,transparent,rgba(77,217,192,0.2),transparent)',marginBottom:'40px'}}/>

        {[
          { n:'1', t:'Titolare del trattamento', c:'Il titolare del trattamento dei dati personali è GabryShop (gabryshop7@gmail.com). Per qualsiasi questione relativa alla privacy, puoi contattarci all\'indirizzo email indicato.' },
          { n:'2', t:'Dati raccolti', c:'Raccogliamo i seguenti dati: nome e cognome, indirizzo email, partita IVA (se fornita), dati relativi agli ordini effettuati. Non raccogliamo dati di pagamento: questi sono gestiti direttamente da PayPal in modo sicuro.' },
          { n:'3', t:'Finalità del trattamento', c:'I dati sono trattati per: processare gli ordini e inviare i prodotti digitali acquistati, inviare email transazionali legate all\'ordine, rispondere a richieste di supporto, adempiere a obblighi fiscali e contabili.' },
          { n:'4', t:'Conservazione dei dati', c:'I dati degli ordini sono conservati per 10 anni come previsto dalla normativa fiscale italiana. I dati degli account sono conservati fino alla cancellazione dell\'account da parte dell\'utente.' },
          { n:'5', t:'Diritti dell\'interessato', c:'Hai il diritto di accedere ai tuoi dati, correggerli, cancellarli e opporti al loro trattamento. Per esercitare questi diritti, contattaci a gabryshop7@gmail.com.' },
          { n:'6', t:'Cookie', c:'Utilizziamo solo cookie tecnici essenziali per il funzionamento del sito. Non utilizziamo cookie di profilazione o di terze parti per la pubblicità.' },
          { n:'7', t:'Sicurezza', c:'Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, perdita o divulgazione. Il sito utilizza connessione HTTPS cifrata.' },
        ].map(s => (
          <div key={s.n} style={{marginBottom:'32px',paddingBottom:'32px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.4rem',fontWeight:600,marginBottom:'12px',display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,color:'#4dd9c0',background:'rgba(77,217,192,0.08)',border:'1px solid rgba(77,217,192,0.18)',borderRadius:'100px',padding:'3px 10px'}}>{s.n}</span>
              {s.t}
            </h2>
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.8)',fontSize:'14px',lineHeight:1.85}}>{s.c}</p>
          </div>
        ))}

        <div style={{padding:'24px',background:'rgba(77,217,192,0.04)',border:'1px solid rgba(77,217,192,0.12)',borderRadius:'16px',textAlign:'center',marginTop:'16px'}}>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.75)',fontSize:'13px',lineHeight:1.7,margin:'0 0 16px'}}>
            Per qualsiasi domanda sulla nostra privacy policy contattaci.
          </p>
          <Link href="/contatti" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 24px',background:'rgba(77,217,192,0.08)',border:'1px solid rgba(77,217,192,0.2)',borderRadius:'100px',color:'#4dd9c0',textDecoration:'none',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600}}>
            Contattaci →
          </Link>
        </div>

      </div>
    </div>
  )
}
