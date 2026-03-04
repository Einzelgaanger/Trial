import { motion } from 'framer-motion'
import { PHRASES, type Phrase } from '../constants/phrases'

const ROW_COUNT = 6
const ROW_DURATIONS = [38, 42, 45, 40, 44, 48]

function Word({ phrase, isHighlight, isHeart }: { phrase: Phrase; isHighlight: boolean; isHeart: boolean }) {
  return (
    <motion.span
      className={`infinite-word ${isHighlight ? 'infinite-word--highlight' : ''} ${isHeart ? 'infinite-word--heart' : ''}`}
      initial={{ opacity: 0.6 }}
      whileHover={{ opacity: 1, scale: 1.08 }}
      transition={{ duration: 0.2 }}
    >
      {phrase}
    </motion.span>
  )
}

function WordGroup() {
  return (
    <span className="infinite-words-group">
      {PHRASES.map((phrase, i) => (
        <Word
          key={`${i}-${phrase}`}
          phrase={phrase}
          isHighlight={phrase === 'Kimberly'}
          isHeart={phrase === '♥'}
        />
      ))}
    </span>
  )
}

export function InfiniteWords() {
  return (
    <div className="infinite-wrap">
      {Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="infinite-row"
          style={{
            animationDuration: `${ROW_DURATIONS[rowIndex]}s`,
            animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.88 }}
          transition={{ delay: rowIndex * 0.1, duration: 0.5 }}
        >
          <WordGroup />
          <WordGroup />
        </motion.div>
      ))}
    </div>
  )
}
