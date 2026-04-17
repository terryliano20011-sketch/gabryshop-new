'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogIn, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/account')
  }

  return (
    <div className="pt-36 pb-20 flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a96e] to-[#8b6fd4] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>Accedi</h1>
          <p className="text-[#8888aa] mt-2">Bentornato su GabryShop</p>
        </div>
        <div className="luxury-card rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-[#8888aa] mb-1 block">Email</label>
              <input className="input-luxury" type="email" placeholder="mario@email.it" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm text-[#8888aa] mb-1 block">Password</label>
              <input className="input-luxury" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? 'Accesso...' : <><LogIn className="w-5 h-5" /> Accedi</>}
            </button>
          </form>
          <p className="text-center text-sm text-[#8888aa] mt-6">
            Non hai un account? <Link href="/register" className="text-[#c9a96e] hover:text-white transition-colors">Registrati gratis</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
