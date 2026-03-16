import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { RiCodeSSlashLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Inicio' },
  { to: '/about',    label: 'Sobre mí' },
  { to: '/projects', label: 'Proyectos' },
  { to: '/contact',  label: 'Contacto' },
]

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark((prev) => !prev)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200 dark:border-cyan-300/20 bg-white/85 dark:bg-slate-950/85 shadow-lg dark:shadow-[0_4px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/50 dark:bg-slate-950/50 backdrop-blur-md'
      }`}
    >
      <div className="layout-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <NavLink to="/" className="group flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/30 transition group-hover:bg-cyan-400/20 group-hover:ring-cyan-300/60"
              >
                <RiCodeSSlashLine className="text-base" />
              </span>
              <span className="text-sm font-bold tracking-[0.22em] text-slate-800 dark:text-slate-100">
                EVERT{' '}
                <span className="text-cyan-600 dark:text-cyan-400">STUDENT</span>
              </span>
            </NavLink>
          </motion.div>

          {/* Desktop nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300/80 dark:hover:text-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 -bottom-px h-px rounded-full bg-linear-to-r from-cyan-400/60 via-cyan-300 to-cyan-400/60"
                        style={{ boxShadow: '0 0 8px rgba(34,211,238,0.7)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </motion.nav>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 transition hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-300"
              aria-label="Cambiar modo oscuro"
            >
              {isDark ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 transition hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-300 md:hidden"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <FiX className="text-sm" /> : <FiMenu className="text-sm" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-slate-200 dark:border-slate-800/80 md:hidden"
            >
              <ul className="flex flex-col gap-1 py-3">
                {links.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-cyan-100 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
