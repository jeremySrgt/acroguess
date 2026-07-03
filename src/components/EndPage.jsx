function EndPage({ results, onBackToHome }) {
  const { score, correctCount, incorrectCount, total } = results || {}
  
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

      <div style={{ margin: '30px 0' }}>
        <button 
          className="btn btn-primary" 
          onClick={onBackToHome}
          style={{ marginRight: '15px' }}
        >
          JOUER À NOUVEAU
        </button>
        <button 
          className="btn" 
          onClick={onBackToHome}
        >
          MENU PRINCIPAL
        </button>
      </div>
    </div>
  )
}

export default EndPage
