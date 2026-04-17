import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)
  return (
    <main style={{background:'#05050a'}}>

      {/* ── HERO ── editorial, asimmetrico */}
      <section style={{minHeight:'100svh',display:'flex',flexDirection:'column',justifyContent:'flex-end',paddingBottom:'88px',position:'relative',overflow:'hidden',paddingTop:'130px'}}>
        <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
          <div style={{position:'absolute',top:0,left:'8%',width:'1px',height:'100%',background:'linear-gradient(to bottom,transparent,rgba(201,169,110,0.07),transparent)'}}/>
          <div style={{position:'absolute',top:0,right:'8%',width:'1px',height:'100%',background:'linear-gradient(to bottom,transparent,rgba(201,169,110,0.04),transparent)'}}/>
          <div style={{position:'absolute',top:'-15%',left:'25%',width:'750px',height:'750px',borderRadius:'50%',background:'radial-gradient(circle,rgba(180,145,80,0.055) 0%,transparent 65%)',filter:'blur(70px)'}}/>
          <div style={{position:'absolute',bottom:'-15%',right:'5%',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(90,70,190,0.035) 0%,transparent 65%)',filter:'blur(60px)'}}/>
        </div>

        <div style={{maxWidth:'1400px',margin:'0 auto',padding:'0 5%',width:'100%',position:'relative'}}>
          {/* Riga overline */}
          <div style={{display:'flex',alignItems:'center',gap:'18px',marginBottom:'56px'}}>
            <div style={{width:'40px',height:'1px',background:'rgba(201,169,110,0.45)'}}/>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(201,169,110,0.75)'}}>Servizi Digitali Professionali</span>
            <div style={{flex:1,height:'1px',background:'linear-gradient(to right,rgba(201,169,110,0.18),transparent)'}}/>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',color:'rgba(100,100,130,0.5)',letterSpacing:'0.12em'}}>EST. 2024</span>
          </div>

          {/* Headline maximalista */}
          <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(4.5rem,12vw,10.5rem)',fontWeight:600,lineHeight:0.88,letterSpacing:'-0.03em',color:'white',marginBottom:'64px'}}>
            <span style={{display:'block'}}>Il tuo</span>
            <span style={{display:'block',fontStyle:'italic'}} className="gold">business</span>
            <span style={{display:'block'}}>digitale.</span>
          </h1>

          {/* 3 colonne: copy | CTA | stats */}
          <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'48px',alignItems:'end'}}>
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'16px',lineHeight:1.85,color:'rgba(145,145,175,0.85)',maxWidth:'380px'}}>
              Siti web, menu digitali, automazioni, app mobile.{' '}
              Consegnato in{' '}
              <span style={{color:'rgba(201,169,110,0.9)',fontWeight:500}}>24–48 ore</span>,{' '}
              qualità da studio internazionale.
            </p>

            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <Link href="#servizi" className="g-btn g-btn-gold" style={{justifyContent:'space-between',padding:'16px 22px',borderRadius:'14px',fontSize:'15px',fontWeight:600}}>
                Scopri i servizi <ArrowRight size={17}/>
              </Link>
              <Link href="/chi-siamo" className="g-btn g-btn-ghost" style={{justifyContent:'center',borderRadius:'14px',fontSize:'14px'}}>
                Chi siamo
              </Link>
            </div>

            <div>
              {[
                {n:'+200',l:'Clienti soddisfatti'},
                {n:'98%',l:'Soddisfazione media'},
                {n:'< 24h',l:'Consegna media'},
              ].map(s=>(
                <div key={s.l} style={{borderTop:'1px solid rgba(255,255,255,0.055)',padding:'16px 0'}}>
                  <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'2.8rem',fontWeight:500,lineHeight:1,color:'white',marginBottom:'5px'}}>{s.n}</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(100,100,135,0.65)',letterSpacing:'0.06em'}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIZI grid asimmetrica ── */}
      <section id="servizi" style={{padding:'120px 5%',maxWidth:'1400px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'64px',flexWrap:'wrap',gap:'24px'}}>
          <div>
            <span className="overline" style={{marginBottom:'16px'}}>Categorie</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(3rem,6vw,5.5rem)',fontWeight:600,color:'white',lineHeight:0.9,letterSpacing:'-0.025em'}}>
              Cosa<br/><em className="gold" style={{fontStyle:'italic'}}>offriamo</em>
            </h2>
          </div>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px',color:'rgba(125,125,160,0.8)',maxWidth:'280px',lineHeight:1.75}}>
            Cinque aree di competenza. Dalla presenza web alle automazioni avanzate.
          </p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {/* Riga 1: 2 card grandi asimmetriche */}
          <div style={{display:'grid',gridTemplateColumns:'1.55fr 1fr',gap:'10px'}}>
            {CATEGORIES.slice(0,2).map(cat=>(
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="g-card" style={{display:'block',textDecoration:'none',borderRadius:'20px',overflow:'hidden'}}>
                <div style={{position:'relative',height:'310px',overflow:'hidden'}}>
                  {cat.image&&<img src={cat.image} alt={cat.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.27) saturate(0.5)',transition:'filter 0.7s ease,transform 0.8s cubic-bezier(0.16,1,0.3,1)'}}/>}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,5,10,0.98) 0%,rgba(5,5,10,0.3) 55%,transparent 100%)'}}/>
                  <div style={{position:'absolute',top:'18px',left:'18px'}}>
                    <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(201,169,110,0.7)',background:'rgba(201,169,110,0.07)',border:'1px solid rgba(201,169,110,0.13)',borderRadius:'100px',padding:'4px 12px'}}>{cat.product_count} prodotti</span>
                  </div>
                  <div style={{position:'absolute',bottom:'26px',left:'26px',right:'26px'}}>
                    <div style={{fontSize:'26px',marginBottom:'10px'}}>{cat.icon}</div>
                    <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'2rem',fontWeight:600,lineHeight:1.1,marginBottom:'8px'}}>{cat.name}</h3>
                    <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(125,125,160,0.72)',fontSize:'12.5px',lineHeight:1.6,marginBottom:'16px'}}>{cat.description}</p>
                    <div style={{display:'flex',alignItems:'center',gap:'5px',color:'#c9a96e',fontSize:'12px',fontWeight:600,fontFamily:'Outfit,system-ui,sans-serif'}}>Esplora <ArrowUpRight size={13}/></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Riga 2: 3 card piccole */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
            {CATEGORIES.slice(2).map(cat=>(
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="g-card" style={{display:'block',textDecoration:'none',borderRadius:'20px',overflow:'hidden'}}>
                <div style={{position:'relative',height:'210px',overflow:'hidden'}}>
                  {cat.image&&<img src={cat.image} alt={cat.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.24) saturate(0.45)',transition:'filter 0.7s ease,transform 0.8s ease'}}/>}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,5,10,0.97) 0%,rgba(5,5,10,0.2) 55%,transparent 100%)'}}/>
                  <div style={{position:'absolute',bottom:'18px',left:'18px',right:'18px'}}>
                    <div style={{fontSize:'20px',marginBottom:'8px'}}>{cat.icon}</div>
                    <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.4rem',fontWeight:600,lineHeight:1.1,marginBottom:'6px'}}>{cat.name}</h3>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(100,100,135,0.65)',fontSize:'11px'}}>{cat.product_count} prodotti</span>
                      <ArrowUpRight size={13} style={{color:'rgba(201,169,110,0.5)'}}/>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSO layout orizzontale ── */}
      <section style={{background:'#090910',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)',padding:'100px 5%'}}>
        <div style={{maxWidth:'1400px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 2fr',gap:'80px',alignItems:'start'}}>
          <div style={{position:'sticky',top:'120px'}}>
            <span className="overline" style={{marginBottom:'18px'}}>Come funziona</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.8rem,5vw,4.5rem)',fontWeight:600,color:'white',lineHeight:0.95,letterSpacing:'-0.025em'}}>
              Tre<br/><em className="gold" style={{fontStyle:'italic'}}>semplici</em><br/>passi.
            </h2>
          </div>
          <div>
            {[
              {n:'01',t:'Scegli il servizio',d:'Esplora il catalogo. Ogni prodotto ha descrizione dettagliata, tempi chiari e lista esatta di cosa include. Nessuna sorpresa.'},
              {n:'02',t:'Acquista con PayPal',d:'Tutte le carte accettate. Transazione 100% protetta. Rimborso completo entro 7 giorni, senza domande o spiegazioni.'},
              {n:'03',t:'Ricevi in 24 ore',d:'File digitale direttamente in email. Per i prodotti personalizzati ti contattiamo entro poche ore. Revisioni sempre incluse.'},
            ].map((s,i,arr)=>(
              <div key={s.n} style={{display:'grid',gridTemplateColumns:'72px 1fr',gap:'20px',padding:'36px 0',borderBottom:i<arr.length-1?'1px solid rgba(255,255,255,0.045)':'none',alignItems:'start'}}>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'3.5rem',fontWeight:300,lineHeight:1,color:'rgba(201,169,110,0.16)',letterSpacing:'-0.05em'}}>{s.n}</div>
                <div>
                  <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'1.65rem',fontWeight:600,marginBottom:'11px',lineHeight:1.15}}>{s.t}</h3>
                  <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(115,115,150,0.8)',fontSize:'14px',lineHeight:1.75}}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODOTTI ── */}
      <section style={{padding:'120px 5%',maxWidth:'1400px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'60px',flexWrap:'wrap',gap:'16px'}}>
          <div>
            <span className="overline" style={{marginBottom:'14px'}}>Più venduti</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.8rem,5.5vw,4.5rem)',fontWeight:600,color:'white',lineHeight:0.9,letterSpacing:'-0.025em'}}>
              I più<br/><em className="gold" style={{fontStyle:'italic'}}>popolari</em>
            </h2>
          </div>
          <Link href="/categoria/siti-web" className="g-btn g-btn-ghost" style={{borderRadius:'100px'}}>
            Catalogo completo <ArrowRight size={14}/>
          </Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {featured.map((p,i)=>(
            <ProductCard key={p.id} product={{...p,category:CATEGORIES.find(c=>c.id===p.category_id)}} delay={i*80}/>
          ))}
        </div>
      </section>

      {/* ── CTA banner editoriale ── */}
      <section style={{padding:'0 5% 120px',maxWidth:'1400px',margin:'0 auto'}}>
        <div style={{position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,0.065)',borderRadius:'24px',background:'linear-gradient(135deg,rgba(255,255,255,0.024) 0%,rgba(255,255,255,0.008) 100%)',padding:'clamp(60px,9vw,100px)',display:'grid',gridTemplateColumns:'1fr auto',gap:'60px',alignItems:'center'}}>
          <div style={{position:'absolute',top:'-25%',right:'-3%',width:'550px',height:'550px',borderRadius:'50%',background:'radial-gradient(circle,rgba(201,169,110,0.048) 0%,transparent 65%)',filter:'blur(55px)',pointerEvents:'none'}}/>
          <div style={{position:'relative'}}>
            <span className="overline" style={{marginBottom:'22px'}}>Inizia oggi</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(2.5rem,5.5vw,4.5rem)',fontWeight:600,color:'white',lineHeight:1.02,letterSpacing:'-0.025em',marginBottom:'22px'}}>
              Ogni giorno senza<br/>
              <em className="gold" style={{fontStyle:'italic'}}>presenza digitale</em><br/>
              è un&apos;opportunità persa.
            </h2>
            <div style={{display:'flex',alignItems:'center',gap:'8px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(95,95,125,0.85)'}}>
              <CheckCircle size={13} style={{color:'#4ade80',flexShrink:0}}/>
              Rimborso 7 giorni &nbsp;·&nbsp; Nessun abbonamento &nbsp;·&nbsp; Tutto digitale
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',minWidth:'215px',position:'relative'}}>
            <Link href="#servizi" className="g-btn g-btn-gold" style={{borderRadius:'14px',justifyContent:'center',padding:'17px 28px',fontSize:'15px'}}>
              Scopri i servizi <ArrowRight size={17}/>
            </Link>
            <Link href="/contatti" className="g-btn g-btn-ghost" style={{borderRadius:'14px',justifyContent:'center',fontSize:'14px'}}>
              Hai domande?
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
