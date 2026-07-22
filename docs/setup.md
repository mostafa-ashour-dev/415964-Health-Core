# ⚙️ Setup Guide

This guide covers running the project locally, with Docker, and on Kubernetes, plus testing and a demo walkthrough.

---

## 🚀 Running Locally

### Install Dependencies

```bash
npm install
```

### Run Frontend

```bash
npm run dev:frontend
```

### Run Backend

```bash
npm run dev:backend
```

### Run Appointment Service

```bash
npm run dev:appointments
```

### Run Entire Project

```bash
npm run dev:all
```

### Seed the Database

Backend and Appointment Service each expose a seed script:

```bash
npm run seed
```

> See [`env.md`](./env.md) for required environment variables before running any service.

---

## 🧪 Testing

Each service (frontend, backend, appointment service) uses **Jest** for unit and integration tests.

```bash
npm run test            # run test suite
npm run test:watch      # watch mode
npm run test:coverage   # coverage report
```

- **Backend / Appointment Service:** integration tests use `supertest` + `mongodb-memory-server` to spin up an in-memory MongoDB instance, so tests don't touch a real database.
- **Frontend:** unit tests use Jest + React Testing Library; end-to-end tests use **Cypress**.
- **Lighthouse CI:** the frontend runs automated performance/accessibility audits via:

```bash
npm run lighthouse
```

All of the above (unit, integration, Lighthouse) are wired into the CI/CD pipeline — see the root `README.md` for an overview and the GitHub Actions workflows in `.github/workflows/`.

---

## 🐳 Docker Setup

Build and run all services:

```bash
docker compose up --build
```

This spins up:

- Frontend Container
- Backend Container
- Appointment Service Container
- MongoDB Container

Compose file location: `infra/docker-compose.yml`.

---

## ☸️ Kubernetes Setup

The project is deployed to a local Kubernetes cluster (Minikube). Manifests live under `infra/k8s/`.

### Kubernetes Resources

| Resource | Purpose |
|-----------|----------|
| Deployment | Pod Management |
| Service | Internal Networking |
| ReplicaSet | High Availability |
| Secret | TLS Certificates |
| Ingress | External Traffic Routing |

### Deployments

| Service | Replicas |
|---------|----------|
| Frontend | 3 |
| Backend | 3 |
| Appointment Service | 3 |
| MongoDB | 1 |

### Ingress Routing

NGINX Ingress Controller is the single entry point to the cluster. There are two main routes in the namespace:

| Path | Routed To |
|------|-----------|
| `/` | Frontend Service |
| `/api` | Backend Service |

The Backend Service then internally forwards to the Appointment Service for any `/api/appointment` or `/api/timeslot` route.

### TLS Encryption

The system serves HTTPS via a Kubernetes TLS Secret.

1. Generate a self-signed certificate.
2. Create a Kubernetes TLS Secret.
3. Reference the Secret inside the Ingress manifest.
4. All traffic is encrypted over HTTPS.

```yaml
tls:
  - hosts:
      - hospital.local
    secretName: hospital-tls
```

---

## 🧭 Demo Walkthrough

Use the following demo doctor account to try the full booking flow:

```text
Email:    mohamed.hamed544@gmail.com
Password: Password123!
```

**Flow:**

1. **Doctor logs in** with the credentials above.
2. **Doctor creates a patient.**
3. **Doctor creates a timeslot.**
4. **Doctor creates the appointment**, using the patient and timeslot just created.

See [`api.md`](./api.md) for the exact endpoints used at each step.
