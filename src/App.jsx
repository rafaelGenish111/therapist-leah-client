import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/auth/PrivateRoute';

// Import ALL CSS files in the correct order
import './styles/global.css';
import './components/ui/Spinner.css';
import './components/layout/Header.css';
import './components/layout/Footer.css';
import './components/admin/AdminSidebar.css';
import './components/admin/AdminDashboard.css';
import './pages/HomePage.css';
import './pages/AboutPage.css';
import './pages/ContantPage.css';
import './pages/LoginPage.css';
import './pages/AdminPage.css';
import GalleryPage from './pages/GalleryPage';
import ArticlesManager from './components/admin/ArticlesManager';
import GalleryManager from './components/admin/GalleryManager';
import AdminDashboard from './components/admin/AdminDashboard';
import HealthDeclarations from './components/admin/HealthDeclarations';
import HealthDeclarationPage from './pages/HealthDeclarationPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
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
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                 <Route path="/gallery" element={<GalleryPage />} />
                 <Route path="/health-declaration" element={<HealthDeclarationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<ArticlesManager />} />
                  <Route path="gallery" element={<GalleryManager />} />
                  <Route path="declarations" element={<HealthDeclarations />} />
                </Route>
              </Routes>
            </main>
            
            <Footer />
            
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--white)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'inherit',
                  fontSize: 'var(--font-size-sm)',
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

export default App;