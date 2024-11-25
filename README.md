# Serverless CRUD Motorbikes Clients

A serverless REST API for managing motorcycle clients built with Node.js, TypeScript, and AWS Lambda.

## Overview

This project implements a CRUD API following Domain-Driven Design (DDD) principles and uses AWS DynamoDB for persistence.

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

## API Documentation

### Base URL
`https://jvclgdmuyl.execute-api.eu-west-3.amazonaws.com/dev`

### Available Endpoints

#### Clients
- `GET /clients` - Retrieve all clients
- `GET /clients/sort` - Get clients sorted by credits
- `GET /clients/email/:email` - Find client by email
- `GET /clients/:id` - Get client by ID
- `POST /clients` - Create new client
- `PUT /clients/:id` - Update client information
- `DELETE /clients/:id` - Remove client
- `PUT /clients/:id/credits` - Update client's credits

#### Sample Response
```json
{
    "id": "05576d50-39ab-444f-b986-b268f76f315e",
    "name": "Christian Yánez",
    "email": "christian@yanezc.com",
    "availableCredit": 1000,
    "createdAt": "2024-11-25T13:34:22.988Z"
}
```

## Database Evolution

The project was initially developed using a simulated in-memory database to facilitate rapid development and testing. Later, it was enhanced to use AWS DynamoDB for production-grade persistence.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.