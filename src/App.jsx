import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPages from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

// Basic styles
import './App.css';
import HealthDeclarationPage from './pages/HealthDeclarationPage';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            {/* Toast Notifications */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  direction: 'rtl',
                  fontFamily: 'inherit',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />

            <Routes>
              {/* Admin Routes - Protected */}
              <Route 
                path="/admin/*" 
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                } 
              />
              
              {/* Public Routes with Layout */}
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// Public Layout Component
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

// Simple 404 Page
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>העמוד לא נמצא</h2>
          <p>מצטערים, העמוד שחיפשת לא קיים.</p>
          <div className="not-found-actions">
            <a href="/" className="btn btn--primary">
              חזור לעמוד הבית
            </a>
            <a href="/contact" className="btn btn--outline">
              יצירת קשר
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;