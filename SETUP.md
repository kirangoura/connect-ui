# Connect Platform - Setup Guide

## Quick Start

### 1. Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs on http://localhost:5000

### 2. Database Setup
Create PostgreSQL database:
```bash
createdb connect_db
```

Or with environment variables:
```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/connect_db
export DB_USER=postgres
export DB_PASSWORD=yourpassword
```

### 3. Backend Setup (Spring Boot)
```bash
cd backend
./gradlew bootRun
```
Backend API runs on http://localhost:3001/api

## Full Stack Flow

1. **React Frontend** (Port 5000)
   - User interface for discovering and joining events
   - Calls Spring Boot API via `src/services/api.js`

2. **Spring Boot API** (Port 3001)
   - REST endpoints for event CRUD operations
   - Located in `backend/src/main/java/com/connect/`

3. **PostgreSQL Database**
   - Stores all event data
   - Auto-initialized via Flyway migrations
   - Migration script: `backend/src/main/resources/db/migration/V1__Create_events_table.sql`

## Separating Frontend and Backend

To move backend to separate repository:

1. Create new GitHub repository for the API
2. Copy entire `/backend` folder to new repository
3. Add database credentials to `.env` in new repo
4. Run `./gradlew bootRun` independently
5. Update frontend `VITE_API_URL` environment variable to point to new backend URL

## API Documentation

### Events Endpoints
- `GET /api/events` - List all events
- `POST /api/events` - Create event
- `GET /api/events/{id}` - Get event details
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `POST /api/events/{id}/join` - Join event

### Request/Response Example
```bash
# Get all events
curl http://localhost:3001/api/events

# Join an event
curl -X POST http://localhost:3001/api/events/1/join
```

## Technologies Used

**Frontend:**
- React 18
- Vite 5.x
- CSS with CSS Variables

**Backend:**
- Spring Boot 3.1.5
- Gradle 8.4
- PostgreSQL
- Flyway (database migrations)

## Environment Variables

Create `.env` file in root:
```
VITE_API_URL=http://localhost:3001/api
DATABASE_URL=jdbc:postgresql://localhost:5432/connect_db
DB_USER=postgres
DB_PASSWORD=password
```

Backend also reads these from Spring Boot properties.
