import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/layout/AdminLayout';


// Create QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
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
            <Routes>
              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                } 
              />
              
              {/* Public Routes with Header/Footer */}
              <Route path="/*" element={
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
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
            
            {/* Global Toast Notifications */}
            <Toaster 
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Default options
                className: '',
                duration: 4000,
                style: {
                  background: 'var(--white)',
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                  fontSize: 'var(--font-size-sm)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border)',
                  direction: 'rtl',
                },
                
                // Success
                success: {
                  duration: 3000,
                  style: {
                    background: '#F0FDF4',
                    color: '#166534',
                    border: '1px solid #BBF7D0',
                  },
                  iconTheme: {
                    primary: '#22C55E',
                    secondary: '#FFFFFF',
                  },
                },
                
                // Error
                error: {
                  duration: 5000,
                  style: {
                    background: '#FEF2F2',
                    color: '#991B1B',
                    border: '1px solid #FECACA',
                  },
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#FFFFFF',
                  },
                },
                
                // Loading
                loading: {
                  duration: Infinity,
                  style: {
                    background: '#FFFBEB',
                    color: '#92400E',
                    border: '1px solid #FED7AA',
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

export default App;