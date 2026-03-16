import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/projects/ProjectCard'
import projectsData from '../assets/data/projects.json'
import marketingAgencyImg from '../assets/images/marketingAgency.png'

function ProjectSkeleton() {
  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-cyan-300/10 bg-white/60 dark:bg-slate-900/55 backdrop-blur-xl"
      aria-hidden="true"
    >
      <div className="h-48 w-full animate-pulse bg-slate-200 dark:bg-slate-800/80" />
      <div className="space-y-3 p-6">
        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </article>
  )
}

function Projects() {
  const projects = useMemo(() => {
    const imageMap = {
      'Marketing Agency': marketingAgencyImg,
    }
    return projectsData.map((p) => ({
      ...p,
      image: imageMap[p.title] || p.image,
    }))
  }, [])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 850)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="layout-container relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 border-l-2 border-cyan-500 pl-6"
        >
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter sm:text-5xl lg:text-6xl">
            Proyectos <span className="text-cyan-500">Académicos</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl font-mono text-sm">
            Proyectos desarrollados en cursos y práctica personal durante el 4to ciclo.
            Enfoque en aprendizaje, prototipado y mejora continua.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProjectSkeleton key={`skeleton-${i}`} />
              ))
            : projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
