import mongoose from "mongoose";


const appointmentSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialty",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    timeslot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timeslot",
        required: true,
        unique: true,
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "approved", "cancelled", "completed", "rejected"],
        default: "pending",
    }
}, {
    timestamps: true
})


const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;