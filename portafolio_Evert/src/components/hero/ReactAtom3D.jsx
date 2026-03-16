import { useEffect, useRef, useState } from 'react'
import { FaJava, FaReact } from 'react-icons/fa'
import { SiJavascript, SiNodedotjs, SiSharp, SiTailwindcss, SiVuedotjs } from 'react-icons/si'

const TECHS = [
  { label: 'React',      Icon: FaReact,       color: '#67e8f9' },
  { label: 'JavaScript', Icon: SiJavascript,  color: '#fde047' },
  { label: 'Node.js',    Icon: SiNodedotjs,   color: '#86efac' },
  { label: 'Vue',        Icon: SiVuedotjs,    color: '#34d399' },
  { label: 'Java',       Icon: FaJava,        color: '#f59e0b' },
  { label: 'C#',         Icon: SiSharp,       color: '#c084fc' },
  { label: 'Tailwind',   Icon: SiTailwindcss, color: '#38bdf8' },
]

// Tarjeta flotante para cada tecnología — posicionada con CSS absoluto
function TechCard({ label, Icon, color, x, y, scale }) {
  const size = Math.round(56 * scale)
  const fs   = Math.round(11 * scale)
  return (
    <div
      aria-label={label}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: Math.round(scale * 10),
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'rgba(2,6,23,0.92)',
          border: `${Math.max(1, 1.5 * scale)}px solid ${color}80`,
          boxShadow: `0 0 ${20 * scale}px ${color}55, 0 0 ${40 * scale}px ${color}18, inset 0 0 ${8 * scale}px ${color}10`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          fontSize: Math.round(26 * scale),
          backdropFilter: 'blur(8px)',
        }}
      >
        <Icon />
      </div>
      <span
        style={{
          fontSize: fs,
          fontWeight: 700,
          letterSpacing: '0.06em',
          color,
          textShadow: `0 0 8px ${color}`,
          background: 'rgba(2,6,23,0.82)',
          padding: `${Math.max(1, Math.round(2 * scale))}px ${Math.round(7 * scale)}px`,
          borderRadius: 6,
          border: `1px solid ${color}35`,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function ReactAtom3D() {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const [nodes, setNodes] = useState([])

  useEffect(() => {
    const container = containerRef.current
    const canvas    = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    let t = 0

    const resize = () => {
      canvas.width  = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = TECHS.length

    const draw = () => {
      t += 0.004
      const W  = canvas.width
      const H  = canvas.height
      const cx = W / 2
      const cy = H / 2
      const rx = Math.min(W, H) * 0.40
      const ry = rx * 0.28
      const cr = Math.min(W, H) * 0.068

      ctx.clearRect(0, 0, W, H)

      /* — Halo del núcleo — */
      const halo = ctx.createRadialGradient(cx, cy, cr * 0.3, cx, cy, cr * 3)
      halo.addColorStop(0,   'rgba(34,211,238,0.22)')
      halo.addColorStop(0.5, 'rgba(34,211,238,0.07)')
      halo.addColorStop(1,   'rgba(34,211,238,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, cr * 3, 0, Math.PI * 2)
      ctx.fillStyle = halo
      ctx.fill()

      /* — Anillo orbital principal — */
      ctx.save()
      ctx.shadowColor = 'rgba(34,211,238,0.45)'
      ctx.shadowBlur  = 14
      ctx.beginPath()
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(34,211,238,0.30)'
      ctx.lineWidth   = 1.2
      ctx.stroke()
      ctx.restore()

      /* — Anillos decorativos — */
      ctx.beginPath()
      ctx.ellipse(cx, cy, rx * 1.22, ry * 1.22, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(99,102,241,0.10)'
      ctx.lineWidth   = 1
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(cx, cy, rx * 0.68, ry * 0.68, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(34,211,238,0.08)'
      ctx.lineWidth   = 1
      ctx.stroke()

      /* — Núcleo hexagonal giratorio — */
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(t * 0.55)
      const cg = ctx.createLinearGradient(-cr, -cr, cr, cr)
      cg.addColorStop(0,   '#083344')
      cg.addColorStop(0.5, '#22d3ee')
      cg.addColorStop(1,   '#0369a1')
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i
        i === 0
          ? ctx.moveTo(cr * Math.cos(a), cr * Math.sin(a))
          : ctx.lineTo(cr * Math.cos(a), cr * Math.sin(a))
      }
      ctx.closePath()
      ctx.fillStyle   = cg
      ctx.shadowColor = '#22d3ee'
      ctx.shadowBlur  = 30
      ctx.fill()
      ctx.strokeStyle = 'rgba(34,211,238,0.9)'
      ctx.lineWidth   = 1.2
      ctx.stroke()
      // Hexágono interior
      ctx.rotate(Math.PI / 6)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i
        i === 0
          ? ctx.moveTo(cr * 0.52 * Math.cos(a), cr * 0.52 * Math.sin(a))
          : ctx.lineTo(cr * 0.52 * Math.cos(a), cr * 0.52 * Math.sin(a))
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(34,211,238,0.45)'
      ctx.lineWidth   = 0.8
      ctx.shadowBlur  = 0
      ctx.stroke()
      ctx.restore()

      /* — Calcular posiciones de nodos — */
      const nodeData = TECHS.map((tech, i) => {
        const angle = (Math.PI * 2 / N) * i + t
        const nx    = cx + rx * Math.cos(angle)
        const ny    = cy + ry * Math.sin(angle)
        const depth = (Math.sin(angle) + 1) / 2
        const scale = 0.68 + 0.32 * depth
        return { ...tech, nx, ny, scale, depth }
      })
      nodeData.sort((a, b) => a.depth - b.depth)

      /* — Conectores — */
      for (const { color, nx, ny, scale } of nodeData) {
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(nx, ny)
        const grad = ctx.createLinearGradient(cx, cy, nx, ny)
        grad.addColorStop(0, 'rgba(34,211,238,0.0)')
        grad.addColorStop(1, `${color}28`)
        ctx.strokeStyle = grad
        ctx.lineWidth   = 1 * scale
        ctx.stroke()
      }

      /* — Actualizar tarjetas React — */
      setNodes(nodeData.map(({ label, Icon, color, nx, ny, scale }) => ({
        label, Icon, color, x: nx, y: ny, scale,
      })))

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-85 w-full sm:h-105 lg:h-125"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {nodes.map((n) => (
        <TechCard key={n.label} {...n} />
      ))}
    </div>
  )
}

