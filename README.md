# Connect - Community Events Platform

## Overview
Connect is a community platform that helps people connect through real-world experiences. Users can discover and join local events, sports activities, fitness groups, and social gatherings to meet people in person and build meaningful connections.

**This is the `connect-ui` repository (React Frontend)**

For the backend API, see the separate `connect-api` repository.

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

### Backend (Spring Boot - Separate Repository)
The backend is in the `/backend` folder and ready to be moved to a separate Git repository. This enables independent deployment and scaling.

To deploy the backend:
1. Create a new GitHub repository for the backend
2. Push the `/backend` folder contents to that repository
3. Deploy to a Java-hosting platform (Heroku, Railway, AWS, Google Cloud, etc.)
4. Update `VITE_API_URL` environment variable to point to your deployed backend

**Backend Folder Contents:**
- `build.gradle` - Gradle build configuration
- `settings.gradle` - Gradle settings
- `src/main/java/com/connect/` - Java source code (Controllers, Services, Repositories, Models)
- `src/main/resources/` - Configuration and Flyway database migrations

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

The frontend runs on port 5000 and uses sample data when the backend API is unavailable.

### Backend Deployment
The backend is in a separate folder and designed to be deployed independently. See the Backend folder `/backend/README.md` for deployment instructions.

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

### Frontend (This Repository)
**Via Replit:**
1. Click the "Publish" button at the top of your Replit workspace
2. Choose "Autoscale" deployment type
3. Get a public URL like `https://your-app.replit.dev`

**Alternatively:**
- Build with `npm run build` (creates `dist/` folder)
- Deploy to Netlify, Vercel, or any static hosting service

### Backend (Separate Repository)
1. Create a new Git repository for `/backend`
2. Push backend code to GitHub
3. Deploy to Java-hosting platform:
   - **Heroku** - Free tier available
   - **Railway** - Modern alternative
   - **AWS/Google Cloud** - Enterprise solutions

4. Update environment variable:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```

## Two-Repository Setup

This is the **connect-ui** repository. The backend is in a separate **connect-api** repository:

### connect-ui (This Project)
- React 18 frontend
- Vite build tool
- Responsive mobile design
- Deployed on Replit (or any static host)

### connect-api (Separate Project)
- **GitHub:** https://github.com/kirangoura/connect-api
- Spring Boot 3.1.5 backend
- PostgreSQL database
- Flyway migrations
- Deployed separately on Replit or Java hosting platform

**Quick Start:**
1. See `CONNECT_UI_SETUP.md` for this project
2. See `CONNECT_API_SETUP.md` to set up the backend
3. Connect them via `VITE_API_URL` environment variable
4. Backend repo: https://github.com/kirangoura/connect-api

## Recent Changes (Nov 22, 2025)
- Separated UI and API into two Replit projects
- Added mobile hamburger menu
- Implemented responsive design (mobile, tablet, desktop)
- Created search and filter functionality
- Added comprehensive setup documentation
- Configured for easy backend connection
