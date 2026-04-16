'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
    if (error) { setError(error.message); setLoading(false) }
    else setDone(true)
  }

  if (done) return (
    <div className="pt-28 pb-20 flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-2xl font-bold text-white mb-2" style={{fontFamily:'Playfair Display,serif'}}>Controlla la tua email!</h2>
        <p className="text-[#8888aa]">Ti abbiamo inviato un link di verifica. Clicca per attivare il tuo account.</p>
        <Link href="/login" className="btn-gold mt-8 px-6 py-3 rounded-xl font-semibold inline-block">Vai al login</Link>
      </div>
    </div>
  )

  return (
    <div className="pt-28 pb-20 flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a96e] to-[#8b6fd4] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>Registrati</h1>
          <p className="text-[#8888aa] mt-2">Crea il tuo account GabryShop</p>
        </div>
        <div className="luxury-card rounded-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-[#8888aa] mb-1 block">Nome completo</label>
              <input className="input-luxury" placeholder="Mario Rossi" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-[#8888aa] mb-1 block">Email</label>
              <input className="input-luxury" type="email" placeholder="mario@email.it" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-[#8888aa] mb-1 block">Password</label>
              <input className="input-luxury" type="password" placeholder="Minimo 8 caratteri" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? 'Registrazione...' : <><UserPlus className="w-5 h-5" /> Crea account</>}
            </button>
          </form>
          <p className="text-xs text-center text-[#8888aa] mt-4">
            Registrandoti accetti i <Link href="/termini" className="text-[#c9a96e]">Termini</Link> e la <Link href="/privacy" className="text-[#c9a96e]">Privacy Policy</Link>.
          </p>
          <p className="text-center text-sm text-[#8888aa] mt-4">
            Hai già un account? <Link href="/login" className="text-[#c9a96e] hover:text-white transition-colors">Accedi</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
