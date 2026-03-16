import { motion } from 'framer-motion'
import { FaJava, FaReact } from 'react-icons/fa'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiJavascript, SiSharp, SiSpringboot, SiVuedotjs } from 'react-icons/si'
import { sectionFadeIn } from '../animations/pageTransitions'

const highlights = [
  { value: '4to', label: 'Ciclo actual' },
  { value: '27', label: 'Cursos cursados' },
  { value: 'Java / C#', label: 'POO y LP' },
  { value: 'SQL + Azure', label: 'BD y despliegue' },
]

const techStack = [
  { icon: FaReact,      label: 'React',       color: 'text-cyan-300' },
  { icon: SiJavascript, label: 'JavaScript',  color: 'text-yellow-300' },
  { icon: FaJava,       label: 'Java',        color: 'text-orange-300' },
  { icon: SiSharp,      label: 'C#',          color: 'text-violet-300' },
  { icon: SiVuedotjs,   label: 'Vue',         color: 'text-emerald-300' },
  { icon: SiSpringboot, label: 'Spring Boot', color: 'text-lime-300' },
]

const timeline = [
  { year: 'Ciclo 1', title: 'Bases de algoritmia y web', desc: 'Introducción a la Algoritmia, Arquitectura de Entornos Web y Tecnologías de la Información.' },
  { year: 'Ciclo 2', title: 'Estructuras y datos', desc: 'Algoritmos y Estructuras de Datos, Base de Datos, Desarrollo de Entornos Web y Modelado de Procesos.' },
  { year: 'Ciclo 3', title: 'POO y análisis', desc: 'Lenguaje de Programación I (Java), Programación Orientada a Objetos I (C#), BD Avanzado I y Análisis y Diseño de Sistemas I.' },
  { year: 'Ciclo 4', title: 'Profundización', desc: 'Análisis y Diseño de Sistemas II, Lenguaje de Programación II, POO II, BD Avanzado II y Gestión de Servicios de TI.' },
  { year: 'Próximo', title: 'Siguientes retos', desc: 'Seguir fortaleciendo Azure, Git/GitHub, pruebas, despliegues y buenas prácticas.' },
]

function StatCard({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-slate-200 dark:border-cyan-400/18 bg-white/60 dark:bg-slate-900/60 p-5 text-center backdrop-blur-sm transition-colors duration-400"
    >
      <p className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
        {value}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  )
}

function TimelineItem({ year, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.48, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 pl-6"
    >
      {/* línea vertical */}
      <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-cyan-400/60 to-transparent" />
      {/* nodo */}
      <div className="absolute -left-1.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cyan-400 bg-white dark:bg-slate-950 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
      <div className="pb-8">
        <span className="mb-1 inline-block rounded-full border border-cyan-400/30 bg-cyan-100/50 dark:bg-cyan-950/50 px-2.5 py-0.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
          {year}
        </span>
        <h3 className="mt-1 text-base font-semibold text-slate-800 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
    </motion.div>
  )
}

function About() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="layout-container relative">

        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 border-l-2 border-cyan-500 pl-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-600 dark:text-cyan-400 font-mono mb-2">Sujeto: Perfil_Estudiante</p>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter sm:text-5xl lg:text-6xl">
            Perfil <span className="text-cyan-500">Estudiante</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl font-mono text-sm">
            Resumen académico y de aprendizaje en desarrollo de software.
            Información basada en cursos y proyectos formativos.
          </p>
        </motion.div>

        {/* ── Bio + Stats ── */}
        <div className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
          {/* Bio */}
          <motion.div {...sectionFadeIn} className="space-y-6">
            <div className="glass-card p-6 sm:p-8 border-t border-cyan-500/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-cyan-500/30">NIVEL: EN_FORMACIÓN</div>
               <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 first-letter:text-4xl first-letter:font-black first-letter:text-cyan-500 first-letter:mr-1">
                Soy estudiante de 4to ciclo de computación e informática en Cibertec. Fortalezco mis bases en algoritmia,
                estructuras de datos, análisis y diseño de sistemas, además de desarrollo web.
                Trabajo con <span className="text-cyan-600 dark:text-cyan-400 font-bold">Java</span> en Lenguaje de Programación
                y con <span className="text-cyan-600 dark:text-cyan-400 font-bold">C#</span> en Programación Orientada a Objetos.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                En bases de datos he trabajado con <span className="text-cyan-600 dark:text-cyan-400 font-bold">SQL Server</span>
                y <span className="text-cyan-600 dark:text-cyan-400 font-bold">MySQL</span>. También he realizado despliegues
                básicos en <span className="text-cyan-600 dark:text-cyan-400 font-bold">Azure</span> y uso
                <span className="text-cyan-600 dark:text-cyan-400 font-bold"> Git/GitHub</span> para control de versiones.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="https://github.com/evertkesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3 border border-cyan-500/30 rounded-lg text-cyan-600 dark:text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-all"
              >
                <FiGithub /> RED_GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/kesh-rata-maldonado-781baa34a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3 border border-cyan-500/30 rounded-lg text-cyan-600 dark:text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-all"
              >
                <FiLinkedin /> NODO_LINKEDIN
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {highlights.map((h, i) => (
              <StatCard key={h.label} {...h} index={i} />
            ))}
          </div>
        </div>

        {/* ── Tech stack ── */}
        <motion.div {...sectionFadeIn} className="mb-24">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">Tecnologías_En_Aprendizaje</h2>
            <div className="h-px flex-1 bg-linear-to-r from-cyan-500 to-transparent opacity-30" />
          </div>
          <div className="flex flex-wrap gap-4">
            {techStack.map(({ icon: Icon, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                className="flex items-center gap-3 glass-card px-6 py-4 border border-slate-200 dark:border-white/5"
              >
                <Icon className={`text-2xl ${color}`} />
                <span className="text-slate-700 dark:text-slate-200 font-bold tracking-tight">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <motion.div {...sectionFadeIn}>
          <div className="mb-12 flex items-center gap-4">
             <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">Registro_Académico</h2>
             <div className="h-px flex-1 bg-linear-to-r from-cyan-500 to-transparent opacity-30" />
          </div>
          <div className="max-w-3xl ml-4">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
