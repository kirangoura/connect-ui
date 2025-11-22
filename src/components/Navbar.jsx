import React from 'react';

function Navbar() {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJoinNow = (e) => {
    e.preventDefault();
    const element = document.getElementById('events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Connect</div>
        <div className="nav-links">
          <a href="#events" onClick={(e) => scrollToSection(e, 'events')}>Events</a>
          <a href="#sports" onClick={(e) => scrollToSection(e, 'sports')}>Sports</a>
          <a href="#fitness" onClick={(e) => scrollToSection(e, 'fitness')}>Fitness</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <button className="btn-primary" onClick={handleJoinNow}>Join Now</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
