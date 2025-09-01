# Docs API

A modern, secure REST API built with NestJS, featuring user authentication, PostgreSQL database integration, and comprehensive API documentation.

## 🚀 Features

- **Authentication & Authorization**: Secure authentication using Better-Auth
- **User Management**: Complete user CRUD operations with validation
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Documentation**: Auto-generated Swagger documentation
- **Data Validation**: Zod schema validation with NestJS integration
- **Docker Support**: Containerized development environment
- **TypeScript**: Full TypeScript support with strict typing

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better-Auth](https://www.better-auth.com/)
- **Validation**: [Zod](https://zod.dev/) with [nestjs-zod](https://github.com/risenforces/nestjs-zod)
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or use Docker Compose)
- **Docker** and **Docker Compose** (optional, for containerized development)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd docs-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# Application
PORT=3000
NODE_ENV=development

# Better-Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_BASE_URL="http://localhost:3000"
```

### 4. Database setup

Start PostgreSQL using Docker Compose:

```bash
docker-compose up postgres -d
```

Run database migrations:

```bash
npm run db:migrate
```

### 5. Start the application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3000/api`

## 📚 API Documentation

Once the application is running, you can access:

- **Swagger UI**: `http://localhost:3000/swagger`
- **OpenAPI JSON**: `http://localhost:3000/swagger/json`
- **Better-Auth Reference**: `http://localhost:3000/api/better-auth/reference`

## 🐳 Docker Development

### Using Docker Compose

```bash
# Start all services (API + PostgreSQL)
docker-compose up

# Start only PostgreSQL
docker-compose up postgres -d

# Build and run the API container
npm run docker:build
npm run docker:run
```

## 🗄️ Database Operations

```bash
# Generate migration files
npm run db:generate

# Push schema changes to database
npm run db:push

# Run migrations
npm run db:migrate

# Open Drizzle Studio (Database GUI)
npm run db:studio
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Generate test coverage report
npm run test:cov

# Run tests in debug mode
npm run test:debug
```

## 🔧 Development Tools

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Type checking
npm run type-check

# Build the project
npm run build
```

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.guard.ts
│   ├── auth.module.ts
│   └── better-auth.service.ts
├── config/               # Configuration files
│   ├── app.config.ts
│   ├── better-auth.config.ts
│   └── database.config.ts
├── database/             # Database configuration and schema
│   ├── database.module.ts
│   ├── database.schema.ts
│   ├── drizzle.service.ts
│   └── migrations/
├── user/                 # User management module
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   └── dto/
├── app.controller.ts     # Main application controller
├── app.module.ts         # Root application module
├── app.service.ts        # Main application service
├── main.ts               # Application entry point
└── zod.exception.ts      # Custom Zod exception filter
```

## 🔐 Authentication

This API uses Better-Auth for authentication. Key features:

- **Session-based authentication**
- **Bearer token support**
- **User registration and login**
- **Protected routes with `@ApiBearerAuth()` decorator**
- **Public routes with `@Public()` decorator**

## 📖 API Endpoints

### Authentication
- `GET /api/auth/user` - Get current authenticated user

### Users
- `GET /api/user` - Get all users
- `POST /api/user` - Create a new user
- `GET /api/user/:id` - Get user by ID

For detailed API documentation, visit the Swagger UI at `/swagger` when the application is running.

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `BETTER_AUTH_SECRET` | Secret key for Better-Auth | - |
| `BETTER_AUTH_BASE_URL` | Base URL for authentication | `http://localhost:3000` |

## 🚢 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Docker Production

```bash
# Build the Docker image
docker build -t docs-api .

# Run the container
docker run --env-file .env -p 3000:3000 docs-api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License.

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com)
- [Better-Auth Documentation](https://www.better-auth.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Zod Documentation](https://zod.dev/)
