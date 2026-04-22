// Recensioni per ogni prodotto (slug → array recensioni)
export const PRODUCT_REVIEWS: Record<string, {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  date: string
}[]> = {
  'landing-page-pro': [
    { name:'Davide Romano', role:'E-commerce Fashion', avatar:'👕', rating:5, text:'Landing page convertissima! Il tasso di conversione è salito dal 1.2% al 4.8% in due settimane. Si è ripagata in 3 giorni.', date:'Marzo 2024' },
    { name:'Giulia Ferraro', role:'Coach Online', avatar:'🎯', rating:5, text:'Design moderno e professionale. Ho ricevuto i primi contatti già il giorno dopo il lancio. Consiglio a tutti!', date:'Febbraio 2024' },
    { name:'Luca Bianchi', role:'Fotografo', avatar:'📸', rating:5, text:'Velocissimo e molto preciso. Ha capito esattamente cosa volevo. Risultato finale superiore alle aspettative.', date:'Gennaio 2024' },
  ],
  'sito-portfolio-creativo': [
    { name:'Sara Lombardi', role:'Freelance Designer', avatar:'🎨', rating:5, text:'Portfolio online professionale in 48 ore. Gabry ha capito esattamente quello che volevo. Già ricevuto 3 nuovi clienti.', date:'Aprile 2024' },
    { name:'Marco Vitale', role:'Architetto', avatar:'🏛️', rating:5, text:'Elegante e minimalista, esattamente come lo volevo. Ottima comunicazione durante tutto il processo.', date:'Marzo 2024' },
  ],
  'sito-aziendale-5-pagine': [
    { name:'Luca Ferretti', role:'Consulente Finanziario', avatar:'💼', rating:5, text:'Sito aziendale elegante e professionale. In meno di 48 ore avevo già il sito online. Supporto impeccabile.', date:'Aprile 2024' },
    { name:'Federica Bruno', role:'Avvocato', avatar:'⚖️', rating:5, text:'Sito professionale esattamente come lo immaginavo. I clienti mi dicono che ispira subito fiducia.', date:'Marzo 2024' },
  ],
  'sito-ristorante-prenotazioni': [
    { name:'Antonio Greco', role:'Titolare Ristorante', avatar:'🍷', rating:5, text:'Le prenotazioni online sono aumentate del 60% nel primo mese. I clienti adorano poter prenotare direttamente dal sito.', date:'Aprile 2024' },
    { name:'Maria Conti', role:'Pizzeria Napoletana', avatar:'🍕', rating:5, text:'Sito bellissimo con il menu integrato. I turisti stranieri ora trovano facilmente tutte le informazioni.', date:'Febbraio 2024' },
  ],
  'sito-parrucchiere-salone': [
    { name:'Laura Esposito', role:'Parrucchiera', avatar:'✂️', rating:5, text:'Sito bellissimo e funzionale. Le prenotazioni online sono aumentate del 60% nel primo mese. Assistenza super disponibile.', date:'Marzo 2024' },
    { name:'Alessia Romano', role:'Centro Estetico', avatar:'💅', rating:4, text:'Ottimo lavoro, consegnato in tempi brevissimi. Ho ricevuto molti complimenti dai clienti per il sito.', date:'Gennaio 2024' },
  ],
  'menu-qr-ristorante': [
    { name:'Marco Bianchi', role:'Titolare Pizzeria', avatar:'🍕', rating:5, text:'Menu digitale consegnato in meno di 24 ore. I clienti lo adorano e abbiamo già ridotto gli errori degli ordini del 40%.', date:'Aprile 2024' },
    { name:'Anna Conti', role:'Gelateria Artigianale', avatar:'🍦', rating:5, text:'Il menu QR con le foto dei gelati ha triplicato le ordinazioni di gusti nuovi. I clienti lo trovano divertente e pratico.', date:'Marzo 2024' },
  ],
  'menu-bar-cocktail': [
    { name:'Francesco Marino', role:'Barman', avatar:'🍹', rating:5, text:'Menu cocktail digitalizzato in 24 ore. I clienti scansionano il QR e ordinano direttamente. Zero errori!', date:'Marzo 2024' },
  ],
  'gestione-inventario-excel': [
    { name:'Roberto Mancini', role:'PMI owner', avatar:'📊', rating:5, text:'Il foglio Excel per la gestione inventario ha rivoluzionato il nostro processo. Risparmio 3 ore a settimana.', date:'Aprile 2024' },
  ],
  'fatturazione-automatica': [
    { name:'Carla Russo', role:'Commercialista', avatar:'💰', rating:5, text:'Finalmente un Excel per la fatturazione che funziona davvero. Le formule sono perfette e il layout è professionale.', date:'Marzo 2024' },
  ],
  'chatbot-whatsapp': [
    { name:'Agenzia Meridian', role:'Marketing Agency', avatar:'🏢', rating:5, text:'Il chatbot WhatsApp ha automatizzato il 70% del supporto clienti. ROI incredibile per il prezzo pagato.', date:'Aprile 2024' },
    { name:'Matteo Gallo', role:'Personal Trainer', avatar:'💪', rating:5, text:'Automazione Instagram DM fantastica. Rispondo a 200 messaggi al giorno in automatico. Ho guadagnato 2 ore libere.', date:'Marzo 2024' },
  ],
  'pwa-business-app': [
    { name:'Giulia Marchetti', role:'Studio Pilates', avatar:'🧘', rating:5, text:'App prenotazioni semplicissima da usare. Le clienti la adorano e ho zero telefonate per gli appuntamenti.', date:'Aprile 2024' },
  ],
}

// Fallback generico per prodotti senza recensioni specifiche
export const GENERIC_REVIEWS = [
  { name:'Cliente Verificato', role:'Acquirente GabryShop', avatar:'✅', rating:5, text:'Prodotto consegnato nei tempi previsti, qualità eccellente. Comunicazione ottima durante tutto il processo.', date:'2024' },
]
