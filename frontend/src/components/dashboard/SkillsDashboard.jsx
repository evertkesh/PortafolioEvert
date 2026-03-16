import { motion } from 'framer-motion'
import { FaJava, FaReact } from 'react-icons/fa'
import { SiJavascript, SiSharp, SiSpringboot, SiVuedotjs } from 'react-icons/si'
import SkillCard from './SkillCard'

const skills = [
  { name: 'React', level: 90, icon: FaReact, colorClass: 'text-cyan-300' },
  { name: 'Java', level: 85, icon: FaJava, colorClass: 'text-orange-300' },
  { name: 'JavaScript', level: 88, icon: SiJavascript, colorClass: 'text-yellow-300' },
  { name: 'C#', level: 80, icon: SiSharp, colorClass: 'text-violet-300' },
  { name: 'Vue', level: 78, icon: SiVuedotjs, colorClass: 'text-emerald-300' },
  { name: 'Spring Boot', level: 82, icon: SiSpringboot, colorClass: 'text-lime-300' },
]

function SkillsDashboard() {
  return (
    <section className="relative overflow-hidden py-24 px-4 bg-transparent">
      <div className="layout-container relative">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-16 border-l-2 border-cyan-500 pl-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-600 dark:text-cyan-400 font-mono mb-2">Módulos_Académicos: En_Progreso</p>
          <h2 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter sm:text-5xl lg:text-6xl">
            Aprendizaje <span className="text-cyan-500">Tecnológico</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl font-mono text-sm">
            Progreso formativo en herramientas y lenguajes clave del desarrollo de software.
            Enfoque académico con proyectos de práctica y laboratorios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsDashboard
