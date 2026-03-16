import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="min-h-[70vh] bg-slate-950 px-4 py-16 text-slate-100 center-flex">
      <div className="layout-container">
        <div className="mx-auto max-w-2xl rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.12)] sm:p-12">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">Error</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">404</h1>
          <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Página no encontrada</h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            La página que buscas no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label="Volver a la página de inicio"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
