import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app";

const creator = {
  name: "Ana Souza",
  email: "ana@example.com",
  password: "segredo123",
  area: "Criadora de vídeos",
  bio: "Faço vídeos educativos sobre ciência para crianças.",
  slug: "Ana Souza",
  socials: { instagram: "instagram.com/ana", youtube: "" },
  paymentLinks: [
    { url: "https://nubank.com.br/cobrar/abc", label: "Pagar um café (R$ 5,00)", amountCents: 500 },
    { url: "https://mpago.la/xyz", label: "Pagar um café" },
  ],
  acceptedTerms: true,
};

describe("Cafezinho API", () => {
  let token = "";
  let linkId = "";

  it("rejects invalid registration with field errors", async () => {
    const res = await request(app).post("/api/auth/register").send({ ...creator, paymentLinks: [], acceptedTerms: false });
    expect(res.status).toBe(422);
    expect(res.body.fields).toHaveProperty("paymentLinks");
    expect(res.body.fields).toHaveProperty("acceptedTerms");
  });

  it("registers a creator and normalizes slug and urls", async () => {
    const res = await request(app).post("/api/auth/register").send(creator);
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.slug).toBe("ana-souza");
    expect(res.body.user.socials.instagram).toBe("https://instagram.com/ana");
    expect(res.body.user.socials.youtube).toBeNull();
    expect(res.body.user).not.toHaveProperty("passwordHash");
    token = res.body.token;
    linkId = res.body.user.paymentLinks[0].id;
  });

  it("blocks duplicated email and slug", async () => {
    const res = await request(app).post("/api/auth/register").send(creator);
    expect(res.status).toBe(409);
  });

  it("checks slug availability", async () => {
    const taken = await request(app).get("/api/slugs/ana-souza/availability");
    expect(taken.body.available).toBe(false);
    const free = await request(app).get("/api/slugs/joao/availability");
    expect(free.body.available).toBe(true);
    const reserved = await request(app).get("/api/slugs/painel/availability");
    expect(reserved.body.available).toBe(false);
  });

  it("logs in", async () => {
    const bad = await request(app).post("/api/auth/login").send({ email: creator.email, password: "errada" });
    expect(bad.status).toBe(401);
    const ok = await request(app).post("/api/auth/login").send({ email: creator.email, password: creator.password });
    expect(ok.status).toBe(200);
  });

  it("serves the public page, counting views and clicks", async () => {
    const page = await request(app).get("/api/creators/ana-souza");
    expect(page.status).toBe(200);
    expect(page.body.paymentLinks).toHaveLength(2);
    expect(page.body).not.toHaveProperty("email");

    const click = await request(app).post(`/api/creators/ana-souza/links/${linkId}/click`);
    expect(click.body.url).toBe(creator.paymentLinks[0].url);

    const me = await request(app).get("/api/me").set("Authorization", `Bearer ${token}`);
    expect(me.body.stats).toEqual({ views: 1, clicks: 1 });
  });

  it("updates the profile keeping click counts", async () => {
    const res = await request(app)
      .put("/api/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ bio: "Nova bio com mais de dez caracteres", paymentLinks: [creator.paymentLinks[0]] });
    expect(res.status).toBe(200);
    expect(res.body.bio).toBe("Nova bio com mais de dez caracteres");
    expect(res.body.paymentLinks).toHaveLength(1);
    expect(res.body.paymentLinks[0].clicks).toBe(1);
  });

  it("requires auth for /me", async () => {
    const res = await request(app).get("/api/me");
    expect(res.status).toBe(401);
  });

  it("uploads an avatar image", async () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
      "base64",
    );
    const res = await request(app).post("/api/uploads").attach("file", png, { filename: "a.png", contentType: "image/png" });
    expect(res.status).toBe(201);
    expect(res.body.url).toMatch(/\/uploads\/.+\.png$/);
  });
});
