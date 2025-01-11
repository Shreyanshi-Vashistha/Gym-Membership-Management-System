const request = require("supertest");
const app = require("../app");

describe("Gym Membership API", () => {
  it("should register a new membership", async () => {
    const res = await request(app).post("/memberships/register").send({
      name: "John Doe",
      email: "john@example.com",
      startDate: "2025-01-01",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.member).toHaveProperty("id");
    expect(res.body.member.name).toBe("John Doe");
  });

  it("should retrieve membership details by email", async () => {
    const res = await request(app).get("/memberships/john@example.com");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("John Doe");
  });

  it("should view all active members", async () => {
    const res = await request(app).get("/memberships");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should cancel a membership", async () => {
    const res = await request(app).delete(
      "/memberships/cancel/john@example.com"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Membership cancelled successfully");
  });

  it("should modify membership start date", async () => {
    const res = await request(app)
      .put("/memberships/modify/john@example.com")
      .send({ startDate: "2025-02-01" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.member.startDate).toBe("2025-02-01");
  });
});
