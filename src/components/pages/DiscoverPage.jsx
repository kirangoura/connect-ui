import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { friendService } from '../../services/friendService';
import './Pages.css';

function DiscoverPage({ onBack }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.discoverPeople();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadUsers();
      return;
    }
    setLoading(true);
    try {
      const data = await userService.searchUsers(searchQuery);
      setUsers(data);
    } catch (err) {
      console.error('Failed to search users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId) => {
    setActionLoading(userId);
    try {
      await friendService.sendFriendRequest(userId);
      setUsers(users.map(u => 
        u.id === userId ? { ...u, requestSent: true } : u
      ));
    } catch (err) {
      console.error('Failed to send friend request:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const getInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Discover People</h1>
        <p className="page-subtitle">Find and connect with others in your community</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Finding people...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No users found</h3>
          <p>Try a different search term</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.firstName} className="user-card-avatar" />
              ) : (
                <div className="user-card-avatar-placeholder">{getInitials(user)}</div>
              )}
              
              <div className="user-card-info">
                <h4>{user.firstName} {user.lastName}</h4>
                {user.bio && <p className="user-bio">{user.bio}</p>}
                {user.interests && (
                  <div className="user-interests">
                    {user.interests.split(',').slice(0, 3).map((interest, i) => (
                      <span key={i} className="interest-tag">{interest.trim()}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="user-card-action">
                {user.isFriend ? (
                  <span className="status-badge friend">Friends</span>
                ) : user.requestSent || user.pendingRequest ? (
                  <span className="status-badge pending">Request Sent</span>
                ) : (
                  <button
                    className="btn-primary btn-small"
                    onClick={() => handleSendRequest(user.id)}
                    disabled={actionLoading === user.id}
                  >
                    {actionLoading === user.id ? '...' : 'Add Friend'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscoverPage;
