import React from 'react';

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About Connect</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>Community Building</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Connect brings people together to share experiences and build meaningful relationships through local events, sports activities, and fitness groups.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>Easy Discovery</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Search and filter events by location and category to find activities that match your interests and schedule in your area.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>Real Connections</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Join events, meet new people, and make real connections with your community. Step outside and live better.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '1rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>Our Mission</h3>
          <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            To empower communities by creating accessible platforms where people can discover, organize, and participate in local events—fostering genuine connections and vibrant community life.
          </p>
        </div>

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '0.5rem' }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1f2937' }}>📅 Events</h4>
            <p style={{ color: '#6b7280' }}>Social gatherings, meetups, and creative activities to connect with like-minded people.</p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '0.5rem' }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1f2937' }}>⚽ Sports</h4>
            <p style={{ color: '#6b7280' }}>Basketball, soccer, hiking, and more outdoor sports to stay active with your community.</p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '0.5rem' }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1f2937' }}>🏃 Fitness</h4>
            <p style={{ color: '#6b7280' }}>Running clubs, yoga sessions, and wellness groups to achieve your fitness goals together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
