import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3333),
  jwtSecret: required("JWT_SECRET", process.env.NODE_ENV === "production" ? undefined : "dev-secret"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(","),
  publicUrl: (process.env.PUBLIC_URL ?? "").replace(/\/$/, ""),
  uploadDir: process.env.UPLOAD_DIR ?? "uploads",
};
