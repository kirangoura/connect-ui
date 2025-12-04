import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import EventCard from '../EventCard';
import './Pages.css';

function MyEventsPage({ onBack }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMyEvents();
  }, []);

  const loadMyEvents = async () => {
    try {
      const data = await userService.getMyEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load your events');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>My Events</h1>
        <p className="page-subtitle">Events you've joined</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading your events...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadMyEvents} className="btn-primary">Try Again</button>
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <h3>No events yet</h3>
          <p>You haven't joined any events yet. Explore and join some!</p>
          <button className="btn-primary" onClick={onBack}>Browse Events</button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              showLeaveOption 
              onLeave={handleLeaveEvent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEventsPage;
