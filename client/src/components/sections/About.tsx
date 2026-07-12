// ============================================================
// About Section — Shukan Prajapati Portfolio
// Two-column layout with animated stats, highlights, education
// timeline, and 'What Makes Me Different' cards
// ============================================================

import { motion } from 'framer-motion'
import {
  FaCheck,
  FaClock,
  FaProjectDiagram,
} from 'react-icons/fa'
import { useInView } from '@/hooks/useInView'
import { useCounter } from '@/hooks/useCounter'
import { ABOUT_DATA } from '@/data/portfolio'

// ─── Framer Motion Variants ──────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const listItem = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Stat Counter Card ────────────────────────────────────────
interface StatCardProps {
  value: number | string
  suffix?: string
  label: string
  icon: React.ReactNode
  start: boolean
  delay: number
}

function StatCard({ value, suffix = '', label, icon, start, delay }: StatCardProps) {
  const count = typeof value === 'number' ? useCounter(value, 2000, start) : value

  return (
    <motion.div
      className="stat-card hover-lift flex flex-col items-center text-center gap-2"
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white text-xl shadow-lg">
        {icon}
      </div>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium leading-snug">{label}</p>
    </motion.div>
  )
}

// ─── Photo Placeholder ────────────────────────────────────────
function PhotoBlock({ isInView }: { isInView: boolean }) {
  const BADGE_TAGS = [
    { label: 'React.js',  color: '#61DAFB', angle: -40, r: 155 },
    { label: 'Node.js',   color: '#68A063', angle: 55,  r: 150 },
    { label: 'MongoDB',   color: '#47A248', angle: 165, r: 155 },
  ]

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto flex items-center justify-center">
      {/* Gradient ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #6366f1)',
          padding: 3,
          borderRadius: '50%',
        }}
      >
        <div className="w-full h-full rounded-full bg-background" />
      </div>

      {/* Avatar */}
      <motion.div
        className="relative z-10 w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full gradient-bg flex flex-col items-center justify-center shadow-2xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
        style={{
          boxShadow: '0 0 80px rgba(99,102,241,0.35), 0 0 40px rgba(139,92,246,0.2)',
        }}
      >
        <img src="/images/profile.png" alt="Shukan Prajapati" className="w-full h-full object-cover rounded-full p-2 bg-white dark:bg-slate-900" />
      </motion.div>

      {/* Experience badge */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-xs font-bold text-center whitespace-nowrap"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <span className="gradient-text">Fresher</span>
      </motion.div>

      {/* Floating tech badges */}
      {BADGE_TAGS.map((tag, i) => {
        const rad = (tag.angle * Math.PI) / 180
        const x = Math.cos(rad) * tag.r
        const y = Math.sin(rad) * tag.r
        return (
          <motion.div
            key={tag.label}
            className="absolute glass-card px-2.5 py-1 text-[11px] font-semibold"
            style={{
              left: `calc(50% + ${x}px)`,
              top:  `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              color: tag.color,
              borderColor: `${tag.color}40`,
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1, y: [0, -6, 0] } : {}}
            transition={{
              opacity: { delay: 0.8 + i * 0.15, duration: 0.4 },
              scale:   { delay: 0.8 + i * 0.15, duration: 0.4 },
              y: { delay: 1.2 + i * 0.15, duration: 3 + i * 0.4, repeat: Infinity, repeatType: 'reverse' },
            }}
          >
            {tag.label}
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Education Timeline Item ──────────────────────────────────
interface EduItem {
  degree: string
  school: string
  year: string
  grade?: string
  description?: string
}

function EducationItem({ edu, delay }: { edu: EduItem; delay: number }) {
  return (
    <motion.div
      className="relative pl-8 pb-6 group cursor-default"
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* Left border line */}
      <div
        className="absolute left-3 top-0 bottom-0 w-px"
        style={{
          background:
            'linear-gradient(to bottom, #6366f1, #8b5cf6, transparent)',
        }}
      />
      {/* Dot */}
      <div className="absolute left-[7px] top-1.5 w-3 h-3 rounded-full gradient-bg ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all" />

      {/* Card */}
      <div className="glass-card p-4 group-hover:border-blue-500/30 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="tag text-xs">{edu.year}</span>
          {edu.grade && (
            <span className="text-xs font-semibold gradient-text">{edu.grade}</span>
          )}
        </div>
        <h4 className="font-bold text-sm text-foreground">{edu.degree}</h4>
        <p className="text-muted-foreground text-xs mt-0.5">{edu.school}</p>
        {edu.description && (
          <p className="text-muted-foreground/70 text-xs mt-1.5 leading-relaxed">
            {edu.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}


// ─── Main About Component ─────────────────────────────────────
export default function About() {
  // Scroll trigger for the whole section
  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.05, once: true })
  // Scroll trigger for counter cards
  const { ref: statsRef, isInView: statsInView } = useInView({ threshold: 0.3, once: true })



  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-background"
      aria-label="About section"
    >
      {/* Subtle section background blob */}
      <div className="blob w-[500px] h-[500px] bg-violet-500 opacity-[0.05] top-0 right-0 pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col gap-20">

        {/* ════════════════════════════════════════════
            TOP — Two column
        ════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ── LEFT — Photo ──────────────────────────── */}
          <motion.div
            className="w-full lg:w-[40%] flex justify-center lg:justify-start"
            custom={0}
            variants={fadeLeft}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
          >
            <PhotoBlock isInView={sectionInView} />
          </motion.div>

          {/* ── RIGHT — Content ───────────────────────── */}
          <motion.div
            className="w-full lg:w-[60%] flex flex-col gap-6"
            custom={0.15}
            variants={fadeRight}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px gradient-bg" />
              <span className="text-sm font-semibold gradient-text uppercase tracking-widest">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h2 className="section-heading text-foreground">
              Crafting Digital Experiences{' '}
              <span className="gradient-text">That Make a Difference</span>
            </h2>

            {/* Bio */}
            <div className="flex flex-col gap-3">
              {ABOUT_DATA.bio.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed text-base"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Highlights checklist */}
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1"
              variants={stagger}
              initial="hidden"
              animate={sectionInView ? 'visible' : 'hidden'}
            >
              {ABOUT_DATA.highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={listItem}
                  className="flex items-start gap-2.5 text-sm text-foreground/80"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center">
                    <FaCheck className="text-green-500 text-[9px]" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Education timeline */}
            <div className="mt-4">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Education
              </h3>
              <div className="relative">
                {ABOUT_DATA.education.map((edu, i) => (
                  <EducationItem key={i} edu={edu} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════
            STATS ROW — full width
        ════════════════════════════════════════════ */}
        <div ref={statsRef}>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-lg mx-auto"
            variants={stagger}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
          >
            <StatCard
              value="Fresher"
              label="Experience"
              icon={<FaClock />}
              start={statsInView}
              delay={0}
            />
            <StatCard
              value={ABOUT_DATA.stats.projectsCompleted}
              suffix="+"
              label="Projects Completed"
              icon={<FaProjectDiagram />}
              start={statsInView}
              delay={0.08}
            />
          </motion.div>
        </div>



      </div>
    </section>
  )
}
