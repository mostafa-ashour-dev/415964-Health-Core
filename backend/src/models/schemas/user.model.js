import mongoose from "mongoose";
import {
    EMAIL_REGEX,
    PASSWORD_REGEX,
    USERNAME_REGEX,
} from "../validation/user.validation.js";
import generateRandomCode from "../../utils/generate-random-code.js";

const userSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "User full_name is required"],
            trim: true,
            minLength: 3,
            maxLength: 255,
        },
        username: {
            type: String,
            required: [true, "User username is required"],
            trim: true,
            unique: true,
            match: USERNAME_REGEX,
            minLength: 3,
            maxLength: 255,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "User email is required"],
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
        password: {
            type: String,
            required: [true, "User password is required"],
            minLength: 8,
            maxLength: 255,
            validate: {
                validator: (value) => {
                    return PASSWORD_REGEX.test(value);
                },
                message:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
            },
        },
        role: {
            type: String,
            required: [true, "User role is required"],
            enum: ["user", "doctor", "admin"],
            default: "user",
        },
        last_login: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

userSchema.index({ full_name: "text" });
userSchema.index({ username: "text" });

userSchema.methods.setRandomCode = async function (type) {
    const expirationDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const randomCode = generateRandomCode();
    let code = "";
    if (type === "password_reset") {
        this.reset_password_code = randomCode;
        this.reset_password_expiration = expirationDate;
        code = this.reset_password_code;
    } else {
        this.verification_code = randomCode;
        this.verification_code_expiration = expirationDate;
        code = this.verification_code;
    }

    this.save();
    return code;
};

const User = mongoose.model("User", userSchema);
export default User;
