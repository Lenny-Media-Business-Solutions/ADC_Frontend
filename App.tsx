import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Volunteer } from './pages/Volunteer';
import { Impact } from './pages/Impact';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Gallery } from './pages/Gallery';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { TrainingServices } from './pages/TrainingServices';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    const path = currentPath.toLowerCase();

    // Home
    if (path === '#' || path === '#/') return <Home />;

    // About
    if (path.startsWith('#/about')) return <About />;

    // Programs
    if (path === '#/programs') return <Programs />;
    if (path.startsWith('#/programs/')) {
      const id = path.split('/')[2];
      return <Programs programId={id} />;
    }

    // Projects
    if (path === '#/projects') return <Projects />;

    // Impact
    if (path === '#/impact') return <Impact />;

    // News
    if (path === '#/news') return <News />;
    if (path.startsWith('#/news/')) {
      const slug = path.split('/')[2];
      return <NewsDetail slug={slug} />;
    }

    // Gallery
    if (path === '#/gallery') return <Gallery />;

    // Training Services
    if (path === '#/training-services') return <TrainingServices />;

    // Contact
    if (path === '#/contact') return <Contact />;

    // Volunteer
    if (path === '#/volunteer') return <Volunteer />;

    // Admin (Staff Portal)
    if (path === '#/admin') {
      const isAuthenticated = !!localStorage.getItem('access_token');
      return isAuthenticated ? <AdminDashboard /> : <Login />;
    }

    // Login
    if (path === '#/login') return <Login />;

    // Fallback
    return (
      <div className="pt-32 pb-20 min-h-screen bg-earth-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white rounded-[3rem] py-24 border border-earth-100 shadow-sm">
          <h1 className="text-4xl font-serif text-earth-900 mb-6 font-black">Section Under Development</h1>
          <p className="text-earth-600 text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">This section is being updated with ADC's latest program data and community narratives.</p>
          <button
            onClick={() => window.location.hash = '#/'}
            className="bg-savanna-500 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-savanna-500/20 active:scale-95 transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  };

  const isAdminPath = currentPath.toLowerCase().startsWith('#/admin') || currentPath.toLowerCase().startsWith('#/login');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isAdminPath && <Navigation />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

export default App;