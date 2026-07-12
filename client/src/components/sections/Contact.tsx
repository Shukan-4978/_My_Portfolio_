import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import emailjs from '@emailjs/browser'
import type { ContactForm } from '@/types'
import {
  FaEnvelope, FaGithub, FaLinkedin,
  FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa'
import { Loader2 } from 'lucide-react'

const INITIAL_FORM: ContactForm = { name: '', email: '', subject: '', message: '' }

type Status = 'idle' | 'sending' | 'success' | 'error'

function validate(form: ContactForm) {
  const errors: Partial<ContactForm> = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Invalid email'
  if (!form.subject.trim()) errors.subject = 'Subject is required'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 20) errors.message = 'Message too short (min 20 chars)'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [status, setStatus] = useState<Status>('idle')
  const { ref, isInView } = useInView()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('sending')
    try {
      // EmailJS integration — replace with your IDs
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: 'Shukan Prajapati',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'var(--section-bg)' }}>
      <div className="blob w-96 h-96 bg-blue-500 top-10 right-10 opacity-5 animation-delay-2000" />
      <div className="blob w-72 h-72 bg-violet-500 bottom-10 left-10 opacity-5 animation-delay-4000" />

      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Get In Touch</span>
          <h2 className="section-heading mb-4">
            Let's Work{' '}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subheading mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-bold text-2xl mb-2 text-foreground">Contact Information</h3>
              <p className="text-muted-foreground text-sm">
                I'm currently open to freelance work and full-time opportunities.
              </p>
            </div>

            {/* Info cards */}
            {[
              {
                icon: <FaEnvelope className="text-blue-500" />,
                label: 'Email',
                value: 'shukanp0509@gmail.com',
                href: 'mailto:shukanp0509@gmail.com',
              },
              {
                icon: <FaGithub className="text-foreground" />,
                label: 'GitHub',
                value: 'github.com/Shukan-4978',
                href: 'https://github.com/Shukan-4978',
              },
              {
                icon: <FaLinkedin className="text-blue-500" />,
                label: 'LinkedIn',
                value: 'Shukan Prajapati',
                href: 'https://www.linkedin.com/in/shukan-prajapati-407106338/',
              },
              {
                icon: <FaMapMarkerAlt className="text-red-400" />,
                label: 'Location',
                value: 'India (Remote-friendly)',
                href: null,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 glass-card">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-foreground hover:text-blue-500 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Availability */}
            <div className="availability-badge w-fit">
              <span className="availability-dot" />
              Available for new opportunities
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center h-full flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <FaCheckCircle className="text-emerald-500 mx-auto" size={64} />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary mt-4"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground placeholder:text-muted-foreground text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground placeholder:text-muted-foreground text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="subject">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Collaboration / Job Opportunity"
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground placeholder:text-muted-foreground text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                      errors.subject ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground placeholder:text-muted-foreground text-sm outline-none transition-all resize-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                      errors.message ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    Something went wrong. Please try emailing me directly at shukanp0509@gmail.com
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
