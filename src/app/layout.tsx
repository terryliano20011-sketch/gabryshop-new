import type { Metadata, Viewport } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/hooks/useCart"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import Effects from "@/components/ui/Effects"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "GabryShop — Servizi Digitali Professionali",
    template: "%s | GabryShop",
  },
  description: "Siti web, menu digitali, automazioni, app mobile e fogli Excel professionali.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://gabryshop-digitale.vercel.app",
    siteName: "GabryShop",
  },
  robots: { index: true, follow: true },
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
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Effects />
        </CartProvider>
      </body>
    </html>
  )
}
