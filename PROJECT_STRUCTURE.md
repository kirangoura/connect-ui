# Connect - Project Structure

## Two Repository Setup

### connect-ui (This Repository - Frontend)
**GitHub:** `github.com/your-username/connect-ui`
**Replit:** This project

```
connect-ui/
├── src/
│   ├── components/          # React components
│   ├── services/
│   │   └── api.js          # API calls to backend
│   ├── App.jsx
│   └── index.css           # Global styles
├── index.html              # Entry point
├── vite.config.mjs         # Vite configuration
├── package.json            # Dependencies
├── dist/                   # Production build (npm run build)
├── README.md               # Main documentation
├── CONNECT_UI_SETUP.md     # Frontend setup guide
└── QUICK_START_TWO_REPOS.md # Quick setup guide
```

**Tech Stack:**
- React 18
- Vite 5
- Node.js 20

**Features:**
- Browse events by category
- Search events by location
- Responsive design (mobile, tablet, desktop)
- Mobile hamburger menu

---

### connect-api (Separate Repository - Backend)
**GitHub:** https://github.com/kirangoura/connect-api
**Replit:** New project (Create and clone backend code)

```
connect-api/
├── src/
│   ├── main/
│   │   ├── java/com/connect/
│   │   │   ├── controller/  # REST endpoints
│   │   │   ├── service/     # Business logic
│   │   │   ├── repository/  # Database access
│   │   │   └── model/       # Entities
│   │   └── resources/
│   │       └── db/migration/ # Flyway migrations
│   └── test/
├── build.gradle            # Gradle build file
├── settings.gradle
└── README.md               # Backend documentation
```

**Tech Stack:**
- Spring Boot 3.1.5
- Java 17+
- PostgreSQL
- Flyway (migrations)

**Features:**
- REST API for events
- Event search and filtering
- Join events functionality
- Database migrations

---

## Connection Flow

```
┌─────────────────────────────────────────────────┐
│ User opens browser                              │
│ connect-ui.replit.dev                          │
└──────────────────┬──────────────────────────────┘
                   │
                   │ Loads React app
                   ▼
        ┌──────────────────────┐
        │ connect-ui Frontend  │
        │ - React components   │
        │ - Mobile menu        │
        │ - Search/filter      │
        └──────────┬───────────┘
                   │
                   │ HTTP API calls
                   │ /api/events
                   │ /api/events/search
                   │
                   ▼
        ┌──────────────────────┐
        │ connect-api Backend  │
        │ - Spring Boot        │
        │ - REST endpoints     │
        │ - Business logic     │
        └──────────┬───────────┘
                   │
                   │ SQL queries
                   ▼
        ┌──────────────────────┐
        │ PostgreSQL Database  │
        │ - Events table       │
        │ - Attendees tracking │
        └──────────────────────┘
```

---

## Environment Variables

### connect-ui Needs:
```
VITE_API_URL=https://connect-api-USERNAME.replit.dev/api
```

### connect-api Needs:
```
DATABASE_URL=jdbc:postgresql://host:5432/connect_db
DB_USER=postgres
DB_PASSWORD=yourpassword
```

---

## Deployment

### Frontend (connect-ui)
1. Click "Publish" in Replit
2. Get URL: `https://connect-ui-USERNAME.replit.dev`
3. Or deploy to Netlify/Vercel (static build)

### Backend (connect-api)
1. Start from Replit: `./gradlew bootRun`
2. Get URL: `https://connect-api-USERNAME.replit.dev`
3. Or deploy to Heroku/Railway/AWS

---

## Development Workflow

**Terminal 1 - Backend (connect-api project):**
```bash
./gradlew bootRun
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend (connect-ui project):**
```bash
npm run dev
# Runs on http://localhost:5000
# Calls backend at http://localhost:3001/api
```

---

## Documentation Files

- **README.md** - Main project documentation
- **CONNECT_UI_SETUP.md** - Detailed frontend setup
- **CONNECT_API_SETUP.md** - Detailed backend setup
- **QUICK_START_TWO_REPOS.md** - Fast setup guide
- **PROJECT_STRUCTURE.md** - This file

---

## Next Steps

1. ✅ Rename GitHub repo to connect-ui (DONE)
2. ⏳ Create new GitHub repo: connect-api
3. ⏳ Create new Replit project: connect-api
4. ⏳ Copy backend code to connect-api
5. ⏳ Set up PostgreSQL in connect-api
6. ⏳ Configure VITE_API_URL in connect-ui
7. ⏳ Test connection
8. ⏳ Publish both projects
