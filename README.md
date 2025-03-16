# Digantara Backend

## Overview
Digantara Backend is a Node.js and Express API that provides endpoints for algorithm operations (binary search, quick sort, BFS) and logging. It uses MongoDB to store logs and supports deployment via Docker.

## Project Structure
// ...existing code/project structure description...
- **src/**  
  &nbsp;&nbsp;&nbsp;&nbsp;- **config/**: Database connection and configuration.  
  &nbsp;&nbsp;&nbsp;&nbsp;- **controllers/**: Algorithm and log controllers.  
  &nbsp;&nbsp;&nbsp;&nbsp;- **middleware/**: Custom middleware including the request logger.  
  &nbsp;&nbsp;&nbsp;&nbsp;- **models/**: Mongoose schemas.  
  &nbsp;&nbsp;&nbsp;&nbsp;- **routes/**: API route definitions.  
  &nbsp;&nbsp;&nbsp;&nbsp;- **utils/**: Utility functions (e.g., logger).  
- **server.js**: Entry point for the server.  
- **package.json**: Project metadata and npm scripts.  
- **.env**: Environment variable configuration.  
- **DockerFile** & **docker-compose.yml**: Container setup files.

## Prerequisites
- Node.js v18+  
- A running MongoDB instance (local or via MongoDB Atlas)  
- (Optional) Docker and Docker Compose

## Setup & Installation
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   - Create or modify the `.env` file at the project root:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     ```

## Running the Application
### Locally
To start the server in development mode with automatic reload:
```
npm run dev
```
Or, run it directly:
```
node server.js
```
Then, visit `http://localhost:3000` to test the API.

### With Docker
1. Build the Docker image:
   ```
   docker build -t digantara-backend .
   ```
2. Run the Docker container:
   ```
   docker run -p 3000:3000 digantara-backend
   ```

### Using Docker Compose
If you have Docker Compose installed, run:
```
docker-compose up --build
```

## API Endpoints
- `GET /` : Health check and default route.
- `POST /api/binary-search` : Executes a binary search on a sorted array.
- `POST /api/quick-sort` : Sorts an array using quick sort.
- `POST /api/bfs` : Performs a breadth-first search on a graph.
- `GET /api/logs` : Retrieves logs with filtering and pagination options.

## Logging
The project logs every incoming request with details like HTTP method, endpoint, IP address, and response time. Logs are output to the console and saved to MongoDB.

## Troubleshooting
- Verify that the `.env` file exists and contains correct values.
- Confirm that MongoDB is running and accessible via the provided `MONGODB_URI`.
- Check Docker container port mappings if using Docker.


## Author
Suraj Gupta
