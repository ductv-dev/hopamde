# WeeAff

WeeAff is a comprehensive affiliate marketing platform focused on TikTok creators and products. Built as a modern monorepo with Turborepo, it provides tools for creators to discover products, generate AI-powered content, and manage their affiliate marketing campaigns.

## 🚀 Features

- **AI-Powered Content Creation**: Generate TikTok video scripts using Google Gemini AI
- **Product Discovery**: Advanced search with vector embeddings and BM25 text search
- **Creator Management**: Comprehensive dashboard for managing creators and their performance
- **Real-time Analytics**: Track creator engagement, GMV, and campaign performance
- **Background Processing**: Temporal workflows for data crawling and synchronization
- **Multi-platform Support**: Web applications and browser extension

## 🏗️ Architecture

This monorepo contains multiple applications and shared packages:

### Applications

- **`admin`**: Next.js admin dashboard for managing creators, users, and campaigns
- **`creator`**: Next.js creator-facing application with AI features and product browsing
- **`extension`**: Browser extension for the platform
- **`server`**: Fastify-based API server with modular architecture and Temporal workers
- **`partner-cookies-crawler`**: Tool for crawling partner cookies and data

### Shared Packages

- **`@workspace/auth`**: Authentication and session management
- **`@workspace/sdk`**: Auto-generated API client SDK
- **`@workspace/ui`**: Shared UI components with shadcn/ui
- **`@workspace/drizzle`**: Database schema and ORM configuration
- **`@workspace/tiktok-sdk`**: TikTok API integration
- **`@workspace/bm25-sdk`**: BM25 text search implementation
- **`@workspace/logger`**: Centralized logging utilities
- **`@workspace/zod`**: Shared validation schemas

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with React 19
- **Styling**: TailwindCSS 4.x
- **State Management**: Jotai for atomic state, React Query for server state
- **UI Components**: shadcn/ui with Radix primitives
- **Video Processing**: Remotion for video generation

### Backend

- **API**: Fastify with OpenAPI/Swagger documentation
- **Database**: PostgreSQL with Drizzle ORM
- **Caching**: Redis with Keyv
- **Search**: Qdrant vector database + BM25 text search
- **Background Jobs**: Temporal workflows
- **File Storage**: AWS S3 with ImgProxy for image processing

### AI & ML

- **LLMs**: OpenAI GPT, Google Gemini
- **Embeddings**: Cohere for text embeddings
- **Search**: Vector similarity + BM25 hybrid search

### DevOps & Tools

- **Monorepo**: Turborepo with pnpm workspaces
- **Type Safety**: TypeScript throughout
- **Code Quality**: ESLint, Prettier, Lefthook git hooks
- **Testing**: Vitest for unit testing

## 🚦 Getting Started

### Prerequisites

- Node.js >= 22
- pnpm >= 10.11.1
- PostgreSQL database
- Redis instance

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weeaff
```

1. Install dependencies and git hooks:

```bash
pnpm install
pnpm install-hooks
```

1. Set up environment variables (see Environment Setup section)

1. Run database migrations:

```bash
cd apps/server
pnpm migration:run
```

### Development

Start all applications in development mode:

```bash
pnpm dev
```

Or start individual applications:

```bash
# Admin dashboard
pnpm dev:admin

# Creator application
pnpm dev:creator

# Browser extension
pnpm dev:extension

# API server (requires separate terminal)
cd apps/server
pnpm dev:api
```

### Building

Build all applications and packages:

```bash
pnpm build
```

Build specific applications:

```bash
# Build extension only
pnpm build:extension
```

### Testing

Run all tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
cd apps/server
pnpm test:watch
```

## 📁 Project Structure

```text
weeaff/
├── apps/
│   ├── admin/                 # Admin dashboard (Next.js)
│   ├── creator/               # Creator application (Next.js)
│   ├── extension/             # Browser extension (Vite + React)
│   ├── server/                # API server (Fastify)
│   └── partner-cookies-crawler/ # Data crawler tool
├── packages/
│   ├── auth/                  # Authentication utilities
│   ├── sdk/                   # Auto-generated API client
│   ├── ui/                    # Shared UI components
│   ├── drizzle/               # Database schema
│   ├── tiktok-sdk/            # TikTok API integration
│   ├── bm25-sdk/              # Text search implementation
│   ├── logger/                # Logging utilities
│   ├── zod/                   # Validation schemas
│   └── typescript-config/     # Shared TypeScript configs
├── data/                      # Sample data and exports
├── docker/                    # Docker configurations
└── turbo.json                 # Turborepo configuration
```

## 🔧 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev                       # Start all apps in development
pnpm dev:admin                 # Start admin dashboard only
pnpm dev:creator               # Start creator app only
pnpm dev:extension             # Start extension only

# Building
pnpm build                     # Build all apps and packages
pnpm build:extension           # Build extension only

# Code Quality
pnpm lint                      # Lint all packages
pnpm lint:fix                  # Fix linting issues
pnpm check-types               # Type check all packages
pnpm format                    # Format code with Prettier
pnpm check-format              # Check code formatting

# Testing
pnpm test                      # Run all tests

# SDK Generation
pnpm generate-openapi          # Generate OpenAPI schema
pnpm generate-sdk              # Generate API client SDK

# Git Hooks
pnpm install-hooks             # Install git hooks with Lefthook
```

### Server-Specific Commands

```bash
cd apps/server

# Development
pnpm dev:api                   # Start API server
pnpm dev:worker-creator        # Start creator worker
pnpm dev:worker-shop           # Start shop worker
pnpm dev:worker-social         # Start social worker
pnpm dev:worker-api-partner    # Start API partner worker

# Production
pnpm start:api                 # Start API server (production)
pnpm start:worker-*            # Start specific worker (production)

# Database
pnpm migration:generate        # Generate new migration
pnpm migration:run             # Run pending migrations

# Code Generation
pnpm generate:auth             # Generate auth schema
pnpm generate:openapi          # Generate OpenAPI documentation
```

## 🌍 Environment Setup

The server requires several environment variables. Create a `.env` file in `apps/server/`:

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/weeaff"

# Redis
REDIS_URL="redis://localhost:6379"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-api-key"
GEMINI_API_KEY="your-gemini-api-key"

# AWS S3
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="your-aws-region"
AWS_S3_BUCKET="your-s3-bucket"

# TikTok Integration
TIKTOK_HOST="your-tiktok-api-host"

# Google Analytics
GA_CODE="your-ga-code"
GA_PROPERTY_ID="your-ga-property-id"
GA_CLIENT_EMAIL="your-ga-client-email"
GA_PRIVATE_KEY="your-ga-private-key"

# Application URLs
NEXT_PUBLIC_API_URL="http://localhost:3001/server"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Campaign Configuration
CAMPAIGN_ID="your-campaign-id"
PARTNER_COOKIE="your-partner-cookie"
```

## 🏛️ Architecture Details

### Server Module System

The server uses a modular dependency injection architecture with these core modules:

- **auth**: User authentication and session management
- **cache**: Redis caching layer with Keyv
- **database**: PostgreSQL with Drizzle ORM
- **product**: Product management and recommendations
- **creator**: Creator profiles and content management
- **search**: Vector and text search with Qdrant/BM25
- **embedding**: Text embeddings with Cohere
- **file**: S3 storage and ImgProxy integration
- **temporal**: Background job processing
- **campaign**: Marketing campaign management
- **category**: Product categorization

Each module follows the pattern: `schemas/ -> repositories/ -> services/ -> module.ts`

### Background Processing

Temporal workflows handle:

- Creator data crawling and analysis
- Product data synchronization
- Campaign management
- Social media user tracking

### API Design

- OpenAPI-first with automatic schema generation
- Fastify with Zod validation
- RESTful endpoints with standardized error handling
- Session-based authentication

## 🧪 Testing

The project uses Vitest for comprehensive testing with both unit and integration tests:

### Unit Tests

Unit tests focus on testing individual services and components in isolation:

```bash
# Run all tests (unit + integration)
pnpm test

# Run tests in watch mode
cd apps/server
pnpm test:watch

# Run tests for specific package
cd packages/sdk
pnpm test
```

Unit tests are located alongside source files with `.test.ts` extension and follow these patterns:

- Mock all dependencies using `vitest-mock-extended` with `mockDeep<Type>()`
- 25-30 test cases per service covering happy path, error handling, edge cases
- Use `afterEach(() => mockReset(mockDependency))` for cleanup

### Integration Tests

Integration tests verify database interactions and repository behavior with real PostgreSQL connections:

```bash
# Run integration tests (included in main test command)
pnpm test

# Run integration tests specifically
cd apps/server
pnpm test -- --run --testNamePattern="Integration"
```

Integration tests follow these standards:

- **File naming**: Use `.integration.test.ts` extension
- **Database**: Real PostgreSQL + Drizzle ORM connections (no mocks for database layer)
- **Test count**: 15-20 test cases per repository
- **Coverage**: CRUD operations, database constraints, transactions, relationships, error scenarios
- **Setup**: Proper test data cleanup using database snapshots
- **Focus**: Database interaction correctness rather than business logic isolation

#### Integration Test Structure

```typescript
describe('RepositoryName Integration Tests', () => {
  let db: DatabaseClient;
  let repository: Repository;

  beforeEach(async () => {
    await restoreTestPgSnapshot(pgEndpoint);
    db = createDatabaseClient({
      databaseConfig: { url: getTestPgConnectionString(pgEndpoint) },
    });
    repository = new Repository({ databaseClient: db });
  });

  afterEach(async () => {
    await db.$client.end();
  });

  // Test categories:
  // - CRUD operations with relationships
  // - Database constraints and validation
  // - Relationship handling and joins
  // - Data types and edge cases
  // - Error scenarios
  // - Integration scenarios
});
```

#### Example Integration Test Categories

1. **CRUD Operations**: `findById`, `findMany`, `create`, `update`, `delete`
2. **Database Constraints**: Foreign key constraints, unique constraints, not-null constraints
3. **Relationship Handling**: Proper joins with related tables, relationship integrity
4. **Data Types**: Array fields, JSONB fields, numeric values, boolean flags
5. **Error Scenarios**: Connection errors, malformed data, constraint violations
6. **Integration Scenarios**: Concurrent operations, data consistency across operations

## 📚 API Documentation

The API documentation is automatically generated from OpenAPI schemas and available at:

- Development: `http://localhost:3001/server/docs`
- The OpenAPI schema is generated in `apps/server/openapi.json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure tests pass: `pnpm test`
4. Lint and format your code: `pnpm lint:fix && pnpm format`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license - see the individual package.json files for details.

## 🔗 Related Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Fastify Documentation](https://fastify.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Temporal Documentation](https://docs.temporal.io/)
