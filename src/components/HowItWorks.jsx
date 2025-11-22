import React from 'react';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Browse Activities',
      description: 'Find events, sports, and gatherings near you'
    },
    {
      number: 2,
      title: 'Join or Create',
      description: 'RSVP to existing events or create your own'
    },
    {
      number: 3,
      title: 'Connect & Meet',
      description: 'Show up and make real connections in person'
    }
  ];

  return (
    <section className="how-it-works" id="about">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
