import { Router } from "express";
const router = Router();

// Routes Imports
import authRoutes from "./routes/auth.routes";
import specialtyRoutes from "./routes/specialty.routes";
import patientRoutes from "./routes/patient.routes";

// Auth Routes
router.use("/auth", authRoutes);

// Specialty Routes
router.use("/specialty", specialtyRoutes);

// Patient Routes
router.use("/patient", patientRoutes);

export default router;
