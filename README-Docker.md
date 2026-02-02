# Docker Setup for InstaFood

This document explains how to run the InstaFood application using Docker.

## Prerequisites

- Docker Desktop installed on your system
- Docker Compose (included with Docker Desktop)

## Project Structure

```
CDAC-InstaFood/
├── client/                 # React/Vite frontend
│   ├── Dockerfile
│   └── .dockerignore
├── server/                 # Spring Boot backend
│   ├── Dockerfile
│   └── .dockerignore
└── docker-compose.yml      # Orchestration file
```

## Quick Start

### Option 1: Run All Services with Docker Compose (Recommended)

```bash
# From the project root directory
docker-compose up -d
```

This will start:
- **MySQL Database** on port `3306`
- **Spring Boot Backend** on port `8080`
- **React Frontend** on port `80`

### Option 2: Build and Run Individual Services

#### Backend Only
```bash
cd server
docker build -t instafood-backend .
docker run -p 8080:8080 instafood-backend
```

#### Frontend Only
```bash
cd client
docker build -t instafood-frontend .
docker run -p 80:80 instafood-frontend
```

## Accessing the Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html

## Docker Commands

### View Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Database)
```bash
docker-compose down -v
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

## Environment Variables

You can customize the database credentials and other settings by modifying the `docker-compose.yml` file or creating a `.env` file:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=instafood
MYSQL_USER=instafood_user
MYSQL_PASSWORD=instafood_pass
```

## Configuration Notes

### Frontend Configuration

The frontend Dockerfile uses a multi-stage build:
1. **Build Stage**: Uses Node.js to build the Vite application
2. **Production Stage**: Serves the built files using nginx

If you need to configure API endpoints, update the frontend code to point to `http://localhost:8080` or use environment variables.

### Backend Configuration

The backend Dockerfile uses a multi-stage build:
1. **Build Stage**: Uses Maven to compile and package the Spring Boot application
2. **Production Stage**: Runs the JAR file using a lightweight JRE

Database connection is configured via environment variables in `docker-compose.yml`.

## Troubleshooting

### Port Already in Use
If you get port conflicts, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Change host port (left side)
```

### Database Connection Issues
Ensure the backend waits for the database to be ready. The `docker-compose.yml` includes a health check for this.

### Frontend Can't Connect to Backend
If running in production, you may need to configure CORS in the Spring Boot backend and update the API base URL in the frontend.

## Production Considerations

1. **Security**: Change default passwords in production
2. **Volumes**: Use named volumes for data persistence
3. **Environment Variables**: Use `.env` files for sensitive data
4. **Nginx Configuration**: Add custom nginx config for routing and SSL
5. **JVM Options**: Adjust memory settings in the backend Dockerfile based on your server capacity

## Clean Up

To remove all containers, networks, and volumes:
```bash
docker-compose down -v
docker system prune -a
```
