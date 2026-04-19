'use client'
import { useEffect, useRef } from 'react'

export default function Effects() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'rgba(201,169,110,0.8)'
      ring.style.background = 'rgba(201,169,110,0.06)'
    }
    const onLeaveLink = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(201,169,110,0.35)'
      ring.style.background = 'transparent'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    raf = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // ── Scroll reveal ──
  useEffect(() => {
    const els = document.querySelectorAll('.sr')
    if (!els.length) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const delay = el.dataset.delay || '0'
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) scale(1)'
          }, Number(delay))
          io.unobserve(el)
        }
      })
    }, { threshold: 0.12 })

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ── Counter animation ──
  useEffect(() => {
    const counters = document.querySelectorAll('[data-counter]')
    if (!counters.length) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        const target = parseFloat(el.dataset.counter || '0')
        const isPercent = el.dataset.counterSuffix === '%'
        const isPlus = el.dataset.counterPrefix === '+'
        const duration = 1800
        const start = performance.now()

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          const val = Math.round(target * ease)
          el.textContent = (isPlus ? '+' : '') + val + (isPercent ? '%' : (el.dataset.counterSuffix || ''))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.unobserve(el)
      })
    }, { threshold: 0.5 })

    counters.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ── Parallax hero ──
  useEffect(() => {
    const hero = document.querySelector('.hero-parallax') as HTMLElement
    if (!hero) return

    const onScroll = () => {
      const y = window.scrollY
      hero.style.transform = `translateY(${y * 0.15}px)`
      hero.style.opacity = String(1 - y / 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Magnetic buttons ──
  useEffect(() => {
    const btns = document.querySelectorAll('.g-btn-gold')
    btns.forEach(btn => {
      const el = btn as HTMLElement
      el.addEventListener('mousemove', (e: any) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-1px)`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = ''
      })
    })
  }, [])

  return (
    <>
      {/* Custom cursor — solo desktop */}
      <div ref={cursorDotRef} style={{
        position:'fixed', top:0, left:0, zIndex:99999, pointerEvents:'none',
        width:'6px', height:'6px', borderRadius:'50%',
        background:'#c9a96e',
        transform:'translate(-50%,-50%)',
        transition:'opacity 0.2s',
        marginLeft:'-3px', marginTop:'-3px',
      }} className="hidden-mobile"/>
      <div ref={cursorRingRef} style={{
        position:'fixed', top:0, left:0, zIndex:99998, pointerEvents:'none',
        width:'32px', height:'32px', borderRadius:'50%',
        border:'1px solid rgba(201,169,110,0.35)',
        transform:'translate(-50%,-50%)',
        transition:'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        marginLeft:'-16px', marginTop:'-16px',
      }} className="hidden-mobile"/>
    </>
  )
}
