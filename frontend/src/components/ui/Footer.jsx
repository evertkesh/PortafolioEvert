import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { RiRobot2Line } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/',        label: 'Inicio' },
  { to: '/about',   label: 'Sobre mí' },
  { to: '/projects', label: 'Proyectos' },
  { to: '/contact', label: 'Contacto' },
]

const socialLinks = [
  { href: 'https://github.com/evertkesh',   icon: FiGithub,   label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/kesh-rata-maldonado-781baa34a', icon: FiLinkedin, label: 'LinkedIn' },
  { href: '/contact',             icon: FiMail,     label: 'Email' },
]

function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl mt-20 transition-colors duration-400">
      <div className="layout-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <RiRobot2Line className="text-3xl text-cyan-500 shadow-[0_0_10px_#22d3ee]" />
              <span className="text-xl font-black tracking-[0.3em] text-slate-800 dark:text-white">EVERT_STUDENT</span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 font-mono text-xs max-w-xs mx-auto md:mx-0">
              TERMINAL_ACTIVA: v2.0.26 <br />
              UBICACIÓN: EN_APRENDIZAJE <br />
              ESTADO: ESTUDIANTE_4TO_CICLO
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex justify-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-xs font-mono uppercase tracking-widest transition-all ${
                    isActive ? 'text-cyan-600 dark:text-cyan-500 underline underline-offset-8' : 'text-slate-400 dark:text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group p-3 rounded-full border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="text-xl group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 text-center">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} Evert Maldonado // Todos los derechos reservados 
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
