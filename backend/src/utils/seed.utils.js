import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import slugify from "slugify";
import User from "../models/schemas/user.model.js";
import Specialty from "../models/schemas/specialty.model.js";
import Patient from "../models/schemas/patient.model.js";
import Timeslot from "../models/schemas/timeslot.model.js";
import Appointment from "../models/schemas/appointment.model.js";

const seedUsers = [
    {
        full_name: "Khalid Esam",
        email: "khalid123@gmail.com",
        password: "Password123!",
        role: "admin",
    },
    {
        full_name: "Mohamed Hamed",
        email: "mohamed.hamed544@gmail.com",
        password: "Password123!",
        role: "doctor",
    },
    {
        full_name: "Mostafa Ahmed",
        email: "mostafa.ashour.dev@outlook.com",
        password: "Password123!",
        role: "user",
    },
];

const seedSpecialties = [
    { name: "Cardiology", description: "Heart and blood vessel care" },
    { name: "Pediatrics", description: "Medical care for infants, children, and adolescents" },
    { name: "Dermatology", description: "Skin, hair, and nail conditions" }
];

const seedPatients = [
    { full_name: "Ahmed Samir", email: "ahmed.samir.patient@gmail.com", age: 34 },
    { full_name: "Sara Youssef", email: "sara.youssef.patient@gmail.com", age: 27 },
    { full_name: "Omar Khaled", email: "omar.khaled.patient@gmail.com", age: 45 },
    { full_name: "Nour Ali", email: "nour.ali.patient@gmail.com", age: 19 },
    { full_name: "Laila Hassan", email: "laila.hassan.patient@gmail.com", age: 58 },
];

const seedBusyTimeslots = [
    { date: "2026-08-01", fromTime: "09:00", toTime: "09:30" },
    { date: "2026-08-01", fromTime: "10:00", toTime: "10:30" },
    { date: "2026-08-02", fromTime: "11:00", toTime: "11:30" },
    { date: "2026-08-03", fromTime: "13:00", toTime: "13:30" },
    { date: "2026-08-04", fromTime: "15:00", toTime: "15:30" },
];

const seedFreeTimeslots = [
    { date: "2026-08-15", fromTime: "09:00", toTime: "09:30" },
    { date: "2026-08-15", fromTime: "10:00", toTime: "10:30" },
    { date: "2026-08-16", fromTime: "11:00", toTime: "11:30" },
];

const generateUsername = (fullName) => {
    const base = slugify(fullName, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });
    return `${base}-${crypto.randomBytes(4).toString("hex")}`;
};

const runSeeder = async () => {
    const MONGO_URI = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/hospital";

    try {
        console.log("Connecting to database...");
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully.");

        let doctorId = null;
        let testDoctorId = null;
        let adminId = null;
        let testUserId = null;

        for (const user of seedUsers) {
            let existingUser = await User.findOne({ email: user.email });

            if (existingUser) {
                console.log(`User with email ${user.email} already exists.`);
                if (existingUser.email === "mohamed.hamed544@gmail.com") doctorId = existingUser._id;
                if (existingUser.email === "test@doctor.com") testDoctorId = existingUser._id;
                if (existingUser.role === "admin") adminId = existingUser._id;
                if (existingUser.email === "mostafa.ashour.dev@outlook.com") testUserId = existingUser._id;
                continue;
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            const username = generateUsername(user.full_name);

            const newUser = new User({
                full_name: user.full_name,
                username,
                email: user.email,
                password: hashedPassword,
                role: user.role,
            });

            await newUser.save();
            console.log(`Seeded user: ${user.full_name}`);

            if (newUser.email === "mohamed.hamed544@gmail.com") doctorId = newUser._id;
            if (newUser.email === "test@doctor.com") testDoctorId = newUser._id;
            if (newUser.role === "admin") adminId = newUser._id;
            if (newUser.email === "mostafa.ashour.dev@outlook.com") testUserId = newUser._id;
        }

        console.log("\nSeeding specialties...");

        let cardiologyId = null;
        let pediatricsId = null;

        for (const spec of seedSpecialties) {
            let existingSpec = await Specialty.findOne({ name: spec.name });

            if (!existingSpec) {
                existingSpec = new Specialty({
                    name: spec.name,
                    description: spec.description,
                    doctors: []
                });
                await existingSpec.save();
                console.log(`Created specialty: ${spec.name}`);
            } else {
                console.log(`Specialty ${spec.name} already exists.`);
            }

            if (spec.name === "Cardiology") {
                cardiologyId = existingSpec._id;
                if (doctorId) {
                    await Specialty.findByIdAndUpdate(existingSpec._id, {
                        $addToSet: { doctors: doctorId }
                    });
                    console.log(`Assigned Doctor (Mohamed Hamed) to Cardiology.`);
                }
            }

            if (spec.name === "Pediatrics") {
                pediatricsId = existingSpec._id;
                if (testDoctorId) {
                    await Specialty.findByIdAndUpdate(existingSpec._id, {
                        $addToSet: { doctors: testDoctorId }
                    });
                    console.log(`Assigned Doctor (Test Doctor) to Pediatrics.`);
                }
            }
        }

        console.log("\nSeeding patients...");

        const patientIds = [];

        for (const patient of seedPatients) {
            let existingPatient = await Patient.findOne({ email: patient.email });

            if (existingPatient) {
                console.log(`Patient with email ${patient.email} already exists.`);
                patientIds.push(existingPatient._id);
                continue;
            }

            const username = generateUsername(patient.full_name);

            const newPatient = new Patient({
                full_name: patient.full_name,
                username,
                email: patient.email,
                age: patient.age,
                createdBy: doctorId || adminId,
            });

            await newPatient.save();
            patientIds.push(newPatient._id);
            console.log(`Seeded patient: ${patient.full_name}`);
        }

        console.log("\nSeeding timeslots...");

        const timeslotIds = [];

        // 1. Seed busy timeslots for Mohamed Hamed
        for (const slot of seedBusyTimeslots) {
            let existingSlot = await Timeslot.findOne({
                doctor: doctorId,
                date: slot.date,
                fromTime: slot.fromTime,
            });

            if (existingSlot) {
                console.log(`Timeslot ${slot.date} ${slot.fromTime} already exists.`);
                timeslotIds.push(existingSlot._id);
                continue;
            }

            const newSlot = new Timeslot({
                doctor: doctorId,
                date: slot.date,
                fromTime: slot.fromTime,
                toTime: slot.toTime,
                status: "busy",
            });

            await newSlot.save();
            timeslotIds.push(newSlot._id);
            console.log(`Seeded busy timeslot: ${slot.date} ${slot.fromTime}-${slot.toTime}`);
        }

        // 2. Seed FREE timeslots for Mohamed Hamed (For Testing)
        for (const slot of seedFreeTimeslots) {
            let existingSlot = await Timeslot.findOne({
                doctor: doctorId,
                date: slot.date,
                fromTime: slot.fromTime,
            });

            if (existingSlot) {
                console.log(`Free Timeslot ${slot.date} ${slot.fromTime} already exists.`);
                continue;
            }

            const newFreeSlot = new Timeslot({
                doctor: doctorId,
                date: slot.date,
                fromTime: slot.fromTime,
                toTime: slot.toTime,
                status: "free",
            });

            await newFreeSlot.save();
            console.log(`Seeded FREE timeslot: ${slot.date} ${slot.fromTime}-${slot.toTime}`);
        }

        // 3. Seed a FREE timeslot for Test Doctor (For Testing)
        if (testDoctorId) {
            let existingTestFreeSlot = await Timeslot.findOne({
                doctor: testDoctorId,
                date: "2026-08-20",
                fromTime: "10:00",
            });

            if (!existingTestFreeSlot) {
                const newTestFreeSlot = new Timeslot({
                    doctor: testDoctorId,
                    date: "2026-08-20",
                    fromTime: "10:00",
                    toTime: "10:30",
                    status: "free",
                });
                await newTestFreeSlot.save();
                console.log(`Seeded Test Doctor FREE timeslot: 2026-08-20 10:00-10:30`);
            }
        }

        console.log("\nSeeding appointments...");

        const appointmentStatuses = ["pending", "approved", "completed", "cancelled", "rejected"];

        for (let i = 0; i < 5; i++) {
            const orderNumber = `ORD-${(i + 1).toString().padStart(4, "0")}`;

            let existingAppointment = await Appointment.findOne({ orderNumber });

            if (existingAppointment) {
                console.log(`Appointment ${orderNumber} already exists.`);
                continue;
            }

            const newAppointment = new Appointment({
                doctor: doctorId,
                specialty: cardiologyId,
                user: patientIds[i],
                timeslot: timeslotIds[i],
                orderNumber,
                status: appointmentStatuses[i],
            });

            await newAppointment.save();
            console.log(`Seeded appointment: ${orderNumber} (${appointmentStatuses[i]})`);
        }

        console.log("\nSeeding process completed successfully!");

    } catch (error) {
        console.error("Seeding failed with error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Database connection closed.");
        process.exit(0);
    }
};

runSeeder();