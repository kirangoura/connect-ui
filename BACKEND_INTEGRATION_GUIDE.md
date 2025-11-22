# Backend Integration Troubleshooting Guide

## Current Status

✅ **Frontend**: Fully functional React app running on port 5000
✅ **Backend**: Spring Boot API running in separate Replit project
⚠️ **Connection**: Frontend-backend integration needs configuration fix

## Issue

The frontend is unable to connect to the backend due to a 502 Bad Gateway error when using the proxy, and CORS policy errors when calling directly.

## Root Cause

The proxy configuration in `vite.config.mjs` is forwarding requests to the backend, but the backend is returning 502 errors. This can happen if:

1. The backend endpoint path doesn't match expected structure
2. Database connection issues on backend
3. Spring Boot configuration mismatch between EventController mapping and actual requests

## Solution Steps

### Step 1: Verify Backend Endpoint
Go to your connect-api Replit and test the endpoint directly:

```bash
curl https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events
```

Should return a JSON array of events. If you get an error, check your backend logs.

### Step 2: Check Spring Boot Configuration

In your `connect-api` project, verify:

**EventController.java:**
```java
@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {
    // Should be accessible at /api/events if you have /api as base path
}
```

**Or in application.properties:**
```properties
server.servlet.context-path=/api
```

### Step 3: Verify CORS is Enabled

Make sure your **CorsConfig.java** exists:

```java
package com.connect.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .maxAge(3600);
    }
}
```

### Step 4: Restart Backend

Stop and restart your Spring Boot backend:

```bash
# Stop current process (Ctrl+C)
# Then run:
./gradlew bootRun
```

Wait for: `Started ConnectApplication in X seconds`

### Step 5: Frontend Will Auto-Connect

Once the backend is properly configured and restarted:
1. The proxy will successfully forward requests to `/api/events`
2. Frontend will receive real event data from database
3. "Happening This Week" section will display real events

## Fallback Behavior

Currently, if the backend isn't responding, the frontend displays built-in sample events:
- Weekend Hiking Adventure (Sports)
- Morning Yoga in the Park (Fitness)
- Coffee & Conversations (Events)
- And 7 more sample events

This allows testing the UI even while backend integration is being fixed.

## Testing the Integration

### Test 1: Direct Backend Call
```bash
curl https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events
```

Expected: JSON array with events

### Test 2: Frontend Connection
Open the Connect UI and check browser console (F12 → Console):
- If you see events displayed: ✅ Backend connected
- If you see sample events: ⚠️ Backend not responding (using fallback)
- If you see errors: Check the error messages in console

## Environment Variables

**Frontend (`connect-ui` Replit):**
```
VITE_API_URL=/api
```

This tells Vite to use the proxy for API calls. The proxy in `vite.config.mjs` forwards `/api/*` requests to the backend.

## Quick Debug Checklist

- [ ] Backend is running (`./gradlew bootRun`)
- [ ] CorsConfig.java exists in backend
- [ ] Backend logs show no errors
- [ ] Direct curl to `/api/events` returns data
- [ ] Frontend running (`npm run dev`)
- [ ] Browser console shows no errors
- [ ] Check Network tab in DevTools to see `/api/events` request status

## Next Steps

Once the backend is responding properly:
1. Users can create events via "Create Event" button
2. Users can join events via "Join" buttons
3. Users can search/filter events by location and category
4. All data will persist in the PostgreSQL database

---

**Need help?** Check the browser console (F12) for detailed error messages, or examine the backend logs in the connect-api Replit project.
