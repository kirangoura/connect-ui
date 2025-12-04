import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserMenu from './UserMenu';
import './Navbar.css';

function Navbar({ onCreateEvent, onCategoryFilter, onOpenAuth, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    onNavigate?.('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    setMenuOpen(false);
  };

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    onCategoryFilter?.(category);
    onNavigate?.('home');
    setTimeout(() => {
      const element = document.getElementById('events');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    setMenuOpen(false);
  };

  const handleJoinNow = (e) => {
    e.preventDefault();
    onNavigate?.('home');
    setTimeout(() => {
      const element = document.getElementById('events');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    setMenuOpen(false);
  };

  const handleCreateEvent = () => {
    if (!isAuthenticated) {
      onOpenAuth?.('login');
      return;
    }
    onCreateEvent?.();
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate?.('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          Connect
        </div>
        
        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#events" onClick={(e) => handleCategoryClick(e, 'Events')}>Events</a>
          <a href="#sports" onClick={(e) => handleCategoryClick(e, 'Sports')}>Sports</a>
          <a href="#fitness" onClick={(e) => handleCategoryClick(e, 'Fitness')}>Fitness</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          
          <button className="btn-secondary nav-create-btn" onClick={handleCreateEvent}>
            Create Event
          </button>
          
          {loading ? (
            <div className="auth-loading"></div>
          ) : isAuthenticated ? (
            <UserMenu onNavigate={onNavigate} />
          ) : (
            <div className="auth-buttons">
              <button className="btn-login" onClick={() => onOpenAuth?.('login')}>
                Sign In
              </button>
              <button className="btn-primary" onClick={() => onOpenAuth?.('signup')}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
