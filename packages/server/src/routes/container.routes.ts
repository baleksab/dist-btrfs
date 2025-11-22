import { Router } from "express";
import { createContainerService } from "../services/container.service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const container = await createContainerService(req.body);
    res.json(container);
  } catch (err: unknown) {
    res.status(500).json({ err });
  }
});

export default router;
