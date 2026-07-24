import axios from "axios";
import { APPOINTMENT_SERVICE_BASE_URL } from "../config/env.config.js";
import ResponseError from "../classes/response-error.class.js";

const proxyToAppointmentService = async (req, res, next) => {
    const targetUrl = `${APPOINTMENT_SERVICE_BASE_URL}${req.originalUrl}`;

    const { host, "content-length": _cl, connection, ...forwardHeaders } = req.headers;
    console.log(targetUrl);

    
    try {
        const forwardedUser = req.user
            ? Buffer.from(
                JSON.stringify({ _id: req.user._id, role: req.user.role, email: req.user.email })
            ).toString("base64")
            : "";

        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            params: req.query,
            timeout: 10000,
            headers: {
                ...forwardHeaders,
                "x-user": forwardedUser,
                host: new URL(APPOINTMENT_SERVICE_BASE_URL).host,
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            return next(
                new ResponseError(
                    error.response.status,
                    "Server Error",
                    error.response.data?.message
                )
            );
        }
        console.log(error.message);
        next(new ResponseError(500, "Server Error", "Internal Server Error"));
    }
};

export { proxyToAppointmentService };