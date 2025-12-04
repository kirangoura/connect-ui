const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    const error = new Error('Session expired. Please login again.');
    error.isAuthError = true;
    throw error;
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const friendService = {
  async getFriends() {
    const response = await fetch(`${API_BASE_URL}/friends`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async getPendingRequests() {
    const response = await fetch(`${API_BASE_URL}/friends/requests/pending`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async getSentRequests() {
    const response = await fetch(`${API_BASE_URL}/friends/requests/sent`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async sendFriendRequest(userId) {
    const response = await fetch(`${API_BASE_URL}/friends/request/${userId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async acceptFriendRequest(friendshipId) {
    const response = await fetch(`${API_BASE_URL}/friends/accept/${friendshipId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async rejectFriendRequest(friendshipId) {
    const response = await fetch(`${API_BASE_URL}/friends/reject/${friendshipId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async removeFriend(friendId) {
    const response = await fetch(`${API_BASE_URL}/friends/${friendId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async getFriendsEvents() {
    const response = await fetch(`${API_BASE_URL}/events/friends`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export default friendService;
