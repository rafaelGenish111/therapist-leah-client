import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlesManager from './components/admin/ArticlesManager';
import GalleryManager from './components/admin/GalleryManager';
import HealthDeclarations from './components/admin/HealthDeclarations';



// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
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
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="articles" element={<ArticlesPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="articles" element={<ArticlesManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="declarations" element={<HealthDeclarations />} />
              </Route>
            </Routes>

            {/* Global Toast Notifications */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--white)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  boxShadow: 'var(--shadow-lg)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--success)',
                    secondary: 'var(--white)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'var(--error)',
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
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;