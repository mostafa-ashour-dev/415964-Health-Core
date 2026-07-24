

import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { proxyToAppointmentService } from "../../controllers/appointment-service-proxy.controller.js";
import expressAsyncHandler from "express-async-handler";

const router = Router();


router.post(
    "/new",
    authUser("doctor"),
    expressAsyncHandler(proxyToAppointmentService)

);

router.get(
    "/:id",
    authUser("all"),
    expressAsyncHandler(proxyToAppointmentService)

);

export default router;
