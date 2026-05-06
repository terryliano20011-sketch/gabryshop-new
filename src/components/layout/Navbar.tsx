'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const links = [
  { href:'/categoria/ristorazione',  label:'Ristorazione',  emoji:'🍽️' },
  { href:'/categoria/locali',        label:'Locali',         emoji:'🎉' },
  { href:'/categoria/bellezza',      label:'Bellezza',       emoji:'💈' },
  { href:'/categoria/sport',         label:'Sport',          emoji:'🏋️' },
  { href:'/categoria/artigiani',     label:'Artigiani',      emoji:'🏠' },
  { href:'/categoria/professionisti',label:'Professionisti', emoji:'⚖️' },
  { href:'/categoria/negozi',        label:'Negozi',         emoji:'🛍️' },
  { href:'/categoria/automazioni',   label:'Automazioni',    emoji:'🤖' },
  { href:'/categoria/business',      label:'Business',       emoji:'📊' },
  { href:'/categoria/creativita',    label:'Creatività',     emoji:'🎨' },
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
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
            {/* Logo SVG ispirato al globo+robot teal */}
            <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#0d1f2d,#1a3a4a)', border:'1.5px solid rgba(0,220,200,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 0 12px rgba(0,200,180,0.15)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Globo */}
                <circle cx="9" cy="11" r="7" stroke="#4dd9c0" strokeWidth="1.2" fill="none" opacity="0.8"/>
                <line x1="2" y1="11" x2="16" y2="11" stroke="#4dd9c0" strokeWidth="0.8" opacity="0.5"/>
                <ellipse cx="9" cy="11" rx="3.5" ry="7" stroke="#4dd9c0" strokeWidth="0.8" fill="none" opacity="0.5"/>
                {/* Robot testa */}
                <rect x="13" y="5" width="7" height="6" rx="1.5" fill="#0d1f2d" stroke="#4dd9c0" strokeWidth="1"/>
                {/* Robot occhi */}
                <circle cx="15" cy="8" r="0.8" fill="#4dd9c0"/>
                <circle cx="18" cy="8" r="0.8" fill="#4dd9c0"/>
                {/* Antenne */}
                <line x1="15" y1="5" x2="15" y2="3.5" stroke="#4dd9c0" strokeWidth="0.8"/>
                <circle cx="15" cy="3" r="0.5" fill="#4dd9c0"/>
                <line x1="18" y1="5" x2="18" y2="3.5" stroke="#4dd9c0" strokeWidth="0.8"/>
                <circle cx="18" cy="3" r="0.5" fill="#4dd9c0"/>
                {/* Circuiti */}
                <line x1="13" y1="9" x2="11" y2="9" stroke="#4dd9c0" strokeWidth="0.7" opacity="0.6"/>
                <circle cx="10.5" cy="9" r="0.5" fill="#4dd9c0" opacity="0.6"/>
              </svg>
            </div>
            <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'18px', fontWeight:800, letterSpacing:'-0.02em', color:'white' }}>
              <span style={{ color:'#4dd9c0' }}>Gabry</span>Shop
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
