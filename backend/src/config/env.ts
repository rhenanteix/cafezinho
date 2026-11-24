import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const isProduction = process.env.NODE_ENV === "production";
const jwtSecret = required("JWT_SECRET", isProduction ? undefined : "dev-secret");
if (isProduction && (jwtSecret.length < 32 || jwtSecret === "troque-este-segredo")) {
  throw new Error("JWT_SECRET must be a unique random value with at least 32 characters in production");
}

export const env = {
  port: Number(process.env.PORT ?? 3333),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(","),
  publicUrl: (process.env.PUBLIC_URL ?? "").replace(/\/$/, ""),
  uploadDir: process.env.UPLOAD_DIR ?? "uploads",
};
