import Link from 'next/link'

export default function DemoLocali() {
  return (
    <div style={{minHeight:'100vh',background:'#05020f',color:'#fff'}}>
      <div style={{padding:'16px 5%',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <Link href="/demo" style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>← Torna alle demo</Link>
        <span style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(139,92,246,0.5)',float:'right',letterSpacing:'0.1em'}}>DEMO · Club Neon</span>
      </div>

      {/* Hero */}
      <div style={{background:'linear-gradient(160deg,#0d0020,#1a0035)',padding:'64px 5%',textAlign:'center',borderBottom:'1px solid rgba(139,92,246,0.15)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:'400px',height:'200px',background:'radial-gradient(ellipse,rgba(139,92,246,0.15),transparent)',pointerEvents:'none'}}/>
        <div style={{fontSize:'11px',letterSpacing:'0.3em',color:'rgba(139,92,246,0.6)',textTransform:'uppercase',marginBottom:'16px',fontFamily:'system-ui,sans-serif'}}>Milano · Aperto Ven–Sab–Dom</div>
        <h1 style={{fontFamily:'system-ui,sans-serif',fontSize:'clamp(3rem,8vw,6rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.03em',marginBottom:'8px',lineHeight:0.9}}>CLUB<br/><span style={{color:'#8b5cf6'}}>NEON</span></h1>
        <p style={{fontFamily:'system-ui,sans-serif',color:'rgba(255,255,255,0.4)',fontSize:'14px',marginBottom:'28px'}}>Via Navigli 42, Milano · Apertura ore 23:00</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#" style={{padding:'13px 28px',background:'linear-gradient(135deg,#8b5cf6,#6d28d9)',color:'#fff',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:700}}>🎟️ Acquista biglietti</a>
          <a href="#" style={{padding:'13px 28px',background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.3)',color:'#8b5cf6',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>⭐ Lista VIP</a>
        </div>
      </div>

      {/* Prossimi eventi */}
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'56px 5%'}}>
        <h2 style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(139,92,246,0.6)',marginBottom:'32px'}}>Prossimi eventi</h2>
        {[
          {date:'Ven 9 Mag',title:'LATIN NIGHT',sub:'Salsa · Bachata · Reggaeton',dj:'DJ Marco Fuentes + DJ Sara',img:'🎵',badge:'Sold out presto'},
          {date:'Sab 10 Mag',title:'SATURDAY NIGHT FEVER',sub:'House · Tech House · Electronic',dj:'DJ Steve K · Special Guest TBA',img:'🎧',badge:'VIP disponibili'},
          {date:'Dom 11 Mag',title:'SUNDAY BRUNCH CLUB',sub:'Nu-Disco · Funky · Soul',dj:'The Groove Collective',img:'🌅',badge:'Ingresso €10'},
          {date:'Ven 16 Mag',title:'90s NIGHT',sub:'Eurodance · Pop · R&B anni \'90',dj:'DJ Max Vintage',img:'🕺',badge:''},
          {date:'Sab 17 Mag',title:'TECHNO UNDERGROUND',sub:'Techno · Industrial · Dark',dj:'DJ KRMN + Live Act',img:'⚡',badge:'Special event'},
        ].map(ev=>(
          <div key={ev.title} style={{display:'flex',gap:'20px',alignItems:'center',padding:'24px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
            <div style={{width:'70px',textAlign:'center',flexShrink:0}}>
              <div style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',fontWeight:700,color:'#8b5cf6',letterSpacing:'0.1em',textTransform:'uppercase'}}>{ev.date.split(' ')[0]}</div>
              <div style={{fontFamily:'system-ui,sans-serif',fontSize:'22px',fontWeight:800,color:'#fff',lineHeight:1}}>{ev.date.split(' ')[1]}</div>
              <div style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.3)'}}>{ev.date.split(' ')[2]}</div>
            </div>
            <div style={{width:'52px',height:'52px',borderRadius:'12px',background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>{ev.img}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'4px',flexWrap:'wrap'}}>
                <span style={{fontFamily:'system-ui,sans-serif',fontSize:'18px',fontWeight:800,color:'#fff',letterSpacing:'-0.02em'}}>{ev.title}</span>
                {ev.badge&&<span style={{padding:'2px 10px',background:'rgba(139,92,246,0.12)',border:'1px solid rgba(139,92,246,0.25)',borderRadius:'100px',fontSize:'10px',color:'#8b5cf6',fontFamily:'system-ui,sans-serif',whiteSpace:'nowrap'}}>{ev.badge}</span>}
              </div>
              <div style={{fontFamily:'system-ui,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.5)',marginBottom:'4px'}}>{ev.sub}</div>
              <div style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(139,92,246,0.6)'}}>🎧 {ev.dj}</div>
            </div>
            <a href="#" style={{padding:'10px 20px',background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.25)',borderRadius:'100px',color:'#8b5cf6',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'12px',fontWeight:600,flexShrink:0,whiteSpace:'nowrap'}}>Info →</a>
          </div>
        ))}

        {/* Drink list preview */}
        <div style={{marginTop:'64px'}}>
          <h2 style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(139,92,246,0.6)',marginBottom:'32px'}}>Drink list</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}}>
            {[
              {name:'Neon Punch',desc:'Vodka, mango, passion fruit, lime',price:'€12'},
              {name:'Purple Rain',desc:'Gin, lavanda, tonica, fiori',price:'€11'},
              {name:'Dark Matter',desc:'Rum nero, cola, lime, menta',price:'€10'},
              {name:'Electric Blue',desc:'Vodka, blue curaçao, limone',price:'€12'},
              {name:'Birra artigianale',desc:'IPA locale, pils, rossa',price:'€7'},
              {name:'Bollicine',desc:'Prosecco, Champagne, Cava',price:'da €9'},
            ].map(d=>(
              <div key={d.name} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'12px',padding:'16px'}}>
                <div style={{fontFamily:'system-ui,sans-serif',fontSize:'15px',fontWeight:700,color:'#fff',marginBottom:'4px'}}>{d.name}</div>
                <div style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.35)',marginBottom:'8px',lineHeight:1.5}}>{d.desc}</div>
                <div style={{fontFamily:'system-ui,sans-serif',fontSize:'16px',fontWeight:800,color:'#8b5cf6'}}>{d.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:'48px'}}>
          <Link href="/categoria/locali" style={{padding:'14px 32px',background:'rgba(77,217,192,0.1)',border:'1px solid rgba(77,217,192,0.3)',color:'#4dd9c0',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>Vuoi un sito così per il tuo locale? →</Link>
        </div>
      </div>
    </div>
  )
}
