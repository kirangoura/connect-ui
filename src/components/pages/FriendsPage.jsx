import React, { useState, useEffect } from 'react';
import { friendService } from '../../services/friendService';
import './Pages.css';

function FriendsPage({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [friendsData, pendingData, sentData] = await Promise.all([
        friendService.getFriends(),
        friendService.getPendingRequests(),
        friendService.getSentRequests()
      ]);
      setFriends(friendsData);
      setPendingRequests(pendingData);
      setSentRequests(sentData);
    } catch (err) {
      console.error('Failed to load friends data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    setActionLoading(requestId);
    try {
      await friendService.acceptFriendRequest(requestId);
      loadData();
    } catch (err) {
      console.error('Failed to accept request:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectRequest = async (requestId) => {
    setActionLoading(requestId);
    try {
      await friendService.rejectFriendRequest(requestId);
      loadData();
    } catch (err) {
      console.error('Failed to reject request:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    if (!window.confirm('Are you sure you want to remove this friend?')) return;
    setActionLoading(friendId);
    try {
      await friendService.removeFriend(friendId);
      loadData();
    } catch (err) {
      console.error('Failed to remove friend:', err);
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

  const renderUserCard = (user, type) => (
    <div className="friend-card" key={user.id}>
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.firstName} className="friend-avatar" />
      ) : (
        <div className="friend-avatar-placeholder">{getInitials(user)}</div>
      )}
      
      <div className="friend-info">
        <h4>{user.firstName} {user.lastName}</h4>
        <p>{user.email}</p>
      </div>

      <div className="friend-actions">
        {type === 'friend' && (
          <button 
            className="btn-small btn-danger"
            onClick={() => handleRemoveFriend(user.id)}
            disabled={actionLoading === user.id}
          >
            Remove
          </button>
        )}
        {type === 'pending' && (
          <>
            <button 
              className="btn-small btn-primary"
              onClick={() => handleAcceptRequest(user.requestId)}
              disabled={actionLoading === user.requestId}
            >
              Accept
            </button>
            <button 
              className="btn-small btn-secondary"
              onClick={() => handleRejectRequest(user.requestId)}
              disabled={actionLoading === user.requestId}
            >
              Decline
            </button>
          </>
        )}
        {type === 'sent' && (
          <span className="status-badge pending">Pending</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Friends</h1>
        <button className="btn-primary header-action" onClick={() => onNavigate('discover')}>
          Find Friends
        </button>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends ({friends.length})
        </button>
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Requests ({pendingRequests.length})
        </button>
        <button 
          className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent ({sentRequests.length})
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="friends-list">
          {activeTab === 'friends' && (
            friends.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <h3>No friends yet</h3>
                <p>Start connecting with people in your community!</p>
                <button className="btn-primary" onClick={() => onNavigate('discover')}>
                  Find Friends
                </button>
              </div>
            ) : (
              friends.map(friend => renderUserCard(friend, 'friend'))
            )
          )}
          
          {activeTab === 'pending' && (
            pendingRequests.length === 0 ? (
              <div className="empty-state small">
                <p>No pending friend requests</p>
              </div>
            ) : (
              pendingRequests.map(request => renderUserCard(request, 'pending'))
            )
          )}
          
          {activeTab === 'sent' && (
            sentRequests.length === 0 ? (
              <div className="empty-state small">
                <p>No sent friend requests</p>
              </div>
            ) : (
              sentRequests.map(request => renderUserCard(request, 'sent'))
            )
          )}
        </div>
      )}
    </div>
  );
}

export default FriendsPage;
