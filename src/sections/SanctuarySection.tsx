import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SanctuarySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.sanctuary-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  // Sand animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    const grains: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Init sand grains
    for (let i = 0; i < 300; i++) {
      grains.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      grains.forEach((g) => {
        const dx = g.x - mx
        const dy = g.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          g.vx += (dx / dist) * force * 0.5
          g.vy += (dy / dist) * force * 0.5
        }
      })
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      grains.forEach((g) => {
        g.x += g.vx
        g.y += g.vy
        g.vx *= 0.98
        g.vy *= 0.98

        // Wrap
        if (g.x < 0) g.x = canvas.width
        if (g.x > canvas.width) g.x = 0
        if (g.y < 0) g.y = canvas.height
        if (g.y > canvas.height) g.y = 0

        ctx.globalAlpha = g.opacity
        ctx.fillStyle = '#B7B7A4'
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sanctuary"
      className="relative w-full min-h-screen py-24 md:py-36 bg-mist overflow-hidden"
    >
      {/* Sand canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="sanctuary-title text-center">
          <h2 className="font-display text-5xl md:text-6xl text-deep-moss mb-6">
            Sanctuary
          </h2>
          <p className="font-body text-xl text-deep-moss/60 max-w-lg mx-auto mb-4">
            Pure play. No objective. No score.
          </p>
          <p className="font-body text-base text-deep-moss/40 max-w-md mx-auto">
            Move your cursor through the sand. Watch the grains scatter and settle.
            Everything responds. Nothing is required.
          </p>

          {/* Decorative elements */}
          <div className="mt-16 flex justify-center gap-8 opacity-40">
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-sage">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-clay">
              <path d="M16 4l4 8 8 1-6 6 1.5 8L16 22l-7.5 5L10 19 4 13l8-1z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-sage">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
