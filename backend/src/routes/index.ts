import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "../controllers/AuthController";
import { ProfileController } from "../controllers/ProfileController";
import { CreatorController } from "../controllers/CreatorController";
import { UploadController } from "../controllers/UploadController";
import { ensureAuth } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { imageUpload } from "../middlewares/upload";
import { loginSchema, registerSchema, updateProfileSchema } from "../validators/creatorValidators";

const strictLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false });

export const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

routes.post("/auth/register", strictLimiter, validateBody(registerSchema), AuthController.register);
routes.post("/auth/login", strictLimiter, validateBody(loginSchema), AuthController.login);

routes.get("/me", ensureAuth, ProfileController.show);
routes.put("/me", ensureAuth, validateBody(updateProfileSchema), ProfileController.update);

routes.post("/uploads", strictLimiter, imageUpload.single("file"), UploadController.store);

routes.get("/slugs/:slug/availability", CreatorController.slugAvailability);
routes.get("/creators/:slug", CreatorController.show);
routes.post("/creators/:slug/links/:linkId/click", CreatorController.registerClick);
