
import "dotenv/config";

import path from "path";
import { addAlias } from "module-alias";

// Register aliases BEFORE importing the application
const isProduction = process.env.NODE_ENV === "production";
const projectRoot = path.resolve(__dirname, "..");

const aliasPath = path.join(
  projectRoot,
  isProduction ? "dist" : "src"
);

addAlias("@", aliasPath);

// Load the application only after registering aliases
const { createApp } = require("./app") as typeof import("./app");

const PORT = Number(process.env.PORT) || 5000;

async function bootstrap(): Promise<void> {
  try {
    console.log("Starting backend...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Port:", PORT);

    const { httpServer } = await createApp();

    httpServer.on("error", (error: Error) => {
      console.error("HTTP server error:", error);
      process.exit(1);
    });

    httpServer.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ BACKEND STARTUP FAILED:");
    console.error(error);
    process.exit(1);
  }
}

bootstrap().catch((error: unknown) => {
  console.error("❌ Unexpected startup error:", error);
  process.exit(1);
});
