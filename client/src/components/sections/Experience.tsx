import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import type { Experience as IExperience } from '@/types'
import api from '@/services/api'
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { Briefcase, Loader2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }
  }),
}

const TYPE_COLORS: Record<string, string> = {
  'Internship': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Freelance': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'Full-time': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Part-time': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
}

function formatDate(date: string) {
  if (!date) return ''
  const [year, month] = date.split('T')[0].split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(month) - 1] || ''} ${year}`
}

export default function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, isInView } = useInView()

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get('/experience')
        setExperiences(res.data.data.items || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  return (
    <section id="experience" className="py-24 relative" style={{ background: 'var(--section-bg)' }}>
      <div className="blob w-72 h-72 bg-indigo-500 top-20 right-20 opacity-5 animation-delay-4000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="tag mb-4 inline-block">Journey</span>
          <h2 className="section-heading mb-4">
            Work{' '}
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subheading mx-auto">
            My professional journey, projects, and contributions that shaped my expertise.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No experiences available at the moment.
          </div>
        ) : (
          /* Timeline */
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp._id}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-6 w-6 h-6 rounded-full border-2 border-indigo-500 bg-background flex items-center justify-center -translate-x-1/2 z-10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  </div>

                  {/* Card */}
                  <div className="glass-card p-6 hover-lift">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-foreground">{exp.role}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <FaBriefcase className="text-indigo-500" size={13} />
                          <span className="text-muted-foreground font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${TYPE_COLORS[exp.type] || 'bg-muted/50 border-border text-foreground'}`}>
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt size={12} />
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt size={12} />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    {exp.skills && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="tag text-xs">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <Briefcase size={16} />
          <span>Looking for full-time or freelance opportunities</span>
        </motion.div>
      </div>
    </section>
  )
}
