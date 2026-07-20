import mongoose from "mongoose";


const timeslotSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    fromTime: {
        type: String,
        required: true,
    },
    toTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["busy", "free"],
        default: "free"
    }
}, {
    timestamps: true
});

const Timeslot = mongoose.model("Timeslot", timeslotSchema);
export default Timeslot;