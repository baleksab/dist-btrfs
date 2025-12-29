import { BtrfsSnapshotCleanupRequest, BtrfsSnapshotFullReplicationRequest } from "../dtos";
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
    const subvolName = subvolume.replace(/^\//, "");
    const snapshotPath = `/.snapshots/${subvolName}/${snapshot}`;
    const response = await this.snapshotService.deleteSnapshot(snapshotPath);

    return res.status(200).json(response);
  }

  async restoreSnapshot(_dto: unknown, req: Request, res: Response) {
    const { subvolume, snapshot } = req.params;
    const response = await this.snapshotService.restoreSnapshot(subvolume, snapshot);

    return res.status(200).json(response);
  }

  async cleanupSnapshots(dto: BtrfsSnapshotCleanupRequest, req: Request, res: Response) {
    const { subvolume } = req.params;
    const response = await this.snapshotService.cleanupSnapshots(subvolume, dto);

    return res.status(200).json(response);
  }

  async fullReplication(dto: BtrfsSnapshotFullReplicationRequest, req: Request, res: Response) {
    const { snapshot } = req.params;
    const response = await this.snapshotService.fullReplication(snapshot, dto);

    return res.status(200).json(response);
  }
}
