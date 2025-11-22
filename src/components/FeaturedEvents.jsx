import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const data = await eventService.getAllEvents();
    if (data.length === 0) {
      // Use sample data if API returns empty
      setEvents([
        {
          id: 1,
          title: 'Weekend Hiking Adventure',
          category: 'Sports',
          icon: '🥾',
          date: 'Saturday, 9:00 AM',
          location: 'Mountain Trail Park',
          attendees: 12,
          max_attendees: 15
        },
        {
          id: 2,
          title: 'Morning Yoga in the Park',
          category: 'Fitness',
          icon: '🧘',
          date: 'Sunday, 7:00 AM',
          location: 'Central Park',
          attendees: 8,
          max_attendees: 20
        },
        {
          id: 3,
          title: 'Coffee & Conversations',
          category: 'Social',
          icon: '☕',
          date: 'Friday, 5:00 PM',
          location: 'Downtown Cafe',
          attendees: 6,
          max_attendees: 10
        },
        {
          id: 4,
          title: 'Basketball Pickup Game',
          category: 'Sports',
          icon: '🏀',
          date: 'Wednesday, 6:00 PM',
          location: 'Community Center',
          attendees: 10,
          max_attendees: 12
        },
        {
          id: 5,
          title: 'Running Club Meetup',
          category: 'Fitness',
          icon: '🏃',
          date: 'Tuesday, 6:30 AM',
          location: 'Riverside Trail',
          attendees: 15,
          max_attendees: 25
        },
        {
          id: 6,
          title: 'Book Club Discussion',
          category: 'Gathering',
          icon: '📚',
          date: 'Thursday, 7:00 PM',
          location: 'Local Library',
          attendees: 7,
          max_attendees: 12
        }
      ]);
    } else {
      setEvents(data);
    }
    setLoading(false);
  };

  const handleJoinEvent = async (eventId) => {
    try {
      await eventService.joinEvent(eventId);
      loadEvents();
    } catch (error) {
      console.error('Could not join event:', error);
    }
  };

  return (
    <section className="featured-events" id="events">
      <div className="container">
        <h2 className="section-title">Happening This Week</h2>
        {loading && <p style={{ textAlign: 'center' }}>Loading events...</p>}
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.icon}</div>
              <div className="event-content">
                <span className="event-badge">{event.category}</span>
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <div>📅 {event.date}</div>
                  <div>📍 {event.location}</div>
                </div>
                <div className="event-attendees">
                  👥 {event.attendees}/{event.max_attendees} going
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '1rem' }}
                  onClick={() => handleJoinEvent(event.id)}
                >
                  Join Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;
