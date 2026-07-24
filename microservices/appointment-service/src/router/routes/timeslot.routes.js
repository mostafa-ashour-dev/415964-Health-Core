import expressAsyncHandler from "express-async-handler";
import { Router } from "express";
import { createTimeslot, getTimeslots } from "../../controllers/timeslot.controller.js";


const router = Router();


// New
/* /api/timeslot/new - POST */
router.post("/new", expressAsyncHandler(createTimeslot));



// Timeslot
/* /api/timeslot/id - GET */
router.get("/:id", expressAsyncHandler(getTimeslots));


export default router;