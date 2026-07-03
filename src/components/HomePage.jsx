function HomePage({ onStart }) {
  return (
    <div className="end-page">
      <h1 className="title">ACROGUESS</h1>
      <p className="subtitle">DEVINE LES ACRONYMES TECH !</p>
      
      <div className="card instructions">
        <h3>COMMENT JOUER</h3>
        <ul>
          <li>Un acronyme tech s'affiche à l'écran</li>
          <li>Tu as 1 minute pour en deviner un maximum</li>
          <li>Saisis la signification complète et valide</li>
          <li>Gagne 1 point par bonne réponse</li>
        </ul>
      </div>
      
      <button 
        className="btn btn-primary" 
        onClick={onStart}
      >
        COMMENCER
      </button>
    </div>
  )
}

export default HomePage
