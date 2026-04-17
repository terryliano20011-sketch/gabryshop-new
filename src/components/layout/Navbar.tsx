"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, User, Sparkles } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const navLinks = [
  { href: '/categoria/siti-web', label: 'Siti Web', icon: '🌐' },
  { href: '/categoria/menu-digitali', label: 'Menu Digitali', icon: '🍽️' },
  { href: '/categoria/fogli-excel', label: 'Excel', icon: '📊' },
  { href: '/categoria/automazioni', label: 'Automazioni', icon: '🤖' },
  { href: '/categoria/app-mobile', label: 'App Mobile', icon: '📱' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass" : ""}`}
        style={{padding: scrolled ? "12px 0" : "20px 0", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{background:"linear-gradient(135deg, #c9a96e, #8b6fd4)"}}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{fontFamily:"Playfair Display,serif"}}>
              <span className="text-gold">Gabry</span>
              <span className="text-white">Shop</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all"
                style={{color:"#8888aa"}}
                onMouseEnter={e => {(e.target as HTMLElement).style.color="white";(e.target as HTMLElement).style.background="rgba(255,255,255,0.05)"}}
                onMouseLeave={e => {(e.target as HTMLElement).style.color="#8888aa";(e.target as HTMLElement).style.background="transparent"}}>
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link href="/account" className="p-2.5 rounded-lg transition-all" style={{color:"#8888aa"}}
              onMouseEnter={e => {(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"}}
              onMouseLeave={e => {(e.currentTarget as HTMLElement).style.color="#8888aa";(e.currentTarget as HTMLElement).style.background="transparent"}}>
              <User className="w-5 h-5" />
            </Link>
            <Link href="/checkout" className="relative p-2.5 rounded-lg transition-all" style={{color:"#8888aa"}}
              onMouseEnter={e => {(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"}}
              onMouseLeave={e => {(e.currentTarget as HTMLElement).style.color="#8888aa";(e.currentTarget as HTMLElement).style.background="transparent"}}>
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{background:"#c9a96e",color:"#0a0a0f"}}>
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 rounded-lg transition-all" style={{color:"#8888aa"}}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"}} />
          <div className="absolute top-20 left-4 right-4 glass rounded-2xl p-4" onClick={e => e.stopPropagation()}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all" style={{color:"#8888aa"}}
                onMouseEnter={e => {(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)"}}
                onMouseLeave={e => {(e.currentTarget as HTMLElement).style.color="#8888aa";(e.currentTarget as HTMLElement).style.background="transparent"}}>
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
