const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api';

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
      const url = `${API_BASE_URL}/events`;
      console.log('Fetching events from:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
      const data = await response.json();
      console.log('Events loaded:', data.length);
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
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
      console.log('Creating event at:', `${API_BASE_URL}/events`);
      const response = await fetchWithCORS(`${API_BASE_URL}/events`, {
        method: 'POST',
        body: JSON.stringify(event)
      });
      console.log('Create response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error (${response.status}): ${errorText || response.statusText}`);
      }
      const data = await response.json();
      console.log('Event created:', data);
      return data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error(error.message || 'Failed to create event. Please check that the backend API is running.');
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
