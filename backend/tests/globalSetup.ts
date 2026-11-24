import { execSync } from "node:child_process";
import fs from "node:fs";

export default function setup() {
  fs.rmSync("prisma/test.db", { force: true });
  execSync("npx prisma db push --skip-generate", {
    env: { ...process.env, DATABASE_URL: "file:./test.db" },
    stdio: "ignore",
  });
  return () => {
    fs.rmSync("prisma/test.db", { force: true });
    fs.rmSync("uploads-test", { recursive: true, force: true });
  };
}
