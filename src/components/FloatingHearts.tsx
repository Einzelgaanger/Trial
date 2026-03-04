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
  return (
    <div className="floating-hearts" aria-hidden>
      {FLOATERS.map(({ id, left, delay, duration, size, emoji }) => (
        <motion.span
          key={id}
          className="floating-heart"
          style={{
            left: `${left}%`,
            fontSize: size,
          }}
          initial={{ bottom: -30, opacity: 0 }}
          animate={{
            bottom: '110%',
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  )
}
