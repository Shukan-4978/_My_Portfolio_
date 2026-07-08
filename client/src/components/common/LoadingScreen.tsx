import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION_MS = 2400

export default function LoadingScreen() {
  const [visible,  setVisible]  = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress 0 → 100 over DURATION_MS
    const start     = performance.now()
    let rafId: number

    const tick = (now: number) => {
      const elapsed = now - start
      const pct     = Math.min((elapsed / DURATION_MS) * 100, 100)
      setProgress(pct)

      if (elapsed < DURATION_MS) {
        rafId = requestAnimationFrame(tick)
      } else {
        // Start fade-out
        setVisible(false)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
          }}
          aria-label="Loading portfolio…"
          aria-live="polite"
        >
          {/* ── Background blobs ──────────────────────────────────── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="blob w-96 h-96 bg-indigo-500 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
            <div className="blob w-80 h-80 bg-violet-500 bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 animation-delay-2000" />
          </div>

          {/* ── SP Monogram ──────────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Spinning ring behind the logo */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute inset-0 -m-2 rounded-full border-2 border-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(#09090f, #09090f), linear-gradient(135deg, #6366f1, #8b5cf6)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  borderRadius: '9999px',
                }}
              />
              <div className="relative gradient-bg w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                <span className="text-white text-4xl font-extrabold tracking-tight">SP</span>
              </div>
            </div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-foreground text-xl font-semibold tracking-wide"
            >
              Shukan<span className="gradient-text"> Prajapati</span>
            </motion.p>

            {/* Progress bar */}
            <div className="w-56 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-bg rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-muted-foreground tracking-widest uppercase"
            >
              Loading portfolio…
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
