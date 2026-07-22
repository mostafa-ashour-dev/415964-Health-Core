import request from "supertest";
import app from "../app.js";


describe("Specialty API Integration Tests", () => {
    test("GET /api/specialty", async () => {
        const res = await request(app).get("/api/specialty");

        expect(res.statusCode).not.toBe(500);
    });
});