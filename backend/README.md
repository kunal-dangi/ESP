# Backend API

This is the backend for the startup project, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally OR a MongoDB Atlas URI

## Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    - Rename `.env.example` to `.env` (if not already done).
    - Update `MONGO_URI` in `.env` if you are using a different connection string.
    - (Optional) Add `EMAIL_USER` and `EMAIL_PASS` to enable email notifications.

## Running the Server

- To run in development mode (with nodemon):
    ```bash
    npm run dev
    ```

- To run in production mode:
    ```bash
    npm start
    ```

The server will start on port 5001 (or the port specified in `.env`).

## API Endpoints

### POST /api/submit

Creates a new submission.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "productNeeded": "Web App",
  "message": "I need a website for my startup."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65...",
    "name": "John Doe",
    "email": "john@example.com",
    "productNeeded": "Web App",
    "message": "I need a website for my startup.",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  },
  "message": "Submission received successfully"
}
```

### GET /api/submissions

Retrieves all submissions, sorted by newest first.

**Response:**

```json
[
  {
    "_id": "65...",
    "name": "John Doe",
    "email": "john@example.com",
    "productNeeded": "Web App",
    "message": "I need a website for my startup.",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  },
  ...
]
```

## Testing

You can use Postman or `curl` to test the endpoints.

**Example using curl:**

```bash
curl -X POST http://localhost:5001/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "productNeeded": "Test Product", "message": "This is a test."}'
```
