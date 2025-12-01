import { BtrfsService } from "../services";
import { Response } from "express";

export class BtrfsController {
  private service = new BtrfsService();

  async getAllSubvolumes(_dto: unknown, _req: unknown, res: Response) {
    const subvolumes = await this.service.listSubvolumes();

    return res.status(200).json(subvolumes);
  }
}
