'use client'
import { useState } from 'react'
import { Product } from '@/types'
import AddToCartButton from './AddToCartButton'

const BRIEFING_FIELDS: Record<string, { label: string; placeholder: string }[]> = {
  'menu-digitale-qr': [
    { label: 'Nome del ristorante', placeholder: 'Es. Trattoria Da Mario' },
    { label: 'Indirizzo', placeholder: 'Es. Via Roma 1, Milano' },
    { label: 'Numero sezioni menu', placeholder: 'Es. Antipasti, Primi, Secondi, Dolci' },
  ],
  'landing-page-pro': [
    { label: 'Nome azienda/brand', placeholder: 'Es. Studio Legale Rossi' },
    { label: 'Settore', placeholder: 'Es. Avvocatura, Consulenza, Vendita...' },
    { label: 'Obiettivo principale', placeholder: 'Es. Raccogliere contatti, vendere prodotti...' },
    { label: 'Colori preferiti', placeholder: 'Es. blu, bianco, oro' },
  ],
  'chatbot-whatsapp': [
    { label: 'Nome attività', placeholder: 'Es. Pizzeria Bella Napoli' },
    { label: 'Settore', placeholder: 'Es. Ristorante, Parrucchiere...' },
    { label: 'Domande frequenti da gestire', placeholder: 'Es. Orari, prenotazioni, prezzi...' },
  ],
}

export default function BriefingForm({ product }: { product: Product }) {
  const fields = BRIEFING_FIELDS[product.slug] || [
    { label: 'Nome azienda/progetto', placeholder: 'Inserisci il nome...' },
    { label: 'Descrizione breve', placeholder: 'Cosa fa la tua azienda?' },
    { label: 'Eventuali note', placeholder: 'Altre specifiche o richieste...' },
  ]
  const [briefing, setBriefing] = useState<Record<string, string>>({})

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-white mb-3">📝 Personalizza il tuo ordine</h4>
      <div className="space-y-3 mb-4">
        {fields.map(f => (
          <div key={f.label}>
            <label className="text-xs text-[#8888aa] mb-1 block">{f.label}</label>
            <input
              className="input-luxury text-sm"
              placeholder={f.placeholder}
              value={briefing[f.label] || ''}
              onChange={e => setBriefing(b => ({ ...b, [f.label]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <AddToCartButton product={product} briefing={briefing} />
    </div>
  )
}
