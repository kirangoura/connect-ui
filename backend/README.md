# Connect API

Backend API for the Connect community events platform.

## Setup

1. Create `.env` file with database connection:
```
DATABASE_URL=postgresql://user:password@localhost:5432/connect_db
PORT=3001
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/join` - Join event

## Database

PostgreSQL database with events table. Initialize on first run.
