import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
    login,
    refresh,
    register,
} from "../../controllers/auth.controller.js";
import { authUser } from "../../middlewares/auth-user.middleware.js";

const router = Router();

// Regitster
/* /api/v1/auth/register - POST */
router.post("/register", expressAsyncHandler(register));

// Login
/* /api/v1/auth/login - POST */
router.post("/login", expressAsyncHandler(login));

// Refresh
/* /api/v1/auth/refresh - GET */
router.get(
    "/refresh",
    expressAsyncHandler(authUser("all", "refresh")),
    expressAsyncHandler(refresh)
);

export default router;
