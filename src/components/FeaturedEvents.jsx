import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    zipcode: '',
    area: ''
  });
  const [availableCities, setAvailableCities] = useState([]);
  const [availableZipcodes, setAvailableZipcodes] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);

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
          category: 'Social',
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
          title: 'Book Club Discussion',
          category: 'Gathering',
          icon: '📚',
          date: 'Thursday, 7:00 PM',
          location: 'Local Library',
          city: 'Portland',
          zipcode: '97210',
          area: 'Central',
          attendees: 7,
          maxAttendees: 12
        }
      ]);
    } else {
      setEvents(data);
    }
    extractLocationData(data.length > 0 ? data : []);
    setLoading(false);
  };

  const extractLocationData = (eventList) => {
    const cities = [...new Set(eventList.map(e => e.city).filter(Boolean))].sort();
    const zipcodes = [...new Set(eventList.map(e => e.zipcode).filter(Boolean))].sort();
    const areas = [...new Set(eventList.map(e => e.area).filter(Boolean))].sort();
    
    setAvailableCities(cities);
    setAvailableZipcodes(zipcodes);
    setAvailableAreas(areas);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = async () => {
    setLoading(true);
    const filtered = await eventService.filterEvents(filters);
    if (filtered.length === 0) {
      setEvents([]);
    } else {
      setEvents(filtered);
    }
    setLoading(false);
  };

  const clearFilters = () => {
    setFilters({ city: '', zipcode: '', area: '' });
    loadEvents();
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
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Filter by Location</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>City</label>
              <select 
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="">All Cities</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Zipcode</label>
              <select 
                value={filters.zipcode}
                onChange={(e) => handleFilterChange('zipcode', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="">All Zipcodes</option>
                {availableZipcodes.map(zipcode => (
                  <option key={zipcode} value={zipcode}>{zipcode}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Area</label>
              <select 
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="">All Areas</option>
                {availableAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={applyFilters}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Apply Filters
            </button>
            <button 
              onClick={clearFilters}
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
        {!loading && events.length === 0 && <p style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>No events found matching your filters.</p>}
        
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
