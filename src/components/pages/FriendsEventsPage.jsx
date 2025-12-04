import React, { useState, useEffect } from 'react';
import { friendService } from '../../services/friendService';
import EventCard from '../EventCard';
import './Pages.css';

function FriendsEventsPage({ onBack }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFriendsEvents();
  }, []);

  const loadFriendsEvents = async () => {
    try {
      const data = await friendService.getFriendsEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load friends\' events');
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
        <h1>Friends' Events</h1>
        <p className="page-subtitle">See what your friends are attending</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading friends' events...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={loadFriendsEvents} className="btn-primary">Try Again</button>
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <h3>No friends' events</h3>
          <p>Your friends haven't joined any events yet, or you don't have friends connected.</p>
          <button className="btn-primary" onClick={onBack}>Browse Events</button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="friend-event-wrapper">
              <EventCard event={event} />
              <div className="friends-attending">
                <span className="friends-label">Friends attending:</span>
                <div className="friends-avatars">
                  {event.friendsAttending?.slice(0, 3).map(friend => (
                    friend.avatarUrl ? (
                      <img 
                        key={friend.id} 
                        src={friend.avatarUrl} 
                        alt={friend.firstName}
                        className="friend-mini-avatar"
                        title={`${friend.firstName} ${friend.lastName}`}
                      />
                    ) : (
                      <div 
                        key={friend.id}
                        className="friend-mini-avatar-placeholder"
                        title={`${friend.firstName} ${friend.lastName}`}
                      >
                        {friend.firstName?.[0]}
                      </div>
                    )
                  ))}
                  {event.friendsAttending?.length > 3 && (
                    <span className="more-friends">+{event.friendsAttending.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsEventsPage;
