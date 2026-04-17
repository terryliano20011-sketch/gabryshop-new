'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const data = await res.json()
    if (data.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Password errata')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#05050a', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ width:'100%', maxWidth:'400px' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <div style={{ width:'56px', height:'56px', borderRadius:'16px', background:'linear-gradient(135deg,#c9a96e,#7c6af0)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'24px' }}>
            🔐
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'2.2rem', fontWeight:600, marginBottom:'8px' }}>Admin Panel</h1>
          <p style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.7)', fontSize:'14px' }}>Accesso riservato</p>
        </div>

        <div className="g-card" style={{ padding:'36px', borderRadius:'20px' }}>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            <div>
              <label style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(120,120,155,0.65)', display:'block', marginBottom:'8px' }}>Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={15} style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'rgba(120,120,155,0.4)' }}/>
                <input
                  className="g-input"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft:'42px', paddingRight:'44px' }}
                  required
                  autoFocus
                />
                <button type="button" onClick={() => setShow(v => !v)}
                  style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', background:'transparent', border:'none', cursor:'pointer', color:'rgba(120,120,155,0.5)', display:'flex' }}>
                  {show ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding:'12px 16px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'10px', color:'#f87171', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px' }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="g-btn g-btn-gold"
              style={{ width:'100%', justifyContent:'center', borderRadius:'14px', padding:'15px', fontSize:'15px', opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Accesso...' : '🔓 Accedi al pannello'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
