import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { CERTIFICATES_DATA } from '@/data/portfolio'
import { FaAward, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa'
import { Award } from 'lucide-react'

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
}

function formatMonthYear(date: string) {
  if (!date) return ''
  const [year, month] = date.split('-')
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${months[parseInt(month) - 1] || ''} ${year}`
}

export default function Certificates() {
  const { ref, isInView } = useInView()

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-violet-500 bottom-0 right-0 opacity-5 animation-delay-2000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Credentials</span>
          <h2 className="section-heading mb-4">
            Licenses &{' '}
            <span className="gradient-text">Certificates</span>
          </h2>
          <p className="section-subheading mx-auto">
            Verified credentials from industry-leading platforms and organizations.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTIFICATES_DATA.map((cert) => (
            <motion.div
              key={cert._id}
              variants={fadeUp}
              className="glass-card p-6 group hover-lift"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-glow-sm">
                <Award className="text-white" size={22} />
              </div>

              {/* Title */}
              <h3 className="font-bold text-base text-foreground mb-2 leading-snug group-hover:text-blue-500 transition-colors">
                {cert.title}
              </h3>

              {/* Issuer */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <FaAward size={12} className="text-blue-400" />
                <span>{cert.issuer}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <FaCalendarAlt size={12} className="text-blue-400" />
                <span>{formatMonthYear(cert.date)}</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* CTA */}
              <div className="flex items-center justify-between">
                {cert.credentialId && (
                  <span className="text-xs text-muted-foreground font-mono">
                    ID: {cert.credentialId.slice(0, 12)}...
                  </span>
                )}
                {cert.credentialUrl && cert.credentialUrl !== '#' ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
                  >
                    View <FaExternalLinkAlt size={11} />
                  </a>
                ) : (
                  <span className="ml-auto text-xs text-muted-foreground">Certificate</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
