'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function SuccessPage() {
  const { clearCart } = useCart()
  useEffect(() => { clearCart() }, [])

  return (
    <div className="pt-28 pb-20 flex items-center justify-center min-h-screen px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center mx-auto mb-6 animate-fade-up">
          <CheckCircle className="w-10 h-10 text-[#22c55e]" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-up" style={{fontFamily:'Playfair Display,serif',animationDelay:'100ms'}}>
          Pagamento completato!
        </h1>
        <p className="text-[#8888aa] text-lg mb-8 animate-fade-up" style={{animationDelay:'200ms'}}>
          Grazie per il tuo acquisto. Riceverai una email di conferma con i dettagli del tuo ordine e il link per il download.
        </p>

        <div className="luxury-card rounded-2xl p-6 mb-8 text-left animate-fade-up" style={{animationDelay:'300ms'}}>
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-[#c9a96e]" />
            <span className="text-white font-medium">Controlla la tua email</span>
          </div>
          <p className="text-[#8888aa] text-sm">Abbiamo inviato una email con il link per scaricare i tuoi prodotti digitali. Controlla anche la cartella spam.</p>
          <div className="mt-4 flex items-center gap-3">
            <Download className="w-5 h-5 text-[#c9a96e]" />
            <span className="text-white font-medium">Download disponibile</span>
          </div>
          <p className="text-[#8888aa] text-sm mt-1">Puoi anche accedere ai tuoi acquisti dalla pagina Account in qualsiasi momento.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{animationDelay:'400ms'}}>
          <Link href="/account" className="btn-gold px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            Vai al tuo account <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="px-6 py-3 rounded-xl font-semibold border border-white/10 text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center">
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  )
}
