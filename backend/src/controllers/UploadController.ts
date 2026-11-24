import type { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { publicFileUrl } from "../middlewares/upload";

export const UploadController = {
  store(req: Request, res: Response) {
    if (!req.file) throw new AppError("Nenhuma imagem enviada");
    res.status(201).json({ url: publicFileUrl(req.file.filename) });
  },
};
