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
- `index.html` - Main HTML entry point with root div
- `src/` - React application source code
  - `main.jsx` - React entry point
  - `App.jsx` - Main application component
  - `index.css` - Global styles with CSS variables
  - `components/` - React components
    - `Navbar.jsx` - Navigation bar with smooth scrolling
    - `Hero.jsx` - Hero section component
    - `Categories.jsx` - Activity categories display
    - `FeaturedEvents.jsx` - Event cards listing
    - `HowItWorks.jsx` - Steps explanation section
    - `CTASection.jsx` - Call-to-action section
    - `Footer.jsx` - Footer component
- `vite.config.mjs` - Vite configuration optimized for Replit environment
- `package.json` - Node.js dependencies and build scripts

## Technology Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite 5.x
- **Runtime**: Node.js 20
- **Styling**: CSS with CSS variables for theming
- **Component Architecture**: Functional components with hooks

## Features
1. **Hero Section**: Compelling value proposition with CTAs for exploring and creating events
2. **Category Cards**: Interactive cards for different activity types (events, sports, fitness, gatherings)
3. **Featured Events**: Dynamic event cards showing upcoming activities with attendee counts
4. **How It Works**: Step-by-step guide for users
5. **Navigation**: Smooth-scrolling anchor links to different sections
6. **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes

## Configuration
- **Dev Server**: Runs on port 5000 with host 0.0.0.0
- **HMR**: Configured for Replit's proxy environment with WSS protocol on port 443
- **Workflow**: "Start application" runs `npm run dev`

## Recent Changes (Nov 22, 2025)
- Transformed minimal GitHub repository into full community events platform
- **Converted to React application**: Migrated from vanilla JavaScript to React 18
- Created modular React component architecture with 8 reusable components
- Implemented React functional components with proper state management
- Built category system for events, sports, fitness, and gatherings
- Implemented dynamic event cards with sample data using React state
- Added smooth-scrolling navigation with section anchors
- Designed modern, engaging UI with gradient backgrounds and card-based layouts
- Configured Vite with React plugin for optimal HMR and development experience
- Fixed Vite configuration for Replit proxy environment (allowedHosts, HMR WebSocket)
- Set up deployment configuration for autoscale hosting

## Development
To run the development server:
```bash
npm run dev
```

The application will be available at the Replit webview preview on port 5000.

## Build
To create a production build:
```bash
npm run build
```

## Deployment
The project is configured for autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview`
- Deployment target: autoscale (stateless web application)

## Architecture Notes
- **React Component Structure**: Application split into 8 modular components for maintainability
- **Vite Configuration**: Uses `.mjs` extension for ESM compatibility with React plugin
- The Vite server is configured to accept all hosts to work with Replit's proxy system
- HMR uses WSS protocol on port 443 for hot module reloading through the proxy
- The server binds to 0.0.0.0:5000 as required by Replit's frontend hosting
- Event data is currently stored in component state (sample data) - ready for backend integration
- Smooth scrolling uses native `scrollIntoView` API for optimal performance
- CSS uses custom properties for easy theming and maintenance
- React DevTools can be used for component debugging and performance optimization

## Future Enhancement Ideas
- User authentication and profiles
- Backend API for real event data
- Event creation and management
- RSVP and attendee management
- Location-based event filtering
- Calendar integration
- Social features (comments, ratings)
- Image uploads for events
- Email notifications
