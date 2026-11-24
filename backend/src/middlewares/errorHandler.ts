import type { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { AppError } from "../utils/AppError";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Rota não encontrada" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message, fields: err.details });
  }
  if (err instanceof MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE" ? "A imagem deve ter no máximo 2 MB" : err.message;
    return res.status(400).json({ message });
  }
  console.error(err);
  return res.status(500).json({ message: "Erro interno, tente novamente" });
}
