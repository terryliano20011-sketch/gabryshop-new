'use client'
import { useEffect, useRef } from 'react'

export default function Effects() {
  const cursorDotRef  = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  /* ══ 1. CUSTOM CURSOR ══ */
  useEffect(() => {
    const dot  = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring || window.matchMedia('(hover:none)').matches) return
    let mx=0,my=0,rx=0,ry=0,raf:number
    const move = (e:MouseEvent)=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-3}px,${my-3}px)`;dot.style.opacity='1';ring.style.opacity='1'}
    const tick = ()=>{rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;raf=requestAnimationFrame(tick)}
    const over = ()=>{ring.style.width='48px';ring.style.height='48px';ring.style.borderColor='rgba(201,169,110,0.8)';ring.style.background='rgba(201,169,110,0.08)'}
    const out = ()=>{ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(201,169,110,0.3)';ring.style.background='transparent'}
    document.addEventListener('mousemove',move)
    document.querySelectorAll('a,button,[role=button]').forEach(el=>{el.addEventListener('mouseenter',over);el.addEventListener('mouseleave',out)})
    raf=requestAnimationFrame(tick)
    return()=>{document.removeEventListener('mousemove',move);cancelAnimationFrame(raf)}
  },[])

  /* ══ 2. SCROLL REVEAL con stagger ══ */
  useEffect(() => {
    const run = () => {
      document.querySelectorAll<HTMLElement>('.sr:not(.sr-done),.sr-left:not(.sr-done),.sr-right:not(.sr-done)').forEach(el=>{
        const delay = Number(el.dataset.delay || 0)
        const io = new IntersectionObserver(([e])=>{
          if (!e.isIntersecting) return
          setTimeout(()=>{el.style.opacity='1';el.style.transform='translate(0,0) scale(1)'}, delay)
          el.classList.add('sr-done')
          io.disconnect()
        },{threshold:0.1})
        io.observe(el)
      })
    }
    run()
    setTimeout(run,500)
  },[])

  /* ══ 3. COUNTER ANIMATION ══ */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach(el=>{
      const io = new IntersectionObserver(([e])=>{
        if (!e.isIntersecting) return
        const target = parseFloat(el.dataset.counter||'0')
        const suffix = el.dataset.counterSuffix||''
        const prefix = el.dataset.counterPrefix||''
        const dur = 2200; const start = performance.now()
        const tick = (now:number)=>{
          const p = Math.min((now-start)/dur, 1)
          const ease = 1-Math.pow(1-p,4)
          el.textContent = prefix + Math.round(target*ease) + suffix
          if (p<1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      },{threshold:0.5})
      io.observe(el)
    })
  },[])

  /* ══ 4. TYPEWRITER ══ */
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-typewriter]')
    if (!el) return
    const words = (el.dataset.typewriter||'').split(',')
    if (!words.length) return
    let wi=0,ci=0,deleting=false
    const type = () => {
      const word = words[wi]
      if (!deleting) {
        el.textContent = word.slice(0,ci+1); ci++
        if (ci===word.length) { deleting=true; setTimeout(type,2000); return }
      } else {
        el.textContent = word.slice(0,ci-1); ci--
        if (ci===0) { deleting=false; wi=(wi+1)%words.length }
      }
      setTimeout(type, deleting?40:100)
    }
    setTimeout(type,1500)
  },[])

  /* ══ 5. TEXT SCRAMBLE ══ */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-scramble]').forEach(el => {
      const original = el.textContent||''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%'
      let frame = 0
      let rafId: number
      const scramble = () => {
        let result = ''
        for (let i=0; i<original.length; i++) {
          if (original[i]===' ') { result+=' '; continue }
          if (frame/2>i) result += original[i]
          else result += chars[Math.floor(Math.random()*chars.length)]
        }
        el.textContent = result
        frame++
        if (frame < original.length*2) rafId = requestAnimationFrame(scramble)
        else el.textContent = original
      }
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        frame = 0
        scramble()
        io.disconnect()
      }, { threshold:0.5 })
      io.observe(el)
    })
  },[])

  /* ══ 6. RIPPLE CLICK ══ */
  useEffect(() => {
    const handler = (e:MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.g-btn-gold') as HTMLElement
      if (!btn) return
      const r = btn.getBoundingClientRect()
      const rip = document.createElement('span')
      const size = Math.max(r.width, r.height) * 2.2
      rip.style.cssText = `position:absolute;border-radius:50%;pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;background:rgba(255,255,255,0.25);transform:scale(0);animation:ripple .6s ease-out forwards;`
      btn.appendChild(rip)
      setTimeout(() => rip.remove(), 650)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  },[])

  /* ══ 7. PARALLAX + FADE HERO ══ */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const hero = document.querySelector<HTMLElement>('.hero-parallax')
      if (hero) {
        hero.style.opacity = String(Math.max(0, 1 - y/550))
        hero.style.transform = `translateY(${y*0.18}px)`
      }
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.parallax || '0.1')
        el.style.transform = `translateY(${y*speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  /* ══ 8. MAGNETIC BUTTONS ══ */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.g-btn-gold').forEach(btn => {
      btn.addEventListener('mousemove', (e:any) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX-r.left-r.width/2)*0.25
        const y = (e.clientY-r.top-r.height/2)*0.25
        btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`
      })
      btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
    })
  },[])

  /* ══ 9. CARD TILT 3D ══ */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.g-card').forEach(card => {
      card.addEventListener('mousemove', (e:any) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX-r.left)/r.width - 0.5
        const y = (e.clientY-r.top)/r.height - 0.5
        card.style.transform = `perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateZ(6px)`
      })
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
        card.style.transform = ''
        setTimeout(() => { card.style.transition = '' }, 600)
      })
    })
  },[])



  useEffect(() => {
    const div = document.createElement('div')
    div.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9994;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,0.55) 100%);'
    document.body.appendChild(div)
    return () => div.remove()
  },[])

  /* ══ 12. NAVBAR SCROLL FX ══ */
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector<HTMLElement>('header')
      if (!nav) return
      if (window.scrollY > 30) {
        nav.style.background = 'rgba(3,3,9,0.88)'
        nav.style.backdropFilter = 'blur(32px) saturate(180%)'
        nav.style.borderBottom = '1px solid rgba(201,169,110,0.1)'
        nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
      } else {
        nav.style.background = 'transparent'
        nav.style.backdropFilter = 'none'
        nav.style.borderBottom = '1px solid transparent'
        nav.style.boxShadow = 'none'
      }
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  /* ══ 13. STAGGER CARDS ══ */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.g-card')
    cards.forEach((card, i) => {
      if (card.dataset.staggered) return
      card.dataset.staggered = '1'
      card.style.opacity = '0'
      card.style.transform = 'translateY(40px)'
      card.style.transition = `opacity 0.7s ease ${i*70}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i*70}ms`
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
        io.disconnect()
      }, { threshold:0.08 })
      io.observe(card)
    })
  },[])

  /* ══ 14. SMOOTH LINK HOVER — underline reveal ══ */
  useEffect(() => {
    const links = document.querySelectorAll<HTMLElement>('nav a, footer a')
    links.forEach(a => {
      const orig = a.style.position
      if (!orig) a.style.position = 'relative'
    })
  },[])

  /* ══ 15. SCROLL PROGRESS BAR ══ */
  useEffect(() => {
    const bar = document.createElement('div')
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#c9a96e,#7c6af0);z-index:99997;transition:width 0.15s ease;pointer-events:none;box-shadow:0 0 8px rgba(201,169,110,0.5)'
    document.body.appendChild(bar)
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      bar.style.width = Math.min(100, scrolled) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => { window.removeEventListener('scroll', onScroll); bar.remove() }
  },[])

  /* ══ 16. BUTTON GLOW FOLLOW (mouse position) ══ */
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.g-btn-gold').forEach(btn => {
      btn.addEventListener('mousemove', (e:any) => {
        const r = btn.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        btn.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22) 0%, transparent 50%), linear-gradient(135deg, #d4a15a, #c9a96e, #b8924a)`
      })
      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundImage = ''
      })
    })
  },[])

  /* ══ 17. SMOOTH ANCHOR SCROLL ══ */
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href')
        if (!href || href === '#') return
        const target = document.querySelector(href)
        if (!target) return
        e.preventDefault()
        target.scrollIntoView({ behavior:'smooth', block:'start' })
      })
    })
  },[])

  return (
    <>
      <div ref={cursorDotRef} style={{position:'fixed',top:0,left:0,zIndex:99999,pointerEvents:'none',width:'6px',height:'6px',borderRadius:'50%',background:'#c9a96e',boxShadow:'0 0 12px rgba(201,169,110,0.6)',opacity:0,transition:'opacity 0.3s'}} className="hidden-mobile"/>
      <div ref={cursorRingRef} style={{position:'fixed',top:0,left:0,zIndex:99998,pointerEvents:'none',width:'36px',height:'36px',borderRadius:'50%',border:'1px solid rgba(201,169,110,0.3)',opacity:0,transition:'width .3s,height .3s,border-color .3s,background .3s,opacity .3s'}} className="hidden-mobile"/>
    </>
  )
}
