import { motion } from 'framer-motion'

const CIRCUMFERENCE = 2 * Math.PI * 54

export default function Loader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-[#020617]"
      role="status"
      aria-label="Cargando portfolio"
    >
      {/* Gradiente radial central */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,116,144,0.25)_0%,transparent_65%)]" />
      {/* Grid sutil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.04) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Anillo SVG con progreso */}
      <div className="relative flex items-center justify-center">
        <svg width="180" height="180" className="-rotate-90" style={{ filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.5))' }}>
          {/* Pista */}
          <circle cx="90" cy="90" r="54" fill="none" stroke="rgba(34,211,238,0.10)" strokeWidth="1.5" />
          {/* Progreso */}
          <motion.circle
            cx="90" cy="90" r="54"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inicial central */}
        <motion.span
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute text-7xl font-black"
          style={{
            color: '#22d3ee',
            textShadow: '0 0 24px rgba(34,211,238,1), 0 0 56px rgba(34,211,238,0.55)',
          }}
        >
          E
        </motion.span>
      </div>

      {/* Nombre - reveal desde abajo */}
      <div className="mt-8 overflow-hidden">
        <motion.h1
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-black tracking-[0.28em] text-slate-50"
        >
          EVERT{' '}
          <span style={{ color: '#22d3ee', textShadow: '0 0 20px rgba(34,211,238,0.7)' }}>STUDENT</span>
        </motion.h1>
      </div>

      {/* Separador */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 h-px w-48 bg-linear-to-r from-transparent via-cyan-400/70 to-transparent"
      />

      {/* Rol */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-3 text-xs font-semibold uppercase tracking-[0.38em] text-slate-500"
      >
        Estudiante de Desarrollo de Software
      </motion.p>

      {/* Barra inferior de progreso */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="mt-10 h-px w-44 overflow-hidden rounded-full bg-slate-800"
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-1/2 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent"
        />
      </motion.div>
    </motion.div>
  )
}
