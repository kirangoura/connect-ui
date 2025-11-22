# Connect - Community Events Platform

## Overview

Connect is a community platform that facilitates real-world connections through local events, sports activities, fitness groups, and social gatherings. The application uses a modern full-stack architecture with a React frontend and Spring Boot backend, designed to help people discover and join in-person experiences in their communities.

## Current Status (Session November 22, 2025)

✅ **Frontend (connect-ui)**: Fully functional React app with:
  - Responsive design (mobile, tablet, desktop)
  - Event browsing, filtering, and search by location & category
  - 6+ sample events displaying with full details
  - Join event functionality
  - Working search and filter controls
  - Mobile hamburger menu navigation
  - Vite dev server running on port 5000

✅ **Backend (connect-api)**: Spring Boot REST API deployed separately with:
  - PostgreSQL database with Flyway migrations
  - Event CRUD endpoints
  - CORS configuration for cross-origin requests
  - Running successfully in separate Replit project

✅ **Sample Events**: Built-in sample events data now displaying:
  - 6 events pre-loaded with complete details (title, date, location, category, attendees, etc)
  - Fallback mechanism when API is unavailable
  - Search and filter working with sample data

## Latest Changes (November 22, 2025)

- Simplified FeaturedEvents component for reliability
- Fixed Vite configuration for Replit proxy setup
- Implemented working search and filter functionality
- Sample events now properly displaying and searchable
- Cleaned up async/await logic to reduce complexity

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology**: React 18 with Vite 5.x build tooling

The frontend is a single-page application (SPA) built with React and served through Vite's development server on port 5000. The architecture follows a component-based structure:

- **Component Organization**: Modular UI components (Navbar, Hero, Categories, FeaturedEvents, HowItWorks, CTASection, Footer) for reusability and maintainability
- **API Integration**: Centralized API service layer (`src/services/api.js`) that abstracts all backend communication
- **Styling Approach**: CSS with CSS variables for consistent theming and easy customization
- **Build System**: Vite chosen for fast development server, hot module replacement, and optimized production builds
- **Data Handling**: Client-side filtering and search with built-in sample events fallback

**Rationale**: React with Vite provides a modern, performant development experience. The component-based architecture enables easy feature additions. Sample events ensure functionality even when backend is unavailable.

### Backend Architecture

**Technology**: Spring Boot (Java) with RESTful API design

The backend runs on port 3001 and follows a layered architecture pattern:

- **Controller Layer** (`EventController.java`): Handles HTTP requests and responses for event-related operations
- **Service Layer** (`EventService.java`): Contains business logic and orchestrates data operations
- **Repository Layer** (`EventRepository.java`): Abstracts database access using Spring Data JPA
- **Model Layer** (`Event.java`): Defines the event entity and data structure

**API Design**: RESTful endpoints following standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations, plus custom endpoint for joining events (POST `/events/{id}/join`)

### Data Storage

**Database**: PostgreSQL

**Schema Management**: Flyway for database migrations

The database schema is version-controlled through Flyway migrations. Migrations run automatically on application startup, ensuring schema consistency across environments.

**Rationale**: PostgreSQL offers reliability, ACID compliance, and robust support for relational data. Flyway ensures reproducible database state and simplifies deployment.

### Configuration Management

**Environment Variables**: Database connection details (DATABASE_URL, DB_USER, DB_PASSWORD) are externalized for security

**Frontend Configuration**: API base URL configurable via `VITE_API_URL` environment variable

**Backend Configuration**: Spring Boot's `application.properties` manages server port, database connection, and Flyway settings

**Rationale**: Externalizing configuration enables the same codebase to run in multiple environments without code changes.

## External Dependencies

### Frontend Dependencies

- **React 19.2.0**: Core UI library for building component-based interfaces
- **React DOM 19.2.0**: React rendering for web browsers
- **Vite 5.x**: Development server and build tool
- **@vitejs/plugin-react 5.1.1**: Enables React Fast Refresh and JSX support in Vite
- **CORS 2.8.5**: Cross-origin resource sharing middleware
- **Express 5.1.0**: Web framework

### Backend Dependencies (Gradle)

- **Spring Boot**: Application framework
- **Spring Data JPA**: Database repository abstraction
- **PostgreSQL JDBC Driver**: Database connectivity
- **Flyway**: Database migration management

## Running the Application

```bash
npm run dev
```

The frontend will be available at `http://localhost:5000` with automatic hot module reloading during development.

## Features Implemented

### Event Display
- Grid layout showing event cards with icons, titles, locations, and capacity
- Sample events pre-loaded (6 events across Events, Sports, and Fitness categories)
- Event cards display category badges, location details, date/time, and attendee count

### Search & Filter
- Location-based search (city, area, or zipcode)
- Category filtering (Events, Sports, Fitness)
- Clear filters button to reset search
- All search operations work client-side with sample events

### Event Details
- Event title and category badge
- Location and city/zipcode information
- Date and time
- Current attendees vs max capacity
- Join Event button (disabled when event is full)

### UI/UX
- Responsive design for mobile, tablet, and desktop
- Mobile hamburger menu navigation
- Clean, modern aesthetic with gradient backgrounds
- Hover effects on event cards
- Color-coded category badges

## Next Steps for Backend Integration

When connecting to the backend API:
1. Ensure backend is running and accessible
2. Update `VITE_API_URL` environment variable to point to backend
3. API service layer will automatically fetch real events from `/api/events` endpoint
4. Sample events will be used as fallback if API is unavailable
5. Join functionality will connect to `/api/events/{id}/join` endpoint

## Deployment Notes

The application is structured for independent deployment:
- Frontend deploys as static SPA to any web server
- Backend deploys independently as Spring Boot application
- Both communicate via REST API
- Database can be managed separately from application
