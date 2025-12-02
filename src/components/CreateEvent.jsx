import React, { useState } from 'react';
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
      const errorMsg = err.message || 'Failed to create event. Please check that the backend API is running.';
      setError(errorMsg);
      console.error('Create event error:', err);
      alert('❌ ' + errorMsg);
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
                placeholder="e.g., 97201 or 97201-1234"
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
