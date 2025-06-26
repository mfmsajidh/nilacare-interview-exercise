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
   - Modular architecture makes it easy to add new features

2. **Drizzle ORM**
   - Type-safe database operations
   - Better performance compared to TypeORM
   - Built-in migration system
   - SQL-first approach for better control

3. **TypeBox for Validation**
   - Runtime type validation
   - Better performance than class-validator
   - Shared types between frontend and backend
   - OpenAPI schema generation

4. **JWT Authentication**
   - Stateless authentication
   - Easy to scale horizontally
   - Built-in support in Fastify

### Frontend

1. **Mantine UI**
   - Modern component library
   - Built-in dark mode support
   - Excellent TypeScript support
   - Comprehensive component set

2. **Zustand**
   - Lightweight state management
   - Simple API compared to Redux
   - Built-in TypeScript support
   - Easy integration with React hooks

3. **Project Structure**
   - Feature-based organization
   - Shared types between frontend and backend
   - Reusable components
   - Clear separation of concerns

## Future Improvements

With more time, I would add:

1. **Features**
   - Drag-and-drop task reordering
   - Task comments and attachments
   - Task assignments to users
   - Task due dates and reminders
   - Real-time updates using WebSocket
   - Task search functionality
   - Task categories/labels

2. **Technical Improvements**
   - Unit and integration tests
   - E2E tests with Cypress
   - CI/CD pipeline
   - Docker compose for production
   - Rate limiting
   - Request caching
   - Error tracking (e.g., Sentry)
   - Performance monitoring
   - Better error handling
   - Input sanitization
   - API documentation with examples

3. **UX Improvements**
   - Loading skeletons
   - Better error messages
   - Keyboard shortcuts
   - Bulk actions
   - Task templates
   - Export functionality
   - Mobile optimization
   - Offline support

## Assumptions

1. **Authentication**
   - Users are already registered
   - JWT tokens are handled securely
   - No need for refresh tokens in MVP

2. **Data**
   - Projects and tasks belong to a single user
   - No need for sharing/collaboration in MVP
   - Simple data structure is sufficient

3. **Performance**
   - Small to medium dataset
   - No need for pagination in MVP
   - Simple caching strategy is sufficient

4. **Security**
   - Basic JWT authentication is sufficient
   - No need for role-based access in MVP
   - Frontend runs in secure environment

## Troubleshooting

### Database Issues
1. Ensure PostgreSQL is running:
   ```bash
   docker ps
   ```
2. Reset the database:
   ```bash
   cd packages
   docker-compose down -v
   docker-compose up -d
   cd api
   bun run drizzle-kit generate
   bun run drizzle-kit push
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
