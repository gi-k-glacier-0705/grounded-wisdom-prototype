import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MeditationFog from '../components/MeditationFog'

gsap.registerPlugin(ScrollTrigger)

interface Star {
  id: number
  x: number
  y: number
  principle: string
  connected: boolean
}

const PRINCIPLES = [
  "Don't assume what a community needs. Ask its members.",
  'Grassroots community development starts with listening.',
  'Anti-racism is a practice, not a destination.',
  'Self-care is activist infrastructure.',
  'Radical pedagogy transforms consciousness.',
  'Speaking truth against manipulation is resistance.',
  'Corporate accountability requires collective action.',
  'No single light illuminates the sky. Together they become navigation.',
]

export default function ActivismSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [connections, setConnections] = useState<{ from: number; to: number }[]>([])
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.activism-title', {
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

  // Generate stars
  useEffect(() => {
    const newStars: Star[] = PRINCIPLES.map((principle, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 60,
      principle,
      connected: false,
    }))
    setStars(newStars)
  }, [])

  // Canvas animation for constellation lines
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((conn) => {
        const from = stars[conn.from]
        const to = stars[conn.to]
        if (!from || !to) return

        const fx = (from.x / 100) * canvas.width
        const fy = (from.y / 100) * canvas.height
        const tx = (to.x / 100) * canvas.width
        const ty = (to.y / 100) * canvas.height

        const grad = ctx.createLinearGradient(fx, fy, tx, ty)
        grad.addColorStop(0, 'rgba(176, 125, 98, 0.6)')
        grad.addColorStop(1, 'rgba(120, 134, 107, 0.4)')

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(fx, fy)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        // Glow effect
        ctx.strokeStyle = 'rgba(176, 125, 98, 0.15)'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.moveTo(fx, fy)
        ctx.lineTo(tx, ty)
        ctx.stroke()
      })

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [connections, stars])

  const handleStarClick = useCallback((clickedId: number) => {
    setStars((prev) =>
      prev.map((s) => (s.id === clickedId ? { ...s, connected: true } : s))
    )

    // Connect to nearest unconnected star
    setConnections((prev) => {
      const clicked = stars[clickedId]
      if (!clicked) return prev

      let nearest = -1
      let minDist = Infinity
      stars.forEach((s) => {
        if (s.id !== clickedId && !s.connected) {
          const dist = Math.sqrt(
            Math.pow(s.x - clicked.x, 2) + Math.pow(s.y - clicked.y, 2)
          )
          if (dist < minDist) {
            minDist = dist
            nearest = s.id
          }
        }
      })

      if (nearest >= 0) {
        return [...prev, { from: clickedId, to: nearest }]
      }
      return prev
    })
  }, [stars])

  const connectedCount = stars.filter((s) => s.connected).length

  return (
    <section
      ref={sectionRef}
      id="activism"
      className="relative w-full min-h-screen py-24 md:py-36 overflow-hidden"
    >
      <MeditationFog />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="activism-title text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-bio-white mb-4">
            Constellation Builder
          </h2>
          <p className="font-body text-lg text-bio-white/60 max-w-lg mx-auto">
            Click the stars to connect them. Each light reveals a principle of collective action.
          </p>
          <p className="font-body text-sm text-sage mt-4">
            {connectedCount} of {stars.length} stars connected
          </p>
        </div>

        {/* Interactive constellation area */}
        <div className="relative h-[500px] md:h-[600px]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {stars.map((star) => (
            <button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              className="absolute group"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              data-cursor-hover
            >
              {/* Star glow */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  star.connected ? 'bg-clay/30 scale-150' : 'bg-sage/10 scale-100'
                }`}
                style={{
                  width: '40px',
                  height: '40px',
                  marginLeft: '-8px',
                  marginTop: '-8px',
                }}
              />
              {/* Star dot */}
              <div
                className={`w-6 h-6 rounded-full transition-all duration-300 ${
                  star.connected
                    ? 'bg-clay shadow-[0_0_15px_rgba(176,125,98,0.6)]'
                    : 'bg-sage/60 hover:bg-sage'
                }`}
              />
              {/* Tooltip */}
              {star.connected && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-8 w-48 p-3 bg-parchment/90 rounded-lg pointer-events-none"
                  style={{ animation: 'fadeInUp 0.3s ease-out' }}
                >
                  <p className="font-display text-sm text-deep-moss text-center">
                    {star.principle}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Message */}
        {connectedCount === stars.length && stars.length > 0 && (
          <div className="text-center mt-8" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <p className="font-display text-2xl text-bio-white">
              "No single light illuminates the sky. Together they become navigation."
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
