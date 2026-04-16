'use client'
import { useState } from 'react'
import { Mail, MessageCircle, Clock, Send } from 'lucide-react'

export default function ContattiPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: call API route to send email via Resend
    setSent(true)
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Contattaci</h1>
        <p className="text-[#8888aa] text-lg">Siamo qui per aiutarti.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-4 mb-8">
            {[
              { icon: MessageCircle, label: 'WhatsApp', value: 'Risposta entro 1 ora', href: `https://wa.me/393401234567`, color: '#25D366' },
              { icon: Mail, label: 'Email', value: 'info@gabryshop.it', href: 'mailto:info@gabryshop.it', color: '#c9a96e' },
              { icon: Clock, label: 'Orari', value: 'Lun–Ven 9:00–18:00', href: '#', color: '#7c6af0' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="luxury-card rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-all block">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:`${item.color}15`}}>
                  <item.icon className="w-5 h-5" style={{color:item.color}} />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{item.label}</div>
                  <div className="text-[#8888aa] text-xs">{item.value}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="luxury-card rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Risposta rapida garantita</h3>
            <p className="text-[#8888aa] text-sm leading-relaxed">
              Per richieste urgenti usa WhatsApp. Per domande tecniche o preventivi, inviaci un'email con tutti i dettagli del tuo progetto.
            </p>
          </div>
        </div>

        <div className="luxury-card rounded-2xl p-6">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-white font-semibold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Messaggio inviato!</h3>
              <p className="text-[#8888aa] text-sm">Ti risponderemo entro 24 ore.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-white font-semibold mb-4" style={{fontFamily:'Playfair Display,serif'}}>Inviaci un messaggio</h3>
              <div>
                <label className="text-sm text-[#8888aa] mb-1 block">Nome</label>
                <input className="input-luxury" placeholder="Mario Rossi" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required />
              </div>
              <div>
                <label className="text-sm text-[#8888aa] mb-1 block">Email</label>
                <input className="input-luxury" type="email" placeholder="mario@email.it" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} required />
              </div>
              <div>
                <label className="text-sm text-[#8888aa] mb-1 block">Messaggio</label>
                <textarea className="input-luxury resize-none" rows={5} placeholder="Descrivi la tua richiesta..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} required />
              </div>
              <button type="submit" className="btn-gold w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Invia messaggio
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
