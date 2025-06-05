import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { Link } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ fontFamily: 'Arial', direction: 'rtl' }}>
          <nav style={{ 
            padding: '20px', 
            background: '#f5f5f5', 
            textAlign: 'center',
            borderBottom: '1px solid #ddd'
          }}>
            <h1 style={{ color: '#D4B5B0', margin: '0 0 10px 0' }}>
              קליניקת ליאה גניש
            </h1>
            <p style={{ margin: 0, color: '#666' }}>הבחירה להרגיש טוב</p>
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