import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/auth/PrivateRoute';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import HealthDeclarationPage from './pages/HealthDeclarationPage'; // ✅ הוספה
import LoginPage from './pages/LoginPage';

// ✅ Import Admin components
import AdminPage from './pages/AdminPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlesManager from './components/admin/ArticlesManager';
import GalleryManager from './components/admin/GalleryManager';
import HealthDeclarations from './components/admin/HealthDeclarations';



// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
            <Header />
            
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/health-declaration" element={<HealthDeclarationPage />} /> {/* ✅ הוספה */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* ✅ Admin Routes - מוגנים */}
                <Route path="/admin" element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }>
                  {/* Nested admin routes */}
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<ArticlesManager />} />
                  <Route path="gallery" element={<GalleryManager />} />
                  <Route path="declarations" element={<HealthDeclarations />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={
                  <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h1>404 - עמוד לא נמצא</h1>
                    <p>העמוד שחיפשת אינו קיים</p>
                  </div>
                } />
              </Routes>
            </main>
            
            <Footer />
            
            {/* Toast notifications */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  direction: 'rtl',
                },
                success: {
                  style: {
                    background: '#22C55E',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
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