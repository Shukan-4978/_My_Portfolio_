// ============================================================
// Hero Section — Shukan Prajapati Portfolio
// Full-viewport hero with typewriter, orbit cards, blobs & stats
// ============================================================

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { ArrowDown, Download, ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/data/portfolio'

// ─── Framer Motion Variants ──────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Orbit Card Data ─────────────────────────────────────────
interface OrbitCard {
  label: string
  color: string
  angle: number   // degrees from centre
  radius: number  // distance from centre (px — desktop)
  delay: number
  icon: string
}

const ORBIT_CARDS: OrbitCard[] = [
  { label: '<React />',   color: '#61DAFB', angle: -60,  radius: 160, delay: 0,    icon: '⚛️' },
  { label: 'Node.js',    color: '#68A063', angle: 30,   radius: 155, delay: 0.4,  icon: '🟢' },
  { label: 'MongoDB',    color: '#47A248', angle: 130,  radius: 160, delay: 0.8,  icon: '🍃' },
  { label: 'TypeScript', color: '#3178C6', angle: 220,  radius: 155, delay: 1.2,  icon: '📘' },
]

// ─── Stats ────────────────────────────────────────────────────
const STATS = [
  { value: 'Fresher', label: 'Experience' },
  { value: '5+',  label: 'Projects' },
]

// ─── Social icon map ─────────────────────────────────────────
type IconComponent = React.ComponentType<{ size?: number }>
const ICON_MAP: Record<string, IconComponent> = {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
}

// ─── Orbit Card Component ─────────────────────────────────────
function FloatingCard({ card }: { card: OrbitCard }) {
  const rad = (card.angle * Math.PI) / 180
  const x = Math.cos(rad) * card.radius
  const y = Math.sin(rad) * card.radius

  return (
    <motion.div
      className="absolute glass-card px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold shadow-lg cursor-default select-none"
      style={{
        left: `calc(50% + ${x}px)`,
        top:  `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        borderColor: `${card.color}40`,
        color: card.color,
        whiteSpace: 'nowrap',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay: card.delay + 0.8, duration: 0.5 },
        scale:   { delay: card.delay + 0.8, duration: 0.5, type: 'spring', stiffness: 200 },
        y: {
          delay: card.delay + 1.2,
          duration: 3 + card.delay * 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
    >
      <span>{card.icon}</span>
      <span>{card.label}</span>
    </motion.div>
  )
}

// ─── Animated Blob ────────────────────────────────────────────
function Blob({ className }: { className: string }) {
  return (
    <motion.div
      className={`blob pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
      transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  )
}

// ─── Hero Component ───────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* ── Background blobs ─────────────────────────── */}
      <Blob className="w-[520px] h-[520px] bg-blue-500 -top-32 -left-32 opacity-[0.12]" />
      <Blob className="w-[460px] h-[460px] bg-violet-500 bottom-0 right-0 opacity-[0.1] animation-delay-4000" />
      <Blob className="w-[300px] h-[300px] bg-purple-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] animation-delay-2000" />

      {/* ── Subtle dot-grid overlay ───────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* ── Main content ─────────────────────────────── */}
      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ════════════════════════════════════════════
              LEFT SIDE — 60%
          ════════════════════════════════════════════ */}
          <motion.div
            className="w-full lg:w-[60%] flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability badge */}
            <motion.div variants={fadeUp}>
              <div className="availability-badge w-fit">
                OPEN TO WORK
              </div>
            </motion.div>

            {/* Greeting + name */}
            <motion.div variants={fadeUp} className="flex flex-col gap-1">
              <span className="text-base text-muted-foreground font-medium tracking-wide">
                Hello, I'm
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Shukan{' '}
                <span className="gradient-text">Prajapati</span>
              </h1>
            </motion.div>

            {/* Static Role Text */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-foreground/80 h-10"
            >
              <span>Full stack developer | MERN stack developer</span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Building scalable, performant web applications with modern
              technologies &amp; clean code.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="#contact" className="btn-primary group">
                Hire Me
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a href="#projects" className="btn-outline">
                View Projects
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-blue-400 hover:bg-blue-500/5 transition-all duration-300"
              >
                <Download size={16} />
                Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 pt-1"
            >
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon]
                if (!Icon) return null
                return (
                  <motion.a
                    key={link._id}
                    href={link.url}
                    target={link.platform !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                    whileHover={{ scale: 1.22, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon size={22} />
                  </motion.a>
                )
              })}
              <span className="ml-2 w-16 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-extrabold gradient-text leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════
              RIGHT SIDE — 40%
          ════════════════════════════════════════════ */}
          <motion.div
            className="w-full lg:w-[40%] flex items-center justify-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {/* Orbit container */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: 360, height: 360 }}
              aria-hidden="true"
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute rounded-full border border-blue-500/20"
                style={{ width: 340, height: 340 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              {/* Middle rotating ring */}
              <motion.div
                className="absolute rounded-full border border-violet-500/15"
                style={{ width: 260, height: 260 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />

              {/* Centre avatar */}
              <motion.div
                className="relative z-10 w-36 h-36 rounded-full gradient-bg flex items-center justify-center shadow-2xl overflow-hidden p-1"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 140,
                  damping: 14,
                }}
                style={{
                  boxShadow:
                    '0 0 60px rgba(99,102,241,0.45), 0 0 120px rgba(139,92,246,0.2)',
                }}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 leading-tight">Shukan</span>
                  <span className="text-lg font-bold text-foreground leading-tight">Prajapati</span>
                </div>
              </motion.div>

              {/* Orbit tech cards */}
              {ORBIT_CARDS.map((card) => (
                <FloatingCard key={card.label} card={card} />
              ))}

              {/* Decorative code snippet card */}
              <motion.div
                className="absolute -bottom-6 -right-4 glass-card px-4 py-3 text-xs font-mono shadow-xl max-w-[160px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.5 },
                  y: {
                    delay: 1.8,
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
              >
                <span className="text-violet-400">const</span>{' '}
                <span className="text-emerald-400">dev</span>
                {' = '}
                <span className="text-yellow-300">{'{'}</span>
                <br />
                <span className="pl-2 text-muted-foreground">passion:</span>{' '}
                <span className="text-green-400">true</span>
                <br />
                <span className="text-yellow-300">{'}'}</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
