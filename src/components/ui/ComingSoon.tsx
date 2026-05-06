'use client'
import { useState, useEffect } from 'react'

function getTimeLeft() {
  // Countdown di 7 giorni da ora (salvato in localStorage)
  const KEY = 'gabryshop_launch_date'
  let launchDate: Date

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(KEY)
    if (saved) {
      launchDate = new Date(saved)
    } else {
      launchDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      localStorage.setItem(KEY, launchDate.toISOString())
    }
  } else {
    launchDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }

  const diff = launchDate.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

export default function ComingSoon() {
  const [time, setTime] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 })
  const [clicked, setClicked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(getTimeLeft())
    const t = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      position: 'relative',
      margin: '40px 0',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid rgba(77,217,192,0.2)',
      background: 'linear-gradient(135deg, rgba(77,217,192,0.04) 0%, rgba(0,0,0,0) 100%)',
    }}>
      {/* Glow top */}
      <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'300px',height:'2px',background:'linear-gradient(90deg,transparent,#4dd9c0,transparent)'}}/>

      <div style={{padding:'48px 32px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:'28px'}}>

        {/* Badge */}
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',background:'rgba(77,217,192,0.08)',border:'1px solid rgba(77,217,192,0.25)',borderRadius:'100px'}}>
          <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4dd9c0',animation:'pulse 2s ease-in-out infinite'}}/>
          <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,color:'#4dd9c0',letterSpacing:'0.15em',textTransform:'uppercase'}}>In arrivo</span>
        </div>

        {/* Titolo */}
        <div>
          <h3 style={{fontFamily:'Cormorant Garamond,serif',color:'#fff',fontSize:'clamp(28px,4vw,48px)',fontWeight:700,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:'12px'}}>
            App Mobile 2.0<br/>
            <em style={{fontStyle:'italic',background:'linear-gradient(110deg,#4dd9c0,#a8f0e0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>in arrivo presto.</em>
          </h3>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(255,255,255,0.4)',fontSize:'14px',lineHeight:1.7,maxWidth:'400px',margin:'0 auto'}}>
            Stiamo preparando app ancora più potenti e personalizzate. Nuove funzionalità, prezzi migliori e tempi di consegna più rapidi.
          </p>
        </div>

        {/* Countdown */}
        <div style={{display:'flex',gap:'16px',flexWrap:'wrap',justifyContent:'center'}}>
          {[
            { val: time.days,    label: 'Giorni' },
            { val: time.hours,   label: 'Ore' },
            { val: time.minutes, label: 'Minuti' },
            { val: time.seconds, label: 'Secondi' },
          ].map((t, i) => (
            <div key={t.label} style={{
              display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',
              padding:'20px 24px',
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'16px',
              minWidth:'80px',
            }}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(32px,4vw,48px)',fontWeight:700,lineHeight:1,color:'#fff',letterSpacing:'-0.04em',transition:'all 0.3s ease'}}>
                {String(t.val).padStart(2, '0')}
              </div>
              <div style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.25)',textTransform:'uppercase',letterSpacing:'0.15em'}}>{t.label}</div>
            </div>
          ))}
        </div>

        {/* Bottone disabilitato */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
          <button
            onClick={() => setClicked(true)}
            style={{
              padding:'14px 32px',
              background:'rgba(77,217,192,0.08)',
              border:'1px solid rgba(77,217,192,0.3)',
              borderRadius:'100px',
              color:'rgba(77,217,192,0.6)',
              fontFamily:'Outfit,system-ui,sans-serif',
              fontSize:'14px',
              fontWeight:700,
              cursor:'not-allowed',
              position:'relative',
              overflow:'hidden',
              letterSpacing:'0.02em',
            }}
          >
            🔒 Disponibile tra {time.days} giorni
          </button>

          {clicked && (
            <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'12px',color:'#4dd9c0',animation:'fadeIn 0.4s ease'}}>
              ✓ Ti avviseremo su WhatsApp non appena disponibile!
            </p>
          )}

          <p style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)',textAlign:'center',lineHeight:1.6}}>
            Nel frattempo puoi acquistare le app disponibili qui sopra
          </p>
        </div>

      </div>

      {/* Glow bottom */}
      <div style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:'300px',height:'2px',background:'linear-gradient(90deg,transparent,rgba(77,217,192,0.4),transparent)'}}/>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}
