import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

function FeaturedEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const sampleEvents = [
    {
      id: 1,
      title: 'Weekend Hiking Adventure',
      category: 'Sports',
      icon: '🥾',
      date: 'Saturday, 9:00 AM',
      location: 'Mountain Trail Park',
      city: 'Portland',
      zipcode: '97201',
      area: 'Downtown',
      attendees: 12,
      maxAttendees: 15
    },
    {
      id: 2,
      title: 'Morning Yoga in the Park',
      category: 'Fitness',
      icon: '🧘',
      date: 'Sunday, 7:00 AM',
      location: 'Central Park',
      city: 'Portland',
      zipcode: '97210',
      area: 'Central',
      attendees: 8,
      maxAttendees: 20
    },
    {
      id: 3,
      title: 'Coffee & Conversations',
      category: 'Events',
      icon: '☕',
      date: 'Friday, 5:00 PM',
      location: 'Downtown Cafe',
      city: 'Portland',
      zipcode: '97215',
      area: 'Southeast',
      attendees: 6,
      maxAttendees: 10
    },
    {
      id: 4,
      title: 'Basketball Pickup Game',
      category: 'Sports',
      icon: '🏀',
      date: 'Wednesday, 6:00 PM',
      location: 'Community Center',
      city: 'Portland',
      zipcode: '97201',
      area: 'Downtown',
      attendees: 10,
      maxAttendees: 12
    },
    {
      id: 5,
      title: 'Running Club Meetup',
      category: 'Fitness',
      icon: '🏃',
      date: 'Tuesday, 6:30 AM',
      location: 'Riverside Trail',
      city: 'Portland',
      zipcode: '97202',
      area: 'Southwest',
      attendees: 15,
      maxAttendees: 25
    },
    {
      id: 6,
      title: 'Tech Meetup Night',
      category: 'Events',
      icon: '💻',
      date: 'Thursday, 7:00 PM',
      location: 'Tech Hub Downtown',
      city: 'Portland',
      zipcode: '97201',
      area: 'Downtown',
      attendees: 20,
      maxAttendees: 50
    }
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const data = await eventService.getAllEvents();
    const eventsData = data.length > 0 ? data : sampleEvents;
    setAllEvents(eventsData);
    setEvents(eventsData);
    setLoading(false);
  };

  const localSearch = (location, category) => {
    let filtered = allEvents;

    // Filter by location (city, area, or zipcode)
    if (location && location.trim()) {
      const searchTerm = location.toLowerCase().trim();
      filtered = filtered.filter(event => {
        return (
          event.city?.toLowerCase().includes(searchTerm) ||
          event.area?.toLowerCase().includes(searchTerm) ||
          event.zipcode?.includes(searchTerm)
        );
      });
    }

    // Filter by category
    if (category && category.trim()) {
      filtered = filtered.filter(event => event.category === category);
    }

    return filtered;
  };

  const handleSearch = () => {
    setLoading(true);
    const results = localSearch(searchLocation, selectedCategory);
    setEvents(results);
    setLoading(false);
  };

  const handleClearFilters = () => {
    setSearchLocation('');
    setSelectedCategory('');
    setEvents(allEvents);
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
        
        {/* Filter Section */}
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Search by City/Area/Zipcode
              </label>
              <input 
                type="text"
                placeholder="e.g., Portland, Downtown, 97201"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Category
              </label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Categories</option>
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleSearch}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Search
            </button>
            <button 
              onClick={handleClearFilters}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center' }}>Loading events...</p>}
        {!loading && events.length === 0 && <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>No events found. Try adjusting your search.</p>}
        
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">{event.icon}</div>
              <div className="event-content">
                <span className="event-badge">{event.category}</span>
                <h3>{event.title}</h3>
                <p className="event-detail">📍 {event.location}</p>
                {event.city && <p className="event-detail">🏙️ {event.city}, {event.zipcode}</p>}
                {event.area && <p className="event-detail">📍 {event.area}</p>}
                <p className="event-detail">🕐 {event.date}</p>
                <p className="event-detail">👥 {event.attendees}/{event.maxAttendees} attending</p>
                <button 
                  className="btn-primary"
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={event.attendees >= event.maxAttendees}
                  style={{
                    opacity: event.attendees >= event.maxAttendees ? 0.5 : 1,
                    cursor: event.attendees >= event.maxAttendees ? 'not-allowed' : 'pointer'
                  }}
                >
                  {event.attendees >= event.maxAttendees ? 'Event Full' : 'Join Event'}
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
