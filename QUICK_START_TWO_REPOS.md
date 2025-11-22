# Quick Start: connect-ui + connect-api Setup

You have **two separate Replit projects**:

1. **connect-ui** (This one) - React Frontend
2. **connect-api** (New project) - Spring Boot Backend

## 5-Minute Setup

### Step 1: Frontend (connect-ui - This Project)
✅ **Already done!** Just make sure it's running:
```bash
npm install
npm run dev
# Opens on http://localhost:5000
```

### Step 2: Get Backend Code
Backend code is already pushed to GitHub!
- **Repository:** https://github.com/kirangoura/connect-api
- Clone or download the code

### Step 3: Create Backend Project (connect-api)
1. Go to [replit.com](https://replit.com)
2. Click "Create" → Name it `connect-api`
3. Language: Java
4. Create

### Step 4: Set Up connect-api Backend
In your new **connect-api** Replit:

1. Clone the backend repository:
```bash
git clone https://github.com/kirangoura/connect-api.git .
```

Or upload files manually if cloning doesn't work.

2. Run:
```bash
./gradlew bootRun
# Backend runs on http://localhost:3001
```

### Step 5: Connect Frontend to Backend

In **connect-ui** Replit (this one):
1. Click **Secrets** tab (or Environment)
2. Add new variable:
   ```
   VITE_API_URL=https://connect-api-YOUR-USERNAME.replit.dev/api
   ```
3. Restart the frontend application

Replace `YOUR-USERNAME` with your Replit username.

### Step 6: Test Connection

Open your connect-ui app:
- ✅ Events should load from backend
- ✅ Search should work
- ✅ Join button should update count

## File Checklist for connect-api

You need to copy these from `/backend` to your connect-api project:

```
✓ build.gradle              (Root)
✓ settings.gradle           (Root)
✓ gradle/wrapper/*          (Gradle wrapper files)
✓ src/main/java/com/connect/
  ✓ ConnectApplication.java
  ✓ controller/EventController.java
  ✓ service/EventService.java
  ✓ repository/EventRepository.java
  ✓ model/Event.java
  ✓ config/CorsConfig.java
✓ src/main/resources/
  ✓ application.properties
  ✓ db/migration/V1__Create_events_table.sql
  ✓ db/migration/V2__Add_location_fields.sql
  ✓ db/migration/V3__Fix_categories.sql
✓ .gitignore
```

## Environment Variables

**connect-ui (.env or Secrets):**
```
VITE_API_URL=https://connect-api-YOUR-USERNAME.replit.dev/api
```

**connect-api (Secrets):**
```
DATABASE_URL=jdbc:postgresql://localhost:5432/connect_db
DB_USER=postgres
DB_PASSWORD=password
```

(Or use external database like Heroku Postgres, Railway, etc.)

## Architecture

```
🌐 Internet
    ↓
📱 connect-ui (React)
    - Runs on port 5000
    - Shows events
    - Calls API
    ↓ HTTP
⚙️ connect-api (Spring Boot)
    - Runs on port 3001
    - Manages events
    - Handles database
    ↓
🗄️ PostgreSQL
    - Stores event data
```

## Troubleshooting

**Frontend shows "Error fetching events"**
- Check `VITE_API_URL` is set correctly in Secrets
- Verify backend is running: http://localhost:3001
- Restart frontend after changing env var

**Backend won't start**
- Check Java is installed: `java -version`
- Verify database connection string is correct
- Check logs for error details

**Can't find backend URL**
- In connect-api Replit, look at the URL bar
- Format: `https://connect-api-USERNAME.replit.dev`

## What's Next?

1. ✅ Set up connect-api project
2. ✅ Copy backend files
3. ✅ Set up PostgreSQL database
4. ✅ Set `VITE_API_URL` in connect-ui
5. ✅ Test connection
6. 🚀 Publish both projects
7. 📊 Scale independently as needed

## Documentation

- **CONNECT_UI_SETUP.md** - Detailed frontend setup
- **CONNECT_API_SETUP.md** - Detailed backend setup
- **README.md** - Main documentation

## Success Indicators

When everything works:
- ✅ Frontend loads without "Error fetching events"
- ✅ Can search events by location
- ✅ Can filter by category
- ✅ Can join events (count increments)
- ✅ Mobile menu works on small screens

## Example URLs

**connect-ui:**
```
Development: http://localhost:5000
Production: https://connect-ui-USERNAME.replit.dev
```

**connect-api:**
```
Development: http://localhost:3001
Production: https://connect-api-USERNAME.replit.dev
```

**Frontend calls:**
```
http://connect-api-USERNAME.replit.dev/api/events
http://connect-api-USERNAME.replit.dev/api/events/search?location=Portland&category=Sports
```

## Done! 🎉

You now have a two-repository setup:
- **connect-ui** - Frontend (React)
- **connect-api** - Backend (Spring Boot)
- Both deployable independently
- Easy to scale separately
