import { useRef, useEffect, useCallback } from 'react'

interface ConstellationNode {
  x: number
  y: number
  text: string
  revealed: boolean
}

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  color: string
  drift: number
  vx: number
  vy: number
  radius: number
  angle: number
}

interface Line {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
  width: number
  color: string
  drift: number
}

interface WisdomConstellationProps {
  variant?: 'light' | 'dark'
  quoteNodes?: { text: string }[]
}

export default function WisdomConstellation({
  variant = 'light',
  quoteNodes = [],
}: WisdomConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    scrollV: 0,
    lastScrollY: 0,
    lines: [] as Line[],
    particles: [] as Particle[],
    nodes: [] as ConstellationNode[],
    animationId: 0,
  })

  const colors = variant === 'light'
    ? ['#78866B', '#B07D62', '#B7B7A4']
    : ['#B7B7A4', '#B07D62', '#78866B']

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const state = stateRef.current

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
      }
    }
    resize()

    const w = canvas.width / window.devicePixelRatio
    const h = canvas.height / window.devicePixelRatio

    // Init lines
    state.lines = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.25 + Math.random() * 0.75,
      length: 50 + Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.3,
      width: 0.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.5,
    }))

    // Init particles
    state.particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.25 + Math.random() * 0.75,
      opacity: 0.1 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.5,
      vx: 0,
      vy: 0,
      radius: 1 + Math.random() * 2,
      angle: Math.random() * Math.PI * 2,
    }))

    // Init nodes
    const defaultQuotes = [
      'Knowing yourself is true wisdom',
      'Compassion is biology',
      'Be the change. Literally',
      'Every person is an opportunity',
      'Contemplative living IS social change',
    ]
    const quotes = quoteNodes.length > 0 ? quoteNodes.map(q => q.text) : defaultQuotes
    state.nodes = quotes.map((text, i) => ({
      x: w * 0.15 + (w * 0.7 * i) / Math.max(quotes.length - 1, 1),
      y: h * 0.3 + Math.sin(i * 1.5) * h * 0.2,
      text,
      revealed: false,
    }))

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [colors, quoteNodes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const state = stateRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cleanupResize = init()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      state.mouseX = (e.clientX - rect.left) * window.devicePixelRatio
      state.mouseY = (e.clientY - rect.top) * window.devicePixelRatio
    }

    const handleScroll = () => {
      state.scrollV = Math.abs(window.scrollY - state.lastScrollY)
      state.lastScrollY = window.scrollY
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * window.devicePixelRatio
      const y = (e.clientY - rect.top) * window.devicePixelRatio

      state.nodes.forEach((node) => {
        const dx = x - node.x
        const dy = y - node.y
        if (Math.sqrt(dx * dx + dy * dy) < 40) {
          node.revealed = !node.revealed
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    canvas.addEventListener('click', handleClick)

    const w = () => canvas.width / window.devicePixelRatio
    const h = () => canvas.height / window.devicePixelRatio

    const draw = () => {
      const width = w()
      const height = h()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Mouse drift
      state.mouseX += (state.mouseX - width / 2) * 0.001
      state.mouseY += (state.mouseY - height / 2) * 0.001

      // Draw particles
      state.particles.forEach((p) => {
        p.angle += 0.01
        p.x = (p.x + Math.cos(p.angle) * 0.5 + p.drift + (state.mouseX / window.devicePixelRatio - width / 2) * 0.001)
        p.y = (p.y - p.speed - state.scrollV * 0.1 + Math.sin(p.angle) * 0.5)

        // Wrap
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // Draw lines
      state.lines.forEach((l) => {
        const grad = ctx.createLinearGradient(l.x, l.y, l.x + (Math.random() - 0.5) * 20, l.y - l.length)
        grad.addColorStop(0, l.color)
        grad.addColorStop(1, 'transparent')
        ctx.strokeStyle = grad
        ctx.lineWidth = l.width
        ctx.beginPath()
        ctx.moveTo(l.x, l.y)
        ctx.lineTo(l.x + l.drift, l.y - l.length)
        ctx.stroke()

        l.y -= l.speed + state.scrollV * 0.5
        l.x += l.drift
        if (l.y < -l.length) l.y = height + l.length
        if (l.x < 0) l.x = width
        if (l.x > width) l.x = 0
      })

      // Damp scroll velocity
      state.scrollV *= 0.95

      // Draw nodes
      state.nodes.forEach((node) => {
        // Base ring
        ctx.strokeStyle = variant === 'light' ? 'rgba(120, 134, 107, 0.3)' : 'rgba(183, 183, 164, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
        ctx.stroke()

        if (node.revealed) {
          // Connection lines
          ctx.strokeStyle = variant === 'light' ? 'rgba(176, 125, 98, 0.6)' : 'rgba(176, 125, 98, 0.8)'
          ctx.lineWidth = 1.5
          state.lines.filter((_, i) => i % 2 === 0).forEach((l) => {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(l.x, l.y)
            ctx.stroke()
          })

          // Quote card
          ctx.fillStyle = variant === 'light' ? 'rgba(245, 243, 238, 0.9)' : 'rgba(58, 74, 63, 0.9)'
          ctx.shadowColor = 'rgba(58, 74, 63, 0.1)'
          ctx.shadowBlur = 10
          const cardW = Math.min(200, node.text.length * 8 + 40)
          ctx.fillRect(node.x - cardW / 2, node.y + 30, cardW, 50)
          ctx.shadowBlur = 0

          // Text
          ctx.fillStyle = variant === 'light' ? '#3A4A3F' : '#F5F3EE'
          ctx.font = '14px "Source Sans 3", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(node.text, node.x, node.y + 60)
        }
      })

      ctx.restore()
      state.animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(state.animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      canvas.removeEventListener('click', handleClick)
      if (cleanupResize) cleanupResize()
    }
  }, [init, variant])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'pointer' }}
    />
  )
}
