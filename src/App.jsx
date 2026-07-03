import { useState } from 'react'
import GamePage from './components/GamePage'
import EndPage from './components/EndPage'

function App() {
  const [gameState, setGameState] = useState('playing') // 'playing', 'ended'
  const [gameResults, setGameResults] = useState(null)

  const handleGameEnd = (results) => {
    setGameResults(results)
    setGameState('ended')
  }

  const handleBackToGame = () => {
    setGameState('playing')
    setGameResults(null)
  }

  return (
    <div className="container">
      {gameState === 'playing' && (
        <GamePage onGameEnd={handleGameEnd} />
      )}
      {gameState === 'ended' && (
        <EndPage results={gameResults} onBackToGame={handleBackToGame} />
      )}
    </div>
  )
}

export default App
