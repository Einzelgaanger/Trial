import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET_SCORE = 15
const HEART_SYMBOLS = ['♥', '💕', '💗', '💖', '🌸']
const FALL_DURATION = 5
const SPAWN_INTERVAL = 800

interface FallingHeart {
  id: number
  x: number
  symbol: string
  duration: number
  delay: number
}

export function HeartGame() {
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState<FallingHeart[]>([])
  const [won, setWon] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const idRef = useRef(0)
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const spawnHeart = useCallback(() => {
    const x = 10 + Math.random() * 80
    const symbol = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)]
    const duration = FALL_DURATION + Math.random() * 2
    const delay = Math.random() * 0.5
    setHearts((prev) => [...prev, { id: ++idRef.current, x, symbol, duration, delay }])
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setHearts([])
    setWon(false)
    setIsOpen(true)
    spawnHeart()
    spawnRef.current = setInterval(spawnHeart, SPAWN_INTERVAL)
  }, [spawnHeart])

  const catchHeart = useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id))
    setScore((s) => {
      const next = s + 1
      if (next >= TARGET_SCORE) {
        setWon(true)
        if (spawnRef.current) clearInterval(spawnRef.current)
        spawnRef.current = null
      }
      return next
    })
  }, [])

  useEffect(() => {
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current)
    }
  }, [])

  return (
    <>
      <motion.button
        type="button"
        className="game-trigger"
        onClick={startGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Catch hearts for Kimberly ♡
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="game-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !won && setIsOpen(false)}
          >
            <motion.div
              className="game-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="game-header">
                <span className="game-score">Hearts: {score} / {TARGET_SCORE}</span>
                <button type="button" className="game-close" onClick={() => setIsOpen(false)} aria-label="Close">
                  ×
                </button>
              </div>

              <div className="game-area">
                <AnimatePresence>
                  {hearts.map((heart) => (
                    <FallingHeartKey
                      key={heart.id}
                      heart={heart}
                      onCatch={() => catchHeart(heart.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <p className="game-hint">Tap the hearts before they fall!</p>

              <AnimatePresence>
                {won && (
                  <motion.div
                    className="game-won"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <span className="game-won-emoji">💕</span>
                    <p>Kimberly feels so loved!</p>
                    <p className="game-won-sub">You did it!</p>
                    <motion.button
                      type="button"
                      className="game-play-again"
                      onClick={() => { setIsOpen(false); startGame(); }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Play again
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const GAME_AREA_HEIGHT = 320

function FallingHeartKey({ heart, onCatch }: { heart: FallingHeart; onCatch: () => void }) {
  return (
    <motion.button
      type="button"
      className="falling-heart"
      style={{ left: `${heart.x}%` }}
      initial={{ x: '-50%', y: -30, opacity: 1 }}
      animate={{
        x: '-50%',
        y: GAME_AREA_HEIGHT + 30,
        opacity: 1,
      }}
      transition={{
        duration: heart.duration,
        delay: heart.delay,
        ease: 'linear',
      }}
      exit={{ opacity: 0, scale: 1.5 }}
      onClick={(e) => {
        e.stopPropagation()
        onCatch()
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.15 }}
    >
      {heart.symbol}
    </motion.button>
  )
}
