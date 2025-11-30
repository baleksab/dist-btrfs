import { Request, Response } from "express";
import { CreateNewServerRequest } from "../dtos";
import { RemoteServerService } from "../services";

export class RemoteServerController {
  private service = new RemoteServerService();

  async create(dto: CreateNewServerRequest, _req: Request, res: Response) {
    const server = await this.service.create(dto);
    return res.status(200).json(server);
  }

  async getAll(_dto: never, _req: Request, res: Response) {
    const servers = await this.service.getAll();
    return res.status(200).json(servers);
  }
}
