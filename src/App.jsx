import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import HealthDeclarationPage from './pages/HealthDeclarationPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';

// Admin Components
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlesManager from './components/admin/ArticlesManager';
import GalleryManager from './components/admin/GalleryManager';
import HealthDeclarations from './components/admin/HealthDeclarations';
import AdminStats from './components/admin/AdminStats';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/auth/PrivateRoute';

// Styles
import './styles/global.css';
import './components/ui/Spinner.css';
import './components/layout/Header.css';
import './components/layout/Footer.css';
import './pages/HomePage.css';
import './pages/AboutPage.css';
import './pages/LoginPage.css';
import './components/layout/AdminLayout.css';
import './components/admin/AdminDashboard.css';
import './components/admin/AdminSidebar.css';
import './components/admin/AdminStats.css';
import './pages/ArticlesPage.css';
import ArticleEditor from './components/admin/ArticleEditor';
import AdminSettings from './components/admin/AdminSettings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
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
              {/* Public Routes with Header & Footer */}
              <Route path="/" element={
                <>
                  <Header />
                  <main className="main-content">
                    <HomePage />
                  </main>
                  <Footer />
                </>
              } />
              
              <Route path="/about" element={
                <>
                  <Header />
                  <main className="main-content">
                    <AboutPage />
                  </main>
                  <Footer />
                </>
              } />
              
              <Route path="/services" element={
                <>
                  <Header />
                  <main className="main-content">
                    <ServicesPage />
                  </main>
                  <Footer />
                </>
              } />
              
              <Route path="/articles" element={
                <>
                  <Header />
                  <main className="main-content">
                    <ArticlesPage />
                  </main>
                  <Footer />
                </>
              } />
              
              <Route path="/contact" element={
                <>
                  <Header />
                  <main className="main-content">
                    <ContactPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/declarations" element={
                <>
                  <Header />
                  <main className="main-content">
                    <HealthDeclarationPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/gallery" element={
                <>
                  <Header />
                  <main className="main-content">
                    <GalleryPage />
                  </main>
                  <Footer />
                </>
              } />
              
              <Route path="/login" element={
                <>
                  <Header />
                  <main className="main-content">
                    <LoginPage />
                  </main>
                  <Footer />
                </>
              } />

              {/* Admin Routes with Admin Layout */}
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="declarations" element={<HealthDeclarations />} />
                <Route path="stats" element={<AdminStats />} />
                <Route path="settings" element={<AdminSettings />} />

                                  {/* Articles Management */}
                  <Route path="articles" element={<ArticlesManager />} />
                  <Route path="articles/new" element={<ArticleEditor />} />
                  <Route path="articles/edit/:id" element={<ArticleEditor />} />

              </Route>
            </Routes>

            {/* Toast Notifications */}
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                duration: 4000,
                style: {
                  direction: 'rtl',
                  fontFamily: 'inherit',
                },
                success: {
                  style: {
                    background: '#22C55E',
                    color: 'white',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                    color: 'white',
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