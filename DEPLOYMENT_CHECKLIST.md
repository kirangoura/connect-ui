# Deployment Checklist - connect-ui + connect-api

## ✅ Frontend Repository (connect-ui)
- ✅ Code complete and tested
- ✅ GitHub repository: connect-ui
- ✅ Replit project ready
- ✅ Environment variable configured: VITE_API_URL

## ✅ Backend Repository (connect-api)
- ✅ Code pushed to GitHub: https://github.com/kirangoura/connect-api
- ⏳ Replit project: Create new project named "connect-api"
- ⏳ Clone backend code to Replit
- ⏳ Set up PostgreSQL database
- ⏳ Run backend

## Deployment Steps

### 1. Backend Deployment (connect-api)

#### In Replit - Create New Project
1. Go to replit.com
2. Create new project: `connect-api`
3. Language: Java
4. Once created, click Shell/Terminal

#### In Shell - Clone Backend
```bash
git clone https://github.com/kirangoura/connect-api.git .
```

#### Set Up Database
In Replit Secrets, add:
```
DATABASE_URL=jdbc:postgresql://localhost:5432/connect_db
DB_USER=postgres
DB_PASSWORD=password
```

Or use external database (Heroku Postgres, Railway, etc.)

#### Start Backend
```bash
./gradlew bootRun
```

You'll see:
```
Port: 3001
Ready to receive requests
```

#### Get Backend URL
Copy your Replit URL: `https://connect-api-YOUR-USERNAME.replit.dev`

---

### 2. Frontend Configuration (connect-ui)

#### Update Environment Variable
In this Replit's Secrets:
```
VITE_API_URL=https://connect-api-YOUR-USERNAME.replit.dev/api
```

#### Restart Frontend
Click the "Restart" button or restart the dev server

---

### 3. Test Connection

#### In connect-ui App
1. Open the running app
2. Events should load (not showing error)
3. Search for events - should work
4. Try joining an event - count should increase
5. Check browser console - no errors

If working: ✅ Both projects connected!

---

### 4. Publish (Optional)

#### Publish Frontend
1. Click "Publish" button in connect-ui Replit
2. Choose "Autoscale"
3. Your public URL: `https://connect-ui-YOUR-USERNAME.replit.dev`

#### Publish Backend
1. In connect-api Replit, keep it running
2. Or use Heroku/Railway for persistent deployment

---

## Troubleshooting

### "Error fetching events"
- [ ] Check `VITE_API_URL` is set in connect-ui Secrets
- [ ] Restart connect-ui app
- [ ] Verify connect-api is running

### Backend won't start
- [ ] Check Java installed: `java -version`
- [ ] Check database connection string
- [ ] Check logs for error details

### "Cannot reach API"
- [ ] Verify connect-api URL is correct
- [ ] Make sure URL ends with `/api`
- [ ] Check browser console for CORS errors

---

## Success Indicators ✅

When everything works:
- Events load without errors
- Search/filter works
- Can join events
- Count increments
- Mobile menu works

---

## Documentation Reference

- `README.md` - Main documentation
- `QUICK_START_TWO_REPOS.md` - Setup guide
- `CONNECT_UI_SETUP.md` - Frontend details
- `CONNECT_API_SETUP.md` - Backend details
- `PROJECT_STRUCTURE.md` - Architecture

---

## Backend Repository

**GitHub:** https://github.com/kirangoura/connect-api

Contains:
- Spring Boot application
- PostgreSQL migrations
- REST API endpoints
- Event CRUD operations
