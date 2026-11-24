import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

const ALLOWED = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

fs.mkdirSync(env.uploadDir, { recursive: true });

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: env.uploadDir,
    filename: (_req, file, cb) => cb(null, `${crypto.randomUUID()}${ALLOWED.get(file.mimetype)}`),
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.has(file.mimetype)) cb(null, true);
    else cb(new AppError("Envie uma imagem JPG, PNG, WEBP ou GIF", 415));
  },
});

export function publicFileUrl(filename: string) {
  return `${env.publicUrl}/uploads/${path.basename(filename)}`;
}
