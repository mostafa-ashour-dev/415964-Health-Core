import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

specialtySchema.index({ name: "text" });



const Specialty = mongoose.model("Specialty", specialtySchema);
export default Specialty;
