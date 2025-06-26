# Project Management System

A full-stack project management application with task tracking capabilities, built with NestJS, React, and PostgreSQL.

## Features

- Project Management
  - Create and manage projects
  - View project details and tasks
  - JWT-based authentication

- Task Management
  - Create, update, and delete tasks
  - Task status tracking (todo, in_progress, done)
  - Priority levels (low, medium, high)
  - Filter tasks by status and priority
  - Responsive grid layout for task cards

## Tech Stack

### Backend
- NestJS with Fastify
- PostgreSQL with Drizzle ORM
- TypeBox for validation
- JWT authentication

### Frontend
- React with TypeScript
- Mantine UI components
- Zustand for state management
- React Router for navigation
- React-Query for fulfilling requests

## Prerequisites

- Bun 1.2.16+
- PostgreSQL 17+
- Docker (optional, recommended for local development)

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd nilacare-interview-exercise
```

2. Run the setup script to install all dependencies:
```bash
bun run setup
```

3. Set up the database and run migrations:
```bash
# This will:
# - Start PostgreSQL in Docker
# - Generate database migrations
# - Apply the migrations
bun run setup:db
```

4. Configure environment variables:
```bash
# Copy the example env file
cp packages/api/.env.example packages/api/.env
cp packages/ui/.env.example packages/ui/.env

# Update the values in .env if needed
# Default values should work for local development
```

5. Start the development servers:
```bash
# Start both frontend and backend
bun run dev

# Or start them individually:
bun run dev:api  # Start only the backend
bun run dev:ui   # Start only the frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Documentation: http://localhost:3000/api-docs

## Available Scripts

### Root Directory
- `bun run dev` - Start both frontend and backend in development mode
- `bun run dev:api` - Start only the backend
- `bun run dev:ui` - Start only the frontend
- `bun run setup` - Install all dependencies
- `bun run setup:db` - Set up database and run migrations
- `bun run clean` - Remove all node_modules and build directories

### Backend (packages/api)
- `bun run api:start` - Start the backend
- `bun run api:dev` - Start the backend in development mode
- `bun run api:spec&client` - Generate OpenAPI spec with TS types
- `bun run db:generate` - Generate new migrations
- `bun run db:migrate` - Apply migrations
- `bun run db:studio` - Opens local drizzle studio

### Frontend (packages/ui)
- `bun run ui:dev` - Start the frontend in development mode
- `bun run ui:build` - Build for production
- `bun run ui:preview` - Preview production build locally

## Development Workflow

1. **First-time setup:**
   ```bash
   # Clone and setup
   git clone <repository-url>
   cd nilacare-interview-exercise
   bun run setup
   bun run setup:db

   # Start development
   bun run dev
   ```

2. **Regular development:**
   ```bash
   bun run dev
   ```

3. **Database changes:**
   ```bash
   cd packages/api
   
   # After modifying schema files
   bun run db:generate
   bun run db:migrate
   ```

4. **Start development server:**
   ```bash
   bun run api:dev
   ```

## Architecture Decisions

### Backend

1. **NestJS with Fastify**
   - Modular architecture with clear separation of concerns
   - Global exception filter for consistent error handling
   - Already handled (KEPT IT AS IT IS)
     - Custom decorators for authentication and controller versioning
     - Pino logger integration for structured logging 
     - Fastify for improved performance over Express

2. **Code Organization**
   - Feature-based module structure (projects, tasks, users)
   - Common module for shared functionality
     - Already handled (KEPT IT AS IT IS)
       - Decorators (@AuthenticatedController, @NoAuthController, @Public)
       - Guards (AuthGuard for JWT validation)
  - Filters (AllExceptionsFilter for global error handling)
  - Clear separation between DTOs, controllers, services, and repositories
  - Consistent file naming conventions (*.controller.ts, *.service.ts, etc.)

3. **Database & ORM**
   - Repository pattern for data access abstraction
   - Already handled (KEPT IT AS IT IS)
     - PostgreSQL with Drizzle ORM for type-safe operations
     - Structured migration system with versioning
     - Schemas defined with TypeBox for validation and type safety

4. **API Design** (Already handled - KEPT IT AS IT IS)
   - OpenAPI/Swagger documentation with examples
   - Versioned API endpoints (v1 by default)
   - Consistent response formats
   - TypeBox validation for request/response schemas
   - Shared types between frontend and backend via SDK generation

5. **Authentication & Security**
   - JWT-based authentication with fast-jwt
   - Already handled (KEPT IT AS IT IS)
     - Global auth guard with public route exceptions
     - Helmet for security headers
     - CORS enabled with proper configuration
     - Request compression and multipart support

### Frontend

1. **React Architecture**
   - Feature-based organization (pages/features approach)
   - Component composition pattern
     - Separation of concerns between component, controller, and types
     - Reusable components in common directory
   - Custom hooks for business logic
   - Type-safe API client generation from OpenAPI spec

2. **State Management**
   - Zustand for global state
   - React Query for server state management
   - Proper caching and invalidation strategies
   - Optimistic updates for better UX

3. **UI/UX Design** (Already handled - KEPT IT AS IT IS)
   - Mantine UI for consistent component design
   - Responsive layout with grid system
   - Toast notifications for user feedback

4. **Code Quality** (Already handled - KEPT IT AS IT IS)
   - TypeScript for type safety
   - Biome for linting and formatting
   - Consistent file and folder structure
   - Proper error boundary implementation

## Assumptions

1. **Authentication & Authorization**
   - JWT-based authentication is sufficient for MVP
   - Single user type (no role-based access control)
   - Tokens are stored securely in client-side storage
   - No refresh token mechanism needed for MVP
   - Session management is handled client-side

2. **Data Management**
   - Projects and tasks have a one-to-many relationship
   - Single ownership model (no sharing/collaboration features)
   - In-memory caching is sufficient for current scale
   - No soft delete required for MVP
   - No audit trail needed for initial version

3. **API Design**
   - RESTful endpoints are sufficient (no GraphQL needed)
   - Synchronous operations are acceptable (no need for queues)
   - Rate limiting not required for MVP
   - Basic error handling is sufficient
   - English-only support for messages and content

4. **Performance & Scalability**
   - Application will handle moderate load
   - No need for horizontal scaling in MVP
   - Client-side filtering/sorting is acceptable
   - No need for server-side pagination initially
   - Basic caching strategy is sufficient

5. **Development & Deployment**
   - Development environment uses Docker for consistency
   - Local development uses bun for package management
   - Environment variables handle configuration
   - Development-focused logging is acceptable

## Future Improvements

With more time, I would add:

1. **Features**
   - Task related
     - Drag-and-drop task reordering 
     - Task search functionality (Have implemented backend API; currently is handled in frontend by manipulating states)
     - Real-time updates using WebSocket

2. **Technical Improvements**
   - Extending Drizzle to support auditing via BaseAudit
   - Unit/integration tests & E2E tests with Cypress
   - CI/CD pipeline & Docker compose for production
   - Rate limiting, Request caching & Performance monitoring
   - Error tracking (e.g., Sentry) & better error handling
   - Better Input sanitisation with improved API documentations including examples

3. **UX Improvements**
   - Loading skeletons & better error messages
   - Mobile optimization

## Troubleshooting

### Database Issues
1. Ensure PostgreSQL is running:
   ```bash
   docker ps
   ```
2. Reset the database:
   ```bash
   cd packages
   docker compose down -v
   docker compose up -d
   cd api
   bun run db:generate
   bun run db:migrate
   ```

### Development Server Issues
1. Clear node_modules and reinstall:
   ```bash
   bun run clean
   bun run setup
   ```
2. Check port conflicts:
   - Backend uses port 3000
   - Frontend uses port 5173
   - PostgreSQL uses port 5432

## API Documentation

The API documentation is available at `/api-docs` when running the backend server. It includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests
