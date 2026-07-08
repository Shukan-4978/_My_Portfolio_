import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'
import { Heart } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
] as const

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href:  'https://github.com/Shukan-4978',
    icon:  <FaGithub size={20} />,
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/shukan-prajapati-407106338/',
    icon:  <FaLinkedin size={20} />,
  },
  {
    label: 'Email',
    href:  'mailto:shukanp0509@gmail.com',
    icon:  <FaEnvelope size={20} />,
  },
] as const

function scrollToSection(href: string) {
  const id = href.slice(1)
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#09090f] text-gray-300 border-t border-white/5">
      {/* ── Main Grid ──────────────────────────────────────────────────── */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* ── Col 1: Brand ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="gradient-bg w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-indigo-500/20">
                SP
              </span>
              <span className="text-xl font-bold text-white tracking-tight">
                Shukan<span className="gradient-text">.</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Full Stack MERN Developer crafting scalable, performant, and beautiful web
              applications with modern technologies.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map(social => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ──────────────────────────────────────── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={e => { e.preventDefault(); scrollToSection(link.href) }}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact Info ─────────────────────────────────────── */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:shukanp0509@gmail.com"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-200">
                  <FaEnvelope size={13} />
                </span>
                shukanp0509@gmail.com
              </a>

              <a
                href="https://github.com/Shukan-4978"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-200">
                  <FaGithub size={13} />
                </span>
                github.com/Shukan-4978
              </a>

              <a
                href="https://www.linkedin.com/in/shukan-prajapati-407106338/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-200">
                  <FaLinkedin size={13} />
                </span>
                linkedin.com/in/shukan-prajapati
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            © {currentYear} Shukan Prajapati. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            Made with React + TypeScript + <Heart size={14} className="text-red-400 fill-red-400" />
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Back to top"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white group transition-colors duration-200"
          >
            <span>Back to top</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-200"
            >
              <FaArrowUp size={11} />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
