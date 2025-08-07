# todo101

Todo application built with React frontend, Node.js backend, and MongoDB database.

## Prerequisites

- Docker and Docker Compose installed
- Node.js (if running locally without Docker)

## How to Run

### Method 1: Using Docker Compose (Recommended)

1. **Clone the repository:**
```bash
git clone https://github.com/Napat-Sirichan/todo101.git
cd todo101
```

2. **Run with Docker Compose:**
```bash
docker-compose up --build
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:15000
- MongoDB: localhost:27017

### Method 2: Running Locally (Without Docker)

#### Backend Setup:
```bash
cd backend
npm install
npm start
```

#### Frontend Setup:
```bash
cd frontend
npm install
npm start
```

#### MongoDB:
You need to install MongoDB separately or use MongoDB Atlas.

## Useful Commands

- **Stop the application:** `Ctrl+C` (in the terminal running docker-compose)
- **Run in background:** `docker-compose up -d`
- **Stop and remove containers:** `docker-compose down`
- **View logs:** `docker-compose logs`

## Project Structure

```
todo101/
├── backend/          # Node.js + Express API
├── frontend/         # React application
├── journal/          # MongoDB data directory
└── docker-compose.yml
```

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose