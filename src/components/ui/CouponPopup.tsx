'use client'
import { useState, useEffect } from 'react'
import { X, Tag, Copy, Check } from 'lucide-react'

const COUPONS = [
  { code: 'GABRY10', label: '10% di sconto', desc: 'Su tutto il catalogo', color: '#c9a96e' },
  { code: 'WELCOME5', label: '€5 di sconto', desc: 'Ordine minimo €15', color: '#7c6af0' },
]

export default function CouponPopup() {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    // Mostra dopo 8 secondi, solo se non già visto in questa sessione
    const seen = sessionStorage.getItem('coupon_popup_seen')
    if (seen) return
    const t = setTimeout(() => setVisible(true), 8000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setVisible(false)
    sessionStorage.setItem('coupon_popup_seen', '1')
  }

  const copy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99990,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '24px', animation: 'fadeIn 0.3s ease'
    }} onClick={close}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0d0d18',
        border: '1px solid rgba(201,169,110,0.2)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '420px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)'
      }}>

        {/* Close */}
        <button onClick={close} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.06)', border: 'none',
          borderRadius: '50%', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(150,150,185,0.7)'
        }}><X size={15}/></button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎁</div>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            color: 'white', fontSize: '1.7rem', fontWeight: 600,
            marginBottom: '6px', lineHeight: 1.1
          }}>Coupon esclusivi</h3>
          <p style={{
            fontFamily: 'Outfit, system-ui, sans-serif',
            color: 'rgba(140,140,175,0.75)', fontSize: '13px', lineHeight: 1.6
          }}>
            Usa uno di questi codici al checkout<br/>e risparmia sul tuo primo ordine!
          </p>
        </div>

        {/* Coupons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {COUPONS.map(coupon => (
            <div key={coupon.code} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${coupon.color}22`,
              borderRadius: '14px', gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${coupon.color}12`, border: `1px solid ${coupon.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Tag size={16} style={{ color: coupon.color }}/>
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    color: 'white', fontSize: '14px', fontWeight: 700,
                    letterSpacing: '0.05em', marginBottom: '2px'
                  }}>{coupon.code}</div>
                  <div style={{
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    color: coupon.color, fontSize: '12px', fontWeight: 600
                  }}>{coupon.label} <span style={{ color: 'rgba(120,120,155,0.6)', fontWeight: 400 }}>· {coupon.desc}</span></div>
                </div>
              </div>
              <button onClick={() => copy(coupon.code)} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '7px 12px', borderRadius: '8px',
                background: copied === coupon.code ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${copied === coupon.code ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.1)'}`,
                color: copied === coupon.code ? '#4ade80' : 'rgba(180,180,210,0.8)',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Outfit, system-ui, sans-serif',
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}>
                {copied === coupon.code ? <><Check size={12}/> Copiato!</> : <><Copy size={12}/> Copia</>}
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={close} style={{
          width: '100%', padding: '14px',
          background: 'linear-gradient(135deg, #c9a96e, #b8924a)',
          color: '#08060a', fontFamily: 'Outfit, system-ui, sans-serif',
          fontSize: '14px', fontWeight: 700, border: 'none',
          borderRadius: '12px', cursor: 'pointer'
        }}>
          Scopri i prodotti →
        </button>

        <p style={{
          textAlign: 'center', marginTop: '12px',
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontSize: '11px', color: 'rgba(100,100,135,0.5)'
        }}>
          Validi su tutto il catalogo · Nessuna scadenza
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>
    </div>
  )
}
