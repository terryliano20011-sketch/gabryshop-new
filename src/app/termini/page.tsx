import Link from 'next/link'

export default function TerminiPage() {
  return (
    <div style={{minHeight:'100vh',background:'#05050a',paddingTop:'140px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 6%'}}>

        <div style={{marginBottom:'56px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'#c9a96e',display:'block',marginBottom:'14px'}}>Documenti legali</span>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:600,lineHeight:0.95,letterSpacing:'-0.025em',marginBottom:'16px'}}>
            Termini e Condizioni
          </h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.65)',fontSize:'13px'}}>Ultimo aggiornamento: Aprile 2024</p>
        </div>

        {/* AVVISO NO RIMBORSO ben visibile */}
        <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'16px',padding:'24px',marginBottom:'40px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
            <span style={{fontSize:'24px',flexShrink:0}}>⚠️</span>
            <div>
              <h3 style={{fontFamily:'Outfit,system-ui,sans-serif',color:'#f87171',fontSize:'15px',fontWeight:700,marginBottom:'10px',letterSpacing:'0.02em'}}>
                POLITICA DI RIMBORSO — LEGGERE ATTENTAMENTE
              </h3>
              <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(200,180,180,0.85)',fontSize:'13.5px',lineHeight:1.75,margin:0}}>
                <strong style={{color:'white'}}>I prodotti digitali personalizzati NON sono rimborsabili</strong> una volta che la lavorazione è iniziata o il file è stato consegnato.
                Acquistando accetti espressamente di rinunciare al diritto di recesso ai sensi dell&apos;art. 59 lett. o) del D.Lgs. 206/2005 (Codice del Consumo),
                che esclude il recesso per <em>contenuto digitale non fornito su supporto materiale</em> la cui esecuzione è iniziata con il consenso del consumatore.
              </p>
            </div>
          </div>
        </div>

        {[
          {
            n:'1', t:'Accettazione dei termini',
            c:`Utilizzando il sito gabryshop-digitale.vercel.app e acquistando qualsiasi prodotto o servizio, accetti integralmente i presenti Termini e Condizioni. Se non accetti, ti preghiamo di non effettuare acquisti.`
          },
          {
            n:'2', t:'Natura dei prodotti',
            c:`Tutti i prodotti venduti su GabryShop sono prodotti digitali e/o servizi digitali personalizzati, tra cui: siti web, menu digitali, automazioni, fogli Excel, app mobile. Trattandosi di contenuto digitale personalizzato, la loro natura esclude l'applicabilità del diritto di recesso standard di 14 giorni previsto per i contratti a distanza.`
          },
          {
            n:'3', t:'Politica di rimborso e recesso',
            c:`In conformità all'art. 59, comma 1, lett. o) del D.Lgs. 206/2005 (Codice del Consumo italiano), il diritto di recesso NON si applica ai contratti di fornitura di contenuto digitale su supporto non materiale, se l'esecuzione è iniziata con l'accordo espresso del consumatore.

CASI IN CUI IL RIMBORSO NON VIENE EROGATO:
• Il prodotto digitale è stato consegnato (file inviato via email o link di download fornito)
• La lavorazione del progetto personalizzato è già iniziata
• Il cliente ha approvato un'anteprima o bozza del lavoro
• Sono trascorse più di 48 ore dalla consegna senza segnalazione di problemi

CASI IN CUI IL RIMBORSO VIENE EROGATO:
• Il prodotto non è stato ancora lavorato e la richiesta di rimborso arriva entro 2 ore dall'acquisto
• Il prodotto consegnato è gravemente difforme dalla descrizione (es. sito non funzionante)
• Errore tecnico verificabile che impedisce l'utilizzo del prodotto

Per richiedere un rimborso nei casi ammissibili, contatta terryliano20011@gmail.com entro 48 ore dalla consegna.`
          },
          {
            n:'4', t:'Responsabilità del cliente',
            c:`Il cliente è responsabile di fornire informazioni accurate e complete durante il briefing. GabryShop non può essere ritenuta responsabile per risultati insoddisfacenti dovuti a informazioni incomplete, errate o fuorvianti fornite dal cliente in fase di ordine. Eventuali revisioni sono incluse solo nei limiti descritti nella pagina prodotto.`
          },
          {
            n:'5', t:'Tempi di consegna',
            c:`I tempi di consegna indicati per ogni prodotto (es. 24-48 ore) sono indicativi e non costituiscono un obbligo contrattuale assoluto. GabryShop si impegna a rispettarli nella misura del possibile. Ritardi fino a 3 giorni lavorativi non danno diritto a rimborso. In caso di ritardi superiori senza comunicazione preventiva, il cliente può richiedere la cancellazione dell'ordine e il rimborso completo.`
          },
          {
            n:'6', t:'Proprietà intellettuale',
            c:`Una volta consegnato e pagato il prodotto, il cliente acquisisce la licenza d'uso completa per uso personale e commerciale. GabryShop mantiene il diritto di inserire il lavoro nel proprio portfolio (a meno di esplicita richiesta di riservatezza). Il codice sorgente di siti web e app resta di proprietà di GabryShop salvo accordi scritti diversi.`
          },
          {
            n:'7', t:'Limitazione di responsabilità',
            c:`GabryShop non è responsabile per: perdita di dati o guadagni derivanti dall'uso dei prodotti acquistati; problemi tecnici causati da servizi terzi (hosting, dominio, PayPal, ecc.); danni indiretti o consequenziali. La responsabilità massima di GabryShop è limitata all'importo pagato per il singolo prodotto contestato.`
          },
          {
            n:'8', t:'Pagamenti e sicurezza',
            c:`I pagamenti sono gestiti da PayPal. GabryShop non ha accesso ai dati della tua carta di credito. In caso di addebito non autorizzato, contatta PayPal direttamente. GabryShop si riserva il diritto di annullare ordini sospetti di frode.`
          },
          {
            n:'9', t:'Legge applicabile e foro competente',
            c:`I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia relativa all'interpretazione o esecuzione dei presenti Termini, il foro competente è quello del luogo di residenza del titolare di GabryShop, salvo diversa disposizione inderogabile di legge.`
          },
          {
            n:'10', t:'Contatti',
            c:`Per qualsiasi domanda sui presenti Termini e Condizioni:\nEmail: terryliano20011@gmail.com\nRisposta garantita entro 24 ore nei giorni lavorativi.`
          },
        ].map(s => (
          <div key={s.n} style={{marginBottom:'36px',paddingBottom:'36px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.5rem',fontWeight:600,marginBottom:'14px',display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,color:'#c9a96e',background:'rgba(201,169,110,0.08)',border:'1px solid rgba(201,169,110,0.18)',borderRadius:'100px',padding:'3px 10px'}}>{s.n}</span>
              {s.t}
            </h2>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.82)',fontSize:'14px',lineHeight:1.85,whiteSpace:'pre-line'}}>{s.c}</div>
          </div>
        ))}

        <div style={{padding:'28px',background:'rgba(201,169,110,0.04)',border:'1px solid rgba(201,169,110,0.12)',borderRadius:'16px',marginTop:'20px',textAlign:'center'}}>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(140,140,175,0.8)',fontSize:'13px',lineHeight:1.7,margin:'0 0 16px'}}>
            Acquistando su GabryShop confermi di aver letto, compreso e accettato integralmente questi Termini e Condizioni, inclusa la politica di rimborso.
          </p>
          <Link href="/" className="g-btn g-btn-ghost" style={{borderRadius:'12px',display:'inline-flex',fontSize:'13px'}}>
            ← Torna alla home
          </Link>
        </div>

      </div>
    </div>
  )
}
