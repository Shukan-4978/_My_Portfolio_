import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Hash } from 'lucide-react'

interface Section {
  id:    string
  label: string
  desc:  string
}

const SECTIONS: Section[] = [
  { id: 'home',         label: 'Home',         desc: 'Back to the top'           },
  { id: 'about',        label: 'About',        desc: 'Who I am & my background'  },
  { id: 'skills',       label: 'Skills',       desc: 'Tech stack & proficiency'  },
  { id: 'projects',     label: 'Projects',     desc: 'Things I have built'       },
  { id: 'experience',   label: 'Experience',   desc: 'Work history & roles'      },
  { id: 'certificates', label: 'Certificates', desc: 'Certifications & courses'  },
  { id: 'achievements', label: 'Achievements', desc: 'Awards & milestones'       },
  { id: 'blog',         label: 'Blog',         desc: 'Articles & write-ups'      },
  { id: 'contact',      label: 'Contact',      desc: 'Get in touch'              },
]

interface CommandPaletteProps {
  isOpen:  boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query,        setQuery]       = useState('')
  const [highlighted,  setHighlighted] = useState(0)
  const inputRef   = useRef<HTMLInputElement>(null)
  const listRef    = useRef<HTMLUListElement>(null)

  const filtered = query.trim()
    ? SECTIONS.filter(
        s =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.desc.toLowerCase().includes(query.toLowerCase()),
      )
    : SECTIONS

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setHighlighted(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Reset highlighted index when filter changes
  useEffect(() => {
    setHighlighted(0)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlighted(h => Math.min(h + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlighted(h => Math.max(h - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[highlighted]) navigate(filtered[highlighted].id)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, highlighted, filtered])

  const navigate = useCallback((id: string) => {
    onClose()
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }, [onClose])

  // Scroll highlighted item into view
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const item = list.children[highlighted] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [highlighted])

  const overlayVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  }

  const boxVariants = {
    hidden:  { opacity: 0, scale: 0.94, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 380, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: -16,
      transition: { duration: 0.18 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="command-box mx-4"
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Search Input ─────────────────────────────────────── */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search sections…"
                className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search sections"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border text-muted-foreground text-[10px] font-mono">
                ESC
              </kbd>
            </div>

            {/* ── Results List ─────────────────────────────────────── */}
            <ul
              ref={listRef}
              className="overflow-y-auto max-h-80 py-2"
              role="listbox"
              aria-label="Sections"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </li>
              ) : (
                filtered.map((section, idx) => {
                  const isActive = idx === highlighted
                  return (
                    <motion.li
                      key={section.id}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => navigate(section.id)}
                      onMouseEnter={() => setHighlighted(idx)}
                      className={[
                        'flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150',
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                          : 'text-foreground hover:bg-muted',
                      ].join(' ')}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-indigo-500/15' : 'bg-muted'}`}>
                        <Hash size={13} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{section.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{section.desc}</p>
                      </div>
                      {isActive && (
                        <ArrowRight size={14} className="shrink-0 opacity-60" />
                      )}
                    </motion.li>
                  )
                })
              )}
            </ul>

            {/* ── Footer hint ──────────────────────────────────────── */}
            <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-border font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-border font-mono">↵</kbd>
                go
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-border font-mono">ESC</kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
