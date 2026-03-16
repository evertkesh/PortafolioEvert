import { Outlet } from 'react-router-dom'
import OrbFieldBackground from '../components/animations/OrbFieldBackground'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'

function MainLayout() {
  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-[#020617] overflow-hidden transition-colors duration-400">
      <OrbFieldBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
