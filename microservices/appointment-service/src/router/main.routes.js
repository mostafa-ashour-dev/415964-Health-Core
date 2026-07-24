import { Router } from "express";
const router = Router();

// Routes Imports
import appointmentRoutes from "./routes/appointment.routes.js";
import timeslotRoutes from "./routes/timeslot.routes.js";
import attachUser from "../middlewares/attach-user.middleware.js";

router.use(attachUser);


// Appointment Routes
router.use("/appointment", appointmentRoutes);

// Timeslot Routes
router.use("/timeslot", timeslotRoutes);


export default router;
