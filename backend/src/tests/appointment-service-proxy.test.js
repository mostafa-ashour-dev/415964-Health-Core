
import request from "supertest";
import app from "../app.js";


describe("Appointment Service Proxy API Integration Tests", () => {
    test("POST /api/appointment/book", async () => {
        const res = await request(app)
            .post("/api/appointment/book")
            .send({
                patient: "60d0fe4f5311236168a109ca",
                doctor: "60d0fe4f5311236168a109cb",
                timeslot: "60d0fe4f5311236168a109cc",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("GET /api/appointment", async () => {
        const res = await request(app).get("/api/appointment");

        expect(res.statusCode).not.toBe(500);
    });

    test("PUT /api/appointment/:id", async () => {
        const res = await request(app)
            .put("/api/appointment/60d0fe4f5311236168a109ca")
            .send({
                status: "confirmed",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("POST /api/timeslot/new", async () => {
        const res = await request(app)
            .post("/api/timeslot/new")
            .send({
                date: "2026-08-01",
                fromTime: "10:00",
                toTime: "11:00",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("GET /api/timeslot/:id", async () => {
        const res = await request(app).get("/api/timeslot/60d0fe4f5311236168a109ca");

        expect(res.statusCode).not.toBe(500);
    });
});