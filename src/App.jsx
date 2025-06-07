import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

// Styles
import './styles/global.css';
import './App.css';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Admin Routes */}
                <Route 
                  path="/admin/*" 
                  element={
                    <PrivateRoute>
                      <AdminPage />
                    </PrivateRoute>
                  } 
                />
                
                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            
            <Footer />
            
            {/* Global Toast Notifications */}
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerStyle={{
                top: 100, // Account for header height
              }}
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--white)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(212, 181, 176, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '500',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  backdropFilter: 'blur(20px)',
                },
                success: {
                  style: {
                    borderColor: 'var(--success)',
                    background: 'rgba(34, 197, 94, 0.05)',
                  },
                  iconTheme: {
                    primary: 'var(--success)',
                    secondary: 'var(--white)',
                  },
                },
                error: {
                  style: {
                    borderColor: 'var(--error)',
                    background: 'rgba(239, 68, 68, 0.05)',
                  },
                  iconTheme: {
                    primary: 'var(--error)',
                    secondary: 'var(--white)',
                  },
                },
                loading: {
                  style: {
                    borderColor: 'var(--primary-color)',
                    background: 'rgba(212, 181, 176, 0.05)',
                  },
                  iconTheme: {
                    primary: 'var(--primary-color)',
                    secondary: 'var(--white)',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// 404 Page Component
const NotFoundPage = () => (
  <div className="not-found-page">
    <div className="container">
      <div className="not-found-content">
        <div className="not-found-text">
          <h1>404</h1>
          <h2>הדף לא נמצא</h2>
          <p>מצטערים, הדף שחיפשת לא קיים או הועבר למקום אחר</p>
        </div>
        <div className="not-found-actions">
          <a href="/" className="btn btn--primary">
            חזור לעמוד הראשי
          </a>
          <a href="/contact" className="btn btn--outline">
            יצירת קשר
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default App;