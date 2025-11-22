import express from "express";
import { config } from "./config";

import containerRoutes from "./routes/container.routes";

const app = express();

app.use(express.json());

app.use("/containers", containerRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

console.log("Starting server...");
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
