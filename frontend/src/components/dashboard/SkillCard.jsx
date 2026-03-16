import { motion } from 'framer-motion'

function SkillCard({ icon: Icon, name, level, colorClass = 'text-cyan-300' }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.5)' }}
      className="relative group p-6 glass-card border border-slate-200 dark:border-white/5 transition-all duration-300 overflow-hidden"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />
      
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 ${colorClass} text-3xl shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
          <Icon />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-wider text-slate-800 dark:text-white uppercase">{name}</h3>
          <p className="text-xs text-cyan-500 font-mono tracking-tighter">Progreso: {level} / 100</p>
        </div>
      </div>

      <div className="relative h-2 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute h-full bg-linear-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        />
      </div>
      
      {/* HUD-like data points */}
      <div className="mt-4 flex justify-between items-center font-mono text-[10px] text-slate-500">
        <span>ESTADO: EN_APRENDIZAJE</span>
        <span className="animate-pulse text-cyan-500/50">● EN_LÍNEA</span>
      </div>
    </motion.article>
  )
}

export default SkillCard
