# Connect - Community Events Platform

## Overview

Connect is a community platform that facilitates real-world connections through local events, sports activities, fitness groups, and social gatherings. The application uses a modern full-stack architecture with a React frontend and Spring Boot backend, designed to help people discover and join in-person experiences in their communities.

## Current Status (Session November 22, 2025)

✅ **Frontend (connect-ui)**: Fully functional React app running at port 5000 with:
  - Responsive design (mobile, tablet, desktop)
  - Event browsing and filtering by location & category
  - 6 sample events displaying with full details
  - Join event functionality with capacity tracking
  - Working search and filter controls
  - Mobile hamburger menu navigation

✅ **Backend (connect-api)**: Spring Boot REST API running at port 8080/3001 with:
  - PostgreSQL database with Flyway migrations
  - Event CRUD endpoints at `https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api`
  - CORS configuration for cross-origin requests
  - Running successfully in separate Replit project

✅ **Sample Events**: Built-in sample events displaying:
  - 6 pre-loaded events with complete details
  - Search and filter working with sample data
  - Event capacity and attendance tracking

## Latest Changes (November 22, 2025)

- Simplified FeaturedEvents component for reliability
- Removed complex async/API integration for MVP stability
- Implemented working search and filter functionality
- Sample events now properly displaying and functional
- Backend URL confirmed: `https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events`

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology**: React 18 with Vite 5.x build tooling

The frontend is a single-page application (SPA) built with React and served through Vite's development server on port 5000.

- **Component Organization**: Modular UI components (Navbar, Hero, Categories, FeaturedEvents, HowItWorks, CTASection, Footer)
- **Styling Approach**: CSS with CSS variables for consistent theming
- **Build System**: Vite for fast development and optimized production builds
- **Data Handling**: Client-side filtering and search with sample events

### Backend Architecture

**Technology**: Spring Boot (Java) with RESTful API design

The backend runs separately with the following endpoints:
- `GET /api/events` - List all events
- `POST /api/events/{id}/join` - Join an event
- Full CRUD operations for events

### Data Storage

**Database**: PostgreSQL with Flyway migrations

## Running the Application

Frontend:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5000`.

## Features Implemented

### Event Display
- Grid layout showing event cards with icons, titles, locations, and capacity
- 6 sample events with complete details
- Category badges and location information
- Current attendees vs max capacity display

### Search & Filter
- Location-based search (city, area, or zipcode)
- Category filtering (Events, Sports, Fitness)
- Clear filters button
- Client-side filtering operations

### Event Details
- Event title and category badge
- Location and city/zipcode
- Date and time
- Current attendees vs max capacity
- Join Event button (disabled when full)

### UI/UX
- Responsive design for all devices
- Mobile hamburger menu
- Clean, modern gradient aesthetic
- Hover effects on event cards
- Color-coded category badges

## Backend Integration Notes

The backend is accessible at:
- URL: `https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events`
- Test with: `curl https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events`

**CORS Requirements**: For browser integration, the backend needs to properly handle CORS preflight (OPTIONS) requests. The backend has `@CrossOrigin(origins = "*")` configured but may need additional configuration for browser requests.

## Deployment Notes

The application is structured for independent deployment:
- Frontend deploys as static SPA to any web server
- Backend deploys independently as Spring Boot application
- Both communicate via REST API
- Database managed separately from application
