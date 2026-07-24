import Patient from "../models/schemas/patient.model.js";
import returnMissingFields from "../utils/missing-fields.util.js";
import User from "../models/schemas/user.model.js";
import bcrypt from "bcryptjs";
import ResponseError from "../classes/response-error.class.js";
import slugify from "slugify";
import crypto from "crypto";
import { generateToken } from "../utils/generate-token.util.js";
import Specialty from "../models/schemas/specialty.model.js";



const createPatient = async (req, res) => {
    const user = req.user;
    const { full_name, email, age, allergies } = req.body;
    const missingFields = returnMissingFields({ full_name, email, age, allergies });
    
    if (missingFields.length > 0) {
        throw new ResponseError(400, "Input Error", `Missing fields: ${missingFields.join(", ")}`);
    }

    const baseUsername = slugify(full_name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });
    const username = `${baseUsername}-${crypto.randomBytes(4).toString("hex")}`;

    const existingUser = await Patient.findOne({ email, createdBy: user._id });
    if (existingUser) {
        throw new ResponseError(400, "Input Error", "Patient already exists for this doctor");
    }


    const newPatient = await Patient.create({
        full_name,
        username,
        email,
        age,
        allergies,
        createdBy: user._id
    });

    if (!newPatient) {
        throw new ResponseError(400, "Input Error", "Couldn't create patient");
    }

    res.status(201).json({
        success: true,
        message: "Patient created successfully",
        data: newPatient
    })

}


const getPatients = async (req, res) => {
    const user = req.user;

    const patients = await Patient.find({
        createdBy: user
    }).sort({ createdAt: -1 }).lean();

    res.status(200).json({
        success: true,
        message: "Patients fetched successfully",
        data: patients
    })
}


export {
    createPatient,
    getPatients
}