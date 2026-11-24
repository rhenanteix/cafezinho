import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/token";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function ensureAuth(req: Request, _res: Response, next: NextFunction) {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];
  if (scheme !== "Bearer" || !token) throw new AppError("Faça login para continuar", 401);
  try {
    req.userId = verifyToken(token).sub;
  } catch {
    throw new AppError("Sessão expirada, faça login novamente", 401);
  }
  next();
}
