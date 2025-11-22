# Connect - Community Events Platform

## Overview
Connect is a community platform that helps people connect through real-world experiences. Users can discover and join local events, sports activities, fitness groups, and social gatherings to meet people in person and build meaningful connections.

## Project Purpose
The platform addresses the need for authentic in-person connections by facilitating:
- Social events (coffee meetups, dinner parties, game nights)
- Sports activities (basketball, soccer, tennis, hiking)
- Fitness groups (running clubs, yoga sessions, cycling groups)
- Creative gatherings (book clubs, art workshops, music jams)

## Project Structure

### Frontend (React - Port 5000)
- `index.html` - Main HTML entry point
- `src/` - React application source code
  - `main.jsx` - React entry point
  - `App.jsx` - Main application component
  - `index.css` - Global styles
  - `components/` - React components (Navbar, Hero, Categories, FeaturedEvents, HowItWorks, CTASection, Footer)
  - `services/api.js` - API service layer
- `vite.config.mjs` - Vite configuration
- `package.json` - Dependencies

### Backend (Spring Boot - Port 3001)
Located in `/backend` folder (ready to move to separate Git repo)
- `build.gradle` - Gradle build configuration
- `settings.gradle` - Gradle settings
- `src/main/java/com/connect/` - Java source code
  - `ConnectApplication.java` - Spring Boot main application
  - `controller/EventController.java` - REST API endpoints
  - `service/EventService.java` - Business logic
  - `repository/EventRepository.java` - Database repository
  - `model/Event.java` - Event entity
  - `config/` - Configuration classes
- `src/main/resources/` - Configuration and migrations
  - `application.properties` - Spring Boot configuration
  - `db/migration/V1__Create_events_table.sql` - Flyway database migration
- `.gitignore` - Git ignore rules
- `README.md` - Backend documentation

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5.x
- **Runtime**: Node.js 20
- **Styling**: CSS with CSS variables

### Backend
- **Framework**: Spring Boot 3.1.5
- **Build Tool**: Gradle
- **Database**: PostgreSQL
- **Migrations**: Flyway
- **Java Version**: 17+

## Features
1. **Hero Section** - Compelling value proposition
2. **Category Cards** - 3 activity types (events, sports, fitness)
3. **Featured Events** - Dynamic event cards from database with search/filter
4. **How It Works** - Step-by-step guide
5. **Navigation** - Smooth scrolling
6. **Responsive Design** - Mobile-friendly
7. **Search & Filter** - Filter by location (city/area/zipcode) and category
8. **Join Event** - Users can join events from the UI, API updates attendance count
9. **Database Integration** - Real data from PostgreSQL via Spring Boot API
10. **Flyway Migrations** - Auto database setup with sample data

## Configuration

### Environment Variables
Create `.env` file or set these variables:
```
VITE_API_URL=http://localhost:3001/api
DATABASE_URL=jdbc:postgresql://localhost:5432/connect_db
DB_USER=postgres
DB_PASSWORD=password
```

### Frontend Dev Server
- Runs on port 5000 with host 0.0.0.0
- HMR configured for Replit proxy

### Backend API
- Runs on port 3001
- CORS enabled for frontend
- All traffic goes through `/api` context path

## Development

### Start Frontend
```bash
npm install
npm run dev
```

### Start Backend
```bash
cd backend
./gradlew bootRun
```

The frontend will call the Spring Boot API at `http://localhost:3001/api/events`

## Database Setup

PostgreSQL database with Flyway migrations. On first run:
1. Connect to your PostgreSQL instance
2. Create database: `CREATE DATABASE connect_db;`
3. Spring Boot will automatically run Flyway migrations
4. Sample data will be inserted by migration script

## API Endpoints

All endpoints under `/api`:
- `GET /events` - Get all events
- `GET /events/{id}` - Get event by ID
- `POST /events` - Create new event
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event
- `POST /events/{id}/join` - Join event (increments attendee count)

## Repository Structure

### Current Repo (Frontend)
- React application
- Calls backend API
- Can be deployed as static site

### Backend Repo (Ready to separate)
- `/backend` folder contains complete Spring Boot application
- Can be cloned/pushed to separate GitHub repository
- Has own build system (Gradle)
- Own database migrations (Flyway)
- Independent deployment

## Deployment

### Frontend
- Static build with `npm run build`
- Deploy to Netlify, Vercel, or Replit hosting

### Backend
- Build with `./gradlew build`
- Run with `./gradlew bootRun` or jar file
- Requires PostgreSQL connection
- Flyway will auto-run migrations

## Recent Changes (Nov 22, 2025)
- Created React 18 application with modular components
- Built complete Spring Boot backend with Gradle
- Implemented Flyway database migrations with sample data
- Created REST API with CRUD operations and join event feature
- Integrated React frontend with backend API
- Added environment configuration for database and API URL
- Structured backend for easy separation to new Git repository
