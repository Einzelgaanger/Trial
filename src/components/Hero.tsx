import { motion } from 'framer-motion'

export function Hero() {
  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        className="hero__name"
        animate={{
          textShadow: [
            '0 2px 20px rgba(233, 30, 99, 0.4)',
            '0 4px 32px rgba(233, 30, 99, 0.6)',
            '0 2px 20px rgba(233, 30, 99, 0.4)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        Kimberly
      </motion.h1>
      <motion.p
        className="hero__sub"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        you're so loved
      </motion.p>
    </motion.div>
  )
}
