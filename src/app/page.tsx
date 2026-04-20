import Link from 'next/link'
import ParticlesHero from '@/components/ui/ParticlesHero'
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)

  return (
    <main style={{background:'#05050a'}}>

      {/* ══ HERO ══ */}
      <section style={{minHeight:'100svh', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:'100px', paddingBottom:'80px'}}>

        <ParticlesHero />

        {/* Glow */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
          <div style={{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:'800px',height:'500px',background:'radial-gradient(ellipse,rgba(180,145,80,0.07) 0%,transparent 70%)',filter:'blur(60px)'}}/>
          <div style={{position:'absolute',bottom:'10%',right:'5%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(90,70,180,0.04) 0%,transparent 70%)',filter:'blur(50px)'}}/>
          {/* Linee verticali sottili */}
          <div style={{position:'absolute',top:0,left:'15%',width:'1px',height:'100%',background:'linear-gradient(to bottom,transparent,rgba(201,169,110,0.06),transparent)'}}/>
          <div style={{position:'absolute',top:0,right:'15%',width:'1px',height:'100%',background:'linear-gradient(to bottom,transparent,rgba(201,169,110,0.04),transparent)'}}/>
        </div>

        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 6%',width:'100%',position:'relative'}}>

          {/* Floating new badge */}
          <div style={{marginBottom:'24px',display:'flex',justifyContent:'center'}}>
            <span className="floating-label" style={{animation:'softPulse 3s ease-in-out infinite'}}>✨ Servizi digitali premium · Est. 2024</span>
          </div>

          {/* Overline */}
          <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'56px'}}>
            <div style={{width:'32px',height:'1px',background:'rgba(201,169,110,0.5)'}}/>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(201,169,110,0.75)'}}>Servizi Digitali Professionali</span>
            <div style={{flex:1,height:'1px',background:'linear-gradient(to right,rgba(201,169,110,0.2),transparent)'}}/>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',color:'rgba(100,100,130,0.4)',letterSpacing:'0.12em'}}>EST. 2024</span>
          </div>

          {/* Titolo centrato */}
          <h1 className="hero-parallax" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(3.5rem,8vw,8rem)',fontWeight:600,lineHeight:0.92,letterSpacing:'-0.025em',color:'white',marginBottom:'64px',textAlign:'center'}}>
            Il tuo<br/>
            <em className="gold" data-typewriter="business,digitale,futuro,successo" style={{fontStyle:'italic'}}>business</em><br/>
            digitale.
          </h1>

          {/* Riga info: 3 blocchi orizzontali */}
          <div className="hero-info-row">

            {/* Sinistra: copy */}
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px',lineHeight:1.85,color:'rgba(145,145,178,0.85)'}}>
              Siti web, menu digitali, automazioni,<br/>app mobile. Consegnato in{' '}
              <span style={{color:'rgba(201,169,110,0.9)',fontWeight:500}}>24–48 ore</span>.
            </p>

            {/* Centro: CTA */}
            <div className="hero-cta-col">
              <Link href="#servizi" className="g-btn g-btn-gold" style={{justifyContent:'space-between',padding:'15px 22px',borderRadius:'14px',fontSize:'15px',fontWeight:600}}>
                Scopri i servizi <ArrowRight size={17}/>
              </Link>
              <Link href="/chi-siamo" className="g-btn g-btn-ghost" style={{justifyContent:'center',borderRadius:'14px',fontSize:'14px'}}>
                Chi siamo
              </Link>
            </div>

            {/* Destra: stats orizzontali */}
            <div className="hero-stats-row">
              {[
                {n:'+200',l:'Clienti',counter:'200',prefix:'+'},
                {n:'98%', l:'Soddisfazione',counter:'98',suffix:'%'},
                {n:'24h', l:'Consegna',counter:'24',suffix:'h'},
              ].map((s:any) => (
                <div key={s.l} style={{textAlign:'center'}}>
                  <div
                    data-counter={s.counter}
                    data-counter-suffix={s.suffix||''}
                    data-counter-prefix={s.prefix||''}
                    style={{fontFamily:'Cormorant Garamond,serif',fontSize:'2.2rem',fontWeight:600,lineHeight:1,color:'white',marginBottom:'4px'}}
                  >{s.n}</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',color:'rgba(100,100,135,0.6)',letterSpacing:'0.06em',textTransform:'uppercase'}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust bar */}
          <div style={{height:'1px',background:'rgba(255,255,255,0.04)',marginBottom:'28px'}}/>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'32px'}}>
            {[
              '🔒 Pagamenti sicuri PayPal',
              '⚡ Consegna 24-48 ore',
              '⭐ +200 clienti soddisfatti',
              '✅ Rimborso 7 giorni',
            ].map(b => (
              <span key={b} style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(110,110,145,0.7)'}}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVIZI ══ */}
      <section id="servizi" style={{padding:'100px 6%',maxWidth:'1200px',margin:'0 auto'}}>
        <div className="sr" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'56px',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <span className="overline" style={{marginBottom:'14px'}}>Categorie</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:600,color:'white',lineHeight:0.93,letterSpacing:'-0.025em'}}>
              Cosa<br/><em className="gold" style={{fontStyle:'italic'}}>offriamo</em>
            </h2>
          </div>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px',color:'rgba(125,125,160,0.78)',maxWidth:'280px',lineHeight:1.75}}>
            Cinque aree di competenza. Dalla presenza web alle automazioni avanzate.
          </p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="grid-services-top" style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:'10px'}}>
            {CATEGORIES.slice(0,2).map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="g-card sr" style={{display:'block',textDecoration:'none',borderRadius:'20px',overflow:'hidden'}}>
                <div style={{position:'relative',height:'300px',overflow:'hidden'}}>
                  {cat.image && <img src={cat.image} alt={cat.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.28) saturate(0.55)',transition:'filter 0.6s ease,transform 0.8s cubic-bezier(0.16,1,0.3,1)'}}/>}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,5,10,0.98) 0%,rgba(5,5,10,0.3) 55%,transparent 100%)'}}/>
                  <div style={{position:'absolute',top:'18px',left:'18px'}}>
                    <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(201,169,110,0.7)',background:'rgba(201,169,110,0.07)',border:'1px solid rgba(201,169,110,0.14)',borderRadius:'100px',padding:'4px 11px'}}>{cat.product_count} prodotti</span>
                  </div>
                  <div style={{position:'absolute',bottom:'24px',left:'24px',right:'24px'}}>
                    <div style={{fontSize:'24px',marginBottom:'10px'}}>{cat.icon}</div>
                    <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.85rem',fontWeight:600,lineHeight:1.1,marginBottom:'8px'}}>{cat.name}</h3>
                    <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(125,125,162,0.72)',fontSize:'12.5px',lineHeight:1.6,marginBottom:'14px'}}>{cat.description}</p>
                    <div style={{display:'flex',alignItems:'center',gap:'5px',color:'#c9a96e',fontSize:'12px',fontWeight:600,fontFamily:'Outfit,system-ui,sans-serif'}}>Esplora <ArrowUpRight size={12}/></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid-services-bottom" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
            {CATEGORIES.slice(2).map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="g-card sr" style={{display:'block',textDecoration:'none',borderRadius:'20px',overflow:'hidden'}}>
                <div style={{position:'relative',height:'200px',overflow:'hidden'}}>
                  {cat.image && <img src={cat.image} alt={cat.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.25) saturate(0.45)',transition:'all 0.6s ease'}}/>}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,5,10,0.97) 0%,rgba(5,5,10,0.2) 55%,transparent 100%)'}}/>
                  <div style={{position:'absolute',bottom:'18px',left:'18px',right:'18px'}}>
                    <div style={{fontSize:'20px',marginBottom:'7px'}}>{cat.icon}</div>
                    <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.4rem',fontWeight:600,lineHeight:1.1,marginBottom:'6px'}}>{cat.name}</h3>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(100,100,138,0.6)',fontSize:'11px'}}>{cat.product_count} prodotti</span>
                      <ArrowUpRight size={13} style={{color:'rgba(201,169,110,0.5)'}}/>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESSO ══ */}
      <section style={{background:'#080810',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)',padding:'100px 6%'}}>
        <div className="grid-process" style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 2fr',gap:'80px',alignItems:'start'}}>
          <div>
            <span className="overline" style={{marginBottom:'18px'}}>Come funziona</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.5rem,4.5vw,4rem)',fontWeight:600,color:'white',lineHeight:0.95,letterSpacing:'-0.025em'}}>
              Tre<br/><em className="gold" style={{fontStyle:'italic'}}>semplici</em><br/>passi.
            </h2>
          </div>
          <div>
            {[
              {n:'01',t:'Scegli il servizio',d:'Esplora il catalogo. Ogni prodotto ha descrizione dettagliata, tempi chiari e lista esatta di cosa include.'},
              {n:'02',t:'Acquista con PayPal',d:'Tutte le carte accettate. Transazione 100% protetta. Rimborso completo entro 7 giorni.'},
              {n:'03',t:'Ricevi in 24 ore',d:'File digitale in email, oppure ti contattiamo per i prodotti personalizzati. Revisioni incluse.'},
            ].map((s,i,arr) => (
              <div key={s.n} className="process-step-row" style={{display:'grid',gridTemplateColumns:'64px 1fr',gap:'20px',padding:'32px 0',borderBottom:i<arr.length-1?'1px solid rgba(255,255,255,0.045)':'none',alignItems:'start'}}>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'3.2rem',fontWeight:300,lineHeight:1,color:'rgba(201,169,110,0.16)',letterSpacing:'-0.04em'}}>{s.n}</div>
                <div>
                  <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.55rem',fontWeight:600,marginBottom:'10px',lineHeight:1.15}}>{s.t}</h3>
                  <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(115,115,152,0.78)',fontSize:'14px',lineHeight:1.75}}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODOTTI ══ */}
      <section style={{padding:'100px 6%',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'56px',flexWrap:'wrap',gap:'16px'}}>
          <div>
            <span className="overline" style={{marginBottom:'14px'}}>Più venduti</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:600,color:'white',lineHeight:0.93,letterSpacing:'-0.025em'}}>
              I più<br/><em className="gold" style={{fontStyle:'italic'}}>popolari</em>
            </h2>
          </div>
          <Link href="/categoria/siti-web" className="g-btn g-btn-ghost" style={{borderRadius:'100px'}}>
            Catalogo completo <ArrowRight size={14}/>
          </Link>
        </div>
        <div className="grid-products" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {featured.map((p,i) => (
            <div key={p.id} className="sr" style={{transitionDelay:`${i*120}ms`}}><ProductCard product={{...p,category:CATEGORIES.find(c=>c.id===p.category_id)}} delay={i*80}/></div>
          ))}
        </div>
      </section>


      {/* ══ TESTIMONIALS ══ */}
      <section style={{padding:'100px 6%',background:'#080810',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'64px'}}>
            <span className="overline" style={{marginBottom:'16px',display:'block'}}>Recensioni</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:600,color:'white',lineHeight:0.95,letterSpacing:'-0.025em'}}>
              Cosa dicono<br/><em className="gold" style={{fontStyle:'italic'}}>i clienti</em>
            </h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',gridAutoRows:'1fr'}}>
            {[
              {name:'Marco Bianchi',    role:'Titolare Pizzeria',       avatar:'🍕', text:'Menu digitale consegnato in meno di 24 ore. I clienti lo adorano e abbiamo già ridotto gli errori degli ordini del 40%. Qualità eccezionale.',stars:5},
              {name:'Sara Lombardi',    role:'Freelance Designer',      avatar:'🎨', text:'Portfolio online professionale in 48 ore. Gabry ha capito esattamente quello che volevo. Già ricevuto 3 nuovi clienti grazie al sito.',stars:5},
              {name:'Agenzia Meridian', role:'Marketing Agency',        avatar:'🏢', text:'Il chatbot WhatsApp ha automatizzato il 70% del supporto clienti. ROI incredibile per il prezzo pagato. Lo consiglio a tutti.',stars:5},
              {name:'Laura Esposito',   role:'Parrucchiera',            avatar:'✂️', text:'Sito bellissimo e funzionale. Le prenotazioni online sono aumentate del 60% nel primo mese. Assistenza super disponibile.',stars:5},
              {name:'Roberto Mancini',  role:'PMI owner',               avatar:'📊', text:'Il foglio Excel per la gestione dipendenti ha rivoluzionato il nostro processo. Risparmio 3 ore a settimana. Vale 10 volte il prezzo.',stars:5},
              {name:'Cristina Ferro',   role:'Ristorante La Grotta',    avatar:'🍽️', text:'Menu multilingua perfetto per i turisti stranieri. Aggiornamenti in tempo reale fantastici. Professionalità e velocità uniche.',stars:5},
              {name:'Davide Romano',    role:'E-commerce Fashion',      avatar:'👕', text:'Landing page convertissima! Tasso di conversione salito dal 1.2% al 4.8% in due settimane. Investimento che si è ripagato in 3 giorni.',stars:5},
              {name:'Giulia Marchetti', role:'Studio Pilates',          avatar:'🧘', text:'App prenotazioni semplicissima da usare. Le clienti la adorano e ho zero telefonate per gli appuntamenti. Consiglio vivamente!',stars:5},
              {name:'Luca Ferretti',    role:'Consulente Finanziario',  avatar:'💼', text:'Sito aziendale elegante e professionale. In meno di 48 ore avevo già il sito online. Supporto impeccabile anche dopo la consegna.',stars:5},
              {name:'Anna Conti',       role:'Gelateria Artigianale',   avatar:'🍦', text:'Il menu QR con le foto dei gelati ha triplicato le ordinazioni di gusti nuovi. I clienti lo trovano divertente e pratico.',stars:5},
              {name:'Matteo Gallo',     role:'Personal Trainer',        avatar:'💪', text:'Automazione Instagram DM fantastica. Rispondo a 200 messaggi al giorno in automatico. Ho guadagnato 2 ore libere ogni giorno.',stars:5},
              {name:'Federica Bruno',   role:'Avvocato',                avatar:'⚖️', text:'Sito professionale esattamente come lo immaginavo. Design sobrio ed elegante. I clienti mi dicono che ispira subito fiducia.',stars:5},
            ].map((t,i) => (
              <div key={t.name} className="testimonial-card sr" data-delay={String(i*80)}>
                <div style={{display:'flex',gap:'4px',marginBottom:'16px'}}>
                  {[...Array(t.stars)].map((_,j) => (
                    <span key={j} style={{color:'#c9a96e',fontSize:'14px'}}>★</span>
                  ))}
                </div>
                <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(165,165,195,0.85)',fontSize:'14px',lineHeight:1.75,marginBottom:'20px',fontStyle:'italic'}}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{display:'flex',alignItems:'center',gap:'12px',borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:'16px'}}>
                  <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'rgba(201,169,110,0.08)',border:'1px solid rgba(201,169,110,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>{t.avatar}</div>
                  <div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'13px',fontWeight:600}}>{t.name}</div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'11px'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{padding:'0 6% 100px',maxWidth:'1200px',margin:'0 auto'}}>
        <div className="grid-cta" style={{position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,0.065)',borderRadius:'24px',background:'linear-gradient(135deg,rgba(255,255,255,0.024) 0%,rgba(255,255,255,0.008) 100%)',padding:'clamp(56px,8vw,88px)',display:'grid',gridTemplateColumns:'1fr auto',gap:'56px',alignItems:'center'}}>
          <div style={{position:'absolute',top:'-30%',right:'-3%',width:'520px',height:'520px',borderRadius:'50%',background:'radial-gradient(circle,rgba(201,169,110,0.05) 0%,transparent 65%)',filter:'blur(55px)',pointerEvents:'none'}}/>
          <div style={{position:'relative'}}>
            <span className="overline" style={{marginBottom:'20px'}}>Inizia oggi</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:600,color:'white',lineHeight:1.02,letterSpacing:'-0.025em',marginBottom:'20px'}}>
              Ogni giorno senza<br/>
              <em className="gold" style={{fontStyle:'italic'}}>presenza digitale</em><br/>
              è un&apos;opportunità persa.
            </h2>
            <div style={{display:'flex',alignItems:'center',gap:'8px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(95,95,125,0.85)'}}>
              <CheckCircle size={13} style={{color:'#4ade80',flexShrink:0}}/>
              Rimborso 7 giorni &nbsp;·&nbsp; Nessun abbonamento &nbsp;·&nbsp; Tutto digitale
            </div>
          </div>
          <div className="cta-btns" style={{display:'flex',flexDirection:'column',gap:'10px',minWidth:'210px',position:'relative'}}>
            <Link href="#servizi" className="g-btn g-btn-gold" style={{borderRadius:'14px',justifyContent:'center',padding:'16px 28px',fontSize:'15px'}}>
              Scopri i servizi <ArrowRight size={17}/>
            </Link>
            <Link href="/contatti" className="g-btn g-btn-ghost" style={{borderRadius:'14px',justifyContent:'center',fontSize:'14px'}}>Hai domande?</Link>
          </div>
        </div>
      </section>


      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "GabryShop",
          "description": "Servizi digitali professionali: siti web, menu digitali, automazioni, app mobile e fogli Excel.",
          "url": "https://gabryshop-digitale.vercel.app",
          "logo": "https://gabryshop-digitale.vercel.app/icon.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "terryliano20011@gmail.com",
            "availableLanguage": "Italian"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "EUR",
            "lowPrice": "10",
            "highPrice": "40",
            "offerCount": "29"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "200",
            "bestRating": "5"
          }
        })}}
      />
    </main>
  )
}
