import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import ParticlesHero from '@/components/ui/ParticlesHero'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)

  return (
    <main style={{background:'#000',color:'#fff',overflowX:'hidden'}}>

      {/* ══ HERO ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'120px 6% 80px',position:'relative',background:'#000',textAlign:'center'}}>
        <ParticlesHero />

        {/* Glow */}
        <div style={{position:'absolute',top:'15%',left:'50%',transform:'translateX(-50%)',width:'600px',height:'400px',background:'radial-gradient(ellipse,rgba(201,169,110,0.07) 0%,transparent 70%)',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',gap:'28px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'100px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#c9a96e'}}/>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:600,color:'rgba(255,255,255,0.5)',letterSpacing:'0.15em',textTransform:'uppercase'}}>Servizi digitali · Est. 2024</span>
          </div>

          <h1 className="hero-parallax" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(60px,10vw,120px)',fontWeight:700,lineHeight:0.88,letterSpacing:'-0.04em',color:'#fff',maxWidth:'800px'}}>
            Il tuo business<br/>
            <em className="gold" style={{fontStyle:'italic'}}>merita di più.</em>
          </h1>

          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'17px',color:'rgba(255,255,255,0.4)',maxWidth:'420px',lineHeight:1.7}}>
            Siti web, menu QR, automazioni e loghi professionali.<br/>Consegnati in 24–48 ore.
          </p>

          <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
            <Link href="/categoria/siti-web" className="g-btn g-btn-gold" style={{borderRadius:'100px',fontSize:'15px',padding:'14px 32px'}}>
              Scopri i servizi <ArrowRight size={16}/>
            </Link>
            <Link href="/chi-siamo" className="g-btn g-btn-ghost" style={{borderRadius:'100px',fontSize:'15px',padding:'14px 32px'}}>
              Chi siamo
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(3,1fr)'}}>
          {[
            {n:'+32', l:'Clienti', counter:'32', prefix:'+'},
            {n:'98%', l:'Soddisfatti', counter:'98', suffix:'%'},
            {n:'24h', l:'Consegna', counter:'24', suffix:'h'},
          ].map((s,i) => (
            <div key={s.l} style={{padding:'48px 24px',textAlign:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <div data-counter={s.counter} data-counter-suffix={s.suffix||''} data-counter-prefix={s.prefix||''} style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(48px,6vw,72px)',fontWeight:700,letterSpacing:'-0.05em',lineHeight:1,color:'#fff'}}>{s.n}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.15em',textTransform:'uppercase',marginTop:'8px'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ IPHONE SECTION ══ */}
      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'100px 6%',gap:'80px',flexWrap:'wrap'}}>
        <div style={{maxWidth:'380px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'#c9a96e',display:'block',marginBottom:'20px'}}>Il tuo shop, ovunque</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,5vw,64px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff',marginBottom:'24px'}}>
            Acquista dal<br/>telefono.<br/>In secondi.
          </h2>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px',color:'rgba(255,255,255,0.4)',lineHeight:1.75,marginBottom:'32px'}}>
            Tutto il catalogo ottimizzato per mobile. Pagamento con PayPal o carta. Conferma via email in 1 minuto.
          </p>
          <Link href="/categoria/siti-web" className="g-btn g-btn-ghost" style={{borderRadius:'100px',fontSize:'14px'}}>
            Esplora il catalogo <ArrowRight size={14}/>
          </Link>
        </div>

        {/* iPhone mockup */}
        <div style={{width:'240px',height:'480px',background:'linear-gradient(145deg,#1c1c1e,#2c2c2e)',borderRadius:'46px',border:'8px solid #3a3a3c',position:'relative',overflow:'hidden',flexShrink:0,boxShadow:'0 50px 100px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.06)',transform:'rotate(-2deg)'}}>
          <div style={{width:'90px',height:'24px',background:'#000',borderRadius:'0 0 16px 16px',position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',zIndex:2}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,#05050a,#0d0d1f)',padding:'40px 14px 20px',display:'flex',flexDirection:'column',gap:'10px',overflowY:'hidden'}}>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'2px'}}>GabryShop</div>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'18px',fontWeight:700,color:'#fff',marginBottom:'6px'}}>
              <span style={{color:'#c9a96e'}}>Gabry</span>Shop
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {[
                {img:'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=200',name:'Sito Web',price:'€22'},
                {img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',name:'Menu QR',price:'€13'},
                {img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200',name:'Bot WhatsApp',price:'€25'},
                {img:'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200',name:'Logo Design',price:'€25'},
              ].map(p => (
                <div key={p.name} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',overflow:'hidden'}}>
                  <img src={p.img} alt={p.name} style={{width:'100%',height:'40px',objectFit:'cover',filter:'brightness(0.7)'}}/>
                  <div style={{padding:'6px 8px'}}>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'8px',fontWeight:700,color:'#fff',marginBottom:'2px',lineHeight:1.2}}>{p.name}</div>
                    <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'12px',fontWeight:700,color:'#c9a96e'}}>{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'linear-gradient(135deg,#c9a96e,#b8924a)',color:'#08060a',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:800,borderRadius:'100px',padding:'8px',textAlign:'center',marginTop:'4px'}}>
              Acquista ora →
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTO CINEMATOGRAFICO ══ */}
      <section style={{minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',textAlign:'center',gap:'24px'}}>
        <h2 className="sr" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,7vw,88px)',fontWeight:700,lineHeight:0.9,letterSpacing:'-0.04em',color:'#fff',maxWidth:'720px'}}>
          Ogni giorno senza<br/>
          <em style={{fontStyle:'italic',color:'rgba(255,255,255,0.2)'}}>presenza</em> digitale<br/>
          è un'opportunità<br/>
          <em style={{fontStyle:'italic',color:'rgba(255,255,255,0.2)'}}>persa.</em>
        </h2>
        <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',textTransform:'uppercase'}}>
          Prezzi da €10 · Consegna in 24h · Pagamento sicuro
        </p>
        <Link href="/categoria/siti-web" className="g-btn g-btn-gold" style={{borderRadius:'100px',fontSize:'15px',padding:'15px 36px',marginTop:'8px'}}>
          Inizia oggi <ArrowRight size={16}/>
        </Link>
      </section>

      {/* ══ CATEGORIE ══ */}
      <section style={{padding:'100px 6%',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{marginBottom:'64px',display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
            <div>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'12px',textAlign:'center'}}>Catalogo</span>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff'}}>
                35 prodotti.<br/><em className="gold" style={{fontStyle:'italic'}}>Una soluzione.</em>
              </h2>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden'}}>
            {[
              {icon:'🌐',name:'Siti Web',price:'da €22',time:'Da 24h',slug:'siti-web'},
              {icon:'🍽️',name:'Menu Digitali',price:'da €14',time:'Da 24h',slug:'menu-digitali'},
              {icon:'🤖',name:'Automazioni',price:'da €20',time:'Da 48h',slug:'automazioni'},
              {icon:'📊',name:'Fogli Excel',price:'da €10',time:'Immediato',slug:'fogli-excel'},
              {icon:'📱',name:'App Mobile',price:'da €30',time:'3-5 giorni',slug:'app-mobile'},
              {icon:'🎨',name:'Creatività',price:'da €15',time:'Da 24h',slug:'creativita'},
            ].map((cat,i) => (
              <Link key={cat.slug} href={`/categoria/${cat.slug}`} className='cat-grid-item' style={{background:'#000',padding:'32px',display:'flex',flexDirection:'column',gap:'14px',textDecoration:'none',cursor:'pointer',borderRight:i%3<2?'1px solid rgba(255,255,255,0.07)':'none'}}
>
                <div style={{fontSize:'32px'}}>{cat.icon}</div>
                <div>
                  <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'22px',fontWeight:700,color:'#fff',letterSpacing:'-0.02em',marginBottom:'4px'}}>{cat.name}</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'#c9a96e',fontWeight:600}}>{cat.price}</div>
                </div>
                <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.08em'}}>⚡ {cat.time}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODOTTI PIÙ VENDUTI ══ */}
      <section style={{padding:'100px 6%',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'64px'}}>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'12px'}}>Più venduti</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff',marginBottom:'24px'}}>
              I più <em className="gold" style={{fontStyle:'italic'}}>popolari</em>
            </h2>
            <Link href="/categoria/siti-web" className="g-btn g-btn-ghost" style={{borderRadius:'100px',display:'inline-flex'}}>
              Catalogo completo <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="grid-products" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden'}}>
            {featured.map((p,i) => (
              <div key={p.id} className="sr" style={{transitionDelay:`${i*100}ms`,background:'#000'}}>
                <ProductCard product={{...p,category:CATEGORIES.find(c=>c.id===p.category_id)}} delay={i*80}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ══ */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'24px 6%'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap'}}>
          {['🔒 Pagamento sicuro PayPal','⚡ Consegna 24-48 ore','⭐ +32 clienti soddisfatti','✅ Rimborso 7 giorni'].map(t => (
            <span key={t} style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.05em'}}>{t}</span>
          ))}
        </div>
      </div>

      {/* ══ RECENSIONI ══ */}
      <section style={{padding:'100px 6%'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'64px'}}>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'12px'}}>Recensioni</span>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff'}}>
              Cosa dicono<br/><em className="gold" style={{fontStyle:'italic'}}>i clienti</em>
            </h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden'}}>
            {[
              {avatar:'🍕',name:'Marco B.',role:'Pizzeria',text:'"Menu digitale in meno di 24 ore. Errori ordini ridotti del 40%."'},
              {avatar:'🎨',name:'Sara L.',role:'Designer',text:'"Portfolio online in 48 ore. Già 3 nuovi clienti grazie al sito."'},
              {avatar:'🏢',name:'Agenzia Meridian',role:'Marketing',text:'"Chatbot WhatsApp che ha automatizzato il 70% del supporto."'},
              {avatar:'✂️',name:'Laura E.',role:'Parrucchiera',text:'"Prenotazioni aumentate del 60% nel primo mese. Fantastico."'},
              {avatar:'💪',name:'Matteo G.',role:'Personal Trainer',text:'"Rispondo a 200 messaggi al giorno in automatico. Incredibile."'},
              {avatar:'🎨',name:'Martina G.',role:'Stilista',text:'"Logo bellissimo e professionale consegnato in 48 ore precise."'},
            ].map((r,i) => (
              <div key={r.name} style={{background:'#000',padding:'28px',borderRight:i%3<2?'1px solid rgba(255,255,255,0.07)':'none'}}>
                <div style={{color:'#c9a96e',fontSize:'12px',letterSpacing:'3px',marginBottom:'14px'}}>★★★★★</div>
                <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.55)',lineHeight:1.7,fontStyle:'italic',marginBottom:'18px'}}>{r.text}</p>
                <div style={{display:'flex',alignItems:'center',gap:'10px',borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:'16px'}}>
                  <div style={{width:'34px',height:'34px',borderRadius:'50%',background:'rgba(201,169,110,0.08)',border:'1px solid rgba(201,169,110,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>{r.avatar}</div>
                  <div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{r.name}</div>
                    <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)'}}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINALE ══ */}
      <section style={{minHeight:'60vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',gap:'32px'}}>
        <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(60px,10vw,120px)',fontWeight:700,lineHeight:0.88,letterSpacing:'-0.05em',color:'#fff'}}>
          Inizia<br/><em className="gold" style={{fontStyle:'italic'}}>oggi.</em>
        </h2>
        <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>
          Rimborso 7 giorni · Nessun abbonamento · Tutto digitale
        </p>
        <Link href="/categoria/siti-web" className="g-btn g-btn-gold" style={{borderRadius:'100px',fontSize:'16px',padding:'16px 40px'}}>
          Scopri i servizi <ArrowRight size={17}/>
        </Link>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"Store",
        "name":"GabryShop","description":"Servizi digitali professionali",
        "url":"https://gabryshop-digitale.vercel.app",
        "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"32","bestRating":"5"},
        "offers":{"@type":"AggregateOffer","priceCurrency":"EUR","lowPrice":"10","highPrice":"40","offerCount":"35"}
      })}}/>

    </main>
  )
}
