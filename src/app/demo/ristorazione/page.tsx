import Link from 'next/link'

const MENU_SECTIONS = [
  {
    title:'Antipasti', items:[
      {name:'Bruschetta al pomodoro e basilico',desc:'Pane tostato, pomodoro fresco, aglio, basilico DOP, olio EVO',price:'€8',badge:''},
      {name:'Carpaccio di manzo',desc:'Manzo scottona, rucola selvatica, grana padano 24 mesi, limone',price:'€14',badge:'Chef consiglia'},
      {name:'Tagliere di salumi e formaggi',desc:'Selezione di salumi artigianali, formaggi stagionati, miele, confettura di fichi',price:'€18',badge:''},
      {name:'Burrata pugliese',desc:'Burrata fresca, pomodorini confit, pesto basilico, aceto balsamico IGP',price:'€12',badge:'Vegetariano'},
    ]
  },
  {
    title:'Primi Piatti', items:[
      {name:'Spaghetti alla carbonara',desc:'Spaghettoni artigianali, guanciale croccante, pecorino romano DOP, uovo fresco',price:'€16',badge:'Classico'},
      {name:'Risotto ai funghi porcini',desc:'Riso Carnaroli, porcini freschi, parmigiano 30 mesi, burro di malga',price:'€18',badge:'Stagionale'},
      {name:'Tagliatelle al ragù bolognese',desc:'Tagliatelle all\'uovo fatte in casa, ragù di carni miste cotto 4h',price:'€15',badge:''},
      {name:'Gnocchi al pomodoro e basilico',desc:'Gnocchi di patate fatti in casa, San Marzano DOP, basilico',price:'€13',badge:'Vegetariano'},
    ]
  },
  {
    title:'Secondi', items:[
      {name:'Filetto di manzo al pepe verde',desc:'Filetto di fassona piemontese, salsa al pepe verde, patate arrostite',price:'€28',badge:'Top'},
      {name:'Branzino al forno',desc:'Branzino intero al forno con patate, pomodorini, olive e capperi',price:'€24',badge:''},
      {name:'Pollo alla cacciatora',desc:'Pollo ruspante, olive, capperi, pomodoro, rosmarino, vino bianco',price:'€18',badge:''},
    ]
  },
  {
    title:'Pizze', items:[
      {name:'Margherita',desc:'Pomodoro San Marzano, fior di latte, basilico, olio EVO · Impasto 48h lievitazione naturale',price:'€10',badge:''},
      {name:'Diavola',desc:'Pomodoro, fior di latte, salame piccante calabrese, peperoncino',price:'€13',badge:'🌶️ Piccante'},
      {name:'Bufala e Prosciutto',desc:'Pomodoro, mozzarella di bufala DOP, prosciutto crudo 24 mesi, rucola, grana',price:'€17',badge:'Più venduta'},
      {name:'Quattro Formaggi',desc:'Mozzarella, gorgonzola, taleggio, parmigiano, noci',price:'€15',badge:'Vegetariano'},
    ]
  },
  {
    title:'Dolci', items:[
      {name:'Tiramisù della nonna',desc:'Savoiardi, mascarpone, caffè espresso, cacao amaro — ricetta originale',price:'€7',badge:'Fatto in casa'},
      {name:'Panna cotta ai frutti di bosco',desc:'Panna cotta alla vaniglia del Madagascar, coulis di frutti di bosco',price:'€7',badge:''},
      {name:'Cannolo siciliano',desc:'Scorza fritta, ricotta di pecora, cioccolato, pistacchio di Bronte',price:'€6',badge:''},
    ]
  },
]

export default function DemoRistorazione() {
  return (
    <div style={{minHeight:'100vh',background:'#0a0605',color:'#fff'}}>
      {/* Back link */}
      <div style={{padding:'16px 5%',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <Link href="/demo" style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.3)',textDecoration:'none',letterSpacing:'0.05em'}}>← Torna alle demo</Link>
        <span style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(201,160,80,0.5)',float:'right',letterSpacing:'0.1em'}}>DEMO · Ristorante Da Mario</span>
      </div>

      {/* Header */}
      <div style={{background:'linear-gradient(160deg,#1a0a00,#2d1500)',padding:'56px 5%',textAlign:'center',borderBottom:'1px solid rgba(201,160,80,0.15)'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.3em',color:'rgba(201,160,80,0.6)',textTransform:'uppercase',marginBottom:'14px',fontFamily:'system-ui,sans-serif'}}>Cucina Tradizionale Italiana · Dal 1987</div>
        <h1 style={{fontFamily:'Georgia,serif',fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:400,color:'#fff',letterSpacing:'0.05em',marginBottom:'0'}}>Ristorante Da Mario</h1>
        <div style={{width:'60px',height:'1px',background:'linear-gradient(90deg,transparent,#c9a050,transparent)',margin:'20px auto'}}/>
        <p style={{fontFamily:'system-ui,sans-serif',color:'rgba(255,255,255,0.4)',fontSize:'13px',letterSpacing:'0.05em',marginBottom:'20px'}}>Via Roma 14, Milano · 📞 02 1234567 · Aperto 12:00–15:00 / 19:00–23:00</p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          {['🌟 Consigliato Gambero Rosso','🍷 Carta vini selezionata','✅ Allergenici disponibili','🅿️ Parcheggio gratuito'].map(t=>(
            <span key={t} style={{padding:'5px 14px',background:'rgba(201,160,80,0.08)',border:'1px solid rgba(201,160,80,0.18)',borderRadius:'100px',fontSize:'11px',color:'rgba(201,160,80,0.75)',fontFamily:'system-ui,sans-serif'}}>{t}</span>
          ))}
        </div>
      </div>

      {/* Navigazione */}
      <div style={{position:'sticky',top:0,background:'rgba(10,6,5,0.96)',backdropFilter:'blur(10px)',borderBottom:'1px solid rgba(201,160,80,0.1)',padding:'0 5%',zIndex:10,overflowX:'auto'}}>
        <div style={{display:'flex',minWidth:'max-content'}}>
          {MENU_SECTIONS.map((s,i)=>(
            <div key={s.title} style={{padding:'15px 20px',fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:i===0?'#c9a050':'rgba(255,255,255,0.4)',borderBottom:i===0?'2px solid #c9a050':'2px solid transparent',fontFamily:'system-ui,sans-serif',cursor:'pointer',whiteSpace:'nowrap'}}>{s.title}</div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div style={{maxWidth:'860px',margin:'0 auto',padding:'48px 5%'}}>
        {MENU_SECTIONS.map(section=>(
          <div key={section.title} style={{marginBottom:'56px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'32px'}}>
              <div style={{height:'1px',flex:1,background:'rgba(201,160,80,0.15)'}}/>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'22px',fontWeight:400,color:'#c9a050',letterSpacing:'0.12em',textTransform:'uppercase',margin:0}}>{section.title}</h2>
              <div style={{height:'1px',flex:1,background:'rgba(201,160,80,0.15)'}}/>
            </div>
            {section.items.map(item=>(
              <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',gap:'20px'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px',flexWrap:'wrap'}}>
                    <span style={{fontFamily:'Georgia,serif',fontSize:'17px',color:'#fff',fontWeight:400,lineHeight:1.3}}>{item.name}</span>
                    {item.badge&&<span style={{padding:'2px 10px',background:'rgba(201,160,80,0.1)',border:'1px solid rgba(201,160,80,0.2)',borderRadius:'100px',fontSize:'10px',color:'#c9a050',fontFamily:'system-ui,sans-serif',letterSpacing:'0.06em',whiteSpace:'nowrap'}}>{item.badge}</span>}
                  </div>
                  <p style={{fontFamily:'system-ui,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.38)',lineHeight:1.65,margin:0}}>{item.desc}</p>
                </div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'19px',color:'#c9a050',fontWeight:400,whiteSpace:'nowrap',paddingTop:'2px'}}>{item.price}</div>
              </div>
            ))}
          </div>
        ))}

        {/* Footer */}
        <div style={{borderTop:'1px solid rgba(201,160,80,0.12)',paddingTop:'36px',textAlign:'center'}}>
          <p style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.2)',lineHeight:1.9,marginBottom:'24px'}}>
            Tutti i piatti sono preparati con ingredienti freschi e di stagione.<br/>
            Per allergie e intolleranze chiedere al personale di sala.<br/>
            Coperto €2,50 · IVA inclusa
          </p>
          <div style={{display:'inline-flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
            <a href="#" style={{padding:'12px 24px',background:'linear-gradient(135deg,#c9a050,#a07830)',color:'#fff',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'13px',fontWeight:600}}>📅 Prenota un tavolo</a>
            <Link href="/categoria/ristorazione" style={{padding:'12px 24px',background:'rgba(77,217,192,0.1)',border:'1px solid rgba(77,217,192,0.3)',color:'#4dd9c0',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'13px',fontWeight:600}}>Vuoi un menu così? →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
