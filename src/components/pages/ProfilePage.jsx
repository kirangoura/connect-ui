import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Pages.css';

function ProfilePage({ onBack }) {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    interests: user?.interests || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setMessage('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
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
        <h1>My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profile" className="profile-avatar-large" />
          ) : (
            <div className="profile-avatar-placeholder-large">
              {getInitials()}
            </div>
          )}
          
          <div className="profile-info">
            <h2>{user?.firstName} {user?.lastName}</h2>
            <p className="profile-email">{user?.email}</p>
            {user?.bio && <p className="profile-bio">{user.bio}</p>}
          </div>
        </div>

        {message && (
          <div className={`profile-message ${message.includes('Failed') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Interests</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Running, Photography, Cooking..."
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="detail-label">Bio</span>
              <span className="detail-value">{user?.bio || 'No bio added yet'}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Interests</span>
              <span className="detail-value">{user?.interests || 'No interests added yet'}</span>
            </div>
            <button className="btn-primary edit-profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
