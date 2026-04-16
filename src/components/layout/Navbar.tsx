'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, User, Sparkles } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const navLinks = [
  { href: '/categoria/siti-web', label: '🌐 Siti Web' },
  { href: '/categoria/menu-digitali', label: '🍽️ Menu Digitali' },
  { href: '/categoria/fogli-excel', label: '📊 Excel' },
  { href: '/categoria/automazioni', label: '🤖 Automazioni' },
  { href: '/categoria/app-mobile', label: '📱 App Mobile' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a96e] to-[#8b6fd4] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span className="text-gold">Gabry</span>
            <span className="text-white">Shop</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-[#8888aa] hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/account"
            className="p-2 text-[#8888aa] hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            <User className="w-5 h-5" />
          </Link>

          <Link
            href="/checkout"
            className="relative p-2 text-[#8888aa] hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c9a96e] text-[#0a0a0f] text-xs font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-[#8888aa] hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass mt-2 mx-4 rounded-xl p-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-3 text-sm text-[#8888aa] hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
