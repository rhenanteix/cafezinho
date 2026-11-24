import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ["tests/globalSetup.ts"],
    env: { NODE_ENV: "test", DATABASE_URL: "file:./test.db", JWT_SECRET: "test-secret", UPLOAD_DIR: "uploads-test" },
    fileParallelism: false,
  },
});
