import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { transitionConfig, variantMap } from './animations/pageTransitions'
import Loader from './components/ui/Loader'
import MainLayout from './layouts/MainLayout'

const Home        = lazy(() => import('./pages/Home'))
const About       = lazy(() => import('./pages/About'))
const Projects    = lazy(() => import('./pages/Projects'))
const Contact     = lazy(() => import('./pages/Contact'))
const NotFound    = lazy(() => import('./pages/NotFound'))

/**
 * PageWrapper — wraps each page with its own transition variant.
 * variant: 'fade' | 'slide' | 'scale'  (default: 'slide')
 */
function PageWrapper({ children, variant = 'slide' }) {
  const variants = variantMap[variant] ?? variantMap.slide
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transitionConfig}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <AnimatePresence mode="sync" initial={false}>
        <Routes location={location}>
          <Route path="/" element={<MainLayout />}>
            {/* Home — slide: entrada principal */}
            <Route
              index
              element={<PageWrapper variant="slide"><Home /></PageWrapper>}
            />
            {/* About — fade: contenido personal */}
            <Route
              path="about"
              element={<PageWrapper variant="fade"><About /></PageWrapper>}
            />
            {/* Projects — scale: foco en el grid */}
            <Route
              path="projects"
              element={<PageWrapper variant="scale"><Projects /></PageWrapper>}
            />
            {/* Contact — fade: tono calmado */}
            <Route
              path="contact"
              element={<PageWrapper variant="fade"><Contact /></PageWrapper>}
            />
            {/* 404 — scale: atención inmediata */}
            <Route
              path="*"
              element={<PageWrapper variant="scale"><NotFound /></PageWrapper>}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      )}
    </>
  )
}

export default App
