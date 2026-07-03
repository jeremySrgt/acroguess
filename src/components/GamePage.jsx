import { useState, useEffect, useCallback } from 'react'
import acronymsData from '../data/acronyms.json'

// Durée du jeu en secondes
const GAME_DURATION = 60

function GamePage({ onGameEnd }) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [currentAcronym, setCurrentAcronym] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null) // { type: 'correct'|'incorrect', message: string }
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [usedAcronyms, setUsedAcronyms] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)

  // Normaliser une chaîne pour la comparaison (insensible à la casse et aux espaces)
  const normalizeString = (str) => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  // Démarrer une nouvelle question
  const startNewQuestion = useCallback(() => {
    const availableAcronyms = acronymsData.filter(
      a => !usedAcronyms.includes(a.acronym)
    )
    
    let newAcronym
    let newUsedAcronyms = [...usedAcronyms]
    
    if (availableAcronyms.length === 0) {
      // Si tous les acronymes ont été utilisés, on réinitialise
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

  // Démarrer le jeu
  useEffect(() => {
    startNewQuestion()
    setIsGameActive(true)
    
    return () => {
      setIsGameActive(false)
    }
  }, [])

  // Timer
  useEffect(() => {
    if (!isGameActive) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          // Fin du jeu
          onGameEnd({
            score,
            correctCount,
            incorrectCount,
            total: correctCount + incorrectCount
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isGameActive, timeLeft, score, correctCount, incorrectCount, onGameEnd])

  // Gérer la soumission de la réponse
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!currentAcronym || !answer.trim()) return
    
    const normalizedAnswer = normalizeString(answer)
    const normalizedMeaning = normalizeString(currentAcronym.meaning)
    
    if (normalizedAnswer === normalizedMeaning) {
      // Bonne réponse
      setScore(prev => prev + 1)
      setCorrectCount(prev => prev + 1)
      setFeedback({
        type: 'correct',
        message: 'CORRECT !'
      })
    } else {
      // Mauvaise réponse
      setIncorrectCount(prev => prev + 1)
      setFeedback({
        type: 'incorrect',
        message: `FAUX ! C'ÉTAIT: ${currentAcronym.meaning.toUpperCase()}`
      })
    }
    
    // Passer à la question suivante après 1 seconde
    setTimeout(() => {
      startNewQuestion()
    }, 1000)
  }

  // Gérer l'appui sur Entrée
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  // Quitter le jeu
  const handleQuit = () => {
    setIsGameActive(false)
    onGameEnd({
      score,
      correctCount,
      incorrectCount,
      total: correctCount + incorrectCount
    })
  }

  if (!currentAcronym) {
    return <div>Chargement...</div>
  }

  return (
    <div className="game-container">
      <div className="game-info">
        <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
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
        <div className="input-container">
          <input
            type="text"
            className="answer-input"
            placeholder="ENTREZ LA SIGNIFICATION..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">
            VALIDER
          </button>
        </div>
      </form>

      {feedback && (
        <div className={`feedback feedback-${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <button 
        className="btn btn-danger" 
        onClick={handleQuit}
        style={{ marginTop: '20px' }}
      >
        ABANDONNER
      </button>
    </div>
  )
}

export default GamePage
