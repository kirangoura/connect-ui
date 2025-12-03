import React, { useState, useEffect, useMemo } from 'react';
import { eventService } from '../services/api';

function FeaturedEvents({ categoryFilter, onFilterApplied }) {
  const [events, setEvents] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  // Extract unique locations from events for autocomplete
  const uniqueLocations = useMemo(() => {
    const locations = new Set();
    events.forEach(event => {
      if (event.city) locations.add(event.city);
      if (event.area) locations.add(event.area);
      if (event.zipcode) locations.add(event.zipcode);
    });
    return Array.from(locations).sort();
  }, [events]);

  // Apply category filter from navbar
  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
      const results = applyFilters(events, searchLocation, categoryFilter);
      setFiltered(results);
      onFilterApplied?.();
    }
  }, [categoryFilter]);

  // Apply filters to events
  const applyFilters = (allEvents, location, category) => {
    let results = allEvents;
    if (location) {
      const term = location.toLowerCase();
      results = results.filter(e => 
        e.city?.toLowerCase().includes(term) || 
        e.area?.toLowerCase().includes(term) || 
        e.zipcode?.includes(term)
      );
    }
    if (category) {
      results = results.filter(e => e.category === category);
    }
    return results;
  };

  // Fetch events from backend API
  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      console.log('Fetched events:', data.length);
      
      setEvents(prevEvents => {
        const dataHasChanged = prevEvents.length !== data.length || 
          JSON.stringify(prevEvents) !== JSON.stringify(data);
        
        if (dataHasChanged) {
          const filtered = applyFilters(data, searchLocation, selectedCategory);
          setFiltered(filtered);
          return data;
        }
        return prevEvents;
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
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
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [searchLocation, selectedCategory]);

  // Filter location suggestions as user types
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);
    
    if (value.length > 0) {
      const filtered = uniqueLocations
        .filter(loc => loc.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 6);
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  };

  const handleSelectLocation = (location) => {
    setSearchLocation(location);
    setShowLocationSuggestions(false);
    // Auto-search when selecting a suggestion
    const results = applyFilters(events, location, selectedCategory);
    setFiltered(results);
  };

  const handleSearch = () => {
    setShowLocationSuggestions(false);
    const results = applyFilters(events, searchLocation, selectedCategory);
    setFiltered(results);
  };

  const handleClearFilters = () => {
    setSearchLocation('');
    setSelectedCategory('');
    setFiltered(events);
    setShowLocationSuggestions(false);
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const result = await eventService.joinEvent(eventId);
      
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? { ...event, attendees: (event.attendees || 0) + 1 }
            : event
        )
      );
      
      setFiltered(prevFiltered =>
        prevFiltered.map(event =>
          event.id === eventId
            ? { ...event, attendees: (event.attendees || 0) + 1 }
            : event
        )
      );
      
      alert('Successfully joined the event!');
    } catch (error) {
      console.error('Error joining event:', error);
      alert('Could not join event: ' + error.message);
    }
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
        
        <div className="search-filters">
          <div className="filter-grid">
            <div className="filter-group">
              <label>Search by Location</label>
              <div className="location-autocomplete">
                <input 
                  type="text" 
                  placeholder="e.g., Portland, Downtown, 97201" 
                  value={searchLocation} 
                  onChange={handleLocationChange}
                  onFocus={() => searchLocation.length > 0 && locationSuggestions.length > 0 && setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  autoComplete="off"
                />
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <ul className="location-suggestions">
                    {locationSuggestions.map((loc, idx) => (
                      <li key={idx} onClick={() => handleSelectLocation(loc)}>
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
          </div>
          <div className="filter-actions">
            <button onClick={handleSearch} className="btn-search">
              Search
            </button>
            <button onClick={handleClearFilters} className="btn-clear">
              Clear Filters
            </button>
          </div>
        </div>

        {loading && <p className="status-message">Loading events...</p>}
        {!loading && filtered.length === 0 && <p className="status-message">No events found. Try adjusting your search.</p>}

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
