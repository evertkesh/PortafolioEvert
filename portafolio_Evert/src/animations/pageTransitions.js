/* ─────────────────────────────────────────────────────────────
   Shared timing config used by all page transitions
───────────────────────────────────────────────────────────── */
export const transitionConfig = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1],
}

const exitConfig = { duration: 0.16, ease: [0.4, 0, 1, 1] }

/* ─────────────────────────────────────────────────────────────
   FADE  — pure opacity, no movement
   Use for: calm / informational pages (About, Contact)
───────────────────────────────────────────────────────────── */
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0, transition: exitConfig },
}

/* ─────────────────────────────────────────────────────────────
   SLIDE  — enters from right, exits to left (page-flip feel)
   Use for: main content pages (Home, Projects, Experiments)
───────────────────────────────────────────────────────────── */
export const slideVariants = {
  initial: { opacity: 0, x: 52 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -36, transition: exitConfig },
}

/* ─────────────────────────────────────────────────────────────
   SCALE  — zooms from slightly smaller; exits zooming out
   Use for: focus pages (Projects grid, 404)
───────────────────────────────────────────────────────────── */
export const scaleVariants = {
  initial: { opacity: 0, scale: 0.93 },
  animate: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 1.05, transition: exitConfig },
}

/* Registry — maps string key to variant object */
export const variantMap = {
  fade:  fadeVariants,
  slide: slideVariants,
  scale: scaleVariants,
}

/* ─────────────────────────────────────────────────────────────
   Section scroll-in (reused by components)
───────────────────────────────────────────────────────────── */
export const sectionFadeIn = {
  initial:     { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.2 },
  transition:  { duration: 0.55, ease: 'easeOut' },
}

/* ─────────────────────────────────────────────────────────────
   Card hover spring
───────────────────────────────────────────────────────────── */
export const cardHoverMotion = {
  whileHover: { y: -8, scale: 1.01 },
  transition: { type: 'spring', stiffness: 260, damping: 20 },
}
