import "./routes"; // this is needed to register all routes
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { config } from "./config";
import { swaggerSpec } from "./swagger";
import { router } from "./utils";
import { BtrfsService } from "./services";
import { schedulerService } from "./services/scheduler.service";

const bootstrap = async () => {
  const app = express();
  const btrfsService = new BtrfsService();

  app.use(express.json());
  app.use(cors());

  app.use("/api", router);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/specifications", (_, res) => {
    res.json(swaggerSpec);
  });

  app.get("/health", (_, res) => {
    res.json({ status: "ok" });
  });

  console.log("Starting server...");

  const configs = await btrfsService.findSubvolumeConfigAll();
  const mappedConfigs = configs.map((config) => ({ ...config, isEnabled: !!config.isEnabled }));

  await schedulerService.restoreFromDb(mappedConfigs);

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
    console.log(`Swagger available at http://localhost:${config.port}/swagger`);
  });
};

bootstrap().catch((err) => {
  console.error("Fatal startup error", err);
  process.exit(1);
});
