import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import ParticlesHero from '@/components/ui/ParticlesHero'

export default function Home() {
  const featured = PRODUCTS.filter(p => p.is_bestseller).slice(0, 3)

  return (
    <main style={{background:'#000',color:'#fff',overflowX:'hidden'}}>

      {/* ══ SEZIONE 1 — HERO (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'120px 6% 80px',position:'relative',background:'#000',textAlign:'center'}}>
        <ParticlesHero />
        <div style={{position:'absolute',top:'15%',left:'50%',transform:'translateX(-50%)',width:'600px',height:'400px',background:'radial-gradient(ellipse,rgba(77,217,192,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',gap:'28px',maxWidth:'900px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',background:'rgba(77,217,192,0.06)',border:'1px solid rgba(77,217,192,0.2)',borderRadius:'100px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4dd9c0'}}/>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:600,color:'#4dd9c0',letterSpacing:'0.15em',textTransform:'uppercase'}}>GabryShop · Est. 2024</span>
          </div>

          <h1 className="hero-parallax" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(56px,9vw,110px)',fontWeight:700,lineHeight:0.9,letterSpacing:'-0.04em',color:'#fff'}}>
            Il tuo business<br/>
            <em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>merita di più.</em>
          </h1>

          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'17px',color:'rgba(255,255,255,0.4)',maxWidth:'400px',lineHeight:1.7}}>
            Siti web, menu QR, automazioni e loghi professionali.<br/>Consegnati in 24–48 ore.
          </p>

          <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
            <Link href="/categoria/ristorazione" className="g-btn" style={{borderRadius:'100px',fontSize:'15px',padding:'14px 32px',background:'#fff',color:'#000',fontWeight:700,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px'}}>
              Scopri i servizi <ArrowRight size={16}/>
            </Link>
            <Link href="/chi-siamo" className="g-btn g-btn-ghost" style={{borderRadius:'100px',fontSize:'15px',padding:'14px 32px'}}>
              Chi siamo
            </Link>
          </div>
        </div>

        {/* Freccia scroll */}
        <div style={{position:'absolute',bottom:'40px',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',opacity:0.35}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#fff'}}>Scorri</span>
          <ArrowDown size={16} style={{color:'#fff',animation:'bounce 2s ease-in-out infinite'}}/>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}`}</style>
      </section>

      {/* ══ SEZIONE 2 — STATS (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',borderTop:'1px solid rgba(255,255,255,0.06)',padding:'80px 6%',gap:'80px'}}>
        <div style={{textAlign:'center'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'16px'}}>I numeri parlano</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff'}}>
            Risultati<br/><em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>concreti.</em>
          </h2>
        </div>

        <div className="stats-grid-wrap" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'20px',overflow:'hidden',width:'100%',maxWidth:'800px'}}>
          {[
            {n:'+32',l:'Clienti soddisfatti',counter:'32',prefix:'+',desc:'Professionisti e aziende che ci hanno scelto'},
            {n:'98%',l:'Soddisfazione',counter:'98',suffix:'%',desc:'Valutazione media dei nostri clienti'},
            {n:'24h',l:'Consegna media',counter:'24',suffix:'h',desc:'Dal briefing al prodotto finito'},
          ].map((s,i) => (
            <div key={s.l} style={{padding:'48px 32px',textAlign:'center',background:'#000',borderRight:i<2?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <div data-counter={s.counter} data-counter-suffix={s.suffix||''} data-counter-prefix={s.prefix||''} style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(52px,6vw,80px)',fontWeight:700,letterSpacing:'-0.05em',lineHeight:1,color:'#fff',marginBottom:'12px'}}>{s.n}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',fontWeight:600,color:'#4dd9c0',marginBottom:'8px',letterSpacing:'0.05em'}}>{s.l}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.25)',lineHeight:1.5}}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'40px',flexWrap:'wrap',justifyContent:'center'}}>
          {['🔒 Pagamento sicuro','⚡ Consegna 24-48h','✅ Rimborso 7 giorni','🎁 Coupon GABRY10'].map(t => (
            <span key={t} style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.05em'}}>{t}</span>
          ))}
        </div>
      </section>

      {/* ══ SEZIONE 3 — IPHONE (100vh) ══ */}
      <section className='iphone-section-wrap' style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 6%',gap:'80px',flexWrap:'wrap',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:'380px'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'#4dd9c0',display:'block',marginBottom:'20px'}}>Il tuo shop, ovunque</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,5vw,64px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff',marginBottom:'24px'}}>
            Acquista dal<br/>telefono.<br/><em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>In secondi.</em>
          </h2>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'15px',color:'rgba(255,255,255,0.4)',lineHeight:1.75,marginBottom:'32px'}}>
            35 prodotti ottimizzati per mobile. Pagamento con PayPal o carta. Conferma via email in 1 minuto.
          </p>
          <Link href="/categoria/ristorazione" className="g-btn g-btn-ghost" style={{borderRadius:'100px',fontSize:'14px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px'}}>
            Esplora il catalogo <ArrowRight size={14}/>
          </Link>
        </div>

        {/* iPhone */}
        <div style={{width:'240px',height:'480px',background:'linear-gradient(145deg,#1c1c1e,#2c2c2e)',borderRadius:'46px',border:'8px solid #3a3a3c',position:'relative',overflow:'hidden',flexShrink:0,boxShadow:'0 50px 100px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.06)',transform:'rotate(-2deg)'}}>
          <div style={{width:'90px',height:'24px',background:'#000',borderRadius:'0 0 16px 16px',position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',zIndex:2}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(160deg,#05050a,#0d0d1f)',padding:'40px 14px 20px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'2px'}}>GabryShop</div>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'18px',fontWeight:800,color:'#fff',marginBottom:'6px'}}>
              <span style={{color:'#4dd9c0'}}>Gabry</span>Shop
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
                    <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'12px',fontWeight:700,color:'#4dd9c0'}}>{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'linear-gradient(135deg,#4dd9c0,#1a9e88)',color:'#000',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:800,borderRadius:'100px',padding:'8px',textAlign:'center',marginTop:'4px'}}>
              Acquista ora →
            </div>
          </div>
        </div>
      </section>

      {/* ══ SEZIONE 4 — CATEGORIE (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',gap:'64px'}}>
        <div style={{textAlign:'center'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'16px'}}>Cosa offriamo</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,5vw,64px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff'}}>
            10 categorie.<br/><em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>30+ prodotti.</em>
          </h2>
        </div>

        <div className="cats-grid-wrap" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden',width:'100%',maxWidth:'1200px'}}>
          {[
            {icon:'🍽️',name:'Ristorazione',price:'da €13',time:'Da 24h',slug:'ristorazione',desc:'Ristoranti, bar, pizzerie e locali',img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70'},
            {icon:'🎉',name:'Locali & Discoteche',price:'da €11',time:'Da 24h',slug:'locali',desc:'Discoteche, club ed eventi',img:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=70'},
            {icon:'💈',name:'Bellezza & Cura',price:'da €9',time:'Da 24h',slug:'bellezza',desc:'Parrucchieri, estetiste e spa',img:'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=70'},
            {icon:'🏋️',name:'Sport & Fitness',price:'da €18',time:'Da 48h',slug:'sport',desc:'Palestre, PT e centri sportivi',img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=70'},
            {icon:'🏠',name:'Artigiani & Casa',price:'da €9',time:'Da 24h',slug:'artigiani',desc:'Idraulici, elettricisti, muratori',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70'},
            {icon:'⚖️',name:'Professionisti',price:'da €22',time:'Da 48h',slug:'professionisti',desc:'Avvocati, medici, commercialisti',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70'},
            {icon:'🛍️',name:'Negozi & Retail',price:'da €9',time:'Da 24h',slug:'negozi',desc:'E-commerce, boutique e negozi',img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=70'},
            {icon:'🤖',name:'Auto Risponditore',price:'da €18',time:'Da 48h',slug:'automazioni',desc:'WhatsApp bot, Instagram, email',img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=70'},
            {icon:'📊',name:'Strumenti Business',price:'da €9',time:'Immediato',slug:'business',desc:'Excel, CRM, fatturazione',img:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=70'},
            {icon:'🎨',name:'Creatività',price:'da €12',time:'Da 24h',slug:'creativita',desc:'Logo, video, social kit',img:'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=70'},
          ].map((cat,i) => (
            <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="cat-grid-item" style={{position:'relative',overflow:'hidden',textDecoration:'none',borderRight:i%5<4?'1px solid rgba(255,255,255,0.07)':'none',borderBottom:i<5?'1px solid rgba(255,255,255,0.07)':'none',minHeight:'180px',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
              <img src={cat.img} alt={cat.name} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.3)',transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1)',}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.3) 60%,transparent 100%)'}}/>
              <div style={{position:'relative',zIndex:2,padding:'28px',display:'flex',flexDirection:'column',gap:'6px'}}>
                <div style={{fontSize:'24px',marginBottom:'4px'}}>{cat.icon}</div>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'22px',fontWeight:700,color:'#fff',letterSpacing:'-0.02em'}}>{cat.name}</div>
                <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.45)',lineHeight:1.5,marginBottom:'8px'}}>{cat.desc}</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'#4dd9c0',fontWeight:600}}>{cat.price}</span>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.3)'}}>⚡ {cat.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ SEZIONE 5 — PRODOTTI (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',gap:'64px'}}>
        <div style={{textAlign:'center'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'16px'}}>Più venduti</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,5vw,64px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff',marginBottom:'24px'}}>
            I più <em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>popolari</em>
          </h2>
          <Link href="/categoria/ristorazione" className="g-btn g-btn-ghost" style={{borderRadius:'100px',display:'inline-flex',fontSize:'14px',textDecoration:'none',alignItems:'center',gap:'8px'}}>
            Tutto il catalogo <ArrowRight size={14}/>
          </Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',width:'100%',maxWidth:'1100px'}}>
          {featured.map((p,i) => (
            <div key={p.id} className="sr" style={{transitionDelay:`${i*100}ms`}}>
              <ProductCard product={{...p,category:CATEGORIES.find(c=>c.id===p.category_id)}} delay={i*80}/>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SEZIONE 6 — TESTO CINEMATOGRAFICO (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',textAlign:'center',gap:'32px'}}>
        <h2 className="sr" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(44px,7vw,92px)',fontWeight:700,lineHeight:0.9,letterSpacing:'-0.04em',color:'#fff',maxWidth:'780px'}}>
          Ogni giorno senza<br/>
          <em style={{fontStyle:'italic',color:'rgba(255,255,255,0.15)'}}>presenza</em> digitale<br/>
          è un'opportunità<br/>
          <em style={{fontStyle:'italic',color:'rgba(255,255,255,0.15)'}}>persa.</em>
        </h2>
        <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)',letterSpacing:'0.2em',textTransform:'uppercase'}}>
          Prezzi da €7 · Consegna in 24h · Pagamento sicuro
        </p>
      </section>

      {/* ══ SEZIONE 7 — RECENSIONI (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',gap:'64px'}}>
        <div style={{textAlign:'center'}}>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',display:'block',marginBottom:'16px'}}>Testimonianze</span>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,5vw,64px)',fontWeight:700,lineHeight:0.92,letterSpacing:'-0.04em',color:'#fff'}}>
            Cosa dicono<br/><em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>i clienti</em>
          </h2>
        </div>
        <div className="reviews-grid-wrap" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden',width:'100%',maxWidth:'1100px'}}>
          {[
            {avatar:'🍕',name:'Marco B.',role:'Pizzeria',text:'Il menu digitale era pronto in meno di 24 ore. I clienti lo usano ogni giorno e gli errori negli ordini sono quasi spariti.'},
            {avatar:'🎨',name:'Sara L.',role:'Designer',text:'Avevo bisogno di un portfolio veloce e professionale. In 48 ore era online, e già la settimana dopo ho ricevuto 3 contatti nuovi.'},
            {avatar:'🏢',name:'Agenzia Meridian',role:'Marketing',text:'Ho preso il chatbot WhatsApp per il locale. Ora risponde da solo alle domande più comuni e io non devo stare sempre al telefono.'},
            {avatar:'✂️',name:'Laura E.',role:'Parrucchiera',text:'Dal giorno che ho messo le prenotazioni online, il telefono squilla molto meno. I clienti prenotano da soli, comodissimo.'},
            {avatar:'💪',name:'Matteo G.',role:'Personal Trainer',text:'Gestivo tutto a mano, ci mettevo ore. Adesso il bot risponde ai messaggi in automatico e io mi concentro sugli allenamenti.'},
            {avatar:'🎨',name:'Martina G.',role:'Stilista',text:'Avevo bisogno di un logo serio per la mia attività. Me lo hanno consegnato in due giorni, con varianti e tutto. Molto soddisfatta.'},
          ].map((r,i) => (
            <div key={r.name} style={{background:'#000',padding:'32px 28px',borderRight:i%3<2?'1px solid rgba(255,255,255,0.07)':'none',borderBottom:i<3?'1px solid rgba(255,255,255,0.07)':'none'}}>
              <div style={{color:'#4dd9c0',fontSize:'13px',letterSpacing:'3px',marginBottom:'16px'}}>★★★★★</div>
              <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.55)',lineHeight:1.75,fontStyle:'normal',marginBottom:'20px'}}>{r.text}</p>
              <div style={{display:'flex',alignItems:'center',gap:'10px',borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:'16px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'rgba(77,217,192,0.08)',border:'1px solid rgba(77,217,192,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>{r.avatar}</div>
                <div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{r.name}</div>
                  <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)'}}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SEZIONE 8 — CTA FINALE (100vh) ══ */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'80px 6%',borderTop:'1px solid rgba(255,255,255,0.06)',gap:'36px',position:'relative'}}>
        <div style={{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:'500px',height:'300px',background:'radial-gradient(ellipse,rgba(77,217,192,0.05) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',gap:'32px'}}>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(64px,10vw,120px)',fontWeight:700,lineHeight:0.88,letterSpacing:'-0.05em',color:'#fff'}}>
            Inizia<br/><em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>oggi.</em>
          </h2>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>
            Rimborso 7 giorni · Nessun abbonamento · Tutto digitale
          </p>
          <Link href="/categoria/ristorazione" style={{padding:'16px 40px',background:'#fff',color:'#000',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'16px',fontWeight:800,borderRadius:'100px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'10px',letterSpacing:'-0.01em'}}>
            Scopri i servizi <ArrowRight size={18}/>
          </Link>
          <div style={{display:'flex',gap:'32px',flexWrap:'wrap',justifyContent:'center',marginTop:'8px'}}>
            {['🔒 SSL Sicuro','💳 PayPal','⭐ +32 clienti','⚡ 24h consegna'].map(t => (
              <span key={t} style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.2)'}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"Store",
        "name":"GabryShop","url":"https://gabryshop-digitale.vercel.app",
        "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"32"},
        "offers":{"@type":"AggregateOffer","priceCurrency":"EUR","lowPrice":"7","highPrice":"29","offerCount":"35"}
      })}}/>

    </main>
  )
}
