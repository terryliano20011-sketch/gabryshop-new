import { Metadata } from 'next'
import { CATEGORIES, PRODUCTS } from '@/lib/data'

const SEO_DATA: Record<string, { title: string; description: string; keywords: string[] }> = {
  'siti-web': {
    title: 'Siti Web Professionali — Landing Page, Portfolio, E-commerce',
    description: 'Siti web professionali consegnati in 24-48 ore. Landing page, portfolio creativi, siti aziendali, ristoranti e e-commerce digitale. Design premium a prezzi accessibili.',
    keywords: ['siti web professionali', 'landing page', 'portfolio online', 'sito aziendale', 'sito ristorante', 'ecommerce digitale'],
  },
  'menu-digitali': {
    title: 'Menu Digitali QR Code per Ristoranti, Bar e Pizzerie',
    description: 'Menu digitali con QR code per ristoranti, bar, pizzerie e gelaterie. Allergenici inclusi, aggiornamenti illimitati, multilingua. Consegna in 24 ore.',
    keywords: ['menu digitale', 'menu qr code ristorante', 'menu digitale bar', 'menu allergenici', 'menu pizzeria digitale'],
  },
  'fogli-excel': {
    title: 'Fogli Excel Professionali — Inventario, Fatturazione, CRM',
    description: 'Template Excel professionali per gestione inventario, fatturazione automatica, CRM clienti, presenze dipendenti e project management. Download immediato.',
    keywords: ['fogli excel professionali', 'template excel', 'gestione inventario excel', 'fatturazione excel', 'crm excel'],
  },
  'automazioni': {
    title: 'Automazioni WhatsApp, Email e Social Media',
    description: 'Chatbot WhatsApp Business, automazioni email marketing, bot Instagram DM, prenotazioni automatiche e integrazione Google Sheets. Risparmia ore ogni giorno.',
    keywords: ['chatbot whatsapp business', 'automazione email', 'bot instagram', 'prenotazioni automatiche', 'automazione marketing'],
  },
  'app-mobile': {
    title: 'App Mobile PWA — Installabile su iOS e Android',
    description: 'App mobile progressive web app installabili su iOS e Android. App prenotazioni, catalogo prodotti e business app personalizzate. Nessun App Store richiesto.',
    keywords: ['app mobile pwa', 'progressive web app', 'app prenotazioni', 'app catalogo prodotti', 'app business'],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES.find(c => c.slug === slug)
  const seo = SEO_DATA[slug]
  if (!category || !seo) return {}
  const url = `https://gabryshop-digitale.vercel.app/categoria/${slug}`
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
  }
}
