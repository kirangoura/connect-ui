import React from 'react';

function Hero() {
  const handleExplore = () => {
    const element = document.getElementById('events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateEvent = () => {
    alert('Create Event - Coming Soon! You can create events by POSTing to /api/events');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Connect Outside, Live Better</h1>
        <p className="hero-subtitle">
          Join local events, sports activities, and fitness groups. 
          Meet real people, make real connections.
        </p>
        <div className="hero-buttons">
          <button className="btn-large btn-primary" onClick={handleExplore}>
            Explore Activities
          </button>
          <button className="btn-large btn-secondary" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
