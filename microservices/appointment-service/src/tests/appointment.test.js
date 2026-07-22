import request from "supertest";
import app from "../app.js";

describe("Appointment API Integration Tests", () => {
    test("POST /api/v1/appointment/book - create appointment", async () => {
        const res = await request(app)
            .post("/api/v1/appointment/book")
            .send({
                specialty: "60d0fe4f5311236168a109ca",
                doctor: "60d0fe4f5311236168a109cb",
                timeslot: "60d0fe4f5311236168a109cc",
                patient: "60d0fe4f5311236168a109cd",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("GET /api/v1/appointment - get appointments", async () => {
        const res = await request(app).get("/api/v1/appointment");

        expect(res.statusCode).not.toBe(500);
    });

    test("PUT /api/v1/appointment/:id - update appointment status", async () => {
        const res = await request(app)
            .put("/api/v1/appointment/60d0fe4f5311236168a109ca")
            .send({
                updateTo: "approved",
            });

        expect(res.statusCode).not.toBe(500);
    });
});