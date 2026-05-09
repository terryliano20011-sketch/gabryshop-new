import Link from 'next/link'
export default function DemoSport() {
  const schedule = [
    {day:'Lunedì',classes:[{name:'Yoga Flow',time:'07:30',dur:'60min',teacher:'Sara',spots:2},{name:'Pilates Mat',time:'18:00',dur:'50min',teacher:'Laura',spots:8},{name:'CrossFit',time:'20:00',dur:'60min',teacher:'Marco',spots:3}]},
    {day:'Martedì',classes:[{name:'Spinning',time:'07:00',dur:'45min',teacher:'Luca',spots:5},{name:'Zumba',time:'19:00',dur:'60min',teacher:'Maria',spots:12},{name:'Box Thai',time:'21:00',dur:'60min',teacher:'Marco',spots:6}]},
    {day:'Mercoledì',classes:[{name:'Yoga Yin',time:'07:30',dur:'75min',teacher:'Sara',spots:4},{name:'TRX Sospensione',time:'18:30',dur:'45min',teacher:'Luca',spots:3},{name:'CrossFit',time:'20:00',dur:'60min',teacher:'Marco',spots:5}]},
    {day:'Giovedì',classes:[{name:'Pilates Reformer',time:'10:00',dur:'50min',teacher:'Laura',spots:0},{name:'Kettlebell',time:'19:00',dur:'45min',teacher:'Marco',spots:7},{name:'Stretching',time:'21:00',dur:'45min',teacher:'Sara',spots:10}]},
    {day:'Venerdì',classes:[{name:'Yoga Power',time:'07:30',dur:'60min',teacher:'Sara',spots:6},{name:'Functional',time:'18:00',dur:'60min',teacher:'Luca',spots:4},{name:'Zumba',time:'20:00',dur:'60min',teacher:'Maria',spots:9}]},
  ]
  return (
    <div style={{minHeight:'100vh',background:'#030a06',color:'#fff'}}>
      <div style={{padding:'16px 5%',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <Link href="/demo" style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.3)',textDecoration:'none'}}>← Torna alle demo</Link>
        <span style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(16,185,129,0.5)',float:'right',letterSpacing:'0.1em'}}>DEMO · FitLife Gym</span>
      </div>
      <div style={{background:'linear-gradient(160deg,#021a0a,#041f0d)',padding:'56px 5%',textAlign:'center',borderBottom:'1px solid rgba(16,185,129,0.15)'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.3em',color:'rgba(16,185,129,0.6)',textTransform:'uppercase',marginBottom:'16px',fontFamily:'system-ui,sans-serif'}}>Centro Fitness & Benessere</div>
        <h1 style={{fontFamily:'system-ui,sans-serif',fontSize:'clamp(2.5rem,7vw,5rem)',fontWeight:900,color:'#fff',letterSpacing:'-0.03em',marginBottom:'8px'}}>FitLife <span style={{color:'#10b981'}}>GYM</span></h1>
        <p style={{fontFamily:'system-ui,sans-serif',color:'rgba(255,255,255,0.4)',fontSize:'13px',marginBottom:'24px'}}>Via dello Sport 22, Roma · 📞 06 1234567 · Lun–Ven 6:30–22:00 / Sab–Dom 8:00–19:00</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#" style={{padding:'13px 28px',background:'linear-gradient(135deg,#10b981,#047857)',color:'#fff',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:700}}>🏋️ Inizia ora</a>
          <a href="#" style={{padding:'13px 28px',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',color:'#10b981',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>📅 Prova gratuita</a>
        </div>
      </div>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'56px 5%'}}>
        <h2 style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(16,185,129,0.6)',marginBottom:'32px'}}>Orario corsi settimanale</h2>
        {schedule.map(day=>(
          <div key={day.day} style={{marginBottom:'24px'}}>
            <div style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'#10b981',marginBottom:'12px',paddingBottom:'8px',borderBottom:'1px solid rgba(16,185,129,0.12)'}}>{day.day}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'10px'}}>
              {day.classes.map(cls=>(
                <div key={cls.name} style={{background:'rgba(255,255,255,0.02)',border:`1px solid ${cls.spots===0?'rgba(239,68,68,0.2)':'rgba(16,185,129,0.12)'}`,borderRadius:'12px',padding:'14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px'}}>
                    <span style={{fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:700,color:'#fff'}}>{cls.name}</span>
                    <span style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:cls.spots===0?'rgba(239,68,68,0.7)':'rgba(16,185,129,0.7)',background:cls.spots===0?'rgba(239,68,68,0.08)':'rgba(16,185,129,0.08)',padding:'2px 7px',borderRadius:'100px',whiteSpace:'nowrap'}}>{cls.spots===0?'Esaurito':`${cls.spots} posti`}</span>
                  </div>
                  <div style={{fontFamily:'system-ui,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>🕐 {cls.time} · {cls.dur}</div>
                  <div style={{fontFamily:'system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.3)',marginTop:'3px'}}>👤 {cls.teacher}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{textAlign:'center',marginTop:'48px'}}>
          <Link href="/categoria/sport" style={{padding:'13px 28px',background:'rgba(77,217,192,0.1)',border:'1px solid rgba(77,217,192,0.3)',color:'#4dd9c0',borderRadius:'100px',textDecoration:'none',fontFamily:'system-ui,sans-serif',fontSize:'14px',fontWeight:600}}>Vuoi un sito così per la tua palestra? →</Link>
        </div>
      </div>
    </div>
  )
}
