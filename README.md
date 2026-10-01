# HarvestHub – Farm Management & Crop Planning

## Project Description
HarvestHub is a comprehensive full-stack web application designed for farmers to easily manage their farms, track crops, schedule maintenance for equipment, and maintain a full history of expenses and yields. 

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **Field Management**: Add, view, edit, and delete field details including area, soil type, and location.
- **Crop Planning & Rotation**: Rule-based crop rotation recommendation system, and field-to-crop assignments with expected harvest calculation.
- **Field Operations**: Log operations such as ploughing, sowing, irrigation, and fertilization.
- **Financial & Yield Tracking**: Log equipment expenses and record expected vs. actual crop yields.
- **Equipment Maintenance**: Track machinery, log purchase dates, and schedule upcoming maintenance.
- **Dashboard & Reports**: Consolidated view of all critical metrics.

## Technology Stack
- **Backend**: Java 17+, Spring Boot, Spring Security (JWT), Spring Data JPA, Oracle Database
- **Frontend**: React, Vite, React Router, Axios, Bootstrap
- **Build Tool**: Maven, npm

## Architecture
- React Frontend -> REST APIs -> Controllers -> Service Layer -> JPA Repository -> MySQL Database

## Project Structure
```
HarvestHub/
├── backend/            # Spring Boot REST API
│   ├── src/main/java/com/harvesthub
│   │   ├── config/     # Security and App configurations
│   │   ├── controller/ # REST Endpoints
│   │   ├── exception/  # Global error handling
│   │   ├── model/      # Entities and DTOs
│   │   ├── repository/ # Spring Data JPA Interfaces
│   │   ├── security/   # JWT utilities and filters
│   │   └── services/   # Business logic layer
│   └── pom.xml
└── frontend/           # Vite + React Application
```

## Setup Instructions

### Environment Variables (Backend)
Set the following environment variables (or configure `application.properties` based on `application-example.properties`):
- `DB_URL`: JDBC url for Oracle (e.g. `jdbc:oracle:thin:@localhost:1521:XE`)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: Random 256-bit base64 string for signing tokens

### How to Run Backend
1. Ensure Java 17+ is installed.
2. Navigate to `backend/`
3. Run `./mvnw spring-boot:run`
4. The server will start on `http://localhost:8080`.

### API Documentation (Swagger)
When the backend is running, access the Swagger UI at:
`http://localhost:8080/swagger-ui.html`

### How to Run Frontend
1. Ensure Node.js (18+) is installed.
2. Navigate to `frontend/`
3. Run `npm install`
4. Run `npm run dev`
5. The application will start on `http://localhost:5173`.
