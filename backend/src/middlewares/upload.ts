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

const SIGNATURES: Record<string, (b: Buffer) => boolean> = {
  ".jpg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  ".png": (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  ".gif": (b) => ["GIF87a", "GIF89a"].includes(b.subarray(0, 6).toString("ascii")),
  ".webp": (b) => b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP",
};

export async function hasImageSignature(filePath: string) {
  const handle = await fs.promises.open(filePath, "r");
  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(12), 0, 12, 0);
    return SIGNATURES[path.extname(filePath)]?.(buffer.subarray(0, bytesRead)) ?? false;
  } finally {
    await handle.close();
  }
}

export function publicFileUrl(filename: string) {
  return `${env.publicUrl}/uploads/${path.basename(filename)}`;
}
