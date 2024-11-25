# Serverless CRUD Motorbikes Clients

A serverless REST API for managing motorcycle clients built with Node.js, TypeScript, and AWS Lambda.

## Overview

This project implements a CRUD API following Domain-Driven Design (DDD) principles. Initially developed with a simulated database, it was later migrated to use AWS DynamoDB for persistence.

## Technologies

- Node.js (v18+)
- TypeScript
- AWS Lambda + API Gateway
- DynamoDB
- UUID for unique identifiers
- Standard JS linting configuration
- Express.js
- Serverless Framework

## Project Structure

The project follows DDD (Domain-Driven Design) architecture:

```plaintext
src/
├── domain/         # Business logic and entities
├── infrastructure/ # External services implementation (DynamoDB)
├── presentation/   # API routes and controllers
└── plugins/        # Adapters plugins
```

## Testing

The test structure mirrors the main project architecture to maintain consistency and traceability:
```plaintext
tests/
├── domain/
├── infrastructure/
├── application/
└── plugins/
```
## Getting Started

### Prerequisites

- Node.js v18 or higher
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI installed globally

### Installation

npm install

### Local Development

Run the project locally:

```
npm run dev
```

### Testing

Execute the test suite:

```
npm run test
```

For watch mode:
```
npm run test:watch
```

For coverage report:
```
npm run test:coverage
```

### Building for Production

Build the TypeScript project:

```
npm run build
```

### Deployment

Deploy to AWS Lambda using Serverless Framework:

```
serverless deploy
```

## API Usage Important Note

⚠️ **Important**: When making GET requests to the API endpoints, do not include a request body. AWS Lambda will reject requests that include a body with GET methods.

## Database Evolution

The project was initially developed using a simulated in-memory database to facilitate rapid development and testing. Later, it was enhanced to use AWS DynamoDB for production-grade persistence.

This approach allowed for:
- Faster initial development
- Easy testing without external dependencies
- Smooth transition to production database
- Validation of business logic before infrastructure implementation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.