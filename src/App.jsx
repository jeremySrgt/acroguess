import { useState } from 'react'
import HomePage from './components/HomePage'
import GamePage from './components/GamePage'
import EndPage from './components/EndPage'

function App() {
  const [gameState, setGameState] = useState('home') // 'home', 'playing', 'ended'
  const [gameResults, setGameResults] = useState(null)

  const handleStartGame = () => {
    setGameState('playing')
  }

  const handleGameEnd = (results) => {
    setGameResults(results)
    setGameState('ended')
  }

  const handleBackToHome = () => {
    setGameState('home')
    setGameResults(null)
  }

  return (
    <div className="container">
      {gameState === 'home' && (
        <HomePage onStart={handleStartGame} />
      )}
      {gameState === 'playing' && (
        <GamePage onGameEnd={handleGameEnd} />
      )}
      {gameState === 'ended' && (
        <EndPage results={gameResults} onBackToHome={handleBackToHome} />
      )}
    </div>
  )
}

export default App
