import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';
import './CreateEvent.css';

function CreateEvent({ isOpen, onClose, onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Events',
    description: '',
    date: '',
    location: '',
    city: '',
    area: '',
    zipcode: '',
    maxAttendees: 20
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [suggestions, setSuggestions] = useState({
    city: [],
    area: [],
    zipcode: []
  });
  const [existingData, setExistingData] = useState({
    cities: [],
    areas: [],
    zipcodes: []
  });
  const [showSuggestions, setShowSuggestions] = useState({
    city: false,
    area: false,
    zipcode: false
  });

  // Fetch existing events to extract unique locations
  useEffect(() => {
    const fetchExistingLocations = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/events');
        if (response.ok) {
          const events = await response.json();
          const cities = [...new Set(events.map(e => e.city).filter(Boolean))].sort();
          const areas = [...new Set(events.map(e => e.area).filter(Boolean))].sort();
          const zipcodes = [...new Set(events.map(e => e.zipcode).filter(Boolean))].sort();
          setExistingData({ cities, areas, zipcodes });
        }
      } catch (err) {
        console.log('Could not fetch existing locations for autocomplete');
      }
    };
    
    if (isOpen) {
      fetchExistingLocations();
    }
  }, [isOpen]);

  const validateLocation = (location) => {
    if (!location || location.trim().length < 2) {
      return 'Location must be at least 2 characters long';
    }
    return '';
  };

  const validateCity = (city) => {
    if (!city || city.trim().length < 2) {
      return 'City must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(city)) {
      return 'City should only contain letters, spaces, hyphens, and apostrophes';
    }
    return '';
  };

  const validateArea = (area) => {
    if (area && area.trim().length > 0) {
      if (area.trim().length < 2) {
        return 'Area must be at least 2 characters long';
      }
      if (!/^[a-zA-Z\s'-]+$/.test(area)) {
        return 'Area should only contain letters, spaces, hyphens, and apostrophes';
      }
    }
    return '';
  };

  const validateZipcode = (zipcode) => {
    if (zipcode && zipcode.trim().length > 0) {
      if (!/^\d{5}(-\d{4})?$/.test(zipcode.trim())) {
        return 'Zipcode must be in format 12345 or 12345-6789';
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Filter suggestions for autocomplete fields
    if (name === 'city' && value.length > 0) {
      const filtered = existingData.cities
        .filter(c => c.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(prev => ({ ...prev, city: filtered }));
      setShowSuggestions(prev => ({ ...prev, city: filtered.length > 0 }));
    } else if (name === 'area' && value.length > 0) {
      const filtered = existingData.areas
        .filter(a => a.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(prev => ({ ...prev, area: filtered }));
      setShowSuggestions(prev => ({ ...prev, area: filtered.length > 0 }));
    } else if (name === 'zipcode' && value.length > 0) {
      const filtered = existingData.zipcodes
        .filter(z => z.includes(value))
        .slice(0, 5);
      setSuggestions(prev => ({ ...prev, zipcode: filtered }));
      setShowSuggestions(prev => ({ ...prev, zipcode: filtered.length > 0 }));
    } else {
      setShowSuggestions(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSelectSuggestion = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setShowSuggestions(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    // Validate location fields
    const locationError = validateLocation(formData.location);
    const cityError = validateCity(formData.city);
    const areaError = validateArea(formData.area);
    const zipcodeError = validateZipcode(formData.zipcode);

    const newFieldErrors = {};
    if (locationError) newFieldErrors.location = locationError;
    if (cityError) newFieldErrors.city = cityError;
    if (areaError) newFieldErrors.area = areaError;
    if (zipcodeError) newFieldErrors.zipcode = zipcodeError;

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError('Please fix the errors below');
      return;
    }

    setLoading(true);

    try {
      const eventData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        city: formData.city,
        area: formData.area,
        zipcode: formData.zipcode,
        maxAttendees: parseInt(formData.maxAttendees)
      };

      console.log('Creating event with data:', eventData);
      const result = await eventService.createEvent(eventData);
      console.log('Event created successfully:', result);
      
      setFormData({
        title: '',
        category: 'Events',
        description: '',
        date: '',
        location: '',
        city: '',
        area: '',
        zipcode: '',
        maxAttendees: 20
      });
      
      alert('✅ Event created successfully!');
      onEventCreated?.(result);
      onClose();
    } catch (err) {
      const errorMsg = err.message || 'Failed to create event. The backend API may not be running.';
      setError(errorMsg);
      console.error('Create event error:', err.message);
      console.error('Full error:', err);
      alert('❌ Event Creation Failed\n\n' + errorMsg + '\n\nPlease ensure the backend API is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Community Park Cleanup"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date & Time *</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell people about your event..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Central Park"
              className={fieldErrors.location ? 'input-error' : ''}
            />
            {fieldErrors.location && <span className="field-error">{fieldErrors.location}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <div className="autocomplete-wrapper">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onFocus={() => formData.city.length > 0 && setShowSuggestions(prev => ({ ...prev, city: true }))}
                  required
                  placeholder="e.g., Portland"
                  className={fieldErrors.city ? 'input-error' : ''}
                  autoComplete="off"
                />
                {showSuggestions.city && suggestions.city.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.city.map((city, idx) => (
                      <li key={idx} onClick={() => handleSelectSuggestion('city', city)}>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {fieldErrors.city && <span className="field-error">{fieldErrors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="area">Area</label>
              <div className="autocomplete-wrapper">
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  onFocus={() => formData.area.length > 0 && setShowSuggestions(prev => ({ ...prev, area: true }))}
                  placeholder="e.g., Downtown"
                  className={fieldErrors.area ? 'input-error' : ''}
                  autoComplete="off"
                />
                {showSuggestions.area && suggestions.area.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.area.map((area, idx) => (
                      <li key={idx} onClick={() => handleSelectSuggestion('area', area)}>
                        {area}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {fieldErrors.area && <span className="field-error">{fieldErrors.area}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zipcode">Zipcode</label>
              <div className="autocomplete-wrapper">
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  onFocus={() => formData.zipcode.length > 0 && setShowSuggestions(prev => ({ ...prev, zipcode: true }))}
                  placeholder="e.g., 97201 or 97201-1234"
                  className={fieldErrors.zipcode ? 'input-error' : ''}
                  autoComplete="off"
                />
                {showSuggestions.zipcode && suggestions.zipcode.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.zipcode.map((zipcode, idx) => (
                      <li key={idx} onClick={() => handleSelectSuggestion('zipcode', zipcode)}>
                        {zipcode}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {fieldErrors.zipcode && <span className="field-error">{fieldErrors.zipcode}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="maxAttendees">Max Attendees</label>
            <input
              type="number"
              id="maxAttendees"
              name="maxAttendees"
              value={formData.maxAttendees}
              onChange={handleChange}
              min="1"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
