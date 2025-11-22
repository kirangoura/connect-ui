# Connect - Project Documentation

## Overview
This is a web application project set up to run in the Replit environment. The project was imported from a GitHub repository with minimal initial content and has been configured with a basic Vite-based frontend application.

## Project Structure
- `index.html` - Main HTML file
- `style.css` - Stylesheet with gradient background and centered layout
- `main.js` - JavaScript entry point
- `vite.config.js` - Vite configuration (configured for Replit environment)
- `package.json` - Node.js dependencies and scripts

## Technology Stack
- **Build Tool**: Vite 5.x
- **Runtime**: Node.js 20
- **Frontend**: Vanilla HTML, CSS, and JavaScript

## Configuration
- **Dev Server**: Runs on port 5000 with host 0.0.0.0
- **HMR**: Configured for Replit's proxy environment with WSS protocol on port 443
- **Workflow**: "Start application" runs `npm run dev`

## Recent Changes (Nov 22, 2025)
- Initial project setup from minimal GitHub repository
- Added Vite build configuration
- Configured development server for Replit environment
- Created basic landing page with styled content
- Set up npm scripts and dependencies
- Configured workflow to run on port 5000

## Development
To run the development server:
```bash
npm run dev
```

The application will be available at the Replit webview preview.

## Build
To create a production build:
```bash
npm run build
```

## Architecture Notes
- The Vite server is configured to accept all hosts to work with Replit's proxy system
- HMR uses WSS protocol on port 443 for hot module reloading through the proxy
- The server binds to 0.0.0.0:5000 as required by Replit's frontend hosting
