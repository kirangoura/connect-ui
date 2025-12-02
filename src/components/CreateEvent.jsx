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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                placeholder="e.g., Saturday, 9:00 AM"
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
            />
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
              />
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
              />
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
              />
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
