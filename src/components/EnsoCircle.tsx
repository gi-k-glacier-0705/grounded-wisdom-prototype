import { useRef, useEffect, useCallback } from 'react'

export default function EnsoCircle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isHovered = useRef(false)
  const progress = useRef(0)
  const rafId = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 200
    canvas.width = size * 2
    canvas.height = size * 2
    ctx.scale(2, 2)

    ctx.clearRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const radius = 70

    if (isHovered.current && progress.current < 1) {
      progress.current += 0.02
    } else if (!isHovered.current && progress.current > 0) {
      progress.current -= 0.03
    }

    progress.current = Math.max(0, Math.min(1, progress.current))

    if (progress.current > 0) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress.current)
      ctx.strokeStyle = '#3A4A3F'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.stroke()

      // Brush stroke effect - thicker at start, thinner at end
      const gradient = ctx.createRadialGradient(centerX, centerY, radius - 5, centerX, centerY, radius + 5)
      gradient.addColorStop(0, 'rgba(58, 74, 63, 0)')
      gradient.addColorStop(0.5, `rgba(58, 74, 63, ${0.1 * progress.current})`)
      gradient.addColorStop(1, 'rgba(58, 74, 63, 0)')

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 12
      ctx.stroke()
    }

    // Static faint circle when not hovered
    if (progress.current < 0.1) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(58, 74, 63, 0.15)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([])
    }

    rafId.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    rafId.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId.current)
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="w-[200px] h-[200px] cursor-pointer"
      style={{ width: '200px', height: '200px' }}
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
      data-cursor-hover
    />
  )
}
