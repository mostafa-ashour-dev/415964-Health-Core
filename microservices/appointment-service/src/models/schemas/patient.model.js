import mongoose from "mongoose";
import {
    EMAIL_REGEX,
    USERNAME_REGEX,
} from "../validation/user.validation.js";

const patientSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "Patient full_name is required"],
            trim: true,
            minLength: 3,
            maxLength: 255,
        },
        username: {
            type: String,
            required: [true, "Patient username is required"],
            trim: true,
            unique: true,
            match: USERNAME_REGEX,
            minLength: 3,
            maxLength: 255,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Patient email is required"],
            trim: true,
            unique: true,
            minLength: 3,
            maxLength: 255,
            validate: {
                validator: (value) => {
                    return EMAIL_REGEX.test(value);
                },
                message: (props) => `${props.value} is invalid email`,
            },
        },
        age: {
            type: Number,
            min: 1,
            max: 100,
            required: true,
        },
        allergies: {
            type: [String],
            default: ["None"]
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

patientSchema.index({ full_name: "text" });
patientSchema.index({ username: "text" });

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
