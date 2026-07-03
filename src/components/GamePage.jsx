import { useState, useEffect, useCallback } from 'react'
import acronymsData from '../data/acronyms.json'

// Durée du jeu en secondes
const GAME_DURATION = 60

function GamePage({ onGameEnd }) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [currentAcronym, setCurrentAcronym] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [usedAcronyms, setUsedAcronyms] = useState([])
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameHistory, setGameHistory] = useState([])

  // Normaliser une chaîne : insensible à la casse, espaces multiples, et tirets
  const normalizeString = (str) => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ').replace(/-/g, '')
  }

  // Démarrer une nouvelle question
  const startNewQuestion = useCallback(() => {
    const availableAcronyms = acronymsData.filter(
      a => !usedAcronyms.includes(a.acronym)
    )
    
    let newAcronym
    let newUsedAcronyms = [...usedAcronyms]
    
    if (availableAcronyms.length === 0) {
      newUsedAcronyms = []
      const allAcronyms = [...acronymsData]
      const randomIndex = Math.floor(Math.random() * allAcronyms.length)
      newAcronym = allAcronyms[randomIndex]
      newUsedAcronyms.push(newAcronym.acronym)
    } else {
      const randomIndex = Math.floor(Math.random() * availableAcronyms.length)
      newAcronym = availableAcronyms[randomIndex]
      newUsedAcronyms.push(newAcronym.acronym)
    }
    
    setCurrentAcronym(newAcronym)
    setAnswer('')
    setFeedback(null)
    setUsedAcronyms(newUsedAcronyms)
  }, [usedAcronyms])

  // Démarrer le timer
  const startTimer = useCallback(() => {
    if (isTimerRunning) return
    setIsTimerRunning(true)
  }, [isTimerRunning])

  // Démarrer le jeu avec le premier acronyme
  useEffect(() => {
    startNewQuestion()
  }, [])

  // Timer (ne démarre que quand isTimerRunning est vrai)
  useEffect(() => {
    if (!isTimerRunning) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onGameEnd({
            score,
            correctCount,
            incorrectCount,
            total: correctCount + incorrectCount,
            history: gameHistory
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isTimerRunning, timeLeft, score, correctCount, incorrectCount, onGameEnd, gameHistory])

  // Gérer la soumission de la réponse
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!currentAcronym || !answer.trim()) return
    
    const normalizedAnswer = normalizeString(answer)
    const normalizedMeaning = normalizeString(currentAcronym.meaning)
    
    // Vérifier si la réponse correspond à la signification principale ou à une alternative
    let isCorrect = normalizedAnswer === normalizedMeaning
    
    if (!isCorrect && currentAcronym.alternatives) {
      isCorrect = currentAcronym.alternatives.some(alt => 
        normalizeString(alt) === normalizedAnswer
      )
    }
    
    const historyEntry = {
      acronym: currentAcronym.acronym,
      userAnswer: answer,
      correctAnswer: currentAcronym.meaning,
      isCorrect: isCorrect
    }
    setGameHistory(prev => [...prev, historyEntry])
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setCorrectCount(prev => prev + 1)
      setFeedback({
        type: 'correct',
        message: 'CORRECT !'
      })
    } else {
      setIncorrectCount(prev => prev + 1)
      setFeedback({
        type: 'incorrect',
        message: `FAUX ! C'ÉTAIT: ${currentAcronym.meaning.toUpperCase()}`
      })
    }
    
    setTimeout(() => {
      startNewQuestion()
    }, 1000)
  }

  // Gérer l'input change
  const handleInputChange = (e) => {
    setAnswer(e.target.value)
    if (!isTimerRunning && timeLeft === GAME_DURATION) {
      startTimer()
    }
  }

  // Gérer l'appui sur Entrée
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  // Réinitialiser le jeu
  const handleRestart = () => {
    setTimeLeft(GAME_DURATION)
    setScore(0)
    setCorrectCount(0)
    setIncorrectCount(0)
    setUsedAcronyms([])
    setGameHistory([])
    setIsTimerRunning(false)
    setFeedback(null)
    startNewQuestion()
  }

  if (!currentAcronym) {
    return <div>Chargement...</div>
  }

  return (
    <div className="game-container">
      <button 
        className="btn-instructions" 
        onClick={() => setShowInstructions(!showInstructions)}
      >
        ❓ COMMENT JOUER
      </button>

      {showInstructions && (
        <div className="modal-overlay" onClick={() => setShowInstructions(false)}>
          <div className="modal-content card" onClick={e => e.stopPropagation()}>
            <h3 style={{ color: 'var(--neon-purple)', marginBottom: '15px' }}>COMMENT JOUER</h3>
            <ul className="instructions-list">
              <li>Un acronyme tech s'affiche à l'écran</li>
              <li>Le timer démarre dès que tu commences à taper</li>
              <li>Tu as 1 minute pour en deviner un maximum</li>
              <li>Saisis la signification complète et valide</li>
              <li>Gagne 1 point par bonne réponse</li>
              <li><strong>Astuce :</strong> Les tirets et espaces multiples sont ignorés</li>
            </ul>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowInstructions(false)}
              style={{ marginTop: '15px' }}
            >
              FERMER
            </button>
          </div>
        </div>
      )}

      <div className="game-info">
        <div className={`timer ${timeLeft <= 10 ? 'warning' : ''} ${!isTimerRunning ? 'paused' : ''}`}>
          {timeLeft}s
        </div>
        <div className="score">
          SCORE: {score}
        </div>
      </div>

      <h2 className="acronym-display">
        {currentAcronym.acronym}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="answer-input full-width"
          placeholder={isTimerRunning ? "ENTREZ LA SIGNIFICATION..." : "TAPEZ POUR COMMENCER..."}
          value={answer}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          disabled={timeLeft <= 0}
        />
      </form>

      {feedback && (
        <div className={`feedback feedback-${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button 
          className="btn" 
          onClick={handleRestart}
        >
          RECOMMENCER
        </button>
      </div>
    </div>
  )
}

export default GamePage
