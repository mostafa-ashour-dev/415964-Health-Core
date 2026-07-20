import { Router } from "express";
const router = Router();

// Routes Imports
import appointmentRoutes from "./routes/appointment.routes";
import timeslotRoutes from "./routes/timeslot.routes";

// Appointment Routes
router.use("/appointment", appointmentRoutes);

// Timeslot Routes
router.use("/timeslot", timeslotRoutes)


export default router;
