const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Add CORS headers support for direct API calls
const fetchWithCORS = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'omit'
  });
};

export const eventService = {
  async getAllEvents() {
    try {
      const response = await fetchWithCORS(`${API_BASE_URL}/events`);
      if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      // Return empty array - component will use its built-in sample events
      return [];
    }
  },

  async getEvent(id) {
    try {
      const response = await fetchWithCORS(`${API_BASE_URL}/events/${id}`);
      if (!response.ok) throw new Error('Event not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  async createEvent(event) {
    try {
      const response = await fetchWithCORS(`${API_BASE_URL}/events`, {
        method: 'POST',
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
      const response = await fetchWithCORS(`${API_BASE_URL}/events/${id}/join`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to join event');
      return await response.json();
    } catch (error) {
      console.error('Error joining event:', error);
      throw error;
    }
  },

  async searchEvents(location, category) {
    try {
      const params = new URLSearchParams();
      if (location) params.append('location', location);
      if (category) params.append('category', category);
      
      const url = params.toString() ? `${API_BASE_URL}/events/search?${params}` : `${API_BASE_URL}/events`;
      const response = await fetchWithCORS(url);
      if (!response.ok) throw new Error('Failed to search events');
      return await response.json();
    } catch (error) {
      console.error('Error searching events:', error);
      return [];
    }
  }
};
