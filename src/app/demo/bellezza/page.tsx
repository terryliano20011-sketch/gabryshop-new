import Link from 'next/link'
export default function DemoBellezza() {
  return (
    <div style={{minHeight:'100vh',background:'#0a0508',color:'#fff'}}>
      <div style={{padding:'16px 5%',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <Link href="/demo" style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>← Torna alle demo</Link>
        <span style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(236,72,153,0.5)',float:'right',letterSpacing:'0.1em'}}>DEMO · Salone Elegance</span>
      </div>
      <div style={{background:'linear-gradient(160deg,#1a0510,#2d0a1f)',padding:'56px 5%',textAlign:'center',borderBottom:'1px solid rgba(236,72,153,0.15)'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.3em',color:'rgba(236,72,153,0.6)',textTransform:'uppercase',marginBottom:'16px',fontFamily:'system-ui,sans-serif'}}>Parrucchiere & Centro Estetico</div>
        <h1 style={{fontFamily:'Georgia,serif',fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:400,color:'#fff',letterSpacing:'0.08em',marginBottom:'12px'}}>Salone Elegance</h1>
        <div style={{width:'60px',height:'1px',background:'linear-gradient(90deg,transparent,#ec4899,transparent)',margin:'16px auto'}}/>
        <p style={{fontFamily:'system-ui,sans-serif',color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>Via Montenapoleone 8, Milano · 📞 02 9876543 · Lun–Sab 9:00–19:00</p>
        <a href="#" style={{padding:'13px 28px',background:'linear-gradient(135deg,#ec4899,#be185d)',color:'#fff',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:700}}>📅 Prenota ora</a>
      </div>
      <div style={{maxWidth:'860px',margin:'0 auto',padding:'56px 5%'}}>
        {[
          {cat:'Taglio & Piega',icon:'✂️',items:[
            {name:'Taglio donna',desc:'Consulenza, lavaggio, taglio personalizzato, phon e piega',price:'€45',time:'60 min'},
            {name:'Taglio uomo',desc:'Lavaggio, taglio, styling',price:'€25',time:'30 min'},
            {name:'Piega semplice',desc:'Lavaggio e piega con phon o piastra',price:'€28',time:'45 min'},
            {name:'Taglio bambini (under 12)',desc:'Taglio e phon',price:'€18',time:'30 min'},
          ]},
          {cat:'Colore',icon:'🎨',items:[
            {name:'Tinta intera',desc:'Colore permanente, radici o lunghezze, con trattamento protettivo',price:'€65',time:'90 min'},
            {name:'Meches / Balayage',desc:'Schiariture naturali, effetto sole, balayage personalizzato',price:'€90',time:'120 min'},
            {name:'Colore con keratina',desc:'Colore + trattamento cheratina per capelli lucidi e lisci',price:'€120',time:'150 min'},
            {name:'Riflessante',desc:'Esaltazione del colore naturale, riflessi luminosi',price:'€40',time:'60 min'},
          ]},
          {cat:'Trattamenti',icon:'💆',items:[
            {name:'Trattamento idratante',desc:'Maschera nutriente, massaggio cuoio capelluto, siero luminosità',price:'€35',time:'45 min'},
            {name:'Cheratina brasiliana',desc:'Liscio semi-permanente, anti-crespo, lucentezza estrema — dura 3-4 mesi',price:'€150',time:'180 min'},
            {name:'Trattamento anticaduta',desc:'Fiale specific, massaggio attivante, maschera rinforzante',price:'€45',time:'60 min'},
          ]},
          {cat:'Estetica',icon:'💅',items:[
            {name:'Manicure completa',desc:'Forma, cuticole, smalto semipermanente, top coat',price:'€30',time:'45 min'},
            {name:'Pedicure completa',desc:'Bagno, esfoliazione, forma, smalto',price:'€38',time:'60 min'},
            {name:'Sopracciglia e ciglia',desc:'Forma sopracciglia + tinta ciglia',price:'€25',time:'30 min'},
          ]},
        ].map(section=>(
          <div key={section.cat} style={{marginBottom:'48px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <span style={{fontSize:'22px'}}>{section.icon}</span>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:'20px',fontWeight:400,color:'#ec4899',letterSpacing:'0.08em',margin:0}}>{section.cat}</h2>
              <div style={{height:'1px',flex:1,background:'rgba(236,72,153,0.12)'}}/>
            </div>
            {section.items.map(item=>(
              <div key={item.name} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'16px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',gap:'20px'}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'Georgia,serif',fontSize:'16px',color:'#fff',marginBottom:'4px'}}>{item.name}</div>
                  <div style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.35)',lineHeight:1.6}}>{item.desc}</div>
                  <div style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(236,72,153,0.5)',marginTop:'4px'}}>⏱ {item.time}</div>
                </div>
                <div style={{fontFamily:'Georgia,serif',fontSize:'19px',color:'#ec4899',whiteSpace:'nowrap'}}>{item.price}</div>
              </div>
            ))}
          </div>
        ))}
        <div style={{textAlign:'center',marginTop:'48px',padding:'32px',background:'rgba(236,72,153,0.04)',border:'1px solid rgba(236,72,153,0.12)',borderRadius:'16px'}}>
          <p style={{fontFamily:'system-ui,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.35)',marginBottom:'20px',lineHeight:1.7}}>I prezzi possono variare in base alla lunghezza e quantità dei capelli.<br/>Prima visita: consulenza gratuita inclusa.</p>
          <Link href="/categoria/bellezza" style={{padding:'13px 28px',background:'rgba(77,217,192,0.1)',border:'1px solid rgba(77,217,192,0.3)',color:'#4dd9c0',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>Vuoi un sito così? →</Link>
        </div>
      </div>
    </div>
  )
}
