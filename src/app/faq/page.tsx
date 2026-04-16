'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'Come ricevo i prodotti dopo l\'acquisto?', a: 'Dopo il pagamento riceverai immediatamente un\'email con il link per scaricare i tuoi file digitali. Puoi anche accedere alla pagina Account per scaricarli in qualsiasi momento.' },
  { q: 'Quali metodi di pagamento accettate?', a: 'Accettiamo pagamenti tramite PayPal, che include tutte le principali carte di credito e debito (Visa, Mastercard, American Express) oltre al saldo PayPal.' },
  { q: 'Posso richiedere un rimborso?', a: 'Sì! Offriamo una garanzia di rimborso completo entro 7 giorni dall\'acquisto. Contattaci via email o WhatsApp e procederemo al rimborso senza fare domande.' },
  { q: 'I prodotti personalizzabili richiedono più tempo?', a: 'I prodotti personalizzabili vengono lavorati manualmente dal nostro team. Il tempo di consegna è indicato su ogni prodotto, generalmente tra 24 e 72 ore lavorative.' },
  { q: 'Posso richiedere modifiche dopo la consegna?', a: 'Sì, per i prodotti personalizzabili offriamo fino a 2 revisioni gratuite incluse nel prezzo. Ulteriori revisioni possono essere acquistate separatamente.' },
  { q: 'I file sono utilizzabili su tutti i dispositivi?', a: 'Tutti i nostri file digitali sono compatibili con i principali software. I file Excel richiedono Microsoft Excel 2016 o successivo, oppure Google Sheets. I siti web funzionano su tutti i dispositivi.' },
  { q: 'Posso usare un coupon sconto?', a: 'Sì! Puoi inserire il codice coupon nella pagina del carrello prima del checkout. Seguici sui social per ricevere i nostri codici esclusivi.' },
  { q: 'Emettete fattura?', a: 'Sì, al momento del checkout puoi inserire la tua partita IVA per ricevere la fattura elettronica. La fattura verrà inviata all\'email indicata entro 48 ore dall\'acquisto.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Domande frequenti</h1>
        <p className="text-[#8888aa] text-lg">Trova risposta alle domande più comuni.</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className={`luxury-card rounded-xl overflow-hidden transition-all ${open === i ? 'border-[#c9a96e]/30' : ''}`}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-white font-medium pr-4">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#8888aa] shrink-0 transition-transform ${open === i ? 'rotate-180 text-[#c9a96e]' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <div className="divider-gold mb-4" />
                <p className="text-[#8888aa] text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="luxury-card rounded-2xl p-8 text-center mt-12">
        <h3 className="text-white font-semibold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Non hai trovato risposta?</h3>
        <p className="text-[#8888aa] text-sm mb-6">Contattaci e ti risponderemo entro 24 ore.</p>
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393401234567'}`} target="_blank" className="btn-gold px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
          💬 Scrivici su WhatsApp
        </a>
      </div>
    </div>
  )
}
