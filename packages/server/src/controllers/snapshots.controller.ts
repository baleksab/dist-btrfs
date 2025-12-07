import { SnapshotsService } from "../services";
import { Request, Response } from "express";

export class SnapshotsController {
  private snapshotService = new SnapshotsService();

  async listSnapshot(_dto: unknown, req: Request, res: Response) {
    const subvolume = req.params.subvolume;
    const response = await this.snapshotService.listSnapshots(subvolume);

    return res.status(200).json(response);
  }

  async createSnapshot(_dto: unknown, req: Request, res: Response) {
    const subvolume = req.params.subvolume;
    const response = await this.snapshotService.createSnapshot(subvolume);

    return res.status(200).json(response);
  }

  async deleteSnapshot(_dto: unknown, req: Request, res: Response) {
    const { subvolume, snapshot } = req.params;
    const snapshotPath = `${subvolume}/snapshots/${snapshot}`;
    const response = await this.snapshotService.deleteSnapshot(snapshotPath);

    return res.status(200).json(response);
  }
}
