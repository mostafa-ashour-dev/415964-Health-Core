import request from "supertest";
import app from "../app.js"


describe("Timeslot API Integration Tests", () => {
    test("POST /api/v1/timeslot/new - create timeslot", async () => {
        const res = await request(app)
            .post("/api/v1/timeslot/new")
            .send({
                date: "2026-09-15",
                fromTime: "09:00",
                toTime: "10:00",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("GET /api/v1/timeslot/:id - get timeslots by doctor id", async () => {
        const res = await request(app)
            .get("/api/v1/timeslot/60d0fe4f5311236168a109cb")
            .query({ status: "free" });

        expect(res.statusCode).not.toBe(500);
    });
});