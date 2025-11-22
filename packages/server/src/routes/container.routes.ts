import { Router } from "express";
import { createContainerService } from "../services/container.service";

const router = Router();

/**
 * @openapi
 * /containers:
 *   post:
 *     summary: Create a new container
 *     tags:
 *       - Containers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - btrfsVolumePath
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               btrfsVolumePath:
 *                 type: string
 *     responses:
 *       200:
 *         description: Container created
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const container = await createContainerService(req.body);
    res.json(container);
  } catch (err: unknown) {
    res.status(500).json({ err });
  }
});

export default router;
