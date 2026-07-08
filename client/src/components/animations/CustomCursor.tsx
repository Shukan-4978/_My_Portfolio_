import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible,    setVisible]    = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Raw mouse position for the dot (immediate)
  const dotX = useSpring(0, { stiffness: 2000, damping: 80 })
  const dotY = useSpring(0, { stiffness: 2000, damping: 80 })

  // Lagged position for the ring (spring delay)
  const ringX = useSpring(0, { stiffness: 160, damping: 22 })
  const ringY = useSpring(0, { stiffness: 160, damping: 22 })

  useEffect(() => {
    // Detect touch devices — hide cursor on them
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches

    if (hasTouch) {
      setIsTouchDevice(true)
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const computed = window.getComputedStyle(target).cursor
      setIsHovering(
        computed === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null,
      )
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [dotX, dotY, ringX, ringY, visible])

  if (isTouchDevice) return null

  return (
    <>
      {/* ── Dot (follows exactly) ──────────────────────────────────── */}
      <motion.div
        className="custom-cursor"
        style={{
          left: dotX,
          top:  dotY,
          scale: isHovering ? 2 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { type: 'spring', stiffness: 400, damping: 30 } }}
        aria-hidden="true"
      />

      {/* ── Ring (spring-delayed) ─────────────────────────────────── */}
      <motion.div
        className="custom-cursor-follower"
        style={{
          left:    ringX,
          top:     ringY,
          scaleX:  isHovering ? 1.6 : 1,
          scaleY:  isHovering ? 1.6 : 1,
          opacity: visible ? (isHovering ? 0.8 : 0.5) : 0,
        }}
        transition={{ scale: { type: 'spring', stiffness: 200, damping: 25 } }}
        aria-hidden="true"
      />
    </>
  )
}
