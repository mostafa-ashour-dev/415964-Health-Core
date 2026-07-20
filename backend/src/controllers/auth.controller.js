import returnMissingFields from "../utils/missing-fields.util";
import User from "../models/schemas/user.model";
import bcrypt from "bcryptjs";
import ResponseError from "../classes/response-error.class";
import slugify from "slugify";
import crypto from "crypto";
import { generateToken } from "../utils/generate-token.util";
import Specialty from "../models/schemas/specialty.model";

const register = async (req, res) => {
    const { full_name, email, password, role } = req.body || {};

    const missingFields = returnMissingFields({ full_name, email, password, role });
    if (missingFields.length > 0) {
        throw new ResponseError(400, "Input Error", `Missing fields: ${missingFields.join(", ")}`);
    }

    const baseUsername = slugify(full_name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });
    const username = `${baseUsername}-${crypto.randomBytes(4).toString("hex")}`;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ResponseError(400, "Input Error", "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        full_name,
        username,
        email,
        password: hashedPassword,
        role,
    });

    const refreshToken = generateToken({ user: newUser._id, type: "refresh" });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    const objUser = newUser.toJSON();
    delete objUser.password;

    res.status(201).json({
        success: true,
        type: "success",
        message: "User registered successfully",
        data: { user: objUser },
    });
};

const login = async (req, res) => {
    const { credential, password } = req.body || {};

    const missingFields = returnMissingFields({ credential, password });
    if (missingFields.length > 0) {
        throw new ResponseError(400, "Input Error", `Missing fields: ${missingFields.join(", ")}`);
    }

    let doctorSpeciality;

    const user = await User.findOne({
        $or: [
            { email: credential },
            { username: credential },
        ],
    });

   

    if (!user) {
        throw new ResponseError(400, "Authentication Error", "Invalid credentials provided");
    }

    if (user.role === "user") {
        throw new ResponseError(400, "Authentication Error", "Invalid credentials provided");
    }

    const specialty = await Specialty.findOne({
        doctors: user._id
    });


    doctorSpeciality = specialty || undefined

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(400, "Authentication Error", "Invalid credentials provided");
    }

    const accessToken = generateToken({ user: user._id, type: "access" });
    const refreshToken = generateToken({ user: user._id, type: "refresh" });

    user.last_login = Date.now();
    await user.save();

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    const objUser = user.toJSON();
    delete objUser.password;
    objUser.specialty = doctorSpeciality;

    res.status(200).json({
        success: true,
        type: "success",
        message: "User logged in successfully",
        data: {
            user: objUser,
            token: accessToken,
        },
    });
};

const refresh = async (req, res) => {
    const incomingRefreshToken = req.cookies?.refresh_token;
    if (!incomingRefreshToken) {
        throw new ResponseError(401, "Authentication Error", "Refresh token missing");
    }

    const { user } = req;
    const findUser = await User.findById(user?._id);

    if (!findUser) {
        throw new ResponseError(401, "Authentication Error", "User no longer exists or token invalid");
    }

    const newAccessToken = generateToken({ user: findUser._id, type: "access" });
    const newRefreshToken = generateToken({ user: findUser._id, type: "refresh" });

    res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Token refreshed successfully",
        data: {
            token: newAccessToken,
        },
    });
};

export { register, login, refresh };