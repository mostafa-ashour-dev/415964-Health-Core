import expressAsyncHandler from "express-async-handler";
import { authUser } from "../../middlewares/auth-user.middleware";
import { Router } from "express";
import { createTimeslot, getTimeslots } from "../../controllers/timeslot.controller";


const router = Router();


// New
/* /api/v1/timeslot/new - POST */
router.post("/new", authUser("doctor", "access"), expressAsyncHandler(createTimeslot));



// Timeslot
/* /api/v1/timeslot/id - GET */
router.get("/:id", authUser("all", "access"), expressAsyncHandler(getTimeslots));


export default router;