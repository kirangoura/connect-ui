import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';
import { userService } from '../services/userService';
import './EventCard.css';

function EventCard({ event, showLeaveOption, isOwner, isFavorite, onRemoveFavorite, onUpdate }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(isFavorite);

  const getCategoryIcon = (category) => {
    const icons = {
      'Sports': '⚽',
      'Fitness': '🏃',
      'Events': '🎉'
    };
    return icons[category] || '🎯';
  };

  const handleJoinEvent = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to join events');
      return;
    }
    setLoading(true);
    try {
      await eventService.joinEvent(event.id);
      alert('Successfully joined the event!');
      onUpdate?.();
    } catch (error) {
      alert('Could not join event: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to save events');
      return;
    }
    setLoading(true);
    try {
      if (isSaved) {
        await userService.removeFavorite(event.id);
        setIsSaved(false);
        onRemoveFavorite?.();
      } else {
        await userService.addFavorite(event.id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFull = (event.attendees || 0) >= event.maxAttendees;

  return (
    <div className="event-card-component">
      <div className="event-card-image">
        {event.icon || getCategoryIcon(event.category)}
      </div>
      
      <div className="event-card-content">
        <div className="event-card-header">
          <span className="event-category-badge">{event.category}</span>
          {isAuthenticated && (
            <button 
              className={`favorite-btn ${isSaved ? 'saved' : ''}`}
              onClick={handleToggleFavorite}
              disabled={loading}
              title={isSaved ? 'Remove from saved' : 'Save event'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          )}
        </div>
        
        <h3 className="event-card-title">{event.title}</h3>
        
        {event.description && (
          <p className="event-card-description">{event.description}</p>
        )}
        
        <div className="event-card-details">
          <p>📍 {event.location}</p>
          <p>🏙️ {event.city}{event.area ? `, ${event.area}` : ''} {event.zipcode}</p>
          <p>🕐 {event.date}</p>
          <p>👥 {event.attendees || 0}/{event.maxAttendees} attending</p>
        </div>

        {isOwner && (
          <span className="owner-badge">You're organizing this</span>
        )}

        <div className="event-card-actions">
          {showLeaveOption ? (
            <button className="btn-secondary">Leave Event</button>
          ) : (
            <button 
              className="btn-primary" 
              onClick={handleJoinEvent}
              disabled={isFull || loading}
            >
              {loading ? 'Joining...' : isFull ? 'Event Full' : 'Join Event'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
