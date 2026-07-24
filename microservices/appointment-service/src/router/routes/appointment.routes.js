import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    createAppointment,
    getAppointments,
    updateAppointmentStatus
} from "../../controllers/appointment.controller.js";

const router = Router();

// Book
/* /api/v1/appointment/book - POST */
router.post("/book" , expressAsyncHandler(createAppointment));


// Appointment
/* /api/v1/appointment - GET */
router.get("/", expressAsyncHandler(getAppointments));


// Appointment
/* /api/v1/appointment/:id - GET */
router.put("/:id", expressAsyncHandler(updateAppointmentStatus));



export default router;