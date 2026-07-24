import Timeslot from "../models/schemas/timeslot.model.js";
import ResponseError from "../classes/response-error.class.js";
import User from "../models/schemas/user.model.js";
import returnMissingFields from "../utils/missing-fields.util.js";
import Appointment from "../models/schemas/appointment.model.js";


const createTimeslot = async (req, res) => {
    const user = req.user;
    const { date, fromTime, toTime } = req.body;

    const missingFields = returnMissingFields({ date, fromTime, toTime });
    if (missingFields.length > 0) {
        throw new ResponseError(400, "Input Error", `Missing fields: ${missingFields.join(", ")}`);
    }

    const existingTimeslot = await Timeslot.findOne({
        doctor: user._id,
        date, 
        fromTime, 
        toTime
    });

    if (existingTimeslot) {
        throw new ResponseError(400, "Input Error", "Timeslot already exists");
    }

    const newTimeslot = await Timeslot.create({
        date, 
        fromTime, 
        toTime, 
        doctor: user._id, 
        status: "free"
    });

    if (!newTimeslot) {
        throw new ResponseError(400, "Server Error", "Couldn't create timeslot");
    }

    res.status(201).json({
        success: true,
        message: "Timeslot created successfully",
        data: newTimeslot
    });
};

const getTimeslots = async (req, res) => {
        const user = req.user;
        const { status } = req.query;
        const { id } = req.params;
        
        const doctorId = user.role === "doctor" ? user._id : id;
        
        const query = { doctor: doctorId };
        if (status && status !== "all") {
            query.status = status;
        }

        const timeslots = await Timeslot.find(query)
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            message: "Timeslots fetched successfully",
            data: timeslots
        });

};

export { createTimeslot, getTimeslots }