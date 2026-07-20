import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import slugify from "slugify";
import User from "../models/schemas/user.model.js";
import Specialty from "../models/schemas/specialty.model.js";

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

        const processedUsers = [];
        let doctorId = null;

        for (const user of seedUsers) {
            let existingUser = await User.findOne({ email: user.email });

            if (existingUser) {
                console.log(`User with email ${user.email} already exists.`);
                if (existingUser.role === "doctor") doctorId = existingUser._id;
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

            if (newUser.role === "doctor") {
                doctorId = newUser._id;
            }
        }

        console.log("\nSeeding specialties...");

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

            if (spec.name === "Cardiology" && doctorId) {
                await Specialty.findByIdAndUpdate(existingSpec._id, {
                    $addToSet: { doctors: doctorId }
                });
                console.log(`Assigned Doctor (Mohamed Hamed) to Cardiology.`);
            }
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