import { motion } from 'framer-motion'

export default function GlitchText({ text, className }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 z-0 text-cyan-500 opacity-70"
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 1, 0],
          opacity: [0.7, 0.3, 0.7, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          ease: "linear",
          repeatDelay: 2
        }}
        style={{ clipPath: 'inset(10% 0 10% 0)' }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 z-0 text-fuchsia-500 opacity-70"
        animate={{
          x: [2, -2, 1, 0],
          y: [-1, 1, -1, 0],
          opacity: [0.7, 0.3, 0.7, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          ease: "linear",
          repeatDelay: 2.1
        }}
        style={{ clipPath: 'inset(80% 0 5% 0)' }}
      >
        {text}
      </motion.span>
    </div>
  )
}
