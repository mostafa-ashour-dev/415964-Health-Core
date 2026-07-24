import ResponseError from "../classes/response-error.class.js";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} from "../config/env.config.js";
import jwt from "jsonwebtoken";
import User from "../models/schemas/user.model.js";

const authUser = (role = "all", type = "access") => async (req, res, next) => {
    try {
        let token = null;

        if (type === "refresh") {
            token = req.cookies?.refresh_token;
            if (!token) {
                return next(new ResponseError(401, "Auth Error", "Unauthorized - Missing refresh token"));
            }
        } else {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader?.startsWith("Bearer ")) {
                return next(new ResponseError(401, "Auth Error", "Unauthorized - Missing or invalid access token"));
            }
            token = authorizationHeader.split(" ")[1];
        }

        const secret = type === "access" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        const decoded = jwt.verify(token, secret);

        const userId = decoded._id || decoded.user?._id;

        const user = await User.findById(userId).lean();
        if (!user) {
            return next(new ResponseError(404, "Input Error", "User not found"));
        }

        if (role !== "all" && user.role !== role) {
            return next(new ResponseError(403, "Auth Error", `Unauthorized - Only ${role} allowed`));
        }

        delete user.password;
        req.user = user;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new ResponseError(401, "Auth Error", "Token expired"));
        }
        return next(new ResponseError(403, "Auth Error", error.message || "Invalid token"));
    }
};

export { authUser };