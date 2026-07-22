import request from "supertest";
import app from "../app.js";



describe("Patient API Integration Tests", () => {
    test("POST /api/patient", async () => {
        const res = await request(app)
            .post("/api/patient")
            .send({
                full_name: "John Doe",
                email: "patient_test@test.com",
                age: 30,
                allergies: ["Peanuts"],
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("GET /api/patient", async () => {
        const res = await request(app).get("/api/patient");

        expect(res.statusCode).not.toBe(500);
    });
});