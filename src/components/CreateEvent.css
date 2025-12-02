import React, { useState } from 'react';
import CreateEvent from './components/CreateEvent';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(0);

  const handleCreateEventOpen = () => {
    setIsCreateEventOpen(true);
  };

  const handleCreateEventClose = () => {
    setIsCreateEventOpen(false);
  };

  const handleEventCreated = (newEvent) => {
    setRefreshEvents(prev => prev + 1);
  };

  return (
    <div className="app">
      <Navbar onCreateEvent={handleCreateEventOpen} />
      <Hero onCreateEvent={handleCreateEventOpen} />
      <Categories />
      <FeaturedEvents key={refreshEvents} />
      <HowItWorks />
      <CTASection />
      <Footer />
      <CreateEvent
        isOpen={isCreateEventOpen}
        onClose={handleCreateEventClose}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
}

export default App;
