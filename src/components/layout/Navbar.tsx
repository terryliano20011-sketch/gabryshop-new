'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const links = [
  { href:'/categoria/siti-web',     label:'Siti Web',      emoji:'🌐' },
  { href:'/categoria/menu-digitali',label:'Menu Digitali', emoji:'🍽️' },
  { href:'/categoria/fogli-excel',  label:'Excel',         emoji:'📊' },
  { href:'/categoria/automazioni',  label:'Automazioni',   emoji:'🤖' },
  { href:'/categoria/app-mobile',   label:'App Mobile',    emoji:'📱' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={scrolled ? 'g-nav' : ''}
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, transition:'all 0.4s ease', padding: scrolled ? '10px 0' : '22px 0' }}
      >
        <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'0 5%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:'12px', textDecoration:'none' }}>
            <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'linear-gradient(135deg,#c9a96e,#7c6af0)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', fontWeight:700, color:'white' }}>G</div>
            <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'22px', fontWeight:600, letterSpacing:'-0.01em' }}>
              <span style={{ background:'linear-gradient(135deg,#c9a96e,#e8c878)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Gabry</span>
              <span style={{ color:'white' }}>Shop</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display:'flex', alignItems:'center', gap:'2px' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'10px', textDecoration:'none', color:'rgba(145,145,180,0.72)', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', fontWeight:500, transition:'color 0.2s' }}
                className="hidden lg:flex">
                <span>{l.emoji}</span>{l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            <Link href="/account" style={{ padding:'9px', borderRadius:'10px', color:'rgba(135,135,170,0.7)', display:'flex', alignItems:'center', textDecoration:'none', transition:'all 0.2s' }}>
              <User size={17}/>
            </Link>
            <Link href="/checkout" style={{ position:'relative', padding:'9px', borderRadius:'10px', color:'rgba(135,135,170,0.7)', display:'flex', alignItems:'center', textDecoration:'none', transition:'all 0.2s' }}>
              <ShoppingCart size={17}/>
              {itemCount > 0 && (
                <span style={{ position:'absolute', top:'-2px', right:'-2px', width:'17px', height:'17px', borderRadius:'50%', background:'#c9a96e', color:'#08060a', fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Outfit,system-ui,sans-serif' }}>
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen(v => !v)}
              style={{ padding:'9px', borderRadius:'10px', color:'rgba(135,135,170,0.7)', background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}
              className="lg:hidden">
              {open ? <X size={17}/> : <Menu size={17}/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={() => setOpen(false)}>
          <div style={{ position:'absolute', inset:0, background:'rgba(2,2,8,0.9)', backdropFilter:'blur(14px)' }}/>
          <div style={{ position:'absolute', top:'72px', left:'16px', right:'16px', background:'rgba(8,8,16,0.97)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'18px', padding:'16px' }} onClick={e => e.stopPropagation()}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px 16px', borderRadius:'12px', textDecoration:'none', color:'rgba(155,155,190,0.88)', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'14px', fontWeight:500 }}>
                <span style={{ fontSize:'18px' }}>{l.emoji}</span>{l.label}
              </Link>
            ))}
            <div style={{ height:'1px', background:'rgba(255,255,255,0.05)', margin:'8px 0' }}/>
            <Link href="/checkout" onClick={() => setOpen(false)}
              className="g-btn g-btn-gold" style={{ width:'100%', justifyContent:'center', borderRadius:'12px', marginTop:'4px' }}>
              🛒 Carrello {itemCount > 0 && `(${itemCount})`}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
