import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Zap, Star } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)
  return (
    <div style={{background:'#080810'}}>

      <section className="relative flex items-center justify-center overflow-hidden dot-grid" style={{minHeight:'100svh',paddingTop:'80px'}}>
        <div className="animate-orb1 absolute" style={{top:'-10%',left:'-5%',width:'600px',height:'600px',background:'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',borderRadius:'50%',filter:'blur(40px)',pointerEvents:'none'}} />
        <div className="animate-orb2 absolute" style={{bottom:'-10%',right:'-5%',width:'700px',height:'700px',background:'radial-gradient(circle, rgba(124,106,240,0.07) 0%, transparent 70%)',borderRadius:'50%',filter:'blur(40px)',pointerEvents:'none'}} />
        <div className="absolute" style={{top:'40%',left:'50%',transform:'translateX(-50%)',width:'900px',height:'300px',background:'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)',filter:'blur(60px)',pointerEvents:'none'}} />
        <div className="absolute inset-x-0" style={{top:'30%',height:'1px',background:'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.08) 30%, rgba(201,169,110,0.15) 50%, rgba(201,169,110,0.08) 70%, transparent 100%)',pointerEvents:'none'}} />

        <div className="relative w-full max-w-6xl mx-auto px-5 lg:px-8 py-24" style={{textAlign:'center'}}>
          <div className="animate-fade-up" style={{display:'inline-flex',alignItems:'center',gap:'8px',marginBottom:'40px',animationDelay:'0ms'}}>
            <div className="glass-gold" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 20px'}}>
              <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#c9a96e',boxShadow:'0 0 8px #c9a96e',display:'inline-block'}} />
              <span style={{color:'#c9a96e',fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',fontFamily:'DM Sans,system-ui,sans-serif'}}>
                Prodotti digitali professionali
              </span>
            </div>
          </div>

          <h1 className="animate-fade-up" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(3.5rem,9vw,7.5rem)',fontWeight:800,lineHeight:1.02,letterSpacing:'-0.025em',color:'white',marginBottom:'28px',animationDelay:'80ms'}}>
            Il tuo business<br />
            <span className="text-gold">digitale, adesso.</span>
          </h1>

          <p className="animate-fade-up" style={{fontSize:'clamp(1rem,2.5vw,1.2rem)',color:'rgba(180,180,200,0.75)',maxWidth:'540px',margin:'0 auto 48px',lineHeight:1.75,fontFamily:'DM Sans,system-ui,sans-serif',animationDelay:'160ms'}}>
            Siti web, menu digitali, automazioni e app mobile.
            {' '}Qualità da agenzia, consegnato in{' '}
            <strong style={{color:'rgba(201,169,110,0.9)',fontWeight:600}}>24-48 ore</strong>.
          </p>

          <div className="animate-fade-up" style={{display:'flex',flexWrap:'wrap',gap:'16px',justifyContent:'center',marginBottom:'56px',animationDelay:'240ms'}}>
            <Link href="#categorie" className="btn-primary" style={{fontSize:'16px',padding:'16px 44px'}}>
              Scopri i servizi <ArrowRight size={18} />
            </Link>
            <Link href="/chi-siamo" className="btn-secondary" style={{fontSize:'16px',padding:'16px 44px'}}>
              Chi siamo
            </Link>
          </div>

          <div className="animate-fade-up" style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'32px',animationDelay:'320ms'}}>
            {[
              {icon:<Shield size={13}/>, label:'Pagamenti sicuri PayPal'},
              {icon:<Zap size={13}/>, label:'Consegna 24-48 ore'},
              {icon:<Star size={13} fill="#c9a96e" />, label:'+200 clienti soddisfatti'},
              {icon:<CheckCircle size={13}/>, label:'Rimborso 7 giorni'},
            ].map((b,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'7px',color:'rgba(130,130,155,0.85)',fontSize:'13px',fontFamily:'DM Sans,system-ui,sans-serif'}}>
                <span style={{color:'#c9a96e'}}>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>

          <div style={{position:'absolute',bottom:'36px',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',color:'rgba(100,100,120,0.5)'}}>
            <span style={{fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',fontFamily:'DM Sans,system-ui,sans-serif'}}>Scorri</span>
            <div style={{width:'1px',height:'44px',overflow:'hidden',background:'rgba(100,100,120,0.15)'}}>
              <div style={{width:'100%',height:'50%',background:'linear-gradient(to bottom, #c9a96e, transparent)',animation:'scanLine 1.8s ease-in-out infinite'}} />
            </div>
          </div>
        </div>
      </section>

      <section id="categorie" style={{padding:'110px 0',background:'#080810'}}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div style={{textAlign:'center',marginBottom:'72px'}}>
            <p className="section-label" style={{marginBottom:'18px'}}>I nostri servizi</p>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:700,color:'white',marginBottom:'18px',lineHeight:1.1}}>Cosa offriamo</h2>
            <p style={{color:'rgba(155,155,185,0.75)',fontSize:'17px',fontFamily:'DM Sans,system-ui,sans-serif',maxWidth:'460px',margin:'0 auto',lineHeight:1.65}}>
              Cinque categorie di prodotti digitali, pronti in pochissimo tempo.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px'}}>
            {CATEGORIES.map((cat,i)=>(
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="card" style={{textDecoration:'none',display:'block'}}>
                <div style={{position:'relative',height:'168px',overflow:'hidden',borderRadius:'12px 12px 0 0'}}>
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.38) saturate(0.75)',transition:'all 0.6s cubic-bezier(0.16,1,0.3,1)'}} />
                  ) : <div style={{width:'100%',height:'100%',background:'#111120'}} />}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.2) 55%, transparent 100%)'}} />
                  <div style={{position:'absolute',bottom:'13px',left:'15px',fontSize:'24px'}}>{cat.icon}</div>
                  <div style={{position:'absolute',top:'11px',right:'11px',background:`${cat.color}16`,border:`1px solid ${cat.color}32`,borderRadius:'20px',padding:'3px 11px',fontSize:'11px',fontWeight:700,color:cat.color,fontFamily:'DM Sans,system-ui,sans-serif'}}>
                    {cat.product_count} prodotti
                  </div>
                </div>
                <div style={{padding:'18px 20px 22px'}}>
                  <h3 style={{fontFamily:'Playfair Display,serif',color:'white',fontSize:'18px',fontWeight:600,marginBottom:'7px'}}>{cat.name}</h3>
                  <p style={{color:'rgba(130,130,165,0.7)',fontSize:'12px',lineHeight:1.55,fontFamily:'DM Sans,system-ui,sans-serif',marginBottom:'14px'}}>{cat.description}</p>
                  <div style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',fontWeight:600,color:cat.color,fontFamily:'DM Sans,system-ui,sans-serif'}}>
                    Scopri <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'110px 0',background:'linear-gradient(180deg, #080810 0%, #0c0c1a 50%, #080810 100%)'}}>
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div style={{textAlign:'center',marginBottom:'72px'}}>
            <p className="section-label" style={{marginBottom:'18px'}}>Processo semplice</p>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:700,color:'white',marginBottom:'16px',lineHeight:1.1}}>Come funziona</h2>
            <p style={{color:'rgba(155,155,185,0.75)',fontSize:'17px',fontFamily:'DM Sans,system-ui,sans-serif'}}>Tre passi e il tuo prodotto digitale è pronto.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px'}}>
            {[
              {n:'01',title:'Scegli',sub:'Esplora le categorie e trova il prodotto perfetto per il tuo business.',icon:'🎯',c:'#c9a96e'},
              {n:'02',title:'Acquista',sub:'Paga in sicurezza con PayPal. Tutte le carte accettate, zero commissioni.',icon:'🔐',c:'#7c6af0'},
              {n:'03',title:'Ricevi',sub:'File o contatto entro 24 ore. Revisioni incluse per i prodotti personalizzati.',icon:'📦',c:'#10b981'},
            ].map((s,i)=>(
              <div key={s.n} className="card" style={{padding:'40px 34px',position:'relative'}}>
                <div style={{position:'absolute',top:'18px',right:'22px',fontFamily:'Playfair Display,serif',fontSize:'88px',fontWeight:800,color:`${s.c}04`,lineHeight:1,pointerEvents:'none',userSelect:'none',letterSpacing:'-0.05em'}}>{s.n}</div>
                <div style={{width:'58px',height:'58px',borderRadius:'16px',background:`${s.c}10`,border:`1px solid ${s.c}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',marginBottom:'22px'}}>{s.icon}</div>
                <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',color:s.c,marginBottom:'10px',fontFamily:'DM Sans,system-ui,sans-serif',textTransform:'uppercase'}}>Step {s.n}</div>
                <h3 style={{fontFamily:'Playfair Display,serif',color:'white',fontSize:'24px',fontWeight:700,marginBottom:'13px'}}>{s.title}</h3>
                <p style={{color:'rgba(130,130,165,0.75)',fontSize:'14px',lineHeight:1.7,fontFamily:'DM Sans,system-ui,sans-serif'}}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prodotti" style={{padding:'110px 0',background:'#080810'}}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'60px',flexWrap:'wrap',gap:'16px'}}>
            <div>
              <p className="section-label" style={{marginBottom:'14px'}}>Più venduti</p>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.2rem,4vw,3.2rem)',fontWeight:700,color:'white',lineHeight:1.1}}>I più popolari</h2>
            </div>
            <Link href="/categoria/siti-web" style={{display:'flex',alignItems:'center',gap:'7px',color:'#c9a96e',fontSize:'14px',fontWeight:600,textDecoration:'none',fontFamily:'DM Sans,system-ui,sans-serif'}}>
              Vedi tutti <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px'}}>
            {featured.map((p,i)=>(
              <ProductCard key={p.id} product={{...p,category:CATEGORIES.find(c=>c.id===p.category_id)}} delay={i*100} />
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'80px 0',background:'#0c0c1a'}}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:'16px'}}>
            {[
              {v:'+200',l:'Clienti soddisfatti',e:'🎯'},
              {v:'98%',l:'Soddisfazione media',e:'⭐'},
              {v:'< 24h',l:'Tempo di risposta',e:'⚡'},
              {v:'7 gg',l:'Rimborso garantito',e:'🛡️'},
            ].map((s,i)=>(
              <div key={s.l} className="card" style={{padding:'30px 24px',textAlign:'center'}}>
                <div style={{fontSize:'30px',marginBottom:'10px'}}>{s.e}</div>
                <div className="stat-number" style={{fontSize:'2.4rem',fontWeight:800,lineHeight:1,marginBottom:'9px'}}>{s.v}</div>
                <div style={{fontSize:'12px',color:'rgba(120,120,155,0.7)',fontFamily:'DM Sans,system-ui,sans-serif',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'110px 0',background:'#080810'}}>
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="card" style={{padding:'clamp(52px,9vw,88px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'350px',background:'radial-gradient(ellipse, rgba(201,169,110,0.055) 0%, transparent 65%)',pointerEvents:'none'}} />
            <div style={{position:'relative'}}>
              <div style={{fontSize:'52px',marginBottom:'26px',lineHeight:1}}>🚀</div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2.2rem,5.5vw,3.8rem)',fontWeight:800,color:'white',marginBottom:'22px',lineHeight:1.08}}>Pronto a partire?</h2>
              <p style={{fontSize:'17px',color:'rgba(155,155,185,0.75)',maxWidth:'440px',margin:'0 auto 52px',lineHeight:1.75,fontFamily:'DM Sans,system-ui,sans-serif'}}>
                Ogni giorno senza il tuo sito o automazione è un&apos;opportunità persa. Inizia oggi.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'16px',justifyContent:'center',marginBottom:'36px'}}>
                <Link href="#categorie" className="btn-primary" style={{fontSize:'16px',padding:'16px 44px'}}>
                  Inizia ora <ArrowRight size={18} />
                </Link>
                <Link href="/contatti" className="btn-secondary" style={{fontSize:'16px',padding:'16px 44px'}}>
                  Hai domande?
                </Link>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'7px',fontSize:'13px',color:'rgba(100,100,120,0.75)',fontFamily:'DM Sans,system-ui,sans-serif'}}>
                <CheckCircle size={14} style={{color:'#22c55e'}} />
                Rimborso 7 giorni &nbsp;&middot;&nbsp; Tutto digitale &nbsp;&middot;&nbsp; Nessun abbonamento
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
