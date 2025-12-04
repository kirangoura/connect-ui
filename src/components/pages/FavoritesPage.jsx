import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import EventCard from '../EventCard';
import './Pages.css';

function FavoritesPage({ onBack }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await userService.getFavorites();
      setEvents(data);
    } catch (err) {
      setError('Failed to load saved events');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (eventId) => {
    try {
      await userService.removeFavorite(eventId);
      setEvents(events.filter(e => e.id !== eventId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
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
        <h1>Saved Events</h1>
        <p className="page-subtitle">Events you've bookmarked</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading saved events...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadFavorites} className="btn-primary">Try Again</button>
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h3>No saved events</h3>
          <p>Bookmark events you're interested in to find them later!</p>
          <button className="btn-primary" onClick={onBack}>Browse Events</button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              isFavorite 
              onRemoveFavorite={() => handleRemoveFavorite(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
