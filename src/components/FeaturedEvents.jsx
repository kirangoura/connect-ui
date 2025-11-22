import React, { useState } from 'react';

function FeaturedEvents() {
  const [events] = useState([
    { id: 1, title: 'Weekend Hiking', category: 'Sports', icon: '🥾', date: 'Saturday, 9:00 AM', location: 'Mountain Trail', city: 'Portland', zipcode: '97201', area: 'Downtown', attendees: 12, maxAttendees: 15 },
    { id: 2, title: 'Morning Yoga', category: 'Fitness', icon: '🧘', date: 'Sunday, 7:00 AM', location: 'Central Park', city: 'Portland', zipcode: '97210', area: 'Central', attendees: 8, maxAttendees: 20 },
    { id: 3, title: 'Coffee Meetup', category: 'Events', icon: '☕', date: 'Friday, 5:00 PM', location: 'Downtown Cafe', city: 'Portland', zipcode: '97215', area: 'Southeast', attendees: 6, maxAttendees: 10 },
    { id: 4, title: 'Basketball Game', category: 'Sports', icon: '🏀', date: 'Wednesday, 6:00 PM', location: 'Community Center', city: 'Portland', zipcode: '97201', area: 'Downtown', attendees: 10, maxAttendees: 12 },
    { id: 5, title: 'Running Club', category: 'Fitness', icon: '🏃', date: 'Tuesday, 6:30 AM', location: 'Riverside Trail', city: 'Portland', zipcode: '97202', area: 'Southwest', attendees: 15, maxAttendees: 25 },
    { id: 6, title: 'Tech Meetup', category: 'Events', icon: '💻', date: 'Thursday, 7:00 PM', location: 'Tech Hub', city: 'Portland', zipcode: '97201', area: 'Downtown', attendees: 20, maxAttendees: 50 },
  ]);

  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtered, setFiltered] = useState(events);

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
          <button onClick={() => { setFiltered(events); setSearchLocation(''); setSelectedCategory(''); }} style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
        </div>

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
                <button className="btn-primary" disabled={event.attendees >= event.maxAttendees} style={{ opacity: event.attendees >= event.maxAttendees ? 0.5 : 1, cursor: event.attendees >= event.maxAttendees ? 'not-allowed' : 'pointer' }}>
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
