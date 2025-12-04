import React, { useState } from 'react';
import { eventService } from '../services/eventService';
import { searchAddresses, cancelSearch } from '../services/addressService';
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
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

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
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      location: value
    }));
    
    if (fieldErrors.location) {
      setFieldErrors(prev => ({
        ...prev,
        location: ''
      }));
    }

    if (value.length >= 3) {
      setIsSearchingAddress(true);
      try {
        const suggestions = await searchAddresses(value);
        setAddressSuggestions(suggestions);
        setShowAddressSuggestions(suggestions.length > 0);
      } catch (err) {
        console.error('Address search error:', err);
      } finally {
        setIsSearchingAddress(false);
      }
    } else {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
    }
  };

  const handleSelectAddress = (address) => {
    setFormData(prev => ({
      ...prev,
      location: address.location || address.label,
      city: address.city || prev.city,
      area: address.area || prev.area,
      zipcode: address.zipcode || prev.zipcode
    }));
    setShowAddressSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
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
      
      alert('Event created successfully!');
      onEventCreated?.(result);
      onClose();
    } catch (err) {
      const errorMsg = err.message || 'Failed to create event. The backend API may not be running.';
      setError(errorMsg);
      console.error('Create event error:', err.message);
      console.error('Full error:', err);
      alert('Event Creation Failed\n\n' + errorMsg + '\n\nPlease ensure the backend API is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    cancelSearch();
    setShowAddressSuggestions(false);
    setAddressSuggestions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="modal-close" onClick={handleCloseModal}>×</button>
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
            <label htmlFor="location">Location * <span className="label-hint">(Start typing for suggestions)</span></label>
            <div className="autocomplete-wrapper">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleLocationChange}
                onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
                onFocus={() => addressSuggestions.length > 0 && setShowAddressSuggestions(true)}
                required
                placeholder="e.g., 123 Main Street, Portland"
                className={fieldErrors.location ? 'input-error' : ''}
                autoComplete="off"
              />
              {isSearchingAddress && (
                <div className="search-indicator">Searching...</div>
              )}
              {showAddressSuggestions && addressSuggestions.length > 0 && (
                <ul className="suggestions-list address-suggestions">
                  {addressSuggestions.map((address) => (
                    <li 
                      key={address.id} 
                      onClick={() => handleSelectAddress(address)}
                      className="address-suggestion-item"
                    >
                      <div className="suggestion-main">{address.label}</div>
                      {(address.city || address.zipcode) && (
                        <div className="suggestion-details">
                          {[address.city, address.state, address.zipcode].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {fieldErrors.location && <span className="field-error">{fieldErrors.location}</span>}
            <span className="field-help">Select an address to auto-fill city, area, and zipcode, or enter manually below</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="e.g., Portland"
                className={fieldErrors.city ? 'input-error' : ''}
              />
              {fieldErrors.city && <span className="field-error">{fieldErrors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., Downtown"
                className={fieldErrors.area ? 'input-error' : ''}
              />
              {fieldErrors.area && <span className="field-error">{fieldErrors.area}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="e.g., 97201"
                className={fieldErrors.zipcode ? 'input-error' : ''}
              />
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
            <button type="button" className="btn-cancel" onClick={handleCloseModal}>
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
