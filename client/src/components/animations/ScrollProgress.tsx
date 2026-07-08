import { motion, useSpring, useTransform, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX,
        width: '100%',
        transformOrigin: 'left',
      }}
      aria-hidden="true"
    />
  )
}
