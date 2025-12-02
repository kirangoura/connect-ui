import React, { useState } from 'react';
import CreateEvent from './components/CreateEvent';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleCreateEventOpen = () => {
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

  return (
    <div className="app">
      <Navbar onCreateEvent={handleCreateEventOpen} onCategoryFilter={handleCategoryFilter} />
      <Hero onCreateEvent={handleCreateEventOpen} />
      <Categories onCategoryFilter={handleCategoryFilter} />
      <FeaturedEvents key={refreshEvents} categoryFilter={categoryFilter} onFilterApplied={() => setCategoryFilter('')} />
      <About />
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
