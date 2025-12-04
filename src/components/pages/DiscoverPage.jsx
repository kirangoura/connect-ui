import React from 'react';
import './Pages.css';

function DiscoverPage({ onBack }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Discover People</h1>
        <p className="page-subtitle">Find and connect with others in your community</p>
      </div>

      <div className="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <h3>Coming Soon</h3>
        <p>We're working on helping you discover new people to connect with.</p>
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
          In the meantime, attend events to meet others in your community!
        </p>
      </div>
    </div>
  );
}

export default DiscoverPage;
