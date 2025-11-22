# Connect API (Backend) - Separate Replit Setup

This guide helps you set up the **connect-api** repository as a separate Replit project.

## Prerequisites
- Replit account
- GitHub account (optional, for version control)
- Java 17+ installed in Replit

## Step 1: Create New Replit Project for connect-api

1. Go to [replit.com](https://replit.com)
2. Click "Create Replit"
3. Name it: `connect-api`
4. Language: Select "Java" or "Gradle"
5. Create

## Step 2: Copy Backend Code

You have two options:

### Option A: Copy from this connect-ui project
1. From this Replit (connect-ui), download the `/backend` folder
2. In your new `connect-api` Replit:
   - Create `src/`, `gradle/`, and configuration files
   - Copy all contents from the backend folder

### Option B: Get code from attached backend folder
The complete backend code is in `/backend` of this project with:
- `src/main/java/com/connect/` - All Java source code
- `src/main/resources/db/migration/` - Flyway SQL migrations
- `build.gradle` - Gradle build configuration
- `.gitignore` - Git ignore rules

## Step 3: Project Structure for connect-api

Your new `connect-api` Replit should have:

```
connect-api/
├── src/
│   ├── main/
│   │   ├── java/com/connect/
│   │   │   ├── ConnectApplication.java
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   └── config/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/migration/
│   └── test/
├── gradle/
├── build.gradle
├── settings.gradle
├── .gitignore
└── README.md
```

## Step 4: Configure Environment

In your `connect-api` Replit, set up environment variables:

**In Replit Secrets/Environment:**
```
DATABASE_URL=jdbc:postgresql://[host]:[port]/connect_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### Database Options:

#### Option A: Use Replit PostgreSQL (if available)
1. Create PostgreSQL database in your Replit project
2. Set `DATABASE_URL`, `DB_USER`, `DB_PASSWORD`

#### Option B: Use External Database
- AWS RDS
- Google Cloud SQL
- Heroku Postgres
- Railway PostgreSQL
- neon.tech (free PostgreSQL)

## Step 5: Start the Backend

In your `connect-api` Replit:

```bash
./gradlew bootRun
```

The API will run on **http://localhost:3001**

## Step 6: Connect to connect-ui Frontend

In your **connect-ui** Replit (this project):

1. Go to Secrets/Environment tab
2. Add environment variable:
   ```
   VITE_API_URL=https://connect-api-[username].replit.dev/api
   ```
   (Replace with your actual connect-api URL)

3. Restart the frontend application

## Verifying Connection

1. Open your connect-ui app
2. Try searching for events
3. Try joining an event
4. Check browser console for any API errors

If working:
- ✅ Events load from backend
- ✅ Search/filter works
- ✅ Join button updates count

If not working:
- Check `VITE_API_URL` is set correctly
- Verify connect-api backend is running
- Check browser console for error details

## API Endpoints (connect-api)

All endpoints run under `/api`:

```
GET    /api/events                      - List all events
GET    /api/events/{id}                 - Get event by ID
POST   /api/events                      - Create new event
PUT    /api/events/{id}                 - Update event
DELETE /api/events/{id}                 - Delete event
POST   /api/events/{id}/join            - Join event
GET    /api/events/search?location=X&category=Y - Search events
```

## Database Migrations

Flyway automatically runs migrations on startup:

- **V1__Create_events_table.sql** - Initial events table
- **V2__Add_location_fields.sql** - Add city/zipcode/area columns
- **V3__Fix_categories.sql** - Fix category names

No manual migration needed!

## Troubleshooting

### Backend won't start
- ✓ Check Java is installed: `java -version`
- ✓ Check DATABASE_URL is set correctly
- ✓ Verify PostgreSQL is accessible
- ✓ Check logs for specific error

### Frontend can't reach backend
- ✓ Verify connect-api is running (shows port 3001)
- ✓ Check VITE_API_URL in connect-ui environment variables
- ✓ Make sure URL has `/api` suffix
- ✓ Check browser console for CORS errors

### "Event not found" errors
- ✓ Database not properly initialized
- ✓ Try stopping and restarting backend
- ✓ Check migrations ran (look at logs)
- ✓ Verify database connection string

## Next Steps

1. ✅ Create connect-api Replit project
2. ✅ Copy backend code
3. ✅ Set up database
4. ✅ Start backend
5. ✅ Configure connect-ui to call backend
6. ✅ Test connection

Your two-repository setup will be complete!

## Architecture

```
Internet User
    ↓
connect-ui Frontend (React)
    ↓ API calls
connect-api Backend (Spring Boot)
    ↓
PostgreSQL Database
```

Both projects run independently on Replit and communicate via HTTP/REST API.
