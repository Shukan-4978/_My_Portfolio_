import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import type { Achievement as IAchievement } from '@/types'
import api from '@/services/api'
import { FaTrophy, FaGithub, FaCode, FaCodeBranch, FaAward, FaMedal, FaStar } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { Loader2 } from 'lucide-react'

const ACHIEVEMENT_ICONS: Record<string, React.ReactElement> = {
  Hackathon: <FaTrophy className="text-yellow-500" />,
  Contest: <FaMedal className="text-orange-500" />,
  'Open Source': <FaCodeBranch className="text-violet-500" />,
  LeetCode: <SiLeetcode className="text-orange-500" />,
  GitHub: <FaGithub className="text-foreground" />,
  Award: <FaAward className="text-blue-500" />,
  Badge: <FaStar className="text-yellow-500" />,
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<IAchievement[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, isInView } = useInView()

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get('/achievements')
        setAchievements(res.data.data.items || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  return (
    <section id="achievements" className="py-24 relative" style={{ background: 'var(--section-bg)' }}>
      <div className="blob w-80 h-80 bg-blue-500 top-10 left-10 opacity-5 animation-delay-6000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Recognition</span>
          <h2 className="section-heading mb-4">
            Achievements &{' '}
            <span className="gradient-text">Highlights</span>
          </h2>
          <p className="section-subheading mx-auto">
            Milestones, awards, and contributions that reflect my dedication to continuous growth.
          </p>
        </motion.div>

        {/* GitHub Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-10"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaGithub className="text-foreground" /> GitHub Activity
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Repositories', value: '5+', icon: <FaCode /> },
              { label: 'Stars Earned', value: '15+', icon: <FaStar /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-secondary/50">
                <div className="text-blue-500 mb-1 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a
              href="https://github.com/Shukan-4978"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-500 hover:underline flex items-center gap-1"
            >
              <FaGithub /> github.com/Shukan-4978
            </a>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No achievements available at the moment.
          </div>
        ) : (
          /* Achievements Grid */
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement._id}
                variants={fadeUp}
                className="glass-card p-6 hover-lift group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                    {ACHIEVEMENT_ICONS[achievement.type] || <FaAward />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="tag text-xs">{achievement.type}</span>
                      {achievement.rank && (
                        <span className="text-xs font-bold text-yellow-500">{achievement.rank}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-2 group-hover:text-blue-500 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {achievement.description}
                    </p>
                    {achievement.date && (
                      <p className="text-xs text-muted-foreground mt-2">{new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    )}
                    {achievement.url && achievement.url !== '#' && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-500 hover:underline mt-2 inline-block"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
