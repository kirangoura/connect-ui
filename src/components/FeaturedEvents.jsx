import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

function FeaturedEvents() {
  const sampleEvents = [
    { id: 1, title: 'Weekend Hiking', category: 'Sports', icon: '🥾', date: 'Saturday, 9:00 AM', location: 'Mountain Trail', city: 'Portland', zipcode: '97201', area: 'Downtown', attendees: 12, maxAttendees: 15 },
    { id: 2, title: 'Morning Yoga', category: 'Fitness', icon: '🧘', date: 'Sunday, 7:00 AM', location: 'Central Park', city: 'Portland', zipcode: '97210', area: 'Central', attendees: 8, maxAttendees: 20 },
    { id: 3, title: 'Coffee Meetup', category: 'Events', icon: '☕', date: 'Friday, 5:00 PM', location: 'Downtown Cafe', city: 'Portland', zipcode: '97215', area: 'Southeast', attendees: 6, maxAttendees: 10 },
  ];

  const [events, setEvents] = useState(sampleEvents);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtered, setFiltered] = useState(sampleEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const data = await eventService.getAllEvents();
    const eventsToUse = (data && data.length > 0) ? data : sampleEvents;
    setEvents(eventsToUse);
    setFiltered(eventsToUse);
    setLoading(false);
  };

  const handleSearch = () => {
    let results = events;
    if (searchLocation) {
      const term = searchLocation.toLowerCase();
      results = results.filter(e => 
        e.city?.toLowerCase().includes(term) || 
        e.area?.toLowerCase().includes(term) || 
        e.zipcode?.includes(term)
      );
    }
    if (selectedCategory) {
      results = results.filter(e => e.category === selectedCategory);
    }
    setFiltered(results);
  };

  const handleClearFilters = () => {
    setSearchLocation('');
    setSelectedCategory('');
    setFiltered(events);
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
        
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Search by Location</label>
              <input type="text" placeholder="e.g., Portland" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="">All Categories</option>
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
          </div>
          <button onClick={handleSearch} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Search</button>
          <button onClick={handleClearFilters} style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
        </div>

        {loading && <p style={{ textAlign: 'center' }}>Loading events...</p>}
        {!loading && filtered.length === 0 && <p style={{ textAlign: 'center' }}>No events found.</p>}

        <div className="events-grid">
          {filtered.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.icon}</div>
              <div className="event-content">
                <span className="event-badge">{event.category}</span>
                <h3>{event.title}</h3>
                <p className="event-detail">📍 {event.location}</p>
                <p className="event-detail">🏙️ {event.city}, {event.zipcode}</p>
                <p className="event-detail">🕐 {event.date}</p>
                <p className="event-detail">👥 {event.attendees}/{event.maxAttendees}</p>
                <button className="btn-primary" onClick={() => handleJoinEvent(event.id)} disabled={event.attendees >= event.maxAttendees} style={{ opacity: event.attendees >= event.maxAttendees ? 0.5 : 1, cursor: event.attendees >= event.maxAttendees ? 'not-allowed' : 'pointer' }}>
                  {event.attendees >= event.maxAttendees ? 'Full' : 'Join'}
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
