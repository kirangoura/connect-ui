# Connect - Community Events Platform

## Overview

Connect is a community platform that facilitates real-world connections through local events, sports activities, fitness groups, and social gatherings. The application uses a modern full-stack architecture with a React frontend and Spring Boot backend, designed to help people discover and join in-person experiences in their communities.

## Current Status (December 4, 2025) 

**Frontend**: Fully operational with User Module (UI complete)
**Backend**: Requires auth endpoints implementation in connect-api

### What's Working
- Frontend running at port 5000 (React with Vite)
- Event browsing and filtering
- User authentication UI (Sign In/Sign Up modals)
- Protected pages and actions
- User menu with navigation

### Backend Endpoints (All Implemented)
The frontend is now aligned with all backend API endpoints:

**Auth:**
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

**Events:**
- `GET /api/events` - List all events
- `GET /api/events/my` - User's joined events
- `GET /api/events/created` - User's created events
- `GET /api/events/friends` - Friends' events
- `POST /api/events/{id}/join` - Join event
- `POST /api/events/{id}/leave` - Leave event

**Favorites:**
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/{eventId}` - Add favorite
- `DELETE /api/favorites/{eventId}` - Remove favorite

**Friends:**
- `GET /api/friends` - Get friend list
- `POST /api/friends/request/{userId}` - Send request
- `POST /api/friends/accept/{id}` - Accept request
- `POST /api/friends/reject/{id}` - Reject request
- `DELETE /api/friends/{friendId}` - Remove friend

**Users:**
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

## System Architecture

### Three-Repo Structure
1. **connect-ui** (this Replit) - React frontend
2. **connect-api** (separate Replit) - Spring Boot backend
3. **Connect-db** (separate Replit) - Database migrations

### Frontend Architecture
**Technology**: React 18 with Vite 5.x

**User Module Components:**
- `src/context/AuthContext.jsx` - Authentication state management
- `src/services/authService.js` - Auth API calls
- `src/services/userService.js` - User/profile API calls
- `src/services/friendService.js` - Friends/connections API calls
- `src/components/AuthModal.jsx` - Login/Signup modal
- `src/components/UserMenu.jsx` - Logged-in user dropdown
- `src/components/pages/` - User pages (Profile, MyEvents, Friends, etc.)

**Protected Features:**
- Join Event - requires authentication
- Create Event - requires authentication
- All user pages - require authentication

### Backend Architecture  
**Technology**: Spring Boot (Java) with RESTful API

Key endpoints:
- `GET /api/events` - List all events
- `GET /api/events/{id}` - Get specific event
- `POST /api/events/{id}/join` - Join an event (needs auth)
- `POST /api/events` - Create new event (needs auth)
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Data Storage
**Database**: PostgreSQL with Flyway migrations
- Manages event data
- User accounts and profiles
- Friendships/connections
- Event attendees

## User Module Features (Frontend Complete)

### Authentication
- Sign Up with email/password
- Sign In with email/password
- Sign Out
- JWT token storage in localStorage

### User Pages
- **Profile Page** - View and edit profile info
- **My Events** - Events user has joined
- **Created Events** - Events user organized
- **Friends** - Friend list and requests
- **Friends' Events** - Events friends are attending
- **Saved Events** - Bookmarked/favorite events
- **Discover People** - Find new connections

### Social Features
- Send friend requests
- Accept/reject requests
- Remove friends
- View friends' activities

## Running the Application

**Frontend:**
```bash
npm run dev
```
Available at: http://localhost:5000

## API Service Configuration

The API base URL is configured in `src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url/api';
```

## File Structure

```
src/
├── components/
│   ├── pages/
│   │   ├── ProfilePage.jsx
│   │   ├── MyEventsPage.jsx
│   │   ├── CreatedEventsPage.jsx
│   │   ├── FriendsPage.jsx
│   │   ├── FriendsEventsPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── DiscoverPage.jsx
│   │   └── Pages.css
│   ├── AuthModal.jsx / .css
│   ├── UserMenu.jsx / .css
│   ├── EventCard.jsx / .css
│   ├── Navbar.jsx / .css
│   └── ... (other components)
├── context/
│   └── AuthContext.jsx
├── services/
│   ├── index.js          # Clean exports for all services
│   ├── authService.js    # Login, signup, logout, getMe
│   ├── userService.js    # Profile, favorites, discover, search
│   ├── friendService.js  # Friends, requests, accept/reject
│   ├── eventService.js   # Events CRUD, join/leave, search
│   └── addressProviders/
└── App.jsx
```

## API Services (Complete Swagger Alignment)

### authService.js
- `login(email, password)` - POST /auth/login
- `signup(userData)` - POST /auth/signup
- `logout()` - POST /auth/logout
- `getMe()` - GET /auth/me

### userService.js
- `getMyProfile()` - GET /users/profile
- `updateMyProfile(data)` - PUT /users/profile
- `getUserById(id)` - GET /users/{id}
- `discoverPeople(page, size)` - GET /users/discover
- `searchUsers(query)` - GET /users/search
- `getMyEvents()` - GET /events/my
- `getMyCreatedEvents()` - GET /events/created
- `getFavorites()` - GET /favorites
- `addFavorite(eventId)` - POST /favorites/{eventId}
- `removeFavorite(eventId)` - DELETE /favorites/{eventId}
- `checkFavorite(eventId)` - GET /favorites/{eventId}/check

### friendService.js
- `getFriends()` - GET /friends
- `getPendingRequests()` - GET /friends/requests/pending
- `getSentRequests()` - GET /friends/requests/sent
- `sendFriendRequest(userId)` - POST /friends/request/{userId}
- `acceptFriendRequest(id)` - POST /friends/accept/{id}
- `rejectFriendRequest(id)` - POST /friends/reject/{id}
- `removeFriend(friendId)` - DELETE /friends/{friendId}
- `getFriendsEvents()` - GET /events/friends

### eventService.js
- `getAllEvents()` - GET /events
- `getEvent(id)` - GET /events/{id}
- `createEvent(data)` - POST /events
- `updateEvent(id, data)` - PUT /events/{id}
- `deleteEvent(id)` - DELETE /events/{id}
- `joinEvent(id)` - POST /events/{id}/join
- `leaveEvent(id)` - POST /events/{id}/leave
- `checkJoined(id)` - GET /events/{id}/joined
- `searchEvents(query, category)` - GET /events/search
- `getMyEvents()` - GET /events/my
- `getCreatedEvents()` - GET /events/created
- `getFriendsEvents()` - GET /events/friends

## Next Steps

The User Module is now complete:
- All backend API endpoints are implemented (see Swagger at /api/swagger-ui/index.html)
- All frontend services are aligned with Swagger documentation
- Ready for end-to-end testing

## Address Autocomplete Feature

The Create Event form features smart address autocomplete using Photon API (OpenStreetMap).
Switch to Google Maps by setting:
```
VITE_ADDRESS_PROVIDER=google
VITE_GOOGLE_PLACES_API_KEY=your_key_here
```
