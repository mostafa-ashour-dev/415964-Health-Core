import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware";
import { proxyToAppointmentService } from "../../controllers/appointment-service-proxy.controller";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post(
    "/book",
    authUser("doctor"),
    expressAsyncHandler(proxyToAppointmentService)
);

router.get(
    "/",
    authUser("all"),
    expressAsyncHandler(proxyToAppointmentService)

);

router.put(
    "/:id",
    authUser("all"),
    expressAsyncHandler(proxyToAppointmentService)
);

export default router;