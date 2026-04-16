'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User, Package, Download, LogOut, LogIn } from 'lucide-react'

export default function AccountClient() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lazy-load supabase only on client
    import('@/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user)
        setLoading(false)
      })
    })
  }, [])

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return (
    <div className="pt-28 pb-20 flex items-center justify-center min-h-[60vh]">
      <div className="text-[#8888aa]">Caricamento...</div>
    </div>
  )

  if (!user) return (
    <div className="pt-28 pb-20 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <User className="w-8 h-8 text-[#8888aa]" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2" style={{fontFamily:'Playfair Display,serif'}}>Accedi al tuo account</h2>
      <p className="text-[#8888aa] mb-8">Accedi per vedere i tuoi ordini e download.</p>
      <div className="flex gap-4">
        <Link href="/login" className="btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
          <LogIn className="w-4 h-4" /> Accedi
        </Link>
        <Link href="/register" className="px-6 py-3 rounded-xl font-semibold border border-white/10 text-white hover:border-white/20 hover:bg-white/5 transition-all">
          Registrati
        </Link>
      </div>
    </div>
  )

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1" style={{fontFamily:'Playfair Display,serif'}}>Il tuo account</h1>
          <p className="text-[#8888aa]">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-[#8888aa] hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-all">
          <LogOut className="w-4 h-4" /> Esci
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="luxury-card rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/15 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#c9a96e]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-[#8888aa] text-sm">Ordini totali</div>
          </div>
        </div>
        <div className="luxury-card rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#7c6af0]/15 flex items-center justify-center">
            <Download className="w-6 h-6 text-[#7c6af0]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-[#8888aa] text-sm">Download disponibili</div>
          </div>
        </div>
      </div>
      <div className="luxury-card rounded-2xl p-8 text-center">
        <Package className="w-12 h-12 text-[#8888aa] mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Nessun ordine ancora</h3>
        <p className="text-[#8888aa] text-sm mb-6">I tuoi acquisti appariranno qui dopo il pagamento.</p>
        <Link href="/" className="btn-gold px-6 py-3 rounded-xl font-semibold inline-block">Scopri i prodotti</Link>
      </div>
    </div>
  )
}
