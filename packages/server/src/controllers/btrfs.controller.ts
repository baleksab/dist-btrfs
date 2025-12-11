import { BtrfsService } from "../services";
import { Request, Response } from "express";

export class BtrfsController {
  private service = new BtrfsService();

  async getAllSubvolumes(_dto: unknown, _req: Request, res: Response) {
    const subvolumes = await this.service.listSubvolumes();

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
}
