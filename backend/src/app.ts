import path from "node:path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { routes } from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

export const app = express();

// The Next.js proxy forwards the visitor IP in X-Forwarded-For; trust it so rate limits are per visitor.
app.set("trust proxy", process.env.TRUST_PROXY ?? "loopback");

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: "100kb" }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.use("/uploads", express.static(path.resolve(env.uploadDir), { maxAge: "7d" }));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);
