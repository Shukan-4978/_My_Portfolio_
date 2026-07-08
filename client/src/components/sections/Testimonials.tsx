import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { FaPaperPlane } from 'react-icons/fa'

export default function Testimonials() {
  const { ref, isInView } = useInView()
  const [formData, setFormData] = useState({ name: '', feedback: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', feedback: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section id="feedback" className="py-24 relative overflow-hidden" style={{ background: 'var(--section-bg)' }}>
      <div className="blob w-80 h-80 bg-violet-500 bottom-10 left-10 opacity-5 animation-delay-2000" />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Feedback</span>
          <h2 className="section-heading mb-4">
            Leave Your{' '}
            <span className="gradient-text">Comments</span>
          </h2>
          <p className="section-subheading mx-auto">
            I'd love to hear your thoughts on my portfolio!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto glass-card p-8 rounded-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-foreground mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                required
                rows={4}
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="What did you think about my projects?"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-xl gradient-bg text-white font-bold text-lg hover:shadow-glow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'submitting' ? 'Submitting...' : status === 'success' ? 'Thank You!' : (
                <>
                  <FaPaperPlane /> Submit Feedback
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
