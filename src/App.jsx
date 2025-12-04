import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import CreateEvent from './components/CreateEvent';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ProfilePage from './components/pages/ProfilePage';
import MyEventsPage from './components/pages/MyEventsPage';
import CreatedEventsPage from './components/pages/CreatedEventsPage';
import FriendsPage from './components/pages/FriendsPage';
import FriendsEventsPage from './components/pages/FriendsEventsPage';
import FavoritesPage from './components/pages/FavoritesPage';
import DiscoverPage from './components/pages/DiscoverPage';
import './App.css';

const PROTECTED_PAGES = ['profile', 'my-events', 'created-events', 'friends', 'friends-events', 'favorites', 'discover'];

function AppContent() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentPage, setCurrentPage] = useState('home');
  
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated && PROTECTED_PAGES.includes(currentPage)) {
      setCurrentPage('home');
      setAuthMode('login');
      setAuthModalOpen(true);
    }
  }, [isAuthenticated, loading, currentPage]);

  const handleCreateEventOpen = () => {
    if (!isAuthenticated) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setIsCreateEventOpen(true);
  };

  const handleCreateEventClose = () => {
    setIsCreateEventOpen(false);
  };

  const handleEventCreated = (newEvent) => {
    setRefreshEvents(prev => prev + 1);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthModalOpen(false);
  };

  const handleNavigate = (page) => {
    if (PROTECTED_PAGES.includes(page) && !isAuthenticated) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleAuthRequired = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage onBack={handleBackToHome} />;
      case 'my-events':
        return <MyEventsPage onBack={handleBackToHome} />;
      case 'created-events':
        return (
          <CreatedEventsPage 
            onBack={handleBackToHome} 
            onCreateEvent={handleCreateEventOpen}
          />
        );
      case 'friends':
        return <FriendsPage onBack={handleBackToHome} onNavigate={handleNavigate} />;
      case 'friends-events':
        return <FriendsEventsPage onBack={handleBackToHome} />;
      case 'favorites':
        return <FavoritesPage onBack={handleBackToHome} />;
      case 'discover':
        return <DiscoverPage onBack={handleBackToHome} />;
      default:
        return (
          <>
            <Hero onCreateEvent={handleCreateEventOpen} />
            <Categories onCategoryFilter={handleCategoryFilter} />
            <FeaturedEvents 
              key={refreshEvents} 
              categoryFilter={categoryFilter} 
              onFilterApplied={() => setCategoryFilter('')}
              onAuthRequired={handleAuthRequired}
            />
            <About />
            <HowItWorks />
            <CTASection />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar 
        onCreateEvent={handleCreateEventOpen} 
        onCategoryFilter={handleCategoryFilter}
        onOpenAuth={handleOpenAuth}
        onNavigate={handleNavigate}
      />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer />
      
      <CreateEvent
        isOpen={isCreateEventOpen}
        onClose={handleCreateEventClose}
        onEventCreated={handleEventCreated}
      />
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleCloseAuth}
        initialMode={authMode}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
