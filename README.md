# 🏥 Healthcare System

A full-stack healthcare management platform built with a microservices architecture. The system allows patients to book appointments, doctors to manage and respond to appointment requests, and administrators to oversee healthcare operations.

The project demonstrates modern software engineering practices including:

- React + Vite Frontend
- Node.js + Express Backend
- Microservices Architecture
- MongoDB Database
- Docker Containerization
- Kubernetes Orchestration
- NGINX Ingress Routing
- TLS Encryption
- CI/CD with GitHub Actions
- Netlify & Vercel Deployment

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Services](#services)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Docker Setup](#docker-setup)
- [Kubernetes Setup](#kubernetes-setup)
- [Ingress Networking](#ingress-networking)
- [TLS Encryption](#tls-encryption)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment Links](#deployment-links)

---

# 🏗️ Architecture Overview

```text
Client Browser
      │
      ▼
hospital.local
      │
      ▼
NGINX Ingress Controller
      │
 ┌────┴────┐
 ▼         ▼

Frontend   Backend Service
            │
            ▼
   Appointment Service
            │
            ▼
        MongoDB
```

### Infrastructure Components

| Component | Purpose |
|------------|----------|
| React Frontend | User Interface |
| Backend Service | Authentication, Authorization, Users, Doctors |
| Appointment Service | Appointment Booking & Management |
| MongoDB | Data Persistence |
| Docker | Containerization |
| Kubernetes | Orchestration |
| NGINX Ingress | Traffic Routing |
| TLS Secret | HTTPS Encryption |
| GitHub Actions | Automated CI/CD |

---

# 📂 Project Structure

```text
hospital/
│
├── frontend/
│
├── backend/
│
├── microservices/
│   └── appointment-service/
│
├── infra/
│   ├── docker-compose.yml
│   ├── deployments/
│   ├── services/
│   ├── ingress/
│   └── tls/
│
├── .github/
│   └── workflows/
│
└── package.json
```

---

# 🔧 Services

## Frontend

Responsible for:

- Authentication UI
- Patient Dashboard
- Doctor Dashboard
- Appointment Booking
- Appointment Management
- API Communication

---

## Backend Service

Responsible for:

- Authentication
- Authorization
- JWT Tokens
- User Management
- Doctor Management

Base Route:

```text
/api/auth
```

---

## Appointment Service

Responsible for:

- Appointment Creation
- Appointment Approval
- Appointment Rejection
- Timeslot Management

Base Routes:

```text
/api/appointment
/api/timeslot
```

---

# 📦 Dependencies

## Frontend Dependencies

| Package | Version |
|----------|----------|
| react | 19.2.7 |
| react-dom | 19.2.7 |
| react-router-dom | 7.18.1 |
| axios | 1.18.1 |
| zustand | 5.0.14 |
| @tanstack/react-query | 5.101.2 |
| sweetalert2 | 11.26.25 |
| sweetalert2-react-content | 5.1.2 |
| tailwindcss | 4.3.2 |
| @heroicons/react | 2.2.0 |

---

## Backend Dependencies

| Package | Version |
|----------|----------|
| express | 5.1.0 |
| mongoose | 8.18.0 |
| jsonwebtoken | 9.0.2 |
| bcryptjs | 3.0.2 |
| cookie-parser | 1.4.7 |
| cors | 2.8.5 |
| dotenv | 17.2.1 |
| multer | 2.0.2 |
| cloudinary | 2.7.0 |
| sharp | 0.34.3 |
| socket.io | 4.8.1 |
| axios | 1.11.0 |
| slugify | 1.6.6 |

---

## Appointment Service Dependencies

| Package | Version |
|----------|----------|
| express | 5.1.0 |
| mongoose | 8.18.0 |
| jsonwebtoken | 9.0.2 |
| bcryptjs | 3.0.2 |
| cookie-parser | 1.4.7 |
| cors | 2.8.5 |
| dotenv | 17.2.1 |
| multer | 2.0.2 |
| cloudinary | 2.7.0 |
| sharp | 0.34.3 |
| socket.io | 4.8.1 |
| axios | 1.11.0 |
| slugify | 1.6.6 |

---

# 🌍 Environment Variables

## Backend Service

| Variable | Example | Description |
|-----------|----------|-------------|
| NODE_ENV | development | Current environment |
| PORT | 5000 | Backend server port |
| DB_CONNECTION_STRING | mongodb://mongodb:27017/hospital | MongoDB connection string |
| ACCESS_TOKEN_SECRET | your-secret | JWT access token secret |
| REFRESH_TOKEN_SECRET | your-secret | JWT refresh token secret |

---

## Appointment Service

| Variable | Example | Description |
|-----------|----------|-------------|
| NODE_ENV | development | Current environment |
| PORT | 4001 | Appointment service port |
| DB_CONNECTION_STRING | mongodb://mongodb:27017/hospital | MongoDB connection string |
| ACCESS_TOKEN_SECRET | your-secret | JWT access token secret |
| REFRESH_TOKEN_SECRET | your-secret | JWT refresh token secret |

---

## Frontend

| Variable | Example | Description |
|-----------|----------|-------------|
| VITE_BACKEND_BASE_URL | https://api.example.com/api | Backend API URL |
| VITE_APPOINTMENT_BASE_URL | https://appointment.example.com/api | Appointment API URL |

---

# 🚀 Running Locally

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev:frontend
```

---

## Run Backend

```bash
npm run dev:backend
```

---

## Run Appointment Service

```bash
npm run dev:appointments
```

---

## Run Entire Project

```bash
npm run dev:all
```

---

# 🐳 Docker Setup

Build and run all services:

```bash
docker compose up --build
```

Infrastructure services:

- Frontend Container
- Backend Container
- Appointment Service Container
- MongoDB Container

---

# ☸️ Kubernetes Setup

The project is deployed to a local Kubernetes cluster (Minikube).

### Kubernetes Resources

| Resource | Purpose |
|-----------|----------|
| Deployment | Pod Management |
| Service | Internal Networking |
| ReplicaSet | High Availability |
| Secret | TLS Certificates |
| Ingress | External Traffic Routing |

---

## Deployments

### Frontend Deployment

```yaml
replicas: 3
```

### Backend Deployment

```yaml
replicas: 3
```

### Appointment Service Deployment

```yaml
replicas: 3
```

### MongoDB Deployment

```yaml
replicas: 1
```

---

# 🌐 Ingress Networking

NGINX Ingress Controller is used as the single entry point to the cluster.

### Routing Rules

| Path | Service |
|--------|----------|
| `/` | Frontend Service |
| `/api/auth` | Backend Service |
| `/api/users` | Backend Service |
| `/api/doctors` | Backend Service |
| `/api/appointment` | Appointment Service |
| `/api/timeslot` | Appointment Service |

Example:

```text
https://hospital.local
```

Routes to:

```text
frontend-service
```

Example:

```text
https://hospital.local/api/auth/login
```

Routes to:

```text
backend-service
```

Example:

```text
https://hospital.local/api/appointment
```

Routes to:

```text
appointment-service
```

---

# 🔒 TLS Encryption

The system uses HTTPS through Kubernetes TLS Secrets.

### Process

1. Generate self-signed certificate.
2. Create Kubernetes TLS Secret.
3. Reference Secret inside Ingress manifest.
4. All traffic is encrypted using HTTPS.

Example:

```yaml
tls:
  - hosts:
      - hospital.local
    secretName: hospital-tls
```

---

# 🔄 CI/CD Pipeline

GitHub Actions automatically:

1. Runs ESLint
2. Runs Jest Tests
3. Builds Frontend
4. Builds Backend
5. Builds Appointment Service
6. Builds Docker Images
7. Deploys Infrastructure

Workflow Location:

```text
.github/workflows/
```

---

# 🌎 Deployment Links

## Frontend

**Netlify**

```text
[ Add Netlify URL Here ]
```

---

## Backend

**Vercel / Render**

```text
[ Add Backend URL Here ]
```

---

## Appointment Service

**Vercel / Render**

```text
[ Add Appointment Service URL Here ]
```

---

# 👨‍💻 Author

Developed as part of a Full-Stack Healthcare Infrastructure project demonstrating:

- Frontend Engineering
- Backend Development
- Microservices
- DevOps
- Docker
- Kubernetes
- Networking
- TLS Security
- CI/CD Automation