import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { ArrowDown, Download, ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

type IconComponent = React.ComponentType<{ size?: number }>
const ICON_MAP: Record<string, IconComponent> = {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      <div className="section-container relative z-10 pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <motion.div
          className="flex flex-col items-center gap-6 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability badge */}
          <motion.div variants={fadeUp}>
            <div className="availability-badge">OPEN TO WORK</div>
          </motion.div>

          {/* Name & Role */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-foreground">
              Shukan Prajapati
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-muted-foreground">
              Full stack developer | MERN stack developer
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Building scalable, performant web applications with modern technologies & clean code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4 mt-4">
            <a href="#contact" className="btn-primary group">
              Hire Me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="btn-outline">
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            >
              <Download size={16} />
              Resume
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={fadeUp} className="flex items-center gap-6 mt-8">
            {SOCIAL_LINKS.map((link) => {
              const Icon = ICON_MAP[link.icon]
              if (!Icon) return null
              return (
                <a
                  key={link._id}
                  href={link.url}
                  target={link.platform !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon size={24} />
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
