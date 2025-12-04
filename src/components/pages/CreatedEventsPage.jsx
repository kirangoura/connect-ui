import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import EventCard from '../EventCard';
import './Pages.css';

function CreatedEventsPage({ onBack, onCreateEvent }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCreatedEvents();
  }, []);

  const loadCreatedEvents = async () => {
    try {
      const data = await userService.getMyCreatedEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load your created events');
    } finally {
      setLoading(false);
    }
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
        <h1>Created Events</h1>
        <p className="page-subtitle">Events you've organized</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading your created events...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadCreatedEvents} className="btn-primary">Try Again</button>
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <h3>No events created yet</h3>
          <p>You haven't created any events. Start organizing!</p>
          <button className="btn-primary" onClick={onCreateEvent}>Create Event</button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} isOwner />
          ))}
        </div>
      )}
    </div>
  );
}

export default CreatedEventsPage;
