import { BtrfsService } from "../services";
import { Request, Response } from "express";

export class BtrfsController {
  private service = new BtrfsService();

  async getAllSubvolumes(_dto: unknown, _req: Request, res: Response) {
    const subvolumes = await this.service.listSubvolumes();

    return res.status(200).json(subvolumes);
  }
}
