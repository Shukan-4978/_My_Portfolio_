import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollProgress'
import { useTheme } from '@/context/ThemeContext'
import ThemeToggle from '@/components/common/ThemeToggle'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Experience',  href: '#experience' },
  { label: 'Contact',     href: '#contact' },
] as const

const mobileMenuVariants = {
  hidden:  { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeInOut' } },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
}

const linkItemVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3 },
  }),
}

export default function Navbar() {
  const scrollY = useScrollY()
  useTheme() // ensures ThemeProvider is present; ThemeToggle child reads it
  const [isOpen,        setIsOpen]        = useState(false)
  const [activeSection,   setActiveSection]   = useState('home')

  const isScrolled = scrollY > 20

  // ── Active-section tracking ──────────────────────────────────────────────
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])


  // ── Smooth scroll ────────────────────────────────────────────────────────
  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'navbar-scrolled py-3' : 'py-5',
        ].join(' ')}
        role="banner"
      >
        <nav className="section-container flex items-center justify-between" aria-label="Main navigation">
          {/* ── Logo ─────────────────────────────────────────────────── */}
          <motion.a
            href="#home"
            onClick={e => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="gradient-bg w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:shadow-blue-500/40 transition-shadow duration-300">
              SP
            </span>
            <span className="hidden sm:block font-semibold text-foreground tracking-tight">
              Shukan<span className="gradient-text">.</span>
            </span>
          </motion.a>

          {/* ── Desktop Links ─────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                    className={[
                      'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-muted-foreground hover:text-foreground',
                    ].join(' ')}
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 gradient-bg rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                </li>
              )
            })}
          </ul>

          {/* ── Right Controls ────────────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setIsOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'block' }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* ── Mobile Menu ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden glass border-t border-border"
            >
              <ul className="section-container py-4 flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <motion.li
                      key={link.href}
                      custom={i}
                      variants={linkItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a
                        href={link.href}
                        onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                        className={[
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'gradient-bg text-white shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                        ].join(' ')}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-muted-foreground'}`} />
                        {link.label}
                      </a>
                    </motion.li>
                  )
                })}

              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
