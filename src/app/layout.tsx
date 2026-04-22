import type { Metadata, Viewport } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/hooks/useCart"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import Effects from "@/components/ui/Effects"
import CouponPopup from "@/components/ui/CouponPopup"

const playfair = Playfair_Display({ subsets:["latin"], weight:["400","500","600","700","800"], variable:"--font-display", display:"swap" })
const dmSans = DM_Sans({ subsets:["latin"], weight:["300","400","500","600"], variable:"--font-body", display:"swap" })

export const metadata: Metadata = {
  metadataBase: new URL('https://gabryshop-digitale.vercel.app'),
  title: {
    default: "GabryShop — Servizi Digitali Professionali | Siti Web, Menu, Automazioni",
    template: "%s | GabryShop",
  },
  description: "Siti web, menu digitali QR, automazioni WhatsApp, fogli Excel e app mobile professionali. Consegna in 24-48 ore. Qualità da studio internazionale a prezzi accessibili.",
  keywords: [
    "siti web professionali", "menu digitale QR", "automazioni whatsapp",
    "chatbot whatsapp business", "landing page", "sito ristorante",
    "menu ristorante QR code", "automazione email marketing",
    "fogli excel professionali", "app mobile pwa", "servizi digitali",
    "sito web economico", "menu digitale ristorante"
  ],
  authors: [{ name: "GabryShop" }],
  creator: "GabryShop",
  publisher: "GabryShop",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://gabryshop-digitale.vercel.app",
    siteName: "GabryShop",
    title: "GabryShop — Servizi Digitali Professionali",
    description: "Siti web, menu digitali, automazioni, app mobile. Consegna in 24-48 ore. Qualità da studio internazionale.",
    images: [{
      url: "/og-image.png",
      width: 1200, height: 630,
      alt: "GabryShop — Servizi Digitali Professionali",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GabryShop — Servizi Digitali Professionali",
    description: "Siti web, menu digitali, automazioni, app mobile. Consegna in 24-48 ore.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://gabryshop-digitale.vercel.app",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={playfair.variable + " " + dmSans.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="icon" href="/icon.svg" type="image/svg+xml"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Effects />
          <CouponPopup />
        </CartProvider>
      </body>
    </html>
  )
}
