const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const eventService = {
  async getAllEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async getEvent(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!response.ok) throw new Error('Event not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  async createEvent(event) {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (!response.ok) throw new Error('Failed to create event');
      return await response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async joinEvent(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to join event');
      return await response.json();
    } catch (error) {
      console.error('Error joining event:', error);
      throw error;
    }
  }
};
