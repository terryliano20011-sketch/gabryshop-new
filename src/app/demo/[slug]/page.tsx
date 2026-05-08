import Link from 'next/link'
import { notFound } from 'next/navigation'

const DEMOS: Record<string, {
  name: string; icon: string; color: string;
  headline: string; sub: string;
  mockup: { type: string; content: any };
  features: string[];
  products: { name: string; price: string; time: string }[];
}> = {
  ristorazione: {
    name:'Ristorazione', icon:'🍽️', color:'#f59e0b',
    headline:'Menu QR & Sito Ristorante', sub:'Tutto ciò che serve per portare il tuo locale online in 24 ore',
    mockup: { type:'menu', content: {
      name:'Ristorante Da Mario',
      sections:['Antipasti','Primi','Secondi','Pizze','Dolci','Bevande'],
      items:[
        {name:'Bruschetta al pomodoro',price:'€6',cat:'Antipasti'},
        {name:'Spaghetti alla carbonara',price:'€12',cat:'Primi'},
        {name:'Pizza Margherita',price:'€8',cat:'Pizze'},
        {name:'Tiramisù',price:'€5',cat:'Dolci'},
      ]
    }},
    features:['Menu QR aggiornabile','Foto piatti incluse','Prenotazioni online','Allergenici','Multilingua','Google Maps'],
    products:[{name:'Menu QR Digitale',price:'€13',time:'24h'},{name:'Sito Ristorante',price:'€24',time:'48h'},{name:'Bot Prenotazioni',price:'€22',time:'48h'}]
  },
  locali: {
    name:'Locali & Discoteche', icon:'🎉', color:'#8b5cf6',
    headline:'Sito Locale + Lista VIP', sub:'Gestisci eventi, ingressi e comunicazioni dal tuo smartphone',
    mockup: { type:'event', content: {
      name:'Club Neon',
      events:[
        {title:'Venerdì Latino',date:'Ven 9 Mag',dj:'DJ Marco'},
        {title:'Saturday Night',date:'Sab 10 Mag',dj:'DJ Steve'},
        {title:'Special Guest',date:'Sab 17 Mag',dj:'TBA'},
      ]
    }},
    features:['Calendario eventi','Lineup DJ','Lista VIP Telegram','Drink list QR','Acquisto biglietti','Galleria foto'],
    products:[{name:'Sito Discoteca',price:'€28',time:'48h'},{name:'Locandina Evento',price:'€12',time:'24h'},{name:'Bot Lista VIP',price:'€25',time:'48h'}]
  },
  bellezza: {
    name:'Bellezza & Cura', icon:'💈', color:'#ec4899',
    headline:'Sito + Prenotazioni Online', sub:'I clienti prenotano da soli, tu ricevi solo la conferma',
    mockup: { type:'booking', content: {
      name:'Salone Elegance',
      services:['Taglio donna €25','Piega €20','Colorazione €45','Trattamento €35','Manicure €18'],
    }},
    features:['Prenotazioni online','Listino servizi','Galleria lavori','Reminder automatici','Google Maps','Recensioni clienti'],
    products:[{name:'Sito Parrucchiere',price:'€19',time:'24h'},{name:'App Prenotazioni',price:'€25',time:'3-5gg'},{name:'Sito Spa/Estetica',price:'€22',time:'48h'}]
  },
  sport: {
    name:'Sport & Fitness', icon:'🏋️', color:'#10b981',
    headline:'Sito Palestra + Bot Lezioni', sub:'Gestisci corsi, iscrizioni e prenotazioni automaticamente',
    mockup: { type:'schedule', content: {
      name:'FitLife Gym',
      schedule:[
        {day:'Lunedì',classes:['Yoga 9:00','Pilates 18:00','CrossFit 20:00']},
        {day:'Martedì',classes:['Spinning 7:30','Zumba 19:00','Box 21:00']},
        {day:'Mercoledì',classes:['Yoga 9:00','TRX 18:30','CrossFit 20:00']},
      ]
    }},
    features:['Orari corsi','Prenotazione lezioni','Abbonamenti online','Scheda istruttori','Iscrizione digitale','Notifiche automatiche'],
    products:[{name:'Sito Palestra',price:'€22',time:'48h'},{name:'Bot Prenotazioni',price:'€20',time:'48h'},{name:'Sito Personal Trainer',price:'€18',time:'24h'}]
  },
  artigiani: {
    name:'Artigiani & Casa', icon:'🏠', color:'#f97316',
    headline:'Sito + Preventivi Automatici', sub:'I clienti ti trovano su Google e richiedono preventivi via WhatsApp',
    mockup: { type:'business', content: {
      name:'Idraulico Bianchi',
      services:['Riparazione perdite','Installazione caldaie','Manutenzione impianti','Pronto intervento'],
      zones:['Milano','Monza','Sesto S.G.','Cinisello']
    }},
    features:['Sito professionale','Form preventivi','Zone coperte','Bot WhatsApp','Biglietto digitale','Google Maps'],
    products:[{name:'Sito Artigiano',price:'€17',time:'24h'},{name:'Bot Preventivi',price:'€22',time:'48h'},{name:'Biglietto Digitale',price:'€9',time:'24h'}]
  },
  professionisti: {
    name:'Professionisti', icon:'⚖️', color:'#6366f1',
    headline:'Sito Studio Professionale', sub:'Un sito autorevole che ispira fiducia nei tuoi clienti',
    mockup: { type:'studio', content: {
      name:'Studio Legale Ferrari',
      areas:['Diritto civile','Diritto penale','Diritto del lavoro','Diritto societario'],
      team:['Avv. Marco Ferrari','Avv. Laura Rossi']
    }},
    features:['Design istituzionale','Aree di pratica','Team e bio','Form consultazione','Privacy GDPR','Certificazioni'],
    products:[{name:'Sito Avvocato',price:'€25',time:'48h'},{name:'Sito Commercialista',price:'€22',time:'48h'},{name:'Sito Medico',price:'€24',time:'48h'}]
  },
  negozi: {
    name:'Negozi & Retail', icon:'🛍️', color:'#c9a96e',
    headline:'E-commerce + Listino Digitale', sub:'Vendi online e gestisci il tuo negozio digitalmente',
    mockup: { type:'shop', content: {
      name:'Boutique Moda Chic',
      categories:['Donna','Uomo','Accessori','Nuovi arrivi'],
      items:[
        {name:'Vestito estivo',price:'€45',badge:'Nuovo'},
        {name:'Borsa in pelle',price:'€89',badge:''},
        {name:'Occhiali da sole',price:'€35',badge:'Sale'},
      ]
    }},
    features:['Catalogo prodotti','Pagamento online','Gestione ordini','Listino QR','Sito moda','WhatsApp order'],
    products:[{name:'E-commerce',price:'€29',time:'3-5gg'},{name:'Sito Boutique',price:'€22',time:'48h'},{name:'Listino Digitale',price:'€9',time:'24h'}]
  },
  automazioni: {
    name:'Auto Risponditore', icon:'💬', color:'#4dd9c0',
    headline:'Bot WhatsApp + Instagram', sub:'Rispondi a centinaia di messaggi al giorno in automatico',
    mockup: { type:'chat', content: {
      name:'Bot GabryShop',
      messages:[
        {from:'cliente',text:'Ciao, avete disponibilità per sabato?'},
        {from:'bot',text:'Ciao! 👋 Certo! Abbiamo disponibilità sabato. Per che ora preferisci? Mattina (9-13) o pomeriggio (14-19)?'},
        {from:'cliente',text:'Pomeriggio verso le 16'},
        {from:'bot',text:'Perfetto! ✅ Ho prenotato per sabato alle 16:00. Ti invio la conferma via email. Hai altre domande?'},
      ]
    }},
    features:['Risposte automatiche 24/7','Gestione prenotazioni','FAQ automatiche','Raccolta lead','Notifica admin','Statistiche'],
    products:[{name:'Bot WhatsApp',price:'€25',time:'48h'},{name:'Bot Instagram',price:'€20',time:'48h'},{name:'Bot Telegram',price:'€22',time:'48h'}]
  },
  business: {
    name:'Strumenti Business', icon:'📊', color:'#3b82f6',
    headline:'Excel CRM + Dashboard', sub:'Gestisci clienti, fatture e performance in un solo file',
    mockup: { type:'dashboard', content: {
      name:'Dashboard Business',
      kpis:[
        {label:'Clienti attivi',value:'47',trend:'+12%'},
        {label:'Fatturato mese',value:'€8.4k',trend:'+8%'},
        {label:'Ordini aperti',value:'13',trend:'-3'},
      ],
      months:['Gen','Feb','Mar','Apr','Mag']
    }},
    features:['CRM clienti','Dashboard KPI','Fatturazione auto','Gestione inventario','Report mensile','Export PDF'],
    products:[{name:'CRM Excel',price:'€13',time:'immediato'},{name:'Dashboard Business',price:'€14',time:'immediato'},{name:'Inventario Excel',price:'€9',time:'immediato'}]
  },
  creativita: {
    name:'Creatività', icon:'🎨', color:'#e879f9',
    headline:'Logo + Social Kit + Video', sub:'Il tuo brand professionale pronto in 48 ore',
    mockup: { type:'brand', content: {
      name:'Brand Identity',
      colors:['#4dd9c0','#0d1f2d','#ffffff','#f97316'],
      fonts:['Cormorant Garamond','Outfit'],
      deliverables:['Logo principale','Logo variante chiara','Logo icona','Guida colori','Font ufficiali']
    }},
    features:['Logo 3 varianti','File SVG/PNG/PDF','Palette colori','Social media kit','Video promo','Locandine'],
    products:[{name:'Logo & Brand',price:'€25',time:'48h'},{name:'Social Media Kit',price:'€18',time:'24h'},{name:'Video Promo',price:'€28',time:'48h'}]
  },
}

export default function DemoSlugPage({ params }: { params: { slug: string } }) {
  const demo = DEMOS[params.slug]
  if (!demo) notFound()

  const renderMockup = () => {
    const { type, content } = demo.mockup

    if (type === 'menu') return (
      <div style={{background:'#0d0d18',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{background:`linear-gradient(135deg,${demo.color}22,#0d0d18)`,padding:'24px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontSize:'22px',marginBottom:'4px'}}>🍽️</div>
          <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'24px',fontWeight:700}}>{content.name}</div>
          <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.55)',fontSize:'12px',marginTop:'4px'}}>Menu digitale · Scansiona il QR</div>
        </div>
        <div style={{padding:'20px',display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'8px'}}>
          {content.sections.map((s: string) => (
            <span key={s} style={{padding:'4px 12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'100px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(200,200,220,0.7)'}}>{s}</span>
          ))}
        </div>
        {content.items.map((item: any) => (
          <div key={item.name} style={{padding:'12px 20px',borderTop:'1px solid rgba(255,255,255,0.04)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'14px',fontWeight:500}}>{item.name}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.5)',fontSize:'11px'}}>{item.cat}</div>
            </div>
            <div style={{fontFamily:'Cormorant Garamond,serif',color:demo.color,fontSize:'18px',fontWeight:700}}>{item.price}</div>
          </div>
        ))}
      </div>
    )

    if (type === 'chat') return (
      <div style={{background:'#0d0d18',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{background:'#1a1a2e',padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'36px',height:'36px',borderRadius:'50%',background:`linear-gradient(135deg,${demo.color},#4dd9c0)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🤖</div>
          <div>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'14px',fontWeight:600}}>{content.name}</div>
            <div style={{display:'flex',alignItems:'center',gap:'5px'}}><div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4ade80'}}/><span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(150,150,185,0.6)'}}>Online</span></div>
          </div>
        </div>
        <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
          {content.messages.map((m: any, i: number) => (
            <div key={i} style={{display:'flex',justifyContent:m.from==='cliente'?'flex-end':'flex-start'}}>
              <div style={{maxWidth:'80%',padding:'10px 14px',borderRadius:m.from==='cliente'?'16px 16px 4px 16px':'16px 16px 16px 4px',background:m.from==='cliente'?`${demo.color}33`:'rgba(255,255,255,0.05)',border:`1px solid ${m.from==='cliente'?`${demo.color}44`:'rgba(255,255,255,0.07)'}`,fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(210,210,230,0.9)',lineHeight:1.5}}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    )

    if (type === 'schedule') return (
      <div style={{background:'#0d0d18',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{background:`linear-gradient(135deg,${demo.color}22,#0d0d18)`,padding:'20px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'22px',fontWeight:700}}>{content.name}</div>
          <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.55)',fontSize:'12px'}}>Orario corsi settimanale</div>
        </div>
        {content.schedule.map((day: any) => (
          <div key={day.day} style={{padding:'14px 20px',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:demo.color,fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'8px'}}>{day.day}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
              {day.classes.map((c: string) => (
                <span key={c} style={{padding:'4px 10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'rgba(200,200,220,0.75)'}}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    )

    if (type === 'event') return (
      <div style={{background:'#0d0d18',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{background:`linear-gradient(135deg,${demo.color}22,#0d0d18)`,padding:'20px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'22px',fontWeight:700}}>{content.name}</div>
          <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.55)',fontSize:'12px'}}>Prossimi eventi</div>
        </div>
        {content.events.map((ev: any) => (
          <div key={ev.title} style={{padding:'16px 20px',borderTop:'1px solid rgba(255,255,255,0.04)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'15px',fontWeight:600}}>{ev.title}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.5)',fontSize:'12px'}}>🎧 {ev.dj}</div>
            </div>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:demo.color,fontWeight:700,background:`${demo.color}22`,padding:'5px 12px',borderRadius:'100px',border:`1px solid ${demo.color}44`}}>{ev.date}</div>
          </div>
        ))}
      </div>
    )

    if (type === 'dashboard') return (
      <div style={{background:'#0d0d18',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{background:`linear-gradient(135deg,${demo.color}22,#0d0d18)`,padding:'20px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'22px',fontWeight:700}}>{content.name}</div>
        </div>
        <div style={{padding:'20px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginBottom:'16px'}}>
          {content.kpis.map((k: any) => (
            <div key={k.label} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'14px',textAlign:'center'}}>
              <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'22px',fontWeight:700}}>{k.value}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.5)',fontSize:'10px',marginTop:'2px'}}>{k.label}</div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:demo.color,fontSize:'11px',fontWeight:700,marginTop:'4px'}}>{k.trend}</div>
            </div>
          ))}
        </div>
        <div style={{padding:'0 20px 20px'}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'16px'}}>
            <div style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.5)',fontSize:'11px',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Fatturato mensile</div>
            <div style={{display:'flex',alignItems:'flex-end',gap:'8px',height:'60px'}}>
              {[40,65,45,80,100].map((h,i) => (
                <div key={i} style={{flex:1,background:`linear-gradient(to top,${demo.color},${demo.color}44)`,borderRadius:'4px 4px 0 0',height:`${h}%`,display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:'4px'}}>
                  <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'9px',color:'rgba(255,255,255,0.5)'}}>{content.months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )

    // Generic fallback for booking, studio, shop, brand
    return (
      <div style={{background:'#0d0d18',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{background:`linear-gradient(135deg,${demo.color}22,#0d0d18)`,padding:'24px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontSize:'32px',marginBottom:'8px'}}>{demo.icon}</div>
          <div style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'22px',fontWeight:700}}>{content.name}</div>
        </div>
        <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'10px'}}>
          {(content.services || content.areas || content.categories || content.deliverables || content.zones || content.classes || []).map((item: string) => (
            <div key={item} style={{padding:'12px 16px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:demo.color,flexShrink:0}}/>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(200,200,220,0.8)',fontSize:'14px'}}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#000',paddingTop:'120px',paddingBottom:'100px'}}>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'0 6%'}}>

        <Link href="/demo" style={{display:'inline-flex',alignItems:'center',gap:'8px',color:'rgba(120,120,155,0.6)',textDecoration:'none',fontSize:'13px',fontFamily:'Outfit,system-ui,sans-serif',marginBottom:'40px'}}>
          ← Tutte le demo
        </Link>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start'}}>

          {/* Left - Info */}
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',background:`${demo.color}18`,border:`1px solid ${demo.color}44`,borderRadius:'100px',marginBottom:'20px'}}>
              <span style={{fontSize:'16px'}}>{demo.icon}</span>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:demo.color}}>{demo.name}</span>
            </div>
            <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:'14px'}}>{demo.headline}</h1>
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(150,150,185,0.6)',fontSize:'14px',lineHeight:1.7,marginBottom:'28px'}}>{demo.sub}</p>

            <div style={{marginBottom:'28px'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(120,120,155,0.5)',marginBottom:'12px'}}>Cosa include</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {demo.features.map(f => (
                  <div key={f} style={{display:'flex',alignItems:'center',gap:'8px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(180,180,210,0.75)'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:demo.color,flexShrink:0}}/>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div style={{marginBottom:'28px'}}>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(120,120,155,0.5)',marginBottom:'12px'}}>Prodotti disponibili</div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {demo.products.map(p => (
                  <Link key={p.name} href={`/categoria/${params.slug}`} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',textDecoration:'none',transition:'all 0.2s'}}>
                    <span style={{fontFamily:'Outfit,system-ui,sans-serif',color:'white',fontSize:'13px',fontWeight:500}}>{p.name}</span>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(150,150,185,0.4)'}}>⚡ {p.time}</span>
                      <span style={{fontFamily:'Cormorant Garamond,serif',color:demo.color,fontSize:'18px',fontWeight:700}}>{p.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href={`/categoria/${params.slug}`} style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',background:`linear-gradient(135deg,${demo.color},${demo.color}cc)`,color:'#08060a',borderRadius:'100px',textDecoration:'none',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:700}}>
              Acquista ora →
            </Link>
          </div>

          {/* Right - Mockup */}
          <div style={{position:'sticky',top:'100px'}}>
            <div style={{marginBottom:'12px',display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#4ade80'}}/>
              <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(120,120,155,0.5)',letterSpacing:'0.1em',textTransform:'uppercase'}}>Anteprima live</span>
            </div>
            {renderMockup()}
          </div>

        </div>
      </div>
    </div>
  )
}
