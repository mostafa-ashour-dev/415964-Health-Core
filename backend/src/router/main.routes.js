import { Router } from "express";
const router = Router();

// Routes Imports
import authRoutes from "./routes/auth.routes";
import specialtyRoutes from "./routes/specialty.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentProxyRoutes from "./routes/appointment.routes";
import timeslotProxyRoutes from "./routes/timeslot.routes";

// Auth Routes
router.use("/auth", authRoutes);

// Specialty Routes
router.use("/specialty", specialtyRoutes);

// Patient Routes
router.use("/patient", patientRoutes);

// Proxy Routes
router.use("/appointment", appointmentProxyRoutes);

// Proxy Routes
router.use("/timeslot", timeslotProxyRoutes);


export default router;
