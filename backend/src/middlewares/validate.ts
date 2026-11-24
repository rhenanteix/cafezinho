import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utils/AppError";

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        fields[key] ??= issue.message;
      }
      throw new AppError("Verifique os campos destacados", 422, fields);
    }
    req.body = result.data;
    next();
  };
}
