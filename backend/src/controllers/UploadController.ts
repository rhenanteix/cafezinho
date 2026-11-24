import fs from "node:fs";
import type { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { hasImageSignature, publicFileUrl } from "../middlewares/upload";

export const UploadController = {
  async store(req: Request, res: Response) {
    if (!req.file) throw new AppError("Nenhuma imagem enviada");
    if (!(await hasImageSignature(req.file.path))) {
      await fs.promises.rm(req.file.path, { force: true });
      throw new AppError("Envie uma imagem JPG, PNG, WEBP ou GIF", 415);
    }
    res.status(201).json({ url: publicFileUrl(req.file.filename) });
  },
};
