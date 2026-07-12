import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'
import { Heart } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href:  'https://github.com/Shukan-4978',
    icon:  <FaGithub size={18} />,
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/shukan-prajapati-407106338/',
    icon:  <FaLinkedin size={18} />,
  },
  {
    label: 'Email',
    href:  'mailto:shukanp0509@gmail.com',
    icon:  <FaEnvelope size={18} />,
  },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="section-container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground tracking-tight">
              Shukan<span className="gradient-text">.</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Shukan Prajapati. All rights reserved.
          </p>
        </div>

        {/* Made with Love */}
        <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
          Made with <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(social => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-1"></div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow"
          >
            <FaArrowUp size={14} />
          </motion.button>
        </div>

      </div>
    </footer>
  )
}
