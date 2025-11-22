# Connect UI - Replit Setup Guide

This is the **connect-ui** repository - the React frontend for the Connect community events platform.

## Current Status

✅ **This Project (connect-ui):**
- React 18 frontend
- Responsive design (mobile, tablet, desktop)
- Mobile hamburger menu
- Event search and filtering
- Sample event data (fallback when backend unavailable)

⚠️ **Backend (connect-api) - Separate:**
- In a different Replit project
- You'll connect to it via API URL
- See **CONNECT_API_SETUP.md** for backend setup

## Features

- 🎉 Browse events by category (Events, Sports, Fitness)
- 🔍 Search events by location (city/area/zipcode)
- 📱 Fully responsive design
- 🍔 Mobile hamburger menu
- 🎯 Join events functionality
- ⚡ Fast, modern React UI

## Setup (This Project)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app runs on **http://localhost:5000**

### 3. Connect to Backend

Set environment variable for backend API URL:

**For Local Development:**
```bash
VITE_API_URL=http://localhost:3001/api
```

**For Production:**
```bash
VITE_API_URL=https://your-connect-api.replit.dev/api
```

In Replit:
1. Click "Secrets" tab
2. Add `VITE_API_URL` with your backend URL
3. Restart the project

### 4. Build for Production
```bash
npm run build
```

Creates optimized build in `dist/` folder

## Project Structure

```
connect-ui/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Categories.jsx
│   │   ├── FeaturedEvents.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   └── api.js          # Backend API calls
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.mjs
├── package.json
└── dist/               # Production build
```

## Environment Variables

### Required
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001/api)

### Examples

**Local Development (with local backend):**
```
VITE_API_URL=http://localhost:3001/api
```

**Production (with deployed backend):**
```
VITE_API_URL=https://connect-api-username.replit.dev/api
VITE_API_URL=https://connect-api.heroku.com/api
VITE_API_URL=https://connect-api.railway.app/api
```

## API Service (src/services/api.js)

The frontend communicates with backend via these methods:

```javascript
// Get all events or search
eventService.getAllEvents()
eventService.searchEvents(location, category)

// Join an event
eventService.joinEvent(eventId)

// Create event (when backend ready)
eventService.createEvent(eventData)
```

## Responsive Design

**Desktop:** Full layout with all features
**Tablet:** 2-column grids, optimized fonts
**Mobile:** 1-column layout, hamburger menu, touch-friendly

## Troubleshooting

### "Error fetching events"
- Backend not running or API URL incorrect
- Check `VITE_API_URL` environment variable
- Verify backend is accessible

### Search not working
- Make sure `VITE_API_URL` is set correctly
- Verify backend search endpoint responds
- Check browser console for errors

### Mobile menu not working
- JavaScript might be disabled
- Try hard refresh (Ctrl+Shift+R)
- Check browser console for errors

## Publishing

### Publish to Replit
1. Click "Publish" button at top
2. Choose "Autoscale" deployment
3. Get public URL: `https://your-app.replit.dev`

### Deploy Elsewhere
```bash
npm run build
# Upload dist/ folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Any static host
```

## Development Workflow

1. Make changes to React components
2. Hot reload updates in browser
3. Set `VITE_API_URL` to test backend integration
4. Run `npm run build` for production build

## Git Workflow

This project is version controlled with Git:

```bash
git status
git add .
git commit -m "Your message"
git push
```

## Next: Set Up Backend

See **CONNECT_API_SETUP.md** to set up the separate backend repository.

## Summary

- ✅ This is your React frontend
- ✅ Fully responsive and mobile-friendly
- ✅ Ready to connect to backend API
- ⏭️ Next: Create connect-api backend project
- 🚀 Then: Publish both projects

Questions? Check the main README.md for more info.
