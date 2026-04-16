import Link from 'next/link'
import { Sparkles, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a96e] to-[#8b6fd4] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-gold">Gabry</span>
                <span className="text-white">Shop</span>
              </span>
            </div>
            <p className="text-[#8888aa] text-sm leading-relaxed max-w-xs">
              Servizi e prodotti digitali professionali per privati e aziende. 
              Qualità garantita, consegna rapida.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-[#8888aa]">
              <Mail className="w-4 h-4" />
              <span>info@gabryshop.it</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-[#8888aa]">
              <MapPin className="w-4 h-4" />
              <span>Italia 🇮🇹</span>
            </div>
          </div>

          {/* Categorie */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categorie</h4>
            <ul className="space-y-2">
              {[
                { href: '/categoria/siti-web', label: '🌐 Siti Web' },
                { href: '/categoria/menu-digitali', label: '🍽️ Menu Digitali' },
                { href: '/categoria/fogli-excel', label: '📊 Fogli Excel' },
                { href: '/categoria/automazioni', label: '🤖 Automazioni' },
                { href: '/categoria/app-mobile', label: '📱 App Mobile' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#8888aa] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-2">
              {[
                { href: '/chi-siamo', label: 'Chi siamo' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contatti', label: 'Contattaci' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/termini', label: 'Termini di Servizio' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#8888aa] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8888aa]">
            © {new Date().getFullYear()} GabryShop. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#8888aa]">
            <span>💳 PayPal</span>
            <span>🔒 SSL Sicuro</span>
            <span>⚡ Consegna digitale</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
