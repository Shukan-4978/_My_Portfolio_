import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { BLOGS_DATA } from '@/data/portfolio'
import { FaClock, FaArrowRight, FaTag } from 'react-icons/fa'
import { ArrowRight } from 'lucide-react'

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function Blog() {
  const { ref, isInView } = useInView()

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-blue-500 bottom-20 right-10 opacity-5 animation-delay-2000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Writing</span>
          <h2 className="section-heading mb-4">
            Latest{' '}
            <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="section-subheading mx-auto">
            Thoughts on web development, best practices, and the technologies I work with.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {BLOGS_DATA.map((blog, i) => (
            <motion.article
              key={blog._id}
              variants={fadeUp}
              className={`glass-card group hover-lift overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className={`flex flex-col ${i === 0 ? 'md:flex-row' : ''}`}>
                {/* Cover placeholder */}
                <div
                  className={`${i === 0 ? 'md:w-2/5' : 'w-full'} h-48 flex-shrink-0 overflow-hidden`}
                  style={{
                    background: `linear-gradient(135deg, rgba(99, 102, 241, ${0.15 + i * 0.05}) 0%, rgba(139, 92, 246, ${0.15 + i * 0.05}) 100%)`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl font-black gradient-text opacity-30 select-none">
                        {blog.title.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag text-xs flex items-center gap-1">
                        <FaTag size={9} /> {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-blue-500 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Meta + CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FaClock size={11} /> {blog.readTime} min read
                      </span>
                      <span>•</span>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
                      Read <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="btn-outline inline-flex">
            View All Posts <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
