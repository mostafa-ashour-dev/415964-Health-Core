import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    getSpecialty
} from "../../controllers/specialty.controller";

const router = Router();


// Specialty
/* /api/v1/specialty - GET */
router.get("/", expressAsyncHandler(getSpecialty));


export default router;