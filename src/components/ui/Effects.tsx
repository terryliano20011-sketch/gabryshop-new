'use client'
import { useEffect, useRef } from 'react'

export default function Effects() {
  const cursorDotRef  = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  /* ── 1. CUSTOM CURSOR ── */
  useEffect(() => {
    const dot  = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return
    if (window.matchMedia('(hover:none)').matches) return

    let mx = 0, my = 0, rx = 0, ry = 0, raf: number
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx - 16}px,${ry - 16}px)`
      raf = requestAnimationFrame(tick)
    }
    const over = () => {
      ring.style.width = '44px'; ring.style.height = '44px'
      ring.style.borderColor = 'rgba(201,169,110,0.8)'
      ring.style.background = 'rgba(201,169,110,0.06)'
    }
    const out = () => {
      ring.style.width = '32px'; ring.style.height = '32px'
      ring.style.borderColor = 'rgba(201,169,110,0.3)'
      ring.style.background = 'transparent'
    }
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[role=button]').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  /* ── 2. SCROLL REVEAL ── */
  useEffect(() => {
    const run = () => {
      document.querySelectorAll<HTMLElement>('.sr:not(.sr-done)').forEach(el => {
        const delay = Number(el.dataset.delay || 0)
        const io = new IntersectionObserver(([e]) => {
          if (!e.isIntersecting) return
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) scale(1)'
          }, delay)
          el.classList.add('sr-done')
          io.disconnect()
        }, { threshold: 0.1 })
        io.observe(el)
      })
    }
    run()
    setTimeout(run, 500)
  }, [])

  /* ── 3. COUNTER ANIMATION ── */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach(el => {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        const target = parseFloat(el.dataset.counter || '0')
        const suffix = el.dataset.counterSuffix || ''
        const prefix = el.dataset.counterPrefix || ''
        const dur = 2000; const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 4)
          el.textContent = prefix + Math.round(target * ease) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      }, { threshold: 0.5 })
      io.observe(el)
    })
  }, [])

  /* ── 4. TEXT SCRAMBLE su headline ── */
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-scramble]')
    if (!el) return
    const original = el.textContent || ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    let frame = 0
    let rafId: number
    const scramble = () => {
      let result = ''
      for (let i = 0; i < original.length; i++) {
        if (original[i] === ' ') { result += ' '; continue }
        if (frame / 2 > i) {
          result += original[i]
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      el.textContent = result
      frame++
      if (frame < original.length * 2) {
        rafId = requestAnimationFrame(scramble)
      } else {
        el.textContent = original
      }
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      frame = 0
      scramble()
      io.disconnect()
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { cancelAnimationFrame(rafId); io.disconnect() }
  }, [])

  /* ── 5. TYPEWRITER ── */
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-typewriter]')
    if (!el) return
    const words = (el.dataset.typewriter || '').split(',')
    if (!words.length) return
    let wi = 0, ci = 0, deleting = false
    const type = () => {
      const word = words[wi]
      if (!deleting) {
        el.textContent = word.slice(0, ci + 1)
        ci++
        if (ci === word.length) { deleting = true; setTimeout(type, 1800); return }
      } else {
        el.textContent = word.slice(0, ci - 1)
        ci--
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length }
      }
      setTimeout(type, deleting ? 50 : 100)
    }
    setTimeout(type, 1400)
  }, [])

  /* ── 6. RIPPLE sui bottoni ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.g-btn-gold') as HTMLElement
      if (!btn) return
      const r = btn.getBoundingClientRect()
      const rip = document.createElement('span')
      const size = Math.max(r.width, r.height) * 2
      rip.style.cssText = `position:absolute;border-radius:50%;pointer-events:none;
        width:${size}px;height:${size}px;
        left:${e.clientX - r.left - size / 2}px;
        top:${e.clientY - r.top - size / 2}px;
        background:rgba(255,255,255,0.18);
        transform:scale(0);animation:ripple .55s ease-out forwards;`
      btn.appendChild(rip)
      setTimeout(() => rip.remove(), 600)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  /* ── 7. PARALLAX hero ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const hero = document.querySelector<HTMLElement>('.hero-parallax')
      if (hero) {
        hero.style.opacity = String(Math.max(0, 1 - y / 500))
        hero.style.transform = `translateY(${y * 0.12}px)`
      }
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.parallax || '0.1')
        el.style.transform = `translateY(${y * speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── 8. MAGNETIC BUTTONS ── */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.g-btn-gold').forEach(btn => {
      btn.addEventListener('mousemove', (e: any) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width / 2) * 0.2
        const y = (e.clientY - r.top - r.height / 2) * 0.2
        btn.style.transform = `translate(${x}px,${y}px) translateY(-1px)`
      })
      btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
    })
  }, [])

  /* ── 9. CARD TILT 3D ── */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.g-card').forEach(card => {
      card.addEventListener('mousemove', (e: any) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(4px)`
      })
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
        card.style.transform = ''
        setTimeout(() => { card.style.transition = '' }, 500)
      })
    })
  }, [])

  /* ── 10. GLOW TRAIL del mouse ── */
  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return
    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9997;'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const trail: {x:number,y:number,a:number}[] = []
    let mx = -200, my = -200, raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      trail.push({ x: mx, y: my, a: 0.12 })
      if (trail.length > 22) trail.shift()
      trail.forEach((p, i) => {
        const size = (i / trail.length) * 18
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${(i / trail.length) * 0.045})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      canvas.remove()
    }
  }, [])

  /* ── 11. NOISE VIGNETTE animate ── */
  useEffect(() => {
    const div = document.createElement('div')
    div.style.cssText = `
      position:fixed;inset:0;pointer-events:none;z-index:9996;
      background:radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%);
    `
    document.body.appendChild(div)
    return () => div.remove()
  }, [])

  /* ── 12. NAVBAR scroll color ── */
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector<HTMLElement>('header')
      if (!nav) return
      if (window.scrollY > 20) {
        nav.style.background = 'rgba(5,5,10,0.88)'
        nav.style.backdropFilter = 'blur(28px)'
        nav.style.borderBottom = '1px solid rgba(201,169,110,0.08)'
        nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.35)'
      } else {
        nav.style.background = 'transparent'
        nav.style.backdropFilter = 'none'
        nav.style.borderBottom = '1px solid transparent'
        nav.style.boxShadow = 'none'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── 13. STAGGER cards on load ── */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.g-card')
    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = `opacity 0.6s ease ${i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
        io.disconnect()
      }, { threshold: 0.08 })
      io.observe(card)
    })
  }, [])

  return (
    <>
      <div ref={cursorDotRef}  style={{position:'fixed',top:0,left:0,zIndex:99999,pointerEvents:'none',width:'6px',height:'6px',borderRadius:'50%',background:'#c9a96e',opacity:0,transition:'opacity 0.3s'}} className="hidden-mobile"/>
      <div ref={cursorRingRef} style={{position:'fixed',top:0,left:0,zIndex:99998,pointerEvents:'none',width:'32px',height:'32px',borderRadius:'50%',border:'1px solid rgba(201,169,110,0.3)',opacity:0,transition:'width .3s,height .3s,border-color .3s,background .3s,opacity .3s'}} className="hidden-mobile"/>
    </>
  )
}
