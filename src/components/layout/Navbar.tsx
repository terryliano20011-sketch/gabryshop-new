'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Chiudi dropdown cliccando fuori
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <>
      <header
        className={scrolled ? 'g-nav' : ''}
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, transition:'all 0.4s ease', padding: scrolled ? '10px 0' : '22px 0' }}
      >
        <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'0 5%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}>
            <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#0d1f2d,#1a3a4a)', border:'1.5px solid rgba(0,220,200,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 0 12px rgba(0,200,180,0.15)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="9" cy="11" r="7" stroke="#4dd9c0" strokeWidth="1.2" fill="none" opacity="0.8"/>
                <line x1="2" y1="11" x2="16" y2="11" stroke="#4dd9c0" strokeWidth="0.8" opacity="0.5"/>
                <ellipse cx="9" cy="11" rx="3.5" ry="7" stroke="#4dd9c0" strokeWidth="0.8" fill="none" opacity="0.5"/>
                <rect x="13" y="5" width="7" height="6" rx="1.5" fill="#0d1f2d" stroke="#4dd9c0" strokeWidth="1"/>
                <circle cx="15" cy="8" r="0.8" fill="#4dd9c0"/>
                <circle cx="18" cy="8" r="0.8" fill="#4dd9c0"/>
                <line x1="15" y1="5" x2="15" y2="3.5" stroke="#4dd9c0" strokeWidth="0.8"/>
                <circle cx="15" cy="3" r="0.5" fill="#4dd9c0"/>
                <line x1="18" y1="5" x2="18" y2="3.5" stroke="#4dd9c0" strokeWidth="0.8"/>
                <circle cx="18" cy="3" r="0.5" fill="#4dd9c0"/>
                <line x1="13" y1="9" x2="11" y2="9" stroke="#4dd9c0" strokeWidth="0.7" opacity="0.6"/>
                <circle cx="10.5" cy="9" r="0.5" fill="#4dd9c0" opacity="0.6"/>
              </svg>
            </div>
            <span style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'18px', fontWeight:800, letterSpacing:'-0.02em', color:'white' }}>
              <span style={{ color:'#4dd9c0' }}>Gabry</span>Shop
            </span>
          </Link>

          {/* Desktop — tendina categorie */}
          <div ref={dropdownRef} style={{ position:'relative' }}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'10px 18px', borderRadius:'100px',
                background: dropdownOpen ? 'rgba(77,217,192,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${dropdownOpen ? 'rgba(77,217,192,0.3)' : 'rgba(255,255,255,0.08)'}`,
                color: dropdownOpen ? '#4dd9c0' : 'rgba(200,200,220,0.8)',
                fontFamily:'Outfit,system-ui,sans-serif', fontSize:'14px', fontWeight:600,
                cursor:'pointer', transition:'all 0.25s ease',
                letterSpacing:'0.01em',
              }}
            >
              Categorie
              <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.25s ease' }}/>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div style={{
                position:'absolute', top:'calc(100% + 10px)', left:'50%', transform:'translateX(-50%)',
                background:'rgba(8,8,18,0.98)', backdropFilter:'blur(24px)',
                border:'1px solid rgba(255,255,255,0.08)', borderRadius:'18px',
                padding:'10px', minWidth:'240px',
                boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                zIndex:100,
                animation:'dropdownIn 0.2s cubic-bezier(0.16,1,0.3,1)',
              }}>
                {links.map((l, i) => (
                  <Link key={l.href} href={l.href}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display:'flex', alignItems:'center', gap:'12px',
                      padding:'11px 14px', borderRadius:'10px',
                      textDecoration:'none', color:'rgba(180,180,210,0.85)',
                      fontFamily:'Outfit,system-ui,sans-serif', fontSize:'13px', fontWeight:500,
                      transition:'all 0.15s ease',
                      borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(77,217,192,0.07)'; (e.currentTarget as HTMLElement).style.color = '#4dd9c0' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(180,180,210,0.85)' }}
                  >
                    <span style={{ fontSize:'18px', width:'24px', textAlign:'center' }}>{l.emoji}</span>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            <Link href="/account" style={{ padding:'9px', borderRadius:'10px', color:'rgba(135,135,170,0.7)', display:'flex', alignItems:'center', textDecoration:'none' }}>
              <User size={17}/>
            </Link>
            <Link href="/checkout" style={{ position:'relative', padding:'9px', borderRadius:'10px', color:'rgba(135,135,170,0.7)', display:'flex', alignItems:'center', textDecoration:'none' }}>
              <ShoppingCart size={17}/>
              {itemCount > 0 && (
                <span style={{ position:'absolute', top:'-2px', right:'-2px', width:'17px', height:'17px', borderRadius:'50%', background:'#4dd9c0', color:'#08060a', fontSize:'10px', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {itemCount}
                </span>
              )}
            </Link>
            {/* Hamburger mobile */}
            <button onClick={() => setMobileOpen(v => !v)}
              style={{ padding:'9px', borderRadius:'10px', color:'rgba(135,135,170,0.7)', background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}>
              {mobileOpen ? <X size={17}/> : <Menu size={17}/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={() => setMobileOpen(false)}>
          <div style={{ position:'absolute', inset:0, background:'rgba(2,2,8,0.92)', backdropFilter:'blur(14px)' }}/>
          <div style={{ position:'absolute', top:'72px', left:'16px', right:'16px', background:'rgba(8,8,16,0.98)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'18px', padding:'12px', maxHeight:'80vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:'Outfit,system-ui,sans-serif', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(120,120,155,0.5)', padding:'10px 16px 6px' }}>Categorie</div>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 16px', borderRadius:'12px', textDecoration:'none', color:'rgba(155,155,190,0.88)', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'14px', fontWeight:500 }}>
                <span style={{ fontSize:'18px' }}>{l.emoji}</span>{l.label}
              </Link>
            ))}
            <div style={{ height:'1px', background:'rgba(255,255,255,0.05)', margin:'8px 0' }}/>
            <Link href="/checkout" onClick={() => setMobileOpen(false)}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'14px', borderRadius:'12px', background:'linear-gradient(135deg,#4dd9c0,#1a9e88)', color:'#000', fontFamily:'Outfit,system-ui,sans-serif', fontSize:'14px', fontWeight:700, textDecoration:'none', marginTop:'4px' }}>
              🛒 Carrello {itemCount > 0 && `(${itemCount})`}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity:0; transform:translateX(-50%) translateY(-8px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}
