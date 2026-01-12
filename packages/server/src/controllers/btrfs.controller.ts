import { BtrfsSubvolumeSetConfigRequest, BtrfsSubvolumeSetRetentionConfigRequest } from "../dtos";
import { BtrfsService } from "../services";
import { Request, Response } from "express";

export class BtrfsController {
  private service = new BtrfsService();

  async getAllSubvolumes(_dto: unknown, req: Request, res: Response) {
    const { serverUid } = req.query;
    const subvolumes = await this.service.listSubvolumes(serverUid as string);

    return res.status(200).json(subvolumes);
  }

  async getSubvolumeConfig(_dto: unknown, req: Request, res: Response) {
    const { subvolume } = req.params;
    const config = await this.service.findSubvolumeConfig(subvolume);

    return res.status(200).json(config);
  }

  async getSubvolumeConfigAll(_dto: unknown, _req: Request, res: Response) {
    const configs = await this.service.findSubvolumeConfigAll();

    return res.status(200).json(configs);
  }

  async setSubvolumeConfig(dto: BtrfsSubvolumeSetConfigRequest, req: Request, res: Response) {
    const { subvolume } = req.params;
    const config = await this.service.setSubvolumeConfig(subvolume, dto);

    return res.status(200).json(config);
  }

  async getSubvolumeRetentionConfig(_dto: unknown, req: Request, res: Response) {
    const { subvolume } = req.params;
    const config = await this.service.findSubvolumeRetentionConfig(subvolume);

    return res.status(200).json(config);
  }

  async getSubvolumeRetentionConfigAll(_dto: unknown, _req: Request, res: Response) {
    const configs = await this.service.findSubvolumeRetentionConfigall();

    return res.status(200).json(configs);
  }

  async setSubvolumeRetentionConfig(
    dto: BtrfsSubvolumeSetRetentionConfigRequest,
    req: Request,
    res: Response
  ) {
    const { subvolume } = req.params;
    const config = await this.service.setSubvolumeRetentionConfig(subvolume, dto);

    return res.status(200).json(config);
  }

  async checkIfSubvolumeExists(_dto: unknown, req: Request, res: Response) {
    const { subvolume } = req.params;
    const { serverUid } = req.query;

    const result = await this.service.checkIfSubvolumeExists(subvolume, serverUid as string);

    return res.status(200).json(result);
  }

  async getStorageMetrics(_dto: unknown, req: Request, res: Response) {
    const { serverUid } = req.query;

    const result = await this.service.getStorageMetrics(serverUid as string);

    return res.status(200).json(result);
  }

  async getSubvolumeStorageMetrics(_dto: unknown, req: Request, res: Response) {
    const { subvolume } = req.params;
    const { serverUid } = req.query;

    const result = await this.service.getSubvolumeDetailedMetrics(subvolume, serverUid as string);

    return res.status(200).json(result);
  }
}
