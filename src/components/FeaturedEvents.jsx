import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAllEvents();
      console.log('Fetched events:', data.length);
      setEvents(data);
      setFiltered(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Set up polling to check for new events every 10 seconds
  useEffect(() => {
    const pollInterval = setInterval(() => {
      console.log('Polling for new events...');
      fetchEvents();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(pollInterval);
  }, []);

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

  const handleJoinEvent = (eventId) => {
    alert(`Joined event #${eventId}!`);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Sports': '⚽',
      'Fitness': '🏃',
      'Events': '🎉'
    };
    return icons[category] || '🎯';
  };

  return (
    <section className="featured-events" id="events">
      <div className="container">
        <h2 className="section-title">Happening This Week</h2>
        
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Search by Location</label>
              <input 
                type="text" 
                placeholder="e.g., Portland, Downtown, 97201" 
                value={searchLocation} 
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="">All Categories</option>
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleSearch} 
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Search
          </button>
          <button 
            onClick={handleClearFilters} 
            style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </div>

        {loading && <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>Loading events...</p>}
        {!loading && filtered.length === 0 && <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>No events found. Try adjusting your search.</p>}

        <div className="events-grid">
          {filtered.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.icon || getCategoryIcon(event.category)}</div>
              <div className="event-content">
                <span className="event-badge">{event.category}</span>
                <h3>{event.title}</h3>
                {event.description && <p className="event-detail">{event.description}</p>}
                <p className="event-detail">📍 {event.location}</p>
                <p className="event-detail">🏙️ {event.city}{event.area ? `, ${event.area}` : ''} {event.zipcode}</p>
                <p className="event-detail">🕐 {event.date}</p>
                <p className="event-detail">👥 {event.attendees || 0}/{event.maxAttendees} attending</p>
                <button 
                  className="btn-primary" 
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={(event.attendees || 0) >= event.maxAttendees}
                  style={{ opacity: (event.attendees || 0) >= event.maxAttendees ? 0.5 : 1, cursor: (event.attendees || 0) >= event.maxAttendees ? 'not-allowed' : 'pointer' }}
                >
                  {(event.attendees || 0) >= event.maxAttendees ? 'Event Full' : 'Join Event'}
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
