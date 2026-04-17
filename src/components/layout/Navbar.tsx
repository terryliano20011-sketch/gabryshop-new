"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const links = [
  { href: '/categoria/siti-web',     label: 'Siti Web',      emoji: '🌐' },
  { href: '/categoria/menu-digitali',label: 'Menu Digitali', emoji: '🍽️' },
  { href: '/categoria/fogli-excel',  label: 'Excel',         emoji: '📊' },
  { href: '/categoria/automazioni',  label: 'Automazioni',   emoji: '🤖' },
  { href: '/categoria/app-mobile',   label: 'App Mobile',    emoji: '📱' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur' : ''}`}
        style={{padding: scrolled ? '10px 0' : '22px 0'}}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                style={{background:'linear-gradient(135deg,#c9a96e 0%,#8b6fd4 100%)'}}>
                ✦
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{boxShadow:'0 0 20px rgba(201,169,110,0.5)'}}/> 
            </div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:700}}>
              <span style={{background:'linear-gradient(135deg,#c9a96e,#e8c878)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Gabry</span>
              <span style={{color:'white'}}>Shop</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center" style={{gap:'2px'}}>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{color:'rgba(180,180,200,0.7)'}}>
                <span className="text-base group-hover:scale-110 transition-transform">{l.emoji}</span>
                <span className="group-hover:text-white transition-colors">{l.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center" style={{gap:'4px'}}>
            <Link href="/account"
              className="p-2.5 rounded-xl transition-all duration-200 hover:bg-white/5"
              style={{color:'rgba(180,180,200,0.7)'}}>
              <User size={18} />
            </Link>
            <Link href="/checkout"
              className="relative p-2.5 rounded-xl transition-all duration-200 hover:bg-white/5"
              style={{color:'rgba(180,180,200,0.7)'}}>
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{background:'#c9a96e',color:'#0a0805'}}>
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen(v => !v)}
              className="lg:hidden p-2.5 rounded-xl transition-all hover:bg-white/5"
              style={{color:'rgba(180,180,200,0.7)'}}>
              {open ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="lg:hidden fixed inset-0 z-40 transition-all duration-300"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
        }}
        onClick={() => setOpen(false)}
      >
        <div style={{position:'absolute',inset:0,background:'rgba(4,4,10,0.85)',backdropFilter:'blur(12px)'}} />
        <div
          className="absolute glass-2 rounded-2xl p-5"
          style={{top:'72px',left:'16px',right:'16px',transform: open ? 'translateY(0)' : 'translateY(-10px)',transition:'transform 0.3s ease'}}
          onClick={e => e.stopPropagation()}
        >
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/5 text-sm font-medium"
              style={{color:'rgba(180,180,200,0.85)'}}>
              <span className="text-lg">{l.emoji}</span>
              <span>{l.label}</span>
            </Link>
          ))}
          <div className="divider my-4" />
          <Link href="/checkout" onClick={() => setOpen(false)}
            className="btn-primary w-full justify-center">
            🛒 Vai al carrello {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      </div>
    </>
  )
}
