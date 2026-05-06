'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 6%'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'10px',textDecoration:'none',marginBottom:'32px'}}>
            <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'linear-gradient(135deg,#0d1f2d,#1a3a4a)',border:'1.5px solid rgba(77,217,192,0.3)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{fontSize:'16px'}}>🤖</span>
            </div>
            <span style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'18px',fontWeight:800,color:'white'}}><span style={{color:'#4dd9c0'}}>Gabry</span>Shop</span>
          </Link>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',color:'white',fontSize:'2.2rem',fontWeight:600,marginBottom:'8px'}}>Accedi</h1>
          <p style={{fontFamily:'Outfit,system-ui,sans-serif',color:'rgba(120,120,155,0.6)',fontSize:'14px'}}>Bentornato nel tuo account</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',padding:'32px',display:'flex',flexDirection:'column',gap:'18px'}}>
          <div>
            <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(120,120,155,0.6)',display:'block',marginBottom:'8px'}}>Email</label>
            <input className="g-input" type="email" placeholder="tua@email.it" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label style={{fontFamily:'Outfit,system-ui,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(120,120,155,0.6)',display:'block',marginBottom:'8px'}}>Password</label>
            <input className="g-input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)}/>
          </div>
          <button style={{padding:'14px',background:'linear-gradient(135deg,#4dd9c0,#1a9e88)',color:'#000',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'14px',fontWeight:700,borderRadius:'12px',border:'none',cursor:'pointer',marginTop:'4px'}}>
            Accedi →
          </button>
        </div>

        <p style={{textAlign:'center',marginTop:'20px',fontFamily:'Outfit,system-ui,sans-serif',fontSize:'13px',color:'rgba(100,100,135,0.55)'}}>
          Non hai un account?{' '}
          <Link href="/register" style={{color:'#4dd9c0',textDecoration:'none',fontWeight:600}}>Registrati</Link>
        </p>
      </div>
    </div>
  )
}
