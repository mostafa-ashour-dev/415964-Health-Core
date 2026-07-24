import ResponseError from "../classes/response-error.class.js";

const attachUser = (req, res, next) => {
    const encodedUser = req.headers["x-user"];

    if (!encodedUser) {
        return next(new ResponseError(401, "Unauthorized", "Missing user context"));
    }

    try {
        const decoded = Buffer.from(encodedUser, "base64").toString("utf-8");
        req.user = JSON.parse(decoded);
        next();
    } catch (err) {
        next(new ResponseError(401, "Unauthorized", "Invalid user context"));
    }
};

export default attachUser;