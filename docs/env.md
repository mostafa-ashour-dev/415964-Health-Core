# 🌍 Environment Variables

This document lists the environment variables required by each service.

---

## Backend Service

| Variable | Example | Description |
|-----------|----------|-------------|
| NODE_ENV | development | Current environment |
| PORT | 5000 | Backend server port |
| DB_CONNECTION_STRING | mongodb://127.0.0.1:27017/hospital | MongoDB connection string |
| ACCESS_TOKEN_SECRET | *(generated secret)* | JWT access token secret |
| REFRESH_TOKEN_SECRET | *(generated secret)* | JWT refresh token secret |
| APPOINTMENT_SERVICE_BASE_URL | http://localhost:4001 | Base URL used by the backend to reach the Appointment Service |

Example `.env`:

```env
NODE_ENV="development"
PORT=5000
DB_CONNECTION_STRING="mongodb://127.0.0.1:27017/hospital"
ACCESS_TOKEN_SECRET="<your-access-token-secret>"
REFRESH_TOKEN_SECRET="<your-refresh-token-secret>"
APPOINTMENT_SERVICE_BASE_URL="http://localhost:4001"
```

---

## Appointment Service

| Variable | Example | Description |
|-----------|----------|-------------|
| NODE_ENV | development | Current environment |
| PORT | 4001 | Appointment service port |
| DB_CONNECTION_STRING | mongodb://127.0.0.1:27017/hospital | MongoDB connection string |
| ACCESS_TOKEN_SECRET | *(generated secret)* | JWT access token secret |
| REFRESH_TOKEN_SECRET | *(generated secret)* | JWT refresh token secret |

Example `.env`:

```env
NODE_ENV="development"
PORT=4001
DB_CONNECTION_STRING="mongodb://127.0.0.1:27017/hospital"
ACCESS_TOKEN_SECRET="<your-access-token-secret>"
REFRESH_TOKEN_SECRET="<your-refresh-token-secret>"
```

> ⚠️ `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` must be identical between the Backend Service and the Appointment Service, since both verify tokens issued by the Backend Service.

---

## Frontend

| Variable | Example | Description |
|-----------|----------|-------------|
| VITE_BACKEND_BASE_URL | http://localhost:5000/api | Backend API URL |
| VITE_APPOINTMENT_BASE_URL | https://appointment.example.com/api | Appointment API URL (if called directly) |

Example `.env`:

```env
VITE_BACKEND_BASE_URL="http://localhost:5000/api"
```

---

## Notes

- Never commit real `.env` files — only commit `.env.example` files with placeholder values.
- Secrets (`ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`) should be injected via Kubernetes `Secret` resources in staging/production, not baked into images.
