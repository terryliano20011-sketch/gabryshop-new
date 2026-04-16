import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/hooks/useCart'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: {
    default: 'GabryShop — Servizi Digitali Professionali',
    template: '%s | GabryShop',
  },
  description: 'Siti web, menu digitali, automazioni, app mobile e fogli Excel professionali. Consegna in 24-48 ore.',
  keywords: ['siti web', 'menu digitale', 'automazioni', 'app mobile', 'excel'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://gabryshop.vercel.app',
    siteName: 'GabryShop',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
