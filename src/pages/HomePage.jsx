const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            ברוכים הבאים לקליניקת
            <br />
            <span className="highlight">לאה גניש</span>
          </h1>
          <p className="hero-description">
            הבחירה להרגיש טוב - טיפולי עיסוי מקצועיים ורפואה משלימה במרכז תל אביב
          </p>
          <div>
            <a href="#" className="btn btn-primary">קבע תור עכשיו</a>
            <a href="/about" className="btn btn-secondary">למד עוד</a>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="section-header">
          <h2>הטיפולים שלנו</h2>
          <p>מגוון טיפולים מקצועיים המותאמים לצרכיך האישיים</p>
        </div>
        
        <div className="grid grid-3">
          <div className="card fade-in">
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>🌿</div>
            <h3 style={{ textAlign: 'center' }}>עיסוי שוודי</h3>
            <p style={{ textAlign: 'center' }}>עיסוי מרגיע ומשחרר המותאם לכל גוף</p>
          </div>
          
          <div className="card fade-in">
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>💪</div>
            <h3 style={{ textAlign: 'center' }}>עיסוי ספורטיבי</h3>
            <p style={{ textAlign: 'center' }}>טיפול מקצועי לספורטאים ופעילים</p>
          </div>
          
          <div className="card fade-in">
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>🔥</div>
            <h3 style={{ textAlign: 'center' }}>עיסוי רקמות עמוקות</h3>
            <p style={{ textAlign: 'center' }}>שחרור מתחים עמוקים וכאבים כרוניים</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{ background: 'var(--background-alt)', margin: '0 -2rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>מוכנים לקבוע טיפול?</h2>
          <p className="mb-2">צרו קשר עוד היום ונתחיל את המסע שלכם לרווחה מיטבית</p>
          <div>
            <a href="tel:054-941-4947" className="btn btn-primary">📞 054-941-4947</a>
            <a href="/contact" className="btn btn-secondary">יצירת קשר</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;