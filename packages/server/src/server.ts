import "./routes"; // this is needed to register all routes
import express from "express";
import swaggerUi from "swagger-ui-express";
import { config } from "./config";
import { swaggerSpec } from "./swagger";
import { router } from "./utils";

const app = express();

app.use(express.json());

app.use(router);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

console.log("Starting server...");

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
  console.log(`Swagger available at http://localhost:${config.port}/swagger`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});