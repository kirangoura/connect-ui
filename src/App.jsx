import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedEvents />
      <HowItWorks />
      <CTASection />
      <Footer />
    </>
  );
}

export default App;
