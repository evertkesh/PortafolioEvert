import { motion } from 'framer-motion'
import { FiDownload, FiGithub } from 'react-icons/fi'
import ReactAtom3D from './ReactAtom3D'
import GlitchText from '../ui/GlitchText'

const PHOTO_SRC = '/fotoEvert.jpeg'
const CV_PATH = '/cv-evert.pdf'

function HeroSection() {
  return (
    <section className="relative min-h-[92vh] px-4 py-16 text-slate-800 dark:text-slate-100 transition-colors duration-500">
      <div className="layout-container relative z-10 flex min-h-[80vh] flex-col items-center justify-center text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 mb-6"
        >
          <motion.p
            className="mb-4 text-xs font-bold uppercase tracking-[0.9em] text-cyan-600 dark:text-cyan-400 opacity-70 font-mono"
          >
             &lt;ESTADO: EN_FORMACIÓN&gt;
          </motion.p>

          <h1 className="text-4xl font-black tracking-tighter sm:text-7xl lg:text-8xl flex flex-col items-center">
            <span className="block text-slate-500 dark:text-slate-400 text-2xl sm:text-4xl mb-2 font-extralight tracking-widest uppercase">Hola, soy</span>
            <GlitchText text="Evert Rata Maldonado" className="neon-text-cyan bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent pb-2" />
          </h1>
        </motion.div>

        {/* PROFILE PHOTO - NOW BELOW NAME */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mb-10 group"
        >
          <div className="absolute -inset-6 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative h-48 w-48 sm:h-72 sm:w-72">
             {/* Decorative HUD Rings */}
             <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_30s_linear_infinite]" />
             <div className="absolute inset-4 border border-fuchsia-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
             <div className="absolute -inset-2 border border-cyan-400/10 rounded-full" />
             
             {/* Main Image Container */}
             <div className="absolute inset-3 overflow-hidden rounded-full border-2 border-cyan-500/50 dark:border-cyan-400/50 bg-slate-200 dark:bg-slate-900 shadow-lg dark:shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <img
                  src={PHOTO_SRC}
                  alt="Evert Rata Maldonado"
                  className="h-full w-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                />
                {/* Scanline effect over photo */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent h-1/4 w-full animate-[scanline_4s_linear_infinite] pointer-events-none" />
             </div>
          </div>
        </motion.div>

        {/* Subtitle & Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl space-y-8"
        >
          <div>
            <p className="text-lg font-mono text-cyan-700 dark:text-cyan-200/90 sm:text-2xl tracking-tight">
              &gt; Estudiante de Computación e informática // 4to ciclo 
            </p>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4 rounded-full shadow-[0_0_15px_#22d3ee]" />
          </div>

          <div className="glass-card p-5 sm:p-6 border-t border-cyan-500/20 bg-white/60 dark:bg-slate-950/40 backdrop-blur-xl">
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              En formación en computación e informática en Cibertec. He trabajado con
              <span className="text-cyan-600 dark:text-cyan-400 font-bold"> Java</span>, <span className="text-cyan-600 dark:text-cyan-400 font-bold">C#</span>,
              <span className="text-cyan-600 dark:text-cyan-400 font-bold"> SQL Server</span> y <span className="text-cyan-600 dark:text-cyan-400 font-bold">MySQL</span>.
              Uso <span className="text-cyan-600 dark:text-cyan-400 font-bold">Git/GitHub</span> y realicé despliegues básicos en
              <span className="text-cyan-600 dark:text-cyan-400 font-bold"> Azure</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
             <motion.a
                href={CV_PATH}
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 bg-cyan-500 text-slate-950 font-black uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all"
              >
                <FiDownload className="text-xl" /> DESCARGAR_CV
              </motion.a>
              <motion.a
                href="https://github.com/evertkesh"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                <FiGithub className="text-xl" /> VER_GITHUB
              </motion.a>
          </div>
        </motion.div>

        {/* Core Tech Atom */}
        <div className="mt-16 sm:mt-24 w-full">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.50em] text-cyan-600 dark:text-cyan-400 font-black rounded-lg">
            TECNOLOGÍAS PRINCIPALES EN ESTUDIO
          </p>
          <ReactAtom3D />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
