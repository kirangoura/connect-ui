# Connect - Community Events Platform

## Overview

Connect is a community platform that facilitates real-world connections through local events, sports activities, fitness groups, and social gatherings. The application uses a modern full-stack architecture with a React frontend and Spring Boot backend, designed to help people discover and join in-person experiences in their communities.

## Current Status (November 22, 2025) ✅ FULLY OPERATIONAL

✅ **Frontend & Backend Integration**: Complete and working
- Frontend running at port 5000 (React with Vite)
- Backend running at port 8080 (Spring Boot API)
- Real-time event data flowing from database to frontend

✅ **Frontend Features**:
- Responsive design (mobile, tablet, desktop)
- Event browsing and real-time filtering by location & category
- Join event functionality with capacity tracking
- Working search and filter controls
- Mobile hamburger menu navigation

✅ **Backend API**:
- Spring Boot REST API running at port 8080
- PostgreSQL database with Flyway migrations
- Event CRUD endpoints
- CORS properly configured for browser requests
- Publicly accessible at `https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events`

## Latest Changes (November 22, 2025)

**CRITICAL FIX APPLIED** - Port Configuration:
- Modified `.replit` file to expose port 8080 (backend) on port 80
- This resolved CORS and routing issues between frontend and backend
- Backend API now properly accessible and responding with data

Changes to `.replit`:
```
# BEFORE:
[[ports]]
localPort = 5432
externalPort = 80
exposeLocalhost = true
[[ports]]
localPort = 8080
externalPort = 8080

# AFTER:
[[ports]]
localPort = 8080
externalPort = 80
```

## System Architecture

### Frontend Architecture
**Technology**: React 18 with Vite 5.x

- Component-based design with modular UI components
- CSS styling with CSS variables
- Real-time search and filtering
- API integration layer for backend communication

### Backend Architecture  
**Technology**: Spring Boot (Java) with RESTful API

Key endpoints:
- `GET /api/events` - List all events
- `GET /api/events/{id}` - Get specific event
- `POST /api/events/{id}/join` - Join an event
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Data Storage
**Database**: PostgreSQL with Flyway migrations
- Manages event data
- Tracks attendee information
- Handles capacity management

## Running the Application

**Frontend:**
```bash
npm run dev
```
Available at: http://localhost:5000

**Backend:** 
Runs automatically at port 8080, exposed publicly

## Implemented Features

### Address Autocomplete (Create Event)
The Create Event form features smart address autocomplete:
- **Location Field**: When user types 3+ characters, real address suggestions appear from OpenStreetMap (Photon API)
- **Auto-fill**: Selecting an address automatically fills City, Area, and Zipcode fields
- **Manual Override**: Users can still manually edit any field after selection or skip autocomplete entirely
- **Free API**: Uses Photon (OpenStreetMap-based) - no API key required, no costs

**Modular Provider Architecture:**
The address autocomplete uses a provider pattern for easy API switching:
- `src/services/addressProviders/photonProvider.js` - Free OpenStreetMap-based provider (default)
- `src/services/addressProviders/googlePlacesProvider.js` - Google Maps Places API provider (ready to use)
- `src/services/addressProviders/index.js` - Factory that selects provider based on env vars

**How to Switch to Google Maps API:**
When you're ready to use Google Maps, just set 2 environment variables:

```
VITE_ADDRESS_PROVIDER=google
VITE_GOOGLE_PLACES_API_KEY=your_google_api_key_here
```

The app will automatically use Google Places API instead of Photon.

### Event Display
- Grid layout with event cards showing icons, titles, locations, capacity
- Category badges (Events, Sports, Fitness)
- Location information (city, area, zipcode)
- Real-time attendee count tracking

### Search & Filter
- Location-based search (searches city, area, or zipcode)
- Category filtering (Events, Sports, Fitness)
- Clear filters functionality
- Instant filtering as you type

### Event Management
- Event title and description
- Date and time information
- Location details
- Capacity tracking (current attendees / max attendees)
- Join button (automatically disabled when at capacity)

### User Experience
- Responsive design for all devices
- Mobile-friendly hamburger navigation
- Clean gradient aesthetic
- Smooth hover effects on cards
- Accessible color-coded categories

## Deployment Notes

The application is production-ready with independent deployment:
- Frontend: Static SPA deployment (React build)
- Backend: Spring Boot JAR deployment
- Database: PostgreSQL managed separately
- Both services communicate via REST API

## Frontend-Backend Integration

The key to successful integration:
1. Backend exposed on port 80 (via `.replit` configuration)
2. Frontend calls backend API at `https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api`
3. CORS configured on backend to accept cross-origin requests
4. Data flows seamlessly from database to user interface

## Testing the API

Verify the backend is working:
```bash
curl https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events
```

Should return JSON array of all events from the database.
