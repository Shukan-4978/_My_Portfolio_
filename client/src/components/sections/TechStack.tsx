import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import type { SkillCategory, Skill } from '@/types'
import api from '@/services/api'
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiHtml5,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiRedis,
  SiJavascript, SiPython, SiRedux,
  SiJsonwebtokens, SiVercel, SiCloudinary, SiDocker,
  SiGit, SiGithub, SiJest, SiGraphql, SiRender
} from 'react-icons/si'
import { FaServer, FaDatabase, FaBrain, FaAws, FaCss3, FaRobot } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'

const SKILL_ICON_MAP: Record<string, React.ReactElement> = {
  react: <SiReact />, typescript: <SiTypescript />, nextjs: <SiNextdotjs />,
  tailwind: <SiTailwindcss />, html: <SiHtml5 />, css: <FaCss3 />,
  nodejs: <SiNodedotjs />, express: <SiExpress />, mongodb: <SiMongodb />,
  postgresql: <SiPostgresql />, redis: <SiRedis />, javascript: <SiJavascript />,
  python: <SiPython />, redux: <SiRedux />, zustand: <FaDatabase />,
  jwt: <SiJsonwebtokens />, oauth: <FaServer />, vercel: <SiVercel />,
  cloudinary: <SiCloudinary />, aws: <FaAws />, docker: <SiDocker />,
  git: <SiGit />, github: <SiGithub />, jest: <SiJest />,
  openai: <FaRobot />, langchain: <FaBrain />, api: <FaServer />,
  graphql: <SiGraphql />, framer: <SiReact />, render: <SiRender />,
}

const SKILL_COLORS: Record<string, string> = {
  react: '#61DAFB', typescript: '#3178C6', nextjs: '#000000',
  tailwind: '#06B6D4', html: '#E34F26', css: '#1572B6',
  nodejs: '#339933', express: '#000000', mongodb: '#47A248',
  postgresql: '#4169E1', redis: '#DC382D', javascript: '#F7DF1E',
  python: '#3776AB', redux: '#764ABC', vercel: '#000000',
  cloudinary: '#3448C5', aws: '#FF9900', docker: '#2496ED',
  git: '#F05032', github: '#181717', jest: '#C21325',
  openai: '#412991', graphql: '#E10098', render: '#46E3B7',
}

const CATEGORIES: SkillCategory[] = [
  'Frontend', 'Backend', 'Database', 'Languages', 'State Management',
  'Authentication', 'Deployment', 'Cloud', 'DevOps', 'Version Control',
  'Testing', 'AI Tools', 'API', 'Libraries',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
}

interface SkillCardProps {
  skill: Skill
  index: number
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [hovered, setHovered] = useState(false)
  const icon = SKILL_ICON_MAP[skill.icon]
  const color = SKILL_COLORS[skill.icon] || '#6366f1'

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card p-4 flex flex-col items-center gap-3 group relative overflow-hidden cursor-default"
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)` }}
      />

      {/* Icon */}
      <motion.div
        className="text-3xl transition-transform duration-300"
        style={{ color: hovered ? color : undefined }}
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon || <FaServer />}
      </motion.div>

      {/* Name */}
      <span className="text-sm font-semibold text-center text-foreground leading-tight">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Frontend')
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, isInView } = useInView()

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills')
        setSkills(res.data.data.items || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const filteredSkills = skills.filter((s) => s.category === activeCategory)
  const availableCategories = CATEGORIES.filter((c) => skills.some((s) => s.category === c))

  // Ensure active category is valid when data loads
  useEffect(() => {
    if (!loading && availableCategories.length > 0 && !availableCategories.includes(activeCategory)) {
      setActiveCategory(availableCategories[0])
    }
  }, [skills, loading, activeCategory, availableCategories])

  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: 'var(--section-bg)' }}>
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-blue-500 top-0 right-0 opacity-5 animation-delay-2000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="tag mb-4 inline-block">
            Technical Arsenal
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-heading mb-4">
            Tech Stack &{' '}
            <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subheading mx-auto">
            Technologies I use to build modern, scalable, and production-ready applications.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No skills available at the moment.
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 justify-center mb-10"
            >
              {availableCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`skill-tab ${activeCategory === category ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                variants={stagger}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {filteredSkills.map((skill, i) => (
                  <SkillCard key={skill._id} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* Summary chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-3 justify-center"
        >
          {[
            '⚡ 30+ Technologies',
            '🚀 3+ Years Learning',
            '💡 Always Exploring New Tools',
          ].map((txt) => (
            <span key={txt} className="tag text-sm px-4 py-2">{txt}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
