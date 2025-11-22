# CORS Configuration Fix for Connect-API Backend

## Problem
The frontend is getting a CORS (Cross-Origin Resource Sharing) error when trying to fetch events from the backend:

```
Access to fetch at 'https://a7d39eb3-4e66-443a-8123-d0f6593d1e17-00-2xcqtlyetdtvz.riker.replit.dev/api/events' 
from origin 'http://127.0.0.1:5000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This happens because the Spring Boot backend isn't configured to allow cross-origin requests from the frontend.

## Solution: Add CORS Configuration to Backend

Go to your **connect-api** Replit project and follow these steps:

### Step 1: Create CORS Configuration Class
Create a new file: `backend/src/main/java/com/connect/config/CorsConfig.java`

```java
package com.connect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("*")  // Allow all origins (or specify your frontend URL)
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(false)
            .maxAge(3600);
    }
}
```

### Step 2: Alternative - Add CORS to EventController
If you prefer to keep configuration minimal, add this annotation to your `EventController.java`:

```java
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/events")
public class EventController {
    // ... existing code
}
```

### Step 3: Restart Backend
Once you make the changes:
1. Go back to your **connect-api** Replit project
2. Stop the current backend (Ctrl+C)
3. Run: `./gradlew bootRun`
4. Wait for it to start

### Step 4: Test Connection
Your frontend should now automatically connect and display events!

## How It Works
- `allowedOrigins("*")` - Allows requests from any domain (or replace with specific frontend URL for security)
- `allowedMethods` - Specifies which HTTP methods are allowed
- `allowedHeaders("*")` - Allows any headers in the request
- `maxAge(3600)` - Browser caches CORS permissions for 1 hour

## Production Security Note
For production, replace `"*"` with your actual frontend domain:
```java
.allowedOrigins("https://your-connect-ui.replit.dev")
```

---

**Timeline:**
1. Make one of the above changes in connect-api backend
2. Restart the backend
3. Your connect-ui frontend will automatically connect
4. Featured events will display from your database

Let me know once you've updated the backend!
