import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const PALETTES = [
  ['#0c1a2e', '#0e4d6e'],
  ['#0f0c29', '#302b63'],
  ['#0a1628', '#064e3b'],
  ['#1a0a2e', '#4c1d95'],
  ['#1a0c0c', '#7c2d12'],
]

function createPlaceholder(title, index) {
  const [from, to] = PALETTES[index % PALETTES.length]
  const safeTitle = encodeURIComponent(title)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='480'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='${from}'/>
        <stop offset='100%' stop-color='${to}'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <circle cx='680' cy='80' r='180' fill='rgba(56,189,248,0.12)'/>
    <circle cx='100' cy='420' r='110' fill='rgba(139,92,246,0.09)'/>
    <text x='44' y='260' fill='rgba(226,232,240,0.85)' font-size='40' font-family='Segoe UI,sans-serif' font-weight='600'>${safeTitle}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${svg}`
}

function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  /* ── Motion values for tilt ──────────────────── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springCfg = { damping: 22, stiffness: 300 }
  const smoothX = useSpring(mouseX, springCfg)
  const smoothY = useSpring(mouseY, springCfg)

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10])

  /* ── Glare overlay ───────────────────────────── */
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(34,211,238,0.13) 0%, transparent 60%)`

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const imageSource = project.image || createPlaceholder(project.title, index)

  return (
    /* Perspective must live on the parent, not the rotated element */
    <div style={{ perspective: '900px' }}>
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
          delay: (index % 3) * 0.1,
        }}
        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-cyan-400/20 bg-white/60 dark:bg-slate-900/55 shadow-lg dark:shadow-[0_0_32px_rgba(14,165,233,0.1)] backdrop-blur-xl transition-shadow duration-300 hover:border-cyan-400/45 hover:shadow-xl dark:hover:shadow-[0_0_48px_rgba(34,211,238,0.22)]"
      >
        {/* ── Glare overlay ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
          style={{ background: glare }}
        />

        {/* ── Neon top-edge accent ── */}
        <div className="absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-cyan-400/65 to-transparent" />
        {/* ── Subtle bottom edge ── */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-linear-to-r from-transparent via-blue-500/35 to-transparent" />

        {/* ── Image ── */}
        <div className="relative overflow-hidden">
          <img
            src={imageSource}
            alt={`Preview of ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          {/* degradado sobre imagen */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/25 to-transparent" />
        </div>

        {/* ── Card body ── */}
        <div className="relative z-20 p-6">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            {project.title}
          </h3>
          <p className={`mb-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400 ${expanded ? '' : 'line-clamp-2'}`}>
            {project.description}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="mb-4 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>

          {/* Tech badges */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={`${project.title}-${item}`}
                className="rounded-full border border-cyan-500/30 dark:border-cyan-400/22 bg-cyan-100/50 dark:bg-cyan-950/50 px-3 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-200 dark:hover:bg-slate-700/80 hover:text-slate-900 dark:hover:text-white"
              aria-label={`Repositorio GitHub de ${project.title}`}
            >
              <FiGithub className="shrink-0 text-base" />
              GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-100/50 dark:bg-cyan-950/50 px-4 py-2.5 text-sm font-medium text-cyan-700 dark:text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-200/60 dark:hover:bg-cyan-900/60 hover:text-cyan-800 dark:hover:text-white hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
              aria-label={`Demo en vivo de ${project.title}`}
            >
              <FiExternalLink className="shrink-0 text-base" />
              Demo
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default ProjectCard
