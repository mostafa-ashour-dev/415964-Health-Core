import request from "supertest";
import app from "../app.js";

describe("Auth API Integration Tests", () => {
    test("POST /api/auth/register", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                full_name: "Test User",
                email: "register_test@test.com",
                password: "password123",
                role: "admin",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("POST /api/auth/login", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                credential: "test@test.com",
                password: "123456",
            });

        expect(res.statusCode).not.toBe(500);
    });

    test("POST /api/auth/refresh", async () => {
        const res = await request(app)
            .post("/api/auth/refresh")
            .set("Cookie", ["refresh_token=fake_token_for_testing"]);

        expect(res.statusCode).not.toBe(500);
    });
});