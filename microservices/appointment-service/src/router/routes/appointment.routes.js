import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    createAppointment,
    getAppointments,
    updateAppointmentStatus
} from "../../controllers/appointment.controller";
import { authUser } from "../../middlewares/auth-user.middleware";

const router = Router();

// Book
/* /api/v1/appointment/book - POST */
router.post("/book", authUser("doctor", "access") , expressAsyncHandler(createAppointment));


// Appointment
/* /api/v1/appointment - GET */
router.get("/", authUser("all", "access"), expressAsyncHandler(getAppointments));


// Appointment
/* /api/v1/appointment/:id - GET */
router.put("/:id", authUser("all", "access"), expressAsyncHandler(updateAppointmentStatus));



export default router;