import Appointment from "../models/schemas/appointment.model";
import ResponseError from "../classes/response-error.class";
import User from "../models/schemas/user.model"
import Specialty from "../models/schemas/specialty.model"
import Timeslot from "../models/schemas/timeslot.model";
import generateRandomCode from "../utils/generate-random-code";
import returnMissingFields from "../../../../backend/src/utils/missing-fields.util";
import Patient from "../models/schemas/patient.model";


const createAppointment = async (req, res) => {
    const { specialty, timeslot, doctor,  patient } = req.body;

    const missingFields = returnMissingFields({ specialty, patient, doctor, timeslot });
    if (missingFields.length > 0) {
        throw new ResponseError(400, "Input Error", `Missing fields: ${missingFields.join(", ")}`);
    }

    const findAppointment = await Appointment.findOne({
        specialty,
        doctor: doctor,
        timeslot,
        user: patient
    });

    if (findAppointment) {
        throw new ResponseError(400, "Input Error", "Appointment already exists");
    }

    const findDoctor = await User.findById(doctor);
    if (!findDoctor) {
        throw new ResponseError(400, "Input Error", "Doctor not found");
    }

    const findSpecialty = await Specialty.findById(specialty);
    if (!findSpecialty) {
        throw new ResponseError(400, "Input Error", "Specialty not found");
    }

    const findTimeslot = await Timeslot.findById(timeslot);
    if (!findTimeslot) {
        throw new ResponseError(400, "Input Error", "Timeslot not found");
    }

    const findPatient = await Patient.findById(patient);
    if (!findPatient) {
        throw new ResponseError(400, "Input Error", "Patient not found");
    }

    await Timeslot.updateOne(
        { _id: timeslot },
        { $set: { status: "busy" } }
    );

    const orderNumber = generateRandomCode();


    const newAppointment = await Appointment.create({
        specialty,
        doctor: doctor,
        user: patient,
        orderNumber,
        timeslot
    });


    if (!newAppointment) {
        throw new ResponseError(400, "Server Error", "Couldn't create appointment");
    }

    res.status(201).json({
        success: true,
        type: "success",
        message: "Appointment booked successfully",
        data: newAppointment,
    });
}


const getAppointments = async (req, res) => {
    const user = req.user;

    let appointments;

    if (user.role !== "admin") {

        const findAppointments = await Appointment.find({
            doctor: user._id
        }).populate("doctor")
            .populate("user")
            .populate("timeslot")
            .populate("specialty")
            .sort({ createdAt: -1 })
            .lean();

        appointments = findAppointments;


    } else {
        const findAppointments = await Appointment.find().populate("doctor")
            .populate("user")
            .populate("timeslot")
            .populate("specialty")
            .lean();

        appointments = findAppointments;
    }

    res.status(200).json({
        success: true,
        type: "success",
        message: "Appointments fetched successfully",
        data: appointments,
    });

}

const updateAppointmentStatus = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { updateTo } = req.body;

    const statusVals = ["canceled", "completed", "approved", "rejected"]
    if (!id || !updateTo) {
        throw new ResponseError(400, "Input Error", "Appointment id and updateTo query required");
    }

    if (!statusVals.includes(updateTo)) {
        throw new ResponseError(400, "Input Error", "Invalid updateTo value");
    }

    if (user.role === "user" && updateTo !== "canceled") {
        throw new ResponseError(400, "Input Error", "User can only cancel appointment");
    }

    if (user.role === "doctor" && updateTo === "canceled") {
        throw new ResponseError(400, "Input Error", "Doctor cann't cancel appointment");
    }

    const findAppointment = await Appointment.findById(id);
    if (!findAppointment) {
        throw new ResponseError(400, "Input Error", "Appointment not found");
    }

    if (findAppointment.status === updateTo) {
        throw new ResponseError(400, "Input Error", "Cann't update to the same status");
    }

    await Appointment.updateOne(
        { _id: id },
        { $set: { status: updateTo } }
    );

    res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        data: findAppointment
    })

}

export {
    createAppointment,
    getAppointments,
    updateAppointmentStatus
}