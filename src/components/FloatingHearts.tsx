import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FLOATERS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 8 + Math.random() * 6,
  size: 14 + Math.random() * 18,
  emoji: ['♥', '💕', '💗'][i % 3],
}))

export function FloatingHearts() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="floating-hearts" aria-hidden>
      {FLOATERS.map(({ id, left, delay, duration, size, emoji }) => (
        <motion.span
          key={id}
          className="floating-heart"
          style={{
            left: `${left}%`,
            fontSize: size,
            bottom: -30,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={
            prefersReducedMotion
              ? { y: 0, opacity: 0.25 }
              : {
                  y: '-120vh',
                  opacity: [0, 0.5, 0.5, 0],
                }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : duration,
            delay: prefersReducedMotion ? 0 : delay,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'linear',
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  )
}
