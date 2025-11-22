# Connect - Setting Up UI and Backend Repos

This guide explains how to separate and run the UI (React) and Backend (Spring Boot) as independent repositories.

## Current Structure

```
Connect Project (Replit - UI Only)
└── Frontend files (React)
└── /backend folder (Ready to separate)
```

## Step 1: Separate the Backend Repository

### Option A: Create a new GitHub repo for backend

1. Create a new empty GitHub repository called `connect-backend`
2. Clone this Replit project locally:
   ```bash
   git clone <replit-repo-url> connect-ui
   ```
3. Create backend repo locally:
   ```bash
   mkdir connect-backend
   cd connect-backend
   git init
   ```
4. Copy backend folder contents from this project to your new backend repo:
   ```bash
   cp -r path/to/connect-ui/backend/* ./
   ```
5. Push to your new backend repo:
   ```bash
   git add .
   git commit -m "Initial backend repository"
   git remote add origin <backend-repo-url>
   git push -u origin main
   ```

### Option B: Move backend folder from this Replit project

1. Backup the `/backend` folder locally
2. Remove `/backend` from the UI Replit project (optional, can keep as reference)
3. Create new Replit project for backend with Java enabled

## Step 2: Deploy the Backend

### Deploy to Heroku (Free option)
```bash
cd connect-backend
# Install Heroku CLI
heroku login
heroku create your-app-name
git push heroku main
# Note your deployed URL: https://your-app-name.herokuapp.com
```

### Deploy to Railway (Modern alternative)
```bash
# Visit railway.app and connect your GitHub repo
# Railway auto-detects Spring Boot and deploys with PostgreSQL
```

### Deploy to AWS / Google Cloud / Azure
Follow their respective documentation for Spring Boot deployment.

## Step 3: Configure Frontend to Connect to Backend

### During Development (Local)
Set environment variable in `.env`:
```
VITE_API_URL=http://localhost:3001/api
```

### For Production
In Replit, set the environment variable:
1. Go to Secrets/Environment tab
2. Add `VITE_API_URL=https://your-backend-url/api`

Example:
```
VITE_API_URL=https://connect-backend.herokuapp.com/api
VITE_API_URL=https://connect-backend.railway.app/api
```

## Step 4: Run Both Together

### Local Development Setup

**Terminal 1 - Backend:**
```bash
cd connect-backend
./gradlew bootRun
# Backend runs on http://localhost:3001
# Make sure PostgreSQL is running locally
```

**Terminal 2 - Frontend:**
```bash
cd connect-ui
npm install
npm run dev
# Frontend runs on http://localhost:5000
# Calls backend at http://localhost:3001/api
```

### On Replit

**Frontend (This Replit project):**
- Runs automatically when you open the project
- Calls backend API at your deployed backend URL

**Backend (Separate Replit project):**
- Create new Replit project
- Push backend code
- Enable Java runtime
- Backend runs with PostgreSQL

## Step 5: Database Setup

### For Backend with PostgreSQL

Each backend deployment needs a PostgreSQL database:

**Local Development:**
```bash
# Install PostgreSQL
# Create database
createdb connect_db

# Flyway migrations run automatically on startup
```

**Heroku:**
```bash
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
# Automatically sets DATABASE_URL environment variable
```

**Railway:**
- Connect PostgreSQL plugin in Railway dashboard
- Environment variables auto-configured

**AWS RDS / Google Cloud SQL:**
- Create managed PostgreSQL instance
- Set connection environment variables in Spring Boot app

## API Endpoints

All backend endpoints are under `/api`:

```
GET    /api/events                    - List all events
GET    /api/events/{id}               - Get event details
POST   /api/events                    - Create new event
PUT    /api/events/{id}               - Update event
DELETE /api/events/{id}               - Delete event
POST   /api/events/{id}/join          - Join event
GET    /api/events/search?location=X&category=Y - Search events
```

## Troubleshooting

### "Error fetching events" on Frontend
- Backend API URL not set correctly in `VITE_API_URL`
- Backend not running or deployed
- CORS not enabled on backend (should be configured)

### Backend won't start
- Java not installed (if running locally)
- PostgreSQL not running
- Database connection string incorrect

### Frontend can't connect to local backend
- Make sure backend is running on http://localhost:3001
- Check `VITE_API_URL` is set to `http://localhost:3001/api`
- Check browser console for exact error

## Repository Workflow

### UI Repository (This one)
- Contains React frontend
- Calls backend API
- Can be published independently

### Backend Repository
- Contains Spring Boot application
- Deploys separately
- Needs PostgreSQL database
- Can be scaled independently

## Environment Variables Checklist

**Frontend (.env or Replit Secrets):**
- ✅ `VITE_API_URL` - Backend API URL

**Backend (Spring Boot application.properties or Replit Env):**
- ✅ `DATABASE_URL` - PostgreSQL connection
- ✅ `DB_USER` - Database username
- ✅ `DB_PASSWORD` - Database password

## Next Steps

1. Create backend GitHub repository
2. Push backend code to new repo
3. Deploy backend to Heroku/Railway/AWS
4. Set `VITE_API_URL` in Replit secrets
5. Restart frontend application
6. Test API connectivity

Questions? Check the `/backend/README.md` for backend-specific setup.
