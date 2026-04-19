'use client'
import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2 } from 'lucide-react'
import { Product } from '@/types'
import AddToCartButton from './AddToCartButton'

// ─── CONFIGURAZIONI BRIEFING PER CATEGORIA/PRODOTTO ───
const BRIEFING_CONFIG: Record<string, {
  title: string
  subtitle: string
  steps: {
    title: string
    icon: string
    fields: {
      key: string
      label: string
      type: 'text' | 'textarea' | 'select' | 'multiselect' | 'repeater'
      placeholder?: string
      options?: string[]
      subfields?: { key: string; label: string; placeholder: string }[]
      required?: boolean
    }[]
  }[]
}> = {

  // ─── MENU DIGITALI ───
  default_menu: {
    title: 'Personalizza il tuo menu',
    subtitle: 'Dimmi tutto sul tuo locale per creare il menu perfetto',
    steps: [
      {
        title: 'Il tuo locale',
        icon: '🏪',
        fields: [
          { key: 'nome_locale', label: 'Nome del locale', type: 'text', placeholder: 'Es. Trattoria Da Mario', required: true },
          { key: 'tipo_locale', label: 'Tipo di locale', type: 'select', options: ['Ristorante', 'Pizzeria', 'Bar / Cocktail Bar', 'Trattoria', 'Sushi / Giapponese', 'Gelateria / Pasticceria', 'Altro'], required: true },
          { key: 'indirizzo', label: 'Indirizzo (opzionale)', type: 'text', placeholder: 'Es. Via Roma 1, Milano' },
          { key: 'colori', label: 'Colori preferiti per il menu', type: 'select', options: ['Classico (bianco/nero)', 'Caldo (marrone/oro)', 'Elegante (nero/oro)', 'Fresco (verde/bianco)', 'Marino (blu/bianco)', 'Personalizzato (specificare nelle note)'] },
        ]
      },
      {
        title: 'Sezioni del menu',
        icon: '📋',
        fields: [
          { key: 'sezioni', label: 'Quali sezioni deve avere il menu?', type: 'multiselect', options: ['Antipasti', 'Primi piatti', 'Secondi piatti', 'Contorni', 'Pizza', 'Dolci', 'Bevande', 'Vini', 'Cocktail', 'Birre', 'Caffetteria', 'Menu bambini', 'Menu fisso / degustazione'] },
          { key: 'lingue', label: 'In quali lingue?', type: 'multiselect', options: ['Italiano', 'Inglese', 'Tedesco', 'Francese', 'Spagnolo'] },
          { key: 'n_piatti_stimati', label: 'Quanti piatti in totale (circa)?', type: 'select', options: ['Meno di 20', '20–40 piatti', '40–60 piatti', 'Più di 60 piatti'] },
        ]
      },
      {
        title: 'Piatti e dettagli',
        icon: '🍽️',
        fields: [
          { key: 'piatti_esempio', label: 'Elenca i piatti principali con ingredienti e prezzi', type: 'textarea', placeholder: 'Es:\nANTIPASTI:\n- Bruschetta al pomodoro €5\n- Tagliere misto €12\n\nPRIMI:\n- Spaghetti alla carbonara (uova, guanciale, pecorino) €12\n- Tagliatelle al ragù €13\n\n(puoi anche mandarci il menu via email dopo l\'acquisto)', required: true },
          { key: 'allergeni', label: 'Vuoi mostrare gli allergeni?', type: 'select', options: ['Sì, per ogni piatto', 'Sì, solo per i principali', 'No'] },
          { key: 'foto_piatti', label: 'Hai foto dei piatti da inserire?', type: 'select', options: ['Sì, le mando via email', 'No, solo testo', 'Alcune sì'] },
        ]
      },
      {
        title: 'Note finali',
        icon: '✏️',
        fields: [
          { key: 'note_extra', label: 'Altre informazioni o richieste speciali', type: 'textarea', placeholder: 'Es. Logo da inserire, orari del locale, Wi-Fi password, promozioni speciali, link al sito...' },
          { key: 'contatto_preferito', label: 'Come preferisci essere contattato per conferme?', type: 'select', options: ['Email', 'WhatsApp', 'Entrambi'] },
        ]
      }
    ]
  },

  // ─── SITI WEB ───
  default_sito: {
    title: 'Personalizza il tuo sito',
    subtitle: 'Più dettagli ci dai, più il sito sarà perfetto per te',
    steps: [
      {
        title: 'Il tuo progetto',
        icon: '🎯',
        fields: [
          { key: 'nome_azienda', label: 'Nome azienda / brand / progetto', type: 'text', placeholder: 'Es. Studio Legale Rossi', required: true },
          { key: 'settore', label: 'Settore di attività', type: 'text', placeholder: 'Es. Avvocatura, Ristorazione, E-commerce...' },
          { key: 'obiettivo', label: 'Obiettivo principale del sito', type: 'select', options: ['Generare contatti/lead', 'Vendere prodotti online', 'Mostrare portfolio/lavori', 'Informare clienti', 'Prenotare appuntamenti', 'Altro'] },
          { key: 'pubblico', label: 'A chi si rivolge?', type: 'text', placeholder: 'Es. Privati 25-45 anni, Aziende PMI, Ristoranti...' },
        ]
      },
      {
        title: 'Stile e contenuti',
        icon: '🎨',
        fields: [
          { key: 'stile', label: 'Stile visivo preferito', type: 'select', options: ['Minimal e pulito', 'Elegante e luxury', 'Moderno e tech', 'Colorato e vivace', 'Professionale e istituzionale', 'Simile a un sito che mi piace (specificare nelle note)'] },
          { key: 'colori', label: 'Colori del brand (se hai)', type: 'text', placeholder: 'Es. Blu navy #1a2b4c, Oro #c9a96e' },
          { key: 'pagine', label: 'Pagine da includere', type: 'multiselect', options: ['Homepage', 'Chi siamo', 'Servizi', 'Portfolio/Lavori', 'Blog', 'Contatti', 'Prezzi', 'FAQ', 'Shop/E-commerce', 'Prenotazioni'] },
          { key: 'testi', label: 'Hai già i testi/contenuti?', type: 'select', options: ['Sì, li mando via email', 'No, ne ho bisogno (copyrighting incluso)', 'Parzialmente'] },
        ]
      },
      {
        title: 'Riferimenti',
        icon: '🔗',
        fields: [
          { key: 'siti_riferimento', label: 'Siti che ti piacciono come riferimento', type: 'textarea', placeholder: 'Es. apple.com (per la semplicità), airbnb.com (per le foto)...' },
          { key: 'logo', label: 'Hai un logo?', type: 'select', options: ['Sì, lo mando via email', 'No, ne ho bisogno', 'Ho solo un\'idea'] },
          { key: 'dominio', label: 'Hai già un dominio?', type: 'select', options: ['Sì (es. miosito.it)', 'No, devo acquistarlo', 'Non so ancora'] },
        ]
      },
      {
        title: 'Note finali',
        icon: '✏️',
        fields: [
          { key: 'scadenza', label: 'Hai una scadenza?', type: 'select', options: ['Prima possibile', 'Entro 1 settimana', 'Entro 2 settimane', 'Entro 1 mese', 'Nessuna fretta'] },
          { key: 'budget_extra', label: 'Funzionalità extra desiderate', type: 'textarea', placeholder: 'Es. Chat live, traduzione automatica, area riservata, pagamenti online...' },
          { key: 'note', label: 'Altre note o informazioni', type: 'textarea', placeholder: 'Tutto ciò che ritieni importante sapere...' },
        ]
      }
    ]
  },

  // ─── AUTOMAZIONI / CHATBOT ───
  default_automazione: {
    title: 'Configura la tua automazione',
    subtitle: 'Dimmi cosa vuoi automatizzare per costruire la soluzione perfetta',
    steps: [
      {
        title: 'Il tuo business',
        icon: '🏢',
        fields: [
          { key: 'nome_azienda', label: 'Nome azienda / attività', type: 'text', placeholder: 'Es. Pizzeria Bella Napoli', required: true },
          { key: 'settore', label: 'Settore', type: 'select', options: ['Ristorante / Bar', 'Negozio / E-commerce', 'Studio professionale', 'Parrucchiere / Estetica', 'Palestra / Sport', 'Consulenza / Servizi', 'Altro'] },
          { key: 'canale', label: 'Su quale canale vuoi il chatbot?', type: 'multiselect', options: ['WhatsApp Business', 'Instagram DM', 'Facebook Messenger', 'Sito web', 'Telegram'] },
        ]
      },
      {
        title: 'Cosa deve fare',
        icon: '🤖',
        fields: [
          { key: 'funzioni', label: 'Cosa deve fare il bot?', type: 'multiselect', options: ['Rispondere alle FAQ', 'Prendere prenotazioni', 'Inviare il listino prezzi', 'Raccogliere contatti/lead', 'Gestire ordini', 'Inviare promozioni', 'Supporto post-vendita', 'Qualificare clienti'] },
          { key: 'faq_principali', label: 'Elenca le 5 domande più frequenti dei tuoi clienti', type: 'textarea', placeholder: 'Es.\n1. Quali sono gli orari?\n2. Avete posti disponibili sabato sera?\n3. Fate consegne a domicilio?\n4. Qual è il prezzo medio?\n5. Come si prenota?' },
          { key: 'tono', label: 'Tono di risposta preferito', type: 'select', options: ['Formale e professionale', 'Amichevole e informale', 'Diretto e conciso', 'Caldo e accogliente'] },
        ]
      },
      {
        title: 'Dettagli tecnici',
        icon: '⚙️',
        fields: [
          { key: 'orario_risposta', label: 'Il bot deve rispondere', type: 'select', options: ['Solo in orario lavorativo', '24 ore su 24, 7 giorni su 7', 'Fuori orario lavorativo'] },
          { key: 'handoff', label: 'Cosa fare se il bot non sa rispondere?', type: 'select', options: ['Passare al team umano', 'Chiedere email e ricontattare', 'Inviare numero WhatsApp', 'Mostrare messaggio predefinito'] },
          { key: 'crm', label: 'Hai già un CRM o gestionale?', type: 'select', options: ['No', 'Sì (Google Sheets)', 'Sì (HubSpot)', 'Sì (altro — specificare)'] },
          { key: 'note', label: 'Altre informazioni', type: 'textarea', placeholder: 'Qualsiasi cosa utile per configurare il bot...' },
        ]
      }
    ]
  },

  // ─── EXCEL ───
  default_excel: {
    title: 'Personalizza il tuo foglio Excel',
    subtitle: 'Dimmi come lavori per creare il template perfetto per te',
    steps: [
      {
        title: 'Il tuo uso',
        icon: '📊',
        fields: [
          { key: 'azienda', label: 'Nome azienda / attività (opzionale)', type: 'text', placeholder: 'Es. Negozio Abbigliamento XY' },
          { key: 'settore', label: 'Settore', type: 'text', placeholder: 'Es. Abbigliamento, Ristorazione, Edilizia...' },
          { key: 'n_utenti', label: 'Quante persone lo useranno?', type: 'select', options: ['Solo io', '2-5 persone', 'Più di 5'] },
          { key: 'software', label: 'Quale software usi?', type: 'select', options: ['Microsoft Excel', 'Google Sheets', 'Entrambi', 'Non so ancora'] },
        ]
      },
      {
        title: 'Contenuti',
        icon: '📝',
        fields: [
          { key: 'colonne_principali', label: 'Quali colonne/dati ti servono principalmente?', type: 'textarea', placeholder: 'Es. Prodotto, Quantità, Prezzo acquisto, Prezzo vendita, Fornitore, Data ultimo ordine...', required: true },
          { key: 'calcoli', label: 'Calcoli automatici necessari', type: 'multiselect', options: ['Totali/somme', 'IVA', 'Margine/profitto', 'Percentuali', 'Date/scadenze', 'Medie', 'Conteggi', 'Altro'] },
          { key: 'grafici', label: 'Vuoi grafici automatici?', type: 'select', options: ['Sì', 'No', 'Solo alcuni'] },
        ]
      },
      {
        title: 'Personalizzazione',
        icon: '🎨',
        fields: [
          { key: 'colori_brand', label: 'Colori preferiti per il file', type: 'select', options: ['Verde (classico Excel)', 'Blu professionale', 'Grigio minimal', 'Colori aziendali (specificare)', 'Non importa'] },
          { key: 'lingua', label: 'Lingua del file', type: 'select', options: ['Italiano', 'Inglese', 'Italiano + Inglese'] },
          { key: 'note', label: 'Note o esempi aggiuntivi', type: 'textarea', placeholder: 'Puoi descrivere come lavori attualmente o cosa non ti piace del tuo sistema attuale...' },
        ]
      }
    ]
  },

  // ─── APP MOBILE ───
  default_app: {
    title: 'Configura la tua app',
    subtitle: 'Più dettagli ci dai, migliore sarà la tua app',
    steps: [
      {
        title: 'Il progetto',
        icon: '📱',
        fields: [
          { key: 'nome_app', label: 'Nome dell\'app', type: 'text', placeholder: 'Es. PrenotaFacile, MyShop, FitTracker...', required: true },
          { key: 'scopo', label: 'A cosa serve l\'app?', type: 'textarea', placeholder: 'Descrivi brevemente cosa fa l\'app e a chi è destinata...', required: true },
          { key: 'pubblico', label: 'Chi la userà?', type: 'text', placeholder: 'Es. Clienti del mio negozio, Dipendenti interni, Chiunque...' },
        ]
      },
      {
        title: 'Funzionalità',
        icon: '⚙️',
        fields: [
          { key: 'funzioni', label: 'Funzionalità necessarie', type: 'multiselect', options: ['Login/Registrazione', 'Profilo utente', 'Catalogo prodotti', 'Prenotazioni/Appuntamenti', 'Pagamenti in-app', 'Notifiche push', 'Chat/Messaggi', 'Mappa/Geolocalizzazione', 'Foto/Gallery', 'QR code scanner', 'Dashboard statistiche'] },
          { key: 'integrazioni', label: 'Integrazioni con altri sistemi', type: 'multiselect', options: ['Google Calendar', 'WhatsApp', 'Stripe/PayPal', 'Instagram', 'Google Maps', 'Nessuna'] },
        ]
      },
      {
        title: 'Design',
        icon: '🎨',
        fields: [
          { key: 'stile', label: 'Stile visivo', type: 'select', options: ['Minimal e pulito', 'Colorato e vivace', 'Dark mode', 'Seguire i colori del mio brand'] },
          { key: 'colori', label: 'Colori principali', type: 'text', placeholder: 'Es. Blu #1a2b4c e Bianco, oppure lascia decidere a noi' },
          { key: 'app_riferimento', label: 'App di riferimento che ti piacciono', type: 'textarea', placeholder: 'Es. Instagram per la semplicità, Deliveroo per l\'ordinazione...' },
          { key: 'note', label: 'Altre note', type: 'textarea', placeholder: 'Qualsiasi altra informazione utile...' },
        ]
      }
    ]
  },
}

// Determina quale config usare
function getConfig(product: Product) {
  const slug = product.slug
  const catId = product.category_id

  if (catId === '2') return BRIEFING_CONFIG.default_menu      // Menu digitali
  if (catId === '1') return BRIEFING_CONFIG.default_sito      // Siti web
  if (catId === '4') return BRIEFING_CONFIG.default_automazione // Automazioni
  if (catId === '3') return BRIEFING_CONFIG.default_excel     // Excel
  if (catId === '5') return BRIEFING_CONFIG.default_app       // App mobile
  return BRIEFING_CONFIG.default_sito
}

export default function BriefingForm({ product }: { product: Product }) {
  const config = getConfig(product)
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Record<string, any>>({})
  const [done, setDone] = useState(false)

  const currentStep = config.steps[step]
  const isLast = step === config.steps.length - 1
  const totalSteps = config.steps.length

  const update = (key: string, value: any) => {
    setData(d => ({ ...d, [key]: value }))
  }

  const toggleMulti = (key: string, val: string) => {
    const arr: string[] = data[key] || []
    update(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  const canNext = () => {
    return currentStep.fields
      .filter(f => f.required)
      .every(f => data[f.key] && String(data[f.key]).trim() !== '')
  }

  if (done) {
    return (
      <div>
        <div style={{ padding:'24px', background:'rgba(74,222,128,0.05)', border:'1px solid rgba(74,222,128,0.15)', borderRadius:'16px', marginBottom:'20px', textAlign:'center' }}>
          <CheckCircle size={32} style={{ color:'#4ade80', margin:'0 auto 12px' }}/>
          <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.4rem', fontWeight:600, marginBottom:'8px' }}>Briefing completato!</h3>
          <p style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.75)', fontSize:'13px' }}>
            Le tue informazioni sono state salvate. Ora aggiungi al carrello e procedi all&apos;acquisto.
          </p>
        </div>
        <AddToCartButton product={product} briefing={data}/>
        <button onClick={() => { setDone(false); setStep(0) }} style={{ width:'100%', marginTop:'10px', padding:'10px', background:'transparent', border:'none', color:'rgba(120,120,155,0.6)', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', cursor:'pointer' }}>
          ← Modifica le risposte
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:'20px' }}>
        <h3 style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.2rem', fontWeight:600, marginBottom:'4px' }}>
          ✏️ {config.title}
        </h3>
        <p style={{ fontFamily:'Outfit,system-ui,sans-serif', color:'rgba(120,120,155,0.65)', fontSize:'12px' }}>{config.subtitle}</p>
      </div>

      {/* Progress bar */}
      <div style={{ display:'flex', gap:'4px', marginBottom:'24px' }}>
        {config.steps.map((s, i) => (
          <div key={i} style={{ flex:1, height:'3px', borderRadius:'2px', background: i <= step ? '#c9a96e' : 'rgba(255,255,255,0.08)', transition:'background 0.3s' }}/>
        ))}
      </div>

      {/* Step header */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
        <span style={{ fontSize:'20px' }}>{currentStep.icon}</span>
        <div>
          <div style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#c9a96e', marginBottom:'2px' }}>
            Step {step + 1} di {totalSteps}
          </div>
          <div style={{ fontFamily:'Cormorant Garamond,serif', color:'white', fontSize:'1.1rem', fontWeight:600 }}>{currentStep.title}</div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'24px' }}>
        {currentStep.fields.map(field => (
          <div key={field.key}>
            <label style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(120,120,155,0.65)', display:'block', marginBottom:'8px' }}>
              {field.label} {field.required && <span style={{ color:'#c9a96e' }}>*</span>}
            </label>

            {field.type === 'text' && (
              <input className="g-input" placeholder={field.placeholder} value={data[field.key] || ''} onChange={e => update(field.key, e.target.value)}/>
            )}

            {field.type === 'textarea' && (
              <textarea className="g-input" placeholder={field.placeholder} value={data[field.key] || ''} onChange={e => update(field.key, e.target.value)} rows={4} style={{ resize:'vertical', minHeight:'100px' }}/>
            )}

            {field.type === 'select' && (
              <select className="g-input" value={data[field.key] || ''} onChange={e => update(field.key, e.target.value)} style={{ cursor:'pointer' }}>
                <option value="">Seleziona...</option>
                {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            )}

            {field.type === 'multiselect' && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {field.options?.map(o => {
                  const selected = (data[field.key] || []).includes(o)
                  return (
                    <button key={o} type="button" onClick={() => toggleMulti(field.key, o)}
                      style={{ padding:'6px 14px', borderRadius:'100px', border:`1px solid ${selected ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.08)'}`, background: selected ? 'rgba(201,169,110,0.1)' : 'transparent', color: selected ? '#c9a96e' : 'rgba(150,150,185,0.7)', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'12px', fontWeight:500, cursor:'pointer', transition:'all 0.2s' }}>
                      {selected && '✓ '}{o}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display:'flex', gap:'10px' }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="g-btn g-btn-ghost" style={{ borderRadius:'12px', padding:'12px 20px', fontSize:'13px' }}>
            <ArrowLeft size={15}/> Indietro
          </button>
        )}
        {!isLast ? (
          <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="g-btn g-btn-gold"
            style={{ flex:1, justifyContent:'center', borderRadius:'12px', padding:'14px', fontSize:'14px', opacity: canNext() ? 1 : 0.5 }}>
            Continua <ArrowRight size={15}/>
          </button>
        ) : (
          <button onClick={() => setDone(true)} disabled={!canNext()} className="g-btn g-btn-gold"
            style={{ flex:1, justifyContent:'center', borderRadius:'12px', padding:'14px', fontSize:'14px', opacity: canNext() ? 1 : 0.5 }}>
            <CheckCircle size={15}/> Completa e aggiungi al carrello
          </button>
        )}
      </div>

      {/* Skip */}
      <button onClick={() => setDone(true)} style={{ width:'100%', marginTop:'10px', padding:'8px', background:'transparent', border:'none', color:'rgba(100,100,135,0.5)', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'11px', cursor:'pointer' }}>
        Salta per ora (completa dopo l&apos;acquisto via email)
      </button>
    </div>
  )
}
