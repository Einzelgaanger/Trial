import { Hero } from './components/Hero'
import { InfiniteWords } from './components/InfiniteWords'
import { HeartGame } from './components/HeartGame'
import { FloatingHearts } from './components/FloatingHearts'
import './App.css'

function App() {
  return (
    <div className="app">
      <FloatingHearts />
      <InfiniteWords />
      <Hero />
      <HeartGame />
    </div>
  )
}

export default App
