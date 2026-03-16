import { motion } from 'framer-motion'
import { sectionFadeIn } from '../animations/pageTransitions'
import HeroSection from '../components/hero/HeroSection'
import SkillsDashboard from '../components/dashboard/SkillsDashboard'

function Home() {
  return (
    <>
      <motion.div {...sectionFadeIn}>
        <HeroSection />
      </motion.div>
      <motion.div {...sectionFadeIn}>
        <SkillsDashboard />
      </motion.div>
    </>
  )
}

export default Home
