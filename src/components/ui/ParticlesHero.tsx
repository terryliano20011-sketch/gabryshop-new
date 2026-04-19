'use client'
import { useEffect, useRef } from 'react'

export default function ParticlesHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let raf: number

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.6 + 0.2,
    }))

    let mx = W / 2, my = H / 2
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMouse)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) { p.vx += dx / dist * 0.01; p.vy += dy / dist * 0.01 }
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${p.a * 0.3})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201,169,110,${(1 - d / 110) * 0.07})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  )
}
