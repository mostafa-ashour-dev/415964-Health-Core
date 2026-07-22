import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: ".env.test",
});

beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
});

afterAll(async () => {
    await mongoose.connection.close();
});