import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import type { Service as IService } from '@/types'
import api from '@/services/api'
import {
  FaCode, FaLayerGroup, FaServer, FaChartBar,
  FaBrain, FaRocket, FaCloud, FaShieldAlt
} from 'react-icons/fa'
import { ArrowRight, Loader2 } from 'lucide-react'

const ICON_MAP: Record<string, React.ReactElement> = {
  FaCode: <FaCode size={24} />,
  FaLayerGroup: <FaLayerGroup size={24} />,
  FaServer: <FaServer size={24} />,
  FaChartBar: <FaChartBar size={24} />,
  FaBrain: <FaBrain size={24} />,
  FaRocket: <FaRocket size={24} />,
  FaCloud: <FaCloud size={24} />,
  FaShieldAlt: <FaShieldAlt size={24} />,
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Services() {
  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, isInView } = useInView()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services')
        setServices(res.data.data.items || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-indigo-500 top-20 left-0 opacity-5 animation-delay-4000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">What I Offer</span>
          <h2 className="section-heading mb-4">
            Services &{' '}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subheading mx-auto">
            End-to-end development services tailored to build modern, scalable digital products.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No services available at the moment.
          </div>
        ) : (
          /* Services Grid */
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.sort((a, b) => a.order - b.order).map((service) => (
              <motion.div
                key={service._id}
                variants={fadeUp}
                className="glass-card p-6 group hover-lift relative overflow-hidden flex flex-col"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-4 text-white shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                  {ICON_MAP[service.icon] || <FaCode size={24} />}
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-indigo-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mt-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-1 text-indigo-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-4">
            Have a project in mind? Let's build something amazing together.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Start a Project <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
