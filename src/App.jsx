import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <nav className="nav">
            <div className="nav-content">
              <div className="logo">
                <h1>ליאה גניש</h1>
                <p>הבחירה להרגיש טוב</p>
              </div>
              <ul className="nav-links">
                <li><Link to="/">בית</Link></li>
                <li><Link to="/about">אודות</Link></li>
                <li><Link to="/services">טיפולים</Link></li>
                <li><Link to="/contact">יצירת קשר</Link></li>
                <li><Link to="/login">כניסה למטפלת</Link></li>
              </ul>
            </div>
          </nav>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;