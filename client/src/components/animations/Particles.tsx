import { useEffect, useRef } from 'react'

interface Particle {
  x:  number
  y:  number
  vx: number
  vy: number
  r:  number
}

const PARTICLE_COUNT = 60
const MAX_DIST       = 130  // max px distance for drawing connections
const MOUSE_RADIUS   = 120  // pixels of mouse influence
const ATTRACTION     = 0.015 // strength of mouse attraction

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx    = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width  = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    // ── Initialise particles ──────────────────────────────────────────────
    const init = () => {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r:  Math.random() * 2 + 1,
        })
      }
    }

    // ── Draw loop ─────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current

      particles.forEach(p => {
        // Mouse attraction
        const dx    = mx - p.x
        const dy    = my - p.y
        const dist  = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          p.vx += (dx / dist) * ATTRACTION
          p.vy += (dy / dist) * ATTRACTION
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        // Move
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -1 }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1 }

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a  = particles[i]
          const b  = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth   = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    // ── Mouse tracking ────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect      = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      init()
    })

    resize()
    init()
    draw()

    const parent = canvas.parentElement
    if (parent) {
      resizeObserver.observe(parent)
      parent.addEventListener('mousemove',  onMouseMove)
      parent.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      if (parent) {
        parent.removeEventListener('mousemove',  onMouseMove)
        parent.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        width:         '100%',
        height:        '100%',
      }}
    />
  )
}
