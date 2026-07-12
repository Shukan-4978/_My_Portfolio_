import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import type { Project, ProjectFilter } from '@/types'
import api from '@/services/api'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { Eye, Star, Loader2 } from 'lucide-react'

const FILTERS: ProjectFilter[] = ['All', 'AI', 'MERN', 'Full Stack', 'React', 'Backend']

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const imageUrl = (project.images[0] as any)?.url || project.images[0]

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="project-card glass-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="project-card-img"
            loading="lazy"
          />
        ) : (
          <div className="project-card-img bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors"
              >
                <FaGithub size={12} /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/80 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-blue-600/80 transition-colors"
              >
                <FaExternalLinkAlt size={10} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-yellow-400/90 rounded-full text-black text-xs font-bold">
            <Star size={10} fill="currentColor" /> Featured
          </div>
        )}

        {/* Category badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {project.category.slice(0, 2).map((cat) => (
            <span key={cat} className="px-2 py-0.5 bg-blue-600/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag text-xs">{tech}</span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tag text-xs">+{project.techStack.length - 5}</span>
          )}
        </div>

        {/* Features preview */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-1 mb-4">
            {project.features.slice(0, 3).map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub size={14} /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-500 transition-colors ml-3"
            >
              <Eye size={14} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, isInView } = useInView()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects')
        setProjects(res.data.data.items || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter as never))

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="blob w-72 h-72 bg-violet-500 bottom-20 left-10 opacity-5" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Portfolio</span>
          <h2 className="section-heading mb-4">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading mx-auto">
            Real-world applications I've built — from conception to production deployment.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {FILTERS.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`skill-tab ${activeFilter === filter ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
                <span className="ml-1.5 text-xs opacity-70">
                  ({filter === 'All' ? projects.length : projects.filter((p) => p.category.includes(filter as never)).length})
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No projects available at the moment.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/Shukan-4978"
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex"
          >
            <FaGithub size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
