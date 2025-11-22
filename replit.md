# Connect - Community Events Platform

## Overview

Connect is a community platform that facilitates real-world connections through local events, sports activities, fitness groups, and social gatherings. The application uses a modern full-stack architecture with a React frontend and Spring Boot backend, designed to help people discover and join in-person experiences in their communities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology**: React 18 with Vite 5.x build tooling

The frontend is a single-page application (SPA) built with React and served through Vite's development server on port 5000. The architecture follows a component-based structure:

- **Component Organization**: Modular UI components (Navbar, Hero, Categories, FeaturedEvents, HowItWorks, CTASection, Footer) for reusability and maintainability
- **API Integration**: Centralized API service layer (`src/services/api.js`) that abstracts all backend communication
- **Styling Approach**: CSS with CSS variables for consistent theming and easy customization, avoiding framework dependencies
- **Build System**: Vite chosen for fast development server, hot module replacement, and optimized production builds

**Rationale**: React with Vite provides a modern, performant development experience with minimal configuration. The component-based architecture allows for easy feature additions and modifications.

### Backend Architecture

**Technology**: Spring Boot (Java) with RESTful API design

The backend runs on port 3001 and follows a layered architecture pattern:

- **Controller Layer** (`EventController.java`): Handles HTTP requests and responses for event-related operations
- **Service Layer** (`EventService.java`): Contains business logic and orchestrates data operations
- **Repository Layer** (`EventRepository.java`): Abstracts database access using Spring Data JPA
- **Model Layer** (`Event.java`): Defines the event entity and data structure

**API Design**: RESTful endpoints following standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations, plus custom endpoint for joining events (POST `/events/{id}/join`)

**Rationale**: Spring Boot provides enterprise-grade features, dependency injection, and built-in support for database migrations. The layered architecture separates concerns and makes the codebase testable and maintainable.

### Data Storage

**Database**: PostgreSQL

**Schema Management**: Flyway for database migrations

The database schema is version-controlled through Flyway migrations located in `backend/src/main/resources/db/migration/`. Migrations run automatically on application startup, ensuring schema consistency across environments.

**Migration Strategy**: V1 creates the initial events table with fields for event details, scheduling, capacity, and participant tracking

**Rationale**: PostgreSQL offers reliability, ACID compliance, and robust support for relational data. Flyway ensures reproducible database state and simplifies deployment across development, staging, and production environments.

### Configuration Management

**Environment Variables**: Database connection details (DATABASE_URL, DB_USER, DB_PASSWORD) are externalized for security and environment-specific configuration

**Frontend Configuration**: API base URL configurable via `VITE_API_URL` environment variable, defaulting to `http://localhost:3001/api` for local development

**Backend Configuration**: Spring Boot's `application.properties` manages server port, database connection, and Flyway settings

**Rationale**: Externalizing configuration enables the same codebase to run in multiple environments without code changes, following twelve-factor app principles.

## External Dependencies

### Frontend Dependencies

- **React 19.2.0**: Core UI library for building component-based interfaces
- **React DOM 19.2.0**: React rendering for web browsers
- **Vite 5.x**: Development server and build tool
- **@vitejs/plugin-react 5.1.1**: Enables React Fast Refresh and JSX support in Vite
- **CORS 2.8.5**: Cross-origin resource sharing middleware (Note: Listed but likely unused in frontend-only code)
- **Express 5.1.0**: Web framework (Note: Listed but not actively used; may be legacy dependency)

### Backend Dependencies (Gradle)

- **Spring Boot**: Application framework (version specified in `build.gradle`)
- **Spring Data JPA**: Database repository abstraction
- **PostgreSQL JDBC Driver**: Database connectivity
- **Flyway**: Database migration management

### External Services

**Database Service**: PostgreSQL database server (self-hosted or managed service like AWS RDS, Heroku Postgres)

**Connection Details**: Configured via environment variables to support different database instances across environments

### Deployment Considerations

The application is structured to support repository separation: the backend folder is designed to be moved to a separate Git repository, enabling independent deployment and scaling of frontend and backend services.