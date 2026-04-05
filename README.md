# Auth App — Spring Boot + JWT + React

Full-stack authentication system with login & registration using Spring Security, JWT, and a React frontend. Runs fully containerized with Docker.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot, Spring Security, JPA |
| Auth | JWT (jjwt 0.11.5) |
| Database | PostgreSQL 15 |
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Container | Docker + Docker Compose |

---

## Project Structure

```
project-root/
├── backend/          # Spring Boot app
│   ├── src/main/java/com/example/demo/
│   │   ├── config/        # SecurityConfig
│   │   ├── controller/    # AuthController
│   │   ├── dto/           # Request & Response DTOs
│   │   ├── entity/        # User entity
│   │   ├── repository/    # UserRepository
│   │   ├── security/      # JwtUtil, JwtAuthFilter, UserDetailsServiceImpl
│   │   └── service/       # AuthService
│   └── Dockerfile
├── frontend/         # React Vite app
│   ├── src/
│   │   ├── api/           # Axios auth API calls
│   │   ├── context/       # AuthContext (token management)
│   │   └── pages/         # Login, Register, Dashboard
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Bearer Token | Get current user |

---

## Running the App

**Requirements:** Docker Desktop installed and running.

```bash
# Clone / open the project folder
cd project-root

# Build and start all services
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8080 |
| Database | localhost:5432 |

---

## Environment Variables

Configured in `docker-compose.yml` under the `backend` service:

| Variable | Description |
|---|---|
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `JWT_SECRET` | Secret key for signing JWT tokens (min 32 chars) |

---

## Auth Flow

```
User submits login/register
        ↓
POST /api/auth/login or /register
        ↓
Spring Security validates credentials
        ↓
JwtUtil generates token
        ↓
Response: { token, username, email }
        ↓
Frontend stores token in localStorage
        ↓
Protected requests → Authorization: Bearer <token>
        ↓
JwtAuthFilter validates → grants access ✓
```

---

## Notes

- Token expiration: 24 hours (86400000ms)
- Passwords are hashed with BCrypt
- Database tables are auto-created by Hibernate on first run
- CORS is configured for `localhost:5173` (dev) and `frontend:5173` (Docker)
