import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    createPatient,
    getPatients
} from "../../controllers/patient.controller";
import { authUser } from "../../middlewares/auth-user.middleware";

const router = Router();

// Create Patient
/* /api/v1/patient - POST */
router.post("/", authUser("doctor") , expressAsyncHandler(createPatient));

// Get Patient
/* /api/v1/patient - GET */
router.get("/", authUser("doctor"), expressAsyncHandler(getPatients));



export default router;
