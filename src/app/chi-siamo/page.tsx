import Link from 'next/link'
import { ArrowRight, Code, Zap, Heart } from 'lucide-react'

export default function ChiSiamoPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Chi siamo</h1>
        <p className="text-[#8888aa] text-lg max-w-xl mx-auto">Il team dietro GabryShop.</p>
      </div>

      <div className="luxury-card rounded-3xl p-10 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-[#7c6af0]/5" />
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c9a96e] to-[#8b6fd4] flex items-center justify-center text-3xl mb-6">
            👨‍💻
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Gabry — Fondatore</h2>
          <p className="text-[#8888aa] leading-relaxed text-lg mb-6">
            Sono uno sviluppatore informatico appassionato di tecnologia e business digitale. Ho creato GabryShop per mettere a disposizione di privati e piccole imprese strumenti digitali professionali a prezzi accessibili, con una qualità da grande agenzia.
          </p>
          <p className="text-[#8888aa] leading-relaxed">
            Ogni prodotto nel nostro catalogo è frutto di studio, esperienza pratica e feedback dei clienti. Il mio obiettivo è che ogni acquisto porti valore reale al tuo business.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Code, title: 'Expertise tecnica', desc: 'Anni di esperienza in sviluppo web, automazioni e soluzioni digitali enterprise.', color: '#7c6af0' },
          { icon: Zap, title: 'Consegna rapida', desc: 'Processi ottimizzati per garantire consegna in 24-48 ore senza compromessi sulla qualità.', color: '#c9a96e' },
          { icon: Heart, title: 'Cliente prima di tutto', desc: 'Rimborso garantito e supporto dedicato. Non sei soddisfatto? Ti rimborsiamo.', color: '#ec4899' },
        ].map(item => (
          <div key={item.title} className="luxury-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{background:`${item.color}15`}}>
              <item.icon className="w-6 h-6" style={{color:item.color}} />
            </div>
            <h3 className="text-white font-semibold mb-2" style={{fontFamily:'Playfair Display,serif'}}>{item.title}</h3>
            <p className="text-[#8888aa] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/" className="btn-gold px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2">
          Scopri i nostri prodotti <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
