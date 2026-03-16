import { useEffect, useRef } from 'react'

const STAR_COUNT = 220

export default function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let stars = []

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.55 + 0.15,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
        phase: Math.random() * Math.PI * 2,
        // 85% white-blue stars, 15% cyan accent
        hue: Math.random() < 0.15 ? 185 : 220,
        sat: Math.random() < 0.15 ? 80 : 30,
      }))
    }

    init()
    window.addEventListener('resize', init)

    let t = 0
    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of stars) {
        const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed * 60 + s.phase) * 0.22
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, ${s.sat}%, 88%, ${Math.max(0.04, alpha)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
