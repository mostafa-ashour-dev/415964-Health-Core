import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/error-handler.middleware.js";
import routes from "./router/main.routes.js";
import missingBodyMiddleware from "./middlewares/missing-body.middleware.js";

const app = express();

const origins = [
    "http://localhost:3000",
    "http://localhost:8081",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: origins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(missingBodyMiddleware);

app.use("/api", routes);

app.use(errorHandler);

export default app;