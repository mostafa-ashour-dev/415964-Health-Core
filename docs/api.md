# 📡 API Reference

All endpoints are exposed under the `/api` path through the Ingress. The Backend Service owns `/api/auth`, `/api/specialty`, and `/api/patient`; it forwards `/api/appointment` and `/api/timeslot` requests to the Appointment Service.

---

## Auth — Backend Service

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/api/auth/login` | Authenticate a user (doctor/admin) and issue access + refresh tokens |
| POST | `/api/auth/refresh` | Refresh an expired access token using a valid refresh token |

---

## Specialty — Backend Service

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/specialty` | List available medical specialties |
| POST | `/api/specialty` | Create a new specialty |

---

## Patient — Backend Service

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/patient` | List patients |
| POST | `/api/patient` | Create a new patient |

---

## Timeslot — Appointment Service

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/timeslot` | List available timeslots |
| POST | `/api/timeslot` | Create a new timeslot |

---

## Appointment — Appointment Service

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/appointment` | List appointments |
| POST | `/api/appointment/book` | Book an appointment (requires an existing patient + timeslot) |

---

## Typical Request Order (Doctor Flow)

1. `POST /api/auth/login` — doctor logs in
2. `POST /api/patient` — doctor creates a patient
3. `POST /api/timeslot` — doctor creates a timeslot
4. `POST /api/appointment/book` — doctor books the appointment using the patient + timeslot created above

> Auth: unless noted otherwise, all routes above require a valid access token (Bearer token or auth cookie) issued by `/api/auth/login`.
