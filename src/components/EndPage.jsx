function EndPage({ results, onBackToGame }) {
  const { score, correctCount, incorrectCount, total, history = [] } = results || {}
  
  // Calculer le pourcentage de réussite
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0

  return (
    <div className="end-page">
      <h1 className="title">PARTIE TERMINÉE</h1>
      
      <div className="final-score">
        SCORE: {score}
      </div>

      <div className="card">
        <div className="stats">
          <div className="stat-item">
            <div className="stat-value">{correctCount}</div>
            <div className="stat-label">BONNES RÉPONSES</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{incorrectCount}</div>
            <div className="stat-label">MAUVAISES RÉPONSES</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{accuracy}%</div>
            <div className="stat-label">PRÉCISION</div>
          </div>
        </div>
      </div>

      {/* Historique des réponses */}
      {history.length > 0 && (
        <div className="card history-card">
          <h3 style={{ color: 'var(--neon-blue)', marginBottom: '15px', textAlign: 'center' }}>
            RÉCAPITULATIF
          </h3>
          <div className="history-list">
            {history.map((entry, index) => (
              <div 
                key={index} 
                className={`history-item ${entry.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <span className="history-acronym">{entry.acronym}:</span>
                <span className="history-answers">
                  <span className="history-user-answer">
                    {entry.userAnswer || '(pas de réponse)'}
                  </span>
                  {!entry.isCorrect && (
                    <>
                      <span style={{ color: 'var(--text-secondary)' }}> → </span>
                      <span className="history-correct-answer">{entry.correctAnswer}</span>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: '30px 0' }}>
        <button 
          className="btn btn-primary" 
          onClick={onBackToGame}
          style={{ marginRight: '15px' }}
        >
          JOUER À NOUVEAU
        </button>
      </div>
    </div>
  )
}

export default EndPage
